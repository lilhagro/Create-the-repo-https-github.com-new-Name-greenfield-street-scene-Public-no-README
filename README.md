# Greenfield Street Scene — AI shop for car meets & merch

Premium automotive ecosystem draft: merch + meets + AI fit finder.
Built as **Option A** — evolve the Next.js app with modular, production-ready foundations.

See [ARCHITECTURE.md](./ARCHITECTURE.md) and [DEPLOY.md](./DEPLOY.md).

## Run locally

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s included

- **Landing** — brand-first hero, featured merch, upcoming meets
- **Shop / Meets** — repository-backed (DB when configured, seed fallback otherwise)
- **Cart** — localStorage cart (Stripe checkout next)
- **AI Fit** — modular recommender at `src/modules/ai`
- **Identity** — Auth.js skeleton + `/login` (GitHub OAuth when env is set)
- **Prisma schema** — Users, Products, Meets, RSVPs, Orders

## Brand

**Greenfield Street Scene** — night-lot asphalt palette, amber signal accents, Archivo Black + Outfit typography.
