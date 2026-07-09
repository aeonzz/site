import type { NextConfig } from "next";
import { createContentCollectionPlugin } from "@content-collections/next";

const withContentCollections = createContentCollectionPlugin({
  configPath: ".content-collections.ts",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://github.com/aeonzz.png")],
  },
};

export default withContentCollections(nextConfig);
