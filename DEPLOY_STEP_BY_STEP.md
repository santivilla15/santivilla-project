# 🚀 Guía Paso a Paso para Desplegar Santivilla

Esta guía te llevará paso a paso desde el desarrollo hasta producción.

---

## 📋 Pre-requisitos

- [ ] Cuenta en Vercel (o tu hosting preferido)
- [ ] Cuenta en Stripe (modo LIVE)
- [ ] Cuenta en Supabase
- [ ] Repositorio Git (GitHub, GitLab, etc.)

---

## Paso 1: Preparar el Código

### 1.1 Verificar que todo funciona

```bash
# Ejecutar tests
npm test

# Verificar build
npm run build

# Verificar preparación para producción
npm run verify:production
```

### 1.2 Crear iconos PWA

**Opción A: Con script (si tienes ImageMagick)**
```bash
./scripts/create-pwa-icons.sh path/to/your/logo.png
```

**Opción B: Con herramienta online**
1. Ve a https://realfavicongenerator.net/
2. Sube tu logo
3. Descarga los iconos
4. Coloca `icon-192.png` y `icon-512.png` en `/public/`

**Opción C: Manualmente**
- Crea imágenes de 192x192 y 512x512
- Guárdalas como `public/icon-192.png` y `public/icon-512.png`

### 1.3 Commit y Push

```bash
git add .
git commit -m "Preparado para producción"
git push origin main
```

---

## Paso 2: Configurar Supabase

### 2.1 Crear Proyecto de Producción

1. Ve a https://supabase.com
2. Crea un nuevo proyecto (o usa el existente)
3. Espera a que se configure (2-3 minutos)

### 2.2 Ejecutar Schema

1. Ve a **SQL Editor** en Supabase
2. Abre `supabase/schema.sql`
3. Copia y pega el contenido
4. Ejecuta el script
5. Verifica que las tablas se crearon:
   - `ranking_users`
   - `payments`

### 2.3 Ejecutar Políticas RLS

1. En **SQL Editor**, abre `supabase/policies.sql`
2. Copia y pega el contenido
3. Ejecuta el script
4. Verifica que las políticas se crearon

### 2.4 Obtener Claves

1. Ve a **Settings > API**
2. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (¡MANTÉNLA SECRETA!)

---

## Paso 3: Configurar Stripe

### 3.1 Cambiar a Modo LIVE

1. Ve a https://dashboard.stripe.com
2. Cambia de **Test mode** a **Live mode** (toggle superior derecha)
3. ⚠️ **IMPORTANTE**: Asegúrate de estar en modo LIVE

### 3.2 Obtener Claves LIVE

1. Ve a **Developers > API keys**
2. Copia:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY` (¡MANTÉNLA SECRETA!)

### 3.3 Configurar Webhook (Después del despliegue)

**Espera a tener la URL de producción primero**, luego:

1. Ve a **Developers > Webhooks**
2. Haz clic en **Add endpoint**
3. URL: `https://tu-dominio.com/api/webhook`
4. Eventos: Selecciona `checkout.session.completed`
5. Copia el **Signing secret** → `STRIPE_WEBHOOK_SECRET`

---

## Paso 4: Desplegar en Vercel

### 4.1 Conectar Repositorio

1. Ve a https://vercel.com
2. Inicia sesión con GitHub/GitLab
3. Haz clic en **Add New Project**
4. Selecciona tu repositorio `santivilla-project`
5. Vercel detectará Next.js automáticamente

### 4.2 Configurar Variables de Entorno

En la configuración del proyecto, ve a **Settings > Environment Variables** y agrega:

**Supabase:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

**Stripe (LIVE):**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

**Otros:**
```
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
ADMIN_TOKEN=tu_token_seguro_aqui
```

**Opcionales:**
```
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
```

### 4.3 Desplegar

1. Haz clic en **Deploy**
2. Espera 2-5 minutos
3. Obtendrás una URL: `https://tu-proyecto.vercel.app`

### 4.4 Configurar Dominio Personalizado (Opcional)

1. Ve a **Settings > Domains**
2. Agrega tu dominio
3. Sigue las instrucciones de DNS

---

## Paso 5: Configurar Webhook de Stripe

**Ahora que tienes la URL de producción:**

1. Ve a Stripe Dashboard > **Developers > Webhooks**
2. Haz clic en **Add endpoint**
3. URL: `https://tu-dominio.com/api/webhook`
4. Eventos: `checkout.session.completed`
5. Copia el **Signing secret**
6. Agrégalo a Vercel como `STRIPE_WEBHOOK_SECRET`
7. **Redeploy** el proyecto en Vercel

---

## Paso 6: Verificación Post-Despliegue

### 6.1 Verificar Sitio

- [ ] El sitio carga correctamente
- [ ] No hay errores en consola
- [ ] Las imágenes se cargan
- [ ] La navegación funciona

### 6.2 Verificar Funcionalidades

- [ ] El ranking se muestra
- [ ] Las estadísticas se cargan
- [ ] El formulario de pago funciona
- [ ] La página de FAQ funciona

### 6.3 Probar Flujo de Pago

1. Haz un pago de prueba pequeño (usa tarjeta de prueba de Stripe)
2. Verifica que:
   - [ ] El pago se procesa
   - [ ] Apareces en el ranking
   - [ ] Las estadísticas se actualizan
   - [ ] El webhook se ejecuta (revisa logs de Stripe)

### 6.4 Verificar PWA

1. Abre el sitio en móvil
2. Deberías ver opción "Agregar a pantalla de inicio"
3. Verifica que los iconos se muestran correctamente

---

## Paso 7: Monitoreo

### 7.1 Configurar Alertas

- [ ] Revisar Sentry diariamente (primeras semanas)
- [ ] Revisar Google Analytics semanalmente
- [ ] Verificar que los pagos se procesan

### 7.2 Mantenimiento

- [ ] Revisar logs regularmente
- [ ] Actualizar dependencias mensualmente
- [ ] Hacer backups de Supabase

---

## 🆘 Solución de Problemas

### El sitio no carga
- Verifica que el build fue exitoso
- Revisa los logs en Vercel
- Verifica las variables de entorno

### Los pagos no funcionan
- Verifica que estás usando claves LIVE
- Verifica que el webhook está configurado
- Revisa los logs del webhook en Stripe

### El ranking no se actualiza
- Verifica las políticas RLS en Supabase
- Verifica que `SUPABASE_SERVICE_ROLE_KEY` está configurada
- Revisa los logs del servidor

---

## ✅ Checklist Final

Antes de anunciar tu sitio:

- [ ] Todas las pruebas pasan
- [ ] El flujo de pago funciona
- [ ] El ranking se actualiza
- [ ] Las estadísticas se muestran
- [ ] PWA funciona correctamente
- [ ] No hay errores en consola
- [ ] Sentry captura errores
- [ ] Analytics funciona

---

## 🎉 ¡Listo!

Tu aplicación Santivilla está en producción y lista para recibir donaciones reales.

**¡Gracias por ayudar a los animales! 🐾**

---

**Última actualización**: Enero 2026

