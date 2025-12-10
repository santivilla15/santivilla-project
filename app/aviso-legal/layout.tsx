// Layout con metadata SEO para Aviso Legal
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de Santivilla. Información legal sobre la plataforma y sus términos.',
  alternates: {
    canonical: `${baseUrl}/aviso-legal`,
    languages: {
      es: `${baseUrl}/aviso-legal`,
      en: `${baseUrl}/en/aviso-legal`,
      de: `${baseUrl}/de/aviso-legal`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AvisoLegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

