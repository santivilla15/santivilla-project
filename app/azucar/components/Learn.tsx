'use client'

import { useState } from 'react'
import { AppState, currentStreak } from '../lib/types'
import { HEALTH_MILESTONES, TIPS } from '../lib/content'

interface Props {
  state: AppState
}

export default function Learn({ state }: Props) {
  const days = currentStreak(state)
  const [openTip, setOpenTip] = useState<number | null>(0)

  return (
    <div className="sa-content sa-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 className="sa-h1">Aprende</h1>

      {/* Línea de tiempo de recuperación */}
      <div className="sa-card">
        <h2 className="sa-h2" style={{ fontSize: 17, marginBottom: 14 }}>
          🌿 Qué le pasa a tu cuerpo
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {HEALTH_MILESTONES.map((m, i) => {
            const reached = days >= m.day
            const isLast = i === HEALTH_MILESTONES.length - 1
            return (
              <div key={m.day} style={{ display: 'flex', gap: 12 }}>
                {/* Columna del indicador */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 18,
                      background: reached ? 'var(--sa-primary)' : 'var(--sa-bg)',
                      border: '2px solid',
                      borderColor: reached ? 'var(--sa-primary)' : 'var(--sa-border)',
                      flexShrink: 0,
                    }}
                  >
                    {reached ? m.emoji : '·'}
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        minHeight: 24,
                        background: reached ? 'var(--sa-primary)' : 'var(--sa-border)',
                      }}
                    />
                  )}
                </div>
                {/* Contenido */}
                <div style={{ paddingBottom: 18, opacity: reached ? 1 : 0.6 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    {m.day === 0 ? 'Hoy' : `Día ${m.day}`} · {m.title}
                  </div>
                  <p className="sa-muted" style={{ fontSize: 13.5, lineHeight: 1.5, margin: '3px 0 0' }}>
                    {m.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Consejos plegables */}
      <h2 className="sa-h2" style={{ fontSize: 17, marginTop: 4 }}>
        💡 Consejos para conseguirlo
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TIPS.map((tip, i) => {
          const open = openTip === i
          return (
            <div key={tip.title} className="sa-card" style={{ padding: 0, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenTip(open ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 16,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  color: 'var(--sa-text)',
                }}
                aria-expanded={open}
              >
                <span style={{ fontSize: 24 }}>{tip.emoji}</span>
                <span style={{ fontWeight: 700, fontSize: 15, flex: 1 }}>{tip.title}</span>
                <span className="sa-muted" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  ▾
                </span>
              </button>
              {open && (
                <p
                  className="sa-muted sa-fade-in"
                  style={{ fontSize: 14, lineHeight: 1.55, padding: '0 16px 16px', margin: 0 }}
                >
                  {tip.body}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <p className="sa-muted" style={{ fontSize: 12, textAlign: 'center', marginTop: 8, lineHeight: 1.5 }}>
        Información educativa general, no sustituye el consejo de un profesional de la salud.
        Si tienes diabetes u otra condición, consulta con tu médico antes de cambiar tu dieta.
      </p>
    </div>
  )
}
