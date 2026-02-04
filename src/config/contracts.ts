import { base, baseSepolia } from 'viem/chains'

export const CONTRACTS = {
  [base.id]: {
    spellBlockCore: '0x0000000000000000000000000000000000000000' as const, // TBD - main game contract
    spellBlockGame: '0x0000000000000000000000000000000000000000' as const, // Alias for spellBlockCore
    spellBlockTreasury: '0x0000000000000000000000000000000000000000' as const, // TBD - treasury contract
    spellBlockScoring: '0x0000000000000000000000000000000000000000' as const, // TBD - scoring contract
    clawdiaToken: '0xbbd9aDe16525acb4B336b6dAd3b9762901522B07' as const,
    dictionaryVerifier: '0x0000000000000000000000000000000000000000' as const, // TBD
    streakTracker: '0x0000000000000000000000000000000000000000' as const, // TBD
    seasonAccumulator: '0x0000000000000000000000000000000000000000' as const, // TBD
  },
  [baseSepolia.id]: {
    spellBlockCore: '0xaB9bae309759f8589E9772b21cD25E1dC869137B' as const, // v3 redeployed 2026-02-03
    spellBlockGame: '0xaB9bae309759f8589E9772b21cD25E1dC869137B' as const, // Alias for spellBlockCore
    spellBlockTreasury: '0x0000000000000000000000000000000000000000' as const, // Embedded in game
    spellBlockScoring: '0x38ad55d120784314802269c4dE0012Cb777A9AC2' as const, // SpellRegistry
    clawdiaToken: '0xb6669B1258cb0efbFA4D9321D5EC7Caf5d6C19c3' as const, // MockCLAWDIA v3
    dictionaryVerifier: '0x0000000000000000000000000000000000000000' as const, // Embedded in game
    streakTracker: '0x0000000000000000000000000000000000000000' as const, // Embedded in game
    seasonAccumulator: '0x0000000000000000000000000000000000000000' as const, // TBD
  }
}

export const SPELLBLOCK_CORE_ABI = [
  // Read functions
  { type: 'function', name: 'currentRoundId', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'rounds', inputs: [{ name: 'roundId', type: 'uint256' }], outputs: [{ type: 'tuple', components: [
    { name: 'roundId', type: 'uint256' },
    { name: 'startTime', type: 'uint256' },
    { name: 'commitDeadline', type: 'uint256' },
    { name: 'revealDeadline', type: 'uint256' },
    { name: 'letterPool', type: 'bytes8' },
    { name: 'rulerCommitHash', type: 'bytes32' },
    { name: 'validLengths', type: 'uint8[3]' },
    { name: 'spellId', type: 'uint8' },
    { name: 'spellParam', type: 'bytes32' },
    { name: 'seedHash', type: 'bytes32' },
    { name: 'revealedSeed', type: 'bytes32' },
    { name: 'totalPot', type: 'uint256' },
    { name: 'commitCount', type: 'uint256' },
    { name: 'revealCount', type: 'uint256' },
    { name: 'rolloverFromPrevious', type: 'uint256' },
    { name: 'jackpotBonus', type: 'uint256' },
    { name: 'phase', type: 'uint8' },
  ]}], stateMutability: 'view' },
  { type: 'function', name: 'commitments', inputs: [{ name: 'roundId', type: 'uint256' }, { name: 'player', type: 'address' }], outputs: [{ type: 'tuple', components: [
    { name: 'commitHash', type: 'bytes32' },
    { name: 'stake', type: 'uint256' },
    { name: 'commitTimestamp', type: 'uint256' },
    { name: 'revealed', type: 'bool' },
    { name: 'forfeited', type: 'bool' },
  ]}], stateMutability: 'view' },
  { type: 'function', name: 'rolloverAmount', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  
  // Write functions  
  { type: 'function', name: 'commit', inputs: [{ name: 'commitHash', type: 'bytes32' }, { name: 'stake', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', name: 'reveal', inputs: [{ name: 'word', type: 'string' }, { name: 'salt', type: 'bytes32' }, { name: 'merkleProof', type: 'bytes32[]' }], outputs: [], stateMutability: 'nonpayable' },
  
  // Events
  { type: 'event', name: 'RoundStarted', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'startTime', type: 'uint256' }, { name: 'commitDeadline', type: 'uint256' }, { name: 'revealDeadline', type: 'uint256' }, { name: 'rulerCommitHash', type: 'bytes32' }] },
  { type: 'event', name: 'PlayerCommitted', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'player', type: 'address', indexed: true }, { name: 'stake', type: 'uint256' }, { name: 'newTotalPot', type: 'uint256' }, { name: 'newCommitCount', type: 'uint256' }] },
  { type: 'event', name: 'SeedRevealed', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'letterPool', type: 'bytes8' }, { name: 'spellId', type: 'uint8' }, { name: 'spellParam', type: 'bytes32' }, { name: 'validLengths', type: 'uint8[3]' }] },
  { type: 'event', name: 'PlayerRevealed', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'player', type: 'address', indexed: true }, { name: 'effectiveScore', type: 'uint256' }, { name: 'lengthValid', type: 'bool' }, { name: 'spellValid', type: 'bool' }] },
  { type: 'event', name: 'JackpotSeeded', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'bonusAmount', type: 'uint256' }, { name: 'newTotalPot', type: 'uint256' }] },
  { type: 'event', name: 'RoundFinalized', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'totalPot', type: 'uint256' }, { name: 'validWinnerCount', type: 'uint256' }, { name: 'consolationWinnerCount', type: 'uint256' }] },
] as const

export const SPELLBLOCK_TREASURY_ABI = [
  // Read functions
  { type: 'function', name: 'totalBurned', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'totalDistributedToStakers', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'totalDistributedToWinners', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  
  // Events
  { type: 'event', name: 'TokensBurned', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'amount', type: 'uint256' }, { name: 'newTotalBurned', type: 'uint256' }] },
  { type: 'event', name: 'PlayerPaid', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'player', type: 'address', indexed: true }, { name: 'amount', type: 'uint256' }, { name: 'isConsolation', type: 'bool' }] },
] as const

export const STREAK_TRACKER_ABI = [
  // Read functions
  { type: 'function', name: 'streaks', inputs: [{ name: 'player', type: 'address' }], outputs: [{ type: 'tuple', components: [
    { name: 'lastRoundPlayed', type: 'uint256' },
    { name: 'currentStreak', type: 'uint256' },
  ]}], stateMutability: 'view' },
  { type: 'function', name: 'getMultiplier', inputs: [{ name: 'streak', type: 'uint256' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
] as const

export const ERC20_ABI = [
  { type: 'function', name: 'balanceOf', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'allowance', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'approve', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }], stateMutability: 'nonpayable' },
  { type: 'function', name: 'decimals', inputs: [], outputs: [{ type: 'uint8' }], stateMutability: 'view' },
  { type: 'function', name: 'symbol', inputs: [], outputs: [{ type: 'string' }], stateMutability: 'view' },
] as const

export const SPELL_NAMES: Record<number, string> = {
  0: 'Veto',
  1: 'Anchor', 
  2: 'Seal',
  3: 'Gem',
}

export const SPELL_DESCRIPTIONS: Record<number, string> = {
  0: 'Word must NOT contain [letter]',
  1: 'Word must START with [letter]',
  2: 'Word must END with [letter]',
  3: 'Word must have adjacent identical letters',
}

// Alias for backward compatibility
export const SPELLBLOCK_ABI = SPELLBLOCK_CORE_ABI

