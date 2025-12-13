'use client'

// Componente de modal para seleccionar idioma al entrar por primera vez
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const translations = {
  es: {
    title: 'Bienvenido a Santivilla',
    subtitle: 'Selecciona tu idioma preferido',
    selectLanguage: 'Selecciona tu idioma',
    spanish: 'Español',
    english: 'English',
    german: 'Deutsch',
    continue: 'Continuar',
  },
  en: {
    title: 'Welcome to Santivilla',
    subtitle: 'Select your preferred language',
    selectLanguage: 'Select your language',
    spanish: 'Español',
    english: 'English',
    german: 'Deutsch',
    continue: 'Continue',
  },
  de: {
    title: 'Willkommen bei Santivilla',
    subtitle: 'Wähle deine bevorzugte Sprache',
    selectLanguage: 'Wähle deine Sprache',
    spanish: 'Español',
    english: 'English',
    german: 'Deutsch',
    continue: 'Weiter',
  },
}

export default function LanguageModal() {
  const pathname = usePathname()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [selectedLang, setSelectedLang] = useState<string | null>(null)

  // Detectar el idioma actual basado en la ruta
  const currentLang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[currentLang]

  useEffect(() => {
    // Verificar si el usuario ya eligió un idioma anteriormente
    const hasChosenLanguage = localStorage.getItem('language-chosen')
    
    // Si ya hay un idioma en la URL (no es la raíz), no mostrar el modal
    if (pathname !== '/' && pathname !== '/en' && pathname !== '/de') {
      return
    }

    // Si el usuario ya eligió un idioma, no mostrar el modal
    if (hasChosenLanguage) {
      return
    }

    // Mostrar el modal después de un pequeño delay para mejor UX
    const timer = setTimeout(() => {
      setShowModal(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname])

  // Función para obtener la ruta en el idioma seleccionado
  const getLocalizedPath = (lang: string) => {
    // Si estamos en la raíz
    if (pathname === '/' || pathname === '/en' || pathname === '/de') {
      return lang === 'es' ? '/' : `/${lang}`
    }
    
    // Si estamos en una ruta con idioma, reemplazarlo
    if (pathname.startsWith('/en/') || pathname.startsWith('/de/')) {
      const pathWithoutLang = pathname.replace(/^\/(en|de)/, '')
      return lang === 'es' ? pathWithoutLang : `/${lang}${pathWithoutLang}`
    }
    
    // Si estamos en una ruta sin idioma, agregarlo (excepto para español)
    if (lang === 'es') {
      return pathname
    }
    return `/${lang}${pathname}`
  }

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang)
  }

  const handleContinue = () => {
    if (!selectedLang) return

    // Guardar la preferencia del usuario
    localStorage.setItem('language-chosen', 'true')
    localStorage.setItem('preferred-language', selectedLang)

    // Cerrar el modal
    setShowModal(false)

    // Redirigir al idioma seleccionado
    const targetPath = getLocalizedPath(selectedLang)
    router.push(targetPath)
  }

  // No mostrar el modal si no debe mostrarse
  if (!showModal) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
      aria-describedby="language-modal-description"
    >
      <div className="bg-[var(--color-background)] border-2 border-[var(--color-primary)] rounded-lg shadow-2xl p-6 md:p-8 max-w-md w-full mx-4 animate-fade-in-up">
        {/* Título */}
        <h2 
          id="language-modal-title"
          className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-2 text-center"
        >
          {t.title}
        </h2>
        <p 
          id="language-modal-description"
          className="text-sm md:text-base text-[var(--color-text-secondary)] mb-6 text-center"
        >
          {t.subtitle}
        </p>

        {/* Opciones de idioma */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleLanguageSelect('es')}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-3 ${
              selectedLang === 'es'
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                : 'border-[var(--color-border-dark)] hover:border-[var(--color-primary)] hover:bg-[var(--color-background-alt)]'
            }`}
            aria-label="Seleccionar español"
          >
            <span className="text-3xl md:text-4xl">🇪🇸</span>
            <span className="text-lg md:text-xl font-semibold text-[var(--color-text)]">
              {t.spanish}
            </span>
            {selectedLang === 'es' && (
              <span className="text-[var(--color-primary)] text-xl">✓</span>
            )}
          </button>

          <button
            onClick={() => handleLanguageSelect('en')}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-3 ${
              selectedLang === 'en'
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                : 'border-[var(--color-border-dark)] hover:border-[var(--color-primary)] hover:bg-[var(--color-background-alt)]'
            }`}
            aria-label="Select English"
          >
            <span className="text-3xl md:text-4xl">🇬🇧</span>
            <span className="text-lg md:text-xl font-semibold text-[var(--color-text)]">
              {t.english}
            </span>
            {selectedLang === 'en' && (
              <span className="text-[var(--color-primary)] text-xl">✓</span>
            )}
          </button>

          <button
            onClick={() => handleLanguageSelect('de')}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-3 ${
              selectedLang === 'de'
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                : 'border-[var(--color-border-dark)] hover:border-[var(--color-primary)] hover:bg-[var(--color-background-alt)]'
            }`}
            aria-label="Deutsch auswählen"
          >
            <span className="text-3xl md:text-4xl">🇩🇪</span>
            <span className="text-lg md:text-xl font-semibold text-[var(--color-text)]">
              {t.german}
            </span>
            {selectedLang === 'de' && (
              <span className="text-[var(--color-primary)] text-xl">✓</span>
            )}
          </button>
        </div>

        {/* Botón continuar */}
        <button
          onClick={handleContinue}
          disabled={!selectedLang}
          className="w-full py-3 md:py-4 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold text-base md:text-lg rounded-md transition-colors disabled:bg-[var(--color-border-dark)] disabled:cursor-not-allowed disabled:text-[var(--color-text-secondary)]"
          aria-label={t.continue}
        >
          {t.continue}
        </button>
      </div>
    </div>
  )
}
