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
            A strategic word game where skill meets conviction.
          </p>
          <p className="text-lg text-text-dim font-body max-w-2xl mx-auto">
            Choose your word, stake your $CLAWDIA, and see if your word survives the spell.
          </p>
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

        {/* How to Play - Comprehensive Game Guide */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <h3 className="text-4xl font-display font-bold text-center mb-4 text-amber-glow">
            How to play SpellBlock
          </h3>
          <p className="text-center text-text-secondary font-body mb-16 max-w-3xl mx-auto">
            A strategic word game where you stake $CLAWDIA tokens on your word-crafting skills. Form the highest-scoring word to claim your share of the pot!
          </p>

          {/* Game Objective */}
          <div className="glass-panel p-8 mb-12">
            <h4 className="text-2xl font-heading font-bold mb-4 text-violet-bright flex items-center">
              <span className="text-3xl mr-3">🎯</span>
              Objective
            </h4>
            <p className="text-text-secondary font-body text-lg leading-relaxed">
              Create the highest-scoring word using letters from the daily pool. Your word's final score determines your share of the pot. The better your word, the more you earn!
            </p>
          </div>

          {/* Three Phase System */}
          <div className="mb-16">
            <h4 className="text-3xl font-display font-bold text-center mb-12 text-amber-glow">
              The three-phase ritual
            </h4>
            
            <div className="grid md:grid-cols-3 gap-8 relative mb-16">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-violet-glow to-transparent opacity-30"></div>

              {/* Phase I */}
              <div className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-dim to-violet-glow rounded-full flex items-center justify-center border-2 border-violet-bright shadow-lg">
                    <span className="text-2xl font-display font-bold text-white">I</span>
                  </div>
                </div>
                
                <h5 className="text-xl font-heading font-bold mb-3 text-violet-bright">
                  Commit (24 hours)
                </h5>
                <ul className="text-text-secondary font-body text-sm leading-relaxed text-left space-y-2">
                  <li>• View the available letter pool</li>
                  <li>• Form a word using only those letters</li>
                  <li>• Submit a hidden hash + stake amount</li>
                  <li>• Other players can't see your word yet</li>
                </ul>
              </div>

              {/* Phase II */}
              <div className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-dim to-amber-glow rounded-full flex items-center justify-center border-2 border-amber-bright shadow-lg">
                    <span className="text-2xl font-display font-bold text-white">II</span>
                  </div>
                </div>
                
                <h5 className="text-xl font-heading font-bold mb-3 text-amber-bright">
                  Spell reveal (instant)
                </h5>
                <ul className="text-text-secondary font-body text-sm leading-relaxed text-left space-y-2">
                  <li>• Random spell affects all words</li>
                  <li>• "Double vowels"</li>
                  <li>• "Boost 7+ letter words"</li>
                  <li>• "Multiply words ending in S"</li>
                </ul>
              </div>

              {/* Phase III */}
              <div className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-arcane-teal to-violet-glow rounded-full flex items-center justify-center border-2 border-violet-bright shadow-lg">
                    <span className="text-2xl font-display font-bold text-white">III</span>
                  </div>
                </div>
                
                <h5 className="text-xl font-heading font-bold mb-3 text-violet-bright">
                  Reveal & claim (24 hours)
                </h5>
                <ul className="text-text-secondary font-body text-sm leading-relaxed text-left space-y-2">
                  <li>• Reveal your actual word</li>
                  <li>• Scores calculated with spell effects</li>
                  <li>• Highest scorers split the pot</li>
                  <li>• Failed reveals forfeit stakes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scoring System */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="glass-panel p-8">
              <h4 className="text-2xl font-heading font-bold mb-6 text-amber-bright flex items-center">
                <span className="text-3xl mr-3">🏆</span>
                Scoring system
              </h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-heading font-semibold text-violet-bright mb-2">Base letter values</h5>
                  <p className="text-text-secondary font-body text-sm mb-3">Scrabble-style point system:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                    <div className="text-text-dim">A, E, I, O, U, L, N, S, T, R = 1pt</div>
                    <div className="text-text-dim">D, G = 2pts</div>
                    <div className="text-text-dim">B, C, M, P = 3pts</div>
                    <div className="text-text-dim">F, H, V, W, Y = 4pts</div>
                    <div className="text-text-dim">K = 5pts</div>
                    <div className="text-text-dim">J, X = 8pts</div>
                    <div className="text-text-dim">Q, Z = 10pts</div>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-heading font-semibold text-violet-bright mb-2">Length bonus</h5>
                  <p className="text-text-secondary font-body text-sm">+5 points for each letter over 4</p>
                  <p className="text-text-dim font-mono text-xs">Example: 7-letter word gets +15 bonus</p>
                </div>

                <div>
                  <h5 className="text-lg font-heading font-semibold text-violet-bright mb-2">Spell modifiers</h5>
                  <p className="text-text-secondary font-body text-sm">Daily spell effects can multiply your score</p>
                </div>

                <div>
                  <h5 className="text-lg font-heading font-semibold text-violet-bright mb-2">Streak multipliers</h5>
                  <p className="text-text-secondary font-body text-sm">Win consecutive rounds for bonus multipliers</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8">
              <h4 className="text-2xl font-heading font-bold mb-6 text-amber-bright flex items-center">
                <span className="text-3xl mr-3">📜</span>
                Key rules
              </h4>
              
              <ul className="space-y-3 text-text-secondary font-body">
                <li className="flex items-start">
                  <span className="text-violet-bright mr-3">•</span>
                  <span>Use only letters from the daily pool</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-bright mr-3">•</span>
                  <span>Words must be valid English (dictionary verified)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-bright mr-3">•</span>
                  <span>Minimum 3 letters, maximum pool size</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-bright mr-3">•</span>
                  <span>Failed commitments lose staked tokens</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-bright mr-3">•</span>
                  <span>Tied scores split winnings equally</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-bright mr-3">•</span>
                  <span>Must reveal with exact word and salt used in commit</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Example Scenario */}
          <div className="glass-panel p-8">
            <h4 className="text-2xl font-heading font-bold mb-6 text-amber-bright flex items-center">
              <span className="text-3xl mr-3">💡</span>
              Example scenario
            </h4>
            
            <div className="bg-bg-secondary/30 rounded-lg p-6 border border-violet-dim/20">
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h5 className="font-heading font-semibold text-violet-bright mb-3">Daily setup</h5>
                  <p className="text-text-secondary mb-2"><strong>Letter pool:</strong> A, B, C, E, L, R, S, T</p>
                  <p className="text-text-secondary mb-2"><strong>Spell:</strong> "Double consonants"</p>
                  <p className="text-text-secondary"><strong>Total pot:</strong> 100 $CLAWDIA</p>
                </div>
                
                <div>
                  <h5 className="font-heading font-semibold text-violet-bright mb-3">Your play</h5>
                  <p className="text-text-secondary mb-2"><strong>Word chosen:</strong> "TABLES"</p>
                  <p className="text-text-secondary mb-2"><strong>Stake:</strong> 10 $CLAWDIA</p>
                  <p className="text-text-secondary"><strong>Base score:</strong> T(1) + A(1) + B(3) + L(1) + E(1) + S(1) = 8pts</p>
                </div>
                
                <div>
                  <h5 className="font-heading font-semibold text-violet-bright mb-3">Final calculation</h5>
                  <p className="text-text-secondary mb-2"><strong>Length bonus:</strong> +10 (6 letters)</p>
                  <p className="text-text-secondary mb-2"><strong>Spell effect:</strong> B, T, L, S doubled = +6pts</p>
                  <p className="text-text-secondary"><strong>Final score:</strong> 24 points</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-violet-dim/20">
                <p className="text-amber-glow font-heading">
                  If you had the highest score, you'd win a proportional share of the 100 $CLAWDIA pot!
                </p>
              </div>
            </div>
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
              
              <div className="flex justify-center space-x-8 text-sm">
                <a 
                  href="https://sepolia.basescan.org/address/0xD033205b72015a45ddFFa93484F13a051a637799" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-violet-glow hover:text-violet-bright transition-colors font-body"
                >
                  📜 View sacred contract
                </a>
                <a 
                  href="https://x.com/Clawdia772541" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-violet-glow hover:text-violet-bright transition-colors font-body"
                >
                  🐚 Follow the oracle
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}