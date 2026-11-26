import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Mandala } from "@/components/ui/Mandala";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { fullAddress, navLinks, site, telHref, whatsappHref } from "@/data/site";
import { formatTime } from "@/lib/hours";

export function Footer() {
  const hours = site.hours[0];
  const socials = [
    { label: "Instagram", href: site.links.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: site.links.facebook, Icon: FacebookIcon },
    { label: "WhatsApp", href: whatsappHref(), Icon: WhatsAppIcon },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-cream-200">
      <Mandala className="absolute -right-40 -bottom-40 h-[520px] w-[520px] animate-spin-slow text-gold-500/10" />

      <Container className="relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1fr]">
        <div className="space-y-5">
          <Logo tone="light" />
          <p className="max-w-xs text-sm leading-relaxed text-cream-200/70">{site.description}</p>
          <div className="flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200/20 transition hover:-translate-y-1 hover:border-saffron-400 hover:bg-saffron-500 hover:text-ink-900"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-display text-lg font-semibold text-cream-50">Explore</h3>
          <ul className="space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block transition hover:translate-x-1 hover:text-saffron-400">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/my-orders" className="inline-block transition hover:translate-x-1 hover:text-saffron-400">
                My Orders & Favourites
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-display text-lg font-semibold text-cream-50">Visit Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-400" />
              <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="hover:text-saffron-400">
                {fullAddress}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-saffron-400" />
              <a href={telHref} className="hover:text-saffron-400">{site.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-saffron-400" />
              <a href={`mailto:${site.email}`} className="hover:text-saffron-400">{site.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-display text-lg font-semibold text-cream-50">Opening Hours</h3>
          <p className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-saffron-400" />
            All days · {formatTime(hours.open)} – {formatTime(hours.close)}
          </p>
          <p className="mt-4 text-sm text-cream-200/60">Fresh sweets from 7 AM. Hot jalebis every evening!</p>
        </div>
      </Container>

      <div className="relative border-t border-cream-200/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream-200/50 sm:flex-row">
          <p>© {site.name} {site.branch}. All rights reserved.</p>
          <p>100% Vegetarian · Made with love in Bengaluru</p>
        </Container>
      </div>
    </footer>
  );
}
