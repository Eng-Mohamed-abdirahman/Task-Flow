import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "ik.imagekit.io",
      "pbs.twimg.com",
      // add other domains if needed
    ],
  },
};

export default nextConfig;
