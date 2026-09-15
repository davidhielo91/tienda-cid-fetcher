# Tienda CID Fetcher

E-commerce para reventa de licencias originales Microsoft. Sin backend — todo estático con checkout vía Telegram.

## Tech Stack

| Área | Tecnología |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui (base-ui) |
| Lenguaje | TypeScript 5 |
| Fuentes | Inter (sans), JetBrains Mono |
| Íconos | lucide-react |
| Tests | Vitest (lógica de precios) |
| Linting | ESLint (eslint-config-next) |
| Deploy | Docker standalone en EasyPanel / Vercel |

## Arquitectura

- **Sin backend** — sin API routes, sin base de datos
- **Productos** hardcodeados en `src/lib/data.ts`
- **Precios por volumen** en `src/lib/pricing.ts` (4 tiers)
- **Carrito** persistido en `localStorage`
- **Checkout** = deep link a Telegram con el resumen del pedido

## Comandos

```bash
npm run dev          # dev server (puerto 3000)
npm run build        # build de producción (standalone)
npm test             # tests de Vitest (pricing)
npx tsc --noEmit     # solo type check
npm run lint         # ESLint
```

## Variables de entorno

```env
NEXT_PUBLIC_TELEGRAM_USERNAME=rootkit_spoofer
```

## Ramas

- `master` — producción (Vercel)
- `v2` — desarrollo activo
