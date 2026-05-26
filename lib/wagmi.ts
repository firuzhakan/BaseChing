import { http, createConfig, cookieStorage, createStorage } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID || '84532');
export const TARGET_CHAIN = chainId === 8453 ? base : baseSepolia;

export const wagmiConfig = createConfig({
  chains: [TARGET_CHAIN],
  connectors: [
    coinbaseWallet({
      appName: 'BaseChing',
      preference: 'all', // supports Smart Wallet + EOA
    }),
  ],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}
