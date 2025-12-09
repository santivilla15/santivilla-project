// Metadata específica para la página de ranking con soporte multiidioma
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

// Metadata para español
export const rankingMetadata: Metadata = {
  title: 'Ranking Santivilla - Top Donadores | Ver Quién Está Ganando',
  description: 'Descubre quién está en el top del ranking solidario. Los usuarios que más han donado para ayudar a refugios de animales. Actualización en tiempo real. Compite por ser #1.',
  keywords: [
    'ranking donaciones',
    'top donadores',
    'ranking solidario',
    'quién dona más',
    'ranking animales',
    'top contribuidores',
  ],
  openGraph: {
    title: 'Ranking Santivilla - Top Donadores',
    description: 'Descubre quién está en el top del ranking solidario para ayudar a animales.',
    url: `${baseUrl}/ranking`,
    type: 'website',
  },
  twitter: {
    title: 'Ranking Santivilla - Top Donadores',
    description: 'Descubre quién está en el top del ranking solidario.',
  },
  alternates: {
    canonical: `${baseUrl}/ranking`,
    languages: {
      es: `${baseUrl}/ranking`,
      en: `${baseUrl}/en/ranking`,
      de: `${baseUrl}/de/ranking`,
    },
  },
}

// Metadata para inglés
export const rankingMetadataEn: Metadata = {
  title: 'Santivilla Ranking - Top Donors | See Who\'s Winning',
  description: 'Discover who\'s at the top of the solidarity ranking. Users who have donated the most to help animal shelters. Real-time updates. Compete to be #1.',
  keywords: [
    'donation ranking',
    'top donors',
    'solidarity ranking',
    'who donates more',
    'animal ranking',
    'top contributors',
  ],
  openGraph: {
    title: 'Santivilla Ranking - Top Donors',
    description: 'Discover who\'s at the top of the solidarity ranking to help animals.',
    url: `${baseUrl}/en/ranking`,
    type: 'website',
  },
  twitter: {
    title: 'Santivilla Ranking - Top Donors',
    description: 'Discover who\'s at the top of the solidarity ranking.',
  },
  alternates: {
    canonical: `${baseUrl}/en/ranking`,
    languages: {
      es: `${baseUrl}/ranking`,
      en: `${baseUrl}/en/ranking`,
      de: `${baseUrl}/de/ranking`,
    },
  },
}

// Metadata para alemán
export const rankingMetadataDe: Metadata = {
  title: 'Santivilla Ranking - Top-Spender | Sehen Sie, wer gewinnt',
  description: 'Entdecken Sie, wer an der Spitze des Solidaritätsrankings steht. Benutzer, die am meisten gespendet haben, um Tierheimen zu helfen. Echtzeit-Updates. Wetteifern Sie um Platz #1.',
  keywords: [
    'Spendenranking',
    'Top-Spender',
    'Solidaritätsranking',
    'wer spendet mehr',
    'Tierranking',
    'Top-Beiträger',
  ],
  openGraph: {
    title: 'Santivilla Ranking - Top-Spender',
    description: 'Entdecken Sie, wer an der Spitze des Solidaritätsrankings steht, um Tieren zu helfen.',
    url: `${baseUrl}/de/ranking`,
    type: 'website',
  },
  twitter: {
    title: 'Santivilla Ranking - Top-Spender',
    description: 'Entdecken Sie, wer an der Spitze des Solidaritätsrankings steht.',
  },
  alternates: {
    canonical: `${baseUrl}/de/ranking`,
    languages: {
      es: `${baseUrl}/ranking`,
      en: `${baseUrl}/en/ranking`,
      de: `${baseUrl}/de/ranking`,
    },
  },
}

