'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export function WalletButton() {
  // This will only render when wagmi context is available
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isConnected } = useAccount()
    return (
      <ConnectButton 
        label="Connect Wallet"
        showBalance={false}
        chainStatus="icon"
        accountStatus={isConnected ? "address" : "full"}
      />
    )
  } catch {
    // Fallback when context not ready
    return (
      <button className="px-4 py-2 bg-violet-600 rounded-lg text-white font-medium">
        Connect Wallet
      </button>
    )
  }
}
