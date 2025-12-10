// Manifest para PWA (Progressive Web App)
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

  return {
    name: 'Santivilla - Ranking Solidario',
    short_name: 'Santivilla',
    description: 'Compite por ser #1 en el ranking solidario. El 95% de tu donación va directo a refugios de animales.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#1A3A52',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // Nota: Los iconos icon-192.png e icon-512.png deben crearse
      // Ver PWA_ICONS_GUIDE.md para instrucciones
      // Temporalmente comentados para evitar errores en build
      // {
      //   src: '/icon-192.png',
      //   sizes: '192x192',
      //   type: 'image/png',
      //   purpose: 'any maskable',
      // },
      // {
      //   src: '/icon-512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      //   purpose: 'any maskable',
      // },
    ],
    categories: ['social', 'charity', 'finance'],
    lang: 'es',
    dir: 'ltr',
    scope: '/',
    related_applications: [],
    prefer_related_applications: false,
  }
}

