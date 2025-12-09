// Layout específico para la página de ranking con metadata SEO optimizada
import type { Metadata } from 'next'
import { rankingMetadata } from './metadata'

export const metadata: Metadata = rankingMetadata

export default function RankingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

