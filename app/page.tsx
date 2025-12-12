// Página principal (Home) de Santivilla
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import Image from 'next/image'
import BoostForm from '@/components/BoostForm'
import Link from 'next/link'
import Top3Preview from '@/app/components/Top3Preview'
import RescueStories from '@/app/components/RescueStories'
import AnimatedCounter from '@/app/components/AnimatedCounter'
import { trackCheckoutCancelled } from '@/app/components/Analytics'
// Componente interno que usa useSearchParams
function HomeContent() {
  const pathname = usePathname()
  
  // Obtener los parámetros de la URL para detectar cancelaciones
  const searchParams = useSearchParams()
  const canceled = searchParams?.get('canceled') === 'true'
  
  // Estado para mostrar el mensaje de cancelación
  const [showCanceled, setShowCanceled] = useState(canceled || false)
  // Estado para las estadísticas totales (para el badge de social proof)
  const [totalDonated, setTotalDonated] = useState(0)

  // Ocultar el mensaje de cancelación después de 5 segundos y rastrear cancelación
  useEffect(() => {
    if (showCanceled) {
      // Rastrear cancelación de checkout en Google Analytics
      trackCheckoutCancelled()
      
      const timer = setTimeout(() => {
        setShowCanceled(false)
        // Limpiar el query param de la URL sin recargar
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href)
          url.searchParams.delete('canceled')
          window.history.replaceState({}, '', url.toString())
        }
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showCanceled])

  // Obtener el total donado para el badge de social proof
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        
        const response = await fetch('/api/stats', {
          signal: controller.signal,
        })
        
        clearTimeout(timeoutId)
        
        if (response.ok) {
          const data = await response.json()
          setTotalDonated(data.total_donado || 0)
        }
      } catch (error) {
        console.error('Error obteniendo estadísticas:', error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Hero Section - Sección principal de la landing */}
      <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
        {/* Mostrar mensaje si el pago fue cancelado */}
        {showCanceled && (
          <div className="max-w-2xl mx-auto mb-6 md:mb-8">
            <div className="bg-[#FFF4E6] border border-[var(--color-secondary)] rounded-md p-3 md:p-4 text-[var(--color-secondary)] text-center text-sm md:text-base">
              ⚠️ El pago fue cancelado. Puedes intentar de nuevo cuando quieras.
            </div>
          </div>
        )}

        {/* Imagen hero de animal con overlay mejorado */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative w-full max-w-2xl h-48 sm:h-64 md:h-96 rounded-lg overflow-hidden border-2 border-[var(--color-border-dark)] shadow-lg">
            <Image
              src="/images/IMG_3038.JPG"
              alt="Animales esperando un hogar"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 800px"
            />
            {/* Overlay con gradiente blanco → transparente para mejor legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent"></div>
            {/* Badge de social proof sobre la imagen */}
            {totalDonated > 0 && (
              <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-[var(--color-secondary)] text-white px-2 py-1 md:px-4 md:py-2 rounded-full shadow-lg font-bold text-xs md:text-sm lg:text-base animate-fade-in">
                <AnimatedCounter value={totalDonated} duration={2000} />€ donados
              </div>
            )}
          </div>
        </div>

        {/* Título principal */}
        <div className="text-center mb-8 md:mb-12 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-[var(--color-primary)] text-glow">
            Sé #1 en el Ranking Solidario
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 text-[var(--color-text)]">
            Compite mientras ayudas a animales
          </h2>
          
          {/* Tagline prominente - más grande y en coral */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-secondary)] max-w-3xl mx-auto mb-4 md:mb-6 animate-fade-in px-2">
            🐾 El 95% de tu donación va directo a refugios
          </p>
          
          {/* Subtítulo explicativo */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-4 px-2">
            Transparencia total. Impacto real. Aparece en la cima del ranking público.
          </p>
        </div>

        {/* Botones CTA con microcopy mejorado */}
        <div className="text-center mb-8 md:mb-12 space-y-4 px-2">
          {/* Botón principal - lleva al formulario de boost */}
          <div>
            <a
              href="#boost-form"
              className="inline-block px-6 py-3 md:px-8 md:py-4 lg:py-5 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold text-base md:text-lg lg:text-xl rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('boost-form')?.scrollIntoView({ behavior: 'smooth' })
              }}
              aria-label="Ir al formulario para entrar al ranking"
            >
              Contribuir ahora
            </a>
            <p className="text-xs md:text-sm text-[var(--color-text-secondary)] mt-2 px-2">
              El 95% va directo a refugios • Aparece en el ranking
            </p>
          </div>
          {/* Botón secundario - ver ranking actual */}
          <div>
            <Link
              href="/ranking"
              className="inline-block px-5 py-2.5 md:px-6 md:py-3 border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-primary)] font-semibold text-sm md:text-base rounded-md transition-colors"
              aria-label="Ver el ranking actual de donaciones"
            >
              Ver ranking actual
            </Link>
            <p className="text-xs md:text-sm text-[var(--color-text-secondary)] mt-2 px-2">
              Descubre quién está en la cima
            </p>
          </div>
        </div>

        {/* Sección de incentivos visuales */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-12 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-fade-in-up px-2">
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-3 md:p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl md:text-3xl mb-2">🏆</div>
            <h4 className="font-bold text-[var(--color-primary)] mb-1 text-sm md:text-base">Sé #1 público</h4>
            <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">Aparece en la cima del ranking</p>
          </div>
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-3 md:p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl md:text-3xl mb-2">🐾</div>
            <h4 className="font-bold text-[var(--color-secondary)] mb-1 text-sm md:text-base">95% a animales</h4>
            <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">Tu donación tiene máximo impacto</p>
          </div>
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-3 md:p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl md:text-3xl mb-2">📸</div>
            <h4 className="font-bold text-[var(--color-primary)] mb-1 text-sm md:text-base">Aparecerás en YouTube</h4>
            <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">Visibilidad en nuestras redes</p>
          </div>
        </div>

        {/* TOP 3 Preview - FOMO instantáneo */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12 px-2">
          <Top3Preview />
        </div>

        {/* Formulario de boost */}
        <div id="boost-form" className="max-w-2xl mx-auto mb-12 md:mb-16 scroll-mt-24 px-2">
          <BoostForm />
        </div>

        {/* Historias de rescate - antes del footer */}
        <div className="px-2">
          <RescueStories />
        </div>

        {/* Galería de animales */}
        <div className="max-w-6xl mx-auto mt-12 md:mt-16 mb-8 md:mb-12 px-2">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[var(--color-primary)] mb-6 md:mb-8">
            Cada euro ayuda a estos amigos 🐾
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Imagen 1 */}
            <div className="relative h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/IMG_3035.JPG"
                alt="Animales rescatados"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Imagen 2 */}
            <div className="relative h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/IMG_3036.JPG"
                alt="Animal esperando adopción"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Imagen 3 */}
            <div className="relative h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/IMG_3037.AVIF"
                alt="Animal rescatado"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Imagen 4 */}
            <div className="relative h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/IMG_3038.JPG"
                alt="Animal en refugio"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Sección de información adicional */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center px-2">
          <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-4 md:p-6 shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-2">~95%</div>
            <p className="text-sm md:text-base text-[var(--color-text)]">Para refugios de animales</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2">(varía según el monto)</p>
          </div>
          <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-4 md:p-6 shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-secondary)] mb-2">~5%</div>
            <p className="text-sm md:text-base text-[var(--color-text)]">Mantiene la plataforma</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2">(1.50€ + 5% variable)</p>
          </div>
          <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-4 md:p-6 shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">100%</div>
            <p className="text-sm md:text-base text-[var(--color-text)]">Transparencia total</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2">Cada euro contabilizado</p>
          </div>
        </div>

        {/* Link a la página de impacto */}
        <div className="text-center mt-12">
          <Link
            href="/impacto"
            className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] underline transition-colors"
          >
            Ver transparencia y distribución →
          </Link>
        </div>
      </div>
    </div>
  )
}

// Componente principal envuelto en Suspense
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex items-center justify-center" role="status" aria-live="polite" aria-label="Cargando página principal">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]" aria-hidden="true"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">Cargando...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
