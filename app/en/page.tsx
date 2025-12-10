// Home page - English version
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import BoostForm from '@/components/BoostForm'
import Link from 'next/link'
import Top3Preview from '@/app/components/Top3Preview'
import RescueStories from '@/app/components/RescueStories'
import AnimatedCounter from '@/app/components/AnimatedCounter'

// Internal component that uses useSearchParams
function HomeContent() {
  // Get URL parameters to detect cancellations
  const searchParams = useSearchParams()
  const canceled = searchParams?.get('canceled') === 'true'
  
  // State to show cancellation message
  const [showCanceled, setShowCanceled] = useState(canceled || false)
  // State for total statistics (for social proof badge)
  const [totalDonated, setTotalDonated] = useState(0)

  // Hide cancellation message after 5 seconds
  useEffect(() => {
    if (showCanceled) {
      const timer = setTimeout(() => {
        setShowCanceled(false)
        // Clear query param from URL without reloading
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href)
          url.searchParams.delete('canceled')
          window.history.replaceState({}, '', url.toString())
        }
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showCanceled])

  // Get total donated for social proof badge
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
        console.error('Error fetching statistics:', error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Show message if payment was canceled */}
        {showCanceled && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-[#FFF4E6] border border-[var(--color-secondary)] rounded-md p-4 text-[var(--color-secondary)] text-center">
              ⚠️ Payment was canceled. You can try again whenever you want.
            </div>
          </div>
        )}

        {/* Hero animal image with improved overlay */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl h-64 md:h-96 rounded-lg overflow-hidden border-2 border-[var(--color-border-dark)] shadow-lg">
            <Image
              src="/images/IMG_3038.JPG"
              alt="Animals waiting for a home"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
            {/* Overlay with white → transparent gradient for better readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent"></div>
            {/* Social proof badge on image */}
            {totalDonated > 0 && (
              <div className="absolute top-4 right-4 bg-[var(--color-secondary)] text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm md:text-base animate-fade-in">
                <AnimatedCounter value={totalDonated} duration={2000} />€ donated
              </div>
            )}
          </div>
        </div>

        {/* Main title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-primary)] text-glow">
            Be #1 in the Solidarity Ranking
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[var(--color-text)]">
            Compete while helping animals
          </h2>
          
          {/* Prominent tagline - larger and in coral */}
          <p className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] max-w-3xl mx-auto mb-6 animate-fade-in">
            🐾 95% of your donation goes directly to shelters
          </p>
          
          {/* Explanatory subtitle */}
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-4">
            Total transparency. Real impact. Appear at the top of the public ranking.
          </p>
        </div>

        {/* CTA buttons with improved microcopy */}
        <div className="text-center mb-12 space-y-4">
          {/* Main button - goes to boost form */}
          <div>
            <a
              href="#boost-form"
              className="inline-block px-8 py-4 md:py-5 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold text-lg md:text-xl rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('boost-form')?.scrollIntoView({ behavior: 'smooth' })
              }}
              aria-label="Go to form to enter the ranking"
            >
              Contribute now
            </a>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2">
              95% goes directly to shelters • Appears in the ranking
            </p>
          </div>
          {/* Secondary button - view current ranking */}
          <div>
            <Link
              href="/en/ranking"
              className="inline-block px-6 py-3 border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-primary)] font-semibold text-base rounded-md transition-colors"
              aria-label="View current donation ranking"
            >
              View current ranking
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2">
              Discover who's at the top
            </p>
          </div>
        </div>

        {/* Visual incentives section */}
        <div className="max-w-4xl mx-auto mb-12 grid md:grid-cols-3 gap-4 animate-fade-in-up">
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-bold text-[var(--color-primary)] mb-1">Be public #1</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">Appear at the top of the ranking</p>
          </div>
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🐾</div>
            <h4 className="font-bold text-[var(--color-secondary)] mb-1">95% to animals</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">Your donation has maximum impact</p>
          </div>
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📸</div>
            <h4 className="font-bold text-[var(--color-primary)] mb-1">You'll appear on YouTube</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">Visibility on our networks</p>
          </div>
        </div>

        {/* TOP 3 Preview - instant FOMO */}
        <div className="max-w-2xl mx-auto mb-12">
          <Top3Preview />
        </div>

        {/* Boost form */}
        <div id="boost-form" className="max-w-2xl mx-auto mb-16 scroll-mt-24">
          <BoostForm />
        </div>

        {/* Rescue stories - before footer */}
        <RescueStories />

        {/* Animal gallery */}
        <div className="max-w-6xl mx-auto mt-16 mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary)] mb-8">
            Every euro helps these friends 🐾
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Image 1 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/IMG_3035.JPG"
                alt="Rescued animals"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Image 2 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/IMG_3036.JPG"
                alt="Animal waiting for adoption"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Image 3 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/IMG_3037.AVIF"
                alt="Rescued animal"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Image 4 */}
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/IMG_3038.JPG"
                alt="Animal in shelter"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Additional information section */}
        <div className="max-w-4xl mx-auto mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-[var(--color-secondary)] mb-2">~95%</div>
            <p className="text-[var(--color-text)]">To animal shelters</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2">(varies by amount)</p>
          </div>
          <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-[var(--color-text-secondary)] mb-2">~5%</div>
            <p className="text-[var(--color-text)]">Maintains the platform</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2">(€1.50 + 5% variable)</p>
          </div>
          <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">100%</div>
            <p className="text-[var(--color-text)]">Total transparency</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2">Every euro accounted for</p>
          </div>
        </div>

        {/* Link to impact page */}
        <div className="text-center mt-12">
          <Link
            href="/en/impacto"
            className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] underline transition-colors"
          >
            View transparency and distribution →
          </Link>
        </div>
      </div>
    </div>
  )
}

// Main component wrapped in Suspense
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex items-center justify-center" role="status" aria-live="polite" aria-label="Loading main page">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]" aria-hidden="true"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}

