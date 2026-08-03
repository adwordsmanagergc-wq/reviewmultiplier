import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    question: "Why are my Google reviews disappearing?",
    answer: "Google has implemented strict new guidelines to combat fake and incentivized reviews. Any review that appears to be linked to a reward, discount, or incentive is being automatically flagged and removed. This includes reviews left immediately after receiving a prize or discount."
  },
  {
    question: "Why am I missing reviews?",
    answer: "Google's algorithm now detects patterns that suggest incentivized reviews — such as unusual volumes of reviews, reviews left on-premise, or reviews that mention staff names. These are being removed to ensure authenticity."
  },
  {
    question: "Can I still offer prizes to customers?",
    answer: "Yes! You absolutely can. The key difference is you can't offer prizes IN EXCHANGE for a review. With ReviewMultiplier, customers win prizes for sharing their contact details — which is completely allowed. You then follow up AFTER they've left to request a review."
  },
  {
    question: "How does ReviewMultiplier stay compliant?",
    answer: "We've redesigned our system so prizes are given for customer engagement and data capture — not reviews. Customers spin to win, share their details to claim, and you get a valuable marketing database. Review requests happen later, after they've left, with no connection to the prize."
  },
  {
    question: "Is collecting customer data actually better?",
    answer: "Absolutely! A database of engaged customers is far more valuable than a single review. You can market to them repeatedly, bring them back with offers, and build long-term relationships. Plus, happy customers who return are more likely to leave genuine reviews naturally."
  },
  {
    question: "Will my existing reviews be removed?",
    answer: "Google is retroactively reviewing content. If past reviews show patterns of incentivization (large volumes in short periods, similar language, etc.), they may be flagged. Moving to our compliant system protects your future reviews."
  },
]

export default function GoogleFAQs() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
            <p className="text-gray-500 text-sm mt-1">About Google's new review rules and how we help</p>
          </div>
          <div className="divide-y divide-gray-100">
            {FAQS.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === index && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
