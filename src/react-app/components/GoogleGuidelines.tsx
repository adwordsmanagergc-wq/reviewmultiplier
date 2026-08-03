import { useState } from 'react'
import { ChevronDown, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'

const GOOGLE_RULES = [
  {
    title: "No incentives for reviews",
    description: "You can't offer payment, discounts, free goods, or services in exchange for posting, revising, or removing a review.",
    icon: XCircle,
    color: "text-red-500"
  },
  {
    title: "No staff names in reviews",
    description: "Customers can't mention specific staff members by name in their reviews.",
    icon: XCircle,
    color: "text-red-500"
  },
  {
    title: "Ask everyone, not just happy customers",
    description: "You must ask all customers for reviews, not selectively target only those who had a positive experience.",
    icon: XCircle,
    color: "text-red-500"
  },
  {
    title: "No on-premise review requests",
    description: "You can't ask for reviews while someone is physically at your business.",
    icon: XCircle,
    color: "text-red-500"
  },
  {
    title: "No specific content requests",
    description: "You can't ask customers to mention specific products, services, or leave a particular type of review.",
    icon: XCircle,
    color: "text-red-500"
  },
  {
    title: "Encourage genuine experiences",
    description: "You CAN encourage customers to share genuine experiences — without offering incentives to influence their rating or review content.",
    icon: CheckCircle2,
    color: "text-green-500"
  },
]

export default function GoogleGuidelines() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-red-50 via-orange-50 to-amber-50">
      <div className="max-w-4xl mx-auto">
        {/* Reassurance Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-5 md:p-6 text-white mb-8 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <h2 className="text-lg md:text-xl font-bold">Don't Worry, We Got This!</h2>
          </div>
          <p className="text-sm md:text-base text-green-100">
            Google changed the rules, but we've already adapted. Our new system is actually <span className="font-semibold text-white">better</span> — 
            each customer becomes more valuable with a compliant approach that builds your database AND your reviews.
          </p>
        </div>

        {/* Guidelines Dropdown */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">New Google Review Guidelines</h3>
                <p className="text-gray-500 text-sm">Updated April 2025 — What you need to know</p>
              </div>
            </div>
            <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <p className="text-gray-600 mb-6">
                Google has made major updates to their review guidelines. Here's what businesses need to know:
              </p>
              <div className="grid gap-4">
                {GOOGLE_RULES.map((rule, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-gray-100">
                    <rule.icon className={`w-6 h-6 ${rule.color} flex-shrink-0 mt-0.5`} />
                    <div>
                      <h4 className="font-semibold text-gray-900">{rule.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{rule.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* How We've Adapted */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold mb-4">How ReviewMultiplier Works Now</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-200 mb-2">1</div>
              <h4 className="font-semibold mb-2">Customer Plays & Wins</h4>
              <p className="text-blue-100 text-sm">They spin the wheel for a prize. No review mentioned or required.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-200 mb-2">2</div>
              <h4 className="font-semibold mb-2">You Capture Their Data</h4>
              <p className="text-blue-100 text-sm">To claim their prize, they share their name, email, or phone. You build a marketing database.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-200 mb-2">3</div>
              <h4 className="font-semibold mb-2">Follow Up Later</h4>
              <p className="text-blue-100 text-sm">After they've left happy, send a friendly review request. Completely compliant!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
