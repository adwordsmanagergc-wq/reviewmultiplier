import { useState, useEffect } from 'react'
import { useCountry, PRICING } from '@/react-app/context/CountryContext'
import { Dialog, DialogContent } from '@/react-app/components/ui/dialog'
import { Copy, Check } from 'lucide-react'

const PRIZES = [
  { label: '7 Day Trial', short: '7 Days', code: 'TRIAL7' },
  { label: '14 Day Trial', short: '14 Days', code: 'TRIAL14' },
  { label: '1 Month Trial', short: '1 Month', code: 'TRIAL30' },
  { label: '1 Year Trial', short: '1 Year', code: 'TRIALYEAR' },
  { label: '6 Months Trial', short: '6 Months', code: 'TRIAL180' },
  { label: '3 Months Trial', short: '3 Months', code: 'TRIAL90' },
]

// Indices that can be won: 0 (7 day), 1 (14 day), 2 (1 month)
const WINNING_INDICES = [0, 1, 2]

const WHEEL_COLORS = [
  '#4285F4', // Google Blue - 7 Day
  '#34A853', // Google Green - 14 Day
  '#FBBC05', // Google Yellow - 1 Month
  '#EA4335', // Google Red - 1 Year
  '#4285F4', // Google Blue - 6 Months
  '#34A853', // Google Green - 3 Months
]

export default function CountrySelector() {
  const { showSelector, setCountry, detectedCountry, isDetecting } = useCountry()
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasStartedSpin, setHasStartedSpin] = useState(false)
  const [showWinner, setShowWinner] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [wonPrize, setWonPrize] = useState<string>('')
  const [wonCode, setWonCode] = useState<string>('')
  const [copied, setCopied] = useState(false)

  // Auto-start spin when country is detected
  useEffect(() => {
    if (detectedCountry && showSelector && !hasStartedSpin && !isDetecting) {
      // Small delay before starting spin for visual effect
      const timer = setTimeout(() => {
        startSpin()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [detectedCountry, showSelector, hasStartedSpin, isDetecting])

  const startSpin = () => {
    setHasStartedSpin(true)
    setIsSpinning(true)
    setCopied(false)
    
    // Randomly pick from winning indices (7 day, 14 day, or 1 month)
    const winningIndex = WINNING_INDICES[Math.floor(Math.random() * WINNING_INDICES.length)]
    setWonPrize(PRIZES[winningIndex].label)
    setWonCode(PRIZES[winningIndex].code)
    
    const segmentAngle = 360 / PRIZES.length
    // Calculate rotation to land on the winning segment's CENTER
    // Segment 0 starts at top (-90°), each segment is 60°
    // To land pointer on segment i's center:
    // - Segment i's center is at: (i * segmentAngle) + (segmentAngle/2) degrees from the top (going clockwise)
    // - Rotation needed: 360 - (i * segmentAngle + segmentAngle/2) = 360 - segmentAngle/2 - (i * segmentAngle)
    const targetAngle = (360 - segmentAngle / 2) - (winningIndex * segmentAngle)
    
    // Add 5 full spins for dramatic effect
    const fullRotation = 360 * 5 + targetAngle
    
    setWheelRotation(fullRotation)
    
    // Show winner message after spin
    setTimeout(() => {
      setShowWinner(true)
    }, 3200)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(wonCode)
    setCopied(true)
  }

  const handleContinue = () => {
    if (detectedCountry) {
      setCountry(detectedCountry)
    }
    setIsSpinning(false)
    setShowWinner(false)
    setHasStartedSpin(false)
    setWheelRotation(0)
    setWonPrize('')
    setWonCode('')
    setCopied(false)
  }

  const segmentAngle = 360 / PRIZES.length
  const countryPricing = detectedCountry ? PRICING[detectedCountry] : null

  return (
    <Dialog open={showSelector} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <div className="flex flex-col items-center py-6">
          {/* Show detected country and price */}
          {detectedCountry && countryPricing && (
            <div className="text-center mb-4">
              <p className="text-3xl mb-2">{countryPricing.flag}</p>
              <p className="text-lg font-semibold text-gray-900">
                {countryPricing.label}
              </p>
            </div>
          )}
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {isDetecting ? 'Detecting your location...' : showWinner ? '🎉 Congratulations! 🎉' : 'Spin to see your offer!'}
          </h3>
          
          {/* Spin Wheel */}
          <div className="relative w-56 h-56">
            {/* Pointer */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>
            
            {/* Wheel */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                transition: isSpinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
              }}
            >
              {PRIZES.map((prize, index) => {
                const startAngle = index * segmentAngle - 90
                const endAngle = startAngle + segmentAngle
                const startRad = (startAngle * Math.PI) / 180
                const endRad = (endAngle * Math.PI) / 180
                
                const x1 = 100 + 95 * Math.cos(startRad)
                const y1 = 100 + 95 * Math.sin(startRad)
                const x2 = 100 + 95 * Math.cos(endRad)
                const y2 = 100 + 95 * Math.sin(endRad)
                
                const largeArc = segmentAngle > 180 ? 1 : 0
                
                const pathD = `M 100 100 L ${x1} ${y1} A 95 95 0 ${largeArc} 1 ${x2} ${y2} Z`
                
                // Text position
                const midAngle = startAngle + segmentAngle / 2
                const midRad = (midAngle * Math.PI) / 180
                const textX = 100 + 60 * Math.cos(midRad)
                const textY = 100 + 60 * Math.sin(midRad)
                
                return (
                  <g key={index}>
                    <path
                      d={pathD}
                      fill={WHEEL_COLORS[index]}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                      transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                    >
                      {prize.short}
                    </text>
                  </g>
                )
              })}
              {/* Center circle */}
              <circle cx="100" cy="100" r="18" fill="white" stroke="#e5e7eb" strokeWidth="3" />
            </svg>
          </div>
          
          {showWinner ? (
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-green-600 mb-2">
                🎁 {wonPrize}!
              </p>
              <p className="text-gray-600 mb-3">
                Welcome{countryPricing ? `, ${countryPricing.flag}` : ''}!
              </p>
              
              {/* Discount Code */}
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">Your discount code:</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-xl font-bold text-google-blue bg-white px-4 py-2 rounded border-2 border-dashed border-google-blue">
                    {wonCode}
                  </code>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-google-blue text-white hover:bg-blue-600 transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                {copied && (
                  <p className="text-sm text-green-600 mt-2 font-medium">✓ Copied!</p>
                )}
              </div>
              
              <button
                onClick={handleContinue}
                className="w-full bg-google-green hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Continue to Site →
              </button>
            </div>
          ) : (
            <p className="mt-4 text-gray-500 text-sm">
              {isDetecting ? 'Please wait...' : 'Good luck!'}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
