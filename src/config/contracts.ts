import { baseSepolia } from 'viem/chains'

export const CONTRACTS = {
  [baseSepolia.id]: {
    spellBlockGame: '0xD033205b72015a45ddFFa93484F13a051a637799' as const,
    clawdiaToken: '0x5b0654368986069f2EAb72681Bfc5d4144fc8a32' as const,
    dictionaryVerifier: '0xC5a2662e098ffB3DFFc4a5a5C9CB93648498Ee90' as const,
    spellEngine: '0x76d6e6aB49A9A6Ac1D67A87182b55E64983c4db2' as const,
    stakerDistributor: '0xA3c10C957cEbDbfc3737ec259c6deF70E72A03B0' as const,
  }
}

export const SPELLBLOCK_ABI = [
  // Read functions
  { type: 'function', name: 'currentRoundId', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'getRound', inputs: [{ name: 'roundId', type: 'uint256' }], outputs: [{ type: 'tuple', components: [
    { name: 'roundId', type: 'uint256' },
    { name: 'letterPool', type: 'bytes10' },
    { name: 'seedHash', type: 'bytes32' },
    { name: 'seed', type: 'bytes32' },
    { name: 'spellParamHash', type: 'bytes32' },
    { name: 'spellId', type: 'uint8' },
    { name: 'spellParam', type: 'bytes32' },
    { name: 'startTime', type: 'uint40' },
    { name: 'commitDeadline', type: 'uint40' },
    { name: 'revealDeadline', type: 'uint40' },
    { name: 'totalStaked', type: 'uint256' },
    { name: 'numCommits', type: 'uint32' },
    { name: 'numReveals', type: 'uint32' },
    { name: 'jackpotTriggered', type: 'bool' },
    { name: 'finalized', type: 'bool' },
  ]}], stateMutability: 'view' },
  { type: 'function', name: 'getCommitment', inputs: [{ name: 'roundId', type: 'uint256' }, { name: 'player', type: 'address' }], outputs: [{ type: 'tuple', components: [
    { name: 'commitHash', type: 'bytes32' },
    { name: 'stake', type: 'uint256' },
    { name: 'commitTime', type: 'uint40' },
    { name: 'revealed', type: 'bool' },
    { name: 'spellPass', type: 'bool' },
    { name: 'effectiveScore', type: 'uint16' },
    { name: 'payout', type: 'uint256' },
    { name: 'claimed', type: 'bool' },
  ]}], stateMutability: 'view' },
  { type: 'function', name: 'minStake', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'streakCount', inputs: [{ name: 'player', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  
  // Write functions  
  { type: 'function', name: 'commit', inputs: [{ name: 'commitHash', type: 'bytes32' }, { name: 'stakeAmount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', name: 'reveal', inputs: [{ name: 'word', type: 'string' }, { name: 'salt', type: 'bytes32' }, { name: 'dictProof', type: 'bytes32[]' }, { name: 'categoryProof', type: 'bytes32[]' }], outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', name: 'claimPayout', inputs: [{ name: 'roundId', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
  
  // Events
  { type: 'event', name: 'RoundOpened', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'letterPool', type: 'bytes10', indexed: false }, { name: 'startTime', type: 'uint40', indexed: false }] },
  { type: 'event', name: 'CommitSubmitted', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'player', type: 'address', indexed: true }, { name: 'stake', type: 'uint256', indexed: false }, { name: 'timestamp', type: 'uint40', indexed: false }, { name: 'streak', type: 'uint256', indexed: false }] },
  { type: 'event', name: 'SeedRevealed', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'spellId', type: 'uint8', indexed: false }, { name: 'spellParam', type: 'bytes32', indexed: false }] },
  { type: 'event', name: 'WordRevealed', inputs: [{ name: 'roundId', type: 'uint256', indexed: true }, { name: 'player', type: 'address', indexed: true }, { name: 'effectiveScore', type: 'uint16', indexed: false }, { name: 'spellPass', type: 'bool', indexed: false }] },
] as const

export const ERC20_ABI = [
  { type: 'function', name: 'balanceOf', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'allowance', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'approve', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }], stateMutability: 'nonpayable' },
  { type: 'function', name: 'decimals', inputs: [], outputs: [{ type: 'uint8' }], stateMutability: 'view' },
  { type: 'function', name: 'symbol', inputs: [], outputs: [{ type: 'string' }], stateMutability: 'view' },
] as const

export const SPELL_NAMES: Record<number, string> = {
  1: 'VETO',
  2: 'ANCHOR', 
  3: 'SEAL',
  4: 'SPINE',
  5: 'CLAW',
}

export const SPELL_DESCRIPTIONS: Record<number, string> = {
  1: 'Word must NOT contain a specific letter',
  2: 'Word must START with a specific letter',
  3: 'Word must CONTAIN a specific letter',
  4: 'Word must have ADJACENT duplicate letters',
  5: 'Special constraint revealed by Clawdia',
}
