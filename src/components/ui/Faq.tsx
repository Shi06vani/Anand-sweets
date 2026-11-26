"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

/** Animated accordion for frequently asked questions. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-cream-300 rounded-[2rem] bg-cream-50 px-6 ring-1 ring-cream-300 sm:px-8">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className={cn("font-semibold transition-colors sm:text-lg", isOpen ? "text-maroon-700" : "text-ink-900")}>{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                  isOpen ? "bg-maroon-700 text-cream-50" : "bg-saffron-100 text-maroon-700",
                )}
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pr-12 pb-6 leading-relaxed text-ink-500">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
