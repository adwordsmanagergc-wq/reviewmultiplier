import { useState } from 'react'

type Operation = '+' | '-' | '×'

interface Question {
  num1: number
  num2: number
  operation: Operation
  answer: number
  options: number[]
}

function generateQuestion(difficulty: 'easy' | 'medium' | 'hard'): Question {
  let num1: number, num2: number, answer: number

  const ops: Operation[] = difficulty === 'easy' ? ['+'] : difficulty === 'medium' ? ['+', '-'] : ['+', '-', '×']
  const operation: Operation = ops[Math.floor(Math.random() * ops.length)]
  
  if (difficulty === 'easy') {
    num1 = Math.floor(Math.random() * 10) + 1
    num2 = Math.floor(Math.random() * 10) + 1
  } else if (difficulty === 'medium') {
    num1 = Math.floor(Math.random() * 15) + 5
    num2 = Math.floor(Math.random() * 10) + 1
  } else {
    num1 = Math.floor(Math.random() * 12) + 1
    num2 = Math.floor(Math.random() * 12) + 1
  }
  
  // For subtraction, ensure positive result
  if (operation === '-' && num2 > num1) {
    [num1, num2] = [num2, num1]
  }
  
  switch (operation) {
    case '+': answer = num1 + num2; break
    case '-': answer = num1 - num2; break
    case '×': answer = num1 * num2; break
  }
  
  // Generate wrong options
  const wrongOptions = new Set<number>()
  while (wrongOptions.size < 3) {
    const offset = Math.floor(Math.random() * 10) - 5
    const wrong = answer + offset
    if (wrong !== answer && wrong >= 0) {
      wrongOptions.add(wrong)
    }
  }
  
  const options = [...wrongOptions, answer].sort(() => Math.random() - 0.5)
  
  return { num1, num2, operation, answer, options }
}

export default function MathsQuiz() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [question, setQuestion] = useState<Question>(() => generateQuestion('easy'))
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleAnswer = (selected: number) => {
    if (feedback) return // Prevent multiple answers
    
    setSelectedAnswer(selected)
    setTotal(prev => prev + 1)
    
    if (selected === question.answer) {
      setScore(prev => prev + 1)
      setFeedback('correct')
    } else {
      setFeedback('wrong')
    }
    
    // Move to next question after delay
    setTimeout(() => {
      setQuestion(generateQuestion(difficulty))
      setFeedback(null)
      setSelectedAnswer(null)
    }, 1000)
  }

  const changeDifficulty = (newDiff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDiff)
    setQuestion(generateQuestion(newDiff))
    setScore(0)
    setTotal(0)
    setFeedback(null)
    setSelectedAnswer(null)
  }

  return (
    <div className="flex flex-col items-center">
      {/* Difficulty Selector */}
      <div className="flex gap-1.5 mb-3">
        {(['easy', 'medium', 'hard'] as const).map((diff) => (
          <button
            key={diff}
            onClick={() => changeDifficulty(diff)}
            className={`px-2 py-1 rounded-full text-xs font-semibold transition-all capitalize ${
              difficulty === diff
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-800/80 text-white hover:bg-amber-700'
            }`}
          >
            {diff === 'easy' ? '😊' : diff === 'medium' ? '🤔' : '🧠'} {diff}
          </button>
        ))}
      </div>

      {/* Score */}
      <div className="bg-amber-900/80 rounded-full px-4 py-1 mb-3">
        <span className="text-white font-bold text-sm">
          Score: {score}/{total}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-amber-900/90 rounded-2xl p-4 shadow-lg text-center border border-amber-700/50" style={{ width: 200 }}>
        <div className="text-3xl font-bold text-white mb-4">
          {question.num1} {question.operation} {question.num2} = ?
        </div>
        
        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-2">
          {question.options.map((option, idx) => {
            let bgColor = 'bg-blue-500 hover:bg-blue-600'
            if (feedback && selectedAnswer === option) {
              bgColor = feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'
            } else if (feedback && option === question.answer) {
              bgColor = 'bg-green-500'
            }
            
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={feedback !== null}
                className={`${bgColor} text-white font-bold py-2 rounded-lg transition-colors text-lg`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>

      {/* Feedback */}
      <div className="h-8 flex items-center justify-center mt-2">
        {feedback === 'correct' && (
          <span className="text-green-400 font-bold text-sm animate-bounce">✓ Correct!</span>
        )}
        {feedback === 'wrong' && (
          <span className="text-red-400 font-bold text-sm">✗ Try again!</span>
        )}
      </div>
    </div>
  )
}
