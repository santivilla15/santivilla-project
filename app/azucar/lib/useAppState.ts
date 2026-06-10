'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  AppState,
  CravingOutcome,
  DayLog,
  STORAGE_KEY,
  addDays,
  createInitialState,
  currentStreak,
  todayISO,
} from './types'

function load(): AppState {
  if (typeof window === 'undefined') return createInitialState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return createInitialState()
    const parsed = JSON.parse(raw) as Partial<AppState>
    // Mezclar con el estado inicial para tolerar versiones antiguas / campos nuevos
    return { ...createInitialState(), ...parsed }
  } catch {
    return createInitialState()
  }
}

function save(state: AppState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Almacenamiento lleno o no disponible: la app sigue funcionando en memoria
  }
}

/**
 * Hook central de la app. Maneja la persistencia local y expone acciones
 * de alto nivel (registrar el día, registrar antojos, etc.).
 */
export function useAppState() {
  const [state, setState] = useState<AppState>(createInitialState)
  const [hydrated, setHydrated] = useState(false)

  // Cargar del almacenamiento solo en el cliente, tras el montaje.
  // Hacerlo aquí (y no en el estado inicial) evita desajustes de hidratación,
  // ya que el servidor no tiene acceso a localStorage. Es un caso legítimo de
  // sincronización con un sistema externo, de ahí la excepción a la regla.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setState(load())
    setHydrated(true)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  // Persistir en cada cambio (una vez hidratado)
  useEffect(() => {
    if (hydrated) save(state)
  }, [state, hydrated])

  const update = useCallback((patch: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...patch }))
  }, [])

  const completeOnboarding = useCallback(
    (data: { name: string; reasons: string[]; dailySpend: number }) => {
      setState((prev) => ({
        ...prev,
        onboarded: true,
        name: data.name.trim(),
        reasons: data.reasons,
        dailySpend: data.dailySpend,
        streakStartDate: todayISO(),
      }))
    },
    []
  )

  /** Registra el resultado del día (limpio o recaída) */
  const logDay = useCallback((status: 'clean' | 'slip', mood?: number, note?: string) => {
    setState((prev) => {
      const date = todayISO()
      const log: DayLog = { date, status, mood, note }
      const checkins = { ...prev.checkins, [date]: log }

      // Una recaída reinicia la racha a partir de hoy
      let streakStartDate = prev.streakStartDate
      const streakBefore = currentStreak(prev)
      const longestStreak = Math.max(prev.longestStreak, streakBefore)
      if (status === 'slip') {
        streakStartDate = date
      }

      return { ...prev, checkins, streakStartDate, longestStreak }
    })
  }, [])

  /** Registra el resultado de un antojo */
  const logCraving = useCallback((outcome: CravingOutcome, trigger?: string) => {
    setState((prev) => {
      const craving = { timestamp: Date.now(), outcome, trigger }
      let streakStartDate = prev.streakStartDate
      let checkins = prev.checkins
      const longestStreak = Math.max(prev.longestStreak, currentStreak(prev))

      // Si cayó en el antojo, cuenta como recaída del día y reinicia la racha
      if (outcome === 'gave-in') {
        const date = todayISO()
        streakStartDate = date
        checkins = {
          ...prev.checkins,
          [date]: { date, status: 'slip', note: 'Antojo no superado' },
        }
      }

      return {
        ...prev,
        cravings: [...prev.cravings, craving],
        streakStartDate,
        checkins,
        longestStreak,
      }
    })
  }, [])

  /** Permite ajustar manualmente la fecha de inicio de la racha (ej. "llevo 5 días") */
  const setDaysAlready = useCallback((days: number) => {
    setState((prev) => ({
      ...prev,
      streakStartDate: addDays(todayISO(), -Math.max(0, days)),
    }))
  }, [])

  const resetAll = useCallback(() => {
    setState(createInitialState())
  }, [])

  return {
    state,
    hydrated,
    update,
    completeOnboarding,
    logDay,
    logCraving,
    setDaysAlready,
    resetAll,
  }
}
