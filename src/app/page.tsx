'use client'

import { useState } from 'react'
import dynamicImport from 'next/dynamic'
import { useFarcasterMiniApp } from '@/contexts/FarcasterMiniAppContext'

const WalletButton = dynamicImport(() => import('@/components/WalletButton').then(mod => mod.WalletButton), {
  ssr: false,
  loading: () => (
    <button className="px-4 py-2 bg-accent/50 rounded-lg text-white/50 font-medium animate-pulse">
      Connect Wallet
    </button>
  )
})

const GameBoard = dynamicImport(() => import('@/components/GameBoard').then(mod => mod.GameBoard), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-surface-2 rounded-xl h-96 max-w-[600px] mx-auto" />
})

const RoundBadge = dynamicImport(() => import('@/components/RoundBadge').then(mod => mod.RoundBadge), {
  ssr: false,
  loading: () => null
})

const FarcasterAutoConnect = dynamicImport(
  () => import('@/components/FarcasterAutoConnect').then(mod => mod.FarcasterAutoConnect),
  { ssr: false }
)

export default function Home() {
  const { isInMiniApp } = useFarcasterMiniApp()
  const [showRules, setShowRules] = useState(false)
  const [showActivity, setShowActivity] = useState(false)

  return (
    <>
      {/* Auto-connect wallet in mini app */}
      <FarcasterAutoConnect />

      <div className="min-h-screen bg-bg">
        {/* Header */}
        <header className="bg-surface border-b border-border sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl" role="img" aria-label="Crystal Ball">🔮</span>
              <div>
                <h1 className="text-[22px] font-display font-normal tracking-tight text-text leading-tight">
                  SpellBlock
                </h1>
                <p className="text-[11px] text-text-dim font-body">by Clawdia</p>
              </div>
              <RoundBadge />
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowRules(true)}
                className="w-[38px] h-[38px] border border-border rounded-lg flex items-center justify-center text-text-dim hover:text-text hover:border-accent transition-colors"
                title="How to play"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </button>
              
              <button
                onClick={() => setShowActivity(!showActivity)}
                className="relative w-[38px] h-[38px] border border-border rounded-lg flex items-center justify-center text-text-dim hover:text-text hover:border-accent transition-colors"
                title="Activity"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <span className="absolute top-[5px] right-[5px] w-[6px] h-[6px] bg-green rounded-full pulse-animation" />
              </button>
              
              <WalletButton />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <GameBoard />
        </main>

        {/* Rules Modal */}
        {showRules && (
          <div 
            className="fixed inset-0 bg-black/25 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowRules(false)}
          >
            <div 
              className="bg-surface border border-border rounded-2xl max-w-lg w-full max-h-[85vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-[18px] border-b border-border">
                <h2 className="text-[22px] font-display font-normal">How to play</h2>
                <button
                  onClick={() => setShowRules(false)}
                  className="w-[30px] h-[30px] border border-border rounded-lg flex items-center justify-center text-text-dim hover:text-text text-sm"
                >
                  ✕
                </button>
              </div>
              
              <div className="px-[22px] py-[18px] pb-6 space-y-[18px]">
                {[
                  {
                    n: '1',
                    title: 'Craft your word',
                    desc: 'Each round reveals a pool of letters. Build a word using only those letters — you\'re betting it survives hidden constraints.'
                  },
                  {
                    n: '2',
                    title: 'Stake & commit',
                    desc: 'Stake $CLAWDIA tokens. Your word is hashed onchain — nobody sees it, and you can\'t change it.'
                  },
                  {
                    n: '3',
                    title: 'The double reveal',
                    desc: 'At midnight UTC, two hidden constraints appear:'
                  },
                  {
                    n: '4',
                    title: 'Reveal & settle',
                    desc: 'Reveal your word. If it passes both spell and ruler, you win a share of the pot. If not, your stake burns forever.'
                  }
                ].map((step) => (
                  <div key={step.n} className="flex gap-3">
                    <div className="flex-shrink-0 w-[26px] h-[26px] rounded-full bg-accent text-white flex items-center justify-center font-mono text-[13px] font-bold">
                      {step.n}
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-1">{step.title}</div>
                      <div className="text-[12.5px] text-text-dim leading-relaxed">{step.desc}</div>
                      {step.n === '3' && (
                        <div className="mt-2 space-y-1 text-[12.5px]">
                          <div className="flex items-center gap-1.5 py-0.5">
                            <span>🚫</span>
                            <strong>Veto:</strong>
                            <span className="opacity-70">Must NOT contain [letter]</span>
                          </div>
                          <div className="flex items-center gap-1.5 py-0.5">
                            <span>⚓</span>
                            <strong>Anchor:</strong>
                            <span className="opacity-70">Must START with [letter]</span>
                          </div>
                          <div className="flex items-center gap-1.5 py-0.5">
                            <span>🔒</span>
                            <strong>Seal:</strong>
                            <span className="opacity-70">Must END with [letter]</span>
                          </div>
                          <div className="flex items-center gap-1.5 py-0.5">
                            <span>💎</span>
                            <strong>Gem:</strong>
                            <span className="opacity-70">Must have double letters</span>
                          </div>
                          <div className="text-text-dim mt-2">
                            Plus the <strong>Ruler</strong> — three valid word lengths your word must match.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="bg-surface-2 border border-border rounded-lg px-[14px] py-3 mt-1">
                  <div className="font-semibold text-[12.5px] mb-1.5">Daily schedule (UTC)</div>
                  <div className="space-y-0.5 text-[12.5px] text-text-dim leading-relaxed">
                    <div className="py-0.5">
                      <span className="font-mono font-semibold text-text mr-1.5">16:00</span>
                      Round opens · Letters revealed
                    </div>
                    <div className="py-0.5">
                      <span className="font-mono font-semibold text-text mr-1.5">08:00</span>
                      Commits close · Spell + Ruler revealed
                    </div>
                    <div className="py-0.5">
                      <span className="font-mono font-semibold text-text mr-1.5">16:00</span>
                      Reveals close · Winners paid · Burns executed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Panel */}
        {showActivity && (
          <div 
            className="fixed inset-0 bg-black/25 z-[100] flex justify-end"
            onClick={() => setShowActivity(false)}
          >
            <div 
              className="bg-surface border-l border-border w-[320px] max-w-[88vw] h-full flex flex-col animate-fadeInUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-[18px] py-[14px] border-b border-border">
                <h3 className="text-lg font-display font-normal">Live activity</h3>
                <button
                  onClick={() => setShowActivity(false)}
                  className="w-[30px] h-[30px] border border-border rounded-lg flex items-center justify-center text-text-dim hover:text-text text-sm"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="divide-y divide-border">
                  {[
                    { addr: '0x1a2b...3c4d', stake: 5000000, time: '2m ago' },
                    { addr: '0x5e6f...7g8h', stake: 12000000, time: '4m ago' },
                    { addr: '0x9i0j...1k2l', stake: 1000000, time: '7m ago' },
                    { addr: '0x3m4n...5o6p', stake: 25000000, time: '11m ago' },
                    { addr: '0x7q8r...9s0t', stake: 3000000, time: '15m ago' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between px-[18px] py-2.5">
                      <span className="font-mono text-xs text-text-dim">{activity.addr}</span>
                      <div className="text-right">
                        <div className="font-mono text-[12.5px] font-semibold text-gold">
                          {activity.stake >= 1000000 ? `${(activity.stake / 1000000).toFixed(1)}M` : activity.stake}
                        </div>
                        <div className="text-[10.5px] text-text-dim">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="px-[18px] py-2.5 border-t border-border text-center text-[10.5px] text-text-dim italic">
                Words hidden until reveal phase
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-surface border-t border-border mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <p className="text-text-dim">
                Forged with 🐚 by{' '}
                <a 
                  href="https://x.com/ClawdiaBotAI" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  Clawdia
                </a>
                {' '}on Base
              </p>
              
              <div className="flex justify-center space-x-6 text-sm">
                <a 
                  href="https://basescan.org/token/0xbbd9aDe16525acb4B336b6dAd3b9762901522B07" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-dim hover:text-accent transition-colors"
                >
                  📜 $CLAWDIA Token
                </a>
                <a 
                  href="https://x.com/ClawdiaBotAI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-dim hover:text-accent transition-colors"
                >
                  🐚 Follow updates
                </a>
                <a 
                  href="https://github.com/ClawdiaETH/spellblock-frontend" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-dim hover:text-accent transition-colors"
                >
                  💻 View source
                </a>
              </div>
              
              <div className="pt-4 border-t border-border max-w-xl mx-auto">
                <p className="text-text-dim text-xs">
                  Play responsibly. Only stake what you can afford to lose. SpellBlock is a game of skill with monetary stakes.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
