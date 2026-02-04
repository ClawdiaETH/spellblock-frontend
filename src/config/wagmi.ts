import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base } from 'wagmi/chains'
import { http } from 'wagmi'

// WalletConnect Cloud Project ID - get one at https://cloud.walletconnect.com
// Using a demo ID for development - should be replaced for production
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64'

// Custom Base chain with fallback RPCs
const baseWithFallbacks = {
  ...base,
  rpcUrls: {
    default: {
      http: ['https://base.llamarpc.com', 'https://1rpc.io/base', 'https://mainnet.base.org'],
    },
    public: {
      http: ['https://base.llamarpc.com', 'https://1rpc.io/base', 'https://mainnet.base.org'],
    },
  },
}

export const config = getDefaultConfig({
  appName: 'SpellBlock',
  projectId,
  chains: [baseWithFallbacks],
  transports: {
    [base.id]: http('https://base.llamarpc.com'),
  },
  ssr: false, // We handle SSR manually in Providers
})
