'use client'

// Componente de navegación con traducciones
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import LanguageSelector from './LanguageSelector'

const translations = {
  es: {
    home: 'Inicio',
    ranking: 'Ranking',
    transparency: 'Transparencia',
    faq: 'FAQ',
    homeAria: 'Ir a la página de inicio',
    rankingAria: 'Ver el ranking de donaciones',
    transparencyAria: 'Ver transparencia e impacto de las donaciones',
    faqAria: 'Ver preguntas frecuentes',
    menuAria: 'Abrir menú de navegación',
    closeMenuAria: 'Cerrar menú de navegación',
  },
  en: {
    home: 'Home',
    ranking: 'Ranking',
    transparency: 'Transparency',
    faq: 'FAQ',
    homeAria: 'Go to home page',
    rankingAria: 'View donation ranking',
    transparencyAria: 'View transparency and impact',
    faqAria: 'View frequently asked questions',
    menuAria: 'Open navigation menu',
    closeMenuAria: 'Close navigation menu',
  },
  de: {
    home: 'Startseite',
    ranking: 'Ranking',
    transparency: 'Transparenz',
    faq: 'FAQ',
    homeAria: 'Zur Startseite gehen',
    rankingAria: 'Spenden-Ranking anzeigen',
    transparencyAria: 'Transparenz und Wirkung anzeigen',
    faqAria: 'Häufig gestellte Fragen anzeigen',
    menuAria: 'Navigationsmenü öffnen',
    closeMenuAria: 'Navigationsmenü schließen',
  },
}

export default function Navigation() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Obtener las rutas correctas según el idioma
  const homePath = lang === 'es' ? '/' : `/${lang}`
  const rankingPath = lang === 'es' ? '/ranking' : `/${lang}/ranking`
  const impactoPath = lang === 'es' ? '/impacto' : `/${lang}/impacto`
  const faqPath = lang === 'es' ? '/faq' : `/${lang}/faq`

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="border-b border-[var(--color-border)] bg-[var(--color-background)] backdrop-blur-sm sticky top-0 z-50 shadow-sm" role="navigation" aria-label={lang === 'es' ? 'Navegación principal' : lang === 'en' ? 'Main navigation' : 'Hauptnavigation'}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={homePath} className="text-xl md:text-2xl font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors" aria-label={t.homeAria}>
            SANTIVILLA
          </Link>
          
          {/* Menú desktop - visible en pantallas medianas y grandes */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-6" role="list">
              <Link 
                href={homePath} 
                className="text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors font-medium"
              >
                <span className="sr-only">{t.homeAria}</span>
                <span aria-hidden="true">{t.home}</span>
              </Link>
              <Link 
                href={rankingPath} 
                className="text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors font-medium"
              >
                <span className="sr-only">{t.rankingAria}</span>
                <span aria-hidden="true">{t.ranking}</span>
              </Link>
              <Link 
                href={impactoPath} 
                className="text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors font-medium"
              >
                <span className="sr-only">{t.transparencyAria}</span>
                <span aria-hidden="true">{t.transparency}</span>
              </Link>
              <Link 
                href={faqPath} 
                className="text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors font-medium"
              >
                <span className="sr-only">{t.faqAria}</span>
                <span aria-hidden="true">{t.faq}</span>
              </Link>
            </div>
            <LanguageSelector />
          </div>

          {/* Botón hamburguesa - visible solo en móviles */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSelector />
            <button
              onClick={toggleMenu}
              className="p-2 text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors"
              aria-label={isMenuOpen ? t.closeMenuAria : t.menuAria}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil - desplegable */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[var(--color-border)] pt-4 animate-fade-in">
            <div className="flex flex-col gap-4" role="list">
              <Link 
                href={homePath} 
                onClick={closeMenu}
                className="text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors font-medium py-2"
              >
                {t.home}
              </Link>
              <Link 
                href={rankingPath} 
                onClick={closeMenu}
                className="text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors font-medium py-2"
              >
                {t.ranking}
              </Link>
              <Link 
                href={impactoPath} 
                onClick={closeMenu}
                className="text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors font-medium py-2"
              >
                {t.transparency}
              </Link>
              <Link 
                href={faqPath} 
                onClick={closeMenu}
                className="text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors font-medium py-2"
              >
                {t.faq}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

