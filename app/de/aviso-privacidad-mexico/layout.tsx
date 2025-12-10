// Layout con metadata SEO para Aviso de Privacidad México
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Datenschutzhinweis - Mexiko',
  description: 'Datenschutzhinweis von Santivilla gemäß dem Bundesgesetz zum Schutz personenbezogener Daten in Privatbesitz (LFPDPPP) von Mexiko.',
  alternates: {
    canonical: `${baseUrl}/aviso-privacidad-mexico`,
    languages: {
      es: `${baseUrl}/aviso-privacidad-mexico`,
      en: `${baseUrl}/en/aviso-privacidad-mexico`,
      de: `${baseUrl}/de/aviso-privacidad-mexico`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AvisoPrivacidadMexicoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

