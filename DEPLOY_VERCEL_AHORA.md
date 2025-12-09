# 🚀 Desplegar en Vercel - Guía Rápida

Ya tienes Supabase y Stripe configurados. Ahora solo falta desplegar en Vercel.

---

## ✅ Pre-requisitos Completados

- ✅ Supabase configurado
- ✅ Stripe configurado (modo LIVE)
- ✅ Código listo

---

## 🚀 Paso 1: Preparar Código (2 minutos)

```bash
# Asegúrate de que todo está commiteado
git add .
git commit -m "Preparado para producción"
git push origin main
```

---

## 🌐 Paso 2: Conectar con Vercel (5 minutos)

### 2.1 Crear Proyecto

1. Ve a https://vercel.com
2. Inicia sesión con GitHub/GitLab/Bitbucket
3. Haz clic en **Add New Project**
4. Selecciona tu repositorio `santivilla-project`
5. Vercel detectará Next.js automáticamente

### 2.2 Configurar Variables de Entorno

**ANTES de hacer clic en Deploy**, ve a **Environment Variables** y agrega:

**Supabase:**
```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ... (tu anon key)
SUPABASE_SERVICE_ROLE_KEY = eyJ... (tu service_role key)
```

**Stripe (LIVE):**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_xxxxx
STRIPE_SECRET_KEY = sk_live_xxxxx
```

**Otros:**
```
NEXT_PUBLIC_SITE_URL = https://tu-proyecto.vercel.app
ADMIN_TOKEN = santivilla-admin-2026-seguro (cambia esto)
```

**⚠️ IMPORTANTE:**
- Usa claves de **LIVE/PRODUCCIÓN** (no test)
- `NEXT_PUBLIC_SITE_URL` será la URL que Vercel te dé después
- `ADMIN_TOKEN` debe ser único y seguro

### 2.3 Desplegar

1. Haz clic en **Deploy**
2. Espera 2-5 minutos
3. Obtendrás una URL: `https://tu-proyecto.vercel.app`
4. **Copia esta URL** - la necesitarás para el webhook

---

## 🔄 Paso 3: Actualizar NEXT_PUBLIC_SITE_URL (2 minutos)

1. Ve a Vercel → **Settings** → **Environment Variables**
2. Encuentra `NEXT_PUBLIC_SITE_URL`
3. Actualízala con tu URL real de Vercel: `https://tu-proyecto.vercel.app`
4. Haz clic en **Save**
5. Ve a **Deployments** → Último deployment → **Redeploy**

---

## 🔔 Paso 4: Configurar Webhook de Stripe (5 minutos)

### 4.1 Crear Webhook

1. Ve a Stripe Dashboard → **Developers** → **Webhooks**
2. Haz clic en **Add endpoint**
3. **Endpoint URL:** `https://tu-proyecto.vercel.app/api/webhook`
   (usa tu URL real de Vercel)
4. **Description:** Santivilla Production Webhook
5. En **Events to send**, selecciona:
   - `checkout.session.completed`
6. Haz clic en **Add endpoint**

### 4.2 Obtener Signing Secret

1. Después de crear el endpoint, verás la página de detalles
2. En la sección **Signing secret**, haz clic en **Reveal**
3. Copia el secreto (empieza con `whsec_`)
   → Esta es tu `STRIPE_WEBHOOK_SECRET`

### 4.3 Agregar a Vercel

1. Ve a Vercel → **Settings** → **Environment Variables**
2. Agrega:
   ```
   STRIPE_WEBHOOK_SECRET = whsec_xxxxx
   ```
3. Haz clic en **Save**
4. Ve a **Deployments** → Último deployment → **Redeploy**

---

## ✅ Paso 5: Verificación (5 minutos)

### 5.1 Verificar Sitio

1. Visita tu URL de Vercel
2. Verifica que:
   - ✅ El sitio carga correctamente
   - ✅ No hay errores en consola (F12)
   - ✅ La navegación funciona
   - ✅ El ranking se muestra
   - ✅ Las estadísticas se cargan

### 5.2 Probar Flujo de Pago

1. Ve a la página principal
2. Llena el formulario:
   - Nombre: "Test User"
   - Monto: 10€
3. Haz clic en "Contribuir ahora"
4. En Stripe Checkout, usa tarjeta de prueba:
   - **Número:** 4242 4242 4242 4242
   - **Fecha:** Cualquier fecha futura
   - **CVC:** Cualquier 3 dígitos
   - **ZIP:** Cualquier código postal
5. Completa el pago
6. Verifica que:
   - ✅ Redirige a página de éxito
   - ✅ Apareces en el ranking
   - ✅ Las estadísticas se actualizan

### 5.3 Verificar Webhook

1. En Stripe Dashboard → **Developers** → **Webhooks**
2. Haz clic en tu endpoint
3. Ve a la pestaña **Events**
4. Deberías ver un evento `checkout.session.completed` reciente
5. Haz clic en el evento
6. Verifica que el estado sea **Succeeded** (verde)

---

## 🎉 ¡Listo!

Tu aplicación Santivilla está en producción y funcionando.

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

**Última actualización**: Enero 2026

