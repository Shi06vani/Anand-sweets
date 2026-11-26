"use client";

import { AnimatePresence, motion } from "motion/react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { useHydrated } from "@/lib/local-store";
import { cn } from "@/lib/utils";
import { cart, MAX_QTY, useCart } from "@/store/cart";
import { favourites, useFavourites } from "@/store/favourites";

type StepperProps = {
  qty: number;
  onChange: (qty: number) => void;
  label: string;
  size?: "sm" | "md";
  className?: string;
};

/** − 2 + control used in cards and in the cart drawer. */
export function QtyStepper({ qty, onChange, label, size = "md", className }: StepperProps) {
  const btn = cn(
    "flex items-center justify-center rounded-full transition active:scale-90 disabled:opacity-40",
    size === "sm" ? "h-7 w-7" : "h-9 w-9",
  );
  return (
    <div
      className={cn("flex items-center gap-1 rounded-full bg-maroon-700 p-1 text-cream-50 shadow-lg shadow-maroon-900/20", className)}
      role="group"
      aria-label={`Quantity of ${label}`}
    >
      <button type="button" className={cn(btn, "hover:bg-maroon-600")} onClick={() => onChange(qty - 1)} aria-label={`Remove one ${label}`}>
        <Minus className="h-4 w-4" />
      </button>
      <span className={cn("relative overflow-hidden text-center font-bold tabular-nums", size === "sm" ? "w-5 text-sm" : "w-7")}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={qty}
            className="block"
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 14, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {qty}
          </motion.span>
        </AnimatePresence>
      </span>
      <button
        type="button"
        className={cn(btn, "hover:bg-maroon-600")}
        onClick={() => onChange(qty + 1)}
        disabled={qty >= MAX_QTY}
        aria-label={`Add one more ${label}`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

/** "Add" button that turns into a quantity stepper once the item is in the cart. */
export function AddToCart({ item, className }: { item: MenuItem; className?: string }) {
  const lines = useCart();
  const hydrated = useHydrated();
  const qty = hydrated ? (lines.find((l) => l.id === item.id)?.qty ?? 0) : 0;

  return (
    <div className={cn("relative flex h-11 items-center justify-end", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {qty === 0 ? (
          <motion.button
            key="add"
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => cart.add(item)}
            className="flex h-10 items-center gap-1.5 rounded-full border-2 border-maroon-700 px-5 text-sm font-bold text-maroon-700 transition-colors hover:bg-maroon-700 hover:text-cream-50"
            aria-label={`Add ${item.name} to cart`}
          >
            <ShoppingBag className="h-4 w-4" /> Add
          </motion.button>
        ) : (
          <motion.div key="stepper" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
            <QtyStepper qty={qty} label={item.name} onChange={(n) => cart.setQty(item.id, n)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Heart toggle — saved on this device. */
export function FavouriteButton({ id, name, className }: { id: string; name: string; className?: string }) {
  const ids = useFavourites();
  const hydrated = useHydrated();
  const active = hydrated && ids.includes(id);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.8 }}
      onClick={() => favourites.toggle(id)}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from favourites` : `Save ${name} to favourites`}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/90 shadow-lg backdrop-blur transition-colors",
        active ? "text-maroon-600" : "text-ink-500 hover:text-maroon-600",
        className,
      )}
    >
      <motion.span key={String(active)} initial={{ scale: active ? 0.4 : 1 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}>
        <Heart className={cn("h-5 w-5", active && "fill-current")} />
      </motion.span>
    </motion.button>
  );
}
