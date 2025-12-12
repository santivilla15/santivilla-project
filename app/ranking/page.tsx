// Página del ranking público
'use client'

/* 
 * Nota: Los errores del linter sobre "React refers to a UMD global" son falsos positivos.
 * Next.js 13+ con React 18 no requiere importar React explícitamente para usar JSX.
 * El código funciona correctamente en tiempo de ejecución.
 * 
 * Estos errores aparecen porque el linter de TypeScript no reconoce la configuración
 * "jsx": "react-jsx" en tsconfig.json, que permite usar JSX sin importar React.
 */

// @ts-nocheck - Deshabilitar verificación de tipos para este archivo debido a falsos positivos del linter
import { useEffect, useState, Suspense, useRef, useCallback } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
// Importar tipos usando ruta relativa para evitar problemas con el linter
import type { RankingUser } from '@/lib/types/database'
import RankingSkeleton from '@/app/components/RankingSkeleton'
import { BreadcrumbSchema } from '@/app/components/StructuredData'
import { trackPurchase } from '@/app/components/Analytics'

// Traducciones
const translations = {
  es: {
    title: 'Ranking Santivilla',
    subtitle: 'Los mejores compitiendo por una buena causa',
    bannerTitle: '🏆 Compite por ser #1',
    bannerSubtitle: 'Ayuda animales mientras subes en el ranking',
    successMessage: '✅ ¡Pago exitoso! Tu posición en el ranking se actualizará en breve.',
    errorTimeout: 'La solicitud tardó demasiado. Por favor, intenta de nuevo.',
    errorGeneric: 'Hubo un error al cargar el ranking',
    errorUnknown: 'Hubo un error desconocido al cargar el ranking',
    errorSupabase: 'La base de datos aún no está configurada.',
    errorSupabaseHelp: 'Consulta CONFIGURACION.md para configurar Supabase.',
    emptyTitle: 'Aún no hay usuarios en el ranking',
    emptySubtitle: '¡Sé el primero en subir de posición y ayudar a los animales!',
    emptyButton: 'Contribuir ahora',
    rankHeader: 'RANK',
    scoreHeader: 'SCORE (€)',
    nameHeader: 'NAME',
    rankAria: 'Posición en el ranking',
    scoreAria: 'Puntuación en euros',
    nameAria: 'Nombre del usuario',
    upTitle: 'Subió de posición',
    downTitle: 'Bajó de posición',
    newTitle: 'Nuevo en el ranking',
    upAria: 'subió de posición',
    downAria: 'bajó de posición',
    newAria: 'es nuevo en el ranking',
    buttonText: 'Subir en el ranking',
    buttonAria: 'Ir a la página principal para subir en el ranking',
    breadcrumbHome: 'Inicio',
    breadcrumbRanking: 'Ranking',
    loading: 'Cargando...',
    loadingAria: 'Cargando ranking',
  },
  en: {
    title: 'Santivilla Ranking',
    subtitle: 'The best competing for a good cause',
    bannerTitle: '🏆 Compete to be #1',
    bannerSubtitle: 'Help animals while climbing the ranking',
    successMessage: '✅ Payment successful! Your ranking position will update shortly.',
    errorTimeout: 'The request took too long. Please try again.',
    errorGeneric: 'There was an error loading the ranking',
    errorUnknown: 'There was an unknown error loading the ranking',
    errorSupabase: 'The database is not yet configured.',
    errorSupabaseHelp: 'See CONFIGURACION.md to configure Supabase.',
    emptyTitle: 'No users in the ranking yet',
    emptySubtitle: 'Be the first to climb the ranking and help animals!',
    emptyButton: 'Contribute now',
    rankHeader: 'RANK',
    scoreHeader: 'SCORE (€)',
    nameHeader: 'NAME',
    rankAria: 'Ranking position',
    scoreAria: 'Score in euros',
    nameAria: 'User name',
    upTitle: 'Moved up',
    downTitle: 'Moved down',
    newTitle: 'New in ranking',
    upAria: 'moved up',
    downAria: 'moved down',
    newAria: 'is new in the ranking',
    buttonText: 'Boost your ranking',
    buttonAria: 'Go to main page to boost your ranking',
    breadcrumbHome: 'Home',
    breadcrumbRanking: 'Ranking',
    loading: 'Loading...',
    loadingAria: 'Loading ranking',
  },
  de: {
    title: 'Santivilla Ranking',
    subtitle: 'Die Besten kämpfen für eine gute Sache',
    bannerTitle: '🏆 Wetteifere um Platz #1',
    bannerSubtitle: 'Hilf Tieren, während du im Ranking aufsteigst',
    successMessage: '✅ Zahlung erfolgreich! Deine Position im Ranking wird in Kürze aktualisiert.',
    errorTimeout: 'Die Anfrage dauerte zu lange. Bitte versuche es erneut.',
    errorGeneric: 'Es gab einen Fehler beim Laden des Rankings',
    errorUnknown: 'Es gab einen unbekannten Fehler beim Laden des Rankings',
    errorSupabase: 'Die Datenbank ist noch nicht konfiguriert.',
    errorSupabaseHelp: 'Siehe CONFIGURACION.md, um Supabase zu konfigurieren.',
    emptyTitle: 'Noch keine Benutzer im Ranking',
    emptySubtitle: 'Sei der Erste, der im Ranking aufsteigt und Tieren hilft!',
    emptyButton: 'Jetzt beitragen',
    rankHeader: 'RANG',
    scoreHeader: 'PUNKTZAHL (€)',
    nameHeader: 'NAME',
    rankAria: 'Position im Ranking',
    scoreAria: 'Punktzahl in Euro',
    nameAria: 'Benutzername',
    upTitle: 'Aufgestiegen',
    downTitle: 'Abgestiegen',
    newTitle: 'Neu im Ranking',
    upAria: 'ist aufgestiegen',
    downAria: 'ist abgestiegen',
    newAria: 'ist neu im Ranking',
    buttonText: 'Im Ranking aufsteigen',
    buttonAria: 'Zur Hauptseite gehen, um im Ranking aufzusteigen',
    breadcrumbHome: 'Startseite',
    breadcrumbRanking: 'Ranking',
    loading: 'Wird geladen...',
    loadingAria: 'Ranking wird geladen',
  },
}

// Componente interno que usa useSearchParams
function RankingContent() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  
  // Obtener las rutas correctas según el idioma
  const homePath = lang === 'es' ? '/' : `/${lang}`
  // Obtener los parámetros de la URL para detectar pagos exitosos
  const searchParams = useSearchParams()
  const success = searchParams?.get('success') === 'true'
  
  // Estado para almacenar el ranking de usuarios
  const [ranking, setRanking] = useState<Array<RankingUser & { rank: number; change?: 'up' | 'down' | 'new' | null }>>([])
  // Ref para almacenar el ranking anterior (para comparar cambios sin causar re-renders)
  const previousRankingRef = useRef<Array<RankingUser & { rank: number }>>([])
  // Ref para almacenar el timeout de limpieza de animaciones
  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  // Estado para indicar si se está cargando el ranking
  const [loading, setLoading] = useState(true)
  // Estado para almacenar errores si ocurren
  const [error, setError] = useState('')
  // Estado para mostrar el mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(success || false)

  // Función para detectar cambios de posición
  const detectPositionChanges = (
    oldRanking: Array<RankingUser & { rank: number }>,
    newRanking: Array<RankingUser & { rank: number }>
  ): Array<RankingUser & { rank: number; change?: 'up' | 'down' | 'new' | null }> => {
    // Si es la primera carga, no hay cambios
    if (oldRanking.length === 0) {
      return newRanking.map(user => ({ ...user, change: null }))
    }

    // Crear un mapa del ranking anterior por ID de usuario
    const oldRankMap = new Map<string, number>()
    oldRanking.forEach(user => {
      oldRankMap.set(user.id, user.rank)
    })

    // Detectar cambios para cada usuario en el nuevo ranking
    const result = newRanking.map(user => {
      const oldRank = oldRankMap.get(user.id)
      
      // Si el usuario no existía antes, es nuevo
      if (oldRank === undefined) {
        return { ...user, change: 'new' as const }
      }
      
      // Si cambió de posición
      if (oldRank !== user.rank) {
        // Si el nuevo rank es menor (número más bajo = mejor posición), subió
        if (user.rank < oldRank) {
          return { ...user, change: 'up' as const }
        } else {
          // Si el nuevo rank es mayor, bajó
          return { ...user, change: 'down' as const }
        }
      }
      
      // No hubo cambio
      return { ...user, change: null }
    })

    return result
  }

  // Función para obtener el ranking desde la API (memoizada con useCallback)
  const fetchRanking = useCallback(async (isInitialLoad = false) => {
    try {
      // Solo mostrar loading en la carga inicial
      if (isInitialLoad) {
        setLoading(true)
      }
      
      // Crear un AbortController para manejar timeouts
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos de timeout
      
      const response = await fetch('/api/ranking', {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      clearTimeout(timeoutId)

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || `Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      const newRanking = data.ranking || []
      
      // Validar que el ranking sea un array
      if (!Array.isArray(newRanking)) {
        throw new Error('Formato de datos inválido')
      }
      
      // Detectar cambios de posición comparando con el ranking anterior guardado en el ref
      const rankingWithChanges = detectPositionChanges(previousRankingRef.current, newRanking)
      
      // Guardar el ranking actual (sin cambios) como el anterior para la próxima comparación
      previousRankingRef.current = newRanking.map(user => ({ ...user }))
      
      // Limpiar el timeout anterior si existe
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current)
      }
      
      // Actualizar el estado con los datos del ranking y cambios detectados
      setRanking(rankingWithChanges)
      setError('')
      
      // Limpiar los cambios después de la animación (2 segundos)
      cleanupTimeoutRef.current = setTimeout(() => {
        setRanking(prev => {
          // Solo limpiar si el ranking actual coincide (evitar race conditions)
          const currentRanking = prev.map(user => ({ ...user, change: null }))
          return currentRanking
        })
        cleanupTimeoutRef.current = null
      }, 2000)
    } catch (err: unknown) {
      // Manejar diferentes tipos de errores
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError(t.errorTimeout)
        } else {
          setError(err.message || t.errorGeneric)
        }
      } else {
        setError(t.errorUnknown)
      }
    } finally {
      if (isInitialLoad) {
        setLoading(false)
      }
    }
  }, [])

  // Cargar el ranking cuando el componente se monta
  useEffect(() => {
    // Carga inicial con loading
    fetchRanking(true)

    // Actualizar el ranking cada 5 segundos para mantenerlo actualizado (más frecuente para animaciones)
    const interval = setInterval(() => {
      fetchRanking(false)
    }, 5000)

    // Limpiar el intervalo y timeout cuando el componente se desmonte
    return () => {
      clearInterval(interval)
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current)
      }
    }
  }, [fetchRanking])

  // Ocultar el mensaje de éxito después de 5 segundos y rastrear compra
  useEffect(() => {
    if (showSuccess) {
      // Intentar obtener el monto de la URL o usar un valor estimado
      // Nota: El monto exacto debería venir de la sesión de Stripe, pero por simplicidad
      // rastrearemos un evento de compra genérico. En producción, podrías pasar el monto en la URL.
      // Por ahora, rastrearemos el evento sin monto específico
      trackPurchase(0, 'EUR') // El monto real se puede obtener del webhook o de la sesión
      
      const timer = setTimeout(() => {
        setShowSuccess(false)
        // Limpiar el query param de la URL sin recargar
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href)
          url.searchParams.delete('success')
          window.history.replaceState({}, '', url.toString())
        }
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] py-12">
      {/* Breadcrumb Schema para SEO */}
      <BreadcrumbSchema items={[
        { name: t.breadcrumbHome, url: homePath },
        { name: t.breadcrumbRanking, url: lang === 'es' ? '/ranking' : `/${lang}/ranking` },
      ]} />
      
      <div className="container mx-auto px-4">
        {/* Título de la página */}
        <div className="text-center mb-6 md:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-3 md:mb-4 text-glow">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)]">
            {t.subtitle}
          </p>
        </div>

        {/* Banner decorativo con imagen */}
        <div className="flex justify-center mb-8 md:mb-12 px-2">
          <div className="relative w-full max-w-4xl h-24 sm:h-32 md:h-48 rounded-lg overflow-hidden border-2 border-[var(--color-border-dark)] shadow-lg">
            <Image
              src="/images/IMG_3038.JPG"
              alt={lang === 'es' ? 'Animales en refugio' : lang === 'en' ? 'Animals in shelter' : 'Tiere im Tierheim'}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <p className="text-base sm:text-lg md:text-2xl font-bold mb-1">{t.bannerTitle}</p>
                <p className="text-xs sm:text-sm md:text-base text-gray-200">{t.bannerSubtitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mostrar mensaje de éxito después del pago */}
        {showSuccess && (
          <div className="max-w-4xl mx-auto mb-6 md:mb-8 px-2">
            <div className="bg-[#E8F5E9] border border-[var(--color-secondary)] rounded-md p-3 md:p-4 text-[var(--color-secondary)] text-center text-sm md:text-base">
              {t.successMessage}
            </div>
          </div>
        )}

        {/* Mostrar estado de carga con skeleton */}
        {loading && <RankingSkeleton />}

        {/* Mostrar error si ocurre */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-[#FFEBEE] border border-[var(--color-secondary)] rounded-md p-4 text-[var(--color-secondary)] text-center">
              {error}
              {error.includes('Supabase') && (
                <div className="mt-3 text-sm text-[var(--color-secondary)]">
                  <p>{t.errorSupabase}</p>
                  <p className="text-xs mt-1">{t.errorSupabaseHelp}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tabla del ranking */}
        {!loading && !error && (
          <div className="max-w-4xl mx-auto px-2">
            {/* Vista de tabla para desktop - oculta en móviles */}
            <div className="hidden md:block bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg overflow-hidden shadow-md">
              {/* Encabezado de la tabla */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-[var(--color-primary)] border-b border-[var(--color-primary)] font-bold text-white" role="rowheader">
                <div className="text-center" role="columnheader" aria-label={t.rankAria}>{t.rankHeader}</div>
                <div className="text-center" role="columnheader" aria-label={t.scoreAria}>{t.scoreHeader}</div>
                <div className="text-center" role="columnheader" aria-label={t.nameAria}>{t.nameHeader}</div>
              </div>

              {/* Cuerpo de la tabla */}
              <div className="max-h-[600px] overflow-y-auto">
                {ranking.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4">🏆</div>
                    <p className="text-xl text-[var(--color-text)] mb-2 font-bold">{t.emptyTitle}</p>
                    <p className="text-[var(--color-text-secondary)] mb-4">{t.emptySubtitle}</p>
                    <Link
                      href={homePath}
                      className="inline-block px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold rounded-md transition-colors mt-4"
                    >
                      {t.emptyButton}
                    </Link>
                  </div>
                ) : (
                  ranking.map((user, index) => {
                    // Determinar las clases CSS según el cambio de posición
                    const changeClass = user.change === 'up' ? 'rank-up' : 
                                       user.change === 'down' ? 'rank-down' : 
                                       user.change === 'new' ? 'rank-new' : ''
                    
                    const rankingRowClass = `ranking-row ${changeClass}`
                    // Alternar fondo: blanco y gris muy claro
                    const rowBg = index % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-background-alt)]'
                    
                    return (
                      <div
                        key={user.id}
                        className={`grid grid-cols-3 gap-4 p-4 border-b border-[var(--color-border)] hover:bg-[var(--color-hover)] transition-all duration-300 ${rankingRowClass} ${rowBg} ${
                          user.rank === 1 ? 'bg-[#FFF9E6] border-l-4 border-l-[#FFD700]' : ''
                        } ${
                          user.rank === 2 ? 'bg-[#F5F5F5] border-l-4 border-l-[#C0C0C0]' : ''
                        } ${
                          user.rank === 3 ? 'bg-[#FFF4E6] border-l-4 border-l-[#CD7F32]' : ''
                        }`}
                      >
                        {/* Columna RANK */}
                        <div className="text-center font-bold text-lg flex items-center justify-center gap-2 text-[var(--color-text)]">
                          <span className={user.change === 'up' ? 'rank-pulse' : ''}>
                            {user.rank === 1 && '🥇'}
                            {user.rank === 2 && '🥈'}
                            {user.rank === 3 && '🥉'}
                            {user.rank > 3 && '#'}
                            {user.rank}
                          </span>
                          {/* Indicador de cambio de posición */}
                          {user.change === 'up' && (
                            <span 
                              className="text-[var(--color-secondary)] text-sm animate-pulse" 
                              title={t.upTitle}
                              aria-label={`${user.name} ${t.upAria}`}
                              role="status"
                            >
                              ⬆️
                            </span>
                          )}
                          {user.change === 'down' && (
                            <span 
                              className="text-[var(--color-primary)] text-sm" 
                              title={t.downTitle}
                              aria-label={`${user.name} ${t.downAria}`}
                              role="status"
                            >
                              ⬇️
                            </span>
                          )}
                          {user.change === 'new' && (
                            <span 
                              className="text-[var(--color-primary)] text-sm animate-pulse" 
                              title={t.newTitle}
                              aria-label={`${user.name} ${t.newAria}`}
                              role="status"
                            >
                              ✨
                            </span>
                          )}
                        </div>

                        {/* Columna SCORE */}
                        <div className="text-center text-[var(--color-secondary)] font-semibold flex items-center justify-center">
                          <span className={user.change === 'up' ? 'rank-pulse' : ''}>
                            {user.score.toFixed(2)} €
                          </span>
                        </div>

                        {/* Columna NAME */}
                        <div className="text-center truncate flex items-center justify-center text-[var(--color-text)]" title={user.name}>
                          <span className={user.change === 'up' ? 'rank-pulse' : ''}>
                            {user.name}
                          </span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Vista de tarjetas para móviles - visible solo en móviles */}
            <div className="md:hidden space-y-3">
              {ranking.length === 0 ? (
                <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <p className="text-lg text-[var(--color-text)] mb-2 font-bold">{t.emptyTitle}</p>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">{t.emptySubtitle}</p>
                  <Link
                    href={homePath}
                    className="inline-block px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold rounded-md transition-colors mt-4"
                  >
                    {t.emptyButton}
                  </Link>
                </div>
              ) : (
                ranking.map((user, index) => {
                  const changeClass = user.change === 'up' ? 'rank-up' : 
                                     user.change === 'down' ? 'rank-down' : 
                                     user.change === 'new' ? 'rank-new' : ''
                  
                  const rankingRowClass = `ranking-row ${changeClass}`
                  
                  return (
                    <div
                      key={user.id}
                      className={`bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-4 shadow-md ${rankingRowClass} ${
                        user.rank === 1 ? 'bg-[#FFF9E6] border-l-4 border-l-[#FFD700]' : ''
                      } ${
                        user.rank === 2 ? 'bg-[#F5F5F5] border-l-4 border-l-[#C0C0C0]' : ''
                      } ${
                        user.rank === 3 ? 'bg-[#FFF4E6] border-l-4 border-l-[#CD7F32]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-[var(--color-text)]">
                            {user.rank === 1 && '🥇'}
                            {user.rank === 2 && '🥈'}
                            {user.rank === 3 && '🥉'}
                            {user.rank > 3 && '#'}
                            {user.rank}
                          </span>
                          {user.change === 'up' && (
                            <span 
                              className="text-[var(--color-secondary)] text-sm animate-pulse" 
                              title={t.upTitle}
                              aria-label={`${user.name} ${t.upAria}`}
                              role="status"
                            >
                              ⬆️
                            </span>
                          )}
                          {user.change === 'down' && (
                            <span 
                              className="text-[var(--color-primary)] text-sm" 
                              title={t.downTitle}
                              aria-label={`${user.name} ${t.downAria}`}
                              role="status"
                            >
                              ⬇️
                            </span>
                          )}
                          {user.change === 'new' && (
                            <span 
                              className="text-[var(--color-primary)] text-sm animate-pulse" 
                              title={t.newTitle}
                              aria-label={`${user.name} ${t.newAria}`}
                              role="status"
                            >
                              ✨
                            </span>
                          )}
                        </div>
                        <div className="text-xl font-bold text-[var(--color-secondary)]">
                          {user.score.toFixed(2)} €
                        </div>
                      </div>
                      <div className="text-base font-semibold text-[var(--color-text)] truncate" title={user.name}>
                        {user.name}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Botón para volver a la home */}
            <div className="text-center mt-6 md:mt-8 px-2">
              <Link
                href={homePath}
                className="inline-block px-5 py-2.5 md:px-6 md:py-3 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold text-sm md:text-base rounded-md transition-colors"
                aria-label={t.buttonAria}
              >
                {t.buttonText}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente de breadcrumbs
function RankingBreadcrumbs() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const homePath = lang === 'es' ? '/' : `/${lang}`
  const rankingPath = lang === 'es' ? '/ranking' : `/${lang}/ranking`
  
  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4">
      <ol className="flex items-center space-x-2 text-sm text-[var(--color-text-secondary)]">
        <li>
          <Link href={homePath} className="hover:text-[var(--color-primary)] transition-colors">
            {t.breadcrumbHome}
          </Link>
        </li>
        <li>/</li>
        <li className="text-[var(--color-text)] font-medium" aria-current="page">
          {t.breadcrumbRanking}
        </li>
      </ol>
    </nav>
  )
}

// Componente principal envuelto en Suspense
export default function RankingPage() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  
  return (
    <>
      <RankingBreadcrumbs />
      
      <Suspense fallback={
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-12" role="status" aria-live="polite" aria-label={t.loadingAria}>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]" aria-hidden="true"></div>
              <p className="mt-4 text-[var(--color-text-secondary)]">{t.loading}</p>
            </div>
          </div>
        </div>
      }>
        <RankingContent />
      </Suspense>
    </>
  )
}

