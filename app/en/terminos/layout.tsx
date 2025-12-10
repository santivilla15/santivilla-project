// Layout with SEO metadata for Terms and Conditions
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Santivilla terms and conditions. Service and platform usage terms.',
  alternates: {
    canonical: `${baseUrl}/en/terminos`,
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

