'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Define User type based on SDK context (matches UserContext from SDK)
interface User {
  fid: number
  username?: string
  displayName?: string
  pfpUrl?: string
}

interface FarcasterMiniAppContextType {
  isInMiniApp: boolean
  isReady: boolean
  user: User | null
  authToken: any
  initializeApp: () => Promise<void>
}

const FarcasterMiniAppContext = createContext<FarcasterMiniAppContextType | null>(null)

interface FarcasterMiniAppProviderProps {
  children: ReactNode
  onReady?: () => void
}

export function FarcasterMiniAppProvider({ 
  children, 
  onReady 
}: FarcasterMiniAppProviderProps) {
  const [isInMiniApp, setIsInMiniApp] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [authToken, setAuthToken] = useState<any>(null)

  const initializeApp = async () => {
    if (isReady) return
    if (typeof window === 'undefined') return

    try {
      // Dynamically import SDK only on client
      const { sdk } = await import('@farcaster/miniapp-sdk')
      
      // Get user context - need to await it since it might be async
      const context = await sdk.context
      const currentUser = context?.user || null
      setUser(currentUser)

      // Get auth token
      const token = await sdk.quickAuth.getToken()
      setAuthToken(token)

      // Call ready after everything is initialized
      await sdk.actions.ready()
      setIsReady(true)
      onReady?.()

      console.log('Farcaster Mini App initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Farcaster Mini App:', error)
      // Still set ready to true to prevent infinite loading
      setIsReady(true)
      onReady?.()
    }
  }

  useEffect(() => {
    // Skip on server
    if (typeof window === 'undefined') return
    
    // Check if we're running in a mini app
    try {
      const inMiniApp = window.parent !== window
      setIsInMiniApp(inMiniApp)
      
      if (inMiniApp) {
        console.log('Detected mini app environment')
      }
    } catch (error) {
      console.log('Not in mini app environment')
      setIsInMiniApp(false)
    }
  }, [])

  const value: FarcasterMiniAppContextType = {
    isInMiniApp,
    isReady,
    user,
    authToken,
    initializeApp
  }

  return (
    <FarcasterMiniAppContext.Provider value={value}>
      {children}
    </FarcasterMiniAppContext.Provider>
  )
}

export function useFarcasterMiniApp() {
  const context = useContext(FarcasterMiniAppContext)
  if (!context) {
    throw new Error('useFarcasterMiniApp must be used within FarcasterMiniAppProvider')
  }
  return context
}