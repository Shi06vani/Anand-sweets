import { announcements } from "@/data/site";

/** Scrolling offers strip at the very top of every page. */
export function AnnouncementBar() {
  const items = [...announcements, ...announcements];
  return (
    <div className="relative overflow-hidden bg-maroon-800 py-2 text-[13px] font-medium text-cream-100">
      <div className="marquee-track flex w-max animate-marquee gap-12 whitespace-nowrap">
        {items.map((text, i) => (
          <span key={i} className="flex items-center gap-12" aria-hidden={i >= announcements.length}>
            {text}
            <span className="text-gold-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
