// Layout para impacto en alemán con metadata SEO
import { impactoMetadataDe } from '../../impacto/metadata'
import type { Metadata } from 'next'

// Exportar metadata para SEO
export const metadata: Metadata = impactoMetadataDe

export default function GermanImpactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

