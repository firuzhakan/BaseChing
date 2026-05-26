'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAccount, useChainId, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';
import { keccak256, stringToBytes, decodeEventLog } from 'viem';
import { BASECHING_ABI, CONTRACT_ADDRESS, HAS_CONTRACT } from '@/lib/contract';
import { TARGET_CHAIN } from '@/lib/wagmi';
import {
  hexagramFromLines,
  linesToArray,
  type Hexagram,
  type LineValue,
} from '@/lib/hexagrams';
import { previewLines } from '@/lib/utils';
import { HexagramLines } from './HexagramLines';
import { ShareButtons } from './ShareButtons';

type Phase = 'idle' | 'signing' | 'casting' | 'revealing' | 'done' | 'error';

interface CastResult {
  lines: LineValue[];
  bits: number;
  hexagram: Hexagram;
  txHash?: `0x${string}`;
}

export function DivinationFlow() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [question, setQuestion] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CastResult | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  const wrongNetwork = isConnected && chainId !== TARGET_CHAIN.id;

  // Animate the 6 lines appearing one by one.
  useEffect(() => {
    if (phase !== 'revealing') return;
    if (revealedCount >= 6) {
      const t = setTimeout(() => setPhase('done'), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setRevealedCount((c) => c + 1), 480);
    return () => clearTimeout(t);
  }, [phase, revealedCount]);

  async function handleCast() {
    setError(null);
    setResult(null);
    setRevealedCount(0);

    if (!question.trim()) {
      setError('Please enter your question first.');
      return;
    }
    if (!isConnected || !address) {
      setError('Connect your wallet to cast.');
      return;
    }
    if (wrongNetwork) {
      try {
        await switchChain({ chainId: TARGET_CHAIN.id });
      } catch {
        setError(`Please switch to ${TARGET_CHAIN.name}.`);
        return;
      }
    }

    const qHash = keccak256(stringToBytes(question.trim()));

    try {
      let bits: number;
      let txHash: `0x${string}` | undefined;

      if (HAS_CONTRACT && walletClient && publicClient) {
        setPhase('signing');
        txHash = await walletClient.writeContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: BASECHING_ABI,
          functionName: 'cast',
          args: [qHash],
          chain: TARGET_CHAIN,
          account: address,
        });

        setPhase('casting');
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

        let parsed: number | undefined;
        for (const log of receipt.logs) {
          if (log.address.toLowerCase() !== (CONTRACT_ADDRESS as string).toLowerCase()) continue;
          try {
            const decoded = decodeEventLog({
              abi: BASECHING_ABI,
              data: log.data,
              topics: log.topics,
            });
            if (decoded.eventName === 'DivinationCast') {
              parsed = Number(decoded.args.lines);
              break;
            }
          } catch {
            // not our event — skip
          }
        }
        if (parsed === undefined) {
          throw new Error('DivinationCast event not found in receipt.');
        }
        bits = parsed;
      } else {
        // Preview mode — no contract deployed yet.
        setPhase('casting');
        await new Promise((r) => setTimeout(r, 800));
        bits = previewLines();
      }

      const lines = linesToArray(bits);
      const hexagram = hexagramFromLines(bits);
      setResult({ lines, bits, hexagram, txHash });
      setPhase('revealing');
      setRevealedCount(1);
    } catch (e: any) {
      console.error(e);
      const msg = e?.shortMessage || e?.message || 'Something went wrong while casting.';
      setError(msg.includes('User rejected') ? 'Transaction was rejected.' : msg);
      setPhase('error');
    }
  }

  function resetForNew() {
    setResult(null);
    setError(null);
    setPhase('idle');
    setRevealedCount(0);
    setQuestion('');
  }

  const busy = phase === 'signing' || phase === 'casting' || phase === 'revealing';

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!result && (
        <div className="relative animate-fade-up">
          <label htmlFor="question" className="block text-xs sm:text-sm font-medium uppercase tracking-[0.22em] text-bone-300/70 mb-3 sm:mb-4">
            What is your question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={busy}
            placeholder="What question rests in your heart? Seek the timeless wisdom of the I Ching."
            rows={3}
            className="w-full px-4 py-4 sm:px-6 sm:py-5 rounded-2xl bg-ink-900/80 border border-ink-700 focus:border-base-blue/70 placeholder:text-bone-300/30 placeholder:font-light text-bone-100 text-base sm:text-lg font-light leading-relaxed resize-none transition-colors"
            maxLength={500}
          />
          <div className="mt-2 text-right text-xs text-bone-300/40">
            {question.length}/500
          </div>

          {!HAS_CONTRACT && (
            <div className="mt-4 mb-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm leading-relaxed">
              <strong className="font-medium">Preview mode.</strong>{' '}
              No contract address configured — casts use client-side randomness.
              Deploy <code className="font-mono text-[10px] sm:text-xs">BaseChing.sol</code> and set{' '}
              <code className="font-mono text-[10px] sm:text-xs">NEXT_PUBLIC_CONTRACT_ADDRESS</code> to enable on-chain casting.
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mt-6">
            <p className="text-xs text-bone-300/50 max-w-md leading-relaxed order-2 sm:order-1">
              Your question is hashed locally; only the hash is sent on-chain.
              Six coin tosses are generated in a single low-gas transaction on{' '}
              <span className="text-base-blue/90">{TARGET_CHAIN.name}</span>.
            </p>
            <button
              type="button"
              onClick={handleCast}
              disabled={busy || !isConnected}
              className="order-1 sm:order-2 w-full sm:w-auto px-8 py-4 rounded-full bg-base-blue hover:bg-base-blue-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium tracking-tight transition-all shadow-[0_0_40px_-10px_rgba(0,82,255,0.7)] whitespace-nowrap"
            >
              {phase === 'signing' && 'Confirm in wallet…'}
              {phase === 'casting' && 'Casting on-chain…'}
              {(phase === 'idle' || phase === 'error') && 'Cast Divination'}
            </button>
          </div>

          {wrongNetwork && (
            <p className="mt-4 text-sm text-amber-300/80">
              Connected to wrong network. Click Cast to switch to {TARGET_CHAIN.name}.
            </p>
          )}
          {error && <p className="mt-4 text-sm text-red-400/90">{error}</p>}
        </div>
      )}

      {result && (
        <div className="animate-fade-up">
          <ReadingPanel
            hexagram={result.hexagram}
            lines={result.lines}
            revealedCount={revealedCount}
            question={question}
            txHash={result.txHash}
            onReset={resetForNew}
          />
        </div>
      )}
    </div>
  );
}

function ReadingPanel({
  hexagram,
  lines,
  revealedCount,
  question,
  txHash,
  onReset,
}: {
  hexagram: Hexagram;
  lines: LineValue[];
  revealedCount: number;
  question: string;
  txHash?: `0x${string}`;
  onReset: () => void;
}) {
  const fullyRevealed = revealedCount >= 6;
  const explorerBase = TARGET_CHAIN.blockExplorers?.default?.url;

  const lineLabels = useMemo(() => {
    return lines.map((l, i) => `Line ${i + 1}: ${l === 1 ? 'Yang ───' : 'Yin ── ──'}`);
  }, [lines]);

  return (
    <article className="relative grid md:grid-cols-[auto,1fr] gap-8 md:gap-16 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-card-grad border border-ink-700/80 backdrop-blur">
      <div className="flex flex-col items-center gap-5 sm:gap-6">
        <div className="md:hidden">
          <HexagramLines lines={lines} revealedCount={revealedCount} size="md" />
        </div>
        <div className="hidden md:block">
          <HexagramLines lines={lines} revealedCount={revealedCount} size="lg" />
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-bone-300/50 text-center">
          Hexagram {hexagram.kingWen}
        </div>
      </div>

      <div>
        <div className="text-xs sm:text-sm font-medium uppercase tracking-[0.22em] text-base-blue/80">
          {hexagram.pinyin}
        </div>
        <h2 className="mt-1.5 text-3xl sm:text-4xl md:text-5xl font-semibold text-bone-50 leading-[1.05] tracking-[-0.02em]">
          {hexagram.name}
        </h2>
        <div className="mt-3 text-2xl sm:text-3xl font-light text-bone-300/70">
          {hexagram.chinese}
        </div>

        {fullyRevealed ? (
          <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6 animate-fade-in">
            <Section label="The Judgment" body={hexagram.judgment} />
            <Section label="The Image" body={hexagram.image} />
            <Section label="The Reading" body={hexagram.interpretation} />

            {question.trim() && (
              <div className="pt-2">
                <div className="text-xs font-medium uppercase tracking-[0.22em] text-bone-300/40 mb-2">Your question</div>
                <p className="text-lg sm:text-xl font-light text-bone-100/90 italic leading-snug">"{question.trim()}"</p>
              </div>
            )}

            <div className="pt-4 sm:pt-6 flex flex-col gap-4">
              <ShareButtons hexagram={hexagram} question={question} />
              {txHash && explorerBase && (
                <a
                  href={`${explorerBase}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-bone-300/50 hover:text-base-blue/90 transition-colors"
                >
                  View transaction ↗
                </a>
              )}
              <button
                type="button"
                onClick={onReset}
                className="text-sm text-bone-300/60 hover:text-bone-100 transition-colors self-start"
              >
                Ask another question →
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-6 sm:mt-8 text-bone-300/50 text-sm">
            Revealing line {revealedCount} of 6…
          </p>
        )}

        <details className="mt-8 sm:mt-10 group">
          <summary className="cursor-pointer text-xs uppercase tracking-[0.18em] text-bone-300/40 hover:text-bone-300/70 transition-colors">
            Show line values
          </summary>
          <ul className="mt-3 space-y-1 font-mono text-xs text-bone-300/60">
            {[...lineLabels].reverse().map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </details>
      </div>
    </article>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-[0.22em] text-bone-300/40 mb-2.5">{label}</div>
      <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-bone-100/90">{body}</p>
    </div>
  );
}
