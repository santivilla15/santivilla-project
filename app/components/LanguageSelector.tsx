'use client'

// Selector de idioma simple sin next-intl
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function LanguageSelector() {
  const pathname = usePathname()
  
  // Detectar el idioma actual basado en la ruta
  const currentLang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  
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

  return (
    <div className="flex items-center gap-1 md:gap-2 border-l border-[var(--color-border)] pl-3 md:pl-6">
      <Link 
        href={getLocalizedPath('es')} 
        className={`text-xs md:text-sm transition-colors font-medium ${
          currentLang === 'es' 
            ? 'text-[var(--color-primary)] font-bold' 
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
        }`}
        aria-label="Cambiar a español"
      >
        🇪🇸 <span className="hidden sm:inline">ES</span>
      </Link>
      <span className="text-[var(--color-text-secondary)] hidden sm:inline">|</span>
      <Link 
        href={getLocalizedPath('en')} 
        className={`text-xs md:text-sm transition-colors font-medium ${
          currentLang === 'en' 
            ? 'text-[var(--color-primary)] font-bold' 
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
        }`}
        aria-label="Switch to English"
      >
        🇬🇧 <span className="hidden sm:inline">EN</span>
      </Link>
      <span className="text-[var(--color-text-secondary)] hidden sm:inline">|</span>
      <Link 
        href={getLocalizedPath('de')} 
        className={`text-xs md:text-sm transition-colors font-medium ${
          currentLang === 'de' 
            ? 'text-[var(--color-primary)] font-bold' 
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
        }`}
        aria-label="Zu Deutsch wechseln"
      >
        🇩🇪 <span className="hidden sm:inline">DE</span>
      </Link>
    </div>
  )
}

