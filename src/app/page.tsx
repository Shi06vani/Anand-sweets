import { Bestsellers } from "@/components/home/Bestsellers";
import { Categories } from "@/components/home/Categories";
import { CtaBanner } from "@/components/home/CtaBanner";
import { GiftingCatering } from "@/components/home/GiftingCatering";
import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { OrderOptions } from "@/components/home/OrderOptions";
import { Story } from "@/components/home/Story";
import { Testimonials } from "@/components/home/Testimonials";
import { VisitUs } from "@/components/home/VisitUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <Categories />
      <Bestsellers />
      <OrderOptions />
      <Story />
      <GiftingCatering />
      <Testimonials />
      <VisitUs />
      <CtaBanner />
    </>
  );
}
