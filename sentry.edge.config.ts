// Configuración de Sentry para Edge Runtime (middleware, edge functions)
// Solo se inicializa si hay un DSN configurado
const sentryDsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

if (sentryDsn) {
  // Importar e inicializar Sentry solo si hay DSN
  import('@sentry/nextjs').then((Sentry) => {
    Sentry.init({
      dsn: sentryDsn,
      
      // Traces sample rate para edge (más bajo para ahorrar recursos)
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 0.5,
      
      // Configuración de entorno
      environment: process.env.NODE_ENV || 'development',
      
      // Configuración de release
      release: process.env.NEXT_PUBLIC_APP_VERSION || undefined,
    })
  }).catch(() => {
    // Si Sentry no está disponible, continuar sin él
    console.warn('Sentry no disponible, continuando sin monitoreo')
  })
}

