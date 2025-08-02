import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.12.111",
        port: "8002",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
