'use client';

import { useState } from 'react';

const VIDEO_ID = 'KgXaIYpAEHQ';
const POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export function VideoEmbed() {
  const [active, setActive] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-ink-700 bg-ink-900 shadow-[0_20px_60px_-20px_rgba(0,82,255,0.35)]">
      {active ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title="I Ching — the Book of Changes"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label="Play introductory video"
        >
          <img
            src={POSTER}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
          <span className="relative z-10 flex items-center gap-3 px-6 py-3.5 rounded-full bg-base-blue/95 backdrop-blur text-white font-medium tracking-tight shadow-[0_0_30px_-8px_rgba(0,82,255,0.8)] group-hover:bg-base-blue-hover transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
              <path d="M2 1l10 6L2 13z" />
            </svg>
            Watch the introduction
          </span>
        </button>
      )}
    </div>
  );
}
