# 📋 Lista de Tareas Pendientes - Santivilla

Esta lista contiene las tareas que quedan por hacer para completar y mejorar el proyecto.

## 🔴 Urgente (Para que funcione)

- [ ] **Configurar Supabase**
  - Crear proyecto en [supabase.com](https://supabase.com)
  - Ejecutar `supabase/schema.sql` en SQL Editor
  - Ejecutar `supabase/policies.sql` para políticas RLS
  - Obtener URL y Anon Key
  - Añadir a `.env.local`

- [ ] **Configurar Stripe**
  - Crear cuenta en [stripe.com](https://stripe.com) (o iniciar sesión)
  - Obtener claves de **modo test** desde Dashboard > API keys
  - Añadir a `.env.local`:
    - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
    - `STRIPE_SECRET_KEY`

- [ ] **Crear archivo `.env.local`**
  ```bash
  cp .env.example .env.local
  # Editar con tus credenciales
  ```

## 🟡 Importante (Antes de producción)

- [ ] **Probar flujo completo de pago**
  - Realizar un pago de test con Stripe
  - Verificar que se guarda en Supabase
  - Verificar que el ranking se actualiza
  - Verificar que las estadísticas se calculan correctamente

- [ ] **Configurar webhook de Stripe para producción**
  - Configurar endpoint en Stripe Dashboard
  - Obtener webhook secret
  - Añadir a variables de entorno

- [ ] **Migrar base de datos existente (si aplica)**
  - Si tienes datos con el modelo anterior (70/30), ejecutar `supabase/migration.sql`

- [ ] **Revisar seguridad**
  - Verificar políticas RLS en Supabase
  - Asegurar que no se expongan claves secretas
  - Revisar validaciones de entrada

## 🟢 Mejoras Futuras

### Funcionalidades
- [ ] Añadir videos de YouTube en página de impacto
- [ ] Implementar múltiples rankings por categorías
- [ ] Añadir autenticación de usuarios
- [ ] Crear panel de administración
- [ ] Añadir notificaciones por email
- [ ] Implementar sistema de badges/logros

### UX/UI
- [ ] Añadir animaciones más suaves
- [ ] Mejorar diseño responsive en tablets
- [ ] Añadir modo oscuro/claro (opcional)
- [ ] Implementar loading skeletons
- [ ] Añadir tooltips informativos

### Técnico
- [ ] Añadir tests unitarios
- [ ] Añadir tests de integración
- [ ] Configurar CI/CD
- [ ] Añadir error tracking (Sentry, etc.)
- [ ] Implementar analytics (Google Analytics, Plausible)
- [ ] Optimizar imágenes (usar Next.js Image optimization)

### SEO y Marketing
- [ ] Configurar sitemap.xml
- [ ] Configurar robots.txt
- [ ] Añadir Open Graph images
- [ ] Mejorar meta descriptions
- [ ] Añadir structured data (JSON-LD)
- [ ] Crear página de FAQ

### Documentación
- [ ] Añadir más ejemplos de uso
- [ ] Crear guía de despliegue detallada
- [ ] Documentar API endpoints
- [ ] Crear diagramas de arquitectura

## 🎯 Objetivos a Largo Plazo

- [ ] Conseguir sponsors/patrocinadores
- [ ] Monetizar con YouTube/redes sociales
- [ ] Reducir comisiones a 2-3%
- [ ] Eventualmente llegar a 0% de comisión
- [ ] Expandir a más causas además de animales
- [ ] Crear app móvil (React Native)

## 📝 Notas

- Revisa `CHANGELOG.md` para ver el historial de cambios
- Revisa `TESTING.md` para guías de pruebas
- Revisa `CONFIGURACION.md` para setup inicial

---

**Última actualización:** 2024-12-07

