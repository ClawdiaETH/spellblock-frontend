'use client'

import { ConnectKitButton } from 'connectkit'
import { GameBoard } from '@/components/GameBoard'

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
            
            {/* Wallet Connect with Arcane Styling */}
            <div className="relative">
              <ConnectKitButton.Custom>
                {({ isConnected, show, truncatedAddress, ensName }) => {
                  return (
                    <button
                      onClick={show}
                      className="arcane-button"
                    >
                      {isConnected ? (ensName ?? truncatedAddress) : 'Connect grimoire'}
                    </button>
                  )
                }}
              </ConnectKitButton.Custom>
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
            Choose your word, stake your $CLAWDIA, and see if your word survives the spell. 
            <strong className="text-violet-bright">Takes only 30 seconds to play!</strong>
          </p>
          
          {/* Quick Appeal CTAs */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl font-bold text-violet-bright">⚡ 30 seconds</div>
              <div className="text-sm text-text-secondary">to commit your word</div>
            </div>
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl font-bold text-amber-bright">💰 Daily pots</div>
              <div className="text-sm text-text-secondary">50-500+ $CLAWDIA</div>
            </div>
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl font-bold text-arcane-teal">🎯 Pure skill</div>
              <div className="text-sm text-text-secondary">Best word wins</div>
            </div>
          </div>
        </section>

        {/* Game Board with Runic Status Orb */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Status Orb */}
            <div className="flex flex-col items-center space-y-8">
              {/* Central Runic Status Orb */}
              <div className="relative flex items-center justify-center">
                <div className="status-orb w-48 h-48 md:w-56 md:h-56 flex flex-col items-center justify-center text-center">
                  <div className="runic-ring"></div>
                  <div className="runic-ring"></div>
                  
                  <div className="relative z-10">
                    <div className="text-sm text-text-dim font-heading uppercase tracking-widest mb-2">
                      Round status
                    </div>
                    <div className="text-2xl font-display font-bold text-amber-glow mb-1">
                      No active round
                    </div>
                    <div className="text-xs text-text-secondary font-body">
                      Awaiting first spell...
                    </div>
                  </div>
                </div>
              </div>

              {/* Pot Display */}
              <div className="glass-panel p-6 text-center min-w-[280px]">
                <div className="text-sm text-text-dim font-heading uppercase tracking-widest mb-2">
                  Current pot
                </div>
                <div className="text-4xl font-display font-bold text-violet-glow">
                  0 $CLAWDIA
                </div>
              </div>
            </div>

            {/* Right: Game Board */}
            <div className="space-y-6">
              <GameBoard />
            </div>
          </div>
        </section>

        {/* How to Play - Complete Game Loop */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <h3 className="text-4xl font-display font-bold text-center mb-4 text-amber-glow">
            How to play SpellBlock
          </h3>
          <p className="text-center text-text-secondary font-body mb-16 max-w-3xl mx-auto text-lg">
            A 3-day strategic word game where you stake $CLAWDIA on your word-crafting skills. <strong>Takes only 30 seconds to play!</strong>
          </p>

          {/* 3-Day Game Loop */}
          <div className="grid md:grid-cols-3 gap-8 relative mb-20">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-violet-glow to-transparent opacity-30"></div>

            {/* Day 1: Commit */}
            <div className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-dim to-violet-glow rounded-full flex items-center justify-center border-2 border-violet-bright shadow-lg">
                  <span className="text-xl font-display font-bold text-white">Day 1</span>
                </div>
              </div>
              
              <h4 className="text-xl font-heading font-bold mb-3 text-violet-bright">
                Commit your word
              </h4>
              <ul className="text-text-secondary font-body text-sm leading-relaxed text-left space-y-2">
                <li>• See today's letter pool (e.g., A,B,E,L,R,S,T,T)</li>
                <li>• Form your word (e.g., "LETTERS")</li>
                <li>• Stake your $CLAWDIA (minimum varies)</li>
                <li>• Submit hidden commitment (others can't see your word yet)</li>
              </ul>
            </div>

            {/* Day 2: Spell Revealed */}
            <div className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-dim to-amber-glow rounded-full flex items-center justify-center border-2 border-amber-bright shadow-lg">
                  <span className="text-xl font-display font-bold text-white">Day 2</span>
                </div>
              </div>
              
              <h4 className="text-xl font-heading font-bold mb-3 text-amber-bright">
                Spell revealed
              </h4>
              <ul className="text-text-secondary font-body text-sm leading-relaxed text-left space-y-2">
                <li>• Today's spell is announced (affects all words)</li>
                <li>• Check if your word survives the spell</li>
                <li>• Calculate your potential score</li>
                <li>• See current pot size and number of players</li>
              </ul>
            </div>

            {/* Day 3: Reveal & Win */}
            <div className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-arcane-teal to-violet-glow rounded-full flex items-center justify-center border-2 border-violet-bright shadow-lg">
                  <span className="text-xl font-display font-bold text-white">Day 3</span>
                </div>
              </div>
              
              <h4 className="text-xl font-heading font-bold mb-3 text-violet-bright">
                Reveal & claim
              </h4>
              <ul className="text-text-secondary font-body text-sm leading-relaxed text-left space-y-2">
                <li>• Reveal your word to prove you committed it</li>
                <li>• Scores calculated with spell effects</li>
                <li>• Highest scorers split the pot</li>
                <li>• Claim your $CLAWDIA winnings!</li>
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
                <p className="text-text-secondary">Split with other top scorers<br/>(typical pots: 50-500 $CLAWDIA)</p>
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

          {/* The 5 Spell Types */}
          <div className="mb-16">
            <h4 className="text-2xl font-heading font-bold text-center mb-8 text-amber-bright">
              🪄 The Five Spell Types
            </h4>
            <p className="text-center text-text-secondary font-body mb-8 max-w-2xl mx-auto">
              Each day brings a different spell that can boost or destroy your word. Master them all!
            </p>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* VETO Spell */}
              <div className="glass-panel p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🚫</span>
                  <h5 className="text-xl font-heading font-bold text-red-400">VETO</h5>
                </div>
                <p className="text-text-secondary mb-3 font-body">
                  <strong>Forbids words containing a specific letter</strong>
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">VETO: E</div>
                  <div className="text-green-400">✓ "STORM" works (no E)</div>
                  <div className="text-red-400">✗ "TREE" fails (contains E)</div>
                </div>
              </div>

              {/* ANCHOR Spell */}
              <div className="glass-panel p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚓</span>
                  <h5 className="text-xl font-heading font-bold text-blue-400">ANCHOR</h5>
                </div>
                <p className="text-text-secondary mb-3 font-body">
                  <strong>Must start with a specific letter</strong>
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">ANCHOR: S</div>
                  <div className="text-green-400">✓ "STORM" works (starts with S)</div>
                  <div className="text-red-400">✗ "METAL" fails (starts with M)</div>
                </div>
              </div>

              {/* SEAL Spell */}
              <div className="glass-panel p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🔖</span>
                  <h5 className="text-xl font-heading font-bold text-purple-400">SEAL</h5>
                </div>
                <p className="text-text-secondary mb-3 font-body">
                  <strong>Must contain a specific letter somewhere</strong>
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">SEAL: R</div>
                  <div className="text-green-400">✓ "STORM" works (contains R)</div>
                  <div className="text-red-400">✗ "BEAT" fails (no R)</div>
                </div>
              </div>

              {/* SPINE Spell */}
              <div className="glass-panel p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📚</span>
                  <h5 className="text-xl font-heading font-bold text-yellow-400">SPINE</h5>
                </div>
                <p className="text-text-secondary mb-3 font-body">
                  <strong>Bonus points for adjacent identical letters</strong>
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">SPINE: Active</div>
                  <div className="text-green-400">✓ "LETTER" gets +2 pts (TT)</div>
                  <div className="text-violet-glow">✓ "COFFEE" gets +4 pts (FF + EE)</div>
                </div>
              </div>

              {/* CLAWDIA_CLAW Spell */}
              <div className="glass-panel p-6 hover:scale-105 transition-all duration-300 lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🦞</span>
                  <h5 className="text-xl font-heading font-bold text-orange-400">CLAWDIA_CLAW</h5>
                </div>
                <p className="text-text-secondary mb-3 font-body">
                  <strong>Complex multi-constraint system (combination of other spells)</strong>
                </p>
                <div className="bg-background-darker p-3 rounded-lg text-sm font-mono">
                  <div className="text-amber-glow mb-2">CLAWDIA_CLAW: VETO E + SEAL R + SPINE</div>
                  <div className="text-green-400">✓ "STORM" works (no E, has R, no doubles = base score)</div>
                  <div className="text-violet-glow">✓ "BURROW" works (no E, has R, RR gets spine bonus)</div>
                  <div className="text-red-400">✗ "TREE" fails (contains forbidden E)</div>
                </div>
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
                    <div>🪄 Spell: <span className="text-violet-bright">SPINE (bonus for doubles)</span></div>
                    <div>💰 Total pot: <span className="text-green-400">170 $CLAWDIA</span></div>
                    <div>👥 Players: <span className="text-text-secondary">8 committed</span></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-violet-bright mb-2">Your Winning Play</div>
                  <div className="bg-background-darker p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>🎯 Your word: <span className="text-amber-glow">"LETTERS"</span></div>
                    <div>💎 Your stake: <span className="text-text-secondary">15 $CLAWDIA</span></div>
                    <div>📊 Base score: <span className="text-text-secondary">7 points (7 letters)</span></div>
                    <div>⚡ Spell bonus: <span className="text-violet-bright">+2 points (TT)</span></div>
                    <div>🏆 Final score: <span className="text-green-400">9 points (highest!)</span></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <div className="text-2xl font-bold text-green-400 mb-2">Result: You win 85 $CLAWDIA!</div>
              <p className="text-text-secondary text-sm">
                As the only player with 9 points, you take 50% of the pot. Your 15 $CLAWDIA stake returned + 85 $CLAWDIA profit = 100 $CLAWDIA total.
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
                <div className="text-2xl font-bold text-amber-bright mb-2">💰 Current pot building</div>
                <div className="text-lg text-text-secondary">78 $CLAWDIA and growing</div>
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
                  href="https://sepolia.basescan.org/address/0xD033205b72015a45ddFFa93484F13a051a637799" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-violet-glow hover:text-violet-bright transition-colors font-body"
                >
                  📜 Smart contract
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