import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Contact form handler.
 *
 * This replaces the original Cloudflare Worker + Mocha email/D1 integration.
 * On Vercel there is no bundled database or email service, so this endpoint:
 *   - validates the incoming submission,
 *   - if a RESEND_API_KEY (+ CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL) env var is
 *     configured, emails the enquiry via Resend (https://resend.com),
 *   - otherwise logs the submission and returns success so the form still works.
 *
 * Configure email delivery by adding these Environment Variables in Vercel:
 *   RESEND_API_KEY     - your Resend API key
 *   CONTACT_TO_EMAIL   - where enquiries are sent (required to send email)
 *   CONTACT_FROM_EMAIL - a verified Resend sender (default: onboarding@resend.dev)
 */

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  message?: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body: ContactPayload =
    typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const businessName = (body.businessName || "").trim();
  const message = (body.message || "").trim();

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const toEmail = (process.env.CONTACT_TO_EMAIL || "").trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey && toEmail) {
    try {
      const html = `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px;">
          <h2 style="color:#18181b;">New ReviewMultiplier Enquiry</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px 0; font-weight:600; width:140px;">Name:</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">Email:</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">Phone:</td><td>${escapeHtml(phone) || "Not provided"}</td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">Business:</td><td>${escapeHtml(businessName) || "Not provided"}</td></tr>
          </table>
          ${message ? `<pre style="white-space:pre-wrap; font-family:inherit; background:#f4f4f5; padding:12px; border-radius:8px; margin-top:12px;">${escapeHtml(message)}</pre>` : ""}
        </div>`;

      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          ...(email ? { reply_to: email } : {}),
          subject: `New ReviewMultiplier Enquiry from ${businessName || name}`,
          html,
          text: `New ReviewMultiplier Enquiry\n\nName: ${name}\nEmail: ${email || "Not provided"}\nPhone: ${phone || "Not provided"}\nBusiness: ${businessName || "Not provided"}${message ? `\n\n${message}` : ""}`,
        }),
      });

      if (!resp.ok) {
        console.error("Resend error:", resp.status, await resp.text());
      }
    } catch (error) {
      // Don't fail the request if email delivery fails.
      console.error("Failed to send email notification:", error);
    }
  } else {
    console.log("Contact submission (no email provider configured):", {
      name,
      email,
      phone,
      businessName,
    });
  }

  return res.status(200).json({ success: true });
}
