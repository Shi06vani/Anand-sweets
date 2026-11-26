"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Unsplash photos are resized by Unsplash's own CDN (fast, no server work).
 * Local images in /public are served as-is.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.toString();
  }
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
