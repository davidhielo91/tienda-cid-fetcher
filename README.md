# Tienda CID Fetcher

E-commerce para reventa de licencias originales Microsoft. Sin backend — todo estático con checkout vía Telegram.

## Tech Stack

| Área | Tecnología |
|---|---|
| Framework | Next.js 16.3.5 (App Router) |
| UI | React 19.2.4, Tailwind CSS v4, shadcn/ui (base-ui) |
| Lenguaje | TypeScript 5 |
| Fuentes | Inter (sans), JetBrains Mono |
| Íconos | lucide-react |
| Tests | Vitest (lógica de precios y checkout) |
| Linting | ESLint (eslint-config-next) |
| Deploy | Cloudflare Workers sirviendo assets estáticos |

## Arquitectura

- **Sin backend** — sin API routes, sin base de datos
- **Productos** hardcodeados en `src/lib/data.ts`
- **Precios por volumen** en `src/lib/pricing.ts` (5 tiers)
- **Carrito** persistido en `localStorage`
- **Checkout** = deep link a Telegram con el resumen del pedido

## Comandos

```bash
npm run dev          # dev server (puerto 3000)
npm run build        # build de producción
npm test             # tests de Vitest (pricing y checkout)
npx tsc --noEmit     # solo type check
npm run lint         # ESLint
```

## Despliegue en Cloudflare

La producción usa Cloudflare Workers Static Assets. `npm run build` genera la exportación estática en `out/`. `wrangler.jsonc` publica ese directorio mediante el Worker `tienda-cid-fetcher`, con el binding `ASSETS`.

`src/worker.ts` envía las solicitudes normales a `ASSETS`. También corrige únicamente las solicitudes RSC de Next.js cuyo nombre usa el formato punteado, por ejemplo `/carrito/__next.carrito.__PAGE__.txt`, hacia el asset anidado `/carrito/__next.carrito/__PAGE__.txt`. La cadena de consulta, método, headers y body se conservan.

Antes de publicar:

```powershell
npm ci
npm run lint
npm test
npm run build
git diff --check
npx wrangler deploy --config wrangler.jsonc --dry-run --strict
```

Publica después de revisar el dry run:

```powershell
npx wrangler deploy --config wrangler.jsonc
```

Los headers de seguridad viven en `public/_headers` para que formen parte de la exportación estática. No guardar tokens ni secretos en el repositorio.

## Variables de entorno

```env
NEXT_PUBLIC_TELEGRAM_USERNAME=rootkit_spoofer
```

## Ramas

- `main` — producción (Cloudflare Workers)
- Ramas `feature/*` — desarrollo de cambios
