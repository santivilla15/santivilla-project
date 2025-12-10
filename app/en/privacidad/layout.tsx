// Layout con metadata SEO para Privacy Policy
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Santivilla privacy policy. Information about how we collect, use and protect your personal data according to GDPR.',
  alternates: {
    canonical: `${baseUrl}/en/privacidad`,
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

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

