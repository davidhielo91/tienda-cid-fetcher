# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # dev server (port 3000, falls back to 3001)
npm run build        # production build (standalone output)
npm test             # run Vitest tests (pricing logic)
npm run test:watch   # Vitest in watch mode
npx tsc --noEmit     # type check only
npm run lint         # ESLint
```

To run a single test file:
```bash
npx vitest run src/lib/pricing.test.ts
```

## Architecture

**Next.js 16.2.6 App Router** — TypeScript, React 19, Tailwind CSS v4, shadcn/ui.

### No backend

There are zero API routes. All data is static:
- Products hardcoded in `src/lib/data.ts` (25 products, `rawProducts` array)
- Volume pricing in `src/lib/pricing.ts` (4 tiers, `PRICE_TIERS`)
- Cart persisted in `localStorage`
- Checkout = Telegram deep link built by `src/lib/telegram.ts`

The only "server" code is Next.js SSR for metadata and schema.org JSON-LD.

### Server/client component split

Pages that export `Metadata` must be server components. Interactive pages are split:

| Server component (metadata + schema) | Client component (interactivity) |
|--------------------------------------|----------------------------------|
| `licencias/page.tsx` | `licencias/licencias-client.tsx` |
| `carrito/page.tsx` | `carrito/carrito-client.tsx` |
| `contacto/page.tsx` | `contacto/contacto-client.tsx` |

When adding interactivity to a page that needs metadata, follow this split pattern — never put `"use client"` in a `page.tsx` that exports `Metadata`.

### Data flow

```
src/lib/data.ts (rawProducts)
  └─ products[] ──► page.tsx (server, schema + metadata)
                └─► *-client.tsx (filter/search/cart UI)

src/lib/pricing.ts (PRICE_TIERS)
  └─ getPriceForQuantity(totalQty) ──► carrito-client.tsx (real-time total)
                                   └─► telegramCheckout() (order message)
```

`priceUSDT` on each product is always `BASE_PRICE_USDT` (1.5); actual unit price is always computed from `getPriceForQuantity(totalQty)` based on cart total, not per-item price.

### SEO / GEO

Every page has its own `Metadata` export with `alternates.canonical`. JSON-LD schemas are injected via `<script type="application/ld+json">` at the bottom of each page component's JSX return.

Global schemas (WebSite + Organization) live in `src/app/layout.tsx`.

Per-page schemas in use: `Product`, `FAQPage`, `HowTo`, `SoftwareApplication`, `Article`, `AboutPage`, `WebPage` (with `SpeakableSpecification`), `ItemList`, `BreadcrumbList`.

AI bot access is controlled in `src/app/robots.ts` (explicit allow rules for GPTBot, ClaudeBot, PerplexityBot, etc.) and `public/llms.txt` (structured site overview for LLM crawlers).

Dynamic OG image is generated at `src/app/opengraph-image.tsx` (Next.js `ImageResponse`, edge runtime).

### Deployment

`output: "standalone"` in `next.config.ts` — deployed via Docker on EasyPanel. Do not change to `export` (static) as it breaks API routes and dynamic routes.

## Key constraints

- **Telegram handle**: `rootkit_spoofer` — used in `src/lib/telegram.ts` and throughout copy
- **Domain**: `cidfetcher.de` — hardcoded in canonical URLs, sitemaps, and schema
- **Sitemap dates**: Use the static `LAST_MODIFIED` constant in `src/app/sitemap.ts`, never `new Date()`
- **localStorage cart**: Always wrap `JSON.parse(localStorage.getItem("cart"))` in try/catch; on parse error, remove the key
- **Category slugs**: `windows`, `office`, `windows_server`, `visio`, `project` — used in `src/app/licencias/[categoria]/`
