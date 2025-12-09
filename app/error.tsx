// Error Boundary para la aplicación (Next.js App Router)
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import * as Sentry from '@sentry/nextjs'

// Traducciones
const translations = {
  es: {
    title: 'Algo salió mal',
    message: 'Lo sentimos, ocurrió un error inesperado. Por favor, intenta recargar la página.',
    tryAgain: 'Intentar de nuevo',
    goHome: 'Ir al inicio',
    tryAgainAria: 'Intentar de nuevo',
    goHomeAria: 'Ir a la página principal',
    errorDetails: 'Detalles del error (solo en desarrollo)',
  },
  en: {
    title: 'Something went wrong',
    message: 'Sorry, an unexpected error occurred. Please try reloading the page.',
    tryAgain: 'Try again',
    goHome: 'Go home',
    tryAgainAria: 'Try again',
    goHomeAria: 'Go to home page',
    errorDetails: 'Error details (development only)',
  },
  de: {
    title: 'Etwas ist schief gelaufen',
    message: 'Entschuldigung, ein unerwarteter Fehler ist aufgetreten. Bitte versuche, die Seite neu zu laden.',
    tryAgain: 'Erneut versuchen',
    goHome: 'Zur Startseite',
    tryAgainAria: 'Erneut versuchen',
    goHomeAria: 'Zur Startseite gehen',
    errorDetails: 'Fehlerdetails (nur Entwicklung)',
  },
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const homePath = lang === 'es' ? '/' : `/${lang}`

  useEffect(() => {
    // Enviar error a Sentry si está configurado
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error)
    }
    
    // Log del error para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error capturado:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--color-background)] border border-[var(--color-secondary)] rounded-lg p-8 text-center shadow-lg">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
          {t.title}
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-6">
          {t.message}
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold rounded-md transition-colors"
            aria-label={t.tryAgainAria}
          >
            {t.tryAgain}
          </button>
          <Link
            href={homePath}
            className="block w-full px-6 py-3 border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-primary)] font-semibold rounded-md transition-colors"
            aria-label={t.goHomeAria}
          >
            {t.goHome}
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-[var(--color-text-secondary)] mb-2">
              {t.errorDetails}
            </summary>
            <pre className="text-xs bg-[var(--color-background-alt)] p-4 rounded overflow-auto max-h-40 text-[var(--color-text)]">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

