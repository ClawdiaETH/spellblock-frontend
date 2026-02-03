'use client'

import { formatUnits } from 'viem'

interface PotDisplayProps {
  totalStaked: bigint
  numCommits: number
  jackpotTriggered: boolean
}

export function PotDisplay({ totalStaked, numCommits, jackpotTriggered }: PotDisplayProps) {
  const formattedPot = parseFloat(formatUnits(totalStaked, 18)).toLocaleString(undefined, {
    maximumFractionDigits: 0
  })

  return (
    <div className="bg-spell-dark/50 rounded-xl p-6 text-center">
      <p className="text-sm text-gray-400 mb-2">Current pot</p>
      <p className="pot-display">
        {formattedPot} $CLAWDIA
      </p>
      <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-400">
        <span>👥 {numCommits} players</span>
        {jackpotTriggered && (
          <span className="text-amber-400 animate-pulse">🎰 Jackpot active!</span>
        )}
      </div>
    </div>
  )
}
