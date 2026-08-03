import { useState } from 'react'
import { X, Send, Gift, Calendar, Truck, Minus, Plus } from 'lucide-react'
import { Button } from '@/react-app/components/ui/button'
import { useCountry } from '@/react-app/context/CountryContext'

interface OrderFormProps {
  onClose: () => void
}

export default function OrderForm({ onClose }: OrderFormProps) {
  const { country, pricing } = useCountry()
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    email: '',
    phone: ''
  })
  const [tapCards, setTapCards] = useState(2)
  const [qrDisplays, setQrDisplays] = useState(1)
  const [paymentPlan, setPaymentPlan] = useState<'monthly' | 'yearly'>('monthly')
  
  // Show shipping note for all countries except Indonesia and Australia
  const showShippingNote = country !== 'Indonesia' && country !== 'Australia'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Build WhatsApp message
    const subscriptionText = paymentPlan === 'yearly' 
      ? `12 Months Upfront: ${pricing?.yearlyPrice} (Save 30% - ${pricing?.yearlySavings}!)`
      : `Monthly Subscription: ${pricing?.label}`
    
    const message = `🎉 *NEW ORDER - ReviewMultiplier*

📍 *Business Details*
Business Name: ${formData.businessName}
Contact Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Region: ${country} ${pricing?.flag}

📦 *Package*
• ${subscriptionText}
• Tap Cards: ${tapCards} × ${pricing?.tapCardPrice} each
• Matte QR Displays (A5): ${qrDisplays} × ${pricing?.qrDisplayPrice} each

🎁 *April Special Applied!*
✅ Setup Fee WAIVED (Save ${pricing?.setupFeeValue})
✅ 3 Months FREE Google Business ${country === 'USA' ? 'Optimization' : 'Optimisation'} (Worth ${pricing?.optimizationValue})

Ready to get started!`

    // Encode message and open WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = pricing?.whatsappNumber || '61488898835'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
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
                <p className="font-bold text-lg">April Special!</p>
                <p className="text-sm text-white/90">Setup Fee Waived All Month</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 space-y-1">
              <p className="text-sm flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>Save {pricing?.setupFeeValue} setup fee</span>
              </p>
              <p className="text-sm flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>3 months FREE {country === 'USA' ? 'optimization' : 'optimisation'} (worth {pricing?.optimizationValue})</span>
              </p>
            </div>
          </div>
          
          <p className="text-google-blue font-semibold text-sm mb-1">Ready to multiply your reviews for {pricing?.price}/month</p>
          <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
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
              placeholder="+1 (555) 000-0000"
            />
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
                <span className="font-semibold text-gray-900">{pricing?.price}/mo</span>
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
                    <p className="text-xs text-google-green font-medium">Save 30% — {pricing?.yearlySavings} off!</p>
                  </div>
                </div>
                <span className="font-semibold text-google-green">{pricing?.yearlyPrice}</span>
              </label>
            </div>
          </div>

          {/* Product Selection */}
          <div className="bg-blue-50 rounded-2xl p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">Add Products</h3>
            
            {/* Tap Cards */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Tap Cards</p>
                <p className="text-xs text-gray-500">{pricing?.tapCardPrice} each</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTapCards(Math.max(0, tapCards - 1))}
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">{tapCards}</span>
                <button
                  type="button"
                  onClick={() => setTapCards(tapCards + 1)}
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* QR Displays */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Matte QR Displays (A5)</p>
                <p className="text-xs text-gray-500">{pricing?.qrDisplayPrice} each</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQrDisplays(Math.max(0, qrDisplays - 1))}
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">{qrDisplays}</span>
                <button
                  type="button"
                  onClick={() => setQrDisplays(qrDisplays + 1)}
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Shipping Note */}
            {showShippingNote && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-3">
                <div className="flex gap-2">
                  <Truck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-800">
                    <p className="font-medium mb-1">Shipping Information</p>
                    <p>• <strong>Matte QR Displays</strong> — Printed & shipped locally</p>
                    <p>• <strong>Tap Cards</strong> — Created & shipped from Australia (10-14 working days avg.)</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            {paymentPlan === 'monthly' ? (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Monthly Subscription</span>
                <span>{pricing?.label}</span>
              </div>
            ) : (
              <div className="flex justify-between text-sm text-google-green font-medium">
                <span>12 Months Upfront (Save 30%)</span>
                <span>{pricing?.yearlyPrice}</span>
              </div>
            )}
            {tapCards > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tap Cards ({tapCards}×)</span>
                <span>{tapCards} × {pricing?.tapCardPrice}</span>
              </div>
            )}
            {qrDisplays > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Matte QR Displays ({qrDisplays}×)</span>
                <span>{qrDisplays} × {pricing?.qrDisplayPrice}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-400 line-through">
              <span>Setup Fee</span>
              <span>{pricing?.setupFeeValue}</span>
            </div>
            <div className="flex justify-between text-sm text-google-green">
              <span>3 Months Google {country === 'USA' ? 'Optimization' : 'Optimisation'}</span>
              <span>FREE</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">First month subscription + products — no setup fee!</p>
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
