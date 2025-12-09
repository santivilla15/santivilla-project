# 🚀 Guía de Despliegue a Producción - Santivilla

Esta guía te ayudará a desplegar tu aplicación Santivilla a producción de forma segura y completa.

## 📋 Tabla de Contenidos

1. [Preparación Pre-Despliegue](#preparación-pre-despliegue)
2. [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
3. [Configuración de Stripe para Producción](#configuración-de-stripe-para-producción)
4. [Configuración de Supabase para Producción](#configuración-de-supabase-para-producción)
5. [Despliegue en Vercel (Recomendado)](#despliegue-en-vercel-recomendado)
6. [Despliegue en Otras Plataformas](#despliegue-en-otras-plataformas)
7. [Verificación Post-Despliegue](#verificación-post-despliegue)
8. [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)

---

## 🔧 Preparación Pre-Despliegue

### 1. Verificar que todo funciona en desarrollo

```bash
# Ejecutar tests
npm test

# Verificar que el build funciona
npm run build

# Probar localmente
npm run dev
```

### 2. Revisar archivos importantes

- ✅ `.env.local` - Tiene todas las variables necesarias
- ✅ `next.config.ts` - Configuración correcta
- ✅ `package.json` - Scripts correctos
- ✅ Tests pasando

---

## 🔐 Configuración de Variables de Entorno

### Variables Requeridas

Crea un archivo `.env.production` o configura estas variables en tu plataforma de hosting:

```env
# URL del sitio en producción
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com

# Supabase (Producción)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_produccion
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_de_produccion

# Stripe (Producción - IMPORTANTE: Usa claves LIVE, no test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Sentry (Opcional pero recomendado)
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_ORG=tu-organizacion
SENTRY_PROJECT=tu-proyecto

# Google Analytics (Opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX

# Versión de la app (Opcional)
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### ⚠️ IMPORTANTE

- **NUNCA** uses claves de test en producción
- **NUNCA** commitees `.env.local` o `.env.production` al repositorio
- Usa claves **LIVE** de Stripe para producción
- Usa un proyecto **separado** de Supabase para producción (o al menos diferentes políticas RLS)

---

## 💳 Configuración de Stripe para Producción

### 1. Obtener Claves de Producción

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com)
2. Cambia de **Test mode** a **Live mode** (toggle en la esquina superior derecha)
3. Ve a **Developers > API keys**
4. Copia tus claves **LIVE**:
   - `pk_live_xxxxx` (Publishable key)
   - `sk_live_xxxxx` (Secret key)

### 2. Configurar Webhook de Producción

1. En Stripe Dashboard (Live mode), ve a **Developers > Webhooks**
2. Haz clic en **Add endpoint**
3. URL del endpoint: `https://tu-dominio.com/api/webhook`
4. Selecciona el evento: `checkout.session.completed`
5. Copia el **Signing secret** (empieza con `whsec_`)
6. Agrégalo a tus variables de entorno como `STRIPE_WEBHOOK_SECRET`

### 3. Verificar Webhook

1. Haz un pago de prueba pequeño en producción
2. Verifica en Stripe Dashboard que el webhook se envió correctamente
3. Verifica en tu aplicación que el usuario apareció en el ranking

---

## 🗄️ Configuración de Supabase para Producción

### Opción 1: Usar el mismo proyecto (Desarrollo)

⚠️ **NO RECOMENDADO** - Mezcla datos de desarrollo y producción

### Opción 2: Crear un proyecto separado (RECOMENDADO)

1. Crea un nuevo proyecto en [Supabase](https://supabase.com)
2. Ejecuta `supabase/schema.sql` en el SQL Editor
3. Ejecuta `supabase/policies.sql` para las políticas RLS
4. Obtén las nuevas claves:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (para el webhook)

### 3. Migrar datos (si es necesario)

Si tienes datos en desarrollo que quieres migrar:
1. Exporta los datos desde el proyecto de desarrollo
2. Importa los datos al proyecto de producción
3. Verifica que todo esté correcto

---

## 🚀 Despliegue en Vercel (Recomendado)

Vercel es la plataforma recomendada para Next.js porque está optimizada para este framework.

### 1. Preparar el Repositorio

```bash
# Asegúrate de que todo esté commiteado
git add .
git commit -m "Preparado para producción"
git push
```

### 2. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **Add New Project**
3. Conecta tu repositorio de GitHub/GitLab/Bitbucket
4. Selecciona el repositorio `santivilla-project`

### 3. Configurar el Proyecto

1. **Framework Preset**: Next.js (debería detectarse automáticamente)
2. **Root Directory**: `./` (o deja vacío si está en la raíz)
3. **Build Command**: `npm run build` (por defecto)
4. **Output Directory**: `.next` (por defecto)

### 4. Agregar Variables de Entorno

En la configuración del proyecto, ve a **Settings > Environment Variables** y agrega todas las variables de `.env.production`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SENTRY_DSN` (opcional)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (opcional)

### 5. Desplegar

1. Haz clic en **Deploy**
2. Espera a que el build termine (2-5 minutos)
3. Una vez completado, obtendrás una URL: `https://tu-proyecto.vercel.app`

### 6. Configurar Dominio Personalizado (Opcional)

1. Ve a **Settings > Domains**
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

---

## 🌐 Despliegue en Otras Plataformas

### Netlify

1. Conecta tu repositorio
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Agrega las variables de entorno en **Site settings > Environment variables**

### Railway

1. Conecta tu repositorio
2. Railway detectará Next.js automáticamente
3. Agrega las variables de entorno en **Variables**

### Render

1. Crea un nuevo **Web Service**
2. Conecta tu repositorio
3. Build command: `npm run build`
4. Start command: `npm start`
5. Agrega las variables de entorno

---

## ✅ Verificación Post-Despliegue

### 1. Verificar que el sitio carga

- ✅ La página principal carga correctamente
- ✅ No hay errores en la consola del navegador
- ✅ Las imágenes se cargan correctamente

### 2. Verificar funcionalidades

- ✅ El ranking se muestra correctamente
- ✅ La página de transparencia funciona
- ✅ El formulario de pago se muestra

### 3. Probar el flujo de pago

1. Haz un pago de prueba pequeño (usa una tarjeta de prueba de Stripe)
2. Verifica que:
   - ✅ El pago se procesa correctamente
   - ✅ El usuario aparece en el ranking
   - ✅ Las estadísticas se actualizan
   - ✅ El webhook se ejecuta correctamente

### 4. Verificar Sentry

1. Genera un error intencional (accede a una ruta que no existe)
2. Verifica en Sentry Dashboard que el error se capturó

### 5. Verificar Analytics

1. Visita varias páginas
2. Verifica en Google Analytics que los eventos se registran

---

## 📊 Monitoreo y Mantenimiento

### Checklist Diario/Semanal

- [ ] Revisar errores en Sentry
- [ ] Verificar que los pagos se procesan correctamente
- [ ] Revisar las estadísticas de Google Analytics
- [ ] Verificar que el ranking se actualiza correctamente

### Checklist Mensual

- [ ] Revisar y actualizar dependencias
- [ ] Verificar que las políticas RLS de Supabase siguen siendo correctas
- [ ] Revisar los logs del servidor
- [ ] Verificar que los backups de Supabase están funcionando

---

## 🆘 Solución de Problemas Comunes

### Error: "No se encontró la firma de Stripe"

**Solución:**
- Verifica que `STRIPE_WEBHOOK_SECRET` esté configurado correctamente
- Asegúrate de que el webhook en Stripe apunte a la URL correcta de producción

### Error: "Error al obtener el ranking"

**Solución:**
- Verifica que las políticas RLS en Supabase permitan lectura pública
- Verifica que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` sean correctos

### Error: "Error al crear la sesión de pago"

**Solución:**
- Verifica que estás usando claves **LIVE** de Stripe (no test)
- Verifica que `STRIPE_SECRET_KEY` esté configurado correctamente

### Los eventos no aparecen en Sentry

**Solución:**
- Verifica que `NEXT_PUBLIC_SENTRY_DSN` esté configurado
- Verifica que el servidor se haya reiniciado después de agregar Sentry

---

## 📝 Notas Finales

- **Siempre** prueba en un entorno de staging antes de producción
- **Nunca** uses claves de test en producción
- **Mantén** backups regulares de tu base de datos
- **Monitorea** los errores regularmente en Sentry
- **Revisa** las métricas de Google Analytics periódicamente

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu aplicación estará en producción y lista para recibir donaciones reales.

**¡Gracias por ayudar a los animales! 🐾**

