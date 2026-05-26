# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

BaseChing — an I Ching divination dApp. User asks a question, a Solidity contract on Base performs 6 coin tosses in one low-gas transaction, and the resulting 6 bits are mapped to one of the 64 King Wen hexagrams and rendered with traditional Wilhelm-Baynes-style interpretation.

The original product spec lives in `Claude.md` (capital-C, non-standard filename). Treat it as the product source of truth.

## Commands

```bash
npm run dev                          # Next.js dev server (http://localhost:3000)
npm run build                        # production build
npm run lint                         # next lint

npm run contracts:compile            # hardhat compile
npm run contracts:test               # hardhat test
npm run contracts:deploy:sepolia     # deploy to Base Sepolia (chainId 84532)
npm run contracts:deploy:base        # deploy to Base mainnet (chainId 8453)
npm run contracts:verify             # basescan verification
```

Run a single contract test: `npx hardhat test test/BaseChing.test.ts --grep "increments"`.

## Architecture

**Two halves, one repo:**

1. **Solidity contract** (`contracts/`, `scripts/`, `test/`, `hardhat.config.ts`) — `BaseChing.sol` exposes one function: `cast(bytes32 questionHash) → uint8 lines`. Randomness is `keccak256(block.prevrandao, block.timestamp, msg.sender, nonce, questionHash) & 0x3F`. Emits `DivinationCast(seeker, questionHash, lines, castId)`. The contract does **not** map to King Wen indexing — that's done client-side to save gas.

2. **Next.js App Router frontend** (`app/`, `components/`, `lib/`) — connects via Wagmi + OnchainKit + Coinbase Wallet SDK. The flow lives in `components/DivinationFlow.tsx`:
   - hashes question locally → `keccak256(stringToBytes(q))`
   - calls `cast()` via `walletClient.writeContract`
   - waits for receipt, decodes the `DivinationCast` event with `decodeEventLog`
   - maps the 6-bit value to a hexagram via `hexagramFromLines()` in `lib/hexagrams.ts`
   - reveals the 6 lines one-by-one (480ms staggered) then shows the reading

### The bit ↔ hexagram mapping (important)

`lib/hexagrams.ts` is the single source of truth for the 64 hexagrams. Each entry stores `upper` and `lower` trigrams (each 0–7, 3 bits, line 1 = LSB, Yang=1/Yin=0). The 6-bit hexagram value is `(upper << 3) | lower` with **bit 0 = line 1 (bottom)**. A reverse lookup table `BITS_TO_KING_WEN` is built at module load.

Trigram codes: 7=Heaven ☰, 0=Earth ☷, 1=Thunder ☳, 2=Water ☵, 3=Lake ☱, 4=Mountain ☶, 5=Fire ☲, 6=Wind ☴.

If you ever change the bit-ordering convention here, the contract's `lines` output convention must match, **and** the hexagram entries' `upper`/`lower` must too — these three pieces are coupled.

### Preview vs. on-chain mode

`lib/contract.ts` exports `HAS_CONTRACT = NEXT_PUBLIC_CONTRACT_ADDRESS.length === 42`. When false, `DivinationFlow` falls back to `previewLines()` (browser `crypto.getRandomValues`) and shows an amber banner. This is intentional — lets the UI run before the contract is deployed. Don't remove the fallback without also documenting that deployment is now mandatory before `npm run dev`.

## Locked design constraints

These come from the spec and must not drift:

- **Anti-template aesthetic.** Premium, sleek, trustworthy. Cormorant Garamond serif for display, Inter for body. Generous whitespace. No emoji, no shadcn-default look.
- **Palette is locked** to Base/Coinbase colors — defined as `base.*`, `ink.*`, `bone.*` in `tailwind.config.ts`. Do not introduce off-palette accent colors.
- **All user-facing strings are English** even though the working directory name is Turkish (`Masaüstü` = Desktop).
- **Gas budget**: any contract change must keep `cast()` under the current opcode count. The `viaIR: true` + `runs: 1_000_000` optimizer config in `hardhat.config.ts` exists for this reason.
- **Question privacy**: the raw question must never reach the chain. Only `keccak256(question)` does.

## Conventions for changes

- New components go in `components/`, marked `'use client'` if they use hooks. The page shell (`app/page.tsx`) and layout stay server components.
- New hexagram-related logic belongs in `lib/hexagrams.ts` — keep the data and the lookup co-located.
- Wagmi config is centralized in `lib/wagmi.ts`. When adding a chain, add it to the connectors *and* the transports — both are required by Wagmi v2.
- The `TARGET_CHAIN` export is the single source of truth for the active chain everywhere in the frontend; don't read `NEXT_PUBLIC_CHAIN_ID` directly elsewhere.
