import { ArrowRight, Clock, Leaf, ShoppingBag, Truck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { photos } from "@/data/menu";
import { site, whatsappHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Menu",
  description: `Explore the full menu at ${site.name} ${site.branch} — mithai, namkeen, chaat, thalis and chai. Order on WhatsApp, Swiggy or Zomato.`,
};

const perks = [
  { Icon: Leaf, label: "100% vegetarian kitchen" },
  { Icon: Clock, label: "Sweets made fresh every morning" },
  { Icon: Truck, label: "Delivery via Swiggy & Zomato" },
];

export default function MenuPage() {
  return (
    <>
      <PageHero
        crumb="Menu"
        eyebrow="Our menu"
        title={
          <>
            Taste the <span className="text-saffron-400 italic">tradition.</span>
          </>
        }
        description="Every sweet, snack and meal we make — with today’s prices. Find a favourite and order it straight on WhatsApp."
        image={photos.sweetCounter}
        imageAlt="A glass counter filled with fresh Indian sweets"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/#order" variant="saffron" size="lg" shine>
            <ShoppingBag className="h-5 w-5" /> Order Online
          </Button>
          <Button href={whatsappHref()} variant="light" size="lg">
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp Order
          </Button>
        </div>
      </PageHero>

      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pb-6 text-sm font-semibold text-ink-700">
          {perks.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-saffron-600" /> {label}
            </li>
          ))}
        </ul>
      </Container>

      <MenuBrowser />

      <Container>
        <p className="text-center text-xs text-ink-500">
          Prices are per portion/weight shown and may change for festive specials. Please tell us about any allergies when ordering.
        </p>
      </Container>

      {/* Bulk order CTA */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal zoom>
            <div className="grid overflow-hidden rounded-[2.5rem] bg-maroon-800 lg:grid-cols-2">
              <div className="relative min-h-[280px] lg:min-h-full">
                <Image
                  src={photos.jalebiStall}
                  alt="Fresh golden jalebis stacked at the sweet counter"
                  fill
                  sizes="(min-width: 1024px) 620px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-800/60 to-transparent lg:bg-gradient-to-l" />
              </div>
              <div className="p-8 text-cream-50 sm:p-12 lg:p-16">
                <p className="text-xs font-bold tracking-[0.3em] text-gold-300 uppercase">Parties & festivals</p>
                <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Ordering for a crowd?</h2>
                <p className="mt-4 max-w-md text-cream-200/80">
                  Kilos of sweets for a wedding, snacks for an office party or meals for a pooja — tell us the date and
                  headcount and we’ll take care of the rest.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/catering" variant="saffron" shine>
                    Bulk orders <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href={whatsappHref("Hi! I'd like to place a bulk order.")} variant="light">
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Chat with us
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
