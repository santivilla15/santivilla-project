// Layout para ranking en inglés con metadata SEO
import { rankingMetadataEn } from '../../ranking/metadata'
import type { Metadata } from 'next'

// Exportar metadata para SEO
export const metadata: Metadata = rankingMetadataEn

export default function EnglishRankingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

