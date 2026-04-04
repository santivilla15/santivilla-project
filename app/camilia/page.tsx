// Landing page concept "Camilia" - Simulación de landing perfecta para Santivilla
'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Hook para detectar cuando un elemento es visible en pantalla
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

// Componente de contador animado
function Counter({ target, suffix = '', prefix = '', duration = 2000 }: { target: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const { ref, isInView } = useInView()

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString('es-ES')}{suffix}</span>
}

export default function CamiliaLanding() {
  const [scrollY, setScrollY] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Autoplay de los pasos "Cómo funciona"
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const scrollToForm = () => {
    document.getElementById('camilia-cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-[#1F1F1F] overflow-x-hidden">

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src="/images/IMG_3038.JPG"
            alt="Animales esperando un hogar"
            fill
            className="object-cover scale-110"
            priority
            sizes="100vw"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A3A52]/80 via-[#1A3A52]/60 to-[#1A3A52]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A52]/40 to-transparent" />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 z-[1] opacity-30">
          <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-white rounded-full camilia-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 bg-[#FF6B6B] rounded-full camilia-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[60%] left-[30%] w-1 h-1 bg-white rounded-full camilia-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[30%] right-[30%] w-2.5 h-2.5 bg-[#FF6B6B] rounded-full camilia-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-[70%] left-[60%] w-1.5 h-1.5 bg-white rounded-full camilia-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 camilia-fade-in">
            <span className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide">Ranking solidario en vivo</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.95] camilia-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Compite por
            <br />
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] bg-clip-text text-transparent">
              una causa
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed camilia-fade-in-up font-light" style={{ animationDelay: '0.4s' }}>
            Sube al ranking donando a refugios de animales.
            <br className="hidden sm:block" />
            <strong className="text-white font-semibold">El 95% llega directo a quienes lo necesitan.</strong>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center camilia-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={scrollToForm}
              className="group relative px-8 py-4 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-[#FF6B6B]/30 hover:shadow-xl hover:shadow-[#FF6B6B]/40 hover:scale-105"
            >
              <span className="relative z-10">Entrar al ranking</span>
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </button>
            <Link
              href="/ranking"
              className="px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
            >
              Ver ranking actual
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 camilia-bounce">
            <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===================== SOCIAL PROOF BAR ===================== */}
      <section className="relative z-10 -mt-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#1A3A52]">
                <Counter target={95} suffix="%" />
              </div>
              <p className="text-sm text-[#666] mt-1">va directo a refugios</p>
            </div>
            <div className="text-center border-y sm:border-y-0 sm:border-x border-[#EEE] py-4 sm:py-0">
              <div className="text-3xl md:text-4xl font-black text-[#FF6B6B]">
                <Counter target={100} suffix="%" />
              </div>
              <p className="text-sm text-[#666] mt-1">transparencia garantizada</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#1A3A52]">
                <Counter target={0} suffix="" prefix="" />
              </div>
              <p className="text-sm text-[#666] mt-1">intermediarios ocultos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CÓMO FUNCIONA ===================== */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Simple y transparente"
            title="Así funciona"
            subtitle="En 3 pasos estás compitiendo por una buena causa"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16">
            {[
              {
                step: '01',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                title: 'Elige tu nombre',
                desc: 'Escribe el nombre con el que aparecerás en el ranking público.',
              },
              {
                step: '02',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Dona lo que quieras',
                desc: 'Desde 1€. El 95% va a refugios de animales. Pago seguro con Stripe.',
              },
              {
                step: '03',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: 'Sube en el ranking',
                desc: 'Tu posición sube al instante. Compite por el #1 mientras ayudas.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`group relative bg-[#F8F9FA] rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-[#1A3A52]/5 hover:-translate-y-1 border-2 ${
                  activeStep === i ? 'border-[#FF6B6B]/40 shadow-lg shadow-[#FF6B6B]/5' : 'border-transparent'
                }`}
              >
                {/* Step number */}
                <span className="absolute top-4 right-4 text-6xl font-black text-[#1A3A52]/5 group-hover:text-[#FF6B6B]/10 transition-colors">
                  {item.step}
                </span>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  activeStep === i ? 'bg-[#FF6B6B] text-white' : 'bg-[#1A3A52]/10 text-[#1A3A52] group-hover:bg-[#FF6B6B] group-hover:text-white'
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1A3A52] mb-3">{item.title}</h3>
                <p className="text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== IMPACTO VISUAL ===================== */}
      <section className="py-20 md:py-32 bg-[#1A3A52] text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <SectionHeader
            label="Impacto real"
            title="Cada euro cuenta"
            subtitle="Mira a dónde va tu donación"
            dark
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: breakdown visual */}
            <div className="space-y-6">
              <ImpactBar label="Refugios de animales" percentage={95} color="#FF6B6B" />
              <ImpactBar label="Mantenimiento plataforma" percentage={5} color="#4A90D9" />

              <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Transparencia total:</strong> Cada donación se registra públicamente.
                  Puedes ver exactamente cuánto se ha donado y a qué refugios en nuestra
                  <Link href="/impacto" className="text-[#FF6B6B] hover:underline ml-1">página de impacto</Link>.
                </p>
              </div>
            </div>

            {/* Right: image grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: '/images/IMG_3035.JPG', alt: 'Animal rescatado' },
                { src: '/images/IMG_3036.JPG', alt: 'Animal esperando adopción' },
                { src: '/images/IMG_3037.AVIF', alt: 'Animal rescatado' },
                { src: '/images/IMG_3038.JPG', alt: 'Animal en refugio' },
              ].map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl shadow-lg ${
                    i === 0 ? 'row-span-2 h-full min-h-[200px]' : 'h-[140px] md:h-[160px]'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIOS / RAZONES ===================== */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Por qué participar"
            title="Más que un ranking"
            subtitle="Competir nunca se sintió tan bien"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {[
              {
                emoji: '🏆',
                title: 'Visibilidad pública',
                desc: 'Tu nombre aparece en el ranking para que todos vean tu generosidad. Presume de hacer el bien.',
              },
              {
                emoji: '📸',
                title: 'Apareces en YouTube',
                desc: 'Los donantes top aparecen en nuestros vídeos y redes sociales. Más visibilidad, más impacto.',
              },
              {
                emoji: '🐾',
                title: 'Impacto directo',
                desc: 'No hay intermediarios dudosos. El 95% de tu donación llega directamente al refugio.',
              },
              {
                emoji: '🔥',
                title: 'Competición sana',
                desc: 'Reta a tus amigos. Sube posiciones. Cuanto más compites, más animales ayudas.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex gap-5 p-6 rounded-2xl border border-[#EEE] hover:border-[#FF6B6B]/30 hover:shadow-lg hover:shadow-[#FF6B6B]/5 transition-all duration-300"
              >
                <div className="text-4xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A3A52] mb-2">{item.title}</h3>
                  <p className="text-[#666] leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA FINAL ===================== */}
      <section id="camilia-cta" className="py-20 md:py-32 px-4 scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1A3A52] to-[#0F2A3A] rounded-3xl p-8 md:p-16 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B6B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#4A90D9]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <span className="text-5xl md:text-6xl block mb-6">🐾</span>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                ¿Listo para hacer
                <br />
                <span className="text-[#FF6B6B]">la diferencia?</span>
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
                Cada posición en el ranking es una vida animal que mejora.
                Entra ahora y compite por una buena causa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#boost-form"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-[#FF6B6B]/30 hover:shadow-xl hover:scale-105"
                >
                  Contribuir ahora
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/ranking"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:bg-white/5"
                >
                  Ver el ranking
                </Link>
              </div>

              <p className="text-white/40 text-xs mt-6">
                Pago seguro con Stripe • Sin suscripciones • Transparencia total
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER MINI ===================== */}
      <section className="py-8 px-4 border-t border-[#EEE]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#666]">
          <span className="font-bold text-[#1A3A52]">SANTIVILLA</span>
          <div className="flex gap-6">
            <Link href="/impacto" className="hover:text-[#FF6B6B] transition-colors">Transparencia</Link>
            <Link href="/faq" className="hover:text-[#FF6B6B] transition-colors">FAQ</Link>
            <Link href="/privacidad" className="hover:text-[#FF6B6B] transition-colors">Privacidad</Link>
            <Link href="/terminos" className="hover:text-[#FF6B6B] transition-colors">Términos</Link>
          </div>
        </div>
      </section>

      {/* ===================== STYLES ===================== */}
      <style jsx>{`
        @keyframes camilia-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.5); opacity: 0.8; }
        }
        .camilia-float {
          animation: camilia-float 4s ease-in-out infinite;
        }

        @keyframes camilia-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .camilia-fade-in {
          animation: camilia-fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes camilia-fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .camilia-fade-in-up {
          animation: camilia-fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes camilia-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        .camilia-bounce {
          animation: camilia-bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// ===================== SUBCOMPONENTES =====================

function SectionHeader({ label, title, subtitle, dark = false }: { label: string; title: string; subtitle: string; dark?: boolean }) {
  const { ref, isInView } = useInView(0.2)

  return (
    <div ref={ref} className={`text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <span className={`inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full ${
        dark ? 'bg-white/10 text-white/70' : 'bg-[#FF6B6B]/10 text-[#FF6B6B]'
      }`}>
        {label}
      </span>
      <h2 className={`text-3xl md:text-5xl font-black mb-4 ${dark ? 'text-white' : 'text-[#1A3A52]'}`}>
        {title}
      </h2>
      <p className={`text-lg max-w-xl mx-auto ${dark ? 'text-white/60' : 'text-[#666]'}`}>
        {subtitle}
      </p>
    </div>
  )
}

function ImpactBar({ label, percentage, color }: { label: string; percentage: number; color: string }) {
  const { ref, isInView } = useInView(0.3)

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/90 font-medium">{label}</span>
        <span className="text-white font-bold">{percentage}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isInView ? `${percentage}%` : '0%',
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}
