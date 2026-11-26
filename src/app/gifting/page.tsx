import {
  ArrowDown,
  Building2,
  Check,
  FileText,
  Gift,
  Heart,
  MessageSquareText,
  Package,
  Palette,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Badge } from "@/components/ui/Badges";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Faq } from "@/components/ui/Faq";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { giftBoxes, giftingFaq, occasions } from "@/data/gifting";
import { photos } from "@/data/menu";
import { site, whatsappHref } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gift Boxes",
  description: `Festive, wedding and corporate mithai gift boxes from ${site.name} ${site.branch}. Custom branding and bulk orders across Bengaluru.`,
};

const buildSteps = [
  { Icon: Package, title: "Pick a box size", text: "250 g, 500 g, 1 kg or a festive thaal — whatever suits your guest list." },
  { Icon: Heart, title: "Choose the sweets", text: "Mix your favourites: kaju katli, laddus, barfis, dry-fruit rolls and more." },
  { Icon: MessageSquareText, title: "Add a personal touch", text: "Greeting card, ribbon colour, name or logo printing — we’ll make it yours." },
];

const corporatePerks = [
  { Icon: Palette, text: "Your logo on sleeves & cards" },
  { Icon: Building2, text: "Special pricing from 25 boxes" },
  { Icon: Truck, text: "Delivery to offices across Bengaluru" },
  { Icon: FileText, text: "GST invoice for your accounts" },
];

export default function GiftingPage() {
  return (
    <>
      <PageHero
        crumb="Gifting"
        eyebrow="Festive & corporate gifting"
        title={
          <>
            Gifts that say it <span className="text-saffron-400 italic">sweetly.</span>
          </>
        }
        description="Handpicked mithai in beautiful boxes for Diwali, weddings, Rakhi and every celebration in between. Custom branding available for companies."
        image={photos.diyas}
        imageAlt="Lit diyas arranged for Diwali celebrations"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#boxes" variant="saffron" size="lg" shine>
            <Gift className="h-5 w-5" /> View gift boxes
          </Button>
          <Button href={whatsappHref("Hi! I'd like to enquire about gift boxes.")} variant="light" size="lg">
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> Enquire now
          </Button>
        </div>
      </PageHero>

      {/* Occasions marquee */}
      <section className="overflow-hidden py-6" aria-label="Occasions we cater to">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track flex w-max animate-marquee gap-3 pr-3">
            {[...occasions, ...occasions].map((o, i) => (
              <span
                key={i}
                aria-hidden={i >= occasions.length}
                className="flex items-center gap-2 rounded-full bg-cream-50 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-ink-700 ring-1 ring-cream-300"
              >
                <span className="text-saffron-500">✦</span> {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gift boxes */}
      <section id="boxes" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our gift boxes"
            title={<>Thoughtfully packed, <span className="text-maroon-700 italic">freshly filled</span></>}
            description="Every box is packed on the day of pickup with that morning’s sweets. Prices are a starting point — tell us your budget and we’ll suggest the perfect box."
          />

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {giftBoxes.map((box) => (
              <StaggerItem key={box.id} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-cream-50 ring-1 ring-cream-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgba(95,23,33,0.4)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={box.image}
                      alt={box.name}
                      fill
                      sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
                    {"tag" in box && (
                      <Badge tone={box.tag === "Bestseller" ? "maroon" : "gold"} className="absolute top-4 left-4 shadow-lg">
                        {box.tag}
                      </Badge>
                    )}
                    <span className="absolute bottom-4 left-4 rounded-full bg-ink-900/60 px-3 py-1 text-xs font-semibold text-cream-50 backdrop-blur">
                      {box.size}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl font-bold text-ink-900">{box.name}</h3>
                    <ul className="mt-4 flex-1 space-y-2">
                      {box.contents.map((c) => (
                        <li key={c} className="flex items-center gap-2.5 text-sm text-ink-500">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-saffron-600">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-dashed border-cream-300 pt-5">
                      <p className="leading-tight">
                        <span className="block text-xs text-ink-500">Starting from</span>
                        <span className="text-2xl font-extrabold text-maroon-700">{formatPrice(box.priceFrom)}</span>
                      </p>
                      <Button href={whatsappHref(`Hi! I'm interested in the "${box.name}". Please share options and prices.`)} variant="whatsapp" size="sm">
                        <WhatsAppIcon className="h-4 w-4" /> Enquire
                      </Button>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Build your own */}
      <section className="relative overflow-hidden bg-cream-200/60 py-20 sm:py-28">
        <div className="bg-dots absolute inset-0 opacity-40" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-maroon-900/20 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image src={photos.giftBoxes} alt="Gift boxes tied with ribbon" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-2 -bottom-6 w-44 overflow-hidden rounded-3xl shadow-2xl ring-8 ring-cream-100 sm:right-6 sm:w-56">
              <div className="relative aspect-square">
                <Image src={photos.laddooTray} alt="A tray of fresh laddus" fill sizes="224px" className="object-cover" />
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Build your own box"
              title={<>Your box, <span className="text-maroon-700 italic">your way</span></>}
              description="Can’t decide? Create a custom box in three easy steps and we’ll have it ready for you."
            />
            <ol className="mt-10 space-y-5">
              {buildSteps.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 0.12} direction="left">
                  <li className="flex gap-5 rounded-3xl bg-cream-50 p-5 ring-1 ring-cream-300 transition hover:ring-saffron-400">
                    <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-maroon-700 text-cream-50">
                      <Icon className="h-6 w-6" />
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-saffron-500 text-xs font-bold text-ink-900">
                        {i + 1}
                      </span>
                    </span>
                    <span>
                      <span className="block font-display text-xl font-bold text-ink-900">{title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-500">{text}</span>
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-8">
              <Button href={whatsappHref("Hi! I'd like to build a custom gift box.")} size="lg" shine>
                <WhatsAppIcon className="h-5 w-5" /> Build my box
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Corporate */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal zoom>
            <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink-900">
              <Image src={photos.giftBox} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-40" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-900/30" />
              <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
                <div>
                  <Badge tone="gold">For companies</Badge>
                  <h2 className="mt-5 font-display text-3xl font-bold text-cream-50 sm:text-5xl">
                    Corporate gifting, <span className="text-gold-300 italic">handled.</span>
                  </h2>
                  <p className="mt-5 max-w-md text-cream-200/80">
                    Diwali gifts for 25 or 2,500 — branded, packed and delivered on time, so your team and clients feel valued.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={whatsappHref("Hi! I'd like a quote for corporate gift boxes.")} variant="saffron" size="lg" shine>
                      Get a corporate quote
                    </Button>
                    <Button href="#faq" variant="light" size="lg">
                      Read FAQs <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Stagger className="grid content-center gap-4 sm:grid-cols-2">
                  {corporatePerks.map(({ Icon, text }) => (
                    <StaggerItem key={text}>
                      <div className="flex h-full items-center gap-4 rounded-2xl bg-cream-50/10 p-5 ring-1 ring-cream-50/15 backdrop-blur transition hover:bg-cream-50/15">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500 text-ink-900">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-semibold text-cream-50">{text}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 pb-20 sm:pb-28">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Good to know" title="Gifting questions, answered" />
          <Reveal className="mt-12">
            <Faq items={giftingFaq} />
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
