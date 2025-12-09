# ⚡ Inicio Rápido - Santivilla

Guía rápida para empezar con Santivilla.

## 🚀 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales

# Iniciar servidor de desarrollo
npm run dev

# En otra terminal, iniciar webhook de Stripe (si lo necesitas)
stripe listen --forward-to localhost:3000/api/webhook
```

## 📝 Configuración Inicial

1. **Stripe**: Ver `STRIPE_SETUP.md`
2. **Supabase**: Ver `SUPABASE_SETUP.md`
3. **Sentry**: Ver `SENTRY_SETUP.md` (opcional)

## ✅ Verificación

```bash
# Verificar Stripe
npm run verify:stripe

# Verificar preparación para producción
npm run verify:production

# Ejecutar tests
npm test
```

## 🎨 Crear Iconos PWA

```bash
# Con ImageMagick instalado
npm run create-icons path/to/logo.png

# O usa herramienta online
# https://realfavicongenerator.net/
```

## 🚀 Desplegar

Ver `DEPLOY_STEP_BY_STEP.md` para guía completa.

Resumen rápido:
1. Push a Git
2. Conectar con Vercel
3. Configurar variables de entorno
4. Desplegar
5. Configurar webhook de Stripe

## 📚 Documentación Completa

- `README_FINAL.md` - Resumen del proyecto
- `DEPLOY_STEP_BY_STEP.md` - Guía de despliegue
- `PRODUCTION_CHECKLIST.md` - Checklist de producción
- `DEPLOYMENT.md` - Guía técnica de despliegue

---

**¿Necesitas ayuda?** Revisa la documentación o ejecuta `npm run verify:production`

