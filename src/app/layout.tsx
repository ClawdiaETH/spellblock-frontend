import type { Metadata } from 'next'
import { Cinzel_Decorative, Cinzel, Outfit } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const cinzelDecorative = Cinzel_Decorative({ 
  subsets: ['latin'], 
  weight: ['400', '700', '900'],
  variable: '--font-display'
})

const cinzel = Cinzel({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading'
})

const outfit = Outfit({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600'],
  variable: '--font-body'
})

export const metadata: Metadata = {
  title: 'SpellBlock | Commit-Reveal Word Game',
  description: 'A strategic word game on Base. Commit your word, reveal when the spell drops, win $CLAWDIA!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cinzelDecorative.variable} ${cinzel.variable} ${outfit.variable} font-body bg-void-deep text-text-primary`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
