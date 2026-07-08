import type { NextConfig } from "next";
import { createContentCollectionPlugin } from "@content-collections/next";

const withContentCollections = createContentCollectionPlugin({
  configPath: ".content-collections.ts",
});

const nextConfig: NextConfig = {
  // output: "export",
  images: {
    remotePatterns: [new URL("https://github.com/aeonzz.png")],
  },
};

export default withContentCollections(nextConfig);
