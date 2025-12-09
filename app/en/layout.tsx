// Layout para páginas en inglés con metadata SEO
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

export const metadata: Metadata = {
  title: {
    default: 'Santivilla - Solidarity Ranking | 95% for Animal Shelters',
    template: '%s | Santivilla',
  },
  description: 'Compete to be #1 in the solidarity ranking. 95% of your donation goes directly to animal shelters. Total transparency, real impact.',
  alternates: {
    canonical: `${baseUrl}/en`,
    languages: {
      es: baseUrl,
      en: `${baseUrl}/en`,
      de: `${baseUrl}/de`,
    },
  },
  openGraph: {
    title: 'Santivilla - Solidarity Ranking | 95% for Animal Shelters',
    description: 'Compete to be #1 in the solidarity ranking. 95% of your donation goes directly to animal shelters.',
    url: `${baseUrl}/en`,
    type: 'website',
  },
}

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

