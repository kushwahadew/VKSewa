import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Limit the number of worker threads to reduce RAM usage
    workerThreads: false,
    cpus: 1,
    optimizePackageImports: ["lucide-react", "framer-motion", "zustand"],
  },
  // Disable source maps in production to save memory during build
  productionBrowserSourceMaps: false,
};

export default nextConfig;
