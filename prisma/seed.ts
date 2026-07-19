import { PrismaClient } from "@prisma/client";
import { seedProducts } from "../src/modules/catalog/seed";
import { seedMeets } from "../src/modules/meets/seed";

const prisma = new PrismaClient();

async function main() {
  for (const product of seedProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        priceCents: product.priceCents,
        category: product.category,
        tagsJson: JSON.stringify(product.tags),
        colorsJson: JSON.stringify(product.colors),
        vibe: product.vibe,
        featured: product.featured,
        active: true,
      },
      create: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        priceCents: product.priceCents,
        category: product.category,
        tagsJson: JSON.stringify(product.tags),
        colorsJson: JSON.stringify(product.colors),
        vibe: product.vibe,
        featured: product.featured,
        active: true,
      },
    });
  }

  for (const meet of seedMeets) {
    await prisma.meet.upsert({
      where: { slug: meet.slug },
      update: {
        name: meet.name,
        city: meet.city,
        dateLabel: meet.date,
        timeLabel: meet.time,
        venue: meet.venue,
        vibe: meet.vibe,
        description: meet.description,
        tagsJson: JSON.stringify(meet.tags),
        capacity: meet.capacity,
        featured: meet.featured,
        status: "PUBLISHED",
      },
      create: {
        id: meet.id,
        slug: meet.slug,
        name: meet.name,
        city: meet.city,
        dateLabel: meet.date,
        timeLabel: meet.time,
        venue: meet.venue,
        vibe: meet.vibe,
        description: meet.description,
        tagsJson: JSON.stringify(meet.tags),
        capacity: meet.capacity,
        featured: meet.featured,
        status: "PUBLISHED",
      },
    });
  }

  console.log(`Seeded ${seedProducts.length} products and ${seedMeets.length} meets.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
