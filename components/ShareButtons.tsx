'use client';

import { Hexagram } from '@/lib/hexagrams';
import { tweetIntent, farcasterIntent } from '@/lib/utils';

interface Props {
  hexagram: Hexagram;
  question?: string;
}

export function ShareButtons({ hexagram, question }: Props) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://baseching.xyz';
  const qLine = question?.trim()
    ? `I asked: "${question.trim()}"\n\n`
    : '';
  const text = `${qLine}The I Ching answered: ${hexagram.name} (${hexagram.chinese} ${hexagram.pinyin}) — Hexagram ${hexagram.kingWen}.\n\nCast on-chain on @base via BaseChing.`;

  const xUrl = tweetIntent(text, appUrl);
  const fcUrl = farcasterIntent(text, appUrl);

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
      <a
        href={fcUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-base-blue hover:bg-base-blue-hover text-white text-sm font-medium tracking-tight transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4 4h16v3.2L13 14v6h-2v-6L4 7.2z" />
        </svg>
        Share to Baseapp
      </a>
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
    </div>
  );
}
