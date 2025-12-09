// Error Boundary específico para la página de impacto
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// Traducciones
const translations = {
  es: {
    title: 'Error al cargar las estadísticas',
    message: 'No pudimos cargar la información de transparencia. Esto puede deberse a un problema de conexión o con la base de datos.',
    tryAgain: 'Intentar de nuevo',
    goHome: 'Ir al inicio',
    tryAgainAria: 'Intentar cargar las estadísticas de nuevo',
    goHomeAria: 'Ir a la página principal',
    errorDetails: 'Detalles del error (solo en desarrollo)',
  },
  en: {
    title: 'Error loading statistics',
    message: 'We couldn\'t load the transparency information. This may be due to a connection issue or database problem.',
    tryAgain: 'Try again',
    goHome: 'Go home',
    tryAgainAria: 'Try loading statistics again',
    goHomeAria: 'Go to home page',
    errorDetails: 'Error details (development only)',
  },
  de: {
    title: 'Fehler beim Laden der Statistiken',
    message: 'Wir konnten die Transparenzinformationen nicht laden. Dies kann auf ein Verbindungsproblem oder ein Datenbankproblem zurückzuführen sein.',
    tryAgain: 'Erneut versuchen',
    goHome: 'Zur Startseite',
    tryAgainAria: 'Statistiken erneut laden',
    goHomeAria: 'Zur Startseite gehen',
    errorDetails: 'Fehlerdetails (nur Entwicklung)',
  },
}

export default function ImpactoError({
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
    // Log del error para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error en página de impacto:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--color-background)] border border-[var(--color-secondary)] rounded-lg p-8 text-center shadow-lg">
        <div className="text-6xl mb-4">📊</div>
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
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

