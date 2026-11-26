import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Mandala } from "@/components/ui/Mandala";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { whatsappHref } from "@/data/site";

export function CtaBanner() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <Reveal zoom>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-saffron-500 via-saffron-400 to-gold-400 px-6 py-14 text-center sm:px-12 sm:py-20">
            <Mandala className="absolute -top-24 -left-24 h-72 w-72 animate-spin-slow text-cream-50/30" />
            <Mandala className="absolute -right-24 -bottom-24 h-72 w-72 animate-spin-slow text-maroon-700/20 [animation-direction:reverse]" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-ink-900 sm:text-5xl">
                Life’s too short to skip dessert.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-ink-700">
                Order your favourites now — fresh from our kitchen to your table.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/#order" size="lg" shine>
                  <ShoppingBag className="h-5 w-5" /> Order Now
                </Button>
                <Button href={whatsappHref()} size="lg" variant="light">
                  <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
