// Configuración de Sentry para Edge Runtime (middleware, edge functions)
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Traces sample rate para edge (más bajo para ahorrar recursos)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 0.5,
  
  // Configuración de entorno
  environment: process.env.NODE_ENV || 'development',
  
  // Configuración de release
  release: process.env.NEXT_PUBLIC_APP_VERSION || undefined,
})

