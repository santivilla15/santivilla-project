// Tipos de datos de la app "Camilia" (dejar el azúcar).
// Todo se guarda localmente en el dispositivo (localStorage), sin servidor.

export type CravingOutcome = 'resisted' | 'gave-in'

export interface DayLog {
  /** Fecha en formato YYYY-MM-DD */
  date: string
  status: 'clean' | 'slip'
  /** Estado de ánimo de 1 (mal) a 5 (genial) */
  mood?: number
  note?: string
}

export interface CravingLog {
  timestamp: number
  outcome: CravingOutcome
  /** Qué disparó el antojo (estrés, aburrimiento, etc.) */
  trigger?: string
}

export interface AppState {
  /** Versión del esquema, por si hay migraciones futuras */
  version: number
  onboarded: boolean
  name: string
  /** Motivos por los que quiere dejar el azúcar */
  reasons: string[]
  /** Fecha (YYYY-MM-DD) en la que empezó la racha actual sin azúcar */
  streakStartDate: string
  /** Dinero aproximado que gastaba al día en dulces/bebidas azucaradas (€) */
  dailySpend: number
  /** Registros diarios, indexados por fecha YYYY-MM-DD */
  checkins: Record<string, DayLog>
  /** Historial de antojos */
  cravings: CravingLog[]
  /** Racha más larga alcanzada (en días) */
  longestStreak: number
}

export const STORAGE_KEY = 'sin-azucar-app-v1'

export function createInitialState(): AppState {
  return {
    version: 1,
    onboarded: false,
    name: '',
    reasons: [],
    streakStartDate: todayISO(),
    dailySpend: 2,
    checkins: {},
    cravings: [],
    longestStreak: 0,
  }
}

// ---------- Utilidades de fecha ----------

/** Devuelve la fecha local de hoy en formato YYYY-MM-DD */
export function todayISO(): string {
  return toISODate(new Date())
}

export function toISODate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Días enteros transcurridos entre dos fechas ISO (b - a) */
export function daysBetween(a: string, b: string): number {
  const ms = fromISODate(b).getTime() - fromISODate(a).getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

/** Suma (o resta) días a una fecha ISO */
export function addDays(iso: string, days: number): string {
  const d = fromISODate(iso)
  d.setDate(d.getDate() + days)
  return toISODate(d)
}

// ---------- Cálculos derivados ----------

/** Días limpios de la racha actual (mínimo 0) */
export function currentStreak(state: AppState): number {
  return Math.max(0, daysBetween(state.streakStartDate, todayISO()))
}

/** Dinero ahorrado estimado en la racha actual */
export function moneySaved(state: AppState): number {
  return currentStreak(state) * state.dailySpend
}

/** Número de antojos superados con éxito */
export function cravingsResisted(state: AppState): number {
  return state.cravings.filter((c) => c.outcome === 'resisted').length
}

/** Azúcar evitada estimada (gramos). ~30 g por día como referencia media. */
export function sugarAvoidedGrams(state: AppState): number {
  return currentStreak(state) * 30
}
