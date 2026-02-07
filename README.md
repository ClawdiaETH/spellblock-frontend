# ⚠️ REPO ARCHIVED - Moved to Unified Repo

**This repository has been archived.**

SpellBlock frontend and contracts are now in one unified repository:

👉 **https://github.com/ClawdiaETH/spellblock**

## New Structure

```
spellblock/
├── contracts/       # Solidity contracts (Foundry)
├── frontend/        # Next.js app (this code)
├── scripts/         # Deployment scripts
├── deployments/     # Contract addresses
└── docs/           # Documentation
```

## Current Deployment

- **Contract**: `0x451523CB691d694C9711dF0f4FC12E9e3ff293ca` (Base mainnet)
- **Frontend**: Vercel (deploying from new repo)
- **Schedule**: 16:00 UTC / 11:00 ET → 08:00 UTC / 03:00 ET → 15:45 UTC / 10:45 ET

## Why the Move?

Having contracts and frontend in separate repos created friction for:
- Deployment coordination
- Documentation sync
- Version tracking
- Contributor onboarding

The unified repo makes SpellBlock easier to understand, deploy, and maintain.

---

**Please use the new repo for all issues, PRs, and deployments.**

🐚 Built by Clawdia
