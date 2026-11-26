import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { VisitUs } from "@/components/home/VisitUs";
import { Container } from "@/components/ui/Container";
import { Faq } from "@/components/ui/Faq";
import { InputField, SelectField, TextareaField } from "@/components/ui/Field";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { WhatsAppForm } from "@/components/ui/WhatsAppForm";
import { photos } from "@/data/menu";
import { fullAddress, site, telHref, whatsappHref } from "@/data/site";
import { formatTime } from "@/lib/hours";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call, WhatsApp or visit ${site.name} ${site.branch} at ${fullAddress}.`,
};

const topics = ["Place an order", "Gift boxes", "Catering / bulk order", "Feedback", "Other"] as const;

const contactFaq = [
  { q: "Can I reserve sweets and pick them up later?", a: "Yes! Send us your order on WhatsApp with a pickup time and we’ll keep it packed and ready at the counter." },
  { q: "Is parking available?", a: "Street parking is available on 60 Feet Road and the nearby lanes of 5th Block, Koramangala." },
  { q: "Do you accept UPI and cards?", a: "We accept cash, all major UPI apps and debit/credit cards at the shop." },
];

type Channel = { Icon: (p: { className?: string }) => ReactNode; title: string; value: string; href: string; accent: string; external?: boolean };

const channels: Channel[] = [
  { Icon: Phone, title: "Call us", value: site.phone, href: telHref, accent: "bg-maroon-700 text-cream-50" },
  { Icon: WhatsAppIcon, title: "WhatsApp", value: "Chat for orders", href: whatsappHref(), accent: "bg-[#25D366] text-white", external: true },
  { Icon: Mail, title: "Email", value: site.email, href: `mailto:${site.email}`, accent: "bg-saffron-500 text-ink-900" },
  { Icon: MapPin, title: "Visit", value: "5th Block, Koramangala", href: site.links.directions, accent: "bg-gold-500 text-ink-900", external: true },
];

export default function ContactPage() {
  const hours = site.hours[1];

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get in touch"
        title={
          <>
            We’d love to <span className="text-saffron-400 italic">hear from you.</span>
          </>
        }
        description="Questions, orders, feedback or a big celebration to plan — call, message or drop by the shop."
        image={photos.sweetShop}
        imageAlt="Colourful Indian sweets on display"
      />

      {/* Quick channels */}
      <section className="py-12 sm:py-16">
        <Container>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ Icon, title, value, href, accent, external }) => (
              <StaggerItem key={title}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-[1.75rem] bg-cream-50 p-5 ring-1 ring-cream-300 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-maroon-900/10"
                >
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${accent}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-ink-500">{title}</span>
                    <span className="block truncate font-bold text-ink-900">{value}</span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Form + info */}
      <section className="pb-8">
        <Container className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Reveal direction="right">
            <div className="rounded-[2rem] bg-cream-50 p-6 shadow-xl shadow-maroon-900/5 ring-1 ring-cream-300 sm:p-10">
              <h2 className="font-display text-3xl font-bold text-ink-900">Send us a message</h2>
              <p className="mt-2 mb-8 text-ink-500">Fill this in and it opens WhatsApp with your message ready to send.</p>
              <WhatsAppForm
                subject="Website enquiry"
                labels={{ name: "Name", phone: "Phone", topic: "Topic", message: "Message" }}
                submitLabel="Send message"
              >
                <InputField label="Your name" name="name" required autoComplete="name" />
                <InputField label="Phone number" name="phone" type="tel" required autoComplete="tel" pattern="[0-9+ ]{10,15}" />
                <SelectField label="What’s it about?" name="topic" options={topics} wrapperClassName="sm:col-span-2" />
                <TextareaField label="Message" name="message" required wrapperClassName="sm:col-span-2" placeholder="How can we help?" />
              </WhatsAppForm>
            </div>
          </Reveal>

          <Reveal direction="left" className="space-y-6">
            <div className="rounded-[2rem] bg-maroon-800 p-8 text-cream-50">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-bold">Shop hours</h3>
                <OpenStatus className="bg-cream-50" />
              </div>
              <p className="mt-5 flex items-center gap-3 text-cream-200/85">
                <Clock className="h-5 w-5 text-gold-300" />
                Open all 7 days
              </p>
              <p className="mt-2 font-display text-3xl font-bold text-gold-300">
                {formatTime(hours.open)} – {formatTime(hours.close)}
              </p>
              <p className="mt-4 text-sm text-cream-200/70">Fresh sweets from 7 AM. Hot jalebis & samosas every evening.</p>
            </div>

            <div className="rounded-[2rem] bg-cream-50 p-8 ring-1 ring-cream-300">
              <h3 className="font-display text-2xl font-bold text-ink-900">Find us</h3>
              <p className="mt-3 flex gap-3 leading-relaxed text-ink-500">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-saffron-600" />
                {fullAddress}
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  { label: "Instagram", href: site.links.instagram, Icon: InstagramIcon },
                  { label: "Facebook", href: site.links.facebook, Icon: FacebookIcon },
                ].map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron-100 text-maroon-700 transition hover:-translate-y-1 hover:bg-maroon-700 hover:text-cream-50"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <VisitUs />

      <section className="pb-20 sm:pb-28">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Quick answers" title="Before you visit" />
          <Reveal className="mt-12">
            <Faq items={contactFaq} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
