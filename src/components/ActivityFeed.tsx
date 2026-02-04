'use client'

import { useEffect, useState } from 'react'
import { useWatchContractEvent } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import { CONTRACTS, SPELLBLOCK_CORE_ABI } from '@/config/contracts'
import { formatUnits } from 'viem'

interface CommitActivity {
  player: string
  stake: bigint
  timestamp: number
  totalPot: bigint
  commitCount: number
}

export function ActivityFeed({ roundId }: { roundId?: bigint }) {
  const [activities, setActivities] = useState<CommitActivity[]>([])
  const contracts = CONTRACTS[baseSepolia.id]

  // Watch for new commits
  useWatchContractEvent({
    address: contracts.spellBlockCore,
    abi: SPELLBLOCK_CORE_ABI,
    eventName: 'PlayerCommitted',
    args: roundId ? { roundId } : undefined,
    onLogs: (logs) => {
      const newActivities = logs.map(log => ({
        player: log.args.player!,
        stake: log.args.stake!,
        timestamp: Date.now(),
        totalPot: log.args.newTotalPot!,
        commitCount: Number(log.args.newCommitCount!),
      }))
      setActivities(prev => [...newActivities, ...prev].slice(0, 10)) // Keep last 10
    }
  })

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const formatStake = (stake: bigint) => {
    const formatted = parseFloat(formatUnits(stake, 18))
    if (formatted >= 1000000) {
      return `${(formatted / 1000000).toFixed(1)}M`
    } else if (formatted >= 1000) {
      return `${(formatted / 1000).toFixed(1)}K`
    }
    return formatted.toFixed(0)
  }

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">⚡</span>
        <h3 className="font-heading font-bold text-amber-bright">Live Activity</h3>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center text-text-dim text-sm py-8">
            <span className="text-2xl block mb-2">👻</span>
            No commits yet this round
          </div>
        ) : (
          activities.map((activity, i) => (
            <div key={i} className="flex items-center justify-between text-sm bg-background-darker p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-violet-bright rounded-full animate-pulse" />
                <span className="font-mono text-text-secondary">
                  {truncateAddress(activity.player)}
                </span>
              </div>
              <div className="text-right">
                <div className="text-amber-bright font-bold">
                  {formatStake(activity.stake)} $CLAWDIA
                </div>
                <div className="text-xs text-text-dim">
                  #{activity.commitCount} commit
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {activities.length > 0 && (
        <div className="text-center text-xs text-text-dim mt-3">
          No words shown until reveal phase 🤫
        </div>
      )}
    </div>
  )
}