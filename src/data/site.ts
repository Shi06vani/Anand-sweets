/**
 * Single source of truth for business details.
 * The owner only needs to edit this file to update phone, hours, links, etc.
 *
 * ⚠️  Values marked TODO are placeholders — replace with the real details
 *     before going live.
 */

export const site = {
  name: "Anand Sweets",
  branch: "Koramangala",
  tagline: "Pure Vegetarian Sweets, Savouries & Meals",
  since: 1988,
  description:
    "Handcrafted Indian sweets, crispy savouries and comforting vegetarian meals — made fresh every morning in the heart of Koramangala, Bengaluru.",

  address: {
    line1: "143/A, 60 Feet Rd, KHB Block Koramangala",
    line2: "5th Block, Koramangala",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560034",
  },

  phone: "+91 72910 85606",
  whatsapp: "917291085606", // country code + number, digits only
  email: "hello@example.com", // TODO

  rating: { value: 4.3, count: "8,000+" }, // from the Google Maps listing — update occasionally

  /**
   * Opening hours in 24h "HH:MM" (India time). Index 0 = Sunday.
   * TODO: confirm real hours.
   */
  hours: [
    { day: "Sunday", open: "08:00", close: "22:30" },
    { day: "Monday", open: "08:00", close: "22:30" },
    { day: "Tuesday", open: "08:00", close: "22:30" },
    { day: "Wednesday", open: "08:00", close: "22:30" },
    { day: "Thursday", open: "08:00", close: "22:30" },
    { day: "Friday", open: "08:00", close: "22:30" },
    { day: "Saturday", open: "08:00", close: "22:30" },
  ],

  links: {
    // TODO: paste the exact restaurant pages from Swiggy / Zomato
    swiggy: "https://www.swiggy.com/search?query=Anand%20Sweets%20Koramangala",
    zomato: "https://www.zomato.com/bangalore/restaurants?q=Anand%20Sweets",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Anand+Sweets+Koramangala+143%2FA+60+Feet+Rd+Bengaluru+560034",
    mapEmbed:
      "https://www.google.com/maps?q=Anand+Sweets+Koramangala+143%2FA+60+Feet+Rd+KHB+Block+Bengaluru+560034&output=embed",
  },
} as const;

export const fullAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.state} ${site.address.pincode}`;

export const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

/** Build a WhatsApp link with a pre-filled message. */
export function whatsappHref(message = `Hi ${site.name}! I'd like to place an order.`) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Gifting", href: "/gifting" },
  { label: "Catering", href: "/catering" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Short rotating messages in the top announcement bar. */
export const announcements = [
  "🪔 Festive gift boxes now available — pre-order for Diwali & weddings",
  "🥮 Fresh batches of sweets every morning from 7 AM",
  "🚚 Order on Swiggy & Zomato or WhatsApp us for pickup",
  "🎉 Bulk orders for poojas, parties & corporate events",
];
