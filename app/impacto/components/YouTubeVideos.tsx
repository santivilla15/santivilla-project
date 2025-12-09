// Componente para mostrar videos de YouTube de donaciones reales
'use client'

import { usePathname } from 'next/navigation'

// Configuración de videos (puedes agregar más aquí)
// Formato: ID del video de YouTube (la parte después de v= en la URL)
const YOUTUBE_VIDEOS = [
  // Ejemplo: 'dQw4w9WgXcQ'
  // Agrega los IDs de tus videos aquí cuando los tengas
]

// Traducciones
const translations = {
  es: {
    title: '📹 Videos de Donaciones Reales',
    subtitle: 'Mira cómo tus donaciones ayudan a los animales en tiempo real',
    comingSoon: 'Próximamente: Videos mostrando donaciones reales a refugios de animales',
    placeholder: 'Espacio reservado para videos de YouTube',
    note: 'Aquí mostraremos evidencia real de cómo se usan las donaciones',
    noVideos: 'Aún no hay videos disponibles',
    watchOnYouTube: 'Ver en YouTube',
  },
  en: {
    title: '📹 Real Donation Videos',
    subtitle: 'See how your donations help animals in real-time',
    comingSoon: 'Coming soon: Videos showing real donations to animal shelters',
    placeholder: 'Space reserved for YouTube videos',
    note: 'Here we will show real evidence of how donations are used',
    noVideos: 'No videos available yet',
    watchOnYouTube: 'Watch on YouTube',
  },
  de: {
    title: '📹 Echte Spenden-Videos',
    subtitle: 'Sieh, wie deine Spenden Tieren in Echtzeit helfen',
    comingSoon: 'Bald verfügbar: Videos, die echte Spenden an Tierheime zeigen',
    placeholder: 'Platz für YouTube-Videos reserviert',
    note: 'Hier werden wir echte Beweise zeigen, wie Spenden verwendet werden',
    noVideos: 'Noch keine Videos verfügbar',
    watchOnYouTube: 'Auf YouTube ansehen',
  },
}

export default function YouTubeVideos() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]

  // Si no hay videos, mostrar placeholder
  if (YOUTUBE_VIDEOS.length === 0) {
    return (
      <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 mb-12 shadow-sm">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 text-center">
          {t.title}
        </h2>
        <div className="text-center text-[var(--color-text-secondary)] py-8">
          <p className="mb-6 text-lg">{t.comingSoon}</p>
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-12 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-6xl mb-4">📹</div>
              <p className="text-sm text-[var(--color-text)]">{t.placeholder}</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-2">{t.note}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 mb-12 shadow-sm">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-2 text-center">
        {t.title}
      </h2>
      <p className="text-center text-[var(--color-text-secondary)] mb-6">
        {t.subtitle}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {YOUTUBE_VIDEOS.map((videoId, index) => (
          <div
            key={videoId}
            className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Video embed */}
            <div className="relative w-full pb-[56.25%] bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`${t.title} ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            {/* Link para ver en YouTube */}
            <div className="p-4">
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-medium"
              >
                {t.watchOnYouTube} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

