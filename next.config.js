// next.config.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      {
        source: "/ads.txt",
        destination: "/api/ads",
        permanent: true,
      },
    ];
  },
  env: {
    GOOGLE_TRANSLATE_API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY,
  },
};

module.exports = nextConfig;
