// Layout para páginas en alemán con metadata SEO
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: {
    default: 'Santivilla - Solidaritätsranking | 95% für Tierheime',
    template: '%s | Santivilla',
  },
  description: 'Wetteifere um Platz #1 im Solidaritätsranking. 95% deiner Spende gehen direkt an Tierheime. Vollständige Transparenz, echte Wirkung.',
  alternates: {
    canonical: `${baseUrl}/de`,
    languages: {
      es: baseUrl,
      en: `${baseUrl}/en`,
      de: `${baseUrl}/de`,
    },
  },
  openGraph: {
    title: 'Santivilla - Solidaritätsranking | 95% für Tierheime',
    description: 'Wetteifere um Platz #1 im Solidaritätsranking. 95% deiner Spende gehen direkt an Tierheime.',
    url: `${baseUrl}/de`,
    type: 'website',
  },
}

export default function GermanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

