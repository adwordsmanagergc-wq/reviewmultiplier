import { useState, useEffect } from 'react'
import { Gift, Coffee, Percent, Star, Sparkles } from 'lucide-react'

const PRIZES = [
  { label: 'Free Treat', color: '#EA4335', icon: Gift },
  { label: '10% Off', color: '#4285F4', icon: Percent },
  { label: 'Free Coffee Next Visit', color: '#FBBC04', icon: Coffee },
  { label: '15% Off', color: '#34A853', icon: Percent },
  { label: 'Free Muffin', color: '#FF6D01', icon: Gift },
  { label: 'BOGO Coffee', color: '#A142F4', icon: Coffee },
  { label: 'Free Upgrade', color: '#00ACC1', icon: Star },
  { label: '20% Off', color: '#E91E63', icon: Sparkles },
]

export default function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)
  const [hasSpun, setHasSpun] = useState(false)

  const segmentAngle = 360 / PRIZES.length

  const spin = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setWinner(null)
    
    // Random spins (10-14 full rotations)
    const spins = 10 + Math.floor(Math.random() * 4)
    const targetPrizeIndex = Math.floor(Math.random() * PRIZES.length)
    
    // Each segment is 45 degrees (360/8)
    // Segment 0 starts at the top (-90°) and goes clockwise
    // To land pointer on segment i's CENTER:
    // - Segment i's center is at: (i * 45) + 22.5 degrees from the top (going clockwise)
    // - We need to rotate the wheel so that position comes to the top
    // - Rotation needed: 360 - (i * 45 + 22.5) = 337.5 - (i * 45)
    const targetAngle = 337.5 - (targetPrizeIndex * segmentAngle)
    
    // Normalize to 0-360 range
    const normalizedTarget = ((targetAngle % 360) + 360) % 360
    
    // Calculate current position and how much more to rotate
    const currentPosition = rotation % 360
    let additionalRotation = normalizedTarget - currentPosition
    if (additionalRotation < 0) additionalRotation += 360
    
    // Total rotation: current + full spins + additional to reach target
    const newRotation = rotation + (spins * 360) + additionalRotation
    
    setRotation(newRotation)
    
    setTimeout(() => {
      setIsSpinning(false)
      setWinner(PRIZES[targetPrizeIndex].label)
      setHasSpun(true)
    }, 6000)
  }

  // Auto-spin demo after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSpun) {
        spin()
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center">
      {/* Winner Display - Above Wheel */}
      <div className="h-8 flex items-center justify-center mb-2">
        {winner && !isSpinning && (
          <div className="bg-gradient-to-r from-google-yellow to-google-green text-gray-800 px-4 py-1.5 rounded-full font-bold text-xs shadow-lg animate-bounce whitespace-nowrap">
            🎉 You won: {winner}!
          </div>
        )}
        {isSpinning && (
          <p className="text-white/80 font-medium text-xs">Spinning...</p>
        )}
      </div>

      {/* Wheel Container */}
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Pointer */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-t-[28px] border-l-transparent border-r-transparent border-t-gray-800 drop-shadow-lg" />
        </div>
        
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl" />
        
        {/* Wheel */}
        <div 
          className="absolute inset-3 rounded-full overflow-hidden transition-transform ease-out"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transitionDuration: isSpinning ? '6s' : '0s',
            transitionTimingFunction: 'cubic-bezier(0.17, 0.67, 0.12, 0.99)'
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {PRIZES.map((prize, index) => {
              const startAngle = index * segmentAngle - 90
              const endAngle = startAngle + segmentAngle
              const startRad = (startAngle * Math.PI) / 180
              const endRad = (endAngle * Math.PI) / 180
              
              const x1 = 100 + 100 * Math.cos(startRad)
              const y1 = 100 + 100 * Math.sin(startRad)
              const x2 = 100 + 100 * Math.cos(endRad)
              const y2 = 100 + 100 * Math.sin(endRad)
              
              const largeArc = segmentAngle > 180 ? 1 : 0
              
              // Text position (middle of segment, positioned radially)
              const midAngle = startAngle + segmentAngle / 2
              const midRad = (midAngle * Math.PI) / 180
              const textX = 100 + 55 * Math.cos(midRad)
              const textY = 100 + 55 * Math.sin(midRad)
              
              return (
                <g key={index}>
                  <path
                    d={`M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={prize.color}
                    stroke="white"
                    strokeWidth="1"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="7"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {prize.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
        
        {/* Center Button */}
        <button
          onClick={spin}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-lg border-4 border-gray-200 flex items-center justify-center text-gray-800 font-bold text-sm hover:scale-105 transition-transform disabled:hover:scale-100 z-10"
        >
          {isSpinning ? '...' : 'SPIN'}
        </button>
      </div>

    </div>
  )
}
