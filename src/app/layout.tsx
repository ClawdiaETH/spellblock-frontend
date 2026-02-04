import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'
import { Analytics } from '@vercel/analytics/next'

const Providers = dynamic(() => import('@/components/Providers').then(mod => mod.Providers), {
  ssr: false,
})

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-main'
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
      <body className={`${plusJakartaSans.variable} font-main bg-void-deep text-text-primary`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
