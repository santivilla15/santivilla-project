# 🔐 Panel de Administración - Santivilla

Este documento explica cómo usar el panel de administración de Santivilla.

## 📍 Acceso

El panel de administración está disponible en:
- Español: `/admin`
- Inglés: `/en/admin`
- Alemán: `/de/admin`

## 🔑 Autenticación

El panel usa un sistema de autenticación simple basado en tokens.

### Configuración

1. Agrega una variable de entorno `ADMIN_TOKEN` en tu `.env.local`:

```env
ADMIN_TOKEN=santivilla-admin-2026
```

**⚠️ IMPORTANTE**: Cambia este token por uno seguro y único en producción.

### Uso

1. Accede a `/admin` en tu navegador
2. Se te pedirá ingresar el token de administración
3. El token se guarda en `localStorage` para futuras visitas
4. Si el token es inválido, se te pedirá ingresarlo nuevamente

## 📊 Funcionalidades

### Estadísticas Generales

El panel muestra:
- **Total de Donaciones**: Número total de pagos procesados
- **Monto Total Recaudado**: Suma de todos los pagos
- **Total Donado a Animales**: Monto que fue a los refugios
- **Total Plataforma**: Comisiones de la plataforma
- **Donantes Únicos**: Número de usuarios diferentes que han donado
- **Donación Promedio**: Promedio de cada donación

### Pagos Recientes

Muestra los últimos 20 pagos con:
- Fecha y hora
- Nombre del donante
- Monto total
- Monto donado
- Comisión de plataforma

## 🔄 Actualización Automática

Las estadísticas se actualizan automáticamente cada 30 segundos.

## 🛡️ Seguridad

### Recomendaciones

1. **Cambia el token por defecto**: No uses `santivilla-admin-2026` en producción
2. **Usa HTTPS**: Asegúrate de que el panel solo sea accesible por HTTPS
3. **Restringe acceso**: Considera agregar restricción por IP en producción
4. **No compartas el token**: Mantén el token seguro y no lo compartas

### Mejoras Futuras

- Autenticación con Supabase Auth
- Roles y permisos
- Logs de acceso
- 2FA (autenticación de dos factores)

## 🐛 Solución de Problemas

### "Token inválido"

- Verifica que `ADMIN_TOKEN` esté configurado en `.env.local`
- Asegúrate de usar el mismo token que configuraste
- Limpia `localStorage` y vuelve a ingresar el token

### "Error al cargar datos"

- Verifica que Supabase esté configurado correctamente
- Revisa los logs del servidor para más detalles
- Asegúrate de que las tablas `payments` y `ranking_users` existan

### Las estadísticas no se actualizan

- Verifica la conexión a Supabase
- Revisa que las políticas RLS permitan lectura
- Comprueba los logs del servidor

## 📝 Notas

- El panel NO está indexado por los motores de búsqueda (`robots: noindex`)
- Las estadísticas se calculan en tiempo real desde la base de datos
- El panel es responsive y funciona en móviles

---

**Última actualización**: Enero 2026

