import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "shop-phinf.pstatic.net" }],
  },
};

export default nextConfig;
