import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { MobileCartBar } from "@/components/cart/CartButton";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/layout/Providers";
import { site } from "@/data/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} ${site.branch} | ${site.tagline}`,
    template: `%s | ${site.name} ${site.branch}`,
  },
  description: site.description,
  keywords: ["Anand Sweets", "Koramangala", "sweet shop Bengaluru", "kaju katli", "mysore pak", "vegetarian restaurant", "chaat", "gift boxes"],
};

export const viewport: Viewport = {
  themeColor: "#7a1f2b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable} antialiased`}>
      <body className="flex min-h-screen flex-col overflow-x-clip">
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActions />
          <MobileCartBar />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
