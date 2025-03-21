import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
    domains: ['localhost', "hackintown.com", "hackintown-website.vercel.app"]
  },
};

export default nextConfig;
