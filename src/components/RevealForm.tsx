'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import { CONTRACTS, SPELLBLOCK_ABI, SPELL_NAMES, SPELL_DESCRIPTIONS } from '@/config/contracts'

interface RevealFormProps {
  roundId: bigint
  spellId: number
  spellParam: string
  onRevealSuccess?: () => void
}

export function RevealForm({ roundId, spellId, spellParam, onRevealSuccess }: RevealFormProps) {
  const [word, setWord] = useState('')
  const [salt, setSalt] = useState('')
  const [error, setError] = useState('')
  const [autoLoaded, setAutoLoaded] = useState(false)
  
  const { address, isConnected } = useAccount()
  const chainId = baseSepolia.id
  const contracts = CONTRACTS[chainId]

  // Try to load saved commit data
  useEffect(() => {
    const saved = localStorage.getItem(`spellblock-commit-${roundId}`)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setWord(data.word)
        setSalt(data.salt)
        setAutoLoaded(true)
      } catch (e) {
        console.error('Failed to load saved commit', e)
      }
    }
  }, [roundId])

  const { writeContract: reveal, data: revealHash, isPending: isRevealing } = useWriteContract()
  const { isSuccess: revealSuccess } = useWaitForTransactionReceipt({ hash: revealHash })

  useEffect(() => {
    if (revealSuccess) {
      // Clear saved commit data
      localStorage.removeItem(`spellblock-commit-${roundId}`)
      onRevealSuccess?.()
    }
  }, [revealSuccess, roundId, onRevealSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!word) {
      setError('Please enter your word')
      return
    }

    if (!salt) {
      setError('Please enter your salt')
      return
    }

    reveal({
      address: contracts.spellBlockGame,
      abi: SPELLBLOCK_ABI,
      functionName: 'reveal',
      args: [word.toLowerCase(), salt as `0x${string}`, [] as `0x${string}`[]],
    })
  }

  if (!isConnected) {
    return (
      <div className="bg-spell-dark/50 rounded-xl p-6 text-center">
        <p className="text-gray-400">Connect your wallet to reveal</p>
      </div>
    )
  }

  // Parse spell parameter for display
  const getSpellDisplay = () => {
    if (spellId >= 1 && spellId <= 3) {
      // VETO, ANCHOR, SEAL all use a letter
      const letter = String.fromCharCode(parseInt(spellParam.slice(2, 4), 16))
      return (
        <span className="font-mono text-amber-400 text-2xl">
          {letter.toUpperCase()}
        </span>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      {/* Spell Display */}
      <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-6 text-center border border-purple-500/30">
        <p className="text-sm text-gray-400 mb-2">The spell is...</p>
        <h2 className="text-3xl font-bold text-purple-300 mb-2">
          ✨ {SPELL_NAMES[spellId] || 'UNKNOWN'} ✨
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          {SPELL_DESCRIPTIONS[spellId]}
        </p>
        {getSpellDisplay()}
      </div>

      {/* Reveal Form */}
      <form onSubmit={handleSubmit} className="bg-spell-dark/50 rounded-xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-center mb-4">Reveal your word</h3>

        {autoLoaded && (
          <p className="text-green-400 text-sm text-center">
            ✓ Loaded from your previous commit
          </p>
        )}
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Your word</label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value.toLowerCase())}
            placeholder="Enter the word you committed..."
            className="w-full bg-spell-darker border border-indigo-800 rounded-lg px-4 py-3 text-lg font-mono uppercase tracking-wider focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Your salt</label>
          <input
            type="text"
            value={salt}
            onChange={(e) => setSalt(e.target.value)}
            placeholder="0x..."
            className="w-full bg-spell-darker border border-indigo-800 rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-indigo-500"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={isRevealing}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 py-3 rounded-lg font-bold transition-all"
        >
          {isRevealing ? 'Revealing...' : 'Reveal word'}
        </button>
      </form>
    </div>
  )
}
