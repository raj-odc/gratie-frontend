/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
  eslint: {
    dirs: ['src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
}
  
module.exports = nextConfig
