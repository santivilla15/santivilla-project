// Componente Error Boundary para capturar errores de React
'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

// Traducciones
const translations = {
  es: {
    title: 'Algo salió mal',
    message: 'Lo sentimos, ocurrió un error inesperado. Por favor, intenta recargar la página.',
    reload: 'Recargar página',
    goHome: 'Ir al inicio',
    reloadAria: 'Recargar la página',
    goHomeAria: 'Ir a la página principal',
    errorDetails: 'Detalles del error (solo en desarrollo)',
  },
  en: {
    title: 'Something went wrong',
    message: 'Sorry, an unexpected error occurred. Please try reloading the page.',
    reload: 'Reload page',
    goHome: 'Go home',
    reloadAria: 'Reload the page',
    goHomeAria: 'Go to home page',
    errorDetails: 'Error details (development only)',
  },
  de: {
    title: 'Etwas ist schief gelaufen',
    message: 'Entschuldigung, ein unerwarteter Fehler ist aufgetreten. Bitte versuche, die Seite neu zu laden.',
    reload: 'Seite neu laden',
    goHome: 'Zur Startseite',
    reloadAria: 'Seite neu laden',
    goHomeAria: 'Zur Startseite gehen',
    errorDetails: 'Fehlerdetails (nur Entwicklung)',
  },
}

// Función helper para detectar el idioma desde la URL
const getLangFromPath = (): 'es' | 'en' | 'de' => {
  if (typeof window === 'undefined') return 'es'
  const pathname = window.location.pathname
  if (pathname.startsWith('/en')) return 'en'
  if (pathname.startsWith('/de')) return 'de'
  return 'es'
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    // Actualizar el estado para que el siguiente render muestre la UI de fallback
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log del error para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error capturado por ErrorBoundary:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // Si hay un fallback personalizado, usarlo
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Detectar el idioma desde la URL
      const lang = getLangFromPath()
      const t = translations[lang]
      const homePath = lang === 'es' ? '/' : `/${lang}`

      // UI de fallback por defecto
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
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold rounded-md transition-colors"
                aria-label={t.reloadAria}
              >
                {t.reload}
              </button>
              <Link
                href={homePath}
                className="block w-full px-6 py-3 border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-primary)] font-semibold rounded-md transition-colors"
                aria-label={t.goHomeAria}
              >
                {t.goHome}
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-[var(--color-text-secondary)] mb-2">
                  {t.errorDetails}
                </summary>
                <pre className="text-xs bg-[var(--color-background-alt)] p-4 rounded overflow-auto max-h-40 text-[var(--color-text)]">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

