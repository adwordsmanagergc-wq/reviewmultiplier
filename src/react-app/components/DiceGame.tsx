import { useState, useEffect } from 'react'

const PRIZES = [
  { number: 1, label: '10% Off' },
  { number: 2, label: 'Free Cookie' },
  { number: 3, label: '15% Off' },
  { number: 4, label: 'Free Coffee' },
  { number: 5, label: 'BOGO Deal' },
  { number: 6, label: '20% Off' },
]

// Dot positions for each face of the dice (percentage-based)
const DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 28], [72, 28], [28, 50], [72, 50], [28, 72], [72, 72]],
}

function DiceFace({ number, size = 120 }: { number: number; size?: number }) {
  const dotSize = size * 0.14
  
  return (
    <div 
      className="rounded-xl relative"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(145deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)',
        border: '3px solid #991b1b',
      }}
    >
      {DOT_POSITIONS[number].map((pos, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            left: `${pos[0]}%`,
            top: `${pos[1]}%`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e5e5e5 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      ))}
    </div>
  )
}

export default function DiceGame() {
  const [isRolling, setIsRolling] = useState(false)
  const [currentFace, setCurrentFace] = useState(1)
  const [displayFace, setDisplayFace] = useState(1)
  const [winner, setWinner] = useState<string | null>(null)
  const [hasRolled, setHasRolled] = useState(false)
  const [shake, setShake] = useState(false)

  const roll = () => {
    if (isRolling) return
    
    setIsRolling(true)
    setWinner(null)
    setShake(true)
    
    // Pick random final result
    const finalFace = Math.floor(Math.random() * 6) + 1
    
    // Animate through random faces quickly
    let count = 0
    const totalFlips = 15 + Math.floor(Math.random() * 10) // 15-25 flips
    
    const flipInterval = setInterval(() => {
      count++
      // Random face during rolling
      setDisplayFace(Math.floor(Math.random() * 6) + 1)
      
      if (count >= totalFlips) {
        clearInterval(flipInterval)
        setDisplayFace(finalFace)
        setCurrentFace(finalFace)
        setWinner(PRIZES[finalFace - 1].label)
        setHasRolled(true)
        setIsRolling(false)
        setShake(false)
      }
    }, 80) // Speed of face changes
  }

  // Auto-roll demo after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasRolled) {
        roll()
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center">
      {/* Dice Container */}
      <div 
        className="relative flex items-center justify-center"
        style={{ width: 280, height: 280 }}
      >
        {/* Animated Dice */}
        <div
          className={`transition-transform ${shake ? 'animate-bounce' : ''}`}
          style={{
            animation: shake ? 'shake 0.1s infinite' : 'none',
          }}
        >
          <style>{`
            @keyframes shake {
              0%, 100% { transform: rotate(-8deg) scale(1.05); }
              25% { transform: rotate(8deg) scale(0.95); }
              50% { transform: rotate(-5deg) scale(1.02); }
              75% { transform: rotate(5deg) scale(0.98); }
            }
          `}</style>
          <DiceFace number={displayFace} size={120} />
        </div>
        
        {/* Roll button below dice */}
        <button
          onClick={roll}
          disabled={isRolling}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-8 py-3 bg-white rounded-full shadow-lg border-2 border-gray-200 font-bold text-gray-800 hover:scale-105 transition-transform disabled:hover:scale-100 disabled:opacity-70"
        >
          {isRolling ? '🎲 Rolling...' : 'ROLL'}
        </button>
      </div>

      {/* Winner Display */}
      <div className="h-16 flex items-center justify-center">
        {winner && !isRolling && (
          <div className="bg-gradient-to-r from-google-yellow to-google-green text-gray-800 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce whitespace-nowrap">
            🎲 You rolled {currentFace}: {winner}!
          </div>
        )}
        {!winner && !isRolling && !hasRolled && (
          <p className="text-gray-500 text-sm">Watch the dice roll automatically!</p>
        )}
      </div>
    </div>
  )
}
