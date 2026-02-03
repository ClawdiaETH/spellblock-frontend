'use client'

interface LetterPoolProps {
  letters: string
  selectedLetters: string
  onLetterClick?: (letter: string, index: number) => void
}

export function LetterPool({ letters, selectedLetters, onLetterClick }: LetterPoolProps) {
  const letterArray = letters.split('')
  
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {letterArray.map((letter, index) => {
        const isSelected = selectedLetters.includes(letter)
        return (
          <button
            key={index}
            onClick={() => onLetterClick?.(letter, index)}
            className={`letter-tile ${isSelected ? 'selected' : ''}`}
          >
            {letter.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
