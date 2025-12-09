// Sitemap dinámico para SEO avanzado con soporte multiidioma
// Next.js genera automáticamente el sitemap.xml desde este archivo
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Obtener la URL base desde las variables de entorno o usar localhost por defecto
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'
  const now = new Date()

  // Definir las rutas principales del sitio con metadata completa y alternativas de idioma
  const routes: MetadataRoute.Sitemap = [
    // Página principal (home)
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    {
      url: `${baseUrl}/de`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    // Página de ranking
    {
      url: `${baseUrl}/ranking`,
      lastModified: now,
      changeFrequency: 'hourly', // El ranking cambia frecuentemente
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/ranking`,
          en: `${baseUrl}/en/ranking`,
          de: `${baseUrl}/de/ranking`,
        },
      },
    },
    {
      url: `${baseUrl}/en/ranking`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/ranking`,
          en: `${baseUrl}/en/ranking`,
          de: `${baseUrl}/de/ranking`,
        },
      },
    },
    {
      url: `${baseUrl}/de/ranking`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/ranking`,
          en: `${baseUrl}/en/ranking`,
          de: `${baseUrl}/de/ranking`,
        },
      },
    },
    // Página de impacto/transparencia
    {
      url: `${baseUrl}/impacto`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/impacto`,
          en: `${baseUrl}/en/impacto`,
          de: `${baseUrl}/de/impacto`,
        },
      },
    },
    {
      url: `${baseUrl}/en/impacto`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/impacto`,
          en: `${baseUrl}/en/impacto`,
          de: `${baseUrl}/de/impacto`,
        },
      },
    },
    {
      url: `${baseUrl}/de/impacto`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/impacto`,
          en: `${baseUrl}/en/impacto`,
          de: `${baseUrl}/de/impacto`,
        },
      },
    },
    // Página de FAQ
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/faq`,
          en: `${baseUrl}/en/faq`,
          de: `${baseUrl}/de/faq`,
        },
      },
    },
    {
      url: `${baseUrl}/en/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/faq`,
          en: `${baseUrl}/en/faq`,
          de: `${baseUrl}/de/faq`,
        },
      },
    },
    {
      url: `${baseUrl}/de/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/faq`,
          en: `${baseUrl}/en/faq`,
          de: `${baseUrl}/de/faq`,
        },
      },
    },
  ]

  return routes
}

