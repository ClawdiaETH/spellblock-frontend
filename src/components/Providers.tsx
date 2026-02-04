'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { webConfig, miniAppConfig } from '@/config/wagmi'
import { FarcasterMiniAppProvider } from '@/contexts/FarcasterMiniAppContext'
import { useState, useEffect, type ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isInMiniApp, setIsInMiniApp] = useState(false)
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    setMounted(true)
    
    // Detect mini app environment
    try {
      const inMiniApp = window.parent !== window
      setIsInMiniApp(inMiniApp)
    } catch {
      setIsInMiniApp(false)
    }
  }, [])

  // Show children without wallet providers during SSR/initial render
  if (!mounted) {
    return <>{children}</>
  }

  const config = isInMiniApp ? miniAppConfig : webConfig

  const AppContent = () => (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {isInMiniApp ? (
          // Mini app environment - no RainbowKit UI
          <FarcasterMiniAppProvider>
            {children}
          </FarcasterMiniAppProvider>
        ) : (
          // Web environment - use RainbowKit
          <RainbowKitProvider 
            theme={darkTheme({
              accentColor: '#a855f7',
              accentColorForeground: 'white',
              borderRadius: 'medium',
            })}
          >
            <FarcasterMiniAppProvider>
              {children}
            </FarcasterMiniAppProvider>
          </RainbowKitProvider>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  )

  return <AppContent />
}
