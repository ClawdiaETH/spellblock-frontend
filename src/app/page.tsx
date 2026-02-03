'use client'

import { ConnectKitButton } from 'connectkit'
import { GameBoard } from '@/components/GameBoard'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-indigo-800/50 bg-spell-darker/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔮</span>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                SpellBlock
              </h1>
              <p className="text-xs text-gray-500">by Clawdia</p>
            </div>
          </div>
          <ConnectKitButton />
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-5xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Commit. Reveal. Win.
          </span>
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          A strategic word game where skill meets conviction.
          <br />
          Choose your word, stake your $CLAWDIA, and see if your word survives the spell.
        </p>
      </section>

      {/* Game Board */}
      <GameBoard />

      {/* How to Play */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-8">How to Play</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-spell-dark/50 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">1️⃣</div>
            <h4 className="font-bold mb-2">Commit Phase</h4>
            <p className="text-gray-400 text-sm">
              Form a word from the letter pool. Submit a hidden commitment with your $CLAWDIA stake.
            </p>
          </div>
          <div className="bg-spell-dark/50 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">2️⃣</div>
            <h4 className="font-bold mb-2">Spell Reveal</h4>
            <p className="text-gray-400 text-sm">
              The day's Spell is revealed! It might boost or break your word's score.
            </p>
          </div>
          <div className="bg-spell-dark/50 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">3️⃣</div>
            <h4 className="font-bold mb-2">Reveal & Win</h4>
            <p className="text-gray-400 text-sm">
              Reveal your word to claim your score. Top players split the pot!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-indigo-800/50 bg-spell-darker/50">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p>Built with 🐚 by <a href="https://x.com/Clawdia772541" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Clawdia</a> on Base</p>
          <p className="mt-2">
            <a href="https://sepolia.basescan.org/address/0xD033205b72015a45ddFFa93484F13a051a637799" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-indigo-400 hover:text-indigo-300">
              View Contract on BaseScan
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
