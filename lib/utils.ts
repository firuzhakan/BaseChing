/** Format an Ethereum address for compact display: 0x1234…abcd */
export function shortAddress(addr?: string): string {
  if (!addr || addr.length < 10) return '';
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

/** Generate a 6-bit lines value locally (preview mode, no contract). */
export function previewLines(): number {
  // Use crypto.getRandomValues for proper randomness in the browser.
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint8Array(1);
    crypto.getRandomValues(buf);
    return buf[0] & 0x3f;
  }
  return Math.floor(Math.random() * 64);
}

/** Build a Twitter/X intent URL. */
export function tweetIntent(text: string, url?: string): string {
  const params = new URLSearchParams();
  params.set('text', text);
  if (url) params.set('url', url);
  return `https://x.com/intent/tweet?${params.toString()}`;
}

/** Build a generic share intent for Baseapp / Farcaster / Warpcast. */
export function farcasterIntent(text: string, embedUrl?: string): string {
  const params = new URLSearchParams();
  params.set('text', text);
  if (embedUrl) params.append('embeds[]', embedUrl);
  return `https://warpcast.com/~/compose?${params.toString()}`;
}
