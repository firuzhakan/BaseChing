# BaseChing

I Ching divination, cast on the Base blockchain.

Ask a question. A single low-gas transaction performs six coin tosses inside a Solidity contract; the resulting six lines are decoded into one of the 64 hexagrams of the *Book of Changes*, with its traditional judgment, image, and interpretation rendered in a premium Base/Coinbase-themed UI.

---

## Quick start

```bash
# 1. install dependencies
npm install

# 2. copy env template
cp .env.example .env.local
cp .env.example .env       # for hardhat (deployment)

# 3. fill in API keys (see "Keys you need" below)

# 4. run the dev server in preview mode
npm run dev
# → http://localhost:3000
```

In **preview mode** (no `NEXT_PUBLIC_CONTRACT_ADDRESS` set) the UI works end-to-end using client-side randomness — useful for design iteration without paying gas. The cast just won't be on-chain.

## Keys you need

Fill these into `.env.local`:

| Variable | Required? | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | **Yes** | [Coinbase Developer Platform](https://portal.cdp.coinbase.com/) → create a project, copy the API key. |
| `NEXT_PUBLIC_WC_PROJECT_ID` | Optional | [WalletConnect Cloud](https://cloud.walletconnect.com/) — only needed if you add non-Coinbase wallet support. |
| `NEXT_PUBLIC_CHAIN_ID` | Yes | `84532` for Base Sepolia (testnet, recommended for first deploy) or `8453` for Base mainnet. |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | After deploy | Set after deploying the contract (step below). Leave blank for preview mode. |
| `NEXT_PUBLIC_APP_URL` | Optional | Your deployed app URL — used in share links. |

For contract deployment (in `.env`):

| Variable | Required? | Where to get it |
|---|---|---|
| `DEPLOYER_PRIVATE_KEY` | Yes | A dedicated deploy wallet's private key. Fund it with a small amount of ETH on Base / Base Sepolia. **Never reuse a personal key.** |
| `BASE_RPC_URL` / `BASE_SEPOLIA_RPC_URL` | Optional | Defaults work; for production use a paid provider (Alchemy/Infura). |
| `BASESCAN_API_KEY` | Optional | [basescan.org/myapikey](https://basescan.org/myapikey) — needed only for `npm run contracts:verify`. |

## Deploy the contract

```bash
# compile
npm run contracts:compile

# run unit tests
npm run contracts:test

# deploy to Base Sepolia (testnet)
npm run contracts:deploy:sepolia

# deploy to Base mainnet
npm run contracts:deploy:base
```

The deploy script prints the contract address — copy it into `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`, restart `npm run dev`, and casts are now on-chain.

## Project layout

```
contracts/BaseChing.sol      Solidity contract: 6-toss cast, emits DivinationCast event
scripts/deploy.ts            Hardhat deploy script
test/BaseChing.test.ts       Contract unit tests

app/                         Next.js App Router
  layout.tsx                 Root layout, providers, fonts
  providers.tsx              Wagmi + React Query + OnchainKit
  page.tsx                   Renders the landing
  globals.css                Tailwind base + I Ching line styles

components/
  Landing.tsx                Hero, philosophy, how-it-works, video, footer
  DivinationFlow.tsx         Question input, on-chain cast, reveal animation, reading
  HexagramLines.tsx          The Yin/Yang line drawing
  ShareButtons.tsx           Baseapp / X share intents
  VideoEmbed.tsx             Click-to-load YouTube embed
  ConnectButton.tsx          Wallet connect/disconnect

lib/
  hexagrams.ts               All 64 hexagrams + binary→King Wen lookup
  contract.ts                ABI + address
  wagmi.ts                   Wagmi config (Base + Base Sepolia)
  utils.ts                   Helpers (share intents, address shortening, preview randomness)
```

## How casting works

1. The user's question is hashed locally with `keccak256` — only the hash reaches the chain.
2. The frontend calls `BaseChing.cast(bytes32 questionHash)`. The contract mixes `block.prevrandao`, `block.timestamp`, `msg.sender`, the global nonce, and the question hash via `keccak256`, then takes the low 6 bits.
3. Each bit is one line — bit 0 is the bottom line, bit 5 is the top. `1` = Yang (solid), `0` = Yin (broken).
4. The contract emits `DivinationCast(seeker, questionHash, lines, castId)`.
5. The frontend decodes the event, maps the 6-bit value to the King Wen sequence (1–64), and renders the hexagram.

### A note on randomness

This contract uses `prevrandao`-based pseudo-randomness, which is appropriate for a non-financial divination. The L1 beacon randao value is unpredictable to ordinary users and uneconomical for validators to manipulate against a single low-stakes cast. **Do not** reuse this pattern for anything where the outcome carries economic stakes — use [Chainlink VRF](https://docs.chain.link/vrf) or a commit-reveal scheme instead.

## License

MIT.
