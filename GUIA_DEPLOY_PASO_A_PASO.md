# 🚀 Guía de Despliegue Paso a Paso - Opción B

## ✅ Paso 1: Verificación Inicial

**Estado:** ✅ Completado
- Tests: 26/26 pasando
- Build: Funcional
- Archivos críticos: Presentes

**Solo falta:** Iconos PWA (opcional, no bloquea)

---

## 🎨 Paso 2: Crear Iconos PWA (5 minutos)

### Opción A: Herramienta Online (Más Fácil)

1. **Ve a:** https://realfavicongenerator.net/
2. **Sube una imagen:**
   - Puede ser un logo simple
   - O incluso un emoji 🐾 en un fondo de color
   - Mínimo 512x512 píxeles
3. **Configura:**
   - Deja las opciones por defecto
   - Solo necesitas los iconos Android
4. **Descarga:**
   - Descarga el paquete ZIP
   - Extrae `android-chrome-192x192.png` → renómbralo a `icon-192.png`
   - Extrae `android-chrome-512x512.png` → renómbralo a `icon-512.png`
5. **Coloca en:**
   ```
   public/
     ├── icon-192.png
     └── icon-512.png
   ```

### Opción B: Crear Manualmente

1. Crea una imagen de 512x512 con:
   - Texto "SANTIVILLA" o emoji 🐾
   - Fondo de color (#1A3A52 o #FF6B6B)
2. Redimensiona a 192x192 y guarda como `icon-192.png`
3. Guarda la original como `icon-512.png`
4. Coloca ambos en `/public/`

**✅ Verificación:** Ejecuta `npm run verify:production` - no debería mostrar advertencias de iconos

---

## 🗄️ Paso 3: Configurar Supabase (10 minutos)

### 3.1 Crear Proyecto

1. Ve a https://supabase.com
2. Inicia sesión o crea cuenta
3. Haz clic en **New Project**
4. Completa:
   - **Name:** Santivilla Production
   - **Database Password:** (elige una segura, guárdala)
   - **Region:** Elige la más cercana
5. Haz clic en **Create new project**
6. Espera 2-3 minutos a que se configure

### 3.2 Ejecutar Schema

1. En el dashboard de Supabase, ve a **SQL Editor** (menú lateral)
2. Haz clic en **New query**
3. Abre el archivo `supabase/schema.sql` de tu proyecto
4. Copia TODO el contenido
5. Pégalo en el SQL Editor
6. Haz clic en **Run** (o presiona Cmd/Ctrl + Enter)
7. Verifica que aparezca "Success. No rows returned"
8. Verifica que las tablas se crearon:
   - Ve a **Table Editor**
   - Deberías ver: `ranking_users` y `payments`

### 3.3 Ejecutar Políticas RLS

1. En **SQL Editor**, haz clic en **New query**
2. Abre el archivo `supabase/policies.sql`
3. Copia TODO el contenido
4. Pégalo en el SQL Editor
5. Haz clic en **Run**
6. Verifica que aparezca "Success"

### 3.4 Obtener Claves

1. Ve a **Settings** (icono de engranaje) → **API**
2. Encuentra estas secciones y copia:

**Project URL:**
```
https://xxxxx.supabase.co
```
→ Esta es tu `NEXT_PUBLIC_SUPABASE_URL`

**Project API keys:**
- **anon public** (la clave larga que empieza con `eyJ...`)
  → Esta es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **service_role** (¡CUIDADO! Esta es secreta, nunca la expongas)
  → Esta es tu `SUPABASE_SERVICE_ROLE_KEY`

**✅ Anota estas 3 claves, las necesitarás en Vercel**

---

## 💳 Paso 4: Configurar Stripe LIVE (10 minutos)

### 4.1 Cambiar a Modo LIVE

1. Ve a https://dashboard.stripe.com
2. **MUY IMPORTANTE:** En la esquina superior derecha, verás un toggle que dice "Test mode"
3. **Haz clic para cambiar a "Live mode"**
4. Confirma el cambio
5. ⚠️ **VERIFICA** que ahora dice "Live mode" (no Test mode)

### 4.2 Obtener Claves LIVE

1. Ve a **Developers** → **API keys**
2. Verás dos claves:

**Publishable key:**
```
pk_live_xxxxxxxxxxxxx
```
→ Esta es tu `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

**Secret key:**
```
sk_live_xxxxxxxxxxxxx
```
→ Esta es tu `STRIPE_SECRET_KEY`
⚠️ **CUIDADO:** Esta es secreta, nunca la expongas

**✅ Anota estas 2 claves, las necesitarás en Vercel**

### 4.3 Nota sobre Webhook

El webhook lo configurarás DESPUÉS de desplegar (necesitas la URL de producción primero).

---

## 🚀 Paso 5: Desplegar en Vercel (10 minutos)

### 5.1 Preparar Repositorio

```bash
# Asegúrate de que todo está commiteado
git add .
git commit -m "Preparado para producción"
git push origin main
```

### 5.2 Conectar con Vercel

1. Ve a https://vercel.com
2. Inicia sesión con GitHub/GitLab/Bitbucket
3. Haz clic en **Add New Project**
4. Selecciona tu repositorio `santivilla-project`
5. Vercel detectará Next.js automáticamente

### 5.3 Configurar Variables de Entorno

**ANTES de hacer clic en Deploy**, ve a **Environment Variables** y agrega:

**Supabase:**
```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ... (clave anon)
SUPABASE_SERVICE_ROLE_KEY = eyJ... (clave service_role)
```

**Stripe (LIVE):**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_xxxxx
STRIPE_SECRET_KEY = sk_live_xxxxx
```

**Otros:**
```
NEXT_PUBLIC_SITE_URL = https://tu-proyecto.vercel.app
ADMIN_TOKEN = santivilla-admin-2026-seguro (cambia esto por algo único)
```

**Opcionales (si los tienes):**
```
NEXT_PUBLIC_SENTRY_DSN = https://xxxxx@sentry.io/xxxxx
NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXX
```

**✅ IMPORTANTE:**
- Asegúrate de que todas las claves sean de **LIVE/PRODUCCIÓN** (no test)
- `ADMIN_TOKEN` debe ser único y seguro
- `NEXT_PUBLIC_SITE_URL` será la URL que Vercel te dé después del deploy

### 5.4 Desplegar

1. Haz clic en **Deploy**
2. Espera 2-5 minutos
3. Verás una URL: `https://tu-proyecto.vercel.app`
4. **Copia esta URL** - la necesitarás para el webhook

### 5.5 Actualizar NEXT_PUBLIC_SITE_URL

1. Ve a **Settings** → **Environment Variables**
2. Encuentra `NEXT_PUBLIC_SITE_URL`
3. Actualízala con tu URL real de Vercel
4. Haz clic en **Save**
5. Ve a **Deployments** → **Redeploy** (último deployment) → **Redeploy**

---

## 🔔 Paso 6: Configurar Webhook de Stripe (5 minutos)

### 6.1 Crear Webhook en Stripe

1. Ve a Stripe Dashboard → **Developers** → **Webhooks**
2. Haz clic en **Add endpoint**
3. **Endpoint URL:** `https://tu-proyecto.vercel.app/api/webhook`
   (usa la URL real de tu Vercel)
4. **Description:** Santivilla Production Webhook
5. En **Events to send**, busca y selecciona:
   - `checkout.session.completed`
6. Haz clic en **Add endpoint**

### 6.2 Obtener Signing Secret

1. Después de crear el endpoint, verás la página de detalles
2. En la sección **Signing secret**, haz clic en **Reveal**
3. Copia el secreto (empieza con `whsec_`)
   → Esta es tu `STRIPE_WEBHOOK_SECRET`

### 6.3 Agregar a Vercel

1. Ve a Vercel → **Settings** → **Environment Variables**
2. Agrega:
   ```
   STRIPE_WEBHOOK_SECRET = whsec_xxxxx
   ```
3. Haz clic en **Save**
4. Ve a **Deployments** → **Redeploy** (último deployment) → **Redeploy**

---

## ✅ Paso 7: Verificación Final (5 minutos)

### 7.1 Verificar Sitio

1. Visita tu URL de Vercel
2. Verifica que:
   - ✅ El sitio carga correctamente
   - ✅ No hay errores en consola (F12)
   - ✅ La navegación funciona
   - ✅ El ranking se muestra
   - ✅ Las estadísticas se cargan

### 7.2 Probar Flujo de Pago

1. Ve a la página principal
2. Llena el formulario con:
   - Nombre: "Test User"
   - Monto: 10€ (o mínimo)
3. Haz clic en "Contribuir ahora"
4. En Stripe Checkout, usa una tarjeta de prueba:
   - **Número:** 4242 4242 4242 4242
   - **Fecha:** Cualquier fecha futura
   - **CVC:** Cualquier 3 dígitos
   - **ZIP:** Cualquier código postal
5. Completa el pago
6. Verifica que:
   - ✅ Redirige a la página de éxito
   - ✅ Apareces en el ranking
   - ✅ Las estadísticas se actualizan

### 7.3 Verificar Webhook

1. En Stripe Dashboard → **Developers** → **Webhooks**
2. Haz clic en tu endpoint
3. Ve a la pestaña **Events**
4. Deberías ver un evento `checkout.session.completed` reciente
5. Haz clic en el evento
6. Verifica que el estado sea **Succeeded** (verde)

---

## 🎉 ¡Listo!

Tu aplicación Santivilla está en producción y funcionando.

### Próximos Pasos Opcionales:

1. **Configurar dominio personalizado** (Vercel → Settings → Domains)
2. **Configurar emails** (ver `EMAIL_SETUP.md`)
3. **Agregar videos de YouTube** (cuando los tengas)
4. **Monitorear** (revisar Sentry y Analytics regularmente)

---

## 🆘 Si Algo No Funciona

### El sitio no carga
- Revisa los logs en Vercel (Deployments → último deployment → Logs)
- Verifica que todas las variables de entorno estén correctas

### Los pagos no funcionan
- Verifica que estás usando claves **LIVE** (no test)
- Verifica que el webhook está configurado
- Revisa los logs del webhook en Stripe

### El ranking no se actualiza
- Verifica que `SUPABASE_SERVICE_ROLE_KEY` está configurada
- Revisa los logs en Vercel
- Verifica las políticas RLS en Supabase

---

**¡Gracias por ayudar a los animales! 🐾**

---

**Última actualización**: Enero 2026

