# 🧪 Guía de Testing - Santivilla

Esta guía te ayudará a probar toda la funcionalidad de Santivilla localmente.

## ✅ Checklist de Verificación

### 1. Verificación Inicial

- [ ] El servidor inicia sin errores (`npm run dev`)
- [ ] La página principal carga correctamente
- [ ] Las tres páginas principales son accesibles (Home, Ranking, Impacto)
- [ ] El diseño es responsive en móvil y escritorio

### 2. Prueba del Formulario de Pago

#### Validaciones del Formulario:
- [ ] No permite enviar sin nombre
- [ ] No permite nombres muy cortos (< 2 caracteres)
- [ ] No permite nombres muy largos (> 50 caracteres)
- [ ] No permite montos menores a 1€
- [ ] No permite montos mayores a 10.000€
- [ ] Muestra el cálculo del 70/30 en tiempo real
- [ ] El botón se deshabilita cuando los datos son inválidos

### 3. Prueba del Flujo de Pago

1. **Iniciar un pago:**
   - Llena el formulario con un nombre válido (ej: "Test User")
   - Ingresa un monto (ej: 25€)
   - Haz clic en "Pagar"

2. **En Stripe Checkout:**
   - Verifica que el monto sea correcto
   - Usa la tarjeta de test: `4242 4242 4242 4242`
   - Fecha: cualquier fecha futura
   - CVC: cualquier 3 dígitos
   - Código postal: cualquier código

3. **Después del pago exitoso:**
   - [ ] Redirige a `/ranking?success=true`
   - [ ] Muestra mensaje de éxito verde
   - [ ] El ranking se actualiza con el nuevo usuario
   - [ ] El score es correcto (monto pagado en €)

4. **Cancelar un pago:**
   - Inicia un pago
   - Haz clic en "Cancelar" en Stripe
   - [ ] Redirige a `/?canceled=true`
   - [ ] Muestra mensaje amarillo de cancelación

### 4. Prueba del Ranking

- [ ] El ranking carga correctamente
- [ ] Se actualiza automáticamente cada 10 segundos
- [ ] Los usuarios aparecen ordenados por score descendente
- [ ] Los primeros 3 tienen emojis (🥇🥈🥉)
- [ ] Los primeros 3 tienen colores especiales
- [ ] El ranking muestra máximo 100 usuarios
- [ ] El formato de moneda es correcto (ej: 25.00 €)

### 5. Prueba de Múltiples Pagos

1. **Mismo usuario, múltiples pagos:**
   - Paga 25€ como "Test User"
   - Espera a que se procese (webhook)
   - Paga otros 15€ como "Test User"
   - [ ] El score de "Test User" es 40€ (suma de ambos)
   - [ ] Su posición en el ranking se actualiza

2. **Diferentes usuarios:**
   - Crea pagos con diferentes nombres
   - [ ] Cada usuario aparece por separado
   - [ ] El ranking se ordena correctamente

### 6. Prueba de la Página de Impacto

- [ ] La página carga correctamente
- [ ] Muestra el total recaudado correctamente
- [ ] Muestra el total donado (70%) correctamente
- [ ] Muestra el total de plataforma (30%) correctamente
- [ ] Las barras visuales muestran porcentajes correctos
- [ ] Los totales coinciden con la suma de todos los pagos
- [ ] Se actualiza cuando se hacen nuevos pagos

### 7. Prueba de Errores

#### Sin configuración de Supabase:
- [ ] El ranking muestra mensaje de error amigable
- [ ] La página de impacto muestra mensaje de error

#### Sin configuración de Stripe:
- [ ] El formulario muestra error al intentar crear sesión

#### Datos inválidos:
- [ ] Nombres con caracteres especiales inválidos son rechazados
- [ ] Montos decimales funcionan correctamente (ej: 25.50€)

## 🔧 Testing del Webhook

Para probar el webhook localmente, usa Stripe CLI:

```bash
# Instalar Stripe CLI
brew install stripe/stripe-cli/stripe

# Autenticarse
stripe login

# Escuchar eventos y reenviarlos a tu servidor local
stripe listen --forward-to localhost:3000/api/webhook
```

Esto te dará un webhook secret que debes añadir a `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

## 📊 Verificación de Datos en Supabase

### Verificar en la base de datos:

1. **Tabla `ranking_users`:**
   ```sql
   SELECT * FROM ranking_users ORDER BY score DESC;
   ```
   - Verifica que los scores sean correctos
   - Verifica que `updated_at` se actualiza en cada pago

2. **Tabla `payments`:**
   ```sql
   SELECT * FROM payments ORDER BY created_at DESC;
   ```
   - Verifica que cada pago esté registrado
   - Verifica que `donation_amount` = `total_amount * 0.7`
   - Verifica que `platform_amount` = `total_amount * 0.3`
   - Verifica que `donation_amount + platform_amount = total_amount`

3. **Verificar totales:**
   ```sql
   SELECT 
     SUM(total_amount) as total_recaudado,
     SUM(donation_amount) as total_donado,
     SUM(platform_amount) as total_plataforma
   FROM payments;
   ```
   - Estos deben coincidir con la página de impacto

## 🐛 Troubleshooting

### El webhook no se ejecuta:
- Verifica que Stripe CLI esté corriendo
- Verifica que el webhook secret esté correcto
- Revisa los logs del servidor para errores

### El ranking no se actualiza:
- Verifica que el webhook se esté ejecutando
- Verifica las políticas RLS en Supabase
- Revisa la consola del navegador para errores

### Los cálculos no coinciden:
- Verifica que no haya errores de redondeo
- Los cálculos se hacen con 2 decimales
- `donation_amount + platform_amount` puede no ser exactamente `total_amount` debido a redondeo

## ✅ Criterios de Éxito

El MVP está completo cuando:
- ✅ Todos los pagos se procesan correctamente
- ✅ El ranking se actualiza en tiempo real
- ✅ Las estadísticas son precisas
- ✅ La experiencia de usuario es fluida
- ✅ No hay errores en la consola
- ✅ El diseño es responsive

---

¡Feliz testing! 🚀

