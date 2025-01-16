import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['p3.aprimocdn.net'],
  },
  env: {
    SITE_USERNAME: process.env.SITE_USERNAME,
    SITE_PASSWORD: process.env.SITE_PASSWORD,
  },
};


export default nextConfig;
