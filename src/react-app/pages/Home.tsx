import { useState, useRef, useEffect } from 'react'
import { Star, Check, Zap, TrendingUp, Shield, MessageSquare, ChevronRight, Wifi, Reply, RefreshCw, Send, Phone, BarChart3, Building2, Landmark, Globe, ChevronDown } from 'lucide-react'
import { Button } from '@/react-app/components/ui/button'
import SpinWheel from '@/react-app/components/SpinWheel'
import DiceGame from '@/react-app/components/DiceGame'

import MathsQuiz from '@/react-app/components/MathsQuiz'
import WordSearch from '@/react-app/components/WordSearch'
import WhatsAppFloat from '@/react-app/components/WhatsAppFloat'
import IndonesiaOrderForm from '@/react-app/components/IndonesiaOrderForm'
import UAEOrderForm from '@/react-app/components/UAEOrderForm'
import PhilippinesOrderForm from '@/react-app/components/PhilippinesOrderForm'
import OrderForm from '@/react-app/components/OrderForm'
import WelcomePopup from '@/react-app/components/WelcomePopup'
import GoogleGuidelines from '@/react-app/components/GoogleGuidelines'
import GoogleFAQs from '@/react-app/components/GoogleFAQs'
import { useCountry, PRICING, Country } from '@/react-app/context/CountryContext'

const COUNTRY_CODES = [
  { code: '+1', country: 'USA / Canada' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+61', country: 'Australia' },
  { code: '+62', country: 'Indonesia' },
  { code: '+63', country: 'Philippines' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+34', country: 'Spain' },
  { code: '+39', country: 'Italy' },
  { code: '+31', country: 'Netherlands' },
  { code: '+32', country: 'Belgium' },
  { code: '+43', country: 'Austria' },
  { code: '+41', country: 'Switzerland' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+45', country: 'Denmark' },
  { code: '+358', country: 'Finland' },
  { code: '+353', country: 'Ireland' },
  { code: '+351', country: 'Portugal' },
  { code: '+48', country: 'Poland' },
  { code: '+64', country: 'New Zealand' },
  { code: '+65', country: 'Singapore' },
  { code: '+60', country: 'Malaysia' },
  { code: '+66', country: 'Thailand' },
  { code: '+63', country: 'Philippines' },
  { code: '+84', country: 'Vietnam' },
  { code: '+81', country: 'Japan' },
  { code: '+82', country: 'South Korea' },
  { code: '+86', country: 'China' },
  { code: '+91', country: 'India' },
  { code: '+971', country: 'UAE' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+27', country: 'South Africa' },
  { code: '+55', country: 'Brazil' },
  { code: '+52', country: 'Mexico' },
]

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    businessName: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.countryCode} ${formData.phone}`
        })
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-google-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-google-green" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">We'll be in touch with you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all"
          placeholder="Your name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all"
          placeholder="you@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
          Phone Number
        </label>
        <div className="flex gap-2">
          <select
            value={formData.countryCode}
            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
            className="px-3 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all bg-white text-sm"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} {c.country}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all"
            placeholder="Phone number"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1.5">
          Business Name
        </label>
        <input
          type="text"
          id="businessName"
          required
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none transition-all"
          placeholder="Your business name"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-6 text-base bg-google-blue hover:bg-blue-600 shadow-soft-lg"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
        <Send className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}

const FEATURES = [
  {
    icon: Zap,
    title: 'Build Your Customer Database',
    description: 'Every spin captures names, emails, phone numbers, and locations. Build a valuable marketing list that grows with every customer interaction.',
    color: 'bg-google-blue'
  },
  {
    icon: MessageSquare,
    title: 'Market to Your Customers',
    description: 'Send promotions, announce events, launch loyalty campaigns, and bring customers back again and again. Your database is worth far more than any single review.',
    color: 'bg-google-green'
  },
  {
    icon: TrendingUp,
    title: 'Request Reviews (Compliantly)',
    description: 'Follow up AFTER customers leave — fully compliant with Google\'s new rules. Happy customers who already love you = genuine 5-star reviews.',
    color: 'bg-google-red'
  },
  {
    icon: RefreshCw,
    title: 'Drive Repeat Business',
    description: 'Prizes are redeemed on their next visit — turning one-time buyers into loyal regulars who keep coming back for more.',
    color: 'bg-google-yellow'
  },
  {
    icon: Reply,
    title: 'Expert Review Responses',
    description: 'Our expert SEO team replies to ALL your reviews — building trust, boosting rankings, and showing customers you care.',
    color: 'bg-purple-500'
  },
  {
    icon: Shield,
    title: '100% Google Compliant',
    description: 'Our system follows Google\'s April 2025 guidelines. No incentivized reviews, no on-premise requests — just smart, compliant marketing.',
    color: 'bg-orange-500'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Stats Dashboard',
    description: 'Track spins, prize redemptions, database growth, and customer engagement — all in one easy-to-read dashboard.',
    color: 'bg-indigo-500'
  },
  {
    icon: Building2,
    title: 'Multi-Venue Management',
    description: 'Own multiple locations? Manage all your venues from a single dashboard with individual stats, prizes, and branding for each.',
    color: 'bg-teal-500'
  },
]

const TESTIMONIALS = [
  {
    name: 'Kerrith Bhella',
    business: "Nico's Smokehouse Bali",
    rating: 5,
    text: "We have used these guys' services for not only reviews but Google Maps optimisation & Google Ads management too. Amazing, we are only 4 months old!",
    avatar: 'https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/WhatsApp-Image-2026-04-03-at-16.01.31.jpeg'
  },
  {
    name: 'Marcus Chen',
    business: 'Sakura Sushi Bar',
    rating: 5,
    text: 'We went from 47 to 312 reviews in just 3 months. The spin wheel makes customers actually excited to leave feedback.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Sarah Williams',
    business: 'The Coffee Collective',
    rating: 5,
    text: 'Best investment we made this year. Our Google ranking jumped from page 3 to the top 5 local results.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'David Park',
    business: 'Zen Wellness Spa',
    rating: 5,
    text: 'The tap-to-play feature is so convenient. Customers love how quick and easy it is.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
]

export default function Home() {
  const { pricing, country, setCountry } = useCountry()

  const [showIndonesiaForm, setShowIndonesiaForm] = useState(false)
  const [showUAEForm, setShowUAEForm] = useState(false)
  const [showPhilippinesForm, setShowPhilippinesForm] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [selectedGame, setSelectedGame] = useState<'wheel' | 'dice'>('wheel')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [demoFormSubmitted, setDemoFormSubmitted] = useState(false)
  const [showKidsGames, setShowKidsGames] = useState(false)
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const isIndonesia = country === 'Indonesia'
  const isUAE = country === 'UAE'
  const isPhilippines = country === 'Philippines'

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <WelcomePopup />

      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <span className="text-2xl font-bold text-google-blue">R</span>
              <span className="text-2xl font-bold text-google-red">e</span>
              <span className="text-2xl font-bold text-google-yellow">v</span>
              <span className="text-2xl font-bold text-google-blue">i</span>
              <span className="text-2xl font-bold text-google-green">e</span>
              <span className="text-2xl font-bold text-google-red">w</span>
              <span className="text-2xl font-bold text-gray-700">Multiplier</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-google-yellow fill-current" />
              ))}
              <span className="text-sm text-gray-500 ml-1.5">Businesses all over the world</span>
            </div>
            {/* Country Selector */}
            <div className="relative" ref={countryDropdownRef}>
              <button 
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                title="Change region"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{country}</span>
              </button>
              {showCountryDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] z-50">
                  {(Object.keys(PRICING) as Country[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCountry(c)
                        setShowCountryDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${country === c ? 'bg-blue-50 text-google-blue font-medium' : 'text-gray-700'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button 
              className="bg-google-blue hover:bg-blue-600 shadow-soft"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Order Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                <Wifi className="w-4 h-4 text-google-blue" />
                <span className="text-sm font-medium text-gray-700">NFC Tap + QR Code Cards</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
                Build Your Customer Database &{' '}
                <span className="text-gradient">Get 5-Star Reviews</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl lg:max-w-none">
                Google changed the rules — but we've got you covered. Our prize wheel captures customer data first, 
                then you request reviews <span className="font-semibold">after they leave happy</span>. 
                More valuable than ever, and 100% compliant.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                  <Check className="w-4 h-4 text-google-green" />
                  <span className="text-sm text-gray-700">Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                  <Check className="w-4 h-4 text-google-blue" />
                  <span className="text-sm text-gray-700">Setup in 5 minutes</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full">
                  <Check className="w-4 h-4 text-google-yellow" />
                  <span className="text-sm text-gray-700">Ships tomorrow</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full">
                  <Check className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-700">Expert SEO team replies to all reviews</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/review-multiplier.png"
                  alt="Customer using ReviewMultiplier at a coffee shop with QR display and tap card"
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-google-blue/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-google-yellow/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Google Guidelines & How It Works */}
      <GoogleGuidelines />

      {/* Spin Wheel Demo - Phone Mockup */}
      <section id="spin-demo" className="py-16 px-4 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              See It In Action
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Try the game experience just like your customers would at <span className="font-semibold text-amber-700">Robs Coffee Shop</span>
            </p>
          </div>

          {/* Choose Your Game */}
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Choose Your Game</p>
            <div className="inline-flex bg-white rounded-full p-1 shadow-md border border-gray-200">
              <button
                onClick={() => setSelectedGame('wheel')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedGame === 'wheel'
                    ? 'bg-google-blue text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🎡 Spin Wheel
              </button>
              <button
                onClick={() => setSelectedGame('dice')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedGame === 'dice'
                    ? 'bg-google-red text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🎲 Dice Roll
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Phone Mockup with Coffee Shop Background */}
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />
                
                {/* Phone Screen */}
                <div className="relative w-full h-full rounded-[2.25rem] overflow-hidden">
                  {/* Coffee Shop Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=640&h=1280&fit=crop)',
                    }}
                  >
                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full pt-4 px-3">
                    {/* Coffee Shop Header */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 bg-amber-600/90 px-3 py-0.5 rounded-full">
                        <span className="text-white text-[10px] font-semibold">☕ ROBS COFFEE SHOP</span>
                      </div>
                    </div>
                    
                    {/* Game Title Text */}
                    <div className="text-center mt-0.5">
                      <p className="text-white text-sm font-bold leading-tight">
                        {selectedGame === 'wheel' ? 'Spin To Win' : 'Roll To Win'}
                      </p>
                    </div>
                    
                    {/* Game Component */}
                    <div className="flex items-center justify-center -mt-10">
                      <div className="transform scale-[0.58]">
                        {selectedGame === 'wheel' ? <SpinWheel /> : <DiceGame />}
                      </div>
                    </div>
                    
                    {/* Claim Prize Form - positioned inside phone screen */}
                    <div className="text-center -mt-14 pb-2 px-3">
                      {!demoFormSubmitted ? (
                        <>
                          <p className="text-white text-sm font-bold mb-2">
                            Claim Your Prize! 🎁
                          </p>
                          <div className="space-y-1.5">
                            <input 
                              type="text" 
                              placeholder="Name" 
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 border-0 focus:ring-2 focus:ring-amber-400"
                              readOnly
                            />
                            <input 
                              type="email" 
                              placeholder="Email" 
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 border-0 focus:ring-2 focus:ring-amber-400"
                              readOnly
                            />
                            <input 
                              type="tel" 
                              placeholder="Phone Number" 
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 border-0 focus:ring-2 focus:ring-amber-400"
                              readOnly
                            />
                            <input 
                              type="text" 
                              placeholder="Town / Suburb" 
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 border-0 focus:ring-2 focus:ring-amber-400"
                              readOnly
                            />
                            <button 
                              onClick={() => setDemoFormSubmitted(true)}
                              className="w-full bg-google-green hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg transition-colors mt-1"
                            >
                              Submit ✓
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="bg-white/95 rounded-xl p-4 shadow-lg">
                          <div className="text-4xl mb-2">🎉</div>
                          <p className="text-google-green font-bold text-base mb-1">Prize Claimed!</p>
                          <p className="text-gray-700 text-sm font-medium">Show the staff this to claim your prize</p>
                          <div className="mt-3 bg-amber-100 rounded-lg p-2">
                            <p className="text-amber-800 text-xs font-semibold">🎁 FREE COFFEE</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-8 w-20 h-20 bg-amber-200 rounded-full blur-2xl opacity-60" />
              <div className="absolute -top-4 -right-8 w-24 h-24 bg-orange-200 rounded-full blur-2xl opacity-60" />
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            <strong>Make it yours!</strong> Customize prizes, branding, games, colours, and winning odds to match your business.
          </p>
        </div>
      </section>


      {/* Kids Games Section - Collapsible */}
      <section className="py-12 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setShowKidsGames(!showKidsGames)}
            className="w-full bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex items-center justify-between hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-900">Kids Games</h3>
                  <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                    OPTIONAL ADD-ON
                  </span>
                </div>
                <p className="text-sm text-gray-500">Keep little ones entertained — maths quizzes & word searches</p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showKidsGames ? 'rotate-180' : ''}`} />
          </button>

          {showKidsGames && (
            <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
              {/* Games Carousel - horizontal scroll on mobile, grid on desktop */}
              <div className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
                <div className="flex gap-6 px-4" style={{ width: 'max-content' }}>
                  {/* Maths Quiz Phone */}
                  <div className="flex flex-col items-center snap-center min-w-[280px]">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      🧮 Maths Quiz
                    </h3>
                    <div className="relative">
                      <div className="relative w-[260px] h-[520px] bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl border-4 border-gray-800">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl z-20" />
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-cyan-500 to-green-400" />
                          <div className="relative z-10 flex flex-col h-full pt-8 px-3">
                            <div className="text-center mb-2">
                              <p className="text-white text-sm font-bold">Solve the Problem!</p>
                              <p className="text-white/80 text-xs">Pick the right answer</p>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                              <MathsQuiz />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 text-center">Easy, medium & hard levels</p>
                  </div>

                  {/* Word Search Phone */}
                  <div className="flex flex-col items-center snap-center min-w-[280px]">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      🔤 Word Search
                    </h3>
                    <div className="relative">
                      <div className="relative w-[260px] h-[520px] bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl border-4 border-gray-800">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl z-20" />
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-green-600 via-teal-500 to-blue-400" />
                          <div className="relative z-10 flex flex-col h-full pt-8 px-3">
                            <div className="text-center mb-2">
                              <p className="text-white text-sm font-bold">Find the Words!</p>
                              <p className="text-white/80 text-xs">Tap letters to find hidden words</p>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                              <WordSearch />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 text-center">Animals, food & colors</p>
                  </div>
                </div>
              </div>

              {/* Games Grid - desktop only */}
              <div className="hidden md:grid md:grid-cols-2 gap-8 justify-items-center">
                {/* Maths Quiz Phone */}
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    🧮 Maths Quiz
                  </h3>
                  <div className="relative">
                    <div className="relative w-[260px] h-[520px] bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl border-4 border-gray-800">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl z-20" />
                      <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-cyan-500 to-green-400" />
                        <div className="relative z-10 flex flex-col h-full pt-8 px-3">
                          <div className="text-center mb-2">
                            <p className="text-white text-sm font-bold">Solve the Problem!</p>
                            <p className="text-white/80 text-xs">Pick the right answer</p>
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <MathsQuiz />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">Easy, medium & hard levels</p>
                </div>

                {/* Word Search Phone */}
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    🔤 Word Search
                  </h3>
                  <div className="relative">
                    <div className="relative w-[260px] h-[520px] bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl border-4 border-gray-800">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl z-20" />
                      <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-green-600 via-teal-500 to-blue-400" />
                        <div className="relative z-10 flex flex-col h-full pt-8 px-3">
                          <div className="text-center mb-2">
                            <p className="text-white text-sm font-bold">Find the Words!</p>
                            <p className="text-white/80 text-xs">Tap letters to find hidden words</p>
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <WordSearch />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">Animals, food & colors</p>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                <strong>Perfect for family restaurants, cafés & kid-friendly venues!</strong> Games can be customized or disabled.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-gray-100 bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-8 text-center max-w-md mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-google-yellow">4.8★</div>
              <div className="text-sm text-gray-500 mt-1">Avg. Business Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-google-green">23</div>
              <div className="text-sm text-gray-500 mt-1">Reviews/Week Avg.</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your review collection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Place Your Cards',
                description: 'Set up the smart NFC cards or QR code displays on tables, counters, or checkout areas. Takes 30 seconds.',
                color: 'text-google-blue',
                bgBadge: 'bg-google-blue',
                bg: 'bg-blue-50'
              },
              {
                step: '02',
                title: 'Customers Tap & Play',
                description: 'They tap their phone or scan the QR code, spin the prize wheel, and get a chance to win rewards.',
                color: 'text-google-red',
                bgBadge: 'bg-google-red',
                bg: 'bg-red-50'
              },
              {
                step: '03',
                title: 'Build & Market Your Database',
                description: 'Every spin captures customer details — name, email, phone, and location. Follow up with promotions, request reviews after they leave, and turn one-time visitors into loyal regulars.',
                color: 'text-google-green',
                bgBadge: 'bg-google-green',
                bg: 'bg-green-50'
              }
            ].map((item, index) => (
              <div key={index}>
                <div className={`${item.bg} border border-gray-100 rounded-3xl p-6 h-full shadow-sm`}>
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${item.bgBadge} text-white font-bold text-sm mb-4`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Businesses Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to dominate local search and attract more customers
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg">
              <span className="text-lg font-bold">Only {pricing?.price} per month!</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((feature, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-soft transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by Local Businesses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of venues already multiplying their reviews
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 border border-gray-100 rounded-3xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-google-yellow fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.business}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-soft-lg border border-gray-100 p-8 md:p-12 text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-3 h-3 rounded-full bg-google-blue"></div>
              <div className="w-3 h-3 rounded-full bg-google-red"></div>
              <div className="w-3 h-3 rounded-full bg-google-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-google-green"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Multiply Your Reviews?
            </h2>
            <p className="text-gray-600 mb-4 max-w-xl mx-auto">
              Get started today and watch your reviews climb within the first week.
            </p>
            <p className="text-google-green font-semibold mb-8">
              💰 Pay 12 months upfront and save 30%!
            </p>
            {isIndonesia ? (
              <>
                <div className="bg-gradient-to-r from-google-green/10 to-google-blue/10 border border-google-green/30 rounded-xl p-4 mb-4 max-w-md mx-auto">
                  <p className="text-google-green font-bold text-lg mb-1">🎉 Special Offer — Today Only!</p>
                  <p className="text-gray-700 text-sm">✓ FREE Setup (Save 3m)</p>
                  <p className="text-gray-700 text-sm">✓ 3 Months FREE Google Maps Optimization (Worth 15jt)</p>
                </div>
                <Button 
                  size="lg" 
                  className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-google-green hover:bg-green-600 shadow-soft-lg w-full sm:w-auto max-w-full"
                  onClick={() => setShowIndonesiaForm(true)}
                >
                  Buy Now — 1.5jt per month
                  <ChevronRight className="w-5 h-5 ml-2 flex-shrink-0" />
                </Button>
              </>
            ) : isUAE ? (
              <>
                <div className="bg-gradient-to-r from-google-green/10 to-google-blue/10 border border-google-green/30 rounded-xl p-4 mb-4 max-w-md mx-auto">
                  <p className="text-google-green font-bold text-lg mb-1">🎉 April Special — Setup Fee Waived!</p>
                  <p className="text-gray-700 text-sm">✓ FREE Setup (Save AED 750)</p>
                  <p className="text-gray-700 text-sm">✓ 3 Months FREE Business Optimisation (Worth AED 3,500)</p>
                </div>
                <Button 
                  size="lg" 
                  className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-google-green hover:bg-green-600 shadow-soft-lg w-full sm:w-auto max-w-full"
                  onClick={() => setShowUAEForm(true)}
                >
                  Buy Now — AED 449/month
                  <ChevronRight className="w-5 h-5 ml-2 flex-shrink-0" />
                </Button>
              </>
            ) : isPhilippines ? (
              <>
                <div className="bg-gradient-to-r from-google-green/10 to-google-blue/10 border border-google-green/30 rounded-xl p-4 mb-4 max-w-md mx-auto">
                  <p className="text-google-green font-bold text-lg mb-1">🎉 Special Offer — Sign Up Today!</p>
                  <p className="text-gray-700 text-sm">✓ FREE Setup (Save ₱12,000)</p>
                  <p className="text-gray-700 text-sm">✓ 3 Months FREE Google Maps Optimisation (Worth ₱55,000)</p>
                </div>
                <Button 
                  size="lg" 
                  className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-google-green hover:bg-green-600 shadow-soft-lg w-full sm:w-auto max-w-full"
                  onClick={() => setShowPhilippinesForm(true)}
                >
                  Buy Now — ₱6,300/month
                  <ChevronRight className="w-5 h-5 ml-2 flex-shrink-0" />
                </Button>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-google-green/10 to-google-blue/10 border border-google-green/30 rounded-xl p-4 mb-4 max-w-md mx-auto">
                  <p className="text-google-green font-bold text-lg mb-1">🎉 April Special — Setup Fee Waived!</p>
                  <p className="text-gray-700 text-sm">✓ FREE Setup (Save {pricing?.setupFeeValue})</p>
                  <p className="text-gray-700 text-sm">✓ 3 Months FREE Google Business {country === 'USA' ? 'Optimization' : 'Optimisation'} (Worth {pricing?.optimizationValue})</p>
                </div>
                <Button 
                  size="lg" 
                  className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-google-green hover:bg-green-600 shadow-soft-lg w-full sm:w-auto max-w-full"
                  onClick={() => setShowOrderForm(true)}
                >
                  Buy Now — {pricing?.price}/month
                  <ChevronRight className="w-5 h-5 ml-2 flex-shrink-0" />
                </Button>
              </>
            )}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-google-green" /> No lock in
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-google-green" /> Cancel anytime
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-google-green" /> Ships tomorrow
              </span>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-3">Payment Options</p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-lg">
                  <img 
                    src="https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/visamastercardimage.png" 
                    alt="Visa / Mastercard" 
                    className="h-6 w-auto object-contain"
                  />
                  <span className="text-xs text-gray-500">Visa / Mastercard</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-lg">
                  {isIndonesia ? (
                    <img 
                      src="https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/permatabank.png" 
                      alt="Bank Transfer" 
                      className="h-6 w-auto object-contain"
                    />
                  ) : (
                    <Landmark className="h-6 w-6 text-gray-600" />
                  )}
                  <span className="text-xs text-gray-500">Bank Transfer</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-lg">
                  <img 
                    src="https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/bitcoin.png" 
                    alt="Crypto" 
                    className="h-6 w-auto object-contain"
                  />
                  <span className="text-xs text-gray-500">Crypto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft-lg border border-gray-100 p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Get In Touch
              </h2>
              <p className="text-gray-600">
                Fill out the form below and someone will contact you shortly, or{' '}
                <a 
                  href={isIndonesia ? "https://wa.me/6281353698905" : isPhilippines ? "https://wa.me/639457157904" : "https://wa.me/61488898835"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-google-green font-semibold hover:underline inline-flex items-center gap-1"
                >
                  chat live via WhatsApp
                  <Phone className="w-4 h-4" />
                </a>
              </p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <GoogleFAQs />

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-0.5">
              <span className="text-lg font-bold text-google-blue">R</span>
              <span className="text-lg font-bold text-google-red">e</span>
              <span className="text-lg font-bold text-google-yellow">v</span>
              <span className="text-lg font-bold text-google-blue">i</span>
              <span className="text-lg font-bold text-google-green">e</span>
              <span className="text-lg font-bold text-google-red">w</span>
              <span className="text-lg font-bold text-gray-700">Multiplier</span>
            </div>
            
            {/* Clients Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50">
                Our Clients
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <a 
                  href="https://review-multiplier.com/nicossmokehouse" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  🍖 Nico's Smokehouse
                </a>
                <a 
                  href="https://review-multiplier.com/nanasans" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  🍛 Nana Sans Tandoori Hut
                </a>
                <a 
                  href="https://review-multiplier.com/obeachibiza" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  🏖️ O Beach Ibiza
                </a>
                <a 
                  href="https://review-multiplier.com/redruby" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  💎 Red Ruby
                </a>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ReviewMultiplier. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-gray-400">
            <span>
              Website & Marketing by{' '}
              <a 
                href="https://wa.me/61488898835" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-google-green transition-colors"
              >
                Metatap Pty Ltd
              </a>
            </span>
            {isIndonesia && (
              <>
                <span className="hidden md:inline">•</span>
                <span>Product by PT Mac Net Informasi (Indonesia)</span>
              </>
            )}
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppFloat />

      {/* Indonesia Order Form Modal */}
      {showIndonesiaForm && (
        <IndonesiaOrderForm onClose={() => setShowIndonesiaForm(false)} />
      )}
      
      {/* UAE Order Form Modal */}
      {showUAEForm && (
        <UAEOrderForm onClose={() => setShowUAEForm(false)} />
      )}
      
      {/* Philippines Order Form Modal */}
      {showPhilippinesForm && (
        <PhilippinesOrderForm onClose={() => setShowPhilippinesForm(false)} />
      )}
      
      {showOrderForm && (
        <OrderForm onClose={() => setShowOrderForm(false)} />
      )}
    </div>
  )
}
