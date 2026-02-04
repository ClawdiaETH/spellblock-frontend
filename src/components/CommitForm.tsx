'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatUnits, keccak256, encodePacked, toHex } from 'viem'
import { base } from 'viem/chains'
import { CONTRACTS, SPELLBLOCK_ABI, ERC20_ABI } from '@/config/contracts'
import { useDictionary } from '@/hooks/useDictionary'

interface CommitFormProps {
  roundId: bigint
  letterPool: string
  minStake: bigint
  onCommitSuccess?: () => void
}

export function CommitForm({ roundId, letterPool, minStake, onCommitSuccess }: CommitFormProps) {
  const [word, setWord] = useState('')
  const [stake, setStake] = useState('')
  const [salt, setSalt] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState<'approve' | 'commit'>('approve')
  
  const { address, isConnected } = useAccount()
  const chainId = base.id
  const contracts = CONTRACTS[chainId]
  const { validateWord: validateDictionaryWord, isLoading: isDictionaryLoading, error: dictionaryError } = useDictionary()

  // Generate random salt on mount
  useEffect(() => {
    const randomBytes = crypto.getRandomValues(new Uint8Array(32))
    setSalt(toHex(randomBytes))
  }, [])

  // Check allowance
  const { data: allowance } = useReadContract({
    address: contracts.clawdiaToken,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, contracts.spellBlockGame] : undefined,
  })

  // Token balance
  const { data: balance } = useReadContract({
    address: contracts.clawdiaToken,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // Approve transaction
  const { writeContract: approve, data: approveHash, isPending: isApproving } = useWriteContract()
  const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash })

  // Commit transaction
  const { writeContract: commit, data: commitHash, isPending: isCommitting } = useWriteContract()
  const { isSuccess: commitSuccess } = useWaitForTransactionReceipt({ hash: commitHash })

  // Update step based on allowance
  useEffect(() => {
    if (allowance && stake) {
      const stakeAmount = parseUnits(stake || '0', 18)
      if (allowance >= stakeAmount) {
        setStep('commit')
      } else {
        setStep('approve')
      }
    }
  }, [allowance, stake])

  // Handle approve success
  useEffect(() => {
    if (approveSuccess) {
      setStep('commit')
    }
  }, [approveSuccess])

  // Handle commit success
  useEffect(() => {
    if (commitSuccess && address) {
      // Save commitment data to localStorage for reveal
      const commitData = {
        roundId: roundId.toString(),
        word,
        salt,
        stake,
      }
      localStorage.setItem(`spellblock-commit-${roundId}-${address}`, JSON.stringify(commitData))
      onCommitSuccess?.()
    }
  }, [commitSuccess, roundId, word, salt, stake, address, onCommitSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!word) {
      setError('Please enter a word')
      return
    }

    // Use dictionary validation which includes all checks
    const wordError = validateDictionaryWord(word, letterPool)
    if (wordError) {
      setError(wordError)
      return
    }

    const stakeAmount = parseUnits(stake || '0', 18)
    if (stakeAmount < minStake) {
      setError(`Minimum stake is ${formatUnits(minStake, 18)} $CLAWDIA`)
      return
    }

    if (balance && stakeAmount > balance) {
      setError('Insufficient balance')
      return
    }

    if (step === 'approve') {
      approve({
        address: contracts.clawdiaToken,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [contracts.spellBlockGame, stakeAmount],
      })
    } else {
      // Create commit hash: keccak256(roundId, player, word, salt)
      const commitHash = keccak256(
        encodePacked(
          ['uint256', 'address', 'string', 'bytes32'],
          [roundId, address!, word.toLowerCase(), salt as `0x${string}`]
        )
      )

      commit({
        address: contracts.spellBlockGame,
        abi: SPELLBLOCK_ABI,
        functionName: 'commit',
        args: [commitHash, stakeAmount],
      })
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-spell-dark/50 rounded-xl p-6 text-center">
        <p className="text-gray-400">Connect your wallet to play</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-spell-dark/50 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-center mb-4">Submit your word</h3>
      
      <div>
        <label className="block text-sm text-gray-400 mb-1">Your word</label>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value.toLowerCase())}
          placeholder="Enter your word..."
          className="w-full bg-spell-darker border border-indigo-800 rounded-lg px-4 py-3 text-lg font-mono uppercase tracking-wider focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Stake amount ($CLAWDIA)
        </label>
        <input
          type="number"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          placeholder={`Min: ${formatUnits(minStake, 18)}`}
          className="w-full bg-spell-darker border border-indigo-800 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500"
        />
        {balance !== undefined && (
          <p className="text-xs text-gray-500 mt-1">
            Balance: {parseFloat(formatUnits(balance, 18)).toLocaleString()} $CLAWDIA
          </p>
        )}
        {balance !== undefined && balance < minStake && (
          <div className="mt-2 p-3 bg-red-900/30 border border-red-700 rounded-lg">
            <p className="text-red-400 text-sm font-medium">
              ⚠️ Insufficient $CLAWDIA
            </p>
            <p className="text-red-300 text-xs mt-1">
              You need at least {parseFloat(formatUnits(minStake, 18)).toLocaleString()} $CLAWDIA to play.
            </p>
            <a 
              href="https://app.uniswap.org/swap?outputCurrency=0xbbd9aDe16525acb4B336b6dAd3b9762901522B07&chain=base"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 rounded text-xs font-medium transition-colors"
            >
              Buy $CLAWDIA on Uniswap →
            </a>
          </div>
        )}
      </div>

      {dictionaryError && (
        <p className="text-red-400 text-sm">Dictionary error: {dictionaryError}</p>
      )}

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {isDictionaryLoading && (
        <p className="text-yellow-400 text-sm">📚 Loading dictionary...</p>
      )}

      <button
        type="submit"
        disabled={isApproving || isCommitting || isDictionaryLoading || !!dictionaryError}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 py-3 rounded-lg font-bold transition-all"
      >
        {isDictionaryLoading ? (
          'Loading dictionary...'
        ) : isApproving || isCommitting ? (
          'Processing...'
        ) : step === 'approve' ? (
          'Approve $CLAWDIA'
        ) : (
          'Submit commitment'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        ⚠️ Save your word! You'll need it to reveal after commits close.
      </p>
    </form>
  )
}
