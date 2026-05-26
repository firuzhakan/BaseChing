'use client';

/**
 * BaseChing logo — a stylized hexagram (King Wen #63, "After Completion":
 * alternating Yang/Yin/Yang/Yin/Yang/Yin from bottom to top) set inside a
 * rounded gradient tile. Yang lines glow Base-blue; Yin lines are bone.
 *
 * Two render modes:
 *   - <Logo size="sm"  />  ~22px square — for the nav
 *   - <Logo size="md"  />  ~64px square — for the footer seal / large marks
 */

type Size = 'sm' | 'md' | 'lg';

const dim: Record<Size, number> = { sm: 22, md: 64, lg: 96 };

export function Logo({
  size = 'sm',
  withName = false,
  className = '',
}: {
  size?: Size;
  withName?: boolean;
  className?: string;
}) {
  const px = dim[size];

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className="relative inline-block"
        style={{ width: px, height: px }}
        aria-hidden
      >
        <svg
          viewBox="0 0 64 64"
          width={px}
          height={px}
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <defs>
            <linearGradient id="bc-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10131F" />
              <stop offset="100%" stopColor="#05060A" />
            </linearGradient>
            <linearGradient id="bc-yang" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0052FF" />
              <stop offset="100%" stopColor="#3D7AFF" />
            </linearGradient>
            <linearGradient id="bc-edge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <filter id="bc-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Tile */}
          <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#bc-bg)" />
          <rect
            x="2.5"
            y="2.5"
            width="59"
            height="59"
            rx="13.5"
            fill="none"
            stroke="url(#bc-edge)"
            strokeWidth="1"
          />

          {/* Six lines, top → bottom: Yin Yang Yin Yang Yin Yang (hex 63) */}
          {/* Yin = two segments with gap. Yang = solid bar. */}
          {/* Vertical layout: 6 rows at y = 12, 19, 26, 33, 40, 47, each 3 high */}
          {/* Line 6 (top) — Yin */}
          <rect x="13" y="12"   width="15" height="3" rx="1.5" fill="#F4F4F1" />
          <rect x="36" y="12"   width="15" height="3" rx="1.5" fill="#F4F4F1" />
          {/* Line 5 — Yang */}
          <rect x="13" y="19"   width="38" height="3" rx="1.5" fill="url(#bc-yang)" filter="url(#bc-glow)" />
          {/* Line 4 — Yin */}
          <rect x="13" y="26"   width="15" height="3" rx="1.5" fill="#F4F4F1" />
          <rect x="36" y="26"   width="15" height="3" rx="1.5" fill="#F4F4F1" />
          {/* Line 3 — Yang */}
          <rect x="13" y="33"   width="38" height="3" rx="1.5" fill="url(#bc-yang)" filter="url(#bc-glow)" />
          {/* Line 2 — Yin */}
          <rect x="13" y="40"   width="15" height="3" rx="1.5" fill="#F4F4F1" />
          <rect x="36" y="40"   width="15" height="3" rx="1.5" fill="#F4F4F1" />
          {/* Line 1 (bottom) — Yang */}
          <rect x="13" y="47"   width="38" height="3" rx="1.5" fill="url(#bc-yang)" filter="url(#bc-glow)" />
        </svg>
      </span>

      {withName && (
        <span className="font-medium tracking-tight text-bone-50 leading-none">
          BaseChing
        </span>
      )}
    </span>
  );
}
