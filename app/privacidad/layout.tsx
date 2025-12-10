// Layout con metadata SEO para Política de Privacidad
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Santivilla. Información sobre cómo recopilamos, usamos y protegemos tus datos personales según el GDPR.',
  alternates: {
    canonical: `${baseUrl}/privacidad`,
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

export default function PrivacidadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

