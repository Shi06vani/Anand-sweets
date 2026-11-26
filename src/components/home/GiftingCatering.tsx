"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, Building2, CalendarDays, Gift, PartyPopper, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { photos } from "@/data/menu";
import { whatsappHref } from "@/data/site";

/** The two big revenue drivers for a sweet shop: gift boxes and bulk orders. */
export function GiftingCatering() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Celebrate with us"
          title={<>Gift boxes & bulk orders for <span className="text-maroon-700 italic">every occasion</span></>}
          description="Diwali, weddings, housewarmings, poojas or office celebrations — we make it beautiful and deliver on time."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Gifting */}
          <Reveal direction="right" className="lg:col-span-3">
            <div className="group relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-maroon-700 to-maroon-900 p-8 text-cream-50 sm:p-10">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-saffron-500/20 blur-3xl transition-transform duration-1000 group-hover:scale-125" />
              <div className="relative grid items-center gap-8 sm:grid-cols-[1fr_auto]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/20 px-3 py-1 text-xs font-bold tracking-wider text-gold-300 uppercase">
                    <Gift className="h-3.5 w-3.5" /> Festive gifting
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Handpicked mithai gift boxes</h3>
                  <p className="mt-3 max-w-md text-cream-200/80">
                    Choose from ready assortments or build your own box. Custom branding available for corporate orders.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2 text-sm">
                    {["Diwali", "Weddings", "Raksha Bandhan", "Corporate", "Return gifts"].map((t) => (
                      <li key={t} className="rounded-full border border-cream-50/20 px-3 py-1 text-cream-100/90">{t}</li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href="/gifting" variant="saffron" shine>
                      View gift boxes <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button href={whatsappHref("Hi! I'd like to enquire about festive gift boxes.")} variant="light">
                      <WhatsAppIcon className="h-4 w-4" /> Enquire
                    </Button>
                  </div>
                </div>
                <motion.div
                  className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56"
                  animate={{ y: [0, -12, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 ring-4 ring-gold-400/60">
                    <Image src={photos.giftBox} alt="A gift box tied with a ribbon" fill sizes="224px" className="object-cover" />
                  </div>
                  <div className="absolute -bottom-5 -left-5 h-24 w-24 overflow-hidden rounded-2xl shadow-xl ring-4 ring-maroon-800">
                    <Image src={photos.laddooTray} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>

          {/* Catering */}
          <Reveal direction="left" className="lg:col-span-2">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-saffron-100 p-8 ring-1 ring-saffron-300/50 sm:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cream-50 px-3 py-1 text-xs font-bold tracking-wider text-saffron-600 uppercase">
                <PartyPopper className="h-3.5 w-3.5" /> Bulk orders & catering
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold text-ink-900">Hosting a crowd?</h3>
              <p className="mt-3 text-ink-500">Sweets, snacks and full vegetarian meals for 20 to 2,000 guests.</p>

              <ul className="mt-6 space-y-3">
                {[
                  { Icon: Users, text: "Poojas, birthdays & family functions" },
                  { Icon: Building2, text: "Office events & corporate lunches" },
                  { Icon: CalendarDays, text: "Order 2–3 days ahead for large quantities" },
                ].map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-ink-700">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream-50 text-maroon-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Button href="/catering" className="w-full sm:w-auto">
                  Plan your order <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
