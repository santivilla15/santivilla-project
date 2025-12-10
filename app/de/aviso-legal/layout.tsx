// Layout mit SEO-Metadaten für Impressum
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von Santivilla. Rechtliche Informationen über die Plattform und ihre Bedingungen.',
  alternates: {
    canonical: `${baseUrl}/de/aviso-legal`,
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

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

