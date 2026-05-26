import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmi';
import { Providers } from './providers';
import './globals.css';

// Space Grotesk — single typeface, multiple weights, Coinbase-adjacent
// geometric character that holds up at every size.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BaseChing — I Ching divination, on Base',
  description:
    'Ask a question, cast a hexagram on-chain, and read your I Ching divination. A meeting of the Book of Changes and the Base blockchain.',
  openGraph: {
    title: 'BaseChing',
    description: 'I Ching divination, cast on Base.',
    type: 'website',
  },
  // Base app verification — renders <meta name="base:app_id" content="..." />
  other: {
    'base:app_id': '69ac358036e1b05c113ad5ba',
  },
};

export const viewport: Viewport = {
  themeColor: '#05060A',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    (await headers()).get('cookie'),
  );

  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans antialiased">
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
