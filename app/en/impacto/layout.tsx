// Layout para impacto en inglés con metadata SEO
import { impactoMetadataEn } from '../../impacto/metadata'
import type { Metadata } from 'next'

// Exportar metadata para SEO
export const metadata: Metadata = impactoMetadataEn

export default function EnglishImpactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

