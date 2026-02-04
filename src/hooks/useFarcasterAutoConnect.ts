'use client'

import { useEffect } from 'react'
import { useConnect, useAccount } from 'wagmi'
import { useFarcasterMiniApp } from '@/contexts/FarcasterMiniAppContext'

export function useFarcasterAutoConnect() {
  const { isInMiniApp, isReady } = useFarcasterMiniApp()
  const { connect, connectors } = useConnect()
  const { isConnected, isConnecting } = useAccount()

  useEffect(() => {
    // Only auto-connect in mini app environment
    if (!isInMiniApp || !isReady) return
    
    // Already connected or connecting
    if (isConnected || isConnecting) return

    // Find the Farcaster connector
    const farcasterConnector = connectors.find(
      (c) => c.id === 'farcasterMiniApp' || c.name.toLowerCase().includes('farcaster')
    )

    if (farcasterConnector) {
      console.log('Auto-connecting Farcaster wallet...')
      connect({ connector: farcasterConnector })
    } else {
      console.log('Farcaster connector not found, available:', connectors.map(c => c.id))
    }
  }, [isInMiniApp, isReady, isConnected, isConnecting, connect, connectors])
}
