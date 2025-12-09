# 🔍 Configuración de Sentry para Error Tracking

Sentry está integrado en el proyecto para capturar y rastrear errores automáticamente en producción.

## 📋 Requisitos Previos

1. Crear una cuenta en [Sentry](https://sentry.io) (plan gratuito disponible)
2. Crear un nuevo proyecto en Sentry seleccionando "Next.js" como plataforma

## 🚀 Configuración

### 1. Obtener el DSN (Data Source Name)

1. Ve a tu proyecto en Sentry Dashboard
2. Ve a **Settings > Projects > [Tu Proyecto] > Client Keys (DSN)**
3. Copia el DSN (tiene formato: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

### 2. Configurar Variables de Entorno

Agrega el DSN a tu archivo `.env.local`:

```env
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx

# Opcional: Para mejor tracking de releases
NEXT_PUBLIC_APP_VERSION=1.0.0

# Opcional: Para configuración avanzada (solo servidor)
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_ORG=tu-organizacion
SENTRY_PROJECT=tu-proyecto
```

### 3. Para Producción

En tu plataforma de hosting (Vercel, Netlify, etc.), agrega las mismas variables de entorno:

- `NEXT_PUBLIC_SENTRY_DSN` (requerido)
- `NEXT_PUBLIC_APP_VERSION` (opcional, para tracking de versiones)
- `SENTRY_ORG` y `SENTRY_PROJECT` (opcional, para mejor integración)

## ✅ Verificación

1. Inicia el servidor: `npm run dev`
2. Genera un error intencionalmente (por ejemplo, accediendo a una ruta que no existe)
3. Ve a tu Dashboard de Sentry
4. Deberías ver el error capturado automáticamente

## 📊 Qué se Captura Automáticamente

- ✅ Errores no manejados en el cliente (browser)
- ✅ Errores en API routes (servidor)
- ✅ Errores en Server Components
- ✅ Errores en Edge Functions
- ✅ Stack traces completos
- ✅ Contexto del usuario (URL, user agent, etc.)
- ✅ Performance monitoring (traces)

## 🔧 Configuración Avanzada

Los archivos de configuración están en:
- `sentry.client.config.ts` - Configuración para el cliente (browser)
- `sentry.server.config.ts` - Configuración para el servidor (API routes)
- `sentry.edge.config.ts` - Configuración para Edge Runtime

Puedes modificar estos archivos para:
- Ajustar el `tracesSampleRate` (porcentaje de transacciones capturadas)
- Agregar más `ignoreErrors` (errores que no quieres capturar)
- Personalizar el `beforeSend` hook

## 💡 Notas

- En desarrollo, los errores también se muestran en la consola
- Sentry solo funciona si `NEXT_PUBLIC_SENTRY_DSN` está configurado
- Si no configuras Sentry, la aplicación funciona normalmente sin errores

## 📚 Recursos

- [Documentación de Sentry para Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Dashboard de Sentry](https://sentry.io)

