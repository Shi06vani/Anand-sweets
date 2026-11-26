"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useHydrated } from "@/lib/local-store";
import { cn, formatPrice } from "@/lib/utils";
import { cart, cartTotals, useCart } from "@/store/cart";

/** Cart icon with a live item-count badge (navbar). */
export function CartButton({ className }: { className?: string }) {
  const lines = useCart();
  const hydrated = useHydrated();
  const count = hydrated ? cartTotals(lines).count : 0;

  return (
    <button
      type="button"
      onClick={cart.open}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-full bg-cream-50 text-maroon-700 ring-1 ring-cream-300 transition hover:bg-saffron-100",
        className,
      )}
      aria-label={`Open cart, ${count} items`}
    >
      <motion.span key={count} initial={{ rotate: count ? -18 : 0, scale: count ? 1.2 : 1 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        <ShoppingBag className="h-5 w-5" />
      </motion.span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron-500 px-1 text-[11px] font-bold text-ink-900 ring-2 ring-cream-50"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/** Sticky "View cart" bar shown on phones once something is in the cart. */
export function MobileCartBar() {
  const lines = useCart();
  const hydrated = useHydrated();
  const { count, total } = cartTotals(hydrated ? lines : []);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          type="button"
          onClick={cart.open}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-2xl bg-maroon-700 px-5 py-3.5 text-cream-50 shadow-2xl shadow-maroon-900/40 sm:hidden"
        >
          <span className="flex items-center gap-3 text-left">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream-50/15">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-cream-200/80">{count} {count === 1 ? "item" : "items"}</span>
              <span className="font-bold">{formatPrice(total)}</span>
            </span>
          </span>
          <span className="flex items-center gap-1 font-bold">
            View cart <ChevronRight className="h-5 w-5" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** True when the mobile cart bar is visible (so other floating buttons can move up). */
export function useHasCartItems() {
  const lines = useCart();
  const hydrated = useHydrated();
  return hydrated && lines.length > 0;
}
