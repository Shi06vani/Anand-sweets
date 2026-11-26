/**
 * Menu data used across the site.
 * TODO: prices are placeholders — update with the real menu card.
 *
 * Photos are free-licence images from Unsplash (https://unsplash.com/license).
 * When the shop has its own photos, put them in /public/images and set
 * e.g. `image: "/images/kaju-katli.jpg"` — nothing else needs to change.
 */

export type ArtKind =
  | "laddu"
  | "katli"
  | "jamun"
  | "jalebi"
  | "barfi"
  | "mysorepak"
  | "rasmalai"
  | "samosa"
  | "kachori"
  | "thali"
  | "dosa"
  | "chai"
  | "lassi"
  | "giftbox";

export type CategoryId = "sweets" | "savouries" | "meals" | "beverages";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
  category: CategoryId;
  /** Illustration fallback if no photo */
  art: ArtKind;
  image: string;
  tag?: "Bestseller" | "Chef's Special" | "New" | "Festive";
};

/** Build an optimised Unsplash URL from a photo id. */
export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const photos = {
  sweetShop: unsplash("1758910536889-43ce7b3199fd"),
  sweetCounter: unsplash("1782033032439-a2c656ca2f59"),
  jalebiStall: unsplash("1760263215450-b13943da7e17"),
  chaiPour: unsplash("1761483281417-778013dc0177"),
  kulhad: unsplash("1619581073186-5b4ae1b0caad"),
  diyas: unsplash("1577083753695-e010191bacb5"),
  giftBox: unsplash("1513201099705-a9746e1e201f"),
  giftBoxes: unsplash("1625552186152-668cd2f0b707"),
  laddooTray: unsplash("1695568181747-f54dff1d4654"),
  sweetRolls: unsplash("1695568181140-8b49ec87a96d"),
  festiveSweets: unsplash("1695568181117-c91fe299acc3"),
  rakhi: unsplash("1784286542139-b4904d8117b7"),
  buffet: unsplash("1555244162-803834f70033"),
  serving: unsplash("1728910156510-77488f19b152"),
  feastSpread: unsplash("1682862279256-b2a9e4f3d22c"),
  thalis: unsplash("1742281257707-0c7f7e5ca9c6"),
  cooks: unsplash("1662101875545-0b0cb8b7795b"),
  halwaiKitchen: unsplash("1752225678386-b37d94971c19"),
  kadai: unsplash("1593701461250-d7b22dfd3a77"),
  sweetVendor: unsplash("1760263217153-ef719ca2da19"),
};

export const categories: {
  id: CategoryId;
  name: string;
  blurb: string;
  art: ArtKind;
  image: string;
  tint: string;
}[] = [
  { id: "sweets", name: "Mithai", blurb: "Ghee-rich classics made fresh daily", art: "laddu", image: unsplash("1758910536889-43ce7b3199fd"), tint: "from-saffron-100 to-cream-200" },
  { id: "savouries", name: "Namkeen & Chaat", blurb: "Crispy, tangy, irresistibly spicy", art: "samosa", image: unsplash("1601050690597-df0568f70950"), tint: "from-gold-300/50 to-cream-200" },
  { id: "meals", name: "Meals & Thalis", blurb: "North & South Indian comfort food", art: "thali", image: unsplash("1589778655375-3e622a9fc91c"), tint: "from-maroon-100 to-cream-200" },
  { id: "beverages", name: "Chai & Drinks", blurb: "Masala chai, lassi & more", art: "chai", image: unsplash("1761483281417-778013dc0177"), tint: "from-cream-300 to-cream-100" },
];

export const menuItems: MenuItem[] = [
  // Sweets
  { id: "kaju-katli", name: "Kaju Katli", description: "Silky cashew diamonds finished with edible silver.", price: 480, unit: "500 g", category: "sweets", art: "katli", image: unsplash("1699708263762-00ca477760bd"), tag: "Bestseller" },
  { id: "motichoor-laddu", name: "Motichoor Laddu", description: "Tiny boondi pearls in pure ghee, scented with cardamom.", price: 320, unit: "500 g", category: "sweets", art: "laddu", image: unsplash("1695568180842-1fcf31187dd6"), tag: "Bestseller" },
  { id: "dry-fruit-barfi", name: "Kaju Pista Barfi", description: "Rich cashew barfi studded with pistachios and almonds.", price: 520, unit: "500 g", category: "sweets", art: "barfi", image: unsplash("1695568181558-034b7d3e49eb"), tag: "Chef's Special" },
  { id: "gulab-jamun", name: "Gulab Jamun", description: "Soft khoya dumplings soaked in rose-cardamom syrup.", price: 60, unit: "2 pcs", category: "sweets", art: "jamun", image: unsplash("1616995797463-9e67aa01bc7a") },
  { id: "jalebi", name: "Hot Jalebi", description: "Crisp golden spirals, served warm from the kadai.", price: 140, unit: "250 g", category: "sweets", art: "jalebi", image: unsplash("1778448806852-db6a837fa98f"), tag: "Bestseller" },
  { id: "boondi-laddu", name: "Boondi Laddu", description: "Festive favourite, hand-rolled with ghee and raisins.", price: 280, unit: "500 g", category: "sweets", art: "laddu", image: unsplash("1635952346904-95f2ccfcd029") },
  { id: "mithai-platter", name: "Festive Mithai Platter", description: "Assorted laddus, pedas & barfis — perfect for poojas and guests.", price: 650, unit: "1 kg", category: "sweets", art: "giftbox", image: unsplash("1695568181363-af5c78f4d059"), tag: "Festive" },

  // Savouries
  { id: "samosa", name: "Punjabi Samosa", description: "Flaky pastry with spiced potato & peas, served with chutneys.", price: 40, unit: "1 pc", category: "savouries", art: "samosa", image: unsplash("1601050690597-df0568f70950"), tag: "Bestseller" },
  { id: "pyaaz-kachori", name: "Pyaaz Kachori", description: "Jodhpur-style kachori with a tangy onion filling.", price: 50, unit: "1 pc", category: "savouries", art: "kachori", image: unsplash("1591465619385-1ef36826b8bd") },
  { id: "papdi-chaat", name: "Papdi Chaat", description: "Crisp papdi with curd, chutneys, pomegranate & sev.", price: 110, category: "savouries", art: "kachori", image: unsplash("1788602563638-840d0d1d3ad2"), tag: "Chef's Special" },
  { id: "sev-puri", name: "Sev Puri", description: "Mumbai-style puris loaded with potato, chutneys & fine sev.", price: 90, category: "savouries", art: "kachori", image: unsplash("1788621138170-6854f17c9e2e") },
  { id: "bhel-puri", name: "Bhel Puri", description: "Puffed rice tossed with onions, tomato, chutneys and lime.", price: 80, category: "savouries", art: "kachori", image: unsplash("1653850280260-aa3b9e00b230") },

  // Meals
  { id: "north-thali", name: "North Indian Thali", description: "Paneer, dal, sabzi, rice, rotis, raita & a sweet.", price: 260, category: "meals", art: "thali", image: unsplash("1589778655375-3e622a9fc91c"), tag: "Bestseller" },
  { id: "south-meals", name: "South Indian Meals", description: "Rice, sambar, rasam, poriyal, curd & payasam.", price: 220, category: "meals", art: "thali", image: unsplash("1742281257687-092746ad6021") },
  { id: "masala-dosa", name: "Masala Dosa", description: "Crisp golden dosa, potato palya, sambar & chutney.", price: 110, category: "meals", art: "dosa", image: unsplash("1668236543090-82eba5ee5976") },
  { id: "chole-bhature", name: "Chole Bhature", description: "Fluffy bhature with slow-cooked Punjabi chole.", price: 170, category: "meals", art: "thali", image: unsplash("1788602564560-9bcbf0f9acb6"), tag: "Chef's Special" },

  // Beverages
  { id: "masala-chai", name: "Kulhad Masala Chai", description: "Strong, milky and spiced — served in a clay cup.", price: 35, category: "beverages", art: "chai", image: unsplash("1761483281417-778013dc0177"), tag: "Bestseller" },
  { id: "sweet-lassi", name: "Sweet Lassi", description: "Thick churned curd topped with malai.", price: 80, category: "beverages", art: "lassi", image: unsplash("1675064982913-067b64880f5f") },
  { id: "rose-lassi", name: "Rose Lassi", description: "Chilled lassi with rose syrup and dried petals.", price: 90, category: "beverages", art: "lassi", image: unsplash("1692620609860-be6717812f71"), tag: "New" },
];
