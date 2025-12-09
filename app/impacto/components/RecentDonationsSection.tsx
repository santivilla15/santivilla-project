// Componente para mostrar las donaciones recientes
'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { formatCurrency } from '@/lib/utils/validation'
import DonationsSkeleton from '@/app/components/DonationsSkeleton'

interface RecentDonation {
  amount: number
  donation: number
  date: string
}

// Traducciones
const translations = {
  es: {
    title: '💚 Donaciones Recientes',
    empty: 'Aún no hay donaciones recientes',
    emptySubtitle: '¡Sé el primero en contribuir!',
    amount: 'Monto',
    donation: 'Donación',
    date: 'Fecha',
    locale: 'es-ES',
  },
  en: {
    title: '💚 Recent Donations',
    empty: 'No recent donations yet',
    emptySubtitle: 'Be the first to contribute!',
    amount: 'Amount',
    donation: 'Donation',
    date: 'Date',
    locale: 'en-US',
  },
  de: {
    title: '💚 Kürzliche Spenden',
    empty: 'Noch keine kürzlichen Spenden',
    emptySubtitle: 'Sei der Erste, der beiträgt!',
    amount: 'Betrag',
    donation: 'Spende',
    date: 'Datum',
    locale: 'de-DE',
  },
}

// Función para formatear fechas (fuera del componente para mejor rendimiento)
const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export default function RecentDonationsSection() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const [donations, setDonations] = useState<RecentDonation[]>([])
  const [loading, setLoading] = useState(true)

  // Función memoizada para obtener donaciones
  const fetchDonations = useCallback(async () => {
    try {
      // Crear un AbortController para manejar timeouts
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos de timeout
      
      const response = await fetch('/api/recent-donations', {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        
        // Validar que donations sea un array
        if (data.donations && Array.isArray(data.donations)) {
          setDonations(data.donations)
        }
      }
    } catch (error) {
      // Error silencioso - no es crítico si falla, pero logueamos en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.error('Error cargando donaciones recientes:', error)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDonations()
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchDonations, 30000)
    return () => clearInterval(interval)
  }, [fetchDonations])

  return (
    <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 mb-12 shadow-sm">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 text-center">
        {t.title}
      </h2>
      
      {loading ? (
        <DonationsSkeleton />
      ) : donations.length === 0 ? (
        <div className="text-center text-[var(--color-text-secondary)] py-8">
          <p className="text-sm text-[var(--color-text-secondary)]">
            {t.empty}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mt-2">
            {t.emptySubtitle}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="max-h-64 overflow-y-auto space-y-2">
            {donations.map((donation, index) => {
              const rowBg = index % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-background-alt)]'
              return (
              <div
                key={index}
                className={`${rowBg} border border-[var(--color-border)] rounded-md p-4 flex justify-between items-center hover:border-[var(--color-secondary)] hover:bg-[var(--color-hover)] transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="text-[var(--color-secondary)] font-semibold">
                      {formatCurrency(donation.donation)} {lang === 'es' ? 'a animales' : lang === 'en' ? 'to animals' : 'für Tiere'}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {lang === 'es' ? 'Total:' : lang === 'en' ? 'Total:' : 'Gesamt:'} {formatCurrency(donation.amount)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {formatDate(donation.date, t.locale)}
                  </p>
                </div>
              </div>
            )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

