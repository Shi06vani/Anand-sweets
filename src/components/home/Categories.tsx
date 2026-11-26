import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories, menuItems } from "@/data/menu";

export function Categories() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What we serve"
          title={<>Something for every <span className="text-maroon-700 italic">craving</span></>}
          description="From festive mithai boxes to a quick evening chaat — pick a counter and dig in."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const count = menuItems.filter((m) => m.category === cat.id).length;
            return (
              <StaggerItem key={cat.id}>
                <Link
                  href={`/menu#${cat.id}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lg shadow-maroon-900/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-maroon-900/25"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/25 to-transparent" />
                  <span className="absolute top-5 left-5 rounded-full bg-cream-50/90 px-3 py-1 text-[11px] font-bold tracking-wider text-maroon-700 uppercase backdrop-blur">
                    {count} items
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-cream-50">{cat.name}</h3>
                      <p className="mt-1 text-sm text-cream-200/85">{cat.blurb}</p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-saffron-500 text-ink-900 transition-all duration-500 group-hover:rotate-45 group-hover:bg-cream-50">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
