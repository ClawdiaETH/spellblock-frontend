import { getDefaultConfig } from 'connectkit'
import { createConfig, http } from 'wagmi'
import { baseSepolia, base } from 'wagmi/chains'

export const config = createConfig(
  getDefaultConfig({
    chains: [baseSepolia, base],
    transports: {
      [baseSepolia.id]: http('https://sepolia.base.org'),
      [base.id]: http('https://mainnet.base.org'),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    appName: 'SpellBlock',
    appDescription: 'A commit-reveal word game on Base',
    appUrl: 'https://spellblock.xyz',
    appIcon: 'https://spellblock.xyz/logo.png',
  }),
)
