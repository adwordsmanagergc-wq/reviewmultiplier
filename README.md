# ReviewMultiplier

Marketing site for **ReviewMultiplier – Turn Every Customer Into a 5-Star Review**.

Originally built on Mocha (Cloudflare Workers). This repo has been ported to a
standard **Vite + React** single-page app with a **Vercel serverless function**
for the contact form, ready to deploy on Vercel.

## Tech stack

- Vite 7 + React 19 + TypeScript
- React Router 7 (client-side routing)
- Tailwind CSS + Radix UI components
- Vercel serverless function (`/api/contact`) for the contact form

## Local development

```bash
npm install
npm run dev        # start the Vite dev server
```

> Note: the `/api/contact` endpoint is a Vercel serverless function. To run it
> locally alongside the app, use the Vercel CLI: `npm i -g vercel && vercel dev`.
> Running plain `npm run dev` serves the frontend only; the contact form POST
> will 404 locally but works once deployed to Vercel.

Other scripts:

```bash
npm run build      # production build to ./dist
npm run preview    # preview the production build
npm run typecheck  # tsc project references type-check
npm run lint       # eslint
```

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **Import Project** and select the repo.
3. Vercel auto-detects the settings from `vercel.json`:
   - Framework: **Vite**
   - Build command: `vite build`
   - Output directory: `dist`
   - `api/contact.ts` is deployed automatically as a serverless function.
4. (Optional) Add Environment Variables to enable contact-form email delivery —
   see [`.env.example`](./.env.example):
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` (default `sales@metatap.io`)
   - `CONTACT_FROM_EMAIL` (a verified Resend sender)
5. Deploy.

Client-side routes (`/nicossmokehouse`, `/nanasans`, `/redruby`,
`/obeachibiza`, `/obeachibiza1`, `/finnsbeachparty`) are handled by the SPA
rewrite in `vercel.json`.

## Contact form

`POST /api/contact` accepts `{ name, email, phone, businessName }`.

- With `RESEND_API_KEY` configured, it emails the enquiry via
  [Resend](https://resend.com).
- Without it, submissions are logged to the function logs and the endpoint
  still returns `{ success: true }` so the form UX works.

The original Cloudflare D1 database is not used; if you need to persist
submissions, wire the function up to a database (e.g. Vercel Postgres, Neon,
Supabase). The original schema is:

```sql
CREATE TABLE contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  phone TEXT,
  business_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Images / assets

The page images are currently served from the original Mocha CDN
(`*.mochausercontent.com`). They load fine in browsers today, but **that CDN
will stop working once Mocha shuts down**. Before then, download those images,
host them somewhere permanent (e.g. Vercel's `public/` folder or an object
store), and update the URLs in the components/pages. The full list is tracked in
`public_asset_links.json` from the original export.
