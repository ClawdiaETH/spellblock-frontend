'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { config } from '@/config/wagmi'
import { useState, useEffect, type ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show children without wallet providers during SSR/initial render
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
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
