# Architecture — Greenfield Street Scene (Option A)

We evolve the current Next.js app into a production platform **without a rewrite**.
Brand UI stays. Domain boundaries and infrastructure grow underneath.

## System shape

```
src/
  app/                     # Routes / UI composition only
  components/              # Presentational UI
  modules/
    catalog/               # Products, pricing, inventory-facing reads
    meets/                 # Events, RSVPs (RSVP writes next)
    commerce/              # Cart now; Orders/Checkout next
    identity/              # Auth.js + roles
    ai/                    # Recommendation / agent interface
  shared/
    db/                    # Prisma client + feature flags
  data/ + lib/             # Thin compatibility shims (deprecated)
```

## Data strategy

1. **Seed catalog** always available (works on Vercel with zero DB config).
2. **Prisma repositories** prefer DB when `DATABASE_URL` is set and `USE_DATABASE!=false`.
3. **SQLite** for local velocity; swap datasource to **PostgreSQL** for production scale.
4. Schema already includes `User`, `Product`, `Meet`, `MeetRsvp`, `Order`, `OrderItem`, Auth tables.

## Auth strategy

- Auth.js installed at `/api/auth/*` and `/login`.
- GitHub OAuth activates when `AUTH_GITHUB_ID` + `AUTH_GITHUB_SECRET` exist.
- Database sessions only when DB + OAuth are both enabled; otherwise JWT.

## AI strategy

- `modules/ai/recommend.ts` is the stable interface.
- v1 = deterministic ranking over catalog + meets.
- Later: embeddings, LLM rerank, user preference memory — same API.

## Scale path (next layers)

| Phase | Add |
| --- | --- |
| Now | Modules + Prisma + Auth skeleton |
| Next | Postgres on Neon, Stripe checkout, Meet RSVP |
| Then | Vendor accounts, search, image CDN, admin |
| Later | Feeds/social, notifications, multi-region |

## Commands

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```
