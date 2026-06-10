'use client'

import { useState } from 'react'
import { REASON_SUGGESTIONS } from '../lib/content'

interface Props {
  onComplete: (data: { name: string; reasons: string[]; dailySpend: number }) => void
}

/** Flujo de bienvenida en pasos: nombre, motivos y gasto diario */
export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [reasons, setReasons] = useState<string[]>([])
  const [customReason, setCustomReason] = useState('')
  const [dailySpend, setDailySpend] = useState(2)

  const toggleReason = (r: string) => {
    setReasons((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    )
  }

  const addCustomReason = () => {
    const r = customReason.trim()
    if (r && !reasons.includes(r)) {
      setReasons((prev) => [...prev, r])
      setCustomReason('')
    }
  }

  const finish = () => onComplete({ name, reasons, dailySpend })

  return (
    <div className="sa-content sa-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Paso 0: bienvenida + nombre */}
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          <div style={{ fontSize: 64, textAlign: 'center' }}>🍃</div>
          <h1 className="sa-h1" style={{ textAlign: 'center' }}>
            Camilia
          </h1>
          <p className="sa-muted" style={{ textAlign: 'center', fontSize: 16, lineHeight: 1.5 }}>
            Dejar el azúcar es difícil porque es casi adictivo. Camilia te acompaña
            día a día y te ayuda a superar los antojos cuando más cuesta.
          </p>
          <div className="sa-card" style={{ marginTop: 8 }}>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
              ¿Cómo te llamas?
            </label>
            <input
              className="sa-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              style={inputStyle}
              maxLength={30}
            />
          </div>
          <button className="sa-btn sa-btn-primary sa-btn-block" onClick={() => setStep(1)}>
            Empezar
          </button>
        </div>
      )}

      {/* Paso 1: motivos */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
          <h2 className="sa-h2">
            {name ? `${name}, ¿por` : '¿Por'} qué quieres dejar el azúcar?
          </h2>
          <p className="sa-muted">
            Elige tus motivos. Te los recordaré cuando aparezca un antojo fuerte.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {REASON_SUGGESTIONS.map((r) => (
              <button
                key={r}
                className="sa-chip"
                data-active={reasons.includes(r)}
                onClick={() => toggleReason(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomReason()}
              placeholder="Añadir mi propio motivo"
              style={{ ...inputStyle, flex: 1 }}
              maxLength={60}
            />
            <button className="sa-btn sa-btn-ghost" onClick={addCustomReason} type="button">
              +
            </button>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button className="sa-btn sa-btn-ghost" onClick={() => setStep(0)}>
              Atrás
            </button>
            <button
              className="sa-btn sa-btn-primary"
              style={{ flex: 1 }}
              disabled={reasons.length === 0}
              onClick={() => setStep(2)}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Paso 2: gasto diario */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
          <h2 className="sa-h2">¿Cuánto gastas al día en dulces?</h2>
          <p className="sa-muted">
            Una estimación de lo que gastas en bollería, refrescos o chuches. Sirve para
            mostrarte cuánto dinero ahorras. Puedes cambiarlo luego.
          </p>
          <div className="sa-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 44, fontWeight: 800, color: 'var(--sa-primary-dark)' }}>
              {dailySpend.toFixed(2)} €
            </div>
            <input
              type="range"
              min={0}
              max={15}
              step={0.5}
              value={dailySpend}
              onChange={(e) => setDailySpend(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--sa-primary)' }}
            />
            <div className="sa-muted" style={{ fontSize: 13 }}>
              ≈ {(dailySpend * 30).toFixed(0)} € al mes
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button className="sa-btn sa-btn-ghost" onClick={() => setStep(1)}>
              Atrás
            </button>
            <button className="sa-btn sa-btn-primary" style={{ flex: 1 }} onClick={finish}>
              Crear mi reto
            </button>
          </div>
        </div>
      )}

      {/* Indicador de pasos */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 24 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: i === step ? 22 : 8,
              height: 8,
              borderRadius: 999,
              background: i === step ? 'var(--sa-primary)' : 'var(--sa-border)',
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
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
