# 📧 Configuración de Emails - Santivilla

Esta guía explica cómo configurar el sistema de notificaciones por email.

## 📋 Servicios Recomendados

### 1. Resend (Recomendado)
- **Ventajas**: Fácil de usar, buen free tier, perfecto para Next.js
- **Precio**: 3,000 emails/mes gratis
- **URL**: https://resend.com

### 2. SendGrid
- **Ventajas**: Muy confiable, ampliamente usado
- **Precio**: 100 emails/día gratis
- **URL**: https://sendgrid.com

### 3. AWS SES
- **Ventajas**: Muy económico, escalable
- **Precio**: $0.10 por 1,000 emails
- **URL**: https://aws.amazon.com/ses

## 🚀 Configuración con Resend (Recomendado)

### Paso 1: Crear cuenta en Resend

1. Ve a https://resend.com
2. Crea una cuenta
3. Verifica tu email

### Paso 2: Obtener API Key

1. Ve a **API Keys** en el dashboard
2. Crea una nueva API key
3. Copia la clave (empieza con `re_`)

### Paso 3: Configurar dominio (Opcional pero recomendado)

1. Ve a **Domains**
2. Agrega tu dominio (ej: `santivilla.com`)
3. Configura los registros DNS según las instrucciones
4. Espera a que se verifique (puede tardar hasta 24 horas)

### Paso 4: Instalar dependencia

```bash
npm install resend
```

### Paso 5: Agregar variable de entorno

Agrega a `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Paso 6: Implementar en el código

Actualiza `lib/utils/email.ts` con la implementación de Resend (ver comentarios en el archivo).

## 📧 Tipos de Emails

### 1. Confirmación de Pago
- Se envía después de cada donación exitosa
- Incluye: monto, monto donado, link al ranking

### 2. Email de #1
- Se envía cuando alguien alcanza el primer lugar
- Incluye: felicitaciones, posición en ranking

### 3. Email de Bienvenida
- Se envía a nuevos donantes (primera vez)
- Incluye: información sobre Santivilla, cómo funciona

## 🔧 Integración con Webhook

Para enviar emails automáticamente, actualiza `app/api/webhook/route.ts`:

```typescript
import { sendPaymentConfirmationEmail } from '@/lib/utils/email'

// En el handler del webhook, después de guardar el pago:
await sendPaymentConfirmationEmail(
  session.customer_email || 'usuario@ejemplo.com',
  sanitizedName,
  amount,
  donationAmount
)
```

## ⚠️ Notas Importantes

1. **Límites de rate**: Respeta los límites del servicio que uses
2. **SPF/DKIM**: Configura correctamente para evitar spam
3. **Privacidad**: No compartas emails sin consentimiento
4. **Testing**: Prueba en desarrollo antes de producción

## 🐛 Solución de Problemas

### Emails no se envían
- Verifica que la API key esté correcta
- Revisa los logs del servidor
- Verifica que el dominio esté verificado (si usas dominio personalizado)

### Emails van a spam
- Configura SPF, DKIM y DMARC correctamente
- Usa un dominio verificado
- Evita palabras spam en el contenido

---

**Última actualización**: Enero 2026

