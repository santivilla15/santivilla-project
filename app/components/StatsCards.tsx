// Componente para mostrar tarjetas de estadísticas
'use client'

import { usePathname } from 'next/navigation'

interface StatsCardsProps {
  totalRecaudado: number
  totalDonado: number
  totalPlataforma: number
  formatCurrency: (amount: number) => string
}

const translations = {
  es: {
    totalRaised: 'Total Recaudado',
    donatedToAnimals: 'Donado a Animales',
    forPlatform: 'Para la Plataforma',
    ofTotal: 'del total',
  },
  en: {
    totalRaised: 'Total Raised',
    donatedToAnimals: 'Donated to Animals',
    forPlatform: 'For Platform',
    ofTotal: 'of total',
  },
  de: {
    totalRaised: 'Gesamt gesammelt',
    donatedToAnimals: 'An Tiere gespendet',
    forPlatform: 'Für die Plattform',
    ofTotal: 'vom Gesamtbetrag',
  },
}

export default function StatsCards({
  totalRecaudado,
  totalDonado,
  totalPlataforma,
  formatCurrency,
}: StatsCardsProps) {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {/* Total Recaudado */}
      <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 text-center hover:border-[var(--color-primary)] transition-colors shadow-sm">
        <div className="text-4xl mb-3">💰</div>
        <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">
          {formatCurrency(totalRecaudado)}
        </div>
        <div className="text-[var(--color-text-secondary)]">{t.totalRaised}</div>
      </div>

      {/* Total Donado */}
      <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 text-center hover:border-[var(--color-secondary)] transition-colors shadow-sm">
        <div className="text-4xl mb-3">🐾</div>
        <div className="text-3xl font-bold text-[var(--color-secondary)] mb-2">
          {formatCurrency(totalDonado)}
        </div>
        <div className="text-[var(--color-text-secondary)]">{t.donatedToAnimals}</div>
        <div className="text-xs text-[var(--color-secondary)] mt-2 font-semibold">
          ({totalRecaudado > 0 ? ((totalDonado / totalRecaudado) * 100).toFixed(1) : '95'}% {t.ofTotal})
        </div>
      </div>

      {/* Total Plataforma */}
      <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 text-center hover:border-[var(--color-primary)] transition-colors shadow-sm">
        <div className="text-4xl mb-3">⚙️</div>
        <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">
          {formatCurrency(totalPlataforma)}
        </div>
        <div className="text-[var(--color-text-secondary)]">{t.forPlatform}</div>
        <div className="text-xs text-[var(--color-text-secondary)] mt-2">
          ({totalRecaudado > 0 ? ((totalPlataforma / totalRecaudado) * 100).toFixed(1) : '5'}% {t.ofTotal})
        </div>
      </div>
    </div>
  )
}

