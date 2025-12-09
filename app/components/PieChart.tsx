// Componente para el gráfico de pastel
'use client'

import { usePathname } from 'next/navigation'

interface PieChartProps {
  totalRecaudado: number
  totalDonado: number
  totalPlataforma: number
  formatCurrency: (amount: number) => string
}

const translations = {
  es: {
    visualDistribution: 'Distribución Visual',
    total: 'Total',
    animalsLabel: '~95% - Animales',
    platformLabel: '~5% - Plataforma',
  },
  en: {
    visualDistribution: 'Visual Distribution',
    total: 'Total',
    animalsLabel: '~95% - Animals',
    platformLabel: '~5% - Platform',
  },
  de: {
    visualDistribution: 'Visuelle Verteilung',
    total: 'Gesamt',
    animalsLabel: '~95% - Tiere',
    platformLabel: '~5% - Plattform',
  },
}

export default function PieChart({
  totalRecaudado,
  totalDonado,
  totalPlataforma,
  formatCurrency,
}: PieChartProps) {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  // Calcular porcentajes
  const donacionPercent = totalRecaudado > 0 ? (totalDonado / totalRecaudado) * 100 : 70
  const plataformaPercent = totalRecaudado > 0 ? (totalPlataforma / totalRecaudado) * 100 : 30
  
  // Radio del círculo
  const radius = 90
  const circumference = 2 * Math.PI * radius
  
  // Calcular dash arrays para el gráfico
  const donacionDash = (circumference * donacionPercent) / 100
  const plataformaDash = (circumference * plataformaPercent) / 100

  return (
    <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 mb-12 shadow-sm">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 text-center break-words whitespace-normal overflow-visible">
        {t.visualDistribution}
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Gráfico de pastel SVG */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <svg 
            className="transform -rotate-90 drop-shadow-lg" 
            width="100%" 
            height="100%" 
            viewBox="0 0 200 200"
          >
            {/* Círculo de fondo */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#F8F9FA"
              strokeWidth="20"
            />
            {/* Segmento de Animales - Coral (95%) */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="20"
              strokeDasharray={`${donacionDash} ${circumference}`}
              strokeDashoffset="0"
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
            {/* Segmento de Plataforma - Azul marino (5%) */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#1A3A52"
              strokeWidth="20"
              strokeDasharray={`${plataformaDash} ${circumference}`}
              strokeDashoffset={`-${donacionDash}`}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
            {/* Texto central - rotado de vuelta para que quede horizontal */}
            <g transform="rotate(90 100 100)">
              <text
                x="100"
                y="95"
                textAnchor="middle"
                className="fill-[var(--color-text)] font-bold"
                fontSize="24"
                fontWeight="bold"
              >
                {formatCurrency(totalRecaudado)}
              </text>
              <text
                x="100"
                y="115"
                textAnchor="middle"
                className="fill-[var(--color-text-secondary)]"
                fontSize="14"
              >
                {t.total}
              </text>
            </g>
          </svg>
        </div>
        
        {/* Leyenda */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-[var(--color-background-alt)] rounded-lg border border-[var(--color-secondary)]/30">
            <div className="w-10 h-10 bg-[var(--color-secondary)] rounded-full flex items-center justify-center text-xl">
              🐾
            </div>
            <div>
              <div className="text-[var(--color-secondary)] font-bold text-lg">{t.animalsLabel}</div>
              <div className="text-[var(--color-text)] text-sm">{formatCurrency(totalDonado)}</div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                {totalRecaudado > 0 ? `${donacionPercent.toFixed(1)}%` : '95%'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-[var(--color-background-alt)] rounded-lg border border-[var(--color-primary)]/30">
            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-xl">
              ⚙️
            </div>
            <div>
              <div className="text-[var(--color-primary)] font-bold text-lg">{t.platformLabel}</div>
              <div className="text-[var(--color-text)] text-sm">{formatCurrency(totalPlataforma)}</div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                {totalRecaudado > 0 ? `${plataformaPercent.toFixed(1)}%` : '5%'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

