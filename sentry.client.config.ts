// Configuración de Sentry para el cliente (browser)
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Ajustar el porcentaje de transacciones que se capturan
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Configuración de entorno
  environment: process.env.NODE_ENV || 'development',
  
  // Capturar errores no manejados
  beforeSend(event, hint) {
    // En desarrollo, mostrar errores en consola también
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry Event:', event)
      console.error('Sentry Hint:', hint)
    }
    return event
  },
  
  // Ignorar ciertos errores comunes que no son críticos
  ignoreErrors: [
    // Errores de red que son comunes y no críticos
    'NetworkError',
    'Failed to fetch',
    'Network request failed',
    // Errores de CORS en desarrollo
    'CORS',
  ],
  
  // Configuración de release (útil para tracking de versiones)
  release: process.env.NEXT_PUBLIC_APP_VERSION || undefined,
})

