// Layout with SEO metadata for Legal Notice
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Legal Notice',
  description: 'Santivilla legal notice. Legal information about the platform and its terms.',
  alternates: {
    canonical: `${baseUrl}/en/aviso-legal`,
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

export default function LegalNoticeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

