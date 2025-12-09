# ✅ Checklist de Despliegue Rápido

Usa este checklist mientras despliegas. Marca cada paso cuando lo completes.

---

## 🗄️ SUPABASE

### Crear Proyecto
- [ ] Ir a https://supabase.com
- [ ] Crear nuevo proyecto "Santivilla Production"
- [ ] Esperar 2-3 minutos a que se configure

### Ejecutar Schema
- [ ] Ir a SQL Editor
- [ ] Copiar contenido de `supabase/schema.sql`
- [ ] Pegar y ejecutar (Run)
- [ ] Verificar "Success"
- [ ] Verificar tablas creadas (Table Editor → deberías ver `ranking_users` y `payments`)

### Ejecutar Políticas
- [ ] En SQL Editor, nueva query
- [ ] Copiar contenido de `supabase/policies.sql`
- [ ] Pegar y ejecutar (Run)
- [ ] Verificar "Success"

### Obtener Claves
- [ ] Ir a Settings → API
- [ ] Copiar **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copiar **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Copiar **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (¡SECRETO!)

**✅ Anota estas 3 claves**

---

## 💳 STRIPE

### Cambiar a LIVE
- [ ] Ir a https://dashboard.stripe.com
- [ ] **VERIFICAR:** Cambiar toggle a "Live mode" (no Test)
- [ ] Confirmar cambio
- [ ] **VERIFICAR:** Dice "Live mode" en la esquina superior

### Obtener Claves LIVE
- [ ] Ir a Developers → API keys
- [ ] Copiar **Publishable key** (`pk_live_...`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Copiar **Secret key** (`sk_live_...`) → `STRIPE_SECRET_KEY` (¡SECRETO!)

**✅ Anota estas 2 claves**

**⏸️ Webhook lo haremos después del deploy**

---

## 🚀 VERCEL

### Preparar Código
- [ ] `git add .`
- [ ] `git commit -m "Preparado para producción"`
- [ ] `git push origin main`

### Conectar Repositorio
- [ ] Ir a https://vercel.com
- [ ] Iniciar sesión con GitHub/GitLab
- [ ] Add New Project
- [ ] Seleccionar repositorio `santivilla-project`

### Configurar Variables de Entorno
Agregar en Vercel → Settings → Environment Variables:

**Supabase:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = (tu Project URL)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (tu anon key)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` = (tu service_role key)

**Stripe:**
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
- [ ] `STRIPE_SECRET_KEY` = `sk_live_...`

**Otros:**
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://tu-proyecto.vercel.app` (lo actualizarás después)
- [ ] `ADMIN_TOKEN` = (elige un token seguro, ej: `santivilla-admin-2026-xxxxx`)

### Desplegar
- [ ] Clic en Deploy
- [ ] Esperar 2-5 minutos
- [ ] Copiar URL: `https://tu-proyecto.vercel.app`

### Actualizar URL
- [ ] Settings → Environment Variables
- [ ] Actualizar `NEXT_PUBLIC_SITE_URL` con tu URL real
- [ ] Save
- [ ] Deployments → Redeploy

---

## 🔔 WEBHOOK STRIPE

### Crear Webhook
- [ ] Stripe Dashboard → Developers → Webhooks
- [ ] Add endpoint
- [ ] URL: `https://tu-proyecto.vercel.app/api/webhook`
- [ ] Evento: `checkout.session.completed`
- [ ] Add endpoint

### Obtener Secret
- [ ] Clic en el endpoint creado
- [ ] Signing secret → Reveal
- [ ] Copiar `whsec_...` → `STRIPE_WEBHOOK_SECRET`

### Agregar a Vercel
- [ ] Vercel → Settings → Environment Variables
- [ ] Agregar `STRIPE_WEBHOOK_SECRET` = `whsec_...`
- [ ] Save
- [ ] Deployments → Redeploy

---

## ✅ VERIFICACIÓN

### Sitio
- [ ] Visitar URL de Vercel
- [ ] Verificar que carga correctamente
- [ ] Verificar ranking se muestra
- [ ] Verificar estadísticas se cargan

### Pago de Prueba
- [ ] Llenar formulario (nombre: "Test", monto: 10€)
- [ ] Usar tarjeta de prueba: 4242 4242 4242 4242
- [ ] Completar pago
- [ ] Verificar que apareces en ranking
- [ ] Verificar estadísticas actualizadas

### Webhook
- [ ] Stripe → Webhooks → Tu endpoint → Events
- [ ] Verificar evento `checkout.session.completed` reciente
- [ ] Verificar estado "Succeeded" (verde)

---

## 🎉 ¡LISTO!

Tu aplicación está en producción.

### Próximos Pasos Opcionales:
- [ ] Crear iconos PWA (ver `PWA_ICONS_GUIDE.md`)
- [ ] Configurar dominio personalizado
- [ ] Configurar emails (ver `EMAIL_SETUP.md`)

---

**Última actualización**: Enero 2026

