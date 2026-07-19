# REDLINE — AI shop for car meets & merch

Demo storefront for car-meet culture: merch catalog, meet listings, cart, and an AI fit finder that recommends products and events from natural language.

## Run locally

```bash
cd redline-shop
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s included

- **Landing** — brand-first hero, featured merch, upcoming meets
- **Shop** — product grid + detail pages, add to cart
- **Meets** — event list + detail pages
- **Cart** — localStorage cart (checkout stubbed)
- **AI Fit** — `/api/ai` recommends merch + meets from prompts (works offline with local matching)

## Next steps to go live

1. Replace sample products/meets in `src/data/`
2. Add real product photography
3. Wire Stripe (or Shopify) for checkout
4. Optionally set `OPENAI_API_KEY` and extend `src/lib/ai.ts` / `src/app/api/ai/route.ts` for richer chat
5. Push this folder to a GitHub repo and deploy on Vercel

## Brand

**REDLINE** — night-lot asphalt palette, amber signal accents, Archivo Black + Outfit typography.
