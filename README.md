# 🎮 Santivilla - Ranking por una Causa

Una aplicación web donde los usuarios pagan dinero real para subir en un ranking público. El **~95% de todos los ingresos se dona a refugios de animales** (comisión variable: 1.50€ fijos + 5%), mientras que el resto mantiene y hace crecer la plataforma.

## 🎯 Características Principales

- **Ranking en Tiempo Real**: Compite por el primer puesto pagando para aumentar tu score
- **Impacto Social**: El 70% de cada pago va directamente a refugios de animales
- **Total Transparencia**: Página dedicada mostrando exactamente cómo se distribuye el dinero
- **Diseño Retro/Gaming**: Interfaz oscura con estilo inspirado en videojuegos
- **Responsive**: Optimizado para móviles y escritorio

## 🛠️ Tecnologías

- **Frontend**: Next.js 16, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Base de Datos**: Supabase (PostgreSQL)
- **Pagos**: Stripe Checkout

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Una cuenta de Supabase (gratuita)
- Una cuenta de Stripe (modo test es suficiente para desarrollo)

## 🚀 Configuración e Instalación

### 1. Clonar e Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env.local
```

Luego, edita `.env.local` y agrega tus credenciales:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase

# Stripe Configuration (modo test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta

# Webhook Secret para Stripe (opcional en desarrollo)
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
```

### 3. Configurar Supabase

1. Crea un nuevo proyecto en [Supabase](https://supabase.com)
2. Ve al SQL Editor
3. Copia y ejecuta el contenido del archivo `supabase/schema.sql` para crear las tablas necesarias
4. Configura las políticas de Row Level Security (RLS):
   - Ve a Authentication > Policies
   - Para `ranking_users`: Crea una política que permita SELECT público
   - Para `payments`: Crea una política que permita SELECT público
   - Nota: Las escrituras (INSERT/UPDATE) se hacen desde el servidor, así que no necesitas políticas públicas para eso

### 4. Configurar Stripe

1. Crea una cuenta en [Stripe](https://stripe.com) (o inicia sesión)
2. Ve al Dashboard > Developers > API keys
3. Copia tus claves de **modo test** (las que empiezan con `pk_test_` y `sk_test_`)
4. Para los webhooks en producción:
   - Ve a Developers > Webhooks
   - Crea un endpoint apuntando a `https://tu-dominio.com/api/webhook`
   - Selecciona el evento `checkout.session.completed`
   - Copia el webhook secret

### 5. Ejecutar el Proyecto

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
santivilla-project/
├── app/
│   ├── api/
│   │   ├── create-checkout-session/  # Crear sesión de pago Stripe
│   │   ├── webhook/                   # Webhook de Stripe
│   │   ├── ranking/                   # API del ranking
│   │   └── stats/                     # API de estadísticas
│   ├── impacto/                       # Página de transparencia
│   ├── ranking/                       # Página del ranking
│   ├── layout.tsx                     # Layout principal
│   ├── page.tsx                       # Página de inicio
│   └── globals.css                    # Estilos globales
├── components/
│   └── BoostForm.tsx                  # Formulario de pago
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # Cliente Supabase (browser)
│   │   └── server.ts                  # Cliente Supabase (server)
│   ├── stripe/
│   │   └── config.ts                  # Configuración Stripe
│   └── types/
│       └── database.ts                # Tipos TypeScript
├── supabase/
│   └── schema.sql                     # Schema de la base de datos
└── .env.example                       # Plantilla de variables de entorno
```

## 🔐 Seguridad

- Las claves secretas de Stripe solo se usan en el servidor
- Row Level Security (RLS) está habilitado en Supabase
- Los webhooks de Stripe se verifican con firma
- Validación de datos en todas las API routes

## 🎨 Personalización

### Cambiar Colores

Edita `app/globals.css` para modificar las variables CSS:
- `--primary`: Color verde principal (ranking)
- `--secondary`: Color de acento
- `--background`: Color de fondo

### Añadir Videos de YouTube

En `app/impacto/page.tsx`, reemplaza el placeholder con un componente de YouTube:

```tsx
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  className="w-full h-96 rounded-lg"
/>
```

## 🚢 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno en la configuración del proyecto
3. Vercel desplegará automáticamente

### Otros Proveedores

El proyecto es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

**Importante**: Asegúrate de actualizar la URL del webhook de Stripe en producción.

## 📝 Notas Importantes

- **Modo Test**: Por defecto, el proyecto usa las claves de test de Stripe. Para producción, cambia a claves live.
- **Webhooks Locales**: Para probar webhooks localmente, usa [Stripe CLI](https://stripe.com/docs/stripe-cli)
- **Base de Datos**: Las políticas RLS deben configurarse correctamente para que la aplicación funcione

## 🐛 Solución de Problemas

### Error: "No se encontró la firma de Stripe"
- Asegúrate de que el webhook secret esté configurado correctamente
- En desarrollo, puedes deshabilitar la verificación de firma (NO recomendado para producción)

### Error: "Error al obtener el ranking"
- Verifica que las políticas RLS en Supabase permitan lectura pública
- Verifica que las variables de entorno de Supabase estén correctas

### Error: "Error al crear la sesión de pago"
- Verifica que las claves de Stripe estén correctas
- Asegúrate de usar claves de test en desarrollo

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

---

Hecho con ❤️ para ayudar a los animales 🐾
