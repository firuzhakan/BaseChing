import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base / Coinbase official palette
        base: {
          blue: '#0052FF',
          'blue-hover': '#1A66FF',
          'blue-deep': '#0040CC',
        },
        ink: {
          950: '#05060A',
          900: '#0A0B14',
          800: '#10131F',
          700: '#1A1E2E',
          600: '#252A3D',
          500: '#3A4055',
        },
        bone: {
          50: '#FBFBFA',
          100: '#F4F4F1',
          200: '#E5E5E0',
          300: '#C9C9C2',
        },
      },
      fontFamily: {
        // Single typeface across the entire app. `font-serif` is kept as an
        // alias so existing markup still resolves — hierarchy now comes from
        // weight + size, not from a serif/sans contrast.
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'hero-grad': 'radial-gradient(80% 50% at 50% 0%, rgba(0, 82, 255, 0.18), transparent 60%), linear-gradient(180deg, #05060A 0%, #0A0B14 100%)',
        'card-grad': 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.7s ease-out',
        'line-draw': 'lineDraw 0.45s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineDraw: {
          '0%': { opacity: '0', transform: 'scaleX(0)' },
          '100%': { opacity: '1', transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
