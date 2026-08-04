import { useState } from 'react'
import { X, Send, Gift, Calendar } from 'lucide-react'
import { Button } from '@/react-app/components/ui/button'

interface UAEOrderFormProps {
  onClose: () => void
}

export default function UAEOrderForm({ onClose }: UAEOrderFormProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    phone: '',
    email: '',
    qrDisplays: 2,
    tapCards: 2
  })
  const [paymentPlan, setPaymentPlan] = useState<'monthly' | 'yearly'>('monthly')

  const QR_DISPLAY_PRICE = 35 // 35 AED
  const TAP_CARD_PRICE = 99 // 99 AED
  const MONTHLY_SUBSCRIPTION = 449 // 449 AED
  const YEARLY_SUBSCRIPTION = 3772 // AED 3,772 (30% off)

  const qrTotal = formData.qrDisplays * QR_DISPLAY_PRICE
  const tapCardTotal = formData.tapCards * TAP_CARD_PRICE
  const subscriptionAmount = paymentPlan === 'yearly' ? YEARLY_SUBSCRIPTION : MONTHLY_SUBSCRIPTION
  const totalPrice = subscriptionAmount + qrTotal + tapCardTotal

  const formatPrice = (price: number) => {
    return `AED ${price.toLocaleString()}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Build WhatsApp message
    const subscriptionText = paymentPlan === 'yearly' 
      ? `12 Months Upfront: AED 3,772 (Save 30% - AED 1,616!)`
      : `Monthly Subscription: AED 449/month`
    
    const message = `🎉 *NEW ORDER - ReviewMultiplier UAE*

📍 *Business Details*
Business Name: ${formData.businessName}
Contact Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

📦 *Order Details*
• Matte Table QR Displays: ${formData.qrDisplays}x @ AED 35 = ${formatPrice(qrTotal)}
• Tap Cards: ${formData.tapCards}x @ AED 99 = ${formatPrice(tapCardTotal)}
• ${subscriptionText}

💰 *Total Due Today: ${formatPrice(totalPrice)}*
(includes ${paymentPlan === 'yearly' ? '12 months' : 'first month'} subscription)

🎁 *This Months Special Applied!*
✅ Setup Fee WAIVED (Save AED 750)
✅ 3 Months FREE Business Optimisation (Worth AED 3,500)

Ready to get started!`

    // Encode message and open WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/61488898835?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    onClose()
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
          <div className="bg-gradient-to-r from-google-green to-emerald-500 text-white rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">This Months Special!</p>
                <p className="text-sm text-white/90">Setup Fee Waived All Month</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 space-y-1">
              <p className="text-sm flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>Save AED 750 setup fee</span>
              </p>
              <p className="text-sm flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>3 months FREE optimisation (worth AED 3,500)</span>
              </p>
            </div>
          </div>
          
          <p className="text-google-blue font-semibold text-sm mb-1">Ready to multiply your reviews for AED 449/month</p>
          <h2 className="text-2xl font-bold text-gray-900">Order Now 🇦🇪</h2>
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
              Your Name
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
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all"
              placeholder="+971 50 123 4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              How many Matte Table QR Displays?
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
              <span className="text-gray-500 text-sm">@ AED 35 each</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              How many Tap Cards?
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
              <span className="text-gray-500 text-sm">@ AED 99 each</span>
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
                <span className="font-semibold text-gray-900">AED 449/mo</span>
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
                    <p className="text-xs text-google-green font-medium">Save 30% — AED 1,616 off!</p>
                  </div>
                </div>
                <span className="font-semibold text-google-green">AED 3,772</span>
              </label>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Matte Table QR Displays ({formData.qrDisplays}x)</span>
              <span>{formatPrice(qrTotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tap Cards ({formData.tapCards}x)</span>
              <span>{formatPrice(tapCardTotal)}</span>
            </div>
            {paymentPlan === 'monthly' ? (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Monthly Subscription</span>
                <span>AED 449/month</span>
              </div>
            ) : (
              <div className="flex justify-between text-sm text-google-green font-medium">
                <span>12 Months Upfront (Save 30%)</span>
                <span>AED 3,772</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-400 line-through">
              <span>Setup Fee</span>
              <span>AED 750</span>
            </div>
            <div className="flex justify-between text-sm text-google-green">
              <span>3 Months Optimisation</span>
              <span>FREE (worth AED 3,500)</span>
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
              <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <img 
                  src="https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/visamastercardimage.png" 
                  alt="Visa / Mastercard" 
                  className="h-8 w-auto object-contain"
                />
                <span className="text-[10px] text-gray-500 text-center">Visa / Mastercard</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <img 
                  src="https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/permatabank.png" 
                  alt="Bank Transfer" 
                  className="h-8 w-auto object-contain"
                />
                <span className="text-[10px] text-gray-500 text-center">Bank Transfer</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <img 
                  src="https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/bitcoin.png" 
                  alt="Bitcoin" 
                  className="h-8 w-auto object-contain"
                />
                <span className="text-[10px] text-gray-500 text-center">Crypto</span>
              </div>
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full py-6 text-base bg-google-green hover:bg-green-600 shadow-soft-lg"
          >
            Get Started via WhatsApp
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  )
}
