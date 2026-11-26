import { ArrowUpRight, Phone, Store } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { site, telHref, whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";

const options = [
  {
    title: "WhatsApp Order",
    text: "Send your list, we’ll confirm and keep it packed for pickup.",
    cta: "Chat with us",
    href: whatsappHref(),
    icon: <WhatsAppIcon className="h-7 w-7" />,
    accent: "bg-[#25D366] text-white",
    featured: true,
  },
  {
    title: "Swiggy",
    text: "Get sweets & meals delivered hot to your doorstep.",
    cta: "Order on Swiggy",
    href: site.links.swiggy,
    icon: <span className="text-2xl font-black">S</span>,
    accent: "bg-[#FC8019] text-white",
  },
  {
    title: "Zomato",
    text: "Browse the full menu and order in a few taps.",
    cta: "Order on Zomato",
    href: site.links.zomato,
    icon: <span className="text-2xl font-black">Z</span>,
    accent: "bg-[#E23744] text-white",
  },
  {
    title: "Call for Pickup",
    text: "Call ahead and skip the queue at the counter.",
    cta: site.phone,
    href: telHref,
    icon: <Phone className="h-7 w-7" />,
    accent: "bg-maroon-700 text-cream-50",
  },
];

/** "Order your way" — every ordering channel in one place. Anchor: #order */
export function OrderOptions() {
  return (
    <section id="order" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Order your way"
          title={<>Craving it now? <span className="text-maroon-700 italic">We’ve got you.</span></>}
          description="Order online, message us on WhatsApp, or drop by the shop — whatever is easiest for you."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {options.map((o) => {
            const external = o.href.startsWith("http");
            return (
              <StaggerItem key={o.title} className="h-full">
                <a
                  href={o.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={cn(
                    "group relative flex h-full flex-col rounded-[1.75rem] p-6 ring-1 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
                    o.featured
                      ? "bg-ink-900 text-cream-50 ring-ink-900 hover:shadow-ink-900/30"
                      : "bg-cream-50 text-ink-900 ring-cream-300 hover:shadow-maroon-900/10",
                  )}
                >
                  {o.featured && (
                    <span className="absolute top-5 right-5 rounded-full bg-gold-500 px-2.5 py-1 text-[10px] font-bold tracking-wider text-ink-900 uppercase">
                      No extra charges
                    </span>
                  )}
                  <span className={cn("flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6", o.accent)}>
                    {o.icon}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold">{o.title}</h3>
                  <p className={cn("mt-2 flex-1 text-sm leading-relaxed", o.featured ? "text-cream-200/70" : "text-ink-500")}>{o.text}</p>
                  <span className={cn("mt-6 inline-flex items-center gap-1.5 text-sm font-bold", o.featured ? "text-gold-300" : "text-maroon-700")}>
                    {o.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-ink-500">
          <Store className="h-4 w-4 text-saffron-600" />
          Prefer to see it all first? Walk in — our counters are full of fresh sweets every day.
        </p>
      </Container>
    </section>
  );
}
