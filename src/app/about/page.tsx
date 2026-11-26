import { ArrowRight, Droplets, Flame, HandHeart, Leaf, ShieldCheck, Sparkles, Sun, Wheat } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos, unsplash } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: `The story of ${site.name} ${site.branch} — traditional Indian sweets, pure vegetarian food and family recipes, served in Bengaluru since ${site.since}.`,
};

const values = [
  { Icon: Droplets, title: "Pure ghee & real ingredients", text: "Genuine ghee, whole cashews, saffron and cardamom — never cheap substitutes." },
  { Icon: Sun, title: "Fresh every morning", text: "Small batches made daily, so what you buy today was made today." },
  { Icon: ShieldCheck, title: "Clean, careful kitchen", text: "Hygiene comes first, from our cooks’ caps to the way every box is sealed." },
  { Icon: Leaf, title: "100% vegetarian", text: "A pure vegetarian kitchen, with Jain options available on request." },
];

const process = [
  { Icon: Wheat, title: "Sourced with care", text: "We pick our khoya, nuts and flour from suppliers we’ve trusted for years.", image: unsplash("1695568181558-034b7d3e49eb") },
  { Icon: Flame, title: "Slow-cooked in ghee", text: "Our halwais stir every batch by hand over a steady flame — no shortcuts.", image: photos.kadai },
  { Icon: HandHeart, title: "Shaped by hand", text: "Laddus rolled, katlis cut and barfis set by experienced hands.", image: photos.laddooTray },
  { Icon: Sparkles, title: "Packed fresh", text: "Straight from the kitchen to the counter — and into your gift box.", image: photos.festiveSweets },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="Our Story"
        eyebrow={`Since ${site.since}`}
        title={
          <>
            Three decades of <span className="text-saffron-400 italic">sweetness.</span>
          </>
        }
        description="What began as a small sweet shop has become a part of Bengaluru’s celebrations — one box of mithai at a time."
        image={photos.halwaiKitchen}
        imageAlt="A traditional sweet kitchen with large kadais"
      />

      {/* Story */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right" className="relative mx-auto w-full max-w-xl">
            <div className="grid grid-cols-5 gap-4">
              <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl shadow-maroon-900/20">
                <Image src={photos.sweetShop} alt="Colourful sweets on display in the shop" fill sizes="(min-width: 1024px) 360px, 60vw" className="object-cover" />
              </div>
              <div className="col-span-2 flex flex-col gap-4 pt-12">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] shadow-xl">
                  <Image src={photos.kadai} alt="Gulab jamuns frying in a kadai" fill sizes="240px" className="object-cover" />
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-xl">
                  <Image src={photos.sweetVendor} alt="Sweets being served at the counter" fill sizes="240px" className="object-cover" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 left-6 rounded-3xl bg-maroon-700 px-6 py-5 text-cream-50 shadow-2xl sm:left-10">
              <p className="font-display text-4xl font-bold text-gold-300">30+</p>
              <p className="text-sm text-cream-200/80">years of family recipes</p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title={<>Made the way <span className="text-maroon-700 italic">grandma did</span></>}
            />
            <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-ink-500">
              <p>
                {site.name} started with a simple belief: a sweet should taste exactly like it did at home during the festivals —
                rich, fresh and made with love. That belief still guides every batch we make.
              </p>
              <p>
                Today, families across Koramangala and beyond walk into our shop for their Diwali boxes, wedding sweets, evening
                samosas and a hot cup of chai. Many of them have been coming for generations.
              </p>
              <p className="font-display text-xl text-maroon-700 italic">
                “Our recipes haven’t changed. Only the queue has grown longer.”
              </p>
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-3">
              <Button href="/menu" shine>
                Explore our menu <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="outline">
                Visit the shop
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-cream-200/60 py-20 sm:py-28">
        <div className="bg-dots absolute inset-0 opacity-40" />
        <Container className="relative">
          <SectionHeading
            eyebrow="What we stand for"
            title={<>Our promise in <span className="text-maroon-700 italic">every bite</span></>}
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }) => (
              <StaggerItem key={title} className="h-full">
                <div className="group h-full rounded-[2rem] bg-cream-50 p-7 ring-1 ring-cream-300 transition-all duration-500 hover:-translate-y-2 hover:bg-maroon-700 hover:shadow-2xl hover:shadow-maroon-900/25">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-100 text-maroon-700 transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold-500 group-hover:text-ink-900">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-ink-900 transition-colors group-hover:text-cream-50">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500 transition-colors group-hover:text-cream-200/80">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="From our kitchen"
            title={<>How our sweets are <span className="text-maroon-700 italic">made</span></>}
            description="Four simple steps we’ve followed for over three decades."
          />
          <div className="mt-16 space-y-6 lg:space-y-0">
            {process.map(({ Icon, title, text, image }, i) => (
              <Reveal key={title} direction={i % 2 ? "left" : "right"}>
                <div className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="group relative aspect-[16/10] overflow-hidden rounded-[2rem] lg:my-6">
                    <Image src={image} alt={title} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  </div>
                  <div className="flex gap-5 lg:block">
                    <span className="font-display text-6xl leading-none font-bold text-saffron-300 lg:text-8xl">0{i + 1}</span>
                    <div>
                      <h3 className="flex items-center gap-3 font-display text-2xl font-bold text-ink-900 lg:mt-4 lg:text-3xl">
                        <Icon className="h-6 w-6 text-saffron-600" /> {title}
                      </h3>
                      <p className="mt-3 max-w-md text-lg leading-relaxed text-ink-500">{text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Testimonials />
      <div className="pt-20 sm:pt-28">
        <CtaBanner />
      </div>
    </>
  );
}
