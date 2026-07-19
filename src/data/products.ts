export type ProductCategory = "tees" | "hoodies" | "hats" | "stickers" | "accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  tagline: string;
  description: string;
  tags: string[];
  colors: string[];
  featured?: boolean;
  vibe: string;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "lot-lights-tee",
    name: "Lot Lights Tee",
    price: 34,
    category: "tees",
    tagline: "Sodium glow. Cold concrete.",
    description:
      "Heavyweight boxy tee for late lots and early mornings. Soft wash black with amber lot-light print on the back.",
    tags: ["night", "casual", "everyday", "meet"],
    colors: ["Asphalt Black", "Bone"],
    featured: true,
    vibe: "night lot",
  },
  {
    id: "p2",
    slug: "redline-stripe-hoodie",
    name: "Redline Stripe Hoodie",
    price: 68,
    category: "hoodies",
    tagline: "Warm when the lot goes quiet.",
    description:
      "French terry hoodie with a single racing stripe down the sleeve. Built for cool nights between pullouts.",
    tags: ["cold", "night", "layered", "premium"],
    colors: ["Charcoal", "Oxblood"],
    featured: true,
    vibe: "cold night",
  },
  {
    id: "p3",
    slug: "grid-cap",
    name: "Grid Cap",
    price: 28,
    category: "hats",
    tagline: "Low profile. High mileage.",
    description:
      "Structured five-panel with tonal embroidery. Sits clean with sunglasses or a helmet bag.",
    tags: ["day", "casual", "everyday", "sun"],
    colors: ["Black", "Stone"],
    featured: true,
    vibe: "day meet",
  },
  {
    id: "p4",
    slug: "meet-map-sticker-pack",
    name: "Meet Map Sticker Pack",
    price: 12,
    category: "stickers",
    tagline: "Mark the spots that mattered.",
    description:
      "Eight die-cut stickers of lot maps, tire marks, and REDLINE marks. Laptop, toolbox, or mirror ready.",
    tags: ["cheap", "gift", "collector", "everyday"],
    colors: ["Multi"],
    featured: false,
    vibe: "collector",
  },
  {
    id: "p5",
    slug: "pit-lane-longsleeve",
    name: "Pit Lane Longsleeve",
    price: 42,
    category: "tees",
    tagline: "Sleeve graphics that catch the flash.",
    description:
      "Relaxed longsleeve with reflective pit-lane marks on both sleeves. Looks sharp under garage lights.",
    tags: ["night", "photo", "layered"],
    colors: ["Ink", "Fog"],
    featured: false,
    vibe: "photo night",
  },
  {
    id: "p6",
    slug: "torque-keychain",
    name: "Torque Keychain",
    price: 18,
    category: "accessories",
    tagline: "Small weight. Loud identity.",
    description:
      "Machined aluminum key tag with REDLINE stamp. Survives pocket lint and parking lot abuse.",
    tags: ["gift", "everyday", "cheap", "accessory"],
    colors: ["Raw Aluminum"],
    featured: false,
    vibe: "daily carry",
  },
  {
    id: "p7",
    slug: "afterhours-crew",
    name: "Afterhours Crew",
    price: 58,
    category: "hoodies",
    tagline: "For the last cars left.",
    description:
      "Cropped crewneck with oversized back print. Soft handfeel, zero fluff branding on the chest.",
    tags: ["night", "premium", "layered", "photo"],
    colors: ["Midnight", "Rust"],
    featured: true,
    vibe: "afterhours",
  },
  {
    id: "p8",
    slug: "lane-marker-beanie",
    name: "Lane Marker Beanie",
    price: 24,
    category: "hats",
    tagline: "Yellow line energy.",
    description:
      "Rib knit beanie with a single embroidered lane marker. Winter meets and empty freeways.",
    tags: ["cold", "winter", "night"],
    colors: ["Black / Amber"],
    featured: false,
    vibe: "winter meet",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
