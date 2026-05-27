'use client';

import { useEffect, useState } from 'react';
import { Hexagram } from '@/lib/hexagrams';
import { tweetIntent } from '@/lib/utils';

interface Props {
  hexagram: Hexagram;
  question?: string;
}

type Toast = { kind: 'success' | 'info' | 'error'; msg: string } | null;

export function ShareButtons({ hexagram, question }: Props) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://baseching.xyz';
  const qLine = question?.trim() ? `I asked: "${question.trim()}"\n\n` : '';
  const text = `${qLine}The I Ching answered: ${hexagram.name} (${hexagram.chinese} ${hexagram.pinyin}) — Hexagram ${hexagram.kingWen}.\n\nCast on-chain on @base via BaseChing.`;

  const xUrl = tweetIntent(text, appUrl);

  const [toast, setToast] = useState<Toast>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isInDappBrowser, setIsInDappBrowser] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = navigator.userAgent || '';
    const eth = (window as unknown as { ethereum?: { isCoinbaseWallet?: boolean; isCoinbaseBrowser?: boolean } }).ethereum;
    const looksLikeDapp =
      /CoinbaseWallet|CoinbaseBrowser|MetaMask|Trust|Rainbow|Base/i.test(ua) ||
      Boolean(eth?.isCoinbaseWallet) ||
      Boolean(eth?.isCoinbaseBrowser) ||
      typeof eth !== 'undefined';
    setIsInDappBrowser(looksLikeDapp);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  async function handleBaseAppShare() {
    const shareData: ShareData = {
      title: `BaseChing — Hexagram ${hexagram.kingWen}: ${hexagram.name}`,
      text,
      url: appUrl,
    };

    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        await navigator.share(shareData);
        return;
      }
    } catch (err) {
      const name = (err as { name?: string })?.name;
      if (name === 'AbortError') return;
    }

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${text}\n\n${appUrl}`);
        setToast({ kind: 'success', msg: 'Reading copied to clipboard — paste it anywhere.' });
        return;
      }
    } catch {
      // fall through
    }

    setToast({ kind: 'error', msg: 'Sharing not supported in this browser.' });
  }

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <button
          type="button"
          onClick={handleBaseAppShare}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-base-blue hover:bg-base-blue-hover text-white text-sm font-medium tracking-tight transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4 12l1.41-1.41L11 16.17V4h2v12.17l5.58-5.59L20 12l-8 8z" />
          </svg>
          Share to Baseapp
        </button>

        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-ink-600 bg-ink-800/60 hover:border-base-blue/60 hover:text-white text-bone-100 text-sm font-medium tracking-tight transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.244 2H21l-6.49 7.41L22 22h-6.84l-4.78-6.27L4.8 22H2.05l6.95-7.94L2 2h6.97l4.32 5.78zM17.07 20.13h1.62L7.02 3.77H5.3z" />
          </svg>
          Share on X
        </a>

        {isInDappBrowser && (
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-base-blue/60 bg-base-blue/10 hover:bg-base-blue/20 text-base-blue text-sm font-medium tracking-tight transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add to Baseapp
          </button>
        )}
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`absolute -top-14 left-0 right-0 sm:left-auto sm:right-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border backdrop-blur animate-fade-in ${
            toast.kind === 'success'
              ? 'bg-base-blue/15 border-base-blue/40 text-base-blue'
              : toast.kind === 'error'
              ? 'bg-red-500/10 border-red-500/40 text-red-300'
              : 'bg-ink-800/80 border-ink-600 text-bone-100'
          }`}
        >
          {toast.msg}
        </div>
      )}

      {showAddModal && (
        <AddToBaseappModal appUrl={appUrl} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

function AddToBaseappModal({ appUrl, onClose }: { appUrl: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // noop
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-to-baseapp-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md rounded-3xl bg-card-grad border border-ink-700/80 shadow-[0_20px_60px_-15px_rgba(0,82,255,0.35)] p-6 sm:p-8 animate-fade-up">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-base-blue/80 mb-2">
              Pin BaseChing
            </div>
            <h3 id="add-to-baseapp-title" className="text-2xl sm:text-3xl font-semibold text-bone-50 leading-tight tracking-[-0.02em]">
              Add to your wallet apps
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 -mr-2 -mt-2 p-2 rounded-full text-bone-300/60 hover:text-bone-50 hover:bg-ink-800/60 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <p className="text-sm sm:text-base font-light leading-relaxed text-bone-300/80">
          Keep BaseChing one tap away inside Baseapp / Coinbase Wallet.
          Most dApp browsers don&apos;t expose a programmatic shortcut API yet — but you can
          pin this page in a couple of seconds:
        </p>

        <ol className="mt-5 space-y-3 text-sm sm:text-base text-bone-100/90 font-light">
          <Step n="1" body="Tap the menu icon (⋯ or ☰) in your wallet's browser bar." />
          <Step n="2" body={'Choose "Add to Favorites", "Bookmark", or "Add to Apps".'} />
          <Step n="3" body="BaseChing will appear in your wallet's dApp shortcuts list." />
        </ol>

        <div className="mt-6 rounded-2xl border border-ink-700 bg-ink-900/60 p-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-[0.2em] text-bone-300/50 mb-1">App URL</div>
            <div className="font-mono text-xs sm:text-sm text-bone-100 truncate">{appUrl}</div>
          </div>
          <button
            type="button"
            onClick={copyLink}
            className="shrink-0 px-3.5 py-2 rounded-full bg-base-blue hover:bg-base-blue-hover text-white text-xs font-medium tracking-tight transition-colors"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full px-5 py-3 rounded-full bg-ink-800/60 hover:bg-ink-800 border border-ink-700 text-bone-100 text-sm font-medium tracking-tight transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

function Step({ n, body }: { n: string; body: string }) {
  return (
    <li className="flex gap-3">
      <span className="shrink-0 w-6 h-6 rounded-full bg-base-blue/15 border border-base-blue/40 text-base-blue text-xs font-medium flex items-center justify-center">
        {n}
      </span>
      <span className="leading-snug pt-0.5">{body}</span>
    </li>
  );
}
