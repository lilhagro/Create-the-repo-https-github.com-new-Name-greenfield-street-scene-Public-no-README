import type { Meet as DbMeet } from "@prisma/client";
import { seedMeets } from "@/modules/meets/seed";
import type { Meet } from "@/modules/meets/types";
import { isDatabaseEnabled, prisma } from "@/shared/db/prisma";

function mapDbMeet(row: DbMeet): Meet {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    city: row.city,
    date: row.dateLabel,
    time: row.timeLabel,
    venue: row.venue,
    vibe: row.vibe,
    description: row.description,
    tags: JSON.parse(row.tagsJson) as string[],
    capacity: row.capacity,
    featured: row.featured,
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

export async function listMeets(): Promise<Meet[]> {
  const rows = await fromDatabase(() =>
    prisma.meet.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
    }),
  );
  if (rows && rows.length > 0) return rows.map(mapDbMeet);
  return seedMeets;
}

export async function listFeaturedMeets(limit = 3): Promise<Meet[]> {
  const all = await listMeets();
  return all.filter((m) => m.featured).slice(0, limit);
}

export async function getMeetBySlug(slug: string): Promise<Meet | null> {
  const row = await fromDatabase(() =>
    prisma.meet.findFirst({ where: { slug, status: "PUBLISHED" } }),
  );
  if (row) return mapDbMeet(row);
  return seedMeets.find((m) => m.slug === slug) ?? null;
}
