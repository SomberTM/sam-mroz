/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "depauliaonline.com",
      },
    ],
  },
};

module.exports = nextConfig;
