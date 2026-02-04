import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { createConfig, http } from 'wagmi'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'
import { defineChain } from 'viem'
import { base } from 'wagmi/chains'

// WalletConnect Cloud Project ID - get one at https://cloud.walletconnect.com
// Using a demo ID for development - should be replaced for production
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64'

// RainbowKit config for web environment
export const webConfig = getDefaultConfig({
  appName: 'SpellBlock',
  projectId,
  chains: [base],
  ssr: false,
})

// Farcaster Mini App config
export const miniAppConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [farcasterMiniApp()],
  ssr: false,
})

// Detect if we're in a mini app environment
function isInMiniApp() {
  if (typeof window === 'undefined') return false
  try {
    return window.parent !== window
  } catch {
    return false
  }
}

// Export the appropriate config based on environment
export const config = isInMiniApp() ? miniAppConfig : webConfig
