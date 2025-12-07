// Página del ranking público
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RankingUser } from '@/lib/types/database'

// Componente interno que usa useSearchParams
function RankingContent() {
  // Obtener los parámetros de la URL para detectar pagos exitosos
  const searchParams = useSearchParams()
  const success = searchParams?.get('success') === 'true'
  
  // Estado para almacenar el ranking de usuarios
  const [ranking, setRanking] = useState<Array<RankingUser & { rank: number }>>([])
  // Estado para indicar si se está cargando el ranking
  const [loading, setLoading] = useState(true)
  // Estado para almacenar errores si ocurren
  const [error, setError] = useState('')
  // Estado para mostrar el mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(success || false)

  // Función para obtener el ranking desde la API
  const fetchRanking = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/ranking')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar el ranking')
      }

      // Actualizar el estado con los datos del ranking
      setRanking(data.ranking || [])
      setError('')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Hubo un error al cargar el ranking'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Cargar el ranking cuando el componente se monta
  useEffect(() => {
    fetchRanking()

    // Actualizar el ranking cada 10 segundos para mantenerlo actualizado
    const interval = setInterval(fetchRanking, 10000)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval)
  }, [])

  // Ocultar el mensaje de éxito después de 5 segundos
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false)
        // Limpiar el query param de la URL sin recargar
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href)
          url.searchParams.delete('success')
          window.history.replaceState({}, '', url.toString())
        }
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Título de la página */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4 text-glow">
            Ranking Santivilla
          </h1>
          <p className="text-gray-400 text-lg">
            Los mejores compitiendo por una buena causa
          </p>
        </div>

        {/* Banner decorativo con imagen */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-4xl h-32 md:h-48 rounded-lg overflow-hidden border-2 border-green-500/30 shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=300&fit=crop"
              alt="Animales en refugio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <p className="text-lg md:text-2xl font-bold mb-1">🏆 Compite por ser #1</p>
                <p className="text-sm md:text-base text-gray-300">Ayuda animales mientras subes en el ranking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mostrar mensaje de éxito después del pago */}
        {showSuccess && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-green-900/30 border border-green-500/50 rounded-md p-4 text-green-400 text-center">
              ✅ ¡Pago exitoso! Tu posición en el ranking se actualizará en breve.
            </div>
          </div>
        )}

        {/* Mostrar estado de carga */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-400">Cargando ranking...</p>
          </div>
        )}

        {/* Mostrar error si ocurre */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-900/30 border border-red-500/50 rounded-md p-4 text-red-400 text-center">
              {error}
            </div>
          </div>
        )}

        {/* Tabla del ranking */}
        {!loading && !error && (
          <div className="max-w-4xl mx-auto">
            {/* Contenedor de la tabla con estilo retro/gaming */}
            <div className="bg-gray-900 border border-green-500/30 rounded-lg overflow-hidden shadow-lg shadow-green-500/10">
              {/* Encabezado de la tabla */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-green-500/10 border-b border-green-500/30 font-bold text-green-400">
                <div className="text-center">RANK</div>
                <div className="text-center">SCORE (€)</div>
                <div className="text-center">NAME</div>
              </div>

              {/* Cuerpo de la tabla */}
              <div className="max-h-[600px] overflow-y-auto">
                {ranking.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4">🏆</div>
                    <p className="text-xl text-gray-300 mb-2 font-bold">Aún no hay usuarios en el ranking</p>
                    <p className="text-gray-400 mb-4">¡Sé el primero en subir de posición y ayudar a los animales!</p>
                    <Link
                      href="/"
                      className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-md transition-colors mt-4"
                    >
                      Contribuir ahora
                    </Link>
                  </div>
                ) : (
                  ranking.map((user) => (
                    <div
                      key={user.id}
                      className={`grid grid-cols-3 gap-4 p-4 border-b border-gray-800 hover:bg-green-500/5 transition-colors ${
                        user.rank === 1 ? 'bg-yellow-900/20 border-yellow-500/30' : ''
                      } ${
                        user.rank === 2 ? 'bg-gray-700/20 border-gray-500/30' : ''
                      } ${
                        user.rank === 3 ? 'bg-orange-900/20 border-orange-500/30' : ''
                      }`}
                    >
                      {/* Columna RANK */}
                      <div className="text-center font-bold text-lg">
                        {user.rank === 1 && '🥇'}
                        {user.rank === 2 && '🥈'}
                        {user.rank === 3 && '🥉'}
                        {user.rank > 3 && '#'}
                        {user.rank}
                      </div>

                      {/* Columna SCORE */}
                      <div className="text-center text-green-400 font-semibold">
                        {user.score.toFixed(2)} €
                      </div>

                      {/* Columna NAME */}
                      <div className="text-center truncate" title={user.name}>
                        {user.name}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Botón para volver a la home */}
            <div className="text-center mt-8">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-md transition-colors"
              >
                Subir en el ranking
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente principal envuelto en Suspense
export default function RankingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-400">Cargando...</p>
          </div>
        </div>
      </div>
    }>
      <RankingContent />
    </Suspense>
  )
}

