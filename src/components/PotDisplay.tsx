'use client'

import { formatUnits } from 'viem'
import { useState, useEffect } from 'react'

interface PotDisplayProps {
  totalPot: bigint
  commitCount: number
  jackpotBonus: bigint
  rolloverAmount?: bigint
  isHero?: boolean
  jackpotThreshold?: bigint
}

export function PotDisplay({ 
  totalPot, 
  commitCount, 
  jackpotBonus, 
  rolloverAmount = BigInt(0),
  isHero = false,
  jackpotThreshold = BigInt('500000000000000000000000') // 500K $CLAWDIA
}: PotDisplayProps) {
  const [previousPot, setPreviousPot] = useState(totalPot)
  const [isAnimating, setIsAnimating] = useState(false)

  // Animate when pot changes
  useEffect(() => {
    if (totalPot !== previousPot) {
      setIsAnimating(true)
      const timeout = setTimeout(() => setIsAnimating(false), 1000)
      setPreviousPot(totalPot)
      return () => clearTimeout(timeout)
    }
  }, [totalPot, previousPot])

  const formatPot = (amount: bigint) => {
    const formatted = parseFloat(formatUnits(amount, 18))
    if (formatted >= 1000000) {
      return { value: (formatted / 1000000).toFixed(2), suffix: 'M' }
    } else if (formatted >= 1000) {
      return { value: (formatted / 1000).toFixed(1), suffix: 'K' }
    }
    return { value: formatted.toLocaleString(undefined, { maximumFractionDigits: 0 }), suffix: '' }
  }

  const totalAmount = totalPot + jackpotBonus + rolloverAmount
  const formatted = formatPot(totalAmount)
  const isJackpotActive = totalAmount >= jackpotThreshold

  if (isHero) {
    return (
      <div className="text-center">
        {/* HERO Pot Display */}
        <div className={`relative ${isAnimating ? 'animate-pulse' : ''}`}>
          <div className="status-orb w-48 h-48 md:w-56 md:h-56 flex flex-col items-center justify-center text-center">
            <div className="runic-ring"></div>
            <div className="runic-ring"></div>
            
            <div className="relative z-10">
              <div className="text-sm text-text-dim font-heading uppercase tracking-widest mb-2">
                Live Pot
              </div>
              
              <div className={`text-3xl md:text-4xl font-display font-bold mb-1 ${
                isJackpotActive ? 'text-amber-glow animate-pulse' : 'text-violet-glow'
              }`}>
                {formatted.value}{formatted.suffix && <span className="text-xl md:text-2xl">{formatted.suffix}</span>}
              </div>
              
              <div className="text-lg font-heading text-text-secondary mb-4">
                $CLAWDIA
              </div>
              
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="text-text-dim">👥 {commitCount}</span>
                {isJackpotActive && (
                  <span className="text-amber-bright animate-pulse font-bold">
                    🎰 JACKPOT!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pot Breakdown */}
        {(jackpotBonus > 0n || rolloverAmount > 0n) && (
          <div className="glass-panel p-4 mt-4 text-sm">
            <div className="text-text-dim mb-2">Pot breakdown:</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Player stakes:</span>
                <span>{formatPot(totalPot).value}{formatPot(totalPot).suffix} $CLAWDIA</span>
              </div>
              {jackpotBonus > 0n && (
                <div className="flex justify-between text-amber-bright">
                  <span>Jackpot bonus:</span>
                  <span>+{formatPot(jackpotBonus).value}{formatPot(jackpotBonus).suffix} $CLAWDIA</span>
                </div>
              )}
              {rolloverAmount > 0n && (
                <div className="flex justify-between text-violet-bright">
                  <span>Previous rollover:</span>
                  <span>+{formatPot(rolloverAmount).value}{formatPot(rolloverAmount).suffix} $CLAWDIA</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Compact version for sidebar
  return (
    <div className={`glass-panel p-4 text-center ${isAnimating ? 'animate-pulse' : ''}`}>
      <div className="text-sm text-text-dim font-heading uppercase tracking-widest mb-2">
        Current pot
      </div>
      <div className={`text-3xl font-display font-bold mb-2 ${
        isJackpotActive ? 'text-amber-glow' : 'text-violet-glow'
      }`}>
        {formatted.value}{formatted.suffix && <span className="text-xl">{formatted.suffix}</span>}
      </div>
      <div className="text-sm font-heading text-text-secondary mb-3">
        $CLAWDIA
      </div>
      <div className="flex items-center justify-center gap-3 text-sm text-text-dim">
        <span>👥 {commitCount}</span>
        {isJackpotActive && (
          <span className="text-amber-bright animate-pulse">🎰</span>
        )}
      </div>
    </div>
  )
}
