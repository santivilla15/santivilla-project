# 🔌 Guía de Configuración de Stripe - Santivilla

Esta guía te ayudará a configurar Stripe paso a paso para que los pagos funcionen correctamente.

## 📋 Paso 1: Crear cuenta en Stripe

1. Ve a [https://stripe.com](https://stripe.com)
2. Crea una cuenta (o inicia sesión si ya tienes una)
3. Completa la información de tu negocio

## 🔑 Paso 2: Obtener las Claves API

### Para Desarrollo (Modo Test):

1. En el Dashboard de Stripe, ve a **Developers** → **API keys**
2. Asegúrate de estar en **Test mode** (toggle en la esquina superior derecha)
3. Copia las siguientes claves:
   - **Publishable key** (empieza con `pk_test_...`)
   - **Secret key** (empieza con `sk_test_...`) - Haz clic en "Reveal test key"

### Para Producción:

1. Cambia a **Live mode** en el Dashboard
2. Copia las claves **Live** (empiezan con `pk_live_...` y `sk_live_...`)

## ⚙️ Paso 3: Configurar Variables de Entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Agrega las siguientes variables:

```env
# Stripe Configuration (modo test para desarrollo)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica_aqui
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta_aqui

# Webhook Secret (se obtiene en el paso 4)
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_aqui
```

3. **IMPORTANTE**: Reinicia el servidor después de agregar las variables:
   ```bash
   npm run dev
   ```

## 🔔 Paso 4: Configurar Webhook (Para Producción)

### En Desarrollo (Local):

Para probar webhooks localmente, usa **Stripe CLI**:

1. Instala Stripe CLI:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # O descarga desde: https://stripe.com/docs/stripe-cli
   ```

2. Inicia sesión:
   ```bash
   stripe login
   ```

3. Reenvía eventos al servidor local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

4. Copia el webhook secret que aparece (empieza con `whsec_...`) y agrégalo a `.env.local`

### En Producción:

1. En el Dashboard de Stripe, ve a **Developers** → **Webhooks**
2. Haz clic en **Add endpoint**
3. Ingresa la URL: `https://tu-dominio.com/api/webhook`
4. Selecciona el evento: `checkout.session.completed`
5. Haz clic en **Add endpoint**
6. Copia el **Signing secret** (empieza con `whsec_...`) y agrégalo a `.env.local` en producción

## ✅ Paso 5: Verificar la Conexión

Ejecuta el script de verificación:

```bash
npm run verify:stripe
```

O manualmente, verifica que:

1. Las claves estén configuradas correctamente
2. El servidor se inicie sin errores
3. Puedas crear una sesión de checkout (prueba con el formulario)

## 🧪 Paso 6: Probar un Pago

### Tarjetas de Prueba (Modo Test):

Usa estas tarjetas para probar:

- **Pago exitoso**: `4242 4242 4242 4242`
- **Pago rechazado**: `4000 0000 0000 0002`
- **Requiere autenticación 3D Secure**: `4000 0025 0000 3155`

**Cualquier fecha futura y CVC de 3 dígitos funcionará**

### Flujo de Prueba:

1. Ve a la página principal (`http://localhost:3000`)
2. Llena el formulario con:
   - Nombre: "Test User"
   - Monto: 25.00
3. Haz clic en "Pagar"
4. Deberías ser redirigido a Stripe Checkout
5. Usa la tarjeta de prueba `4242 4242 4242 4242`
6. Completa el pago
7. Deberías ser redirigido a `/ranking?success=true`
8. Verifica que el usuario aparezca en el ranking

## 🐛 Solución de Problemas

### Error: "STRIPE_SECRET_KEY no está configurada"

- Verifica que el archivo `.env.local` existe
- Verifica que las variables empiecen con `NEXT_PUBLIC_` si son públicas
- Reinicia el servidor después de cambiar `.env.local`

### Error: "Error al crear la sesión de pago"

- Verifica que las claves sean correctas
- Verifica que uses claves de **modo test** en desarrollo
- Revisa los logs del servidor para más detalles

### El webhook no funciona

- En desarrollo: Asegúrate de tener Stripe CLI corriendo
- En producción: Verifica que la URL del webhook sea correcta
- Verifica que el webhook secret esté configurado

### El pago se completa pero no aparece en el ranking

- Verifica que el webhook esté configurado correctamente
- Revisa los logs del servidor en `/api/webhook`
- Verifica que Supabase esté configurado correctamente

## 📚 Recursos Adicionales

- [Documentación de Stripe](https://stripe.com/docs)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Testing con Stripe](https://stripe.com/docs/testing)

---

¿Necesitas ayuda? Revisa los logs del servidor o consulta la documentación de Stripe.

