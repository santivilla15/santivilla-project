# ✅ Checklist de Producción - Santivilla

Usa esta checklist antes de desplegar a producción para asegurar que todo esté configurado correctamente.

## 🔴 CRÍTICO (Debe estar completo)

### Variables de Entorno

- [ ] `NEXT_PUBLIC_SITE_URL` configurado con URL de producción
- [ ] `NEXT_PUBLIC_SUPABASE_URL` configurado (proyecto de producción)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurado (clave de producción)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` configurado (clave de producción)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` configurado (clave **LIVE**, no test)
- [ ] `STRIPE_SECRET_KEY` configurado (clave **LIVE**, no test)
- [ ] `STRIPE_WEBHOOK_SECRET` configurado (webhook de producción)
- [ ] `ADMIN_TOKEN` configurado y seguro (cambiar del valor por defecto)

### Stripe

- [ ] Cuenta en modo **LIVE** (no test)
- [ ] Webhook configurado en Stripe Dashboard:
  - [ ] URL: `https://tu-dominio.com/api/webhook`
  - [ ] Evento: `checkout.session.completed`
  - [ ] Webhook secret copiado a variables de entorno
- [ ] Probar un pago real pequeño para verificar

### Supabase

- [ ] Proyecto de producción creado (o mismo proyecto verificado)
- [ ] `schema.sql` ejecutado en SQL Editor
- [ ] `policies.sql` ejecutado en SQL Editor
- [ ] Políticas RLS verificadas:
  - [ ] Lectura pública permitida para ranking
  - [ ] Lectura pública permitida para stats
  - [ ] Service Role Key puede escribir desde webhook
- [ ] Probar que el ranking se actualiza correctamente

### Seguridad

- [ ] `ADMIN_TOKEN` cambiado del valor por defecto
- [ ] Todas las claves son de producción (no test)
- [ ] `.env.local` NO está en el repositorio
- [ ] Variables de entorno configuradas en hosting
- [ ] HTTPS configurado y funcionando

---

## 🟡 IMPORTANTE (Recomendado antes de producción)

### PWA

- [ ] Iconos PWA creados (`icon-192.png`, `icon-512.png`)
- [ ] Manifest verificado en DevTools
- [ ] Service Worker funcionando
- [ ] App se puede instalar en móvil

### Email (Opcional pero recomendado)

- [ ] Servicio de email configurado (Resend/SendGrid)
- [ ] `RESEND_API_KEY` o equivalente configurado
- [ ] Emails de prueba enviados correctamente
- [ ] Integración en webhook verificada

### SEO

- [ ] `NEXT_PUBLIC_SITE_URL` correcto
- [ ] Sitemap accesible en `/sitemap.xml`
- [ ] Robots.txt accesible en `/robots.txt`
- [ ] Meta tags verificados
- [ ] Open Graph images (si las tienes)

### Testing

- [ ] Tests pasando (`npm test`)
- [ ] Build funciona (`npm run build`)
- [ ] No hay errores en consola
- [ ] Flujo de pago probado completamente
- [ ] Ranking se actualiza correctamente
- [ ] Estadísticas se muestran correctamente

---

## 🟢 OPCIONAL (Mejoras futuras)

### Analytics y Monitoreo

- [ ] Google Analytics configurado (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- [ ] Sentry configurado (`NEXT_PUBLIC_SENTRY_DSN`)
- [ ] Eventos de Analytics funcionando
- [ ] Errores se capturan en Sentry

### Performance

- [ ] Imágenes optimizadas
- [ ] Lazy loading funcionando
- [ ] Caché configurado correctamente
- [ ] Lighthouse score > 90

### Contenido

- [ ] Videos de YouTube agregados (si los tienes)
- [ ] FAQ completa y actualizada
- [ ] Textos revisados y sin errores
- [ ] Traducciones verificadas (ES, EN, DE)

---

## 🚀 Pasos Finales

### Antes de Desplegar

1. [ ] Ejecutar `npm run build` localmente
2. [ ] Verificar que no hay errores
3. [ ] Revisar todos los items críticos arriba

### Después de Desplegar

1. [ ] Verificar que el sitio carga correctamente
2. [ ] Probar flujo de pago completo
3. [ ] Verificar que el ranking funciona
4. [ ] Verificar que las estadísticas se muestran
5. [ ] Probar en diferentes navegadores
6. [ ] Probar en móvil
7. [ ] Verificar que PWA se puede instalar
8. [ ] Revisar logs de errores (Sentry)

### Monitoreo Continuo

- [ ] Revisar Sentry diariamente (primeras semanas)
- [ ] Revisar Google Analytics semanalmente
- [ ] Verificar que los pagos se procesan correctamente
- [ ] Revisar que el ranking se actualiza

---

## 📝 Notas

- **NUNCA** uses claves de test en producción
- **SIEMPRE** verifica que el webhook funciona antes de lanzar
- **MANTÉN** backups regulares de Supabase
- **REVISA** los logs regularmente

---

## 🆘 Si Algo Sale Mal

1. Revisa los logs del servidor
2. Verifica Sentry para errores
3. Revisa que todas las variables de entorno estén correctas
4. Verifica que Stripe webhook esté configurado
5. Revisa las políticas RLS de Supabase

---

**Última actualización**: Enero 2026

