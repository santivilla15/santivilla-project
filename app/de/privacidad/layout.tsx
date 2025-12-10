// Layout mit SEO-Metadaten für Datenschutzerklärung
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von Santivilla. Informationen darüber, wie wir Ihre persönlichen Daten gemäß DSGVO sammeln, verwenden und schützen.',
  alternates: {
    canonical: `${baseUrl}/de/privacidad`,
    languages: {
      es: `${baseUrl}/privacidad`,
      en: `${baseUrl}/en/privacidad`,
      de: `${baseUrl}/de/privacidad`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

