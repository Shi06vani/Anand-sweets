"use client";

import { AnimatePresence, motion } from "motion/react";
import { Flame, Heart, LayoutGrid, List, Search, SearchX, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useHydrated } from "@/lib/local-store";
import { useFavourites } from "@/store/favourites";
import { menuViewStore, useMenuView } from "@/store/preferences";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { categories, menuItems, type CategoryId } from "@/data/menu";
import { whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";
import { DishCard } from "./DishCard";

type View = "grid" | "row";

/**
 * The interactive part of the Menu page:
 * sticky category bar (with scroll-spy), search, "popular only" filter,
 * grid/list toggle and one section per category.
 */
export function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [popularOnly, setPopularOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const hydrated = useHydrated();
  const savedView = useMenuView();
  const view: View = hydrated ? savedView : "grid";
  const setView = (v: View) => menuViewStore.set(v);
  const favIds = useFavourites();
  const [activeCat, setActiveCat] = useState<CategoryId>(categories[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      if (popularOnly && !item.tag) return false;
      if (savedOnly && !favIds.includes(item.id)) return false;
      if (!q) return true;
      return `${item.name} ${item.description}`.toLowerCase().includes(q);
    });
  }, [query, popularOnly, savedOnly, favIds]);

  const sections = categories
    .map((cat) => ({ ...cat, items: filtered.filter((i) => i.category === cat.id) }))
    .filter((s) => s.items.length > 0);

  // Scroll-spy: highlight the category currently on screen
  useEffect(() => {
    const els = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveCat(visible[0].target.id as CategoryId);
      },
      { rootMargin: "-160px 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections.length]);

  const jumpTo = (id: CategoryId) => {
    setActiveCat(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Sticky toolbar */}
      <div className="sticky top-16 z-30 border-y border-cream-300/70 bg-cream-100/90 backdrop-blur-lg">
        <Container className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Menu categories" className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:px-0">
            {categories.map((cat) => {
              const count = filtered.filter((i) => i.category === cat.id).length;
              const active = activeCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => jumpTo(cat.id)}
                  disabled={count === 0}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-semibold whitespace-nowrap transition-colors disabled:opacity-40",
                    active ? "text-cream-50" : "bg-cream-50 text-ink-700 ring-1 ring-cream-300 hover:text-maroon-700",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="menu-cat-pill"
                      className="absolute inset-0 rounded-full bg-maroon-700"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative h-7 w-7 overflow-hidden rounded-full">
                    <Image src={cat.image} alt="" fill sizes="28px" className="object-cover" />
                  </span>
                  <span className="relative">{cat.name}</span>
                  <span className={cn("relative rounded-full px-1.5 text-[11px]", active ? "bg-cream-50/20" : "bg-cream-200")}>{count}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <label className="relative flex-1 lg:w-64 lg:flex-none">
              <span className="sr-only">Search the menu</span>
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search kaju katli, samosa…"
                className="h-10 w-full rounded-full bg-cream-50 pr-9 pl-10 text-sm text-ink-900 ring-1 ring-cream-300 transition outline-none placeholder:text-ink-500/70 focus:ring-2 focus:ring-saffron-500 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-0.5 text-ink-500 hover:bg-cream-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>

            <button
              type="button"
              onClick={() => setPopularOnly((v) => !v)}
              aria-pressed={popularOnly}
              className={cn(
                "flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition",
                popularOnly ? "bg-saffron-500 text-ink-900" : "bg-cream-50 text-ink-700 ring-1 ring-cream-300 hover:text-maroon-700",
              )}
            >
              <Flame className="h-4 w-4" />
              <span className="hidden sm:inline">Popular</span>
            </button>

            <button
              type="button"
              onClick={() => setSavedOnly((v) => !v)}
              aria-pressed={savedOnly}
              aria-label="Show saved favourites only"
              className={cn(
                "flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition",
                savedOnly ? "bg-maroon-700 text-cream-50" : "bg-cream-50 text-ink-700 ring-1 ring-cream-300 hover:text-maroon-700",
              )}
            >
              <Heart className={cn("h-4 w-4", savedOnly && "fill-current")} />
              <span className="hidden sm:inline">Saved</span>
              {hydrated && favIds.length > 0 && (
                <span className={cn("rounded-full px-1.5 text-[11px]", savedOnly ? "bg-cream-50/20" : "bg-cream-200")}>{favIds.length}</span>
              )}
            </button>

            <div className="flex h-10 shrink-0 rounded-full bg-cream-50 p-1 ring-1 ring-cream-300" role="group" aria-label="Layout">
              {([
                ["grid", LayoutGrid, "Grid view"],
                ["row", List, "List view"],
              ] as const).map(([v, Icon, label]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-label={label}
                  aria-pressed={view === v}
                  className={cn(
                    "flex w-9 items-center justify-center rounded-full transition",
                    view === v ? "bg-maroon-700 text-cream-50" : "text-ink-500 hover:text-maroon-700",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Sections */}
      <Container className="py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {sections.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-md py-20 text-center"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100 text-saffron-600">
                <SearchX className="h-7 w-7" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold">{query ? `No dishes match “${query}”` : savedOnly ? "No saved favourites yet" : "No dishes found"}</h2>
              <p className="mt-2 text-ink-500">We make many specials that aren’t listed here. Ask us — we’ll tell you what’s fresh today.</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button variant="outline" onClick={() => { setQuery(""); setPopularOnly(false); setSavedOnly(false); }}>
                  Clear filters
                </Button>
                <Button href={whatsappHref(`Hi! Do you have ${query} today?`)} variant="whatsapp">
                  <WhatsAppIcon className="h-4 w-4" /> Ask us
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="list" className="space-y-20">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-44 lg:scroll-mt-36">
                  <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 flex items-end justify-between gap-4 border-b border-cream-300 pb-5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-2xl shadow-md ring-4 ring-cream-50 sm:block">
                        <Image src={section.image} alt="" fill sizes="64px" className="object-cover" />
                      </span>
                      <div>
                        <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">{section.name}</h2>
                        <p className="mt-1 text-ink-500">{section.blurb}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-saffron-600">{section.items.length} items</span>
                  </motion.header>

                  <motion.div
                    layout
                    className={cn("grid gap-6", view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-2")}
                  >
                    <AnimatePresence mode="popLayout">
                      {section.items.map((item) => (
                        <DishCard key={`${view}-${item.id}`} item={item} layout={view} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </section>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
}
