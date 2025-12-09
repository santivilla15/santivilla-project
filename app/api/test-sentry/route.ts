// Ruta de prueba para verificar que Sentry funciona
// Accede a: http://localhost:3000/api/test-sentry
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Importar Sentry dinámicamente para asegurar que se carga
    const Sentry = await import('@sentry/nextjs')
    
    // Verificar que Sentry está configurado
    const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN
    
    if (!sentryDsn) {
      return NextResponse.json({
        success: false,
        message: 'Sentry DSN no está configurado',
        dsn: 'No encontrado',
        env: Object.keys(process.env).filter(k => k.includes('SENTRY')).join(', ') || 'Ninguna variable SENTRY encontrada',
      }, { status: 500 })
    }

    // Capturar un error de prueba con más contexto
    Sentry.captureMessage('Test error from Santivilla - Sentry está funcionando correctamente', {
      level: 'info',
      tags: {
        test: true,
        source: 'test-sentry-route',
      },
    })
    
    // También capturar una excepción de prueba con contexto
    try {
      const testError = new Error('Test exception - Esto es solo una prueba de Sentry')
      Sentry.captureException(testError, {
        tags: {
          test: true,
          source: 'test-sentry-route',
        },
        extra: {
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'development',
        },
      })
    } catch (error) {
      console.error('Error capturando excepción:', error)
    }

    // Forzar el flush para asegurar que los eventos se envíen inmediatamente
    await Sentry.flush(2000)

    return NextResponse.json({
      success: true,
      message: '✅ Sentry está configurado y funcionando',
      dsn: sentryDsn.substring(0, 30) + '...',
      note: 'Revisa tu Dashboard de Sentry para ver los eventos de prueba',
      eventsSent: 2,
      waitTime: 'Espera 5-10 segundos y recarga Sentry',
    })
  } catch (error) {
    console.error('Error en test-sentry:', error)
    return NextResponse.json({
      success: false,
      message: 'Error al probar Sentry',
      error: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 })
  }
}

