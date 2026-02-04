'use client'

import { useReadContract } from 'wagmi'
import { base } from 'viem/chains'
import { CONTRACTS, SPELLBLOCK_TREASURY_ABI } from '@/config/contracts'
import { formatUnits } from 'viem'

export function BurnCounter() {
  const contracts = CONTRACTS[base.id]

  const { data: totalBurned } = useReadContract({
    address: contracts.spellBlockTreasury,
    abi: SPELLBLOCK_TREASURY_ABI,
    functionName: 'totalBurned',
  })

  const formatBurned = (burned?: bigint) => {
    if (!burned) return '0'
    const formatted = parseFloat(formatUnits(burned, 18))
    if (formatted >= 1000000) {
      return `${(formatted / 1000000).toFixed(2)}M`
    } else if (formatted >= 1000) {
      return `${(formatted / 1000).toFixed(1)}K`
    }
    return formatted.toLocaleString(undefined, { maximumFractionDigits: 0 })
  }

  return (
    <div className="glass-panel p-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-2xl">🔥</span>
        <h3 className="font-heading font-bold text-red-400">Total Burned</h3>
      </div>
      
      <div className="text-3xl font-display font-bold text-red-bright mb-1">
        {formatBurned(totalBurned)}
      </div>
      <div className="text-sm text-text-dim">
        $CLAWDIA permanently destroyed
      </div>
      
      <div className="mt-3 pt-3 border-t border-red-400/20">
        <div className="text-xs text-text-secondary">
          Every round burns 1% of all stakes
        </div>
      </div>
    </div>
  )
}