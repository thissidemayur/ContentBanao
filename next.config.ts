import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['framer-motion'],
  images: {
    domains: ['ik.imagekit.io',]
  }

};

export default nextConfig;
