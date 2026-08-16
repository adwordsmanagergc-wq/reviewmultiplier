import { useState } from 'react'
import { X, Send, Gift, Sparkles } from 'lucide-react'
import { Button } from '@/react-app/components/ui/button'

interface PhilippinesOrderFormProps {
  onClose: () => void
}

export default function PhilippinesOrderForm({ onClose }: PhilippinesOrderFormProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    whatsapp: '',
    qrDisplays: 1,
    tapCards: 2
  })
  const [paymentPlan, setPaymentPlan] = useState<'monthly' | 'yearly'>('monthly')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const QR_DISPLAY_PRICE = 600 // ₱600
  const TAP_CARD_PRICE = 1200 // ₱1,200
  const MONTHLY_SUBSCRIPTION = 6300 // ₱6,300
  const YEARLY_SUBSCRIPTION = 52920 // ₱52,920 (30% off)

  const qrTotal = formData.qrDisplays * QR_DISPLAY_PRICE
  const tapCardTotal = formData.tapCards * TAP_CARD_PRICE
  const subscriptionAmount = paymentPlan === 'yearly' ? YEARLY_SUBSCRIPTION : MONTHLY_SUBSCRIPTION
  const totalPrice = subscriptionAmount + qrTotal + tapCardTotal

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString()}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subscriptionText = paymentPlan === 'yearly'
      ? `12 Months Upfront: ₱52,920 (Save 30% - ₱22,680!)`
      : `Monthly Subscription: ₱6,300/month`

    const message = `NEW ORDER - ReviewMultiplier Philippines

Business Name: ${formData.businessName}
Contact Name: ${formData.name}
Contact: ${formData.whatsapp}

Order Details:
- QR Table Placers: ${formData.qrDisplays}x @ ₱600 = ${formatPrice(qrTotal)}
- Tap Cards: ${formData.tapCards}x @ ₱1,200 = ${formatPrice(tapCardTotal)}
- ${subscriptionText}

Total Due Today: ${formatPrice(totalPrice)}
(includes ${paymentPlan === 'yearly' ? '12 months' : 'first month'} subscription)

Special Bonuses Applied:
- FREE Setup Fee (Save ₱12,000!)
- 3 Months FREE Google Maps Optimisation (Worth ₱55,000!)`

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.whatsapp,
          businessName: formData.businessName,
          message,
        }),
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-google-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-google-green" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Received!</h3>
          <p className="text-gray-600 mb-6">Thanks — we've got your details and someone will be in touch shortly to get you set up.</p>
          <Button onClick={onClose} className="w-full py-6 text-base bg-google-green hover:bg-green-600">
            Close
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-google-green to-emerald-500 text-white rounded-2xl p-4 mb-3 flex items-center gap-3">
            <Gift className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg">Sign Up Today!</p>
              <p className="text-sm text-white/90">FREE Setup Fee (Save ₱12,000!)</p>
            </div>
          </div>
          
          {/* Bonus Banner */}
          <div className="bg-gradient-to-r from-google-blue to-blue-600 text-white rounded-2xl p-4 mb-4 flex items-center gap-3">
            <Sparkles className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg">BONUS!</p>
              <p className="text-sm text-white/90">3 Months FREE Google Maps Optimisation (Worth ₱55,000!)</p>
            </div>
          </div>
          
          <p className="text-google-blue font-semibold text-sm mb-1">Ready to multiply your reviews for ₱6,300/month</p>
          <h2 className="text-2xl font-bold text-gray-900">Order Now 🇵🇭</h2>
          <p className="text-gray-600 text-sm mt-1">Fill in your details below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Business Name
            </label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all"
              placeholder="Your business name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              WhatsApp Number
            </label>
            <input
              type="tel"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all"
              placeholder="+63 917 123 4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              How many QR Table Placers needed?
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                required
                value={formData.qrDisplays}
                onChange={(e) => setFormData({ ...formData, qrDisplays: parseInt(e.target.value) || 0 })}
                className="w-24 px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all text-center"
              />
              <span className="text-gray-500 text-sm">@ ₱600 each</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              How many Tap Cards needed?
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                required
                value={formData.tapCards}
                onChange={(e) => setFormData({ ...formData, tapCards: parseInt(e.target.value) || 0 })}
                className="w-24 px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all text-center"
              />
              <span className="text-gray-500 text-sm">@ ₱1,200 each</span>
            </div>
          </div>

          {/* Payment Plan Selection */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Choose Your Plan</h3>
            <div className="space-y-2">
              <label className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${paymentPlan === 'monthly' ? 'border-google-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentPlan"
                    checked={paymentPlan === 'monthly'}
                    onChange={() => setPaymentPlan('monthly')}
                    className="w-4 h-4 text-google-blue"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Monthly</p>
                    <p className="text-xs text-gray-500">Pay month-to-month</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">₱6,300/mo</span>
              </label>
              
              <label className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${paymentPlan === 'yearly' ? 'border-google-green bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentPlan"
                    checked={paymentPlan === 'yearly'}
                    onChange={() => setPaymentPlan('yearly')}
                    className="w-4 h-4 text-google-green"
                  />
                  <div>
                    <p className="font-medium text-gray-900">12 Months Upfront</p>
                    <p className="text-xs text-google-green font-medium">Save 30% — ₱22,680 off!</p>
                  </div>
                </div>
                <span className="font-semibold text-google-green">₱52,920</span>
              </label>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>QR Table Placers ({formData.qrDisplays}x)</span>
              <span>{formatPrice(qrTotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tap Cards ({formData.tapCards}x)</span>
              <span>{formatPrice(tapCardTotal)}</span>
            </div>
            {paymentPlan === 'monthly' ? (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Monthly Subscription</span>
                <span>₱6,300/month</span>
              </div>
            ) : (
              <div className="flex justify-between text-sm text-google-green font-medium">
                <span>12 Months Upfront (Save 30%)</span>
                <span>₱52,920</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-400 line-through">
              <span>Setup Fee</span>
              <span>₱12,000</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 line-through">
              <span>3 Months Maps Optimisation</span>
              <span>₱55,000</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total Due Today</span>
                <span className="text-google-green">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Includes {paymentPlan === 'yearly' ? '12 months' : 'first month'} subscription</p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-500 text-center mb-3">Payment Options</p>
            <div className="grid grid-cols-3 gap-3">
              {/* Visa / Mastercard */}
              <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <img 
                  src="https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/visamastercardimage.png" 
                  alt="Visa / Mastercard" 
                  className="h-8 w-auto object-contain"
                />
                <span className="text-[10px] text-gray-500 text-center">Visa / Mastercard</span>
              </div>
              
              {/* Bank Transfer */}
              <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <div className="h-8 flex items-center justify-center">
                  <span className="text-2xl">🏦</span>
                </div>
                <span className="text-[10px] text-gray-500 text-center">Bank Transfer</span>
              </div>
              
              {/* GCash */}
              <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <div className="h-8 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">GCash</span>
                </div>
                <span className="text-[10px] text-gray-500 text-center">GCash</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-base bg-google-green hover:bg-green-600 shadow-soft-lg"
          >
            {isSubmitting ? 'Sending...' : 'Complete Order'}
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  )
}
