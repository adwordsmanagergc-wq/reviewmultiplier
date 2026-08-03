import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/react-app/components/ui/button'

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('rm_welcome_seen')
    if (!hasSeenPopup) {
      setIsVisible(true)
    }
  }, [])

  const handleEnterSite = () => {
    localStorage.setItem('rm_welcome_seen', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center relative animate-in fade-in zoom-in duration-300">
        {/* Warning Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Your Google reviews disappearing?
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold text-red-600 mb-6">
          Missing reviews?
        </h3>

        {/* Message */}
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold">You're not alone.</span>
        </p>
        <p className="text-gray-600 mb-6">
          Businesses everywhere are losing hard-earned reviews — and with them, trust, rankings, and customers.
        </p>

        {/* Warning Text */}
        <p className="text-lg font-semibold text-gray-900 mb-8">
          Don't let it cost you business.
        </p>

        {/* CTA Button */}
        <Button
          onClick={handleEnterSite}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Take Control Now
        </Button>
      </div>
    </div>
  )
}
