// Robots.txt dinámico para SEO
// Next.js genera automáticamente el robots.txt desde este archivo
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Obtener la URL base desde las variables de entorno o usar localhost por defecto
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

