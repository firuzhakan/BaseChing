'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { shortAddress } from '@/lib/utils';

export function ConnectButton({ compact = false }: { compact?: boolean }) {
  const { address, isConnected, status } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const coinbase = connectors.find((c) => c.id === 'coinbaseWalletSDK' || c.name === 'Coinbase Wallet') ?? connectors[0];

  if (isConnected && address) {
    return (
      <button
        type="button"
        onClick={() => disconnect()}
        className={
          (compact ? 'text-xs px-3.5 py-2.5' : 'text-sm px-5 py-3') +
          ' rounded-full border border-ink-600 bg-ink-800/80 text-bone-100 hover:border-base-blue/60 hover:text-white transition-all'
        }
        title="Click to disconnect"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 align-middle" />
        {shortAddress(address)}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => coinbase && connect({ connector: coinbase })}
      disabled={isPending || status === 'connecting'}
      className={
        (compact ? 'text-xs px-4 py-2.5' : 'text-sm px-6 py-3.5') +
        ' rounded-full bg-base-blue hover:bg-base-blue-hover text-white font-medium tracking-tight transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_30px_-8px_rgba(0,82,255,0.6)]'
      }
    >
      {isPending ? 'Connecting…' : 'Connect Wallet'}
    </button>
  );
}
