"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { DishCard } from "@/components/menu/DishCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories, menuItems, type CategoryId } from "@/data/menu";
import { cn } from "@/lib/utils";

const tabs: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "Top Picks" },
  ...categories.map((c) => ({ id: c.id, label: c.name })),
];

/** Tabbed showcase of popular dishes with one-tap WhatsApp ordering. */
export function Bestsellers() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("all");

  const items =
    active === "all"
      ? menuItems.filter((m) => m.tag === "Bestseller" || m.tag === "Chef's Special").slice(0, 6)
      : menuItems.filter((m) => m.category === active).slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-cream-200/60 py-20 sm:py-28">
      <div className="bg-dots absolute inset-0 opacity-40" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Customer favourites"
          title={<>Our most-loved <span className="text-maroon-700 italic">bestsellers</span></>}
          description="The dishes our regulars order again and again. Tap “Order” to send it straight to us on WhatsApp."
        />

        <Reveal className="mt-10 flex justify-center">
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-cream-50 p-1.5 shadow-sm ring-1 ring-cream-300 [scrollbar-width:none]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors sm:px-5",
                  active === tab.id ? "text-cream-50" : "text-ink-700 hover:text-maroon-700",
                )}
                aria-pressed={active === tab.id}
              >
                {active === tab.id && (
                  <motion.span
                    layoutId="menu-tab"
                    className="absolute inset-0 rounded-full bg-maroon-700"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <DishCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 text-center">
          <Button href="/menu" variant="outline" size="lg">
            See the full menu
            <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
