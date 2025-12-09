// Layout principal de Santivilla
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { OrganizationSchema, WebSiteSchema } from './components/StructuredData'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Analytics from './components/Analytics'
import ServiceWorker from './components/ServiceWorker'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// URL base del sitio
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'
const siteName = 'Santivilla'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Santivilla - Ranking Solidario | 95% para Refugios de Animales',
    template: `%s | ${siteName}`,
  },
  description: 'Compite por ser #1 en el ranking solidario. El 95% de tu donación va directo a refugios de animales. Transparencia total, impacto real.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      es: baseUrl,
      en: `${baseUrl}/en`,
      de: `${baseUrl}/de`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preconnect para Google Analytics */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-background)] text-[var(--color-text)] min-h-screen`}
      >
        {/* Navegación principal */}
        <Navigation />

        {/* Contenido principal */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer mejorado */}
        <Footer />

        {/* Google Analytics */}
        <Analytics />
        
        {/* Service Worker para PWA */}
        <ServiceWorker />
      </body>
    </html>
  )
}
