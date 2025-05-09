import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [new URL("https://github.com/aeonzz.png")],
  },
};

export default nextConfig;
