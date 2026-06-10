'use client'

import { useState } from 'react'
import { AppState, currentStreak } from '../lib/types'

interface Props {
  state: AppState
  onUpdate: (patch: Partial<AppState>) => void
  onSetDaysAlready: (days: number) => void
  onReset: () => void
}

export default function Settings({ state, onUpdate, onSetDaysAlready, onReset }: Props) {
  const [name, setName] = useState(state.name)
  const [spend, setSpend] = useState(state.dailySpend)
  const [days, setDays] = useState(currentStreak(state))
  const [confirmReset, setConfirmReset] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = () => {
    onUpdate({ name: name.trim(), dailySpend: spend })
    if (days !== currentStreak(state)) onSetDaysAlready(days)
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div className="sa-content sa-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 className="sa-h1">Ajustes</h1>

      <div className="sa-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={labelStyle}>Tu nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            maxLength={30}
          />
        </div>

        <div>
          <label style={labelStyle}>Gasto diario en dulces: {spend.toFixed(2)} €</label>
          <input
            type="range"
            min={0}
            max={15}
            step={0.5}
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--sa-primary)' }}
          />
        </div>

        <div>
          <label style={labelStyle}>Días que ya llevas sin azúcar: {days}</label>
          <p className="sa-muted" style={{ fontSize: 12, margin: '0 0 8px' }}>
            Ajusta esto si empezaste antes de instalar la app.
          </p>
          <input
            type="number"
            min={0}
            max={3650}
            value={days}
            onChange={(e) => setDays(Math.max(0, Number(e.target.value)))}
            style={inputStyle}
          />
        </div>

        <button className="sa-btn sa-btn-primary sa-btn-block" onClick={save}>
          {saved ? '✓ Guardado' : 'Guardar cambios'}
        </button>
      </div>

      {/* Motivos */}
      <div className="sa-card">
        <h2 className="sa-h2" style={{ fontSize: 16, marginBottom: 10 }}>
          Mis motivos
        </h2>
        {state.reasons.length === 0 ? (
          <p className="sa-muted" style={{ fontSize: 14, margin: 0 }}>
            No has añadido motivos todavía.
          </p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {state.reasons.map((r) => (
              <span
                key={r}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--sa-bg)',
                  border: '1px solid var(--sa-border)',
                  borderRadius: 999,
                  padding: '6px 10px',
                  fontSize: 13,
                }}
              >
                {r}
                <button
                  onClick={() => onUpdate({ reasons: state.reasons.filter((x) => x !== r) })}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: 'var(--sa-text-soft)',
                    fontSize: 14,
                  }}
                  aria-label={`Quitar ${r}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Zona de reinicio */}
      <div className="sa-card" style={{ borderColor: '#f9c8c0' }}>
        <h2 className="sa-h2" style={{ fontSize: 16, color: 'var(--sa-accent)' }}>
          Reiniciar todo
        </h2>
        <p className="sa-muted" style={{ fontSize: 13, margin: '6px 0 12px' }}>
          Borra todos tus datos (racha, registros, logros) de este dispositivo. No se puede deshacer.
        </p>
        {!confirmReset ? (
          <button className="sa-btn sa-btn-ghost sa-btn-block" onClick={() => setConfirmReset(true)}>
            Reiniciar mi progreso
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="sa-btn sa-btn-ghost" style={{ flex: 1 }} onClick={() => setConfirmReset(false)}>
              Cancelar
            </button>
            <button
              className="sa-btn sa-btn-accent"
              style={{ flex: 1 }}
              onClick={() => {
                onReset()
                setConfirmReset(false)
              }}
            >
              Sí, borrar todo
            </button>
          </div>
        )}
      </div>

      <p className="sa-muted" style={{ fontSize: 12, textAlign: 'center', lineHeight: 1.5 }}>
        Tus datos se guardan solo en este dispositivo. No se envía nada a ningún servidor.
      </p>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontWeight: 600,
  marginBottom: 8,
  fontSize: 14,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  border: '1px solid var(--sa-border)',
  fontSize: 16,
  fontFamily: 'inherit',
  background: '#fff',
  color: 'var(--sa-text)',
  outline: 'none',
}
