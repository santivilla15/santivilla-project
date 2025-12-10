// Layout mit SEO-Metadaten für Allgemeine Geschäftsbedingungen
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen',
  description: 'Allgemeine Geschäftsbedingungen von Santivilla. Service- und Plattformnutzungsbedingungen.',
  alternates: {
    canonical: `${baseUrl}/de/terminos`,
    languages: {
      es: `${baseUrl}/terminos`,
      en: `${baseUrl}/en/terminos`,
      de: `${baseUrl}/de/terminos`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

