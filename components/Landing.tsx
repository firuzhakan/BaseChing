'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from './ConnectButton';
import { DivinationFlow } from './DivinationFlow';
import { HexagramLines } from './HexagramLines';
import { Logo } from './Logo';
import { VideoEmbed } from './VideoEmbed';

export function Landing() {
  const { isConnected } = useAccount();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Nav />

      <main className="relative z-10">
        <Hero connected={isConnected} />

        {isConnected ? (
          <section id="cast" className="relative px-5 sm:px-6 md:px-12 py-16 sm:py-20 md:py-32">
            <DivinationFlow />
          </section>
        ) : null}

        <Philosophy />
        <HowItWorks />
        <VideoSection />
        <Footer />
      </main>

      <Backdrop />
    </div>
  );
}

function Nav() {
  return (
    <header className="relative z-20 flex items-center justify-between px-5 sm:px-6 md:px-12 py-5 sm:py-6">
      <a href="/" className="flex items-center gap-3 group">
        <Logo size="sm" />
        <span className="text-base sm:text-lg font-medium tracking-tight text-bone-50">
          Base<span className="text-base-blue">Ching</span>
        </span>
      </a>
      <ConnectButton compact />
    </header>
  );
}

function Hero({ connected }: { connected: boolean }) {
  const demo: (0 | 1)[] = [1, 0, 1, 0, 1, 1]; // hexagram 63 — After Completion

  return (
    <section className="relative px-5 sm:px-6 md:px-12 pt-8 sm:pt-12 md:pt-24 pb-20 sm:pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,auto] gap-12 md:gap-24 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-base-blue/10 border border-base-blue/30 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-base-blue mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-base-blue" />
            Built on Base
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.04] text-bone-50 tracking-[-0.02em]">
            The Book of Changes,<br />
            <span className="text-base-blue">cast on-chain.</span>
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl font-light text-bone-300/80 leading-relaxed max-w-xl">
            Ask one question. Six coin tosses, recorded on Base in a single low-gas
            transaction, draw your hexagram from the 4,000-year-old <em className="italic font-normal text-bone-100">I Ching</em>.
            Read your answer — and share it, if you wish.
          </p>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4">
            {!connected && <ConnectButton />}
            {connected && (
              <a
                href="#cast"
                className="text-center px-6 py-3.5 rounded-full bg-base-blue hover:bg-base-blue-hover text-white text-sm font-medium tracking-tight transition-colors shadow-[0_0_30px_-8px_rgba(0,82,255,0.6)]"
              >
                Begin a divination →
              </a>
            )}
            <a
              href="#philosophy"
              className="text-sm text-bone-300/70 hover:text-bone-50 transition-colors sm:self-center"
            >
              Learn the philosophy ↓
            </a>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center gap-5">
          <HexagramLines lines={demo} size="lg" />
          <div className="text-xs uppercase tracking-[0.2em] text-bone-300/50 text-center">
            既濟 · Hexagram 63
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="philosophy" className="relative px-5 sm:px-6 md:px-12 py-16 sm:py-20 md:py-32 border-t border-ink-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-base-blue mb-5 sm:mb-6">
          The I Ching
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-bone-50 leading-[1.1] tracking-[-0.02em] max-w-3xl">
          A 4,000-year-old technology for asking better questions.
        </h2>
        <div className="mt-10 sm:mt-12 grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          <p className="text-bone-300/80 text-base sm:text-lg font-light leading-relaxed">
            The <em className="italic font-normal text-bone-100">I Ching</em>, or <em className="italic font-normal text-bone-100">Book of Changes</em>,
            is the oldest of the Chinese classics — a manual for understanding how situations
            transform. Confucius is said to have worn out three sets of leather binding studying it.
            Leibniz saw in it the binary logic that would later power every computer.
          </p>
          <p className="text-bone-300/80 text-base sm:text-lg font-light leading-relaxed">
            Its 64 hexagrams are built from six lines — each either <strong className="font-medium text-bone-100">Yang</strong> (solid, active)
            or <strong className="font-medium text-bone-100">Yin</strong> (broken, receptive). Together they map the archetypal
            shapes a moment can take. To consult the oracle is not to predict the future, but to clarify the present:
            to see your situation reflected back in the long mirror of human pattern.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Connect your wallet',
      body: 'Sign in with Coinbase Wallet or Baseapp. We never see your private keys — and your question is hashed locally before it touches the chain.',
    },
    {
      n: '02',
      title: 'Ask one question',
      body: 'Be specific. The clearer the question, the more useful the reading. The hexagram is shaped by what you bring to it.',
    },
    {
      n: '03',
      title: 'Cast on Base',
      body: 'A single transaction triggers six coin tosses inside the smart contract. Optimized for minimal gas — pennies, not dollars.',
    },
    {
      n: '04',
      title: 'Read the changes',
      body: 'Your six lines compose into one of 64 hexagrams. Read its judgment, image, and traditional interpretation. Share it, or keep it.',
    },
  ];

  return (
    <section className="relative px-5 sm:px-6 md:px-12 py-16 sm:py-20 md:py-32 border-t border-ink-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-base-blue mb-5 sm:mb-6">How it works</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-bone-50 leading-[1.1] tracking-[-0.02em] max-w-3xl">
          Four steps. One transaction. Sixty-four possibilities.
        </h2>
        <div className="mt-12 sm:mt-16 grid md:grid-cols-2 gap-x-12 gap-y-10 sm:gap-y-14">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="font-mono text-xs text-base-blue/80 mb-3">{s.n}</div>
              <h3 className="text-xl sm:text-2xl font-medium text-bone-50 mb-3 tracking-tight">{s.title}</h3>
              <p className="text-bone-300/75 text-sm sm:text-base font-light leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="relative px-5 sm:px-6 md:px-12 py-16 sm:py-20 md:py-32 border-t border-ink-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-base-blue mb-5 sm:mb-6">Introduction</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-bone-50 leading-[1.1] tracking-[-0.02em] max-w-2xl mb-8 sm:mb-12">
          A short film on the Book of Changes.
        </h2>
        <VideoEmbed />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-5 sm:px-6 md:px-12 py-12 sm:py-16 border-t border-ink-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Logo size="md" />
          <div>
            <div className="text-base font-medium tracking-tight text-bone-50">
              Base<span className="text-base-blue">Ching</span>
            </div>
            <div className="text-xs text-bone-300/50 mt-1 tracking-[0.1em] uppercase">
              I Ching · on Base
            </div>
          </div>
        </div>
        <div className="text-xs text-bone-300/40 font-light leading-relaxed max-w-md md:text-right">
          Built on Base. Inspired by the I Ching. Not financial advice — and not, strictly, fortune-telling.
        </div>
      </div>
    </footer>
  );
}

function Backdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-hero-grad pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />
    </>
  );
}
