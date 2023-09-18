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
      {
        protocol: "https",
        port: "",
        hostname: "s3.amazonaws.com",
        pathname: "/sam-mroz/**",
      },
    ],
  },
};

module.exports = nextConfig;
