// Layout para el panel de administración con protección básica
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de Administración | Santivilla',
  description: 'Panel de administración de Santivilla',
  robots: {
    index: false, // No indexar el panel de admin
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

