// Layout específico para la página de impacto con metadata SEO optimizada
import type { Metadata } from 'next'
import { impactoMetadata } from './metadata'

export const metadata: Metadata = impactoMetadata

export default function ImpactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

