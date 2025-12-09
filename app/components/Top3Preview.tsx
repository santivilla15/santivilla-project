'use client'

// Componente que muestra el TOP 3 del ranking en la landing page
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Top3User {
  rank: number
  name: string
  score: number
}

const translations = {
  es: {
    title: '🏆 TOP 3 AHORA MISMO',
    viewFull: 'Ver ranking completo →',
    noName: 'Sin nombre',
  },
  en: {
    title: '🏆 TOP 3 RIGHT NOW',
    viewFull: 'View full ranking →',
    noName: 'No name',
  },
  de: {
    title: '🏆 TOP 3 JETZT',
    viewFull: 'Vollständiges Ranking anzeigen →',
    noName: 'Kein Name',
  },
}

export default function Top3Preview() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  
  // Obtener la ruta correcta para el ranking según el idioma
  const rankingPath = pathname.startsWith('/en') ? '/en/ranking' : pathname.startsWith('/de') ? '/de/ranking' : '/ranking'
  const [top3, setTop3] = useState<Top3User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Función para obtener el TOP 3
    const fetchTop3 = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch('/api/ranking', {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        })

        clearTimeout(timeoutId)

        // Si la respuesta no es ok, no lanzar error, simplemente no mostrar datos
        if (!response.ok) {
          console.warn('Error al obtener el ranking:', response.status, response.statusText)
          setError(true)
          setLoading(false)
          return
        }

        const data = await response.json()
        const ranking = data.ranking || []
        
        // Si no hay datos, simplemente no mostrar el componente
        if (!Array.isArray(ranking) || ranking.length === 0) {
          setTop3([])
          setLoading(false)
          return
        }
        
        // Obtener solo los primeros 3
        const top3Data = ranking.slice(0, 3).map((user: any) => ({
          rank: user.rank || 0,
          name: user.name || t.noName,
          score: parseFloat(user.score) || 0,
        }))

        setTop3(top3Data)
        setError(false)
        setLoading(false)
      } catch (error) {
        // Si es un error de abort (timeout), no es crítico
        if (error instanceof Error && error.name === 'AbortError') {
          console.warn('Timeout al obtener TOP 3, reintentando más tarde')
          setError(true)
          setLoading(false)
          return
        }
        
        // Otros errores
        console.error('Error obteniendo TOP 3:', error)
        setError(true)
        setLoading(false)
      }
    }

    fetchTop3()
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchTop3, 30000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  // Si hay error o no hay datos, no mostrar el componente
  if (error || top3.length === 0) {
    return null
  }

  if (loading) {
    return (
      <div className="bg-[var(--color-background-alt)] border-2 border-[var(--color-primary)] rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4 text-center">
          {t.title}
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-8 h-8 bg-[var(--color-border-dark)] rounded-full"></div>
              <div className="flex-1 h-6 bg-[var(--color-border-dark)] rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--color-background-alt)] border-2 border-[var(--color-primary)] rounded-lg p-6 shadow-lg animate-fade-in">
      <h3 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-4 text-center">
        {t.title}
      </h3>
      <div className="space-y-3 mb-4">
        {top3.map((user, index) => (
          <div
            key={user.rank}
            className="flex items-center gap-3 p-3 bg-[var(--color-background)] rounded-md border border-[var(--color-border-dark)] hover:border-[var(--color-primary)] transition-colors"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
              index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
              index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
              'bg-gradient-to-br from-orange-300 to-orange-500'
            }`}>
              {user.rank}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[var(--color-text)]">{user.name}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {user.score.toFixed(2)} €
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link
        href={rankingPath}
        className="block text-center text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-semibold transition-colors underline"
        aria-label={t.viewFull}
      >
        {t.viewFull}
      </Link>
    </div>
  )
}

