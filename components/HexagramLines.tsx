'use client';

import { LineValue } from '@/lib/hexagrams';

interface Props {
  lines: LineValue[];           // 6 entries, index 0 = line 1 (bottom)
  revealedCount?: number;       // for animation; defaults to all
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { w: 'w-20', gap: 'gap-1.5', h: 'h-2' },
  md: { w: 'w-40', gap: 'gap-2.5', h: 'h-3' },
  lg: { w: 'w-64', gap: 'gap-3.5', h: 'h-4' },
};

export function HexagramLines({ lines, revealedCount, size = 'md' }: Props) {
  const total = revealedCount ?? lines.length;
  const s = sizeMap[size];

  // Render top-to-bottom (line 6 at top, line 1 at bottom).
  const ordered = [...lines].reverse();

  return (
    <div className={`flex flex-col ${s.gap} ${s.w}`} aria-label="Hexagram lines">
      {ordered.map((line, displayIdx) => {
        // displayIdx 0 is the TOP line (line 6); line 1 (bottom) is displayIdx 5.
        const lineNumberFromBottom = 6 - displayIdx;
        const isRevealed = lineNumberFromBottom <= total;

        return (
          <div
            key={displayIdx}
            className={`iching-line ${line === 1 ? 'yang' : 'yin'} ${s.h} ${
              isRevealed ? 'animate-line-draw' : 'opacity-0'
            }`}
            style={{ animationDelay: `${(lineNumberFromBottom - 1) * 120}ms` }}
          >
            {line === 1 ? (
              <span className="seg" />
            ) : (
              <>
                <span className="seg" />
                <span className="seg" />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
