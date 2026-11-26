"use client";

import { AnimatePresence, motion } from "motion/react";
import { History, Menu, Phone, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartButton } from "@/components/cart/CartButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks, site, telHref } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled && !open
            ? "bg-cream-50/85 shadow-[0_8px_30px_-12px_rgba(95,23,33,0.25)] backdrop-blur-lg"
            : "bg-transparent",
        )}
      >
        <Container className={cn("flex items-center justify-between transition-all duration-500", scrolled ? "h-16" : "h-20")}>
          <Logo />
  
          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[15px] font-semibold transition-colors",
                    active ? "text-maroon-700" : "text-ink-700 hover:text-maroon-700",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-saffron-100"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>
  
          <div className="hidden items-center gap-2 lg:flex">
            <Button href={telHref} variant="ghost" size="sm" aria-label={`Call ${site.name}`}>
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button href="/menu" variant="primary" size="sm" shine>
              <ShoppingBag className="h-4 w-4" />
              Order Now
            </Button>
            <CartButton />
          </div>

          {/* Mobile: cart + menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
          <CartButton className={cn(open && "invisible")} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full bg-maroon-700 text-cream-50"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
          </div>
        </Container>
      </header>

      {/* Mobile menu — rendered outside <header> so its backdrop-blur doesn't trap this fixed overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[45] flex flex-col bg-cream-50 px-6 pt-28 pb-10 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block border-b border-cream-300 py-4 font-display text-3xl font-semibold",
                      pathname === link.href ? "text-maroon-700" : "text-ink-900",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mt-auto grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button href="/my-orders" variant="ghost" className="col-span-2" onClick={() => setOpen(false)}>
                <History className="h-4 w-4" /> My orders & favourites
              </Button>
              <Button href={telHref} variant="outline">
                <Phone className="h-4 w-4" /> Call
              </Button>
              <Button href="/menu" variant="primary" onClick={() => setOpen(false)}>
                <ShoppingBag className="h-4 w-4" /> Order
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
