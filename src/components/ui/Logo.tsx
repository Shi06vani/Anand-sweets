import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label={`${site.name} home`}>
      <LogoMark className="h-12 w-12 shrink-0 drop-shadow-md transition-transform duration-700 group-hover:rotate-[360deg]" />
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
