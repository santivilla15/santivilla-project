// Componente para agregar Schema.org structured data (JSON-LD) para SEO avanzado
'use client'

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'BreadcrumbList' | 'FAQPage' | 'ItemList'
  data: Record<string, any>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  )
}

// Schema para la organización
export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'
  
  return (
    <StructuredData
      type="Organization"
      data={{
        name: 'Santivilla',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: 'Plataforma de ranking solidario donde el 95% de las donaciones van directo a refugios de animales. Compite por ser #1 mientras ayudas a nuestros amigos peludos.',
        sameAs: [
          'https://youtube.com/@santivilla',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: 'contacto@santivilla.com',
        },
        areaServed: {
          '@type': 'Country',
          name: 'España',
        },
      }}
    />
  )
}

// Schema para el sitio web
export function WebSiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'
  
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: 'Santivilla',
        url: baseUrl,
        description: 'Ranking solidario para ayudar a refugios de animales. El 95% de tu donación va directo a los animales.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/ranking?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  )
}

// Schema para breadcrumbs
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'
  
  return (
    <StructuredData
      type="BreadcrumbList"
      data={{
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`,
        })),
      }}
    />
  )
}

// Schema para el ranking (ItemList)
export function RankingSchema({ users }: { users: Array<{ name: string; score: number; rank: number }> }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santivilla.com'
  
  return (
    <StructuredData
      type="ItemList"
      data={{
        name: 'Ranking Santivilla - Top Donadores',
        description: 'Ranking de los usuarios que más han donado para ayudar a refugios de animales',
        itemListElement: users.slice(0, 10).map((user) => ({
          '@type': 'ListItem',
          position: user.rank,
          name: user.name,
          description: `${user.name} ha donado ${user.score.toFixed(2)}€ para ayudar a animales`,
        })),
      }}
    />
  )
}

