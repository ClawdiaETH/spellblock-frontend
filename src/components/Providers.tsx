'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { webConfig, getMiniAppConfig, isInMiniApp } from '@/config/wagmi'
import { FarcasterMiniAppProvider } from '@/contexts/FarcasterMiniAppContext'
import { useState, useEffect, useMemo, type ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [inMiniApp, setInMiniApp] = useState(false)
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    setMounted(true)
    setInMiniApp(isInMiniApp())
  }, [])

  // Get the appropriate config after mount
  const config = useMemo(() => {
    if (!mounted) return webConfig
    return inMiniApp ? getMiniAppConfig() : webConfig
  }, [mounted, inMiniApp])

  // Show children without wallet providers during SSR/initial render
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <FarcasterMiniAppProvider>
          {inMiniApp ? (
            // Mini app environment - no RainbowKit UI
            children
          ) : (
            // Web environment - use RainbowKit
            <RainbowKitProvider 
              theme={darkTheme({
                accentColor: '#a855f7',
                accentColorForeground: 'white',
                borderRadius: 'medium',
              })}
            >
              {children}
            </RainbowKitProvider>
          )}
        </FarcasterMiniAppProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
