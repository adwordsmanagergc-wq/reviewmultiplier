import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react'
import MathsQuiz from '@/react-app/components/MathsQuiz'
import WordSearch from '@/react-app/components/WordSearch'

const STORAGE_KEY = 'nicos_smokehouse_prize'

// Prizes with weighted probabilities
const PRIZES = [
  { label: 'Brownie', color: '#34A853', weight: 0 }, // Disabled
  { label: 'Free Drink', color: '#4285F4', weight: 0 }, // Disabled
  { label: '5% Off', color: '#00ACC1', weight: 70 },
  { label: '10% Off', color: '#FF6D01', weight: 30 },
  { label: '15% Off', color: '#A142F4', weight: 0 }, // Disabled
  { label: '20% Off', color: '#EA4335', weight: 0 }, // Disabled
]

// Weighted random selection
function selectWeightedPrize(): number {
  const totalWeight = PRIZES.reduce((sum, p) => sum + p.weight, 0)
  let random = Math.random() * totalWeight
  
  for (let i = 0; i < PRIZES.length; i++) {
    random -= PRIZES[i].weight
    if (random <= 0) return i
  }
  return 0 // Fallback to first prize
}

const REVIEW_URL = 'https://g.page/r/CYlBMYdGEjPpEBM/review'
const BG_IMAGE = 'https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/WhatsApp-Image-2026-04-03-at-12.05.27.jpeg'

export default function NicosSmokehouse() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)
  const [hasSpun, setHasSpun] = useState(false)
  const [isCheekyMessage, setIsCheekyMessage] = useState(false)
  const [wonPrizeIndex, setWonPrizeIndex] = useState<number | null>(null)
  const [showKidsGames, setShowKidsGames] = useState(false)
  const [currentGame, setCurrentGame] = useState(0)

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
    
    // If already spun, show cheeky message with same prize
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
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, targetPrizeIndex.toString())
    }, 6000)
  }



  const NICO_IMAGE = 'https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/Screenshot-2026-04-03-at-12.22.01-pm.png'
  const HAMMER_IMAGE = 'https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/Screenshot-2026-04-03-at-12.22.12-pm.png'

  const games = [
    { name: 'Word Search', component: <WordSearch />, mascot: NICO_IMAGE },
    { name: 'Maths Quiz', component: <MathsQuiz />, mascot: HAMMER_IMAGE },
  ]

  const nextGame = () => setCurrentGame((prev) => (prev + 1) % games.length)
  const prevGame = () => setCurrentGame((prev) => (prev - 1 + games.length) % games.length)

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Nico's Smokehouse
          </h1>
          <p className="text-amber-400 font-medium text-sm">
            Spin to Win a Prize!
          </p>
        </div>

        {/* Spin Wheel */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 mb-4">
          {/* Pointer */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-amber-500 drop-shadow-lg" />
          </div>
          
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-800 to-amber-950 shadow-2xl" />
          
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
                      strokeWidth="1"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="10"
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-amber-500 shadow-lg border-4 border-amber-300 flex items-center justify-center text-white font-bold text-xs hover:scale-105 transition-transform disabled:hover:scale-100 z-10"
          >
            {isSpinning ? '...' : 'SPIN'}
          </button>
        </div>

        {/* Winner Display */}
        <div className="min-h-[90px] flex flex-col items-center justify-center mb-4">
          {winner && !isSpinning && !isCheekyMessage && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 rounded-2xl font-medium text-sm shadow-lg text-center max-w-xs">
              <p className="font-bold text-base mb-1">🎉 You won: {winner}!</p>
              <p className="text-xs opacity-90">To claim your prize, leave a review and show the staff</p>
            </div>
          )}
          {winner && !isSpinning && isCheekyMessage && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 rounded-2xl font-medium text-sm shadow-lg text-center max-w-xs">
              <p className="mb-1">Hey cheeky, you already spun! 😜</p>
              <p className="font-bold">Your prize: {winner}</p>
              <p className="text-xs mt-1 opacity-90">Leave a review and show the staff to claim!</p>
            </div>
          )}
          {isSpinning && (
            <p className="text-amber-400 font-medium">Spinning...</p>
          )}
        </div>

        {/* Claim Instructions */}
        <p className="text-amber-200/80 text-sm text-center mb-1">
          To claim your prize, leave a review and show the staff
        </p>
        <p className="text-amber-200/60 text-xs text-center mb-3">
          Valid for 1 bill only, cannot be combined per person
        </p>

        {/* Review Button */}
        <a
          href={REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 mb-4"
        >
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          Leave Us a Review
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
        </a>

        {/* Kids Games Button */}
        <button
          onClick={() => setShowKidsGames(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg transition-all hover:scale-105 text-sm"
        >
          🎮 Kids Games
        </button>

        {/* Powered by */}
        <Link to="/" className="text-white/50 text-xs mt-6 hover:text-white/80 transition-colors">
          Powered by ReviewMultiplier
        </Link>
      </div>

      {/* Kids Games Modal */}
      {showKidsGames && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-3xl p-1 max-w-sm w-full max-h-[90vh] overflow-hidden">
            <div className="bg-white rounded-[22px] p-4 h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-800">
                  {games[currentGame].name}
                </h2>
                <button
                  onClick={() => setShowKidsGames(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Game Navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={prevGame}
                  className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-purple-600" />
                </button>
                <div className="flex gap-2">
                  {games.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentGame ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextGame}
                  className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-purple-600" />
                </button>
              </div>

              {/* Game Content */}
              <div 
                className="relative flex items-center justify-center min-h-[350px] rounded-xl overflow-hidden"
                style={{
                  backgroundImage: `url(${games[currentGame].mascot})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay to ensure game is readable */}
                <div className="absolute inset-0 bg-white/85" />
                <div className="relative z-10">
                  {games[currentGame].component}
                </div>
              </div>

              {/* Swipe hint */}
              <p className="text-center text-gray-400 text-xs mt-2">
                ← Swipe or tap arrows to switch games →
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
