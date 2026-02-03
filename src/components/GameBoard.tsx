'use client'

import { useReadContract, useAccount } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import { CONTRACTS, SPELLBLOCK_ABI } from '@/config/contracts'
import { LetterPool } from './LetterPool'
import { Countdown } from './Countdown'
import { PotDisplay } from './PotDisplay'
import { CommitForm } from './CommitForm'
import { RevealForm } from './RevealForm'
import { useEffect, useState } from 'react'

type GamePhase = 'waiting' | 'commit' | 'reveal' | 'finalized'

export function GameBoard() {
  const { address } = useAccount()
  const chainId = baseSepolia.id
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
    address: contracts.spellBlockGame,
    abi: SPELLBLOCK_ABI,
    functionName: 'currentRoundId',
  })

  // Get round data
  const { data: round, refetch: refetchRound } = useReadContract({
    address: contracts.spellBlockGame,
    abi: SPELLBLOCK_ABI,
    functionName: 'getRound',
    args: currentRoundId ? [currentRoundId] : undefined,
  })

  // Get min stake
  const { data: minStake } = useReadContract({
    address: contracts.spellBlockGame,
    abi: SPELLBLOCK_ABI,
    functionName: 'minStake',
  })

  // Get user's commitment
  const { data: commitment, refetch: refetchCommitment } = useReadContract({
    address: contracts.spellBlockGame,
    abi: SPELLBLOCK_ABI,
    functionName: 'getCommitment',
    args: currentRoundId && address ? [currentRoundId, address] : undefined,
  })

  // Get user's streak
  const { data: streak } = useReadContract({
    address: contracts.spellBlockGame,
    abi: SPELLBLOCK_ABI,
    functionName: 'streakCount',
    args: address ? [address] : undefined,
  })

  // Determine game phase
  const getPhase = (): GamePhase => {
    if (!round) return 'waiting'
    
    const now = currentTime
    const commitDeadline = Number(round.commitDeadline)
    const revealDeadline = Number(round.revealDeadline)
    
    if (round.finalized) return 'finalized'
    if (now < commitDeadline) return 'commit'
    if (now < revealDeadline) return 'reveal'
    return 'finalized'
  }

  const phase = getPhase()

  // Decode letter pool from bytes10
  const letterPool = round ? 
    Buffer.from(round.letterPool.slice(2), 'hex').toString('utf-8').replace(/\0/g, '') : 
    ''

  // Has user committed?
  const hasCommitted = commitment && commitment.commitHash !== '0x0000000000000000000000000000000000000000000000000000000000000000'
  const hasRevealed = commitment?.revealed

  if (!currentRoundId || currentRoundId === 0n) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="glass-panel p-8 text-center">
          <h2 className="text-3xl font-display font-bold mb-4 text-amber-glow">🔮 Preparing first ritual</h2>
          <p className="text-text-secondary text-lg mb-6 font-body">
            The ancient spells are being prepared. The first round of SpellBlock will begin soon!
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
            <div className="bg-background-darker p-4 rounded-lg">
              <div className="text-lg font-bold text-violet-bright mb-2">⚡ When it starts</div>
              <div className="text-sm text-text-secondary">You'll see the letter pool appear here</div>
            </div>
            <div className="bg-background-darker p-4 rounded-lg">
              <div className="text-lg font-bold text-amber-bright mb-2">💰 How to prepare</div>
              <div className="text-text-secondary text-sm">Connect wallet & get some $CLAWDIA</div>
            </div>
          </div>

          <p className="text-text-dim text-sm font-body">
            Follow <a href="https://x.com/Clawdia772541" target="_blank" className="text-violet-glow hover:text-violet-bright">@Clawdia772541</a> for round announcements
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Round Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">
          Round #{currentRoundId?.toString()}
        </h1>
        {streak && streak > 0n && (
          <p className="text-amber-400">
            🔥 {streak.toString()} round streak! 
            {streak >= 14n ? ' (150% multiplier)' : 
             streak >= 7n ? ' (125% multiplier)' : 
             streak >= 3n ? ' (110% multiplier)' : ''}
          </p>
        )}
      </div>

      {/* Letter Pool */}
      {letterPool && (
        <div className="bg-spell-dark/50 rounded-xl p-6">
          <h3 className="text-center text-gray-400 text-sm mb-4">Today's letters</h3>
          <LetterPool 
            letters={letterPool} 
            selectedLetters="" 
          />
        </div>
      )}

      {/* Phase-specific content */}
      {phase === 'commit' && round && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <Countdown 
              deadline={Number(round.commitDeadline)} 
              label="Commit phase ends in" 
            />
            <PotDisplay 
              totalStaked={round.totalStaked}
              numCommits={round.numCommits}
              jackpotTriggered={round.jackpotTriggered}
            />
          </div>

          {hasCommitted ? (
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 text-center">
              <p className="text-green-400 text-xl font-bold mb-2">✓ You've committed!</p>
              <p className="text-gray-400">
                Wait for the commit phase to close, then come back to reveal your word.
              </p>
            </div>
          ) : (
            minStake && currentRoundId && (
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

      {phase === 'reveal' && round && (
        <>
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
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 text-center">
              <p className="text-green-400 text-xl font-bold mb-2">✓ Word revealed!</p>
              <p className="text-gray-400">
                Your score: {commitment?.effectiveScore.toString()} points
              </p>
              <p className="text-gray-400">
                Spell Pass: {commitment?.spellPass ? '✓ Yes' : '✗ No'}
              </p>
            </div>
          ) : (
            <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-6 text-center">
              <p className="text-yellow-400">You didn't commit to this round</p>
            </div>
          )}
        </>
      )}

      {phase === 'finalized' && round && (
        <div className="bg-spell-dark/50 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Round complete!</h2>
          {commitment && commitment.payout > 0n && !commitment.claimed && (
            <div className="bg-amber-900/30 border border-amber-500/30 rounded-xl p-4 mb-4">
              <p className="text-amber-400 font-bold">
                You won {(Number(commitment.payout) / 1e18).toLocaleString()} $CLAWDIA!
              </p>
              <button className="mt-2 bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded-lg font-bold">
                Claim reward
              </button>
            </div>
          )}
          <p className="text-gray-400">
            Next round coming soon...
          </p>
        </div>
      )}
    </div>
  )
}
