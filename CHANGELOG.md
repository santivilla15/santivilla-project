# Changelog - Santivilla

## [1.1.0] - 2026-06-10

### 🍃 Nueva app: Camilia (dejar el azúcar)

Nueva mini-app móvil en `/azucar` para ayudar a dejar de comer azúcar:

- **Onboarding personalizado:** nombre, motivos para dejar el azúcar y gasto diario estimado en dulces.
- **Racha sin azúcar:** anillo de progreso con días limpios y cuenta atrás al próximo hito.
- **Modo SOS de antojos:** respiración guiada 4-7-8, distracciones aleatorias y registro de disparadores (estrés, aburrimiento, etc.).
- **Check-in diario:** estado de ánimo y registro de día limpio o recaída (sin culpa: una recaída solo reinicia la racha).
- **Progreso:** calendario de 4 semanas, estadísticas (dinero ahorrado, azúcar evitada, antojos vencidos) y 9 logros desbloqueables.
- **Aprende:** línea de tiempo de recuperación (día 0 a 90) y 8 consejos prácticos.
- **Privacidad total:** todos los datos se guardan en `localStorage` del dispositivo; no requiere cuenta ni servidor.
- **PWA instalable:** manifest propio (`/azucar-manifest.json`), pantalla completa y diseño mobile-first.

## [1.0.0] - 2024-12-07

### ✨ Nuevo Modelo de Comisiones (Opción 2)

**Cambio importante:** Se implementó un modelo de comisiones más justo y transparente.

#### Antes (Modelo 70/30):
- 70% a animales
- 30% fijo a plataforma

#### Ahora (Modelo Variable):
- **Comisión fija:** 1.50€ por transacción
- **Comisión variable:** 5% sobre el monto restante
- **Resultado:** ~95% a animales, ~5% a plataforma

### 📊 Ejemplos del Nuevo Modelo

| Monto Pagado | Va a Animales | Costos Plataforma | % Animales |
|--------------|---------------|-------------------|------------|
| 50€          | 46.08€        | 3.92€             | 92.2%      |
| 100€         | 93.58€        | 6.42€             | 93.6%      |
| 250€         | 236.43€       | 13.57€            | 94.6%      |
| 500€         | 475.68€       | 24.32€            | 95.1%      |
| 1000€        | 951.43€       | 48.57€            | 95.1%      |
| 2000€        | 1898.58€      | 101.42€           | 94.9%      |

**Nota:** Cuanto más donas, menor es el porcentaje que cobra Santivilla.

### 🎯 Características Implementadas

#### Frontend
- ✅ Landing page con diseño retro/gaming
- ✅ Formulario de boost con cálculo en tiempo real
- ✅ Página de ranking público (top 100)
- ✅ Página de transparencia con:
  - Gráfico de pastel interactivo
  - Tabla de ejemplos de cálculo
  - Explicación detallada del modelo
  - Estadísticas históricas

#### Backend
- ✅ API routes para Stripe Checkout
- ✅ Webhook de Stripe para procesar pagos
- ✅ API de ranking público
- ✅ API de estadísticas
- ✅ Integración con Supabase

#### Base de Datos
- ✅ Tabla `ranking_users` para scores
- ✅ Tabla `payments` con campos:
  - `fixed_fee` (1.50€)
  - `variable_fee` (5% variable)
  - `donation_amount`
  - `platform_amount`

#### Componentes
- ✅ `BoostForm` - Formulario de pago
- ✅ `StatsCards` - Tarjetas de estadísticas
- ✅ `PieChart` - Gráfico de pastel SVG
- ✅ `ExampleTable` - Tabla de ejemplos

### 📝 Documentación

- ✅ README.md completo
- ✅ CONFIGURACION.md - Guía rápida
- ✅ TESTING.md - Guía de pruebas
- ✅ Schema SQL completo
- ✅ Políticas RLS de Supabase
- ✅ Script de migración para bases de datos existentes

### 🐛 Correcciones

- ✅ Corregido input numérico (problema "0200")
- ✅ Mejorado manejo de errores
- ✅ Añadidas validaciones robustas
- ✅ Configuración de imágenes de Unsplash

### 🚀 Próximos Pasos Recomendados

1. **Configuración:**
   - Configurar Supabase (crear proyecto y ejecutar schema.sql)
   - Configurar Stripe (obtener claves de test)
   - Crear archivo `.env.local` con las credenciales

2. **Mejoras Futuras:**
   - Añadir videos de YouTube en página de impacto
   - Implementar múltiples rankings por categorías
   - Añadir autenticación para gestión de perfiles
   - Implementar notificaciones por email
   - Añadir analytics y métricas

3. **Producción:**
   - Configurar webhooks de Stripe en producción
   - Revisar y ajustar políticas RLS
   - Configurar dominio personalizado
   - Añadir certificado SSL

---

## Versión Anterior

### [0.1.0] - Inicial
- Estructura base del proyecto
- Modelo 70/30 original

