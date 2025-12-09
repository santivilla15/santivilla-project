// Validación de variables de entorno al inicio de la aplicación
// Este archivo valida que todas las variables necesarias estén configuradas

interface EnvConfig {
  supabase: {
    url: string
    anonKey: string
  }
  stripe: {
    publishableKey: string
    secretKey: string
    webhookSecret?: string
  }
  site: {
    url: string
  }
}

/**
 * Valida que todas las variables de entorno requeridas estén configuradas
 * @throws Error si alguna variable requerida falta
 */
export function validateEnv(): EnvConfig {
  const errors: string[] = []

  // Validar Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL no está configurada')
  } else if (!supabaseUrl.startsWith('http')) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL debe ser una URL válida')
  }

  if (!supabaseAnonKey) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY no está configurada')
  }

  // Validar Stripe
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  if (!stripePublishableKey) {
    errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY no está configurada')
  } else if (!stripePublishableKey.startsWith('pk_')) {
    errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY debe empezar con pk_')
  }

  if (!stripeSecretKey) {
    errors.push('STRIPE_SECRET_KEY no está configurada')
  } else if (!stripeSecretKey.startsWith('sk_')) {
    errors.push('STRIPE_SECRET_KEY debe empezar con sk_')
  }

  // Validar Site URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'
  if (!siteUrl.startsWith('http')) {
    errors.push('NEXT_PUBLIC_SITE_URL debe ser una URL válida')
  }

  // Si hay errores, lanzar excepción
  if (errors.length > 0) {
    const errorMessage = `❌ Variables de entorno faltantes o inválidas:\n${errors.map(e => `  - ${e}`).join('\n')}\n\nPor favor, revisa tu archivo .env.local y consulta .env.example para más información.`
    throw new Error(errorMessage)
  }

  // Webhook secret es opcional (solo requerido en producción)
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret && process.env.NODE_ENV === 'production') {
    console.warn('⚠️  STRIPE_WEBHOOK_SECRET no está configurada. Esto es REQUERIDO en producción.')
  }

  return {
    supabase: {
      url: supabaseUrl!,
      anonKey: supabaseAnonKey!,
    },
    stripe: {
      publishableKey: stripePublishableKey!,
      secretKey: stripeSecretKey!,
      webhookSecret,
    },
    site: {
      url: siteUrl,
    },
  }
}

/**
 * Valida las variables de entorno solo en el servidor
 * Úsalo en API routes o Server Components
 */
export function validateServerEnv(): EnvConfig {
  return validateEnv()
}

