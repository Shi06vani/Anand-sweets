import { Award, Gift, Leaf, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const highlights = [
  { Icon: Leaf, title: "100% Vegetarian", text: "Pure veg kitchen, always." },
  { Icon: Award, title: `Pure Ghee Sweets`, text: "Traditional recipes, no shortcuts." },
  { Icon: Truck, title: "Quick Delivery", text: "Swiggy, Zomato or pickup." },
  { Icon: Gift, title: "Gift Boxes", text: "Festivals, weddings & offices." },
];

/** Four quick reasons to choose us — sits right under the hero. */
export function Highlights() {
  return (
    <section className="relative z-10 -mt-6">
      <Container>
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-cream-300 shadow-[0_20px_50px_-20px_rgba(95,23,33,0.25)] ring-1 ring-cream-300 lg:grid-cols-4">
          {highlights.map(({ Icon, title, text }) => (
            <StaggerItem key={title} className="group flex flex-col items-center gap-3 bg-cream-50 p-6 text-center sm:flex-row sm:text-left lg:p-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-saffron-100 text-maroon-700 transition-all duration-500 group-hover:rotate-[10deg] group-hover:bg-maroon-700 group-hover:text-cream-50">
                <Icon className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-bold text-ink-900">{title}</span>
                <span className="text-sm text-ink-500">{text}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
