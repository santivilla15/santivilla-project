// Layout con metadata SEO para Aviso de Privacidad México
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad Simplificado - México',
  description: 'Aviso de Privacidad Simplificado de Santivilla conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.',
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

