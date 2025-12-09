// Layout para ranking en alemán con metadata SEO
import { rankingMetadataDe } from '../../ranking/metadata'
import type { Metadata } from 'next'

// Exportar metadata para SEO
export const metadata: Metadata = rankingMetadataDe

export default function GermanRankingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

