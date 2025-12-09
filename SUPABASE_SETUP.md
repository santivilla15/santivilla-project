# 🗄️ Guía de Configuración de Supabase - Santivilla

Esta guía te ayudará a configurar Supabase para que los pagos se guarden y el ranking funcione.

## 🎯 ¿Por qué necesitas Supabase?

Sin Supabase:
- ❌ Los pagos no se guardan en la base de datos
- ❌ El ranking no funciona (no hay datos)
- ❌ Las estadísticas no se muestran
- ❌ Las donaciones recientes no aparecen

Con Supabase:
- ✅ Los pagos se guardan automáticamente
- ✅ El ranking se actualiza en tiempo real
- ✅ Las estadísticas se calculan correctamente
- ✅ Todo el flujo funciona end-to-end

## 📋 Paso 1: Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"** o **"New Project"**
3. Inicia sesión con GitHub (recomendado) o crea una cuenta
4. Crea un nuevo proyecto:
   - **Name**: `santivilla` (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (guárdala)
   - **Region**: Elige la más cercana a ti
   - **Pricing Plan**: Free (suficiente para empezar)
5. Espera a que se cree el proyecto (2-3 minutos)

## 🔑 Paso 2: Obtener las Credenciales

1. En el Dashboard de Supabase, ve a **Settings** → **API**
2. Encuentra la sección **Project API keys**
3. Copia las siguientes credenciales:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon public** key (empieza con `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 🗃️ Paso 3: Crear las Tablas

1. En el Dashboard de Supabase, ve a **SQL Editor** (icono de base de datos en el menú lateral)
2. Haz clic en **New query**
3. Abre el archivo `supabase/schema.sql` de este proyecto
4. Copia TODO el contenido del archivo
5. Pégalo en el SQL Editor de Supabase
6. Haz clic en **Run** (o presiona Cmd/Ctrl + Enter)
7. Deberías ver un mensaje de éxito

## 🔒 Paso 4: Configurar Políticas de Seguridad (RLS)

1. En el mismo SQL Editor, abre el archivo `supabase/policies.sql`
2. Copia TODO el contenido
3. Pégalo en el SQL Editor
4. Haz clic en **Run**
5. Esto permite que las APIs puedan leer los datos públicamente (pero solo el servidor puede escribir)

## ⚙️ Paso 5: Configurar Variables de Entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Descomenta y completa las líneas de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **IMPORTANTE**: Reinicia el servidor después de agregar las variables:
   ```bash
   npm run dev
   ```

## ✅ Paso 6: Verificar que Funciona

1. Reinicia el servidor: `npm run dev`
2. Ve a `http://localhost:3000/ranking`
3. Deberías ver el ranking (aunque esté vacío al principio)
4. Realiza un pago de prueba
5. Verifica que aparezca en el ranking

## 🧪 Probar el Flujo Completo

1. **Realizar un pago**:
   - Ve a la página principal
   - Llena el formulario (nombre: "Test User", monto: 25€)
   - Usa la tarjeta de prueba: `4242 4242 4242 4242`
   - Completa el pago

2. **Verificar en Supabase**:
   - Ve al Dashboard de Supabase
   - Ve a **Table Editor**
   - Deberías ver:
     - Un registro en la tabla `payments`
     - Un registro en la tabla `ranking_users`

3. **Verificar en la web**:
   - Ve a `/ranking` - deberías ver tu usuario
   - Ve a `/impacto` - deberías ver las estadísticas actualizadas

## 🔔 Paso 7: Configurar Webhook de Stripe (Opcional pero Recomendado)

Para que los pagos se guarden automáticamente cuando se completen:

### En Desarrollo (Local):

```bash
# Instalar Stripe CLI (si no lo tienes)
brew install stripe/stripe-cli/stripe

# Iniciar sesión
stripe login

# Reenviar eventos al servidor local
stripe listen --forward-to localhost:3000/api/webhook
```

Copia el webhook secret que aparece (empieza con `whsec_...`) y agrégalo a `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### En Producción:

1. En el Dashboard de Stripe, ve a **Developers** → **Webhooks**
2. Haz clic en **Add endpoint**
3. URL: `https://tu-dominio.com/api/webhook`
4. Evento: `checkout.session.completed`
5. Copia el **Signing secret** y agrégalo a `.env.local` en producción

## 🐛 Solución de Problemas

### Error: "NEXT_PUBLIC_SUPABASE_URL no está configurada"

- Verifica que el archivo `.env.local` existe
- Verifica que las variables no tengan espacios extra
- Reinicia el servidor

### Error: "Error al obtener el ranking"

- Verifica que ejecutaste `schema.sql` en Supabase
- Verifica que ejecutaste `policies.sql` para las políticas RLS
- Verifica que las credenciales sean correctas

### El pago se completa pero no aparece en el ranking

- Verifica que el webhook esté configurado
- Revisa los logs del servidor en `/api/webhook`
- Verifica en Supabase que los datos se hayan guardado

### Error al crear tablas en Supabase

- Asegúrate de copiar TODO el contenido de `schema.sql`
- Verifica que no haya errores de sintaxis
- Si hay errores, ejecuta cada sección por separado

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de SQL de Supabase](https://supabase.com/docs/guides/database)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)

---

¿Necesitas ayuda? Revisa los logs del servidor o consulta la documentación de Supabase.

