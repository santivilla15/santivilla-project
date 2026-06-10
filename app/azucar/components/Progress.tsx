'use client'

import {
  AppState,
  addDays,
  cravingsResisted,
  currentStreak,
  moneySaved,
  toISODate,
  todayISO,
} from '../lib/types'
import { ACHIEVEMENTS } from '../lib/content'

interface Props {
  state: AppState
}

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

export default function Progress({ state }: Props) {
  const days = currentStreak(state)
  const totalClean = Object.values(state.checkins).filter((c) => c.status === 'clean').length
  const totalCravings = state.cravings.length
  const resisted = cravingsResisted(state)
  const resistRate = totalCravings > 0 ? Math.round((resisted / totalCravings) * 100) : 0

  return (
    <div className="sa-content sa-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 className="sa-h1">Tu progreso</h1>

      {/* Resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Mini value={`${days}`} label="racha actual (días)" />
        <Mini value={`${Math.max(state.longestStreak, days)}`} label="mejor racha" />
        <Mini value={`${totalClean}`} label="días limpios totales" />
        <Mini value={`${moneySaved(state).toFixed(0)} €`} label="ahorrados" />
      </div>

      {/* Antojos */}
      <div className="sa-card">
        <h2 className="sa-h2" style={{ fontSize: 17 }}>
          🛡️ Antojos
        </h2>
        <p className="sa-muted" style={{ fontSize: 14, margin: '6px 0 12px' }}>
          Has registrado {totalCravings} {totalCravings === 1 ? 'antojo' : 'antojos'} y superado{' '}
          <strong style={{ color: 'var(--sa-primary-dark)' }}>{resisted}</strong>.
        </p>
        <div style={{ height: 10, background: 'var(--sa-bg)', borderRadius: 999, overflow: 'hidden' }}>
          <div
            style={{
              width: `${resistRate}%`,
              height: '100%',
              background: 'var(--sa-primary)',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
        <p className="sa-muted" style={{ fontSize: 13, marginTop: 6, marginBottom: 0 }}>
          {totalCravings > 0 ? `${resistRate}% superados` : 'Aún no has registrado antojos'}
        </p>
      </div>

      {/* Calendario de los últimos 28 días */}
      <div className="sa-card">
        <h2 className="sa-h2" style={{ fontSize: 17, marginBottom: 12 }}>
          🗓️ Últimas 4 semanas
        </h2>
        <div className="sa-calendar" style={{ marginBottom: 8 }}>
          {WEEKDAYS.map((d) => (
            <div key={d} className="sa-muted" style={{ textAlign: 'center', fontSize: 11, fontWeight: 700 }}>
              {d}
            </div>
          ))}
        </div>
        <Calendar state={state} />
        <div style={{ display: 'flex', gap: 14, marginTop: 12, flexWrap: 'wrap' }}>
          <Legend color="var(--sa-primary)" label="Sin azúcar" />
          <Legend color="#f9c8c0" label="Recaída" />
          <Legend color="var(--sa-bg)" label="Sin registro" border />
        </div>
      </div>

      {/* Logros */}
      <div className="sa-card">
        <h2 className="sa-h2" style={{ fontSize: 17, marginBottom: 12 }}>
          🏅 Logros
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {ACHIEVEMENTS.map((a) => {
            const unlocked = a.unlocked(state)
            return (
              <div
                key={a.id}
                style={{
                  border: '1px solid var(--sa-border)',
                  borderRadius: 14,
                  padding: 12,
                  textAlign: 'center',
                  opacity: unlocked ? 1 : 0.4,
                  background: unlocked ? 'var(--sa-bg)' : 'transparent',
                  filter: unlocked ? 'none' : 'grayscale(1)',
                }}
              >
                <div style={{ fontSize: 30 }}>{unlocked ? a.emoji : '🔒'}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{a.title}</div>
                <div className="sa-muted" style={{ fontSize: 11, marginTop: 2 }}>
                  {a.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Calendar({ state }: { state: AppState }) {
  const today = new Date()
  // Empezar 27 días atrás para mostrar 28 casillas terminando hoy
  const start = addDays(todayISO(), -27)
  const cells: { date: string; status?: 'clean' | 'slip'; isToday: boolean }[] = []
  for (let i = 0; i < 28; i++) {
    const date = addDays(start, i)
    cells.push({
      date,
      status: state.checkins[date]?.status,
      isToday: date === toISODate(today),
    })
  }
  return (
    <div className="sa-calendar">
      {cells.map((c) => (
        <div
          key={c.date}
          className="sa-day"
          data-status={c.status ?? ''}
          data-today={c.isToday}
          title={c.date}
        >
          {Number(c.date.split('-')[2])}
        </div>
      ))}
    </div>
  )
}

function Mini({ value, label }: { value: string; label: string }) {
  return (
    <div className="sa-card" style={{ padding: 14, textAlign: 'center' }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--sa-primary-dark)' }}>{value}</div>
      <div className="sa-muted" style={{ fontSize: 12 }}>
        {label}
      </div>
    </div>
  )
}

function Legend({ color, label, border }: { color: string; label: string; border?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 4,
          background: color,
          border: border ? '1px solid var(--sa-border)' : 'none',
          display: 'inline-block',
        }}
      />
      <span className="sa-muted" style={{ fontSize: 12 }}>
        {label}
      </span>
    </div>
  )
}
