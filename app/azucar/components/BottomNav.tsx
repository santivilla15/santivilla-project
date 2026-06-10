'use client'

export type Tab = 'home' | 'progress' | 'learn' | 'settings'

interface Props {
  active: Tab
  onChange: (tab: Tab) => void
}

const ITEMS: { id: Tab; icon: string; label: string }[] = [
  { id: 'home', icon: '🏠', label: 'Inicio' },
  { id: 'progress', icon: '📈', label: 'Progreso' },
  { id: 'learn', icon: '📚', label: 'Aprende' },
  { id: 'settings', icon: '⚙️', label: 'Ajustes' },
]

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="sa-bottomnav" aria-label="Navegación de la app">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          className="sa-navitem"
          data-active={active === item.id}
          onClick={() => onChange(item.id)}
          aria-current={active === item.id}
        >
          <span className="sa-navicon">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  )
}
