"use client";

import { motion } from "motion/react";
import { ChevronRight, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image: string;
  imageAlt: string;
  /** Current page name shown in the breadcrumb */
  crumb: string;
  children?: ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Big photo banner used at the top of every inner page. */
export function PageHero({ eyebrow, title, description, image, imageAlt, crumb, children }: PageHeroProps) {
  return (
    <section className="pt-2 pb-6">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink-900">
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease }}
          >
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1280px) 1240px, 100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/95 via-ink-900/70 to-ink-900/20" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />

          <div className="px-5 py-16 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
            <motion.nav
              aria-label="Breadcrumb"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-8 flex items-center gap-2 text-sm text-cream-200/70"
            >
              <Link href="/" className="flex items-center gap-1.5 transition hover:text-saffron-400">
                <Home className="h-4 w-4" /> Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-semibold text-cream-50">{crumb}</span>
            </motion.nav>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mb-4 inline-flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-gold-300 uppercase"
            >
              <span className="h-px w-10 bg-gold-300" />
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="max-w-3xl font-display text-4xl leading-[1.05] font-bold text-cream-50 sm:text-6xl lg:text-7xl"
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease }}
                className="mt-6 max-w-xl text-base leading-relaxed text-cream-200/85 sm:text-lg"
              >
                {description}
              </motion.p>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease }}
                className="mt-9"
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
