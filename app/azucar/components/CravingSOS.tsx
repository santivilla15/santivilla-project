'use client'

import { useEffect, useState } from 'react'
import { AppState, CravingOutcome } from '../lib/types'
import { DISTRACTIONS, TRIGGERS } from '../lib/content'

interface Props {
  state: AppState
  onResolve: (outcome: CravingOutcome, trigger?: string) => void
  onClose: () => void
}

type View = 'intro' | 'breathe' | 'distract' | 'outcome'

/** Pantalla a pantalla completa para acompañar al usuario durante un antojo */
export default function CravingSOS({ state, onResolve, onClose }: Props) {
  const [view, setView] = useState<View>('intro')
  const [trigger, setTrigger] = useState<string | undefined>()

  return (
    <div
      className="sa-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'linear-gradient(160deg, #0f766e, #14b8a6)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 480,
        margin: '0 auto',
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: '18px 18px 0', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={onClose}
          style={ghostWhite}
          aria-label="Cerrar"
        >
          ✕ Cerrar
        </button>
      </div>

      <div style={{ flex: 1, padding: 22, display: 'flex', flexDirection: 'column' }}>
        {view === 'intro' && <Intro state={state} setView={setView} />}
        {view === 'breathe' && <Breathe onDone={() => setView('outcome')} setView={setView} />}
        {view === 'distract' && <Distract setView={setView} />}
        {view === 'outcome' && (
          <Outcome
            trigger={trigger}
            setTrigger={setTrigger}
            onResolve={onResolve}
          />
        )}
      </div>
    </div>
  )
}

function Intro({ state, setView }: { state: AppState; setView: (v: View) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 20 }}>
      <div style={{ fontSize: 56, textAlign: 'center' }}>🌊</div>
      <h1 style={{ fontSize: 26, fontWeight: 800, textAlign: 'center', margin: 0 }}>
        Un antojo es una ola
      </h1>
      <p style={{ textAlign: 'center', opacity: 0.92, lineHeight: 1.55, fontSize: 16 }}>
        Sube, llega a un pico y baja. Casi ninguno dura más de{' '}
        <strong>10-15 minutos</strong>. No tienes que luchar contra él, solo dejarlo pasar.
        Vamos juntos.
      </p>

      {state.reasons.length > 0 && (
        <div
          style={{
            background: 'rgba(255,255,255,0.14)',
            borderRadius: 16,
            padding: 16,
          }}
        >
          <p style={{ margin: '0 0 8px', fontWeight: 700 }}>Recuerda por qué empezaste:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {state.reasons.map((r) => (
              <span
                key={r}
                style={{
                  background: 'rgba(255,255,255,0.22)',
                  borderRadius: 999,
                  padding: '6px 12px',
                  fontSize: 14,
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}>
        <button className="sa-btn sa-btn-block" style={whiteBtn} onClick={() => setView('breathe')}>
          🫁 Respirar conmigo
        </button>
        <button className="sa-btn sa-btn-block" style={whiteOutlineBtn} onClick={() => setView('distract')}>
          🎲 Dame una distracción
        </button>
        <button className="sa-btn sa-btn-block" style={ghostWhite} onClick={() => setView('outcome')}>
          Ya pasó, registrar →
        </button>
      </div>
    </div>
  )
}

// Fases de la respiración 4-7-8 (un ciclo completo = 19 s)
const BREATHE_PHASES = [
  { label: 'Inhala', secs: 4 },
  { label: 'Sostén', secs: 7 },
  { label: 'Exhala', secs: 8 },
]
const BREATHE_CYCLE = BREATHE_PHASES.reduce((sum, p) => sum + p.secs, 0)

/** Dado el segundo dentro del ciclo, devuelve la fase y la cuenta atrás restante */
function phaseAt(secInCycle: number) {
  let acc = 0
  for (const p of BREATHE_PHASES) {
    if (secInCycle < acc + p.secs) {
      return { label: p.label, count: p.secs - (secInCycle - acc) }
    }
    acc += p.secs
  }
  return { label: BREATHE_PHASES[0].label, count: BREATHE_PHASES[0].secs }
}

/** Ejercicio de respiración 4-7-8 con círculo animado y temporizador */
function Breathe({ onDone, setView }: { onDone: () => void; setView: (v: View) => void }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const cycles = Math.floor(elapsed / BREATHE_CYCLE)
  const phase = phaseAt(elapsed % BREATHE_CYCLE)
  const count = phase.count

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginTop: 16 }}>
      <p style={{ opacity: 0.9, textAlign: 'center', fontSize: 15 }}>
        Sigue el ritmo. Respiración 4-7-8, la que usan para calmar la ansiedad.
      </p>
      <div className="sa-breathe">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>{phase.label}</div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>{count}</div>
        </div>
      </div>
      <p style={{ opacity: 0.85 }}>Ciclos completados: {cycles}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        <button className="sa-btn sa-btn-block" style={whiteBtn} onClick={onDone}>
          Me siento mejor →
        </button>
        <button className="sa-btn sa-btn-block" style={ghostWhite} onClick={() => setView('distract')}>
          Probar una distracción
        </button>
      </div>
    </div>
  )
}

function Distract({ setView }: { setView: (v: View) => void }) {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * DISTRACTIONS.length))
  const shuffle = () => setIdx((prev) => (prev + 1 + Math.floor(Math.random() * (DISTRACTIONS.length - 1))) % DISTRACTIONS.length)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 30, alignItems: 'center' }}>
      <div style={{ fontSize: 50 }}>🎲</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', margin: 0 }}>Haz esto ahora</h2>
      <div
        style={{
          background: 'rgba(255,255,255,0.16)',
          borderRadius: 18,
          padding: 24,
          fontSize: 19,
          textAlign: 'center',
          lineHeight: 1.5,
          minHeight: 120,
          display: 'grid',
          placeItems: 'center',
          width: '100%',
        }}
      >
        {DISTRACTIONS[idx]}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        <button className="sa-btn sa-btn-block" style={whiteOutlineBtn} onClick={shuffle}>
          🔄 Otra idea
        </button>
        <button className="sa-btn sa-btn-block" style={whiteBtn} onClick={() => setView('outcome')}>
          Ya estoy mejor →
        </button>
      </div>
    </div>
  )
}

function Outcome({
  trigger,
  setTrigger,
  onResolve,
}: {
  trigger?: string
  setTrigger: (t: string) => void
  onResolve: (outcome: CravingOutcome, trigger?: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 16 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', margin: 0 }}>
        ¿Qué disparó el antojo?
      </h2>
      <p style={{ textAlign: 'center', opacity: 0.9, margin: 0 }}>
        Conocer tus patrones te ayuda a prevenirlos. (Opcional)
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {TRIGGERS.map((t) => (
          <button
            key={t}
            onClick={() => setTrigger(t)}
            style={{
              borderRadius: 999,
              padding: '8px 14px',
              fontSize: 14,
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.5)',
              background: trigger === t ? '#fff' : 'transparent',
              color: trigger === t ? 'var(--sa-primary-dark)' : '#fff',
              fontWeight: 600,
              fontFamily: 'inherit',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
        <button
          className="sa-btn sa-btn-block"
          style={whiteBtn}
          onClick={() => onResolve('resisted', trigger)}
        >
          💪 Lo superé
        </button>
        <button
          className="sa-btn sa-btn-block"
          style={ghostWhite}
          onClick={() => onResolve('gave-in', trigger)}
        >
          🤍 Esta vez caí
        </button>
      </div>
      <p style={{ textAlign: 'center', opacity: 0.8, fontSize: 13, margin: 0 }}>
        Caer no te hace fracasar. Lo importante es volver. Sin culpa.
      </p>
    </div>
  )
}

// Estilos de botones sobre fondo de color
const whiteBtn: React.CSSProperties = {
  background: '#fff',
  color: 'var(--sa-primary-dark)',
}
const whiteOutlineBtn: React.CSSProperties = {
  background: 'rgba(255,255,255,0.15)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.5)',
}
const ghostWhite: React.CSSProperties = {
  background: 'transparent',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 15,
  fontWeight: 600,
}
