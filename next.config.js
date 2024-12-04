// next.config.js
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: '/api/ads',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
