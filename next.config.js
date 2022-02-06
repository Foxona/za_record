/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/speech/:path*',
        destination: 'https://renamon.fedorg.net/speech' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
