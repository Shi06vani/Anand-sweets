import { CalendarCheck, Check, ChefHat, ClipboardList, MessageCircle, Phone, Sparkles, Truck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/Badges";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Faq } from "@/components/ui/Faq";
import { InputField, SelectField, TextareaField } from "@/components/ui/Field";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppForm } from "@/components/ui/WhatsAppForm";
import { photos } from "@/data/menu";
import { site, telHref } from "@/data/site";
import { cn, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Catering & Bulk Orders",
  description: `Vegetarian catering and bulk sweet orders from ${site.name} ${site.branch} — weddings, poojas, office events and house parties across Bengaluru.`,
};

const services = [
  { title: "Weddings & Functions", text: "Sweets by the kilo, live jalebi counters and full meals for your big day.", image: photos.feastSpread },
  { title: "Poojas & Festivals", text: "Prasad laddus, satvik meals and festive thaals, made with care.", image: photos.laddooTray },
  { title: "Office & Corporate", text: "Snack boxes, team lunches and Diwali celebrations for your workplace.", image: photos.thalis },
  { title: "Home Parties", text: "Birthdays, kitty parties and get-togethers — chaat, snacks & sweets.", image: photos.serving },
];

const steps = [
  { Icon: MessageCircle, title: "Tell us about your event", text: "Date, guest count and what you’d like — on WhatsApp or the form below." },
  { Icon: ClipboardList, title: "Get a menu & quote", text: "We suggest a menu that fits your budget, usually the same day." },
  { Icon: CalendarCheck, title: "Confirm your order", text: "Lock the date with a small advance. Changes are welcome until 48 hours before." },
  { Icon: Truck, title: "We cook & deliver", text: "Freshly prepared and delivered on time, neatly packed and ready to serve." },
];

// TODO: confirm package contents and per-person prices with the shop.
const packages = [
  {
    name: "Snack Box",
    price: 120,
    for: "Office meetings, poojas, school events",
    items: ["1 sweet", "2 savouries (samosa, kachori…)", "Chutney & napkin", "Packed individually"],
  },
  {
    name: "Mini Meal",
    price: 220,
    for: "Team lunches & small functions",
    items: ["1 sweet + 1 starter", "Paneer or seasonal sabzi", "Dal, rice & rotis", "Salad & pickle"],
    popular: true,
  },
  {
    name: "Festive Feast",
    price: 380,
    for: "Weddings, receptions & big celebrations",
    items: ["2 sweets incl. live jalebi", "Chaat counter", "2 sabzis, dal, pulao & breads", "Raita, papad & dessert"],
  },
];

const cateringFaq = [
  { q: "What is the minimum order for catering?", a: "We cater from 20 guests upwards. For smaller groups, our snack boxes and bulk sweet orders are a great option." },
  { q: "How far in advance should I book?", a: "Ideally 3–5 days ahead, and 2–3 weeks for weddings or during the festive season. We’ll always try to help with last-minute orders too." },
  { q: "Is everything vegetarian?", a: "Yes — our kitchen is 100% vegetarian. We can also prepare Jain and no-onion-no-garlic food on request." },
  { q: "Do you provide serving staff and setup?", a: "For larger events we can arrange serving staff and live counters. Let us know your requirements while booking." },
  { q: "Which areas do you deliver to?", a: "We deliver across Bengaluru. Delivery charges depend on distance and order size and are included in your quote." },
];

const eventTypes = ["Wedding / Reception", "Pooja / Festival", "Office / Corporate", "Birthday / House party", "Other"] as const;

export default function CateringPage() {
  return (
    <>
      <PageHero
        crumb="Catering"
        eyebrow="Catering & bulk orders"
        title={
          <>
            Feeding your <span className="text-saffron-400 italic">celebrations.</span>
          </>
        }
        description="From 20 guests to 2,000 — pure vegetarian food and fresh sweets for weddings, poojas, offices and parties across Bengaluru."
        image={photos.buffet}
        imageAlt="A catering buffet with silver chafing dishes"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#quote" variant="saffron" size="lg" shine>
            <Sparkles className="h-5 w-5" /> Get a free quote
          </Button>
          <Button href={telHref} variant="light" size="lg">
            <Phone className="h-5 w-5" /> Call {site.phone}
          </Button>
        </div>
      </PageHero>

      {/* Services */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we cater"
            title={<>Every occasion, <span className="text-maroon-700 italic">one kitchen</span></>}
            description="The same recipes our customers love at the counter — scaled up for your guests."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <article className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lg shadow-maroon-900/10">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl font-bold text-cream-50">{s.title}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm text-cream-200/85 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 max-lg:max-h-24 max-lg:opacity-100">
                      {s.text}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-maroon-800 py-20 text-cream-50 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-maroon-500),transparent_60%)] opacity-60" />
        <Container className="relative">
          <SectionHeading tone="light" eyebrow="How it works" title={<>Booking is as easy as <span className="text-gold-300 italic">1-2-3-4</span></>} />
          <Stagger className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div className="absolute top-8 right-[12%] left-[12%] hidden h-px border-t-2 border-dashed border-gold-500/40 lg:block" />
            {steps.map(({ Icon, title, text }, i) => (
              <StaggerItem key={title} className="relative text-center">
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink-900 shadow-xl shadow-black/20 ring-8 ring-maroon-800">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-cream-50 text-xs font-bold text-maroon-700">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-cream-200/75">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Packages */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Popular packages"
            title={<>Simple per-person <span className="text-maroon-700 italic">pricing</span></>}
            description="A starting point — every menu can be customised to your taste, guest list and budget."
          />
          <Stagger className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
            {packages.map((p) => (
              <StaggerItem key={p.name} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2",
                    p.popular
                      ? "bg-maroon-700 text-cream-50 shadow-2xl shadow-maroon-900/30 lg:-my-4 lg:py-12"
                      : "bg-cream-50 ring-1 ring-cream-300 hover:shadow-xl hover:shadow-maroon-900/10",
                  )}
                >
                  {p.popular && <Badge tone="gold" className="absolute top-6 right-6">Most popular</Badge>}
                  <ChefHat className={cn("h-9 w-9", p.popular ? "text-gold-300" : "text-saffron-500")} />
                  <h3 className="mt-5 font-display text-2xl font-bold">{p.name}</h3>
                  <p className={cn("mt-1 text-sm", p.popular ? "text-cream-200/75" : "text-ink-500")}>{p.for}</p>
                  <p className="mt-6">
                    <span className="text-sm">from </span>
                    <span className={cn("text-4xl font-extrabold", !p.popular && "text-maroon-700")}>{formatPrice(p.price)}</span>
                    <span className={cn("text-sm", p.popular ? "text-cream-200/75" : "text-ink-500")}> / person</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Check className={cn("mt-0.5 h-4 w-4 shrink-0", p.popular ? "text-gold-300" : "text-leaf-500")} strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button href="#quote" variant={p.popular ? "saffron" : "outline"} className="mt-8 w-full">
                    Choose {p.name}
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-center text-xs text-ink-500">Prices are indicative and may vary with menu, quantity and date.</p>
        </Container>
      </section>

      {/* Gallery */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
            {[
              { src: photos.buffet, alt: "Buffet setup", cls: "col-span-2 row-span-2" },
              { src: photos.serving, alt: "Serving a curry at an event", cls: "" },
              { src: photos.thalis, alt: "Vegetarian thalis", cls: "" },
              { src: photos.cooks, alt: "Cooks preparing food in bulk", cls: "col-span-2" },
            ].map((g, i) => (
              <Reveal key={g.alt} delay={i * 0.08} zoom className={cn("group relative overflow-hidden rounded-[1.75rem]", g.cls)}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Quote form */}
      <section id="quote" className="scroll-mt-20 bg-cream-200/60 py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Free quote"
              title={<>Tell us about <span className="text-maroon-700 italic">your event</span></>}
              description="Fill in a few details and send them to us on WhatsApp. We’ll reply with a suggested menu and a price."
            />
            <Reveal className="mt-8 space-y-4">
              <a href={telHref} className="flex items-center gap-4 rounded-2xl bg-cream-50 p-5 ring-1 ring-cream-300 transition hover:ring-saffron-400">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-700 text-cream-50">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-ink-500">Prefer to talk?</span>
                  <span className="font-bold text-ink-900">{site.phone}</span>
                </span>
              </a>
              <p className="text-sm text-ink-500">Tip: share your venue location and serving time — it helps us plan delivery.</p>
            </Reveal>
          </div>

          <Reveal direction="left">
            <div className="rounded-[2rem] bg-cream-50 p-6 shadow-xl shadow-maroon-900/5 ring-1 ring-cream-300 sm:p-10">
              <WhatsAppForm
                subject="Catering enquiry"
                labels={{ name: "Name", phone: "Phone", event: "Event", date: "Date", guests: "Guests", location: "Location", details: "Details" }}
                submitLabel="Get my quote"
              >
                <InputField label="Your name" name="name" required autoComplete="name" />
                <InputField label="Phone number" name="phone" type="tel" required autoComplete="tel" pattern="[0-9+ ]{10,15}" />
                <SelectField label="Type of event" name="event" options={eventTypes} />
                <InputField label="Event date" name="date" type="date" required />
                <InputField label="Number of guests" name="guests" type="number" min={10} required />
                <InputField label="Area / venue" name="location" placeholder="e.g. HSR Layout" />
                <TextareaField
                  label="What would you like?"
                  name="details"
                  wrapperClassName="sm:col-span-2"
                  placeholder="Sweets, snacks, full meal, live counters, Jain food…"
                />
              </WhatsAppForm>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Good to know" title="Catering FAQs" />
          <Reveal className="mt-12">
            <Faq items={cateringFaq} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
