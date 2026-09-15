# Despliegue

Runbook para publicar Tienda CID Fetcher.

## Estado verificado

- Objetivo de producción: Cloudflare Worker que sirve el sitio como assets estáticos.
- Dominios personalizados: `cidfetcher.de` y `www.cidfetcher.de`.
- Arquitectura frontend-only: sin backend ni API routes; checkout mediante Telegram.
- Variable requerida en el entorno de producción: `NEXT_PUBLIC_TELEGRAM_USERNAME`.
- No guardar secretos, tokens ni credenciales en el repositorio.
- La configuración de despliegue se administra en Cloudflare. Este repositorio no contiene configuración de Wrangler.

## Verificación previa

Ejecutar desde la raíz del repositorio:

```bash
npm ci
npm run lint
npm test
npx tsc --noEmit
npm run build
git diff --check
```

Antes de liberar, revisar en Cloudflare Dashboard o mediante Cloudflare API el Worker, sus assets estáticos, la variable de entorno y los dominios personalizados. No asumir comandos, identificadores de recursos ni valores de configuración: este repositorio no documenta esos datos.

## Publicación

Usar el flujo autorizado de despliegue configurado en Cloudflare después de completar la verificación previa. Confirmar que la versión publicada responde en `cidfetcher.de` y `www.cidfetcher.de`.

## Rollback

Ante una versión defectuosa, restaurar en Cloudflare la última versión estable del Worker y verificar ambos dominios. Confirmar también que `NEXT_PUBLIC_TELEGRAM_USERNAME` sigue configurada antes de reabrir el tráfico.
