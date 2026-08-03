import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Star } from 'lucide-react'

const STORAGE_KEY = 'finnsbeachparty_prize'

// Prizes with weighted probabilities
const PRIZES = [
  { label: 'Free Champagne', color: '#FF6B35', weight: 0 },
  { label: 'Free Shot', color: '#00D9FF', weight: 20 },
  { label: 'Free Cocktail', color: '#FF1493', weight: 15 },
  { label: '2 for 1 Cocktail', color: '#7B2CBF', weight: 15 },
  { label: '5% Off Bill', color: '#00CC66', weight: 20 },
  { label: 'Free Dessert', color: '#FFD700', weight: 10 },
]

// Weighted random selection
function selectWeightedPrize(): number {
  const totalWeight = PRIZES.reduce((sum, p) => sum + p.weight, 0)
  let random = Math.random() * totalWeight
  
  for (let i = 0; i < PRIZES.length; i++) {
    random -= PRIZES[i].weight
    if (random <= 0) return i
  }
  return 0
}

const REVIEW_URL = 'https://www.google.com/maps?cid=17493433985612044412'

const BACKGROUND_IMAGE = 'https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/Screenshot-2026-04-08-at-3.30.02-pm.png'

export default function FinnsBeachParty() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)
  const [hasSpun, setHasSpun] = useState(false)
  const [isCheekyMessage, setIsCheekyMessage] = useState(false)
  const [wonPrizeIndex, setWonPrizeIndex] = useState<number | null>(null)
  

  const segmentAngle = 360 / PRIZES.length

  // Check localStorage on mount for previous spin
  useEffect(() => {
    const savedPrize = localStorage.getItem(STORAGE_KEY)
    if (savedPrize) {
      const prizeIndex = parseInt(savedPrize, 10)
      if (!isNaN(prizeIndex) && prizeIndex >= 0 && prizeIndex < PRIZES.length) {
        setHasSpun(true)
        setWonPrizeIndex(prizeIndex)
        setWinner(PRIZES[prizeIndex].label)
        setIsCheekyMessage(true)
      }
    }
  }, [])

  const spin = () => {
    if (isSpinning) return
    
    if (hasSpun && wonPrizeIndex !== null) {
      setIsCheekyMessage(true)
      setWinner(PRIZES[wonPrizeIndex].label)
      return
    }
    
    setIsSpinning(true)
    setWinner(null)
    setIsCheekyMessage(false)
    
    const spins = 10 + Math.floor(Math.random() * 4)
    const targetPrizeIndex = selectWeightedPrize()
    
    const targetAngle = 360 - (targetPrizeIndex * segmentAngle) - (segmentAngle / 2)
    const normalizedTarget = ((targetAngle % 360) + 360) % 360
    
    const currentPosition = rotation % 360
    let additionalRotation = normalizedTarget - currentPosition
    if (additionalRotation < 0) additionalRotation += 360
    
    const newRotation = rotation + (spins * 360) + additionalRotation
    
    setRotation(newRotation)
    
    setTimeout(() => {
      setIsSpinning(false)
      setWinner(PRIZES[targetPrizeIndex].label)
      setHasSpun(true)
      setWonPrizeIndex(targetPrizeIndex)
      localStorage.setItem(STORAGE_KEY, targetPrizeIndex.toString())
    }, 6000)
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url("${BACKGROUND_IMAGE}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      
      {/* Tropical decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-orange-400 to-cyan-400" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-400" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
            Finns Party Restaurant
          </h1>
          <p className="text-cyan-300 font-medium text-sm" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
            🎉 Spin to Win a Prize! 🎉
          </p>
        </div>

        {/* Spin Wheel */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 mb-4">
          {/* Pointer */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-pink-500 drop-shadow-lg" />
          </div>
          
          {/* Outer Ring with neon glow */}
          <div 
            className="absolute inset-0 rounded-full shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF1493 50%, #00D9FF 100%)',
              boxShadow: '0 0 30px rgba(255,20,147,0.5), 0 0 60px rgba(0,217,255,0.3)'
            }}
          />
          
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
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="6"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full shadow-lg border-4 border-white/50 flex items-center justify-center text-white font-bold text-xs hover:scale-105 transition-transform disabled:hover:scale-100 z-10"
            style={{
              background: 'linear-gradient(135deg, #FF1493 0%, #FF6B35 100%)',
              boxShadow: '0 0 20px rgba(255,20,147,0.6)'
            }}
          >
            {isSpinning ? '...' : 'SPIN'}
          </button>
        </div>

        {/* Winner Display */}
        <div className="min-h-[90px] flex flex-col items-center justify-center mb-4">
          {winner && !isSpinning && !isCheekyMessage && (
            <div 
              className="text-white px-5 py-3 rounded-2xl font-medium text-sm shadow-lg text-center max-w-xs"
              style={{
                background: 'linear-gradient(135deg, #FF1493 0%, #7B2CBF 100%)',
                boxShadow: '0 0 20px rgba(255,20,147,0.4)'
              }}
            >
              <p className="font-bold text-base mb-1">🎉 You won: {winner}!</p>
              <p className="text-xs opacity-90">To claim your prize, leave a review and show the staff</p>
            </div>
          )}
          {winner && !isSpinning && isCheekyMessage && (
            <div 
              className="text-white px-5 py-3 rounded-2xl font-medium text-sm shadow-lg text-center max-w-xs"
              style={{
                background: 'linear-gradient(135deg, #FF1493 0%, #7B2CBF 100%)',
                boxShadow: '0 0 20px rgba(255,20,147,0.4)'
              }}
            >
              <p className="mb-1">Hey party animal, you already spun! 🕺</p>
              <p className="font-bold">Your prize: {winner}</p>
              <p className="text-xs mt-1 opacity-90">Leave a review and show the staff to claim!</p>
            </div>
          )}
          {isSpinning && (
            <p className="text-cyan-300 font-medium" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>Spinning...</p>
          )}
        </div>

        {/* Claim Instructions */}
        <p className="text-white/80 text-sm text-center mb-3" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
          To claim your prize, leave a review and show the staff
        </p>

        {/* Review Button */}
        <a
          href={REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 mb-4"
          style={{ boxShadow: '0 0 20px rgba(255,255,255,0.3)' }}
        >
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          Leave Us a Review
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        </a>

        {/* Powered by */}
        <Link to="/" className="text-white/40 text-xs mt-6 hover:text-white/70 transition-colors">
          Powered by ReviewMultiplier
        </Link>
      </div>

    </div>
  )
}
