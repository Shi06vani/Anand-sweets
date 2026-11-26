"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/data/menu";
import { site } from "@/data/site";

const promises = [
  "Sweets made in small batches, every single morning",
  "Pure ghee, real dry fruits & saffron — never shortcuts",
  "Spotless kitchen and a 100% vegetarian menu",
  "Family recipes passed down for generations",
];

// TODO: confirm numbers with the owner
const stats = [
  { value: 35, suffix: "+", label: "Years of sweetness" },
  { value: 150, suffix: "+", label: "Sweets & savouries" },
  { value: 100, suffix: "%", label: "Vegetarian" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/** Brand story + trust points + animated counters. */
export function Story() {
  return (
    <section className="relative overflow-hidden bg-maroon-800 py-20 text-cream-50 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--color-maroon-500),transparent_60%)] opacity-60" />

      <Container className="relative grid items-center gap-16 lg:grid-cols-2">
        {/* Collage */}
        <Reveal direction="right" className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
          {[
            { src: photos.sweetShop, alt: "Colourful sweets on display" },
            { src: photos.kadai, alt: "Gulab jamuns frying in a kadai" },
            { src: photos.laddooTray, alt: "A tray of fresh laddus" },
            { src: photos.festiveSweets, alt: "Festive sweets with roses" },
          ].map((p, i) => (
            <motion.div
              key={p.src}
              whileHover={{ scale: 1.05, rotate: i % 2 ? 3 : -3 }}
              className={`group relative aspect-square overflow-hidden rounded-[2rem] shadow-2xl shadow-black/30 ring-4 ring-cream-50/10 ${i % 2 ? "translate-y-8" : ""}`}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 220px, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}

          {/* Rotating stamp */}
          <div className="absolute top-1/2 left-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-500 text-ink-900 shadow-2xl ring-8 ring-maroon-800">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow [animation-duration:20s]" aria-hidden>
              <defs>
                <path id="stamp-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
              </defs>
              <text className="fill-ink-900 text-[9px] font-bold uppercase">
                <textPath href="#stamp-circle" textLength="234" lengthAdjust="spacing">Handmade • Fresh daily • Pure veg •</textPath>
              </text>
            </svg>
            <span className="text-center leading-none">
              <span className="block text-[10px] font-bold tracking-widest uppercase">Since</span>
              <span className="font-display text-2xl font-bold">{site.since}</span>
            </span>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <SectionHeading
            align="left"
            tone="light"
            eyebrow="Our story"
            title={<>A little shop that became <span className="text-gold-300 italic">Bengaluru’s sweet tradition</span></>}
            description={`For over three decades, families across the city have celebrated their festivals, weddings and everyday wins with ${site.name}. The recipes haven’t changed — only the queue has grown longer.`}
          />

          <ul className="mt-8 space-y-3">
            {promises.map((p, i) => (
              <Reveal key={p} delay={0.1 * i} direction="left">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-ink-900">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-cream-100/90">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10 grid grid-cols-3 gap-4 border-y border-cream-50/15 py-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-gold-300 sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-cream-200/70 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-8">
            <Button href="/about" variant="light" shine>
              Read our story
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
