// Startseite - Deutsche Version
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import BoostForm from '@/components/BoostForm'
import Link from 'next/link'
import Top3Preview from '@/app/components/Top3Preview'
import RescueStories from '@/app/components/RescueStories'
import AnimatedCounter from '@/app/components/AnimatedCounter'

// Interne Komponente, die useSearchParams verwendet
function HomeContent() {
  // URL-Parameter abrufen, um Stornierungen zu erkennen
  const searchParams = useSearchParams()
  const canceled = searchParams?.get('canceled') === 'true'
  
  // Status zum Anzeigen der Stornierungsnachricht
  const [showCanceled, setShowCanceled] = useState(canceled || false)
  // Status für Gesamtstatistiken (für Social-Proof-Badge)
  const [totalDonated, setTotalDonated] = useState(0)

  // Stornierungsnachricht nach 5 Sekunden ausblenden
  useEffect(() => {
    if (showCanceled) {
      const timer = setTimeout(() => {
        setShowCanceled(false)
        // Query-Parameter aus URL löschen, ohne neu zu laden
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href)
          url.searchParams.delete('canceled')
          window.history.replaceState({}, '', url.toString())
        }
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showCanceled])

  // Gesamtbetrag für Social-Proof-Badge abrufen
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
        console.error('Fehler beim Abrufen der Statistiken:', error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Hero-Bereich */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Nachricht anzeigen, wenn Zahlung storniert wurde */}
        {showCanceled && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-[#FFF4E6] border border-[var(--color-secondary)] rounded-md p-4 text-[var(--color-secondary)] text-center">
              ⚠️ Die Zahlung wurde storniert. Sie können es jederzeit erneut versuchen.
            </div>
          </div>
        )}

        {/* Hero-Tierbild mit verbessertem Overlay */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl h-64 md:h-96 rounded-lg overflow-hidden border-2 border-[var(--color-border-dark)] shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop"
              alt="Tiere, die auf ein Zuhause warten"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
            {/* Overlay mit weißem → transparentem Verlauf für bessere Lesbarkeit */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent"></div>
            {/* Social-Proof-Badge auf Bild */}
            {totalDonated > 0 && (
              <div className="absolute top-4 right-4 bg-[var(--color-secondary)] text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm md:text-base animate-fade-in">
                <AnimatedCounter value={totalDonated} duration={2000} />€ gespendet
              </div>
            )}
          </div>
        </div>

        {/* Haupttitel */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-primary)] text-glow">
            Sei #1 im Solidaritäts-Ranking
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[var(--color-text)]">
            Wetteifere, während du Tieren hilfst
          </h2>
          
          {/* Prominenter Slogan - größer und in Koralle */}
          <p className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] max-w-3xl mx-auto mb-6 animate-fade-in">
            🐾 95% deiner Spende gehen direkt an Tierheime
          </p>
          
          {/* Erklärender Untertitel */}
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-4">
            Völlige Transparenz. Echte Wirkung. Erscheine an der Spitze des öffentlichen Rankings.
          </p>
        </div>

        {/* CTA-Buttons mit verbessertem Mikrotext */}
        <div className="text-center mb-12 space-y-4">
          {/* Hauptbutton - führt zum Boost-Formular */}
          <div>
            <a
              href="#boost-form"
              className="inline-block px-8 py-4 md:py-5 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold text-lg md:text-xl rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('boost-form')?.scrollIntoView({ behavior: 'smooth' })
              }}
              aria-label="Zum Formular gehen, um am Ranking teilzunehmen"
            >
              Jetzt beitragen
            </a>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2">
              95% gehen direkt an Tierheime • Erscheint im Ranking
            </p>
          </div>
          {/* Sekundärer Button - aktuelles Ranking anzeigen */}
          <div>
            <Link
              href="/de/ranking"
              className="inline-block px-6 py-3 border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-primary)] font-semibold text-base rounded-md transition-colors"
              aria-label="Aktuelles Spenden-Ranking anzeigen"
            >
              Aktuelles Ranking anzeigen
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2">
              Entdecke, wer an der Spitze steht
            </p>
          </div>
        </div>

        {/* Bereich für visuelle Anreize */}
        <div className="max-w-4xl mx-auto mb-12 grid md:grid-cols-3 gap-4 animate-fade-in-up">
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-bold text-[var(--color-primary)] mb-1">Sei öffentlich #1</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">Erscheine an der Spitze des Rankings</p>
          </div>
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🐾</div>
            <h4 className="font-bold text-[var(--color-secondary)] mb-1">95% für Tiere</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">Deine Spende hat maximale Wirkung</p>
          </div>
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📸</div>
            <h4 className="font-bold text-[var(--color-primary)] mb-1">Du erscheinst auf YouTube</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">Sichtbarkeit in unseren Netzwerken</p>
          </div>
        </div>

        {/* TOP 3 Vorschau - sofortiges FOMO */}
        <div className="max-w-2xl mx-auto mb-12">
          <Top3Preview />
        </div>

        {/* Boost-Formular */}
        <div id="boost-form" className="max-w-2xl mx-auto mb-16 scroll-mt-24">
          <BoostForm />
        </div>

        {/* Rettungsgeschichten - vor Footer */}
        <RescueStories />

        {/* Tiergalerie */}
        <div className="max-w-6xl mx-auto mt-16 mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary)] mb-8">
            Jeder Euro hilft diesen Freunden 🐾
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Bild 1 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop"
                alt="Hund im Tierheim"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Bild 2 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop"
                alt="Katze wartet auf Adoption"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Bild 3 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop"
                alt="Glücklicher Hund"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Bild 4 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop"
                alt="Katze im Tierheim"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Zusätzlicher Informationsbereich */}
        <div className="max-w-4xl mx-auto mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-[var(--color-secondary)] mb-2">~95%</div>
            <p className="text-[var(--color-text)]">Für Tierheime</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2">(variiert je nach Betrag)</p>
          </div>
          <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-[var(--color-text-secondary)] mb-2">~5%</div>
            <p className="text-[var(--color-text)]">Erhält die Plattform</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2">(1,50€ + 5% variabel)</p>
          </div>
          <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">100%</div>
            <p className="text-[var(--color-text)]">Völlige Transparenz</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2">Jeder Euro wird erfasst</p>
          </div>
        </div>

        {/* Link zur Impact-Seite */}
        <div className="text-center mt-12">
          <Link
            href="/de/impacto"
            className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] underline transition-colors"
          >
            Transparenz und Verteilung anzeigen →
          </Link>
        </div>
      </div>
    </div>
  )
}

// Hauptkomponente, eingewickelt in Suspense
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex items-center justify-center" role="status" aria-live="polite" aria-label="Hauptseite wird geladen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]" aria-hidden="true"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">Wird geladen...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}

