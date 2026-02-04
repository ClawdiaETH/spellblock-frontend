'use client'

import { useEffect, useState } from 'react'
import { useConnect, useAccount } from 'wagmi'
import { useFarcasterMiniApp } from '@/contexts/FarcasterMiniAppContext'

export function FarcasterAutoConnect() {
  const { isInMiniApp, isReady } = useFarcasterMiniApp()
  const { connect, connectors } = useConnect()
  const { isConnected, isConnecting } = useAccount()
  const [attempted, setAttempted] = useState(false)

  useEffect(() => {
    // Only auto-connect in mini app environment
    if (!isInMiniApp || !isReady) return
    
    // Already connected, connecting, or attempted
    if (isConnected || isConnecting || attempted) return

    // Find the Farcaster connector
    const farcasterConnector = connectors.find(
      (c) => c.id === 'farcasterMiniApp' || c.name.toLowerCase().includes('farcaster')
    )

    if (farcasterConnector) {
      console.log('Auto-connecting Farcaster wallet...')
      setAttempted(true)
      connect({ connector: farcasterConnector })
    } else {
      console.log('Farcaster connector not found, available:', connectors.map(c => c.id))
    }
  }, [isInMiniApp, isReady, isConnected, isConnecting, connect, connectors, attempted])

  // This component renders nothing - it just handles auto-connect logic
  return null
}
