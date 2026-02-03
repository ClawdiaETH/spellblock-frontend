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
                      {isConnected ? (ensName ?? truncatedAddress) : 'Connect Grimoire'}
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
                      Round Status
                    </div>
                    <div className="text-2xl font-display font-bold text-amber-glow mb-1">
                      No Active Round
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
                  Current Pot
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

        {/* How to Play - Mystical Phase Cards */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <h3 className="text-4xl font-display font-bold text-center mb-4 text-amber-glow">
            The Arcane Ritual
          </h3>
          <p className="text-center text-text-secondary font-body mb-16 max-w-2xl mx-auto">
            Master the ancient art of word-weaving through three sacred phases
          </p>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-violet-glow to-transparent opacity-30"></div>

            {/* Phase I */}
            <div 
              className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300"
              style={{ animationDelay: '0ms' }}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-dim to-violet-glow rounded-full flex items-center justify-center border-2 border-violet-bright shadow-lg">
                  <span className="text-2xl font-display font-bold text-white">I</span>
                </div>
              </div>
              
              <h4 className="text-xl font-heading font-bold mb-3 text-violet-bright">
                Commit Phase
              </h4>
              <p className="text-text-secondary font-body text-sm leading-relaxed">
                Form a word from the mystical letter pool. Submit a hidden commitment sealed with your $CLAWDIA stake.
              </p>
            </div>

            {/* Phase II */}
            <div 
              className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300"
              style={{ animationDelay: '150ms' }}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-dim to-amber-glow rounded-full flex items-center justify-center border-2 border-amber-bright shadow-lg">
                  <span className="text-2xl font-display font-bold text-white">II</span>
                </div>
              </div>
              
              <h4 className="text-xl font-heading font-bold mb-3 text-amber-bright">
                Spell Reveal
              </h4>
              <p className="text-text-secondary font-body text-sm leading-relaxed">
                The day's Spell manifests! This ancient magic might boost your word's power or shatter its essence.
              </p>
            </div>

            {/* Phase III */}
            <div 
              className="glass-panel p-8 text-center hover:scale-105 transition-all duration-300"
              style={{ animationDelay: '300ms' }}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-arcane-teal to-violet-glow rounded-full flex items-center justify-center border-2 border-violet-bright shadow-lg">
                  <span className="text-2xl font-display font-bold text-white">III</span>
                </div>
              </div>
              
              <h4 className="text-xl font-heading font-bold mb-3 text-violet-bright">
                Reveal & Claim
              </h4>
              <p className="text-text-secondary font-body text-sm leading-relaxed">
                Unveil your word to claim its true score. The most powerful spellcasters share the sacred treasure!
              </p>
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
                  📜 View Sacred Contract
                </a>
                <a 
                  href="https://x.com/Clawdia772541" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-violet-glow hover:text-violet-bright transition-colors font-body"
                >
                  🐚 Follow the Oracle
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}