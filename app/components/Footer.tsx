'use client'

// Componente de footer con traducciones
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import DoNotSellButton from './DoNotSellButton'

const translations = {
  es: {
    description: 'El ~95% de tu dinero va directo a refugios de animales. Compite por ser #1 mientras ayudas a nuestros amigos peludos.',
    followUs: 'Síguenos en:',
    navigation: 'Navegación',
    information: 'Información',
    home: 'Inicio',
    ranking: 'Ranking',
    transparency: 'Transparencia',
    faq: 'FAQ',
    contribute: 'Contribuir ahora',
    viewTransparency: 'Ver transparencia',
    contact: 'Contacto',
    legal: 'Legal',
    privacy: 'Privacidad',
    terms: 'Términos',
    legalNotice: 'Aviso Legal',
    copyright: '© 2026 Santivilla. El ~95% de los ingresos se dona a refugios de animales.',
  },
  en: {
    description: '~95% of your money goes directly to animal shelters. Compete to be #1 while helping our furry friends.',
    followUs: 'Follow us on:',
    navigation: 'Navigation',
    information: 'Information',
    home: 'Home',
    ranking: 'Ranking',
    transparency: 'Transparency',
    faq: 'FAQ',
    contribute: 'Contribute now',
    viewTransparency: 'View transparency',
    contact: 'Contact',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    legalNotice: 'Legal Notice',
    copyright: '© 2026 Santivilla. ~95% of revenue is donated to animal shelters.',
  },
  de: {
    description: '~95% deines Geldes geht direkt an Tierheime. Wetteifere um Platz #1, während du unseren pelzigen Freunden hilfst.',
    followUs: 'Folge uns auf:',
    navigation: 'Navigation',
    information: 'Information',
    home: 'Startseite',
    ranking: 'Ranking',
    transparency: 'Transparenz',
    faq: 'FAQ',
    contribute: 'Jetzt beitragen',
    viewTransparency: 'Transparenz anzeigen',
    contact: 'Kontakt',
    legal: 'Rechtliches',
    privacy: 'Datenschutz',
    terms: 'Bedingungen',
    legalNotice: 'Impressum',
    copyright: '© 2026 Santivilla. ~95% der Einnahmen werden an Tierheime gespendet.',
  },
}

export default function Footer() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  
  // Obtener las rutas correctas según el idioma
  const homePath = lang === 'es' ? '/' : `/${lang}`
  const rankingPath = lang === 'es' ? '/ranking' : `/${lang}/ranking`
  const impactoPath = lang === 'es' ? '/impacto' : `/${lang}/impacto`
  const faqPath = lang === 'es' ? '/faq' : `/${lang}/faq`
  const boostFormPath = lang === 'es' ? '/#boost-form' : `/${lang}#boost-form`
  const privacyPath = lang === 'es' ? '/privacidad' : `/${lang}/privacidad`
  const termsPath = lang === 'es' ? '/terminos' : `/${lang}/terminos`
  const legalNoticePath = lang === 'es' ? '/aviso-legal' : `/${lang}/aviso-legal`

  return (
    <footer className="border-t border-[var(--color-border)] mt-16 py-12 bg-[var(--color-background-alt)]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">SANTIVILLA</h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              {t.description}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--color-text-secondary)]">{t.followUs}</span>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-semibold"
                aria-label={lang === 'es' ? 'Síguenos en YouTube' : lang === 'en' ? 'Follow us on YouTube' : 'Folge uns auf YouTube'}
              >
                YouTube →
              </a>
            </div>
          </div>
          
          {/* Links rápidos */}
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-3">{t.navigation}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={homePath} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href={rankingPath} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  {t.ranking}
                </Link>
              </li>
              <li>
                <Link href={impactoPath} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  {t.transparency}
                </Link>
              </li>
              <li>
                <Link href={faqPath} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  {t.faq}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Información */}
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-3">{t.information}</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>
                <a href={boostFormPath} className="hover:text-[var(--color-primary)] transition-colors">
                  {t.contribute}
                </a>
              </li>
              <li>
                <a href={impactoPath} className="hover:text-[var(--color-primary)] transition-colors">
                  {t.viewTransparency}
                </a>
              </li>
              <li>
                <Link href={faqPath} className="hover:text-[var(--color-primary)] transition-colors">
                  {t.faq}
                </Link>
              </li>
              <li>
                <a href="mailto:contacto@santivilla.com" className="hover:text-[var(--color-primary)] transition-colors">
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-3">{t.legal}</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>
                <Link href={privacyPath} className="hover:text-[var(--color-primary)] transition-colors">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href={termsPath} className="hover:text-[var(--color-primary)] transition-colors">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href={legalNoticePath} className="hover:text-[var(--color-primary)] transition-colors">
                  {t.legalNotice}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright y Do Not Sell */}
        <div className="border-t border-[var(--color-border)] pt-6">
          <div className="text-center text-sm text-[var(--color-text-secondary)] mb-2">
            <p>{t.copyright}</p>
          </div>
          <div className="text-center text-xs text-[var(--color-text-secondary)]">
            <DoNotSellButton />
          </div>
        </div>
      </div>
    </footer>
  )
}

