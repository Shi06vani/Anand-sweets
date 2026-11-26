"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { OpenStatus, useTodayIndex } from "@/components/ui/OpenStatus";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fullAddress, site, telHref } from "@/data/site";
import { formatTime } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** Map, address, hours (today highlighted) and one-tap directions/call. */
export function VisitUs() {
  const today = useTodayIndex();
  // Show Monday first, like a normal shop board
  const ordered = [1, 2, 3, 4, 5, 6, 0];

  return (
    <section id="visit" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Visit the shop"
          title={<>Come say hello in <span className="text-maroon-700 italic">Koramangala</span></>}
          description="Right on 60 Feet Road, 5th Block. Easy to find, hard to leave empty-handed."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal direction="right" className="lg:col-span-3">
            <div className="h-[320px] overflow-hidden rounded-[2rem] ring-1 ring-cream-300 sm:h-full sm:min-h-[460px]">
              <iframe
                title={`Map showing ${site.name} ${site.branch}`}
                src={site.links.mapEmbed}
                className="h-full w-full border-0 grayscale-[30%] transition duration-700 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal direction="left" className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-[2rem] bg-cream-50 p-7 ring-1 ring-cream-300 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-saffron-100 text-maroon-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ink-900">Address</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{fullAddress}</p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-saffron-100 text-maroon-700">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-ink-900">Opening hours</h3>
                    <OpenStatus />
                  </div>
                  <ul className="mt-3 space-y-1 text-sm">
                    {ordered.map((i) => {
                      const h = site.hours[i];
                      const isToday = today === i;
                      return (
                        <li
                          key={h.day}
                          className={cn(
                            "flex justify-between rounded-lg px-3 py-1.5 transition-colors",
                            isToday ? "bg-maroon-700 font-semibold text-cream-50" : "text-ink-500",
                          )}
                        >
                          <span>{h.day}{isToday && " (Today)"}</span>
                          <span>{formatTime(h.open)} – {formatTime(h.close)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
                <Button href={site.links.directions} shine>
                  <Navigation className="h-4 w-4" /> Directions
                </Button>
                <Button href={telHref} variant="outline">
                  <Phone className="h-4 w-4" /> Call
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
