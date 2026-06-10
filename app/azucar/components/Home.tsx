'use client'

import { useMemo, useState } from 'react'
import {
  AppState,
  cravingsResisted,
  currentStreak,
  moneySaved,
  sugarAvoidedGrams,
  todayISO,
} from '../lib/types'
import {
  ENCOURAGEMENTS,
  currentMilestone,
  nextMilestone,
} from '../lib/content'
import StreakRing from './StreakRing'

interface Props {
  state: AppState
  onOpenSOS: () => void
  onLogDay: (status: 'clean' | 'slip', mood?: number, note?: string) => void
}

export default function Home({ state, onOpenSOS, onLogDay }: Props) {
  const days = currentStreak(state)
  const next = nextMilestone(days)
  const current = currentMilestone(days)
  const today = todayISO()
  const todayLog = state.checkins[today]

  const encouragement = useMemo(
    () => ENCOURAGEMENTS[days % ENCOURAGEMENTS.length],
    [days]
  )

  return (
    <div className="sa-content sa-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <header>
        <p className="sa-muted" style={{ margin: 0 }}>
          {greeting()}
          {state.name ? `, ${state.name}` : ''} 👋
        </p>
        <h1 className="sa-h1">Tu reto sin azúcar</h1>
      </header>

      {/* Anillo de racha */}
      <div className="sa-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <StreakRing days={days} goal={next.day || 1} />
        <p
          style={{
            textAlign: 'center',
            fontStyle: 'italic',
            color: 'var(--sa-text-soft)',
            margin: 0,
            fontSize: 15,
          }}
        >
          “{encouragement}”
        </p>
        {days < next.day && (
          <div
            style={{
              fontSize: 13,
              color: 'var(--sa-primary-dark)',
              fontWeight: 600,
              background: 'var(--sa-bg)',
              padding: '6px 12px',
              borderRadius: 999,
            }}
          >
            {next.day - days} {next.day - days === 1 ? 'día' : 'días'} para “{next.title}”
          </div>
        )}
      </div>

      {/* Botón SOS de antojo */}
      <button
        className="sa-btn sa-btn-accent sa-btn-block"
        onClick={onOpenSOS}
        style={{ padding: '18px', fontSize: 18 }}
      >
        🆘 Tengo un antojo
      </button>

      {/* Estadísticas rápidas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Stat emoji="💶" value={`${moneySaved(state).toFixed(0)} €`} label="ahorrados" />
        <Stat emoji="🛡️" value={`${cravingsResisted(state)}`} label="antojos vencidos" />
        <Stat emoji="🍬" value={`${(sugarAvoidedGrams(state) / 1000).toFixed(1)} kg`} label="azúcar evitada" />
        <Stat emoji="🏆" value={`${Math.max(state.longestStreak, days)}`} label="mejor racha (días)" />
      </div>

      {/* Hito de salud actual */}
      <div className="sa-card">
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 34 }}>{current.emoji}</div>
          <div>
            <h2 className="sa-h2" style={{ fontSize: 17 }}>
              Tu cuerpo ahora: {current.title}
            </h2>
            <p className="sa-muted" style={{ marginTop: 4, fontSize: 14, lineHeight: 1.5 }}>
              {current.body}
            </p>
          </div>
        </div>
      </div>

      {/* Check-in del día */}
      <DailyCheckin todayLog={todayLog} onLogDay={onLogDay} />

      {/* Recordatorio de motivos */}
      {state.reasons.length > 0 && (
        <div className="sa-card">
          <h2 className="sa-h2" style={{ fontSize: 16, marginBottom: 10 }}>
            💚 Recuerda por qué lo haces
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {state.reasons.map((r) => (
              <span
                key={r}
                style={{
                  background: 'var(--sa-bg)',
                  border: '1px solid var(--sa-border)',
                  borderRadius: 999,
                  padding: '6px 12px',
                  fontSize: 13,
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Stat({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <div className="sa-card" style={{ padding: 14, textAlign: 'center' }}>
      <div style={{ fontSize: 24 }}>{emoji}</div>
      <div style={{ fontSize: 22, fontWeight: 800, marginTop: 2 }}>{value}</div>
      <div className="sa-muted" style={{ fontSize: 12 }}>
        {label}
      </div>
    </div>
  )
}

function DailyCheckin({
  todayLog,
  onLogDay,
}: {
  todayLog?: AppState['checkins'][string]
  onLogDay: Props['onLogDay']
}) {
  const [mood, setMood] = useState<number | undefined>(todayLog?.mood)

  if (todayLog) {
    return (
      <div className="sa-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 30 }}>{todayLog.status === 'clean' ? '✅' : '🤍'}</div>
        <p style={{ fontWeight: 700, margin: '6px 0 2px' }}>
          {todayLog.status === 'clean'
            ? 'Día registrado: ¡sin azúcar!'
            : 'Día registrado. Mañana es un nuevo comienzo.'}
        </p>
        <p className="sa-muted" style={{ fontSize: 13, margin: 0 }}>
          Vuelve mañana para seguir tu racha.
        </p>
      </div>
    )
  }

  return (
    <div className="sa-card">
      <h2 className="sa-h2" style={{ fontSize: 16 }}>
        ¿Cómo va tu día?
      </h2>
      <p className="sa-muted" style={{ fontSize: 14, margin: '6px 0 12px' }}>
        Registra cómo te sientes (opcional) y marca tu día.
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
        {['😣', '😕', '😐', '🙂', '😄'].map((face, i) => (
          <button
            key={face}
            onClick={() => setMood(i + 1)}
            style={{
              fontSize: 26,
              background: mood === i + 1 ? 'var(--sa-bg)' : 'transparent',
              border: mood === i + 1 ? '2px solid var(--sa-primary)' : '2px solid transparent',
              borderRadius: 12,
              padding: '4px 6px',
              cursor: 'pointer',
            }}
            aria-label={`Ánimo ${i + 1} de 5`}
          >
            {face}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          className="sa-btn sa-btn-primary"
          style={{ flex: 1 }}
          onClick={() => onLogDay('clean', mood)}
        >
          Hoy sin azúcar 💪
        </button>
        <button className="sa-btn sa-btn-ghost" onClick={() => onLogDay('slip', mood)}>
          Caí hoy
        </button>
      </div>
    </div>
  )
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 6) return 'Buenas noches'
  if (h < 13) return 'Buenos días'
  if (h < 20) return 'Buenas tardes'
  return 'Buenas noches'
}
