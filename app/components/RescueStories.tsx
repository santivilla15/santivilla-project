'use client'

// Componente que muestra historias de rescate de animales
import { usePathname } from 'next/navigation'
import Image from 'next/image'

interface RescueStory {
  name: string
  image: string
  amount: number
  timeAgo: { es: string; en: string; de: string }
}

const stories: RescueStory[] = [
  {
    name: 'Luna',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    amount: 450,
    timeAgo: { es: 'hace 2 semanas', en: '2 weeks ago', de: 'vor 2 Wochen' },
  },
  {
    name: 'Max',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop',
    amount: 300,
    timeAgo: { es: 'hace 3 semanas', en: '3 weeks ago', de: 'vor 3 Wochen' },
  },
  {
    name: 'Bella',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
    amount: 200,
    timeAgo: { es: 'hace 1 mes', en: '1 month ago', de: 'vor 1 Monat' },
  },
]

const translations = {
  es: {
    title: '💚 Historias de Impacto',
    rescued: 'Fue rescatado gracias a',
    donated: 'donados',
    safe: '🐾 Ahora está en un hogar seguro',
  },
  en: {
    title: '💚 Impact Stories',
    rescued: 'Was rescued thanks to',
    donated: 'donated',
    safe: '🐾 Now in a safe home',
  },
  de: {
    title: '💚 Rettungsgeschichten',
    rescued: 'Wurde gerettet dank',
    donated: 'gespendet',
    safe: '🐾 Jetzt in einem sicheren Zuhause',
  },
}

export default function RescueStories() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  return (
    <div className="max-w-6xl mx-auto mt-20 mb-12">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary)] mb-8">
        {t.title}
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative h-48">
              <Image
                src={story.image}
                alt={`${story.name} ${lang === 'es' ? 'rescatado' : lang === 'en' ? 'rescued' : 'gerettet'}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-4">
              <h4 className="text-xl font-bold text-[var(--color-primary)] mb-2">
                {story.name}
              </h4>
              <p className="text-[var(--color-text)] mb-1">
                {t.rescued}{' '}
                <span className="font-bold text-[var(--color-secondary)]">
                  {story.amount.toFixed(2)} €
                </span>{' '}
                {t.donated} {story.timeAgo[lang]}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {t.safe}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

