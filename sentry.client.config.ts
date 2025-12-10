// Configuración de Sentry para el cliente (browser)
// Solo se inicializa si hay un DSN configurado
const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN

if (sentryDsn) {
  // Importar e inicializar Sentry solo si hay DSN
  import('@sentry/nextjs').then((Sentry) => {
    Sentry.init({
      dsn: sentryDsn,
      
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
  }).catch(() => {
    // Si Sentry no está disponible, continuar sin él
    console.warn('Sentry no disponible, continuando sin monitoreo')
  })
}

