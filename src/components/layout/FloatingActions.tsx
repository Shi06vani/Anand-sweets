"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useHasCartItems } from "@/components/cart/CartButton";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { telHref, whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";

/** Always-reachable WhatsApp / Call buttons + back-to-top. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const hasCart = useHasCartItems();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed right-4 z-40 flex flex-col items-end gap-3 transition-[bottom] duration-500 sm:right-6 sm:bottom-6",
        hasCart ? "bottom-24" : "bottom-4",
      )}
    >
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-50 text-maroon-700 shadow-lg ring-1 ring-cream-300 transition hover:-translate-y-0.5"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={telHref}
        aria-label="Call us"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-700 text-cream-50 shadow-xl shadow-maroon-900/30 sm:hidden"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, type: "spring" }}
      >
        <Phone className="h-5 w-5" />
      </motion.a>

      <motion.a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="group relative flex h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 text-white shadow-xl shadow-green-900/30 sm:pr-5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <WhatsAppIcon className="h-6 w-6" />
        <span className="hidden text-sm font-bold sm:inline">Order on WhatsApp</span>
      </motion.a>
    </div>
  );
}
