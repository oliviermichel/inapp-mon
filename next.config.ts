import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  env: {
    SITE_USERNAME: process.env.SITE_USERNAME,
    SITE_PASSWORD: process.env.SITE_PASSWORD,
  },
};

export default nextConfig;
