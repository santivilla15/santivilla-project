// Página principal (Home) de Santivilla
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import BoostForm from '@/components/BoostForm'
import Link from 'next/link'

// Componente interno que usa useSearchParams
function HomeContent() {
  // Obtener los parámetros de la URL para detectar cancelaciones
  const searchParams = useSearchParams()
  const canceled = searchParams?.get('canceled') === 'true'
  
  // Estado para mostrar el mensaje de cancelación
  const [showCanceled, setShowCanceled] = useState(canceled || false)

  // Ocultar el mensaje de cancelación después de 5 segundos
  useEffect(() => {
    if (showCanceled) {
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Sección principal de la landing */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Mostrar mensaje si el pago fue cancelado */}
        {showCanceled && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-md p-4 text-yellow-400 text-center">
              ⚠️ El pago fue cancelado. Puedes intentar de nuevo cuando quieras.
            </div>
          </div>
        )}

        {/* Imagen hero de animal */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md h-64 md:h-80 rounded-lg overflow-hidden border-2 border-green-500/30 shadow-lg shadow-green-500/20">
            <Image
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop"
              alt="Animales esperando un hogar"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>

        {/* Título principal con efecto de brillo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-400 text-glow">
            Sé #1 en el ranking.
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            Ayuda animales al mismo tiempo.
          </h2>
          
          {/* Subtítulo explicativo */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            Paga para subir puestos. El <span className="text-green-400 font-bold">95%</span> de tu dinero va directo a animales. 
            Solo cobramos una comisión pequeña (<span className="text-green-400">1.50 € fijos + 5%</span>) para mantener los servidores y crecer.
          </p>
        </div>

        {/* Botones CTA */}
        <div className="text-center mb-12 space-y-4">
          {/* Botón principal - lleva al formulario de boost */}
          <div>
            <a
              href="#boost-form"
              className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-bold text-lg rounded-md transition-colors shadow-lg shadow-green-500/50"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('boost-form')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Entrar al ranking
            </a>
          </div>
          {/* Botón secundario - ver ranking actual */}
          <div>
            <Link
              href="/ranking"
              className="inline-block px-6 py-3 border-2 border-green-500/50 hover:border-green-500 text-green-400 hover:text-green-300 font-semibold text-base rounded-md transition-colors"
            >
              Ver ranking actual
            </Link>
          </div>
        </div>

        {/* Formulario de boost */}
        <div id="boost-form" className="max-w-2xl mx-auto mb-16 scroll-mt-24">
          <BoostForm />
        </div>

        {/* Galería de animales */}
        <div className="max-w-6xl mx-auto mt-16 mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-green-400 mb-8">
            Cada euro ayuda a estos amigos 🐾
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Imagen 1 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-green-500/30 shadow-lg hover:scale-105 transition-transform">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop"
                alt="Perro en refugio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Imagen 2 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-green-500/30 shadow-lg hover:scale-105 transition-transform">
              <Image
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop"
                alt="Gato esperando adopción"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Imagen 3 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-green-500/30 shadow-lg hover:scale-105 transition-transform">
              <Image
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop"
                alt="Perro feliz"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Imagen 4 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-green-500/30 shadow-lg hover:scale-105 transition-transform">
              <Image
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop"
                alt="Gato en refugio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Sección de información adicional */}
        <div className="max-w-4xl mx-auto mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
            <div className="text-4xl font-bold text-green-400 mb-2">~95%</div>
            <p className="text-gray-300">Para refugios de animales</p>
            <p className="text-xs text-gray-500 mt-2">(varía según el monto)</p>
          </div>
          <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
            <div className="text-4xl font-bold text-gray-400 mb-2">~5%</div>
            <p className="text-gray-300">Mantiene la plataforma</p>
            <p className="text-xs text-gray-500 mt-2">(1.50€ + 5% variable)</p>
          </div>
          <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
            <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
            <p className="text-gray-300">Transparencia total</p>
            <p className="text-xs text-gray-500 mt-2">Cada euro contabilizado</p>
          </div>
        </div>

        {/* Link a la página de impacto */}
        <div className="text-center mt-12">
          <Link
            href="/impacto"
            className="text-green-400 hover:text-green-300 underline transition-colors"
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          <p className="mt-4 text-gray-400">Cargando...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
