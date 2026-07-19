import type { Meet } from "@/modules/meets/types";
import type { Product } from "@/modules/catalog/types";
import { seedMeets } from "@/modules/meets/seed";
import { seedProducts } from "@/modules/catalog/seed";

export type AiSuggestion = {
  reply: string;
  products: Product[];
  meets: Meet[];
};

function scoreText(haystack: string, needles: string[]) {
  const h = haystack.toLowerCase();
  return needles.reduce((score, n) => (h.includes(n) ? score + 1 : score), 0);
}

/**
 * Deterministic recommendation engine (v1).
 * Swap internals later for embeddings / LLM without changing the API surface.
 */
export function recommendFromPrompt(
  prompt: string,
  catalog: Product[] = seedProducts,
  events: Meet[] = seedMeets,
): AiSuggestion {
  const q = prompt.trim().toLowerCase();

  if (!q) {
    return {
      reply:
        "Tell me what kind of meet or merch you’re after — night lot, sunrise photo, cold weather, gifts, etc.",
      products: catalog.filter((p) => p.featured).slice(0, 3),
      meets: events.filter((m) => m.featured).slice(0, 2),
    };
  }

  const needles = q.split(/[^a-z0-9]+/).filter((w) => w.length > 2);

  const scoredProducts = catalog
    .map((p) => {
      const blob = [p.name, p.tagline, p.description, p.vibe, p.category, ...p.tags, ...p.colors].join(
        " ",
      );
      let score = scoreText(blob, needles);
      if (q.includes("hoodie") && p.category === "hoodies") score += 3;
      if ((q.includes("tee") || q.includes("shirt")) && p.category === "tees") score += 3;
      if ((q.includes("hat") || q.includes("cap") || q.includes("beanie")) && p.category === "hats") {
        score += 3;
      }
      if (
        (q.includes("sticker") || q.includes("cheap") || q.includes("gift")) &&
        (p.category === "stickers" || p.tags.includes("gift"))
      ) {
        score += 2;
      }
      if (
        (q.includes("cold") || q.includes("winter") || q.includes("night")) &&
        p.tags.some((t) => ["cold", "night", "winter", "layered"].includes(t))
      ) {
        score += 2;
      }
      if (
        (q.includes("day") || q.includes("sun") || q.includes("sunrise")) &&
        p.tags.some((t) => ["day", "sun"].includes(t))
      ) {
        score += 2;
      }
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);

  const scoredMeets = events
    .map((m) => {
      const blob = [m.name, m.city, m.vibe, m.description, ...m.tags].join(" ");
      let score = scoreText(blob, needles);
      if (q.includes("night") && m.tags.includes("night")) score += 3;
      if (
        (q.includes("photo") || q.includes("sunrise")) &&
        m.tags.some((t) => ["photo", "sunrise"].includes(t))
      ) {
        score += 3;
      }
      if (q.includes("cruise") && m.tags.includes("cruise")) score += 3;
      if ((q.includes("cold") || q.includes("winter")) && m.tags.some((t) => ["cold", "winter"].includes(t))) {
        score += 3;
      }
      if (
        (q.includes("greenfield") ||
          q.includes("hancock") ||
          q.includes("indiana") ||
          q.includes("indy")) &&
        (m.city.toLowerCase().includes("greenfield") ||
          m.city.toLowerCase().includes("indianapolis") ||
          m.tags.some((t) =>
            ["greenfield", "indiana", "hancock", "indianapolis"].includes(t),
          ))
      ) {
        score += 4;
      }
      if (
        (q.includes("indianapolis") || q.includes("indy")) &&
        m.city.toLowerCase().includes("indianapolis")
      ) {
        score += 4;
      }
      return { m, score };
    })
    .sort((a, b) => b.score - a.score);

  const topProducts = scoredProducts.filter((x) => x.score > 0).slice(0, 3).map((x) => x.p);
  const topMeets = scoredMeets.filter((x) => x.score > 0).slice(0, 2).map((x) => x.m);

  const productsOut = topProducts.length
    ? topProducts
    : catalog.filter((p) => p.featured).slice(0, 3);
  const meetsOut = topMeets.length ? topMeets : events.filter((m) => m.featured).slice(0, 2);

  const bits: string[] = [];
  if (topMeets.length) {
    bits.push(`I lined up ${meetsOut.map((m) => m.name).join(" and ")} for your meet vibe.`);
  } else {
    bits.push("I pulled a couple featured meets while we dial in what you want.");
  }
  if (topProducts.length) {
    bits.push(`For merch, start with ${productsOut.map((p) => p.name).join(", ")}.`);
  } else {
    bits.push("Here’s featured merch that usually works for first-timers.");
  }
  bits.push("Ask for night vs day, cold weather, gifts, or a city and I’ll tighten it.");

  return {
    reply: bits.join(" "),
    products: productsOut,
    meets: meetsOut,
  };
}
