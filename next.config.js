/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Turbopack is the default bundler in Next.js 16; an empty config is enough
  // for our case. The webpack externals below are kept for the (still-supported)
  // webpack build path — they suppress warnings from optional deps pulled in by
  // wagmi/walletconnect (pino-pretty, lokijs, encoding).
  turbopack: {},
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = nextConfig;
