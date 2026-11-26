"use client";

import { motion, type MotionValue } from "motion/react";
import { Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Mandala } from "@/components/ui/Mandala";
import { menuItems } from "@/data/menu";
import { formatPrice } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const byId = (id: string) => menuItems.find((m) => m.id === id)!;

/** Photos orbiting the central plate. Angle in degrees, 0 = right. */
const orbit = [
  { item: byId("motichoor-laddu"), angle: -90, size: "w-[22%]" },
  { item: byId("jalebi"), angle: -22, size: "w-[19%]" },
  { item: byId("gulab-jamun"), angle: 50, size: "w-[21%]" },
  { item: byId("samosa"), angle: 130, size: "w-[19%]" },
  { item: byId("dry-fruit-barfi"), angle: 200, size: "w-[20%]" },
];

const featured = byId("kaju-katli");
const fresh = [byId("jalebi"), byId("motichoor-laddu"), byId("gulab-jamun")];

type Props = { y: MotionValue<number>; rotate: MotionValue<number> };

/** Right side of the home hero: a slowly turning plate of real sweets with photos orbiting around it. */
export function HeroVisual({ y, rotate }: Props) {
  return (
    <motion.div style={{ y }} className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Warm glow + decorative rings */}
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,var(--color-saffron-300),transparent_70%)] opacity-60 blur-2xl" />
      <Mandala className="absolute inset-0 h-full w-full animate-spin-slow text-gold-500/45" />
      <div className="absolute inset-[13%] rounded-full border border-dashed border-gold-400/60" />

      {/* Central plate — real photo, slowly turning */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -40 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.15, ease }}
        className="absolute inset-[20%]"
      >
        <motion.div style={{ rotate }} className="h-full w-full">
          <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_40px_80px_-20px_rgba(95,23,33,0.55)] ring-[10px] ring-cream-50 sm:ring-[14px]">
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src={featured.image}
                alt="A plate of kaju katli arranged in a star"
                fill
                priority
                sizes="(min-width: 1024px) 340px, 60vw"
                className="scale-110 object-cover"
              />
            </motion.div>
            {/* Plate shine */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_45%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(43,26,18,0.35)]" />
          </div>
        </motion.div>
        <div className="absolute inset-[-5%] -z-10 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 opacity-70" />
      </motion.div>

      {/* Orbiting photos */}
      {orbit.map(({ item, angle, size }, i) => {
        const rad = (angle * Math.PI) / 180;
        const r = 43;
        return (
          <motion.div
            key={item.id}
            className={`absolute aspect-square -translate-x-1/2 -translate-y-1/2 ${size}`}
            style={{ left: `${50 + r * Math.cos(rad)}%`, top: `${50 + r * Math.sin(rad)}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 160, damping: 14 }}
          >
            <motion.div
              className="h-full w-full"
              animate={{ y: [0, i % 2 ? 10 : -10, 0] }}
              transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link
                href="/menu"
                className="group relative block h-full w-full rounded-full bg-cream-50 p-1 shadow-xl shadow-maroon-900/25 ring-2 ring-gold-300 transition-transform duration-500 hover:scale-110 sm:p-1.5"
                aria-label={`See ${item.name} on the menu`}
              >
                <span className="relative block h-full w-full overflow-hidden rounded-full">
                  <Image src={item.image} alt={item.name} fill sizes="130px" className="object-cover transition-transform duration-700 group-hover:scale-125" />
                </span>
                <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 translate-y-1 rounded-full bg-ink-900/85 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap text-cream-50 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.name}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Bestseller card */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7, ease }}
        className="absolute top-[4%] -right-1 sm:right-0"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3 rounded-2xl bg-cream-50/95 p-2 pr-4 shadow-2xl shadow-maroon-900/20 ring-1 ring-cream-300 backdrop-blur"
        >
          <span className="relative h-12 w-12 overflow-hidden rounded-xl sm:h-14 sm:w-14">
            <Image src={featured.image} alt="" fill sizes="56px" className="object-cover" />
          </span>
          <span className="leading-tight">
            <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-saffron-600 uppercase">
              <Flame className="h-3 w-3" /> Bestseller
            </span>
            <span className="block font-display text-base font-bold text-ink-900 sm:text-lg">{featured.name}</span>
            <span className="text-xs font-semibold text-maroon-700">
              {formatPrice(featured.price)} <span className="font-normal text-ink-500">/ {featured.unit}</span>
            </span>
          </span>
        </motion.div>
      </motion.div>

      {/* Fresh batches card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.7, ease }}
        className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 sm:-bottom-[2%]"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3 rounded-2xl bg-cream-50/95 p-3 pr-5 whitespace-nowrap shadow-2xl shadow-maroon-900/20 ring-1 ring-cream-300 backdrop-blur"
        >
          <span className="flex -space-x-3">
            {fresh.map((f) => (
              <span key={f.id} className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-cream-50 sm:h-10 sm:w-10">
                <Image src={f.image} alt="" fill sizes="40px" className="object-cover" />
              </span>
            ))}
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-ink-900">Fresh at 7 AM</span>
            <span className="text-xs text-ink-500">New batches every day</span>
          </span>
        </motion.div>
      </motion.div>

    </motion.div>
  );
}
