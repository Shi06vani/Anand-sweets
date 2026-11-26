import type { Metadata } from "next";
import { MyAccount } from "@/components/account/MyAccount";
import { PageHero } from "@/components/ui/PageHero";
import { photos } from "@/data/menu";

export const metadata: Metadata = {
  title: "My Orders & Favourites",
  description: "Your past orders, favourite dishes and saved details — stored privately on this device.",
  robots: { index: false },
};

export default function MyOrdersPage() {
  return (
    <>
      <PageHero
        crumb="My orders"
        eyebrow="Your corner"
        title={
          <>
            Your sweet <span className="text-saffron-400 italic">history.</span>
          </>
        }
        description="Past orders, favourite dishes and saved details — all kept privately on this device. Re-order your usual in one tap."
        image={photos.kulhad}
        imageAlt="Kulhad chai cups on a wooden table"
      />
      <div className="pt-6">
        <MyAccount />
      </div>
    </>
  );
}
