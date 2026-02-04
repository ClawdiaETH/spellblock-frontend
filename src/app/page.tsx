'use client'

export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'
import { ConnectButton } from '@rainbow-me/rainbowkit'

// Dynamically import GameBoard to avoid SSR issues
const GameBoard = dynamicImport(() => import('@/components/GameBoard').then(mod => mod.GameBoard), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-spell-dark/50 rounded-xl h-96" />
})

export default function Home() {
  // Generate floating particles
  const particles = Array.from({ length: 12 }, (_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${15 + Math.random() * 10}s`
      }}
    />
  ))

  return (
    <>
      {/* Floating Particles */}
      <div className="particles">
        {particles}
      </div>

      <main className="min-h-screen relative z-10">
        {/* Mystical Header */}
        <header className="glass-panel border-b-0 rounded-none sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl" role="img" aria-label="Crystal Ball">🔮</span>
              <div>
                <h1 className="text-2xl font-display font-bold text-amber-glow">
                  SpellBlock
                </h1>
                <p className="text-xs text-text-dim font-heading">by Clawdia</p>
              </div>
            </div>
            
            {/* Wallet Connect */}
            <div className="relative">
              <ConnectButton 
                label="Connect Wallet"
                showBalance={false}
                chainStatus="icon"
                accountStatus="address"
              />
            </div>
          </div>
        </header>

        {/* Hero Section - Enchanted Tagline */}
        <section className="max-w-6xl mx-auto px-4 py-16 text-center relative">
          <h2 className="text-6xl md:text-7xl font-display font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-glow via-violet-bright to-amber-glow bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]">
              Commit. Reveal. Win.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary mb-4 font-heading">
            The strategic word game where <strong>skill meets stakes</strong>.
          </p>
          <p className="text-lg text-text-dim font-body max-w-2xl mx-auto mb-8">
            Choose your word, stake your $CLAWDIA, and survive both the spell and ruler constraints. 
            <strong className="text-violet-bright">Daily rounds at 16:00 UTC!</strong>
          </p>
          
          {/* Quick Appeal CTAs */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl font-bold text-violet-bright">⚡ Daily rounds</div>
              <div className="text-sm text-text-secondary">12-hour cycles</div>
            </div>
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl font-bold text-amber-bright">💰 Live pot tracker</div>
              <div className="text-sm text-text-secondary">Watch pot grow in real-time</div>
            </div>
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl font-bold text-arcane-teal">🎯 Double constraints</div>
              <div className="text-sm text-text-secondary">Spell + ruler lengths</div>
            </div>
          </div>
        </section>

        {/* THE CORE MECHANIC - Two Hidden Constraints */}
        <section className="max-w-4xl mx-auto px-4 py-12 mb-8">
          <div className="glass-panel p-8 border-2 border-amber-glow/30">
            <h3 className="text-3xl font-display font-bold text-center mb-6 text-amber-glow">
              ⚠️ The Challenge: Two Hidden Constraints
            </h3>
            <p className="text-center text-lg text-text-secondary mb-8">
              Every round, your word must survive <strong className="text-violet-bright">BOTH</strong> hidden constraints to win the main prize:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Clawdia's Ruler */}
              <div className="bg-violet-glow/10 p-6 rounded-xl border border-violet-bright/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📏</span>
                  <h4 className="text-xl font-heading font-bold text-violet-bright">Clawdia's Ruler</h4>
                </div>
                <p className="text-text-secondary mb-3">
                  Each round, Clawdia picks <strong>3 valid word lengths</strong> (between 4-12 letters). Your word must match ONE of them.
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">Example: Ruler = 5, 8, 11</div>
                  <div className="text-green-400">✓ "STORM" (5 letters) - valid</div>
                  <div className="text-green-400">✓ "BALANCED" (8 letters) - valid</div>
                  <div className="text-red-400">✗ "CAT" (3 letters) - wrong length</div>
                </div>
              </div>

              {/* The Spell */}
              <div className="bg-amber-glow/10 p-6 rounded-xl border border-amber-bright/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🪄</span>
                  <h4 className="text-xl font-heading font-bold text-amber-bright">The Spell</h4>
                </div>
                <p className="text-text-secondary mb-3">
                  One of <strong>4 spell types</strong> is active each round. Your word must satisfy the spell's rule.
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">The 4 spells:</div>
                  <div>🚫 <strong>Veto</strong> - must NOT contain [letter]</div>
                  <div>⚓ <strong>Anchor</strong> - must START with [letter]</div>
                  <div>🔖 <strong>Seal</strong> - must END with [letter]</div>
                  <div>💎 <strong>Gem</strong> - must have double letters (LL, TT)</div>
                </div>
              </div>
            </div>

            <div className="text-center bg-red-900/20 p-4 rounded-lg border border-red-500/30">
              <p className="text-lg font-bold text-red-400 mb-2">
                ⚠️ Both are HIDDEN until commits close!
              </p>
              <p className="text-text-secondary text-sm">
                You must hedge your word choice to survive unknown constraints. That's the skill.
              </p>
            </div>
          </div>
        </section>

        {/* Main Game Board */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <GameBoard />
        </section>

        {/* How to Play - Complete Game Loop */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <h3 className="text-4xl font-display font-bold text-center mb-4 text-amber-glow">
            How to play SpellBlock
          </h3>
          <p className="text-center text-text-secondary font-body mb-16 max-w-3xl mx-auto text-lg">
            A daily strategic word game where you stake $CLAWDIA on your word-crafting skills. <strong>Each round runs for 12 hours!</strong>
          </p>

          {/* Daily Game Flow */}
          <div className="grid md:grid-cols-3 gap-8 relative mb-20">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-violet-glow to-transparent opacity-30"></div>

            {/* Commit Phase: 8 hours */}
            <div className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-dim to-violet-glow rounded-full flex items-center justify-center border-2 border-violet-bright shadow-lg">
                  <span className="text-sm font-display font-bold text-white">16:00</span>
                </div>
              </div>
              
              <h4 className="text-xl font-heading font-bold mb-3 text-violet-bright">
                Commit Phase (8 hours)
              </h4>
              <ul className="text-text-secondary font-body text-sm leading-relaxed text-left space-y-2">
                <li>• Round opens at 16:00 UTC daily</li>
                <li>• See letter pool, spell & ruler are hidden</li>
                <li>• Form word, stake min 1M $CLAWDIA</li>
                <li>• Submit hidden commitment hash</li>
                <li>• Watch pot grow with live tracker</li>
              </ul>
            </div>

            {/* Double Reveal: Instant */}
            <div className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-dim to-amber-glow rounded-full flex items-center justify-center border-2 border-amber-bright shadow-lg">
                  <span className="text-sm font-display font-bold text-white">00:00</span>
                </div>
              </div>
              
              <h4 className="text-xl font-heading font-bold mb-3 text-amber-bright">
                Double Reveal Moment
              </h4>
              <ul className="text-text-secondary font-body text-sm leading-relaxed text-left space-y-2">
                <li>• Commits close at 00:00 UTC</li>
                <li>• Spell revealed simultaneously</li>
                <li>• Clawdia's 3 ruler lengths revealed</li>
                <li>• Check if your word survives both!</li>
                <li>• Dramatic reveal builds tension</li>
              </ul>
            </div>

            {/* Reveal Phase: 4 hours */}
            <div className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-arcane-teal to-violet-glow rounded-full flex items-center justify-center border-2 border-violet-bright shadow-lg">
                  <span className="text-sm font-display font-bold text-white">04:00</span>
                </div>
              </div>
              
              <h4 className="text-xl font-heading font-bold mb-3 text-violet-bright">
                Reveal & Finalize (4 hours)
              </h4>
              <ul className="text-text-secondary font-body text-sm leading-relaxed text-left space-y-2">
                <li>• Players reveal actual words + salt</li>
                <li>• Live leaderboard updates</li>
                <li>• Scoring: 1pt/letter × streak bonus</li>
                <li>• Round ends at 04:00 UTC</li>
                <li>• Winners paid, next round starts at 16:00</li>
              </ul>
            </div>
          </div>

          {/* What You Can Win */}
          <div className="glass-panel p-8 mb-16 text-center">
            <h4 className="text-2xl font-heading font-bold mb-4 text-amber-bright">
              💰 What you can win
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-violet-glow font-bold text-lg mb-2">Daily pot share</div>
                <p className="text-text-secondary">Split with other top scorers<br/>(typical pots: 50M-500M $CLAWDIA)</p>
              </div>
              <div>
                <div className="text-violet-glow font-bold text-lg mb-2">Streak bonuses</div>
                <p className="text-text-secondary">3+ wins: 110% | 7+ wins: 125%<br/>14+ wins: 150% multiplier!</p>
              </div>
              <div>
                <div className="text-violet-glow font-bold text-lg mb-2">Jackpot triggers</div>
                <p className="text-text-secondary">When pot exceeds 1000 $CLAWDIA<br/>Winner takes extra rewards</p>
              </div>
            </div>
          </div>

          {/* The 4 Spell Types */}
          <div className="mb-16">
            <h4 className="text-2xl font-heading font-bold text-center mb-8 text-amber-bright">
              🪄 The Four Spell Types
            </h4>
            <p className="text-center text-text-secondary font-body mb-8 max-w-2xl mx-auto">
              Each round brings a different spell constraint. Only words that pass both the spell and length requirements win!
            </p>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Veto Spell */}
              <div className="glass-panel p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🚫</span>
                  <h5 className="text-xl font-heading font-bold text-red-400">Veto</h5>
                </div>
                <p className="text-text-secondary mb-3 font-body">
                  <strong>Word must NOT contain [letter]</strong>
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">Veto: E</div>
                  <div className="text-green-400">✓ "STORM" works (no E anywhere)</div>
                  <div className="text-red-400">✗ "TREE" fails (contains E)</div>
                </div>
              </div>

              {/* Anchor Spell */}
              <div className="glass-panel p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚓</span>
                  <h5 className="text-xl font-heading font-bold text-blue-400">Anchor</h5>
                </div>
                <p className="text-text-secondary mb-3 font-body">
                  <strong>Word must START with [letter]</strong>
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">Anchor: S</div>
                  <div className="text-green-400">✓ "STORM" works (starts with S)</div>
                  <div className="text-red-400">✗ "METAL" fails (starts with M)</div>
                </div>
              </div>

              {/* Seal Spell */}
              <div className="glass-panel p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🔖</span>
                  <h5 className="text-xl font-heading font-bold text-purple-400">Seal</h5>
                </div>
                <p className="text-text-secondary mb-3 font-body">
                  <strong>Word must END with [letter]</strong>
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">Seal: R</div>
                  <div className="text-green-400">✓ "MOTOR" works (ends with R)</div>
                  <div className="text-red-400">✗ "STORM" fails (ends with M, not R)</div>
                </div>
              </div>

              {/* Gem Spell */}
              <div className="glass-panel p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💎</span>
                  <h5 className="text-xl font-heading font-bold text-cyan-400">Gem</h5>
                </div>
                <p className="text-text-secondary mb-3 font-body">
                  <strong>Word must have adjacent identical letters</strong>
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">Gem: Active</div>
                  <div className="text-green-400">✓ "LETTER" works (has TT)</div>
                  <div className="text-red-400">✗ "STORM" fails (no adjacent doubles)</div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <div className="glass-panel p-4 max-w-2xl mx-auto">
                <p className="text-text-secondary text-sm">
                  <strong>Remember:</strong> Your word must pass BOTH the spell constraint AND match one of Clawdia's 3 hidden ruler lengths to win the main prize. Words that pass the spell but miss the length go to consolation pool (capped at stake return).
                </p>
              </div>
            </div>
          </div>

          {/* Example Winning Scenario */}
          <div className="glass-panel p-8 max-w-4xl mx-auto mt-16">
            <h4 className="text-2xl font-heading font-bold text-center mb-6 text-amber-bright">
              🏆 Example: How you could win 85 $CLAWDIA today
            </h4>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-violet-bright mb-2">Today's Setup</div>
                  <div className="bg-background-darker p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>📝 Letter pool: <span className="text-amber-glow">A,B,E,L,R,S,T,T</span></div>
                    <div>🪄 Spell: <span className="text-violet-bright">Gem (need adjacent doubles)</span></div>
                    <div>📏 Ruler lengths: <span className="text-amber-bright">5, 7, 10</span></div>
                    <div>💰 Total pot: <span className="text-green-400">170M $CLAWDIA</span></div>
                    <div>👥 Players: <span className="text-text-secondary">8 committed</span></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-violet-bright mb-2">Your Winning Play</div>
                  <div className="bg-background-darker p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>🎯 Your word: <span className="text-amber-glow">"LETTERS"</span></div>
                    <div>💎 Your stake: <span className="text-text-secondary">15M $CLAWDIA</span></div>
                    <div>📊 Base score: <span className="text-text-secondary">7 points (1 per letter)</span></div>
                    <div>⚡ Length match: <span className="text-green-400">✓ (7 in ruler)</span></div>
                    <div>🪄 Spell pass: <span className="text-green-400">✓ (Gem: has TT)</span></div>
                    <div>🔥 Streak bonus: <span className="text-violet-bright">×1.25 (7-day streak)</span></div>
                    <div>🏆 Final score: <span className="text-green-400">8.75 points (highest!)</span></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <div className="text-2xl font-bold text-green-400 mb-2">Result: You win 85M $CLAWDIA!</div>
              <p className="text-text-secondary text-sm">
                As the highest scorer (8.75 points), you get the largest share of the 90% prize pool. Your 15M $CLAWDIA stake + 85M $CLAWDIA winnings = 100M total!
              </p>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-text-dim text-sm italic">
                "I spent 30 seconds and turned 15 $CLAWDIA into 100. This game is addictive!" - @wordwizard_base
              </p>
            </div>
          </div>

          {/* Simple Scoring Guide */}
          <div className="glass-panel p-6 mt-12">
            <h4 className="text-xl font-heading font-bold text-center mb-4 text-violet-bright">
              📊 Quick scoring guide
            </h4>
            <div className="grid md:grid-cols-4 gap-4 text-center text-sm">
              <div>
                <div className="font-mono text-amber-glow mb-1">"CAT" = 3 pts</div>
                <div className="text-text-dim">1 point per letter</div>
              </div>
              <div>
                <div className="font-mono text-amber-glow mb-1">"STORM" = 5 pts</div>
                <div className="text-text-dim">5 letters × 1pt each</div>
              </div>
              <div>
                <div className="font-mono text-amber-glow mb-1">"LETTERS" = 7 pts</div>
                <div className="text-text-dim">Longer words win</div>
              </div>
              <div>
                <div className="font-mono text-violet-bright mb-1">+ spell bonus</div>
                <div className="text-text-dim">Spells can multiply score</div>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Play CTA */}
        <section className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="glass-panel p-12">
            <h3 className="text-4xl font-display font-bold mb-4 text-amber-glow">
              Ready to cast your first spell?
            </h3>
            <p className="text-xl text-text-secondary mb-8 font-heading">
              Join hundreds of word wizards earning $CLAWDIA daily
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="bg-background-darker p-4 rounded-lg">
                <div className="text-2xl font-bold text-violet-bright mb-2">⏰ Next round starts</div>
                <div className="text-lg text-text-secondary">In 4 hours 23 minutes</div>
              </div>
              <div className="bg-background-darker p-4 rounded-lg">
                <div className="text-2xl font-bold text-amber-bright mb-2">💰 Min stake</div>
                <div className="text-lg text-text-secondary">1,000,000 $CLAWDIA</div>
              </div>
            </div>

            <button className="arcane-button text-xl px-8 py-4 mb-4">
              Connect wallet & play now
            </button>
            
            <p className="text-text-dim text-sm">
              Connect your wallet above to join the next round. No $CLAWDIA? 
              <a href="#" className="text-violet-glow hover:text-violet-bright ml-1">Get some here →</a>
            </p>
          </div>
        </section>

        {/* Mystical Footer */}
        <footer className="glass-panel border-t-0 rounded-none mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <p className="text-text-secondary font-body">
                Forged with 🐚 by{' '}
                <a 
                  href="https://x.com/Clawdia772541" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-amber-glow hover:text-amber-bright transition-colors font-heading"
                >
                  Clawdia
                </a>
                {' '}on the Base realm
              </p>
              
              <div className="flex justify-center space-x-6 text-sm">
                <a 
                  href="https://basescan.org/token/0xbbd9aDe16525acb4B336b6dAd3b9762901522B07" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-violet-glow hover:text-violet-bright transition-colors font-body"
                >
                  📜 $CLAWDIA Token
                </a>
                <a 
                  href="https://x.com/Clawdia772541" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-violet-glow hover:text-violet-bright transition-colors font-body"
                >
                  🐚 Follow updates
                </a>
                <a 
                  href="https://github.com/ClawdiaETH/spellblock-frontend" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-violet-glow hover:text-violet-bright transition-colors font-body"
                >
                  💻 View source
                </a>
              </div>
              
              <div className="pt-4 border-t border-violet-glow/20">
                <p className="text-text-dim text-xs">
                  Play responsibly. Only stake what you can afford to lose. SpellBlock is a game of skill with monetary stakes.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}