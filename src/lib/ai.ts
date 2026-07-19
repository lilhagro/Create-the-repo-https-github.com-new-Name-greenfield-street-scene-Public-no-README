import { meets, type Meet } from "@/data/meets";
import { products, type Product } from "@/data/products";

export type AiSuggestion = {
  reply: string;
  products: Product[];
  meets: Meet[];
};

function scoreText(haystack: string, needles: string[]) {
  const h = haystack.toLowerCase();
  return needles.reduce((score, n) => (h.includes(n) ? score + 1 : score), 0);
}

export function recommendFromPrompt(prompt: string): AiSuggestion {
  const q = prompt.trim().toLowerCase();

  if (!q) {
    return {
      reply: "Tell me what kind of meet or merch you’re after — night lot, sunrise photo, cold weather, gifts, etc.",
      products: products.filter((p) => p.featured).slice(0, 3),
      meets: meets.filter((m) => m.featured).slice(0, 2),
    };
  }

  const productNeedles = q.split(/[^a-z0-9]+/).filter((w) => w.length > 2);
  const scoredProducts = products
    .map((p) => {
      const blob = [p.name, p.tagline, p.description, p.vibe, p.category, ...p.tags, ...p.colors].join(" ");
      let score = scoreText(blob, productNeedles);
      if (q.includes("hoodie") && p.category === "hoodies") score += 3;
      if (q.includes("tee") || q.includes("shirt")) {
        if (p.category === "tees") score += 3;
      }
      if (q.includes("hat") || q.includes("cap") || q.includes("beanie")) {
        if (p.category === "hats") score += 3;
      }
      if ((q.includes("sticker") || q.includes("cheap") || q.includes("gift")) && (p.category === "stickers" || p.tags.includes("gift"))) {
        score += 2;
      }
      if ((q.includes("cold") || q.includes("winter") || q.includes("night")) && p.tags.some((t) => ["cold", "night", "winter", "layered"].includes(t))) {
        score += 2;
      }
      if ((q.includes("day") || q.includes("sun") || q.includes("sunrise")) && p.tags.some((t) => ["day", "sun"].includes(t))) {
        score += 2;
      }
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);

  const scoredMeets = meets
    .map((m) => {
      const blob = [m.name, m.city, m.vibe, m.description, ...m.tags].join(" ");
      let score = scoreText(blob, productNeedles);
      if (q.includes("night") && m.tags.includes("night")) score += 3;
      if ((q.includes("photo") || q.includes("sunrise")) && m.tags.some((t) => ["photo", "sunrise"].includes(t))) score += 3;
      if (q.includes("cruise") && m.tags.includes("cruise")) score += 3;
      if (q.includes("cold") || q.includes("winter")) {
        if (m.tags.some((t) => ["cold", "winter"].includes(t))) score += 3;
      }
      if (q.includes("la") || q.includes("los angeles")) {
        if (m.city.toLowerCase().includes("los angeles")) score += 4;
      }
      if (q.includes("phoenix")) {
        if (m.city.toLowerCase().includes("phoenix")) score += 4;
      }
      if (q.includes("dallas")) {
        if (m.city.toLowerCase().includes("dallas")) score += 4;
      }
      if (q.includes("denver")) {
        if (m.city.toLowerCase().includes("denver")) score += 4;
      }
      if (q.includes("san diego") || q.includes("sd")) {
        if (m.city.toLowerCase().includes("san diego")) score += 4;
      }
      return { m, score };
    })
    .sort((a, b) => b.score - a.score);

  const topProducts = scoredProducts.filter((x) => x.score > 0).slice(0, 3).map((x) => x.p);
  const topMeets = scoredMeets.filter((x) => x.score > 0).slice(0, 2).map((x) => x.m);

  const productsOut = topProducts.length ? topProducts : products.filter((p) => p.featured).slice(0, 3);
  const meetsOut = topMeets.length ? topMeets : meets.filter((m) => m.featured).slice(0, 2);

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
