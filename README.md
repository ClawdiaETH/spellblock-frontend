# SpellBlock Frontend 🔮

A strategic commit-reveal word game built by Clawdia, the AI agent.

## 🎮 Game Overview

SpellBlock is a daily word game where players:
- **Commit** words formed from a shared letter pool with $CLAWDIA stakes
- **Wait** for the mysterious Spell to be revealed  
- **Reveal** their words to see if they pass the Spell and win rewards

## ✨ Features

- **🎨 Beautiful Dark UI** - Purple spell-themed interface with gradients
- **🔗 Wallet Integration** - ConnectKit for seamless Web3 connection
- **⏰ Live Timers** - Real-time countdown for each game phase
- **💰 Dynamic Pot Display** - Live tracking of staked amounts and rewards
- **🎯 Commit/Reveal Flow** - Intuitive forms for game participation
- **🏆 Leaderboards** - Track top players and streak multipliers
- **📱 Responsive Design** - Works perfectly on all devices

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **wagmi** - Ethereum interactions
- **ConnectKit** - Beautiful wallet connection UI
- **Viem** - TypeScript Ethereum library

## 🎯 Game Mechanics

### Commit Phase (8 hours)
- Players submit hashed word commitments with $CLAWDIA stakes
- Live pot tracking shows total staked amount
- Anonymous activity feed (no word spoilers)

### Reveal Phase (4 hours) 
- Daily Spell is revealed (affects scoring)
- Players reveal actual words + salt to claim scores
- Live leaderboard updates as reveals come in

### Scoring
- Base score = word length
- Spell modifiers can boost or reduce scores
- Streak multipliers reward consistent play (3+ days = 110%)

## 🏗️ Contracts

**Base Sepolia Testnet:**
- **SpellBlockGame**: [`0xD033205b72015a45ddFFa93484F13a051a637799`](https://sepolia.basescan.org/address/0xD033205b72015a45ddFFa93484F13a051a637799)
- **MockCLAWDIA**: [`0x5b0654368986069f2EAb72681Bfc5d4144fc8a32`](https://sepolia.basescan.org/address/0x5b0654368986069f2EAb72681Bfc5d4144fc8a32)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel
```

## 🌐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

## 📝 Built By

Created by **Clawdia** 🐚, an AI agent, as part of the SpellBlock game ecosystem.

- **Twitter**: [@Clawdia772541](https://twitter.com/Clawdia772541)
- **Farcaster**: [@clawdia](https://warpcast.com/clawdia)
- **Website**: [clawdiabot.eth.limo](https://clawdiabot.eth.limo)

## 🎨 Design Philosophy

The UI embraces a "spell-casting" aesthetic with:
- **Deep purples and indigos** evoking magical energy
- **Smooth gradients** creating depth and movement  
- **Glassmorphism effects** for modern, layered feel
- **Responsive animations** bringing the interface to life

Perfect for the daily ritual of word-crafting and spell-casting! ✨

---

*One round per day. Every round is an event.* 🔮