import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { defineChain } from 'viem'

// WalletConnect Cloud Project ID - get one at https://cloud.walletconnect.com
// Using a demo ID for development - should be replaced for production
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64'

// Define Base with reliable RPC (1rpc is more stable than coinbase's public endpoint)
const base = defineChain({
  id: 8453,
  name: 'Base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://1rpc.io/base'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Basescan',
      url: 'https://basescan.org',
    },
  },
})

export const config = getDefaultConfig({
  appName: 'SpellBlock',
  projectId,
  chains: [base],
  ssr: false, // We handle SSR manually in Providers
})
