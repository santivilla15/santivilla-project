// Componente "Do Not Sell My Personal Information" - CCPA Compliance
// Aunque NO vendemos datos, este componente proporciona transparencia adicional
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

const translations = {
  es: {
    title: 'No Vendemos tus Datos',
    message: 'Santivilla NO vende, alquila ni comercializa tus datos personales. Toda la información sobre nuestro uso de datos está disponible en nuestra Política de Privacidad.',
    privacyLink: 'Ver Política de Privacidad',
    close: 'Cerrar',
  },
  en: {
    title: 'We Do Not Sell Your Data',
    message: 'Santivilla does NOT sell, rent, or trade your personal data. All information about our data use is available in our Privacy Policy.',
    privacyLink: 'View Privacy Policy',
    close: 'Close',
  },
  de: {
    title: 'Wir verkaufen Ihre Daten nicht',
    message: 'Santivilla verkauft, vermietet oder tauscht Ihre personenbezogenen Daten nicht. Alle Informationen über unsere Datennutzung finden Sie in unserer Datenschutzerklärung.',
    privacyLink: 'Datenschutzerklärung anzeigen',
    close: 'Schließen',
  },
}

export default function DoNotSellButton() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const privacyPath = lang === 'es' ? '/privacidad' : `/${lang}/privacidad`
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Botón pequeño en footer */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] underline"
        aria-label={t.title}
      >
        {lang === 'es' ? 'No vendemos tus datos' : lang === 'en' ? 'Do not sell my info' : 'Wir verkaufen Ihre Daten nicht'}
      </button>

      {/* Modal cuando se hace clic */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">
              {t.title}
            </h3>
            <p className="text-[var(--color-text)] mb-4">
              {t.message}
            </p>
            <div className="flex gap-3">
              <a
                href={privacyPath}
                className="flex-1 px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-secondary)] text-center transition-colors"
              >
                {t.privacyLink}
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-[var(--color-border)] rounded-md hover:bg-[var(--color-background-alt)] transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

