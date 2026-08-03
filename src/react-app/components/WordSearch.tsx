import { useState } from 'react'

type Difficulty = 'easy' | 'medium' | 'hard'

interface WordListData {
  name: string
  emoji: string
  words: string[]
  grid: string[][]
  positions: Record<string, [number, number][]>
}

const DIFFICULTIES: Record<Difficulty, { label: string; emoji: string; color: string }> = {
  easy: { label: 'Easy', emoji: '🌟', color: 'bg-green-500' },
  medium: { label: 'Medium', emoji: '⭐', color: 'bg-yellow-500' },
  hard: { label: 'Hard', emoji: '🔥', color: 'bg-red-500' },
}

const WORD_LISTS: Record<Difficulty, Record<string, WordListData>> = {
  easy: {
    animals: {
      name: 'Animals',
      emoji: '🐾',
      words: ['CAT', 'DOG', 'BIRD', 'FISH'],
      grid: [
        ['C', 'A', 'T', 'X', 'B'],
        ['D', 'F', 'I', 'S', 'H'],
        ['O', 'R', 'Q', 'R', 'I'],
        ['G', 'B', 'I', 'R', 'D'],
        ['P', 'K', 'L', 'M', 'N'],
      ],
      positions: {
        'CAT': [[0,0], [0,1], [0,2]],
        'DOG': [[1,0], [2,0], [3,0]],
        'BIRD': [[3,1], [3,2], [3,3], [3,4]],
        'FISH': [[1,1], [1,2], [1,3], [1,4]],
      }
    },
    food: {
      name: 'Food',
      emoji: '🍕',
      words: ['PIE', 'EGG', 'JAM', 'HAM'],
      grid: [
        ['P', 'I', 'E', 'X', 'J'],
        ['E', 'G', 'G', 'A', 'A'],
        ['H', 'A', 'M', 'B', 'M'],
        ['Q', 'R', 'S', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z'],
      ],
      positions: {
        'PIE': [[0,0], [0,1], [0,2]],
        'EGG': [[1,0], [1,1], [1,2]],
        'JAM': [[0,4], [1,4], [2,4]],
        'HAM': [[2,0], [2,1], [2,2]],
      }
    },
    colors: {
      name: 'Colors',
      emoji: '🎨',
      words: ['RED', 'BLUE', 'PINK'],
      grid: [
        ['R', 'E', 'D', 'X', 'B'],
        ['P', 'I', 'N', 'K', 'L'],
        ['Q', 'R', 'S', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'E'],
        ['A', 'B', 'C', 'D', 'E'],
      ],
      positions: {
        'RED': [[0,0], [0,1], [0,2]],
        'BLUE': [[0,4], [1,4], [2,4], [3,4]],
        'PINK': [[1,0], [1,1], [1,2], [1,3]],
      }
    }
  },
  medium: {
    animals: {
      name: 'Animals',
      emoji: '🐾',
      words: ['TIGER', 'HORSE', 'SNAKE', 'WHALE'],
      grid: [
        ['T', 'I', 'G', 'E', 'R', 'W'],
        ['Q', 'S', 'N', 'A', 'K', 'E'],
        ['H', 'O', 'R', 'S', 'E', 'P'],
        ['W', 'X', 'Y', 'Z', 'A', 'L'],
        ['H', 'M', 'N', 'O', 'P', 'Q'],
        ['A', 'B', 'C', 'D', 'E', 'F'],
        ['L', 'R', 'S', 'T', 'U', 'V'],
        ['E', 'W', 'X', 'Y', 'Z', 'A'],
      ],
      positions: {
        'TIGER': [[0,0], [0,1], [0,2], [0,3], [0,4]],
        'SNAKE': [[1,1], [1,2], [1,3], [1,4], [1,5]],
        'HORSE': [[2,0], [2,1], [2,2], [2,3], [2,4]],
        'WHALE': [[3,0], [4,0], [5,0], [6,0], [7,0]],
      }
    },
    food: {
      name: 'Food',
      emoji: '🍕',
      words: ['PASTA', 'BREAD', 'SALAD', 'JUICE'],
      grid: [
        ['P', 'A', 'S', 'T', 'A', 'J'],
        ['B', 'R', 'E', 'A', 'D', 'U'],
        ['S', 'A', 'L', 'A', 'D', 'I'],
        ['X', 'Y', 'Z', 'Q', 'R', 'C'],
        ['M', 'N', 'O', 'P', 'Q', 'E'],
        ['T', 'U', 'V', 'W', 'X', 'Y'],
      ],
      positions: {
        'PASTA': [[0,0], [0,1], [0,2], [0,3], [0,4]],
        'BREAD': [[1,0], [1,1], [1,2], [1,3], [1,4]],
        'SALAD': [[2,0], [2,1], [2,2], [2,3], [2,4]],
        'JUICE': [[0,5], [1,5], [2,5], [3,5], [4,5]],
      }
    },
    nature: {
      name: 'Nature',
      emoji: '🌿',
      words: ['RIVER', 'OCEAN', 'CLOUD', 'STORM'],
      grid: [
        ['R', 'I', 'V', 'E', 'R', 'C'],
        ['O', 'C', 'E', 'A', 'N', 'L'],
        ['S', 'T', 'O', 'R', 'M', 'O'],
        ['X', 'Y', 'Z', 'A', 'B', 'U'],
        ['C', 'D', 'E', 'F', 'G', 'D'],
        ['H', 'I', 'J', 'K', 'L', 'M'],
      ],
      positions: {
        'RIVER': [[0,0], [0,1], [0,2], [0,3], [0,4]],
        'OCEAN': [[1,0], [1,1], [1,2], [1,3], [1,4]],
        'STORM': [[2,0], [2,1], [2,2], [2,3], [2,4]],
        'CLOUD': [[0,5], [1,5], [2,5], [3,5], [4,5]],
      }
    }
  },
  hard: {
    animals: {
      name: 'Animals',
      emoji: '🐾',
      words: ['ELEPHANT', 'GIRAFFE', 'DOLPHIN', 'PENGUIN'],
      grid: [
        ['E', 'L', 'E', 'P', 'H', 'A', 'N', 'T'],
        ['G', 'I', 'R', 'A', 'F', 'F', 'E', 'X'],
        ['D', 'O', 'L', 'P', 'H', 'I', 'N', 'Y'],
        ['P', 'E', 'N', 'G', 'U', 'I', 'N', 'Z'],
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
        ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
        ['Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F'],
      ],
      positions: {
        'ELEPHANT': [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7]],
        'GIRAFFE': [[1,0], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6]],
        'DOLPHIN': [[2,0], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6]],
        'PENGUIN': [[3,0], [3,1], [3,2], [3,3], [3,4], [3,5], [3,6]],
      }
    },
    science: {
      name: 'Science',
      emoji: '🔬',
      words: ['GRAVITY', 'MOLECULE', 'NUCLEUS', 'PROTEIN'],
      grid: [
        ['G', 'R', 'A', 'V', 'I', 'T', 'Y', 'X'],
        ['M', 'O', 'L', 'E', 'C', 'U', 'L', 'E'],
        ['N', 'U', 'C', 'L', 'E', 'U', 'S', 'Z'],
        ['P', 'R', 'O', 'T', 'E', 'I', 'N', 'A'],
        ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
        ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
        ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'],
        ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
      ],
      positions: {
        'GRAVITY': [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6]],
        'MOLECULE': [[1,0], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7]],
        'NUCLEUS': [[2,0], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6]],
        'PROTEIN': [[3,0], [3,1], [3,2], [3,3], [3,4], [3,5], [3,6]],
      }
    },
    geography: {
      name: 'Geography',
      emoji: '🌍',
      words: ['MOUNTAIN', 'VOLCANO', 'ICELAND', 'TROPICS'],
      grid: [
        ['M', 'O', 'U', 'N', 'T', 'A', 'I', 'N'],
        ['V', 'O', 'L', 'C', 'A', 'N', 'O', 'X'],
        ['I', 'C', 'E', 'L', 'A', 'N', 'D', 'Y'],
        ['T', 'R', 'O', 'P', 'I', 'C', 'S', 'Z'],
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
        ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
        ['Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F'],
      ],
      positions: {
        'MOUNTAIN': [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7]],
        'VOLCANO': [[1,0], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6]],
        'ICELAND': [[2,0], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6]],
        'TROPICS': [[3,0], [3,1], [3,2], [3,3], [3,4], [3,5], [3,6]],
      }
    }
  }
}

export default function WordSearch() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [category, setCategory] = useState<string>('animals')
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set())
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set())

  const categories = WORD_LISTS[difficulty]
  const wordList = categories[category] || Object.values(categories)[0]
  const gridSize = wordList.grid[0].length

  const resetGame = () => {
    setFoundWords(new Set())
    setSelectedCells(new Set())
  }

  const changeDifficulty = (newDiff: Difficulty) => {
    setDifficulty(newDiff)
    const cats = Object.keys(WORD_LISTS[newDiff])
    setCategory(cats[0])
    setFoundWords(new Set())
    setSelectedCells(new Set())
  }

  const changeCategory = (newCat: string) => {
    setCategory(newCat)
    setFoundWords(new Set())
    setSelectedCells(new Set())
  }

  const handleCellClick = (row: number, col: number) => {
    for (const word of wordList.words) {
      if (foundWords.has(word)) continue
      
      const wordPositions = wordList.positions[word]
      const isPartOfWord = wordPositions.some(([r, c]) => r === row && c === col)
      
      if (isPartOfWord) {
        const cellKey = `${row},${col}`
        const newSelected = new Set(selectedCells)
        
        if (newSelected.has(cellKey)) {
          newSelected.delete(cellKey)
        } else {
          newSelected.add(cellKey)
        }
        
        setSelectedCells(newSelected)
        
        const wordComplete = wordPositions.every(([r, c]) => newSelected.has(`${r},${c}`))
        if (wordComplete) {
          setFoundWords(prev => new Set([...prev, word]))
        }
        
        return
      }
    }
  }

  const isCellHighlighted = (row: number, col: number) => {
    const key = `${row},${col}`
    if (selectedCells.has(key)) return 'selected'
    
    for (const word of foundWords) {
      const wordPositions = wordList.positions[word]
      if (wordPositions.some(([r, c]) => r === row && c === col)) {
        return 'found'
      }
    }
    return null
  }

  const allFound = foundWords.size === wordList.words.length
  const cellSize = difficulty === 'easy' ? 'w-8 h-8 text-sm' : difficulty === 'medium' ? 'w-7 h-7 text-xs' : 'w-6 h-6 text-[10px]'

  return (
    <div className="flex flex-col items-center">
      {/* Difficulty Selector */}
      <div className="flex gap-1 mb-2">
        {(Object.keys(DIFFICULTIES) as Difficulty[]).map((diff) => (
          <button
            key={diff}
            onClick={() => changeDifficulty(diff)}
            className={`px-2 py-1 rounded-full text-xs font-semibold transition-all ${
              difficulty === diff
                ? `${DIFFICULTIES[diff].color} text-white shadow-md`
                : 'bg-amber-800/80 text-white hover:bg-amber-700'
            }`}
          >
            {DIFFICULTIES[diff].emoji} {DIFFICULTIES[diff].label}
          </button>
        ))}
      </div>

      {/* Category Selector */}
      <div className="flex gap-1.5 mb-2">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            className={`px-2 py-1 rounded-full text-xs font-semibold transition-all ${
              category === cat
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-800/80 text-white hover:bg-amber-700'
            }`}
          >
            {categories[cat].emoji}
          </button>
        ))}
      </div>

      {/* Word List */}
      <div className="flex gap-1 mb-2 flex-wrap justify-center max-w-[280px]">
        {wordList.words.map((word) => (
          <span
            key={word}
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              foundWords.has(word)
                ? 'bg-green-500 text-white line-through'
                : 'bg-amber-800/80 text-white'
            }`}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="bg-amber-900/90 rounded-xl p-2 shadow-lg border border-amber-700/50">
        <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {wordList.grid.map((row, rowIdx) =>
            row.map((letter, colIdx) => {
              const highlight = isCellHighlighted(rowIdx, colIdx)
              return (
                <button
                  key={`${rowIdx}-${colIdx}`}
                  onClick={() => handleCellClick(rowIdx, colIdx)}
                  className={`${cellSize} flex items-center justify-center font-bold rounded transition-all ${
                    highlight === 'found'
                      ? 'bg-green-500 text-white'
                      : highlight === 'selected'
                      ? 'bg-blue-400 text-white'
                      : 'bg-amber-700/80 text-white hover:bg-amber-600'
                  }`}
                >
                  {letter}
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* Status */}
      <div className="h-8 flex items-center justify-center mt-2">
        {allFound ? (
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold text-sm animate-bounce">🎉 All found!</span>
            <button
              onClick={resetGame}
              className="text-xs bg-amber-800/80 text-white px-2 py-1 rounded-full hover:bg-amber-700"
            >
              Play again
            </button>
          </div>
        ) : (
          <span className="text-white/80 text-xs">Tap letters to find words!</span>
        )}
      </div>
    </div>
  )
}
