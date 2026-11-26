"use client";

import { motion } from "motion/react";
import { Flame, Sparkles } from "lucide-react";
import Image from "next/image";
import { AddToCart, FavouriteButton } from "@/components/cart/CartControls";
import { Badge, VegMark } from "@/components/ui/Badges";
import type { MenuItem } from "@/data/menu";
import { cn, formatPrice } from "@/lib/utils";

const tagTone = {
  Bestseller: "maroon",
  "Chef's Special": "gold",
  Festive: "saffron",
  New: "cream",
} as const;

type DishCardProps = {
  item: MenuItem;
  /** "grid" = tall photo card, "row" = compact horizontal card */
  layout?: "grid" | "row";
  priority?: boolean;
};

/** Photo card for a single dish with add-to-cart and favourite. Shared by Home & Menu. */
export function DishCard({ item, layout = "grid", priority = false }: DishCardProps) {
  const isRow = layout === "row";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex overflow-hidden rounded-[1.75rem] bg-cream-50 ring-1 ring-cream-300 transition-shadow duration-500 hover:shadow-[0_25px_60px_-20px_rgba(95,23,33,0.35)]",
        isRow ? "flex-row" : "flex-col",
      )}
    >
      {/* Photo */}
      <div className={cn("relative shrink-0 overflow-hidden", isRow ? "w-32 sm:w-44" : "aspect-[4/3] w-full")}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority={priority}
          sizes={isRow ? "180px" : "(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        {item.tag && !isRow && (
          <Badge tone={tagTone[item.tag]} className="absolute top-4 left-4 shadow-lg">
            {item.tag === "Bestseller" && <Flame className="h-3 w-3" />}
            {item.tag === "New" && <Sparkles className="h-3 w-3" />}
            {item.tag}
          </Badge>
        )}
        {!isRow && <FavouriteButton id={item.id} name={item.name} className="absolute top-3 right-3" />}
        {!isRow && (
          <span className="absolute right-4 bottom-4 rounded-full bg-cream-50/95 px-3 py-1.5 text-sm font-extrabold text-maroon-700 shadow-lg backdrop-blur">
            {formatPrice(item.price)}
            {item.unit && <span className="ml-1 text-[11px] font-semibold text-ink-500">/ {item.unit}</span>}
          </span>
        )}
      </div>

      {/* Details */}
      <div className={cn("flex flex-1 flex-col", isRow ? "p-4" : "p-5 sm:p-6")}>
        <div className="flex items-start gap-2">
          <VegMark className="mt-1.5" />
          <h3 className={cn("flex-1 font-display font-bold text-ink-900", isRow ? "text-lg" : "text-xl")}>{item.name}</h3>
          {isRow && <FavouriteButton id={item.id} name={item.name} className="-mt-1 -mr-1 h-9 w-9 shadow-none ring-1 ring-cream-300" />}
        </div>
        {isRow && item.tag && (
          <Badge tone={tagTone[item.tag]} className="mt-2 w-fit">{item.tag}</Badge>
        )}
        <p className={cn("mt-2 flex-1 text-sm leading-relaxed text-ink-500", isRow && "line-clamp-2")}>{item.description}</p>

        <div className={cn("flex items-center justify-between gap-3", isRow ? "mt-3" : "mt-5 border-t border-dashed border-cream-300 pt-4")}>
          {isRow ? (
            <p className="font-extrabold text-maroon-700">
              {formatPrice(item.price)}
              {item.unit && <span className="ml-1 text-xs font-medium text-ink-500">/ {item.unit}</span>}
            </p>
          ) : (
            <span className="text-xs font-semibold tracking-wide text-ink-500 uppercase">Freshly made</span>
          )}
          <AddToCart item={item} />
        </div>
      </div>
    </motion.article>
  );
}
