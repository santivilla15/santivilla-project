'use client'

interface Props {
  /** Días de racha actuales */
  days: number
  /** Meta del próximo hito, para calcular el porcentaje del anillo */
  goal: number
  label?: string
}

/** Anillo circular SVG que muestra los días de racha y el progreso al próximo hito */
export default function StreakRing({ days, goal, label = 'días sin azúcar' }: Props) {
  const size = 220
  const stroke = 16
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = goal > 0 ? Math.min(1, days / goal) : 1
  const dash = circumference * pct

  return (
    <div className="sa-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--sa-border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--sa-primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 56, fontWeight: 800, lineHeight: 1 }}>{days}</span>
        <span className="sa-muted" style={{ fontSize: 14, marginTop: 4 }}>
          {label}
        </span>
      </div>
    </div>
  )
}
