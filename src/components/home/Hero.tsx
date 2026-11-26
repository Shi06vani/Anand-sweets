"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Leaf, MapPin, ShoppingBag } from "lucide-react";
import { useRef } from "react";
import { Stars } from "@/components/ui/Badges";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { site } from "@/data/site";
import { HeroVisual } from "./HeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative -mt-20 overflow-hidden pt-28 pb-32 sm:pb-28 lg:pt-32">
      {/* Background glow + pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-saffron-100),transparent_60%),radial-gradient(ellipse_at_bottom_left,var(--color-maroon-50),transparent_55%)]" />
      <div className="bg-dots absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Copy */}
        <motion.div style={{ y: textY }} className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-cream-50/80 py-1.5 pr-4 pl-1.5 text-sm font-semibold text-ink-700 shadow-sm backdrop-blur"
          >
            <span className="flex items-center gap-1 rounded-full bg-leaf-500 px-2.5 py-1 text-xs font-bold text-white">
              <Leaf className="h-3 w-3" /> Pure Veg
            </span>
            Serving Bengaluru since {site.since}
          </motion.div>

          <h1 className="font-display text-[2.6rem] leading-[1.05] font-bold text-ink-900 sm:text-6xl lg:text-7xl">
            {["Sweet", "moments,"].map((word, i) => (
              <motion.span
                key={word}
                className="mr-3 inline-block"
                initial={{ opacity: 0, y: 40, rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="relative inline-block bg-gradient-to-r from-maroon-700 via-saffron-600 to-maroon-700 bg-[length:200%_auto] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, backgroundPosition: ["0% center", "200% center"] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.35, ease },
                y: { duration: 0.8, delay: 0.35, ease },
                backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" },
              }}
            >
              made fresh daily.
              <motion.svg
                viewBox="0 0 300 20"
                className="absolute -bottom-3 left-0 h-4 w-full text-saffron-400"
                aria-hidden
              >
                <motion.path
                  d="M2 14 Q 75 2 150 10 T 298 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-500 lg:mx-0"
          >
            Ghee-rich mithai, crispy namkeen, chaat and wholesome vegetarian meals —
            handcrafted every morning at our Koramangala kitchen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button href="#order" size="lg" shine className="w-full sm:w-auto">
              <ShoppingBag className="h-5 w-5" />
              Order Now
            </Button>
            <Button href="/menu" size="lg" variant="outline" className="w-full sm:w-auto">
              Explore Menu
              <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
          >
            <div className="flex items-center gap-2">
              <Stars value={site.rating.value} />
              <span className="text-sm font-bold text-ink-900">{site.rating.value}</span>
              <span className="text-sm text-ink-500">({site.rating.count} Google reviews)</span>
            </div>
            <OpenStatus />
            <span className="flex items-center gap-1.5 text-sm text-ink-500">
              <MapPin className="h-4 w-4 text-saffron-600" /> 5th Block, Koramangala
            </span>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <HeroVisual y={plateY} rotate={plateRotate} />
      </Container>
    </section>
  );
}
