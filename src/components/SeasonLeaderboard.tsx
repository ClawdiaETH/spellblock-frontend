'use client'

import { useState } from 'react'

// TODO: Replace with actual contract data when SeasonAccumulator is deployed
interface LeaderboardEntry {
  rank: number
  player: string
  totalScore: number
  roundsWon: number
  totalWinnings: bigint
}

// Mock data - winnings in wei (18 decimals), amounts reflect 1M min stake economy
const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, player: '0x1234...5678', totalScore: 1250, roundsWon: 8, totalWinnings: BigInt('45000000000000000000000000') }, // 45M
  { rank: 2, player: '0x2345...6789', totalScore: 1100, roundsWon: 6, totalWinnings: BigInt('32000000000000000000000000') }, // 32M
  { rank: 3, player: '0x3456...789a', totalScore: 980, roundsWon: 5, totalWinnings: BigInt('28000000000000000000000000') },  // 28M
  { rank: 4, player: '0x4567...89ab', totalScore: 850, roundsWon: 4, totalWinnings: BigInt('19000000000000000000000000') },  // 19M
  { rank: 5, player: '0x5678...9abc', totalScore: 720, roundsWon: 3, totalWinnings: BigInt('15000000000000000000000000') },  // 15M
]

export function SeasonLeaderboard() {
  const [isExpanded, setIsExpanded] = useState(false)

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const formatWinnings = (amount: bigint) => {
    const tokens = Number(amount) / 1e18
    if (tokens >= 1_000_000_000) {
      return `${(tokens / 1_000_000_000).toFixed(1)}B`
    }
    if (tokens >= 1_000_000) {
      return `${(tokens / 1_000_000).toFixed(1)}M`
    }
    if (tokens >= 1_000) {
      return `${(tokens / 1_000).toFixed(1)}K`
    }
    return tokens.toFixed(0)
  }

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '👑'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  const displayedEntries = isExpanded ? mockLeaderboard : mockLeaderboard.slice(0, 3)

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏆</span>
          <h3 className="font-heading font-bold text-amber-bright">Season 1 leaders</h3>
        </div>
        <div className="text-xs text-text-dim">
          Day 8/14
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        {displayedEntries.map((entry) => (
          <div key={entry.rank} className="flex items-center justify-between bg-background-darker p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-lg w-6 text-center">
                {getRankEmoji(entry.rank)}
              </div>
              <div>
                <div className="font-mono text-sm text-text-primary">
                  {truncateAddress(entry.player)}
                </div>
                <div className="text-xs text-text-dim">
                  {entry.roundsWon} wins
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-amber-bright font-bold">
                {entry.totalScore} pts
              </div>
              <div className="text-xs text-text-secondary">
                {formatWinnings(entry.totalWinnings)} $CLAWDIA
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {mockLeaderboard.length > 3 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-sm text-violet-glow hover:text-violet-bright transition-colors"
        >
          {isExpanded ? '↑ Show less' : '↓ View all leaders'}
        </button>
      )}
      
      <div className="text-center text-xs text-text-dim mt-3 pt-3 border-t border-amber-glow/20">
        Season ends in 6 days • Top 3 get bonus rewards
      </div>
    </div>
  )
}
