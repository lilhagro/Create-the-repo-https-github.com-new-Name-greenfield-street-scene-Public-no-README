export type ProductCategory =
  | "tees"
  | "hoodies"
  | "hats"
  | "stickers"
  | "accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  priceCents: number;
  category: ProductCategory;
  tagline: string;
  description: string;
  tags: string[];
  colors: string[];
  featured: boolean;
  vibe: string;
};

export function isProductCategory(value: string): value is ProductCategory {
  return ["tees", "hoodies", "hats", "stickers", "accessories"].includes(value);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceCents(priceCents: number) {
  return formatPrice(priceCents / 100);
}
