import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label={`${site.name} home`}>
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-saffron-400 to-maroon-700 shadow-md transition-transform duration-500 group-hover:rotate-[360deg]">
        <span className="absolute inset-[3px] rounded-full border border-dashed border-cream-50/60" />
        <span className="font-display text-xl font-bold text-cream-50">A</span>
      </span>
      <span className="leading-none">
        <span className={cn("block font-display text-xl font-bold", tone === "dark" ? "text-maroon-800" : "text-cream-50")}>
          {site.name}
        </span>
        <span className={cn("mt-1 block text-[10px] font-semibold tracking-[0.3em] whitespace-nowrap uppercase", tone === "dark" ? "text-saffron-600" : "text-gold-300")}>
          Since {site.since} · {site.branch}
        </span>
      </span>
    </Link>
  );
}
