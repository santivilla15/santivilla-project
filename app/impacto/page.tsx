// Página de Impacto y Transparencia
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TotalStats } from '@/lib/types/database'
import StatsCards from '../components/StatsCards'
import PieChart from '../components/PieChart'
import ExampleTable from './components/ExampleTable'

export default function ImpactoPage() {
  // Estado para almacenar las estadísticas
  const [stats, setStats] = useState<TotalStats | null>(null)
  // Estado para indicar si se está cargando
  const [loading, setLoading] = useState(true)
  // Estado para almacenar errores
  const [error, setError] = useState('')

  // Función para obtener las estadísticas desde la API
  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/stats')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar las estadísticas')
      }

      // Actualizar el estado con las estadísticas
      setStats({
        total_recaudado: data.total_recaudado || 0,
        total_donado: data.total_donado || 0,
        total_plataforma: data.total_plataforma || 0,
      })
      setError('')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Hubo un error al cargar las estadísticas'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Cargar las estadísticas cuando el componente se monta
  useEffect(() => {
    fetchStats()

    // Actualizar las estadísticas cada 30 segundos
    const interval = setInterval(fetchStats, 30000)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval)
  }, [])

  // Función para formatear números como moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Título de la página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4 text-glow">
            ¿Por qué el 30%?
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-6">
            Aquí puedes ver exactamente cómo se distribuye cada euro que recibimos
          </p>
          {/* Texto explicativo */}
          <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 max-w-4xl mx-auto text-left space-y-4">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">¿Por qué Santivilla cobra comisiones?</h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                Cada pago tiene un costo real:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4 mb-3">
                <li>Stripe (pasarela de pagos): ~2.9% + 0.30€</li>
                <li>Servidores: ~200€/mes (dividido entre usuarios)</li>
                <li>Equipo: desarrollo, videos de YouTube, contacto con refugios</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mb-3">
                En lugar de cobrar lo que cuesta realmente (~5-8%), elegimos ser justos:
              </p>
              <div className="bg-green-900/20 border border-green-500/30 rounded p-4 my-3">
                <p className="text-green-400 font-bold mb-2">📊 Modelo de Comisiones Justas:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li><span className="text-green-400 font-semibold">Comisión fija:</span> 1.50€ (cubre el costo mínimo de procesar tu pago)</li>
                  <li><span className="text-green-400 font-semibold">Comisión variable:</span> 5% (reinversión en crecer)</li>
                </ul>
                <p className="text-green-400 font-bold mt-3 text-center">
                  Resultado: ~95% a animales, ~5% a mantener Santivilla
                </p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                <strong>La comisión es variable:</strong> cuanto más donas, menor es el porcentaje que cobra Santivilla.
              </p>
            </div>
            <p className="text-green-400 text-sm italic border-t border-green-500/20 pt-4">
              💡 <strong>Nuestro objetivo:</strong> Cuando seamos sostenibles con sponsors y YouTube, bajar esto a 2-3% y eventualmente 0%.
            </p>
          </div>
        </div>

        {/* Imagen de impacto */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-2xl h-64 md:h-96 rounded-lg overflow-hidden border-2 border-green-500/30 shadow-lg shadow-green-500/20">
            <Image
              src="https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=1200&h=600&fit=crop"
              alt="Animales siendo ayudados"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <p className="text-xl md:text-2xl font-bold mb-2">Tu ayuda hace la diferencia</p>
                <p className="text-sm md:text-base text-gray-300">Cada contribución ayuda a animales necesitados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mostrar estado de carga */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-400">Cargando estadísticas...</p>
          </div>
        )}

        {/* Mostrar error si ocurre */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-md p-4 text-red-400 text-center mb-8 max-w-2xl mx-auto">
            {error}
            {error.includes('Supabase') && (
              <div className="mt-3 text-sm text-red-300">
                <p>La base de datos aún no está configurada.</p>
                <p className="text-xs mt-1">Consulta CONFIGURACION.md para configurar Supabase.</p>
              </div>
            )}
          </div>
        )}

        {/* Mostrar estadísticas */}
        {!loading && !error && stats && (
          <div className="max-w-4xl mx-auto">
            {/* Tarjetas de estadísticas principales */}
            <StatsCards
              totalRecaudado={stats.total_recaudado}
              totalDonado={stats.total_donado}
              totalPlataforma={stats.total_plataforma}
              formatCurrency={formatCurrency}
            />

            {/* Gráfico de Pastel */}
            <PieChart
              totalRecaudado={stats.total_recaudado}
              totalDonado={stats.total_donado}
              totalPlataforma={stats.total_plataforma}
              formatCurrency={formatCurrency}
            />

            {/* Tabla de ejemplos */}
            <ExampleTable />

            {/* Tabla de ejemplos */}
            <ExampleTable />

            {/* Gráfico visual de barras (adicional) */}
            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
                Desglose Detallado
              </h2>
              
              {stats.total_recaudado > 0 ? (
                <div className="space-y-4">
                  {/* Barra de donación */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Donación a Animales</span>
                      <span className="text-green-400 font-bold">
                        {((stats.total_donado / stats.total_recaudado) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-10 overflow-hidden relative">
                      <div
                        className="bg-green-500 h-full flex items-center justify-end pr-4 text-black font-bold text-sm transition-all duration-1000"
                        style={{
                          width: `${(stats.total_donado / stats.total_recaudado) * 100}%`,
                        }}
                      >
                        {((stats.total_donado / stats.total_recaudado) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {formatCurrency(stats.total_donado)}
                    </div>
                  </div>

                  {/* Barra de plataforma */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Mantenimiento de la Plataforma</span>
                      <span className="text-gray-400 font-bold">
                        {((stats.total_plataforma / stats.total_recaudado) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-10 overflow-hidden relative">
                      <div
                        className="bg-gray-500 h-full flex items-center justify-end pr-4 text-white font-bold text-sm transition-all duration-1000"
                        style={{
                          width: `${(stats.total_plataforma / stats.total_recaudado) * 100}%`,
                        }}
                      >
                        {((stats.total_plataforma / stats.total_recaudado) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {formatCurrency(stats.total_plataforma)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-xl text-gray-300 mb-2 font-bold">Aún no hay datos para mostrar</p>
                  <p className="text-gray-400 mb-6">¡Sé el primero en contribuir y ayudar a los animales!</p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-md transition-colors"
                  >
                    Contribuir ahora
                  </Link>
                </div>
              )}
            </div>

            {/* Sección de videos (placeholder para futuro) */}
            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
                Donaciones en Acción
              </h2>
              <div className="text-center text-gray-400 py-8">
                <p className="mb-6 text-lg">
                  Próximamente: videos de YouTube mostrando las donaciones reales a refugios de animales.
                </p>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-6xl mb-4">📹</div>
                    <p className="text-sm">Espacio reservado para videos de YouTube</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Aquí mostraremos evidencia real de cómo se usan las donaciones
                    </p>
                  </div>
                  {/* Imagen de fondo decorativa */}
                  <div className="absolute inset-0 opacity-10">
                    <Image
                      src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=800&h=400&fit=crop"
                      alt="Refugio de animales"
                      fill
                      className="object-cover"
                      sizes="800px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Nota sobre el objetivo futuro */}
            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-6 text-center">
              <p className="text-green-400 text-sm md:text-base">
                <strong>💡 Nuestro objetivo:</strong> Llegar al 100% donado cuando Santivilla sea autosuficiente con otros ingresos.
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Estamos trabajando para encontrar formas alternativas de financiación (publicidad, partnerships, YouTube, etc.)
                para que en el futuro todo lo recaudado vaya directamente a los animales.
              </p>
            </div>

            {/* Galería de animales ayudados */}
            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
                Animales que Están Esperando
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Imagen 1 */}
                <div className="relative h-40 md:h-56 rounded-lg overflow-hidden border border-green-500/30 shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?w=400&h=400&fit=crop"
                    alt="Perro en refugio esperando hogar"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                {/* Imagen 2 */}
                <div className="relative h-40 md:h-56 rounded-lg overflow-hidden border border-green-500/30 shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=400&fit=crop"
                    alt="Gato esperando adopción"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                {/* Imagen 3 */}
                <div className="relative h-40 md:h-56 rounded-lg overflow-hidden border border-green-500/30 shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop"
                    alt="Perro en refugio"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
              <p className="text-center text-gray-400 mt-6 text-sm">
                Cada contribución ayuda a proporcionar comida, cuidados médicos y un hogar temporal para estos animales
              </p>
            </div>

            {/* Botón para volver a la home */}
            <div className="text-center mt-12">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-md transition-colors"
              >
                Contribuir al impacto
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

