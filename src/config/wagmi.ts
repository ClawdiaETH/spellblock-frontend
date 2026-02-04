import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { createConfig, http } from 'wagmi'
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

// Create mini app config lazily to avoid SSR issues with the SDK
let _miniAppConfig: ReturnType<typeof createConfig> | null = null

export function getMiniAppConfig() {
  if (_miniAppConfig) return _miniAppConfig
  
  // Only import the connector client-side
  if (typeof window === 'undefined') {
    // Return web config as fallback during SSR
    return webConfig
  }
  
  // Dynamic import connector to avoid SSR issues
  const { farcasterMiniApp } = require('@farcaster/miniapp-wagmi-connector')
  
  _miniAppConfig = createConfig({
    chains: [base],
    transports: {
      [base.id]: http(),
    },
    connectors: [farcasterMiniApp()],
    ssr: false,
  })
  
  return _miniAppConfig
}

// Detect if we're in a mini app environment
export function isInMiniApp() {
  if (typeof window === 'undefined') return false
  try {
    return window.parent !== window
  } catch {
    return false
  }
}

// Default export for backward compatibility
export const config = webConfig
