import { photos, unsplash } from "./menu";

/** TODO: confirm box contents and starting prices with the shop. */
export const giftBoxes = [
  {
    id: "kaju-premium",
    name: "Kaju Katli Premium Box",
    image: unsplash("1699708263762-00ca477760bd"),
    contents: ["Silver-leaf kaju katli", "Elegant rigid box", "Ribbon & greeting card"],
    size: "500 g / 1 kg",
    priceFrom: 520,
    tag: "Bestseller",
  },
  {
    id: "festive-laddu",
    name: "Festive Laddu Thaal",
    image: photos.laddooTray,
    contents: ["Motichoor & boondi laddus", "Decorated steel thaal", "Perfect for poojas"],
    size: "1 kg",
    priceFrom: 650,
    tag: "Festive",
  },
  {
    id: "assorted-mithai",
    name: "Assorted Mithai Box",
    image: photos.festiveSweets,
    contents: ["8–10 varieties of mithai", "Kaju, badam & khoya sweets", "Window gift box"],
    size: "500 g / 1 kg",
    priceFrom: 480,
  },
  {
    id: "royal-wedding",
    name: "Royal Wedding Box",
    image: photos.sweetRolls,
    contents: ["Premium dry-fruit rolls & barfis", "Custom name printing", "Bulk pricing available"],
    size: "Custom",
    priceFrom: 750,
    tag: "Weddings",
  },
  {
    id: "rakhi-hamper",
    name: "Rakhi Celebration Hamper",
    image: photos.rakhi,
    contents: ["Sweets + dry fruits", "Rakhi & roli-chawal", "Festive hamper packing"],
    size: "Hamper",
    priceFrom: 899,
    tag: "Seasonal",
  },
  {
    id: "corporate",
    name: "Corporate Gift Box",
    image: photos.giftBox,
    contents: ["Your logo on the box", "Choice of sweets & namkeen", "Delivery to your office"],
    size: "Min. 25 boxes",
    priceFrom: 399,
    tag: "Corporate",
  },
] as const;

export const occasions = ["Diwali", "Weddings", "Raksha Bandhan", "Corporate", "Housewarming", "Birthdays", "Baby Showers", "Poojas"];

export const giftingFaq = [
  { q: "How early should I place a festive or wedding order?", a: "For up to 20 boxes, 1–2 days is usually enough. For larger orders or Diwali week, please book 5–7 days ahead so we can reserve fresh batches for you." },
  { q: "Can you print our company logo or a wedding name on the box?", a: "Yes. Custom sleeves and stickers are available for orders of 25 boxes or more. Share your logo or names on WhatsApp and we’ll send a preview." },
  { q: "Do you deliver gift boxes?", a: "We deliver across Bengaluru for bulk orders. For a few boxes you can pick up from our Koramangala shop or order via Swiggy / Zomato." },
  { q: "How long do the sweets stay fresh?", a: "Dry sweets like kaju katli and barfis stay fresh for 5–7 days. Milk sweets are best eaten within 2 days — keep them refrigerated." },
  { q: "Can I mix and match sweets in one box?", a: "Of course! Choose your box size and tell us your favourites — we’ll pack them neatly together." },
];
