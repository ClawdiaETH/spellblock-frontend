import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { baseSepolia, base } from 'wagmi/chains'

// WalletConnect Cloud Project ID - get one at https://cloud.walletconnect.com
// Using a demo ID for development - should be replaced for production
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64'

export const config = getDefaultConfig({
  appName: 'SpellBlock',
  projectId,
  chains: [base, baseSepolia],
  ssr: false, // We handle SSR manually in Providers
})
