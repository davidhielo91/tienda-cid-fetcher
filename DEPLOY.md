# Despliegue

Runbook para publicar Tienda CID Fetcher.

## Estado verificado

- Objetivo de producción: Cloudflare Worker que sirve el sitio como assets estáticos.
- Dominios personalizados: `cidfetcher.de` y `www.cidfetcher.de`.
- Arquitectura frontend-only: sin backend ni API routes; checkout mediante Telegram.
- Variable requerida en el entorno de producción: `NEXT_PUBLIC_TELEGRAM_USERNAME`.
- No guardar secretos, tokens ni credenciales en el repositorio.
- `next.config.ts` genera una exportación estática en `out/`.
- `wrangler.jsonc` configura el Worker `tienda-cid-fetcher`, `./out`, el binding `ASSETS` y `src/worker.ts`.
- `public/_headers` conserva los headers de seguridad dentro de los assets publicados.
- `src/worker.ts` corrige únicamente las rutas RSC punteadas de Next.js antes de llamar a `ASSETS.fetch()`.

## Verificación previa

Ejecutar desde la raíz del repositorio:

```powershell
npm ci
npm run lint
npm test
npm run build
git diff --check
npx wrangler deploy --config wrangler.jsonc --dry-run --strict
```

En Windows PowerShell, ejecutar los mismos comandos desde la raíz del repositorio. `npm run build` debe crear `out/`; el dry run debe validar el bundle del Worker y sus assets sin publicar una versión.

Antes de liberar, revisar en Cloudflare Dashboard o mediante Cloudflare API el Worker, sus assets estáticos, la variable de entorno y los dominios personalizados. El `account_id` de Wrangler identifica la cuenta destino; no guardar tokens ni secretos en el repositorio.

## Publicación

Después de completar la verificación previa, publicar con:

```powershell
npx wrangler deploy --config wrangler.jsonc
```

Confirmar que la versión publicada responde en `cidfetcher.de` y `www.cidfetcher.de`. No ejecutar este comando durante una revisión que no autorice publicación.

## Rollback

Ante una versión defectuosa, restaurar en Cloudflare la última versión estable del Worker y verificar ambos dominios. Confirmar también que `NEXT_PUBLIC_TELEGRAM_USERNAME` sigue configurada antes de reabrir el tráfico.
