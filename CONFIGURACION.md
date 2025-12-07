# 🚀 Guía Rápida de Configuración - Santivilla

Esta guía te ayudará a poner en marcha Santivilla paso a paso.

## ⚡ Inicio Rápido (5 minutos)

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (Modo Test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

### 2. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto gratuito
2. Ve al SQL Editor
3. Copia y ejecuta `supabase/schema.sql`
4. Ejecuta `supabase/policies.sql` para las políticas de seguridad

### 3. Configurar Stripe

1. Ve a [stripe.com](https://stripe.com) y crea una cuenta (o inicia sesión)
2. Ve a Developers > API keys
3. Copia las claves de **modo test**
4. Pégalas en `.env.local`

### 4. Ejecutar el Proyecto

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📋 Checklist de Verificación

- [ ] Variables de entorno configuradas
- [ ] Base de datos Supabase creada con las tablas
- [ ] Políticas RLS configuradas en Supabase
- [ ] Claves de Stripe configuradas (modo test)
- [ ] Proyecto compila sin errores (`npm run build`)
- [ ] La aplicación se ejecuta (`npm run dev`)

## 🔍 Probar el Flujo Completo

1. **Ir a la home**: Deberías ver el landing con el formulario
2. **Llenar el formulario**: Ingresa un nombre y un monto (ej: 25€)
3. **Pagar con Stripe**: Usa la tarjeta de test `4242 4242 4242 4242`
4. **Verificar el ranking**: Ve a `/ranking` y verifica que apareces
5. **Ver estadísticas**: Ve a `/impacto` y verifica los totales

## 🧪 Tarjetas de Prueba de Stripe

Para probar pagos en modo test, usa estas tarjetas:

- **Pago exitoso**: `4242 4242 4242 4242`
- **Pago rechazado**: `4000 0000 0000 0002`
- **Cualquier fecha futura y CVC de 3 dígitos**

## 🚨 Problemas Comunes

### Error: "STRIPE_SECRET_KEY no está configurada"
- Verifica que el archivo `.env.local` existe
- Verifica que las variables empiecen con `NEXT_PUBLIC_` si son públicas
- Reinicia el servidor después de cambiar `.env.local`

### Error: "Error al obtener el ranking"
- Verifica que ejecutaste `schema.sql` en Supabase
- Verifica que ejecutaste `policies.sql` para permitir lectura pública
- Verifica que las URLs y claves de Supabase son correctas

### Error: "Error al crear la sesión de pago"
- Verifica que las claves de Stripe son correctas
- Verifica que usas claves de **modo test** (empiezan con `pk_test_` y `sk_test_`)

## 🔐 Seguridad en Producción

Antes de desplegar:

1. **Cambia a claves de Stripe en modo live**
2. **Configura el webhook de Stripe** apuntando a `https://tu-dominio.com/api/webhook`
3. **Revisa las políticas RLS** en Supabase
4. **No expongas la Service Role Key** de Supabase
5. **Usa variables de entorno** en tu plataforma de hosting

## 📚 Próximos Pasos

- Añadir múltiples rankings por categorías
- Integrar videos de YouTube en la página de impacto
- Añadir autenticación para gestión de perfiles
- Añadir notificaciones por email
- Añadir analytics y métricas

---

¿Necesitas ayuda? Revisa el [README.md](./README.md) completo.

