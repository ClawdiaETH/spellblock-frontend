'use client'

import { useReadContract, useAccount, useChainId } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import { CONTRACTS, SPELLBLOCK_CORE_ABI, SPELL_NAMES, SPELL_DESCRIPTIONS } from '@/config/contracts'
import { LetterPool } from './LetterPool'
import { Countdown } from './Countdown'
import { PotDisplay } from './PotDisplay'
import { CommitForm } from './CommitForm'
import { RevealForm } from './RevealForm'
import { ActivityFeed } from './ActivityFeed'
import { BurnCounter } from './BurnCounter'
import { RulerDisplay } from './RulerDisplay'
import { SeasonLeaderboard } from './SeasonLeaderboard'
import { useEffect, useState } from 'react'

// Round phases based on v3 spec
enum RoundPhase {
  Inactive = 0,
  Commit = 1,
  Reveal = 2,
  Finalized = 3
}

export function GameBoard() {
  const { address } = useAccount()
  const chainId = baseSepolia.id // Testnet for now
  const contracts = CONTRACTS[chainId]
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000))

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Get current round ID
  const { data: currentRoundId } = useReadContract({
    address: contracts.spellBlockCore,
    abi: SPELLBLOCK_CORE_ABI,
    functionName: 'currentRoundId',
    chainId,
  })

  // Get round data
  const { data: round, refetch: refetchRound } = useReadContract({
    address: contracts.spellBlockCore,
    abi: SPELLBLOCK_CORE_ABI,
    functionName: 'rounds',
    args: currentRoundId ? [currentRoundId] : undefined,
    chainId,
  })

  // Get user's commitment
  const { data: commitment, refetch: refetchCommitment } = useReadContract({
    address: contracts.spellBlockCore,
    abi: SPELLBLOCK_CORE_ABI,
    functionName: 'commitments',
    args: currentRoundId && address ? [currentRoundId, address] : undefined,
    chainId,
  })

  // Get rollover amount
  const { data: rolloverAmount } = useReadContract({
    address: contracts.spellBlockCore,
    abi: SPELLBLOCK_CORE_ABI,
    functionName: 'rolloverAmount',
    chainId,
  })

  // Compute phase from timestamps (more reliable than stored phase)
  const computePhase = () => {
    if (!round || !round.startTime) return RoundPhase.Inactive
    const start = Number(round.startTime)
    const commitEnd = Number(round.commitDeadline)
    const revealEnd = Number(round.revealDeadline)
    
    if (currentTime < start) return RoundPhase.Inactive
    if (currentTime >= start && currentTime < commitEnd) return RoundPhase.Commit
    if (currentTime >= commitEnd && currentTime < revealEnd) return RoundPhase.Reveal
    return RoundPhase.Finalized
  }
  const phase = computePhase()

  // Decode letter pool from bytes8
  const letterPool = round?.letterPool ? 
    Buffer.from(round.letterPool.slice(2), 'hex').toString('utf-8').replace(/\0/g, '') : 
    ''

  // Check if spell and ruler are revealed (after commit phase)
  const isSpellRevealed = round?.revealedSeed !== '0x0000000000000000000000000000000000000000000000000000000000000000'
  const spellName = isSpellRevealed && round ? SPELL_NAMES[round.spellId] : null
  const spellDescription = isSpellRevealed && round ? SPELL_DESCRIPTIONS[round.spellId] : null

  // Has user committed?
  const hasCommitted = commitment && commitment.commitHash !== '0x0000000000000000000000000000000000000000000000000000000000000000'
  const hasRevealed = commitment?.revealed

  // Min stake for v3 spec (1M $CLAWDIA)
  const minStake = BigInt('1000000000000000000000000') // 1,000,000 $CLAWDIA

  // Debug info
  const debugInfo = {
    currentRoundId: currentRoundId?.toString(),
    hasRound: !!round,
    startTime: round?.startTime?.toString(),
    commitDeadline: round?.commitDeadline?.toString(),
    currentTime,
    computedPhase: phase,
  }

  if (!currentRoundId || currentRoundId === 0n || phase === RoundPhase.Inactive) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        {/* Debug panel - remove for production */}
        <div className="mb-4 p-4 bg-red-900/50 rounded text-xs font-mono text-white">
          <div>Debug: {JSON.stringify(debugInfo, null, 2)}</div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main waiting area */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-8 text-center">
              <h2 className="text-3xl font-display font-bold mb-4 text-amber-glow">🔮 Preparing next ritual</h2>
              <p className="text-text-secondary text-lg mb-6 font-body">
                The next round of SpellBlock will begin at 16:00 UTC daily!
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                <div className="bg-background-darker p-4 rounded-lg">
                  <div className="text-lg font-bold text-violet-bright mb-2">⏰ Daily Schedule</div>
                  <div className="text-sm text-text-secondary">
                    • Opens: 16:00 UTC<br/>
                    • Commits close: 00:00 UTC<br/>
                    • Reveals close: 04:00 UTC
                  </div>
                </div>
                <div className="bg-background-darker p-4 rounded-lg">
                  <div className="text-lg font-bold text-amber-bright mb-2">💰 Min stake</div>
                  <div className="text-text-secondary text-sm">1,000,000 $CLAWDIA</div>
                </div>
              </div>

              <p className="text-text-dim text-sm font-body">
                Follow <a href="https://x.com/Clawdia772541" target="_blank" className="text-violet-glow hover:text-violet-bright">@Clawdia</a> for round announcements
              </p>
            </div>
          </div>
          
          {/* Sidebar with counters */}
          <div className="space-y-6">
            <BurnCounter />
            <SeasonLeaderboard />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Round Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-amber-glow">
          SpellBlock Round #{currentRoundId?.toString()}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-text-secondary">
          <span>Phase: {RoundPhase[phase]}</span>
          {round && (
            <span>Started: {new Date(Number(round.startTime) * 1000).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              timeZone: 'UTC',
              timeZoneName: 'short'
            })}</span>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <BurnCounter />
          <SeasonLeaderboard />
          {round && <ActivityFeed roundId={currentRoundId} />}
        </div>

        {/* Main Game Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* HERO: Live Pot Tracker */}
          {round && (
            <PotDisplay
              totalPot={round.totalPot}
              commitCount={Number(round.commitCount)}
              jackpotBonus={round.jackpotBonus}
              rolloverAmount={rolloverAmount}
              isHero={true}
            />
          )}

          {/* Letter Pool */}
          {letterPool && (
            <div className="glass-panel p-6">
              <h3 className="text-center text-text-dim text-sm mb-4 font-heading uppercase tracking-widest">
                Today's letter pool
              </h3>
              <LetterPool 
                letters={letterPool} 
                selectedLetters="" 
              />
            </div>
          )}

          {/* Spell & Ruler Display */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Spell Display */}
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🪄</span>
                <h3 className="font-heading font-bold text-violet-bright">Today's Spell</h3>
              </div>
              {isSpellRevealed && spellName && spellDescription ? (
                <div className="text-center">
                  <div className="text-2xl font-display font-bold text-violet-glow mb-2">
                    {spellName}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {spellDescription}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-2xl font-display font-bold text-text-dim mb-2">
                    ???
                  </div>
                  <div className="text-sm text-text-secondary">
                    Hidden until commit phase closes
                  </div>
                </div>
              )}
            </div>

            {/* Ruler Display */}
            <RulerDisplay 
              validLengths={round?.validLengths as any || [0, 0, 0]}
              isRevealed={isSpellRevealed}
            />
          </div>

          {/* Phase-specific content */}
          {phase === RoundPhase.Commit && round && (
            <>
              <Countdown 
                deadline={Number(round.commitDeadline)} 
                label="Commit phase ends in" 
              />

              {hasCommitted ? (
                <div className="glass-panel p-6 text-center bg-green-900/20 border-green-500/30">
                  <p className="text-green-400 text-xl font-bold mb-2">✅ Committed!</p>
                  <p className="text-text-secondary">
                    Your stake: {commitment ? (Number(commitment.stake) / 1e18).toLocaleString() : '0'} $CLAWDIA
                  </p>
                  <p className="text-text-dim text-sm mt-2">
                    Wait for commit phase to close, then return to reveal your word
                  </p>
                </div>
              ) : (
                currentRoundId && (
                  <CommitForm 
                    roundId={currentRoundId}
                    letterPool={letterPool}
                    minStake={minStake}
                    onCommitSuccess={() => {
                      refetchCommitment()
                      refetchRound()
                    }}
                  />
                )
              )}
            </>
          )}

          {phase === RoundPhase.Reveal && round && (
            <>
              {/* Double Reveal Moment - Both spell and ruler revealed */}
              {isSpellRevealed && (
                <div className="glass-panel p-6 bg-amber-900/20 border-amber-500/30">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-amber-bright mb-2">🎭 The Reveal!</h3>
                    <p className="text-text-secondary">Both spell and ruler lengths are now revealed</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-violet-bright">Spell: {spellName}</div>
                      <div className="text-sm text-text-secondary">{spellDescription}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-amber-bright">Valid Lengths</div>
                      <div className="text-2xl font-display font-bold text-amber-glow">
                        {round.validLengths.join(' • ')}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Countdown 
                deadline={Number(round.revealDeadline)} 
                label="Reveal phase ends in" 
              />

              {hasCommitted && !hasRevealed && currentRoundId ? (
                <RevealForm
                  roundId={currentRoundId}
                  spellId={round.spellId}
                  spellParam={round.spellParam}
                  onRevealSuccess={() => {
                    refetchCommitment()
                    refetchRound()
                  }}
                />
              ) : hasRevealed ? (
                <div className="glass-panel p-6 text-center bg-green-900/20 border-green-500/30">
                  <p className="text-green-400 text-xl font-bold mb-2">✅ Word revealed!</p>
                  <p className="text-text-secondary">
                    Waiting for round to finalize...
                  </p>
                </div>
              ) : (
                <div className="glass-panel p-6 text-center bg-yellow-900/20 border-yellow-500/30">
                  <p className="text-yellow-400">You didn't commit to this round</p>
                </div>
              )}
            </>
          )}

          {phase === RoundPhase.Finalized && round && (
            <div className="glass-panel p-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-amber-glow">🏆 Round Complete!</h2>
              <p className="text-text-secondary mb-4">
                Final pot: {(Number(round.totalPot + round.jackpotBonus) / 1e18).toLocaleString()} $CLAWDIA
              </p>
              <p className="text-text-dim text-sm">
                Next round starts at 16:00 UTC tomorrow
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Compact Pot Display */}
          {round && (
            <PotDisplay
              totalPot={round.totalPot}
              commitCount={Number(round.commitCount)}
              jackpotBonus={round.jackpotBonus}
              rolloverAmount={rolloverAmount}
              isHero={false}
            />
          )}
          
          {/* Player's streak info */}
          {address && (
            <div className="glass-panel p-4 text-center">
              <div className="text-sm text-text-dim mb-2">Your streak</div>
              <div className="text-2xl font-display font-bold text-amber-glow">
                Coming soon
              </div>
              <div className="text-xs text-text-secondary">
                Streak tracking via StreakTracker contract
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
