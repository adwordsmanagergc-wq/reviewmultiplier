import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Star } from 'lucide-react'

const STORAGE_KEY = 'obeach_ibiza1_prize'

const PRIZES = [
  { number: 1, label: 'Date with Kay' },
  { number: 2, label: 'Guest List Entry' },
  { number: 3, label: 'Free Shot' },
  { number: 4, label: '2 Free Shots' },
  { number: 5, label: 'Free Cocktail' },
  { number: 6, label: '2 Free Cocktails' },
]

const BG_IMAGE = 'https://019d4ea7-203f-7f51-8c55-110f9f85cb54.mochausercontent.com/openart-image_1775225541506_3cc521db_1775225541548_4820df6b.png'

const REVIEW_URL = 'https://www.google.com/search?sca_esv=44946c6285386c20&sxsrf=ANbL-n7OeWisJDIJLMi-mPRc6RazqwHiug:1775223935115&si=AL3DRZFIhG6pAqfNLal55wUTwygCG0fClF3UxiOmgw9Hq7nbWXT0FXJNpCttYBWyatsmHwCaH-yVUi3VaG86i5FsEJVpZxmvRJ0yhFhe3wjzwML7mhNiicWtF-cGqX9tuqCalwFV7IYN&q=O+Beach+Ibiza+Reviews&sa=X&ved=2ahUKEwiqkLLA6NGTAxXYXGwGHfagIqsQ0bkNegQIJRAF&biw=1797&bih=969#lrd=0x129949e7755e4263:0x2cf11014f1e5a55,3,,,,'

// Dot positions for each face of the dice (percentage-based)
const DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 28], [72, 28], [28, 50], [72, 50], [28, 72], [72, 72]],
}

function DiceFace({ number, size = 100 }: { number: number; size?: number }) {
  const dotSize = size * 0.16
  
  return (
    <div 
      className="rounded-xl relative"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(145deg, #fb923c 0%, #f97316 50%, #ea580c 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
        border: '3px solid #fdba74',
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
            background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #f5f5f5 70%, #e0e0e0 100%)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.3)',
          }}
        />
      ))}
    </div>
  )
}

export default function OBeachIbiza1() {
  const [isRolling, setIsRolling] = useState(false)
  const [displayFace, setDisplayFace] = useState(1)
  const [winner, setWinner] = useState<string | null>(null)
  const [hasRolled, setHasRolled] = useState(false)
  const [shake, setShake] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isCheekyMessage, setIsCheekyMessage] = useState(false)

  // Check localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const data = JSON.parse(saved)
      setHasRolled(true)
      setWinner(data.prize)
      setDisplayFace(data.face)
      setFormSubmitted(data.submitted || false)
      if (data.submitted) {
        setShowForm(false)
      }
    }
  }, [])

  const roll = () => {
    if (isRolling) return
    
    // If already rolled, show cheeky message
    if (hasRolled) {
      setIsCheekyMessage(true)
      return
    }
    
    setIsRolling(true)
    setWinner(null)
    setShake(true)
    
    const finalFace = Math.floor(Math.random() * 6) + 1
    
    let count = 0
    const totalFlips = 15 + Math.floor(Math.random() * 10)
    
    const flipInterval = setInterval(() => {
      count++
      setDisplayFace(Math.floor(Math.random() * 6) + 1)
      
      if (count >= totalFlips) {
        clearInterval(flipInterval)
        setDisplayFace(finalFace)
        setWinner(PRIZES[finalFace - 1].label)
        setHasRolled(true)
        setIsRolling(false)
        setShake(false)
        setShowForm(true)
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          prize: PRIZES[finalFace - 1].label,
          face: finalFace,
          submitted: false
        }))
      }
    }, 80)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    
    // Save submission to localStorage
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const data = JSON.parse(saved)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...data,
        submitted: true,
        name: name.trim(),
        email: email.trim()
      }))
    }
    
    setFormSubmitted(true)
    setShowForm(false)
  }

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
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider mb-2" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            O BEACH IBIZA
          </h1>
          <p className="text-white/90 font-medium text-sm">
            Roll the dice to win a prize!
          </p>
        </div>

        {/* Dice Container */}
        <div className="relative flex flex-col items-center mb-6">
          <div
            className={`transition-transform`}
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
          
          {/* Roll button */}
          <button
            onClick={roll}
            disabled={isRolling}
            className="mt-6 px-10 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg font-bold text-lg transition-all hover:scale-105 disabled:hover:scale-100 disabled:opacity-70 border-2 border-orange-300"
          >
            {isRolling ? '🎲 Rolling...' : 'ROLL'}
          </button>
        </div>

        {/* Winner Display */}
        <div className="min-h-[80px] flex items-center justify-center mb-4">
          {winner && !isRolling && !showForm && !isCheekyMessage && formSubmitted && (
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-2xl font-medium text-sm shadow-lg text-center max-w-xs">
              <p className="font-bold text-base mb-1">🎲 You won: {winner}!</p>
              <p className="text-xs opacity-90">Leave a review and show staff to claim!</p>
            </div>
          )}
          {isCheekyMessage && (
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-2xl font-medium text-sm shadow-lg text-center max-w-xs">
              <p className="mb-1">Hey cheeky, you already rolled! 😜</p>
              <p className="font-bold">Your prize: {winner}</p>
              <p className="text-xs mt-1 opacity-90">Leave a review and show staff to claim!</p>
            </div>
          )}
          {isRolling && (
            <p className="text-white font-medium">Rolling...</p>
          )}
          {!winner && !isRolling && !hasRolled && (
            <p className="text-white/80 text-sm">Tap ROLL to try your luck!</p>
          )}
        </div>

        {/* Email Form */}
        {showForm && winner && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl w-full max-w-sm mb-4">
            <div className="text-center mb-4">
              <p className="text-orange-600 font-bold text-lg mb-1">🎉 You won: {winner}!</p>
              <p className="text-gray-600 text-sm">Enter your details to claim your prize</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all hover:scale-[1.02]"
              >
                Claim Prize
              </button>
            </form>
          </div>
        )}

        {/* Review Button */}
        {(formSubmitted || isCheekyMessage) && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl w-full max-w-sm mb-4 text-center">
            <p className="text-orange-600 font-bold text-lg mb-2">🎉 You won: {winner}!</p>
            <p className="text-gray-700 mb-2">To claim your prize, leave a review and show the staff</p>
            <p className="text-gray-600 text-sm mb-4">Don't forget to mention the lovely Lucy's name. Thank you and see you at O Beach!</p>
            <a
              href={REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Star className="w-5 h-5 text-white fill-white" />
              Leave Us a Review
              <Star className="w-5 h-5 text-white fill-white" />
            </a>
          </div>
        )}

        {/* Powered by */}
        <Link to="/" className="text-white/50 text-xs mt-6 hover:text-white/80 transition-colors">
          Powered by ReviewMultiplier
        </Link>
      </div>
    </div>
  )
}
