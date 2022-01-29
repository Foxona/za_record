/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/speech/:path*',
        destination: 'http://renamon.fedorg.net:5000/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
