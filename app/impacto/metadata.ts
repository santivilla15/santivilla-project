// Metadata específica para la página de impacto con soporte multiidioma
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

// Metadata para español
export const impactoMetadata: Metadata = {
  title: 'Transparencia e Impacto | Santivilla - Ver Dónde Va Tu Donación',
  description: 'Transparencia total: descubre exactamente cómo se distribuyen las donaciones. El 95% va directo a refugios de animales. Ver estadísticas, gráficos y el impacto real de cada euro donado.',
  keywords: [
    'transparencia donaciones',
    'impacto donaciones',
    'dónde va mi donación',
    'transparencia animal',
    'estadísticas donaciones',
    'impacto real',
  ],
  openGraph: {
    title: 'Transparencia e Impacto - Santivilla',
    description: 'Transparencia total: el 95% de las donaciones van directo a refugios de animales.',
    url: `${baseUrl}/impacto`,
    type: 'website',
  },
  twitter: {
    title: 'Transparencia e Impacto - Santivilla',
    description: 'Transparencia total: el 95% de las donaciones van directo a refugios.',
  },
  alternates: {
    canonical: `${baseUrl}/impacto`,
    languages: {
      es: `${baseUrl}/impacto`,
      en: `${baseUrl}/en/impacto`,
      de: `${baseUrl}/de/impacto`,
    },
  },
}

// Metadata para inglés
export const impactoMetadataEn: Metadata = {
  title: 'Transparency and Impact | Santivilla - See Where Your Donation Goes',
  description: 'Total transparency: discover exactly how donations are distributed. 95% goes directly to animal shelters. View statistics, charts and the real impact of every euro donated.',
  keywords: [
    'donation transparency',
    'donation impact',
    'where does my donation go',
    'animal transparency',
    'donation statistics',
    'real impact',
  ],
  openGraph: {
    title: 'Transparency and Impact - Santivilla',
    description: 'Total transparency: 95% of donations go directly to animal shelters.',
    url: `${baseUrl}/en/impacto`,
    type: 'website',
  },
  twitter: {
    title: 'Transparency and Impact - Santivilla',
    description: 'Total transparency: 95% of donations go directly to shelters.',
  },
  alternates: {
    canonical: `${baseUrl}/en/impacto`,
    languages: {
      es: `${baseUrl}/impacto`,
      en: `${baseUrl}/en/impacto`,
      de: `${baseUrl}/de/impacto`,
    },
  },
}

// Metadata para alemán
export const impactoMetadataDe: Metadata = {
  title: 'Transparenz und Wirkung | Santivilla - Sehen Sie, wohin Ihre Spende geht',
  description: 'Vollständige Transparenz: Entdecken Sie genau, wie Spenden verteilt werden. 95% gehen direkt an Tierheime. Statistiken, Diagramme und die tatsächliche Wirkung jedes gespendeten Euros anzeigen.',
  keywords: [
    'Spendentransparenz',
    'Spendenwirkung',
    'wohin geht meine Spende',
    'Tiertransparenz',
    'Spendenstatistiken',
    'tatsächliche Wirkung',
  ],
  openGraph: {
    title: 'Transparenz und Wirkung - Santivilla',
    description: 'Vollständige Transparenz: 95% der Spenden gehen direkt an Tierheime.',
    url: `${baseUrl}/de/impacto`,
    type: 'website',
  },
  twitter: {
    title: 'Transparenz und Wirkung - Santivilla',
    description: 'Vollständige Transparenz: 95% der Spenden gehen direkt an Tierheime.',
  },
  alternates: {
    canonical: `${baseUrl}/de/impacto`,
    languages: {
      es: `${baseUrl}/impacto`,
      en: `${baseUrl}/en/impacto`,
      de: `${baseUrl}/de/impacto`,
    },
  },
}

