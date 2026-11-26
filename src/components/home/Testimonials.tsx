import { Quote } from "lucide-react";
import { Stars } from "@/components/ui/Badges";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

function Row({ reverse = false }: { reverse?: boolean }) {
  const list = reverse ? [...testimonials].reverse() : testimonials;
  const doubled = [...list, ...list];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={cn("marquee-track flex w-max gap-5 pr-5", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {doubled.map((t, i) => (
          <figure
            key={i}
            aria-hidden={i >= list.length}
            className="relative w-[320px] shrink-0 rounded-3xl bg-cream-50 p-6 ring-1 ring-cream-300 sm:w-[380px]"
          >
            <Quote className="absolute top-5 right-5 h-8 w-8 text-saffron-100" />
            <Stars value={t.rating} />
            <blockquote className="mt-4 leading-relaxed text-ink-700">“{t.text}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-saffron-400 to-maroon-700 font-bold text-cream-50">
                {t.name.charAt(0)}
              </span>
              <span className="text-sm font-bold text-ink-900">{t.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="overflow-hidden bg-cream-200/60 py-20 sm:py-28">
      <SectionHeading
        className="px-4"
        eyebrow="Loved by Bengaluru"
        title={<>Words from our <span className="text-maroon-700 italic">happy guests</span></>}
        description={
          <span className="inline-flex flex-wrap items-center justify-center gap-2">
            <Stars value={site.rating.value} /> <strong className="text-ink-900">{site.rating.value}/5</strong> from {site.rating.count} reviews on Google
          </span>
        }
      />
      <div className="mt-14 space-y-5">
        <Row />
        <Row reverse />
      </div>
      <div className="mt-12 text-center">
        <Button href={site.links.directions} variant="outline">
          Read all reviews on Google
        </Button>
      </div>
    </section>
  );
}
