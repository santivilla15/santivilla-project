'use client'

import { useState } from 'react'
import { useAppState } from './lib/useAppState'
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import Progress from './components/Progress'
import Learn from './components/Learn'
import Settings from './components/Settings'
import CravingSOS from './components/CravingSOS'
import BottomNav, { Tab } from './components/BottomNav'

export default function AzucarApp() {
  const {
    state,
    hydrated,
    update,
    completeOnboarding,
    logDay,
    logCraving,
    setDaysAlready,
    resetAll,
  } = useAppState()

  const [tab, setTab] = useState<Tab>('home')
  const [sosOpen, setSosOpen] = useState(false)

  // Evitar parpadeo / desajuste de hidratación: no renderizar hasta cargar datos
  if (!hydrated) {
    return (
      <div className="azucar-app">
        <div className="sa-shell" style={{ display: 'grid', placeItems: 'center' }}>
          <div style={{ fontSize: 40 }}>🍃</div>
        </div>
      </div>
    )
  }

  if (!state.onboarded) {
    return (
      <div className="azucar-app">
        <div className="sa-shell">
          <Onboarding onComplete={completeOnboarding} />
        </div>
      </div>
    )
  }

  return (
    <div className="azucar-app">
      <div className="sa-shell">
        {tab === 'home' && (
          <Home state={state} onOpenSOS={() => setSosOpen(true)} onLogDay={logDay} />
        )}
        {tab === 'progress' && <Progress state={state} />}
        {tab === 'learn' && <Learn state={state} />}
        {tab === 'settings' && (
          <Settings
            state={state}
            onUpdate={update}
            onSetDaysAlready={setDaysAlready}
            onReset={resetAll}
          />
        )}

        <BottomNav active={tab} onChange={setTab} />

        {sosOpen && (
          <CravingSOS
            state={state}
            onClose={() => setSosOpen(false)}
            onResolve={(outcome, trigger) => {
              logCraving(outcome, trigger)
              setSosOpen(false)
            }}
          />
        )}
      </div>
    </div>
  )
}
