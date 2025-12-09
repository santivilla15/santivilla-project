'use client'

// Componente de navegación con traducciones
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
  },
}

export default function Navigation() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  
  // Obtener las rutas correctas según el idioma
  const homePath = lang === 'es' ? '/' : `/${lang}`
  const rankingPath = lang === 'es' ? '/ranking' : `/${lang}/ranking`
  const impactoPath = lang === 'es' ? '/impacto' : `/${lang}/impacto`
  const faqPath = lang === 'es' ? '/faq' : `/${lang}/faq`

  return (
    <nav className="border-b border-[var(--color-border)] bg-[var(--color-background)] backdrop-blur-sm sticky top-0 z-50 shadow-sm" role="navigation" aria-label={lang === 'es' ? 'Navegación principal' : lang === 'en' ? 'Main navigation' : 'Hauptnavigation'}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={homePath} className="text-2xl font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors" aria-label={t.homeAria}>
            SANTIVILLA
          </Link>
          <div className="flex items-center gap-6">
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
        </div>
      </div>
    </nav>
  )
}

