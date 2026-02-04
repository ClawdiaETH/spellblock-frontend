'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { config } from '@/config/wagmi'
import { useState, useEffect, type ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'

function WalletProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={new QueryClient()}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#a855f7',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent SSR - only render wallet providers on client
  if (!mounted) {
    return <>{children}</>
  }

  return <WalletProviders>{children}</WalletProviders>
}
