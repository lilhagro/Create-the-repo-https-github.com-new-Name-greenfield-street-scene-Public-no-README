import type { Product as DbProduct } from "@prisma/client";
import { seedProducts } from "@/modules/catalog/seed";
import {
  isProductCategory,
  type Product,
} from "@/modules/catalog/types";
import { isDatabaseEnabled, prisma } from "@/shared/db/prisma";

function mapDbProduct(row: DbProduct): Product {
  const category = isProductCategory(row.category) ? row.category : "tees";
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: row.priceCents / 100,
    priceCents: row.priceCents,
    category,
    tagline: row.tagline,
    description: row.description,
    tags: JSON.parse(row.tagsJson) as string[],
    colors: JSON.parse(row.colorsJson) as string[],
    featured: row.featured,
    vibe: row.vibe,
    image: row.imageUrl ?? undefined,
  };
}

async function fromDatabase<T>(fn: () => Promise<T>): Promise<T | null> {
  if (!isDatabaseEnabled()) return null;
  try {
    return await fn();
  } catch {
    return null;
  }
}

export async function listProducts(): Promise<Product[]> {
  const rows = await fromDatabase(() =>
    prisma.product.findMany({
      where: { active: true },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
    }),
  );
  if (rows && rows.length > 0) return rows.map(mapDbProduct);
  return seedProducts;
}

export async function listFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await listProducts();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await fromDatabase(() =>
    prisma.product.findFirst({ where: { slug, active: true } }),
  );
  if (row) return mapDbProduct(row);
  return seedProducts.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const row = await fromDatabase(() =>
    prisma.product.findFirst({ where: { id, active: true } }),
  );
  if (row) return mapDbProduct(row);
  return seedProducts.find((p) => p.id === id) ?? null;
}
