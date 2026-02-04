import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { baseSepolia, base } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'SpellBlock',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'spellblock',
  chains: [base, baseSepolia],
  ssr: true,
})
