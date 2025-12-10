// Layout con metadata SEO para Términos y Condiciones
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de Santivilla. Condiciones de servicio y uso de la plataforma.',
  alternates: {
    canonical: `${baseUrl}/terminos`,
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

export default function TerminosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

