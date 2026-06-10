import type { Metadata, Viewport } from 'next'
import './azucar.css'

export const metadata: Metadata = {
  title: 'Camilia · Deja el azúcar día a día',
  description:
    'Camilia, tu compañera para dejar el azúcar cuando te cuesta: racha sin azúcar, modo SOS para antojos, progreso, logros y consejos. Funciona sin conexión y guarda todo en tu dispositivo.',
  manifest: '/azucar-manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Camilia',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#14b8a6',
}

export default function AzucarLayout({ children }: { children: React.ReactNode }) {
  return children
}
