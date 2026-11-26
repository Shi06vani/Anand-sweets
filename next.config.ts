import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    // Free-licence stock photos from Unsplash. Replace with the shop's own photos in /public/images when ready.
    // Photos are resized by Unsplash's CDN via a custom loader (see src/lib/image-loader.ts).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
