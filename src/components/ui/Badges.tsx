import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The green "pure veg" symbol used on Indian menus. */
export function VegMark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Vegetarian"
      className={cn("inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border-2 border-leaf-500 bg-white", className)}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
    </span>
  );
}

const tones = {
  saffron: "bg-saffron-100 text-saffron-600",
  maroon: "bg-maroon-700 text-cream-50",
  gold: "bg-gold-300/60 text-ink-900",
  cream: "bg-cream-50/90 text-ink-700 backdrop-blur",
} as const;

export function Badge({
  children,
  tone = "saffron",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < Math.round(value) ? "fill-gold-500 text-gold-500" : "fill-cream-300 text-cream-300")}
        />
      ))}
    </span>
  );
}
