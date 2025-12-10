// Banner de Cookies (GDPR Compliant)
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const translations = {
  es: {
    title: '🍪 Uso de Cookies',
    message: 'Utilizamos cookies para mejorar tu experiencia. Al hacer clic en "Aceptar", consientes el uso de cookies de análisis.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    learnMore: 'Más información',
    privacyPolicy: 'Política de Privacidad',
  },
  en: {
    title: '🍪 Cookie Usage',
    message: 'We use cookies to improve your experience. By clicking "Accept", you consent to the use of analytics cookies.',
    accept: 'Accept',
    reject: 'Reject',
    learnMore: 'Learn more',
    privacyPolicy: 'Privacy Policy',
  },
  de: {
    title: '🍪 Cookie-Verwendung',
    message: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Durch Klicken auf "Akzeptieren" stimmen Sie der Verwendung von Analyse-Cookies zu.',
    accept: 'Akzeptieren',
    reject: 'Ablehnen',
    learnMore: 'Mehr erfahren',
    privacyPolicy: 'Datenschutzerklärung',
  },
}

export default function CookieBanner() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const privacyPath = lang === 'es' ? '/privacidad' : `/${lang}/privacidad`
  
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya ha tomado una decisión sobre cookies
    const cookieConsent = localStorage.getItem('cookie_consent')
    if (!cookieConsent) {
      // Mostrar banner después de un pequeño delay para mejor UX
      setTimeout(() => {
        setShowBanner(true)
      }, 500)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setShowBanner(false)
    // Disparar evento para que Analytics se cargue
    window.dispatchEvent(new Event('cookieConsentAccepted'))
  }

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected')
    setShowBanner(false)
    // No disparar evento - Analytics no se cargará
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-background)] border-t-2 border-[var(--color-primary)] shadow-lg z-50 p-4 md:p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-[var(--color-primary)] mb-2">{t.title}</h3>
            <p className="text-sm text-[var(--color-text)] mb-2">
              {t.message}
            </p>
            <Link 
              href={privacyPath}
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              {t.learnMore} - {t.privacyPolicy}
            </Link>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm border border-[var(--color-border)] rounded-md hover:bg-[var(--color-background-alt)] transition-colors text-[var(--color-text)]"
            >
              {t.reject}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-secondary)] transition-colors font-semibold"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

