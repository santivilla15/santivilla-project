// Página de Impacto y Transparencia
'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
// Importar tipos usando ruta relativa para evitar problemas con el linter
import type { TotalStats } from '@/lib/types/database'
import StatsCards from '@/app/components/StatsCards'
import PieChart from '@/app/components/PieChart'
import ExampleTable from './components/ExampleTable'
import RecentDonationsSection from './components/RecentDonationsSection'
import YouTubeVideos from './components/YouTubeVideos'
import StatsSkeleton from '@/app/components/StatsSkeleton'
import { BreadcrumbSchema } from '@/app/components/StructuredData'

// Función para formatear números como moneda (fuera del componente para mejor rendimiento)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

// Traducciones
const translations = {
  es: {
    breadcrumbHome: 'Inicio',
    breadcrumbTransparency: 'Transparencia',
    title: '📊 Transparencia en Donaciones',
    subtitle: 'Aquí puedes ver exactamente cómo se distribuye cada euro que recibimos',
    intro: 'Entendemos que quieres saber exactamente dónde va tu dinero. Aquí está la verdad.',
    costsTitle: 'Cada pago tiene un costo real:',
    cost1: 'Stripe (pasarela de pagos): ~2.9% + 0.30€',
    cost2: 'Servidores: ~200€/mes (dividido entre todos los usuarios)',
    cost3: 'Equipo: desarrollo, videos de YouTube, contacto con refugios',
    fairTitle: 'En lugar de cobrar lo que cuesta realmente (~5-8%), elegimos ser justos:',
    fixedFee: 'Comisión fija:',
    fixedFeeDesc: '1.50€ (cubre el costo mínimo de procesar tu pago)',
    variableFee: 'Comisión variable:',
    variableFeeDesc: '5% (reinversión en crecer)',
    result: '📊 Resultado: ~95% a animales, ~5% a mantener Santivilla',
    goal: 'Nuestro objetivo:',
    goalText: 'Cuando seamos sostenibles con sponsors y YouTube, bajar esto a 2-3% y eventualmente 0%.',
    variableNote: 'La comisión es variable:',
    variableNoteText: 'cuanto más donas, menor es el porcentaje que cobra Santivilla.',
    whyTitle: '¿Por qué Santivilla cobra comisiones?',
    errorTimeout: 'La solicitud tardó demasiado. Por favor, intenta de nuevo.',
    errorGeneric: 'Hubo un error al cargar las estadísticas',
    errorUnknown: 'Hubo un error desconocido al cargar las estadísticas',
    errorSupabase: 'La base de datos aún no está configurada.',
    errorSupabaseHelp: 'Consulta CONFIGURACION.md para configurar Supabase.',
    breakdownTitle: 'Desglose Detallado',
    donationLabel: 'Donación a Animales',
    platformLabel: 'Mantenimiento de la Plataforma',
    emptyTitle: 'Aún no hay datos para mostrar',
    emptySubtitle: '¡Sé el primero en contribuir y ayudar a los animales!',
    emptyButton: 'Contribuir ahora',
    videosTitle: '📹 Ver cómo usamos cada donación en YouTube',
    videosComing: 'Próximamente: videos de YouTube mostrando las donaciones reales a refugios de animales.',
    videosPlaceholder: 'Espacio reservado para videos de YouTube',
    videosNote: 'Aquí mostraremos evidencia real de cómo se usan las donaciones',
    futureGoal: '💡 Nuestro objetivo:',
    futureGoalText: 'Llegar al 100% donado cuando Santivilla sea autosuficiente con otros ingresos.',
    futureNote: 'Estamos trabajando para encontrar formas alternativas de financiación (publicidad, partnerships, YouTube, etc.) para que en el futuro todo lo recaudado vaya directamente a los animales.',
    animalsTitle: 'Animales que Están Esperando',
    animalsNote: 'Cada contribución ayuda a proporcionar comida, cuidados médicos y un hogar temporal para estos animales',
    buttonText: 'Contribuir al impacto',
    buttonAria: 'Ir a la página principal para contribuir al impacto',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbTransparency: 'Transparency',
    title: '📊 Donation Transparency',
    subtitle: 'Here you can see exactly how every euro we receive is distributed',
    intro: 'We understand you want to know exactly where your money goes. Here\'s the truth.',
    costsTitle: 'Each payment has real costs:',
    cost1: 'Stripe (payment gateway): ~2.9% + €0.30',
    cost2: 'Servers: ~€200/month (divided among all users)',
    cost3: 'Team: development, YouTube videos, contact with shelters',
    fairTitle: 'Instead of charging what it really costs (~5-8%), we choose to be fair:',
    fixedFee: 'Fixed fee:',
    fixedFeeDesc: '€1.50 (covers the minimum cost of processing your payment)',
    variableFee: 'Variable fee:',
    variableFeeDesc: '5% (reinvestment in growth)',
    result: '📊 Result: ~95% to animals, ~5% to maintain Santivilla',
    goal: 'Our goal:',
    goalText: 'When we\'re sustainable with sponsors and YouTube, reduce this to 2-3% and eventually 0%.',
    variableNote: 'The fee is variable:',
    variableNoteText: 'the more you donate, the lower the percentage Santivilla charges.',
    whyTitle: 'Why does Santivilla charge fees?',
    errorTimeout: 'The request took too long. Please try again.',
    errorGeneric: 'There was an error loading the statistics',
    errorUnknown: 'There was an unknown error loading the statistics',
    errorSupabase: 'The database is not yet configured.',
    errorSupabaseHelp: 'See CONFIGURACION.md to configure Supabase.',
    breakdownTitle: 'Detailed Breakdown',
    donationLabel: 'Donation to Animals',
    platformLabel: 'Platform Maintenance',
    emptyTitle: 'No data to display yet',
    emptySubtitle: 'Be the first to contribute and help animals!',
    emptyButton: 'Contribute now',
    videosTitle: '📹 See how we use each donation on YouTube',
    videosComing: 'Coming soon: YouTube videos showing real donations to animal shelters.',
    videosPlaceholder: 'Space reserved for YouTube videos',
    videosNote: 'Here we will show real evidence of how donations are used',
    futureGoal: '💡 Our goal:',
    futureGoalText: 'Reach 100% donated when Santivilla is self-sufficient with other income.',
    futureNote: 'We are working to find alternative funding methods (advertising, partnerships, YouTube, etc.) so that in the future everything raised goes directly to animals.',
    animalsTitle: 'Animals Waiting',
    animalsNote: 'Each contribution helps provide food, medical care and a temporary home for these animals',
    buttonText: 'Contribute to impact',
    buttonAria: 'Go to main page to contribute to impact',
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbTransparency: 'Transparenz',
    title: '📊 Spendentransparenz',
    subtitle: 'Hier kannst du genau sehen, wie jeder Euro, den wir erhalten, verteilt wird',
    intro: 'Wir verstehen, dass du genau wissen möchtest, wohin dein Geld geht. Hier ist die Wahrheit.',
    costsTitle: 'Jede Zahlung hat echte Kosten:',
    cost1: 'Stripe (Zahlungsgateway): ~2,9% + 0,30€',
    cost2: 'Server: ~200€/Monat (auf alle Benutzer aufgeteilt)',
    cost3: 'Team: Entwicklung, YouTube-Videos, Kontakt mit Tierheimen',
    fairTitle: 'Anstatt das zu verlangen, was es wirklich kostet (~5-8%), entscheiden wir uns für Fairness:',
    fixedFee: 'Feste Gebühr:',
    fixedFeeDesc: '1,50€ (deckt die Mindestkosten für die Bearbeitung deiner Zahlung)',
    variableFee: 'Variable Gebühr:',
    variableFeeDesc: '5% (Reinvestition in Wachstum)',
    result: '📊 Ergebnis: ~95% für Tiere, ~5% für den Erhalt von Santivilla',
    goal: 'Unser Ziel:',
    goalText: 'Wenn wir mit Sponsoren und YouTube nachhaltig sind, reduzieren wir dies auf 2-3% und schließlich auf 0%.',
    variableNote: 'Die Gebühr ist variabel:',
    variableNoteText: 'Je mehr du spendest, desto niedriger ist der Prozentsatz, den Santivilla verlangt.',
    whyTitle: 'Warum erhebt Santivilla Gebühren?',
    errorTimeout: 'Die Anfrage dauerte zu lange. Bitte versuche es erneut.',
    errorGeneric: 'Es gab einen Fehler beim Laden der Statistiken',
    errorUnknown: 'Es gab einen unbekannten Fehler beim Laden der Statistiken',
    errorSupabase: 'Die Datenbank ist noch nicht konfiguriert.',
    errorSupabaseHelp: 'Siehe CONFIGURACION.md, um Supabase zu konfigurieren.',
    breakdownTitle: 'Detaillierte Aufschlüsselung',
    donationLabel: 'Spende an Tiere',
    platformLabel: 'Plattformwartung',
    emptyTitle: 'Noch keine Daten zum Anzeigen',
    emptySubtitle: 'Sei der Erste, der beiträgt und Tieren hilft!',
    emptyButton: 'Jetzt beitragen',
    videosTitle: '📹 Sehen, wie wir jede Spende auf YouTube verwenden',
    videosComing: 'Bald verfügbar: YouTube-Videos, die echte Spenden an Tierheime zeigen.',
    videosPlaceholder: 'Platz für YouTube-Videos reserviert',
    videosNote: 'Hier werden wir echte Beweise zeigen, wie Spenden verwendet werden',
    futureGoal: '💡 Unser Ziel:',
    futureGoalText: '100% gespendet erreichen, wenn Santivilla mit anderen Einnahmen autark ist.',
    futureNote: 'Wir arbeiten daran, alternative Finanzierungsmethoden (Werbung, Partnerschaften, YouTube usw.) zu finden, damit in Zukunft alles, was gesammelt wird, direkt an Tiere geht.',
    animalsTitle: 'Tiere, die warten',
    animalsNote: 'Jeder Beitrag hilft, Futter, medizinische Versorgung und ein vorübergehendes Zuhause für diese Tiere bereitzustellen',
    buttonText: 'Zum Impact beitragen',
    buttonAria: 'Zur Hauptseite gehen, um zum Impact beizutragen',
  },
}

export default function ImpactoPage() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const homePath = lang === 'es' ? '/' : `/${lang}`
  const impactoPath = lang === 'es' ? '/impacto' : `/${lang}/impacto`
  
  return (
    <>
      {/* Breadcrumbs para SEO */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4">
        <ol className="flex items-center space-x-2 text-sm text-[var(--color-text-secondary)]">
          <li>
            <Link href={homePath} className="hover:text-[var(--color-primary)] transition-colors">
              {t.breadcrumbHome}
            </Link>
          </li>
          <li>/</li>
          <li className="text-[var(--color-text)] font-medium" aria-current="page">
            {t.breadcrumbTransparency}
          </li>
        </ol>
      </nav>
      <ImpactoContent />
    </>
  )
}

function ImpactoContent() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const homePath = lang === 'es' ? '/' : `/${lang}`
  // Estado para almacenar las estadísticas
  const [stats, setStats] = useState<TotalStats | null>(null)
  // Estado para indicar si se está cargando
  const [loading, setLoading] = useState(true)
  // Estado para almacenar errores
  const [error, setError] = useState('')

  // Función para obtener las estadísticas desde la API (memoizada con useCallback)
  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      
      // Crear un AbortController para manejar timeouts
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos de timeout
      
      const response = await fetch('/api/stats', {
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
      
      // Validar que los datos sean válidos
      const totalRecaudado = typeof data.total_recaudado === 'number' ? data.total_recaudado : 0
      const totalDonado = typeof data.total_donado === 'number' ? data.total_donado : 0
      const totalPlataforma = typeof data.total_plataforma === 'number' ? data.total_plataforma : 0

      // Actualizar el estado con las estadísticas
      setStats({
        total_recaudado: totalRecaudado,
        total_donado: totalDonado,
        total_plataforma: totalPlataforma,
      })
      setError('')
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
      setLoading(false)
    }
  }, [])

  // Cargar las estadísticas cuando el componente se monta
  useEffect(() => {
    fetchStats()

    // Actualizar las estadísticas cada 30 segundos
    const interval = setInterval(fetchStats, 30000)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval)
  }, [fetchStats])

  // Calcular porcentajes memoizados para evitar recálculos innecesarios
  const donationPercentage = useMemo(() => {
    if (!stats || stats.total_recaudado === 0) return 0
    return (stats.total_donado / stats.total_recaudado) * 100
  }, [stats])

  const platformPercentage = useMemo(() => {
    if (!stats || stats.total_recaudado === 0) return 0
    return (stats.total_plataforma / stats.total_recaudado) * 100
  }, [stats])

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] py-12">
      {/* Breadcrumb Schema para SEO */}
      <BreadcrumbSchema items={[
        { name: t.breadcrumbHome, url: homePath },
        { name: t.breadcrumbTransparency, url: lang === 'es' ? '/impacto' : `/${lang}/impacto` },
      ]} />
      
      <div className="container mx-auto px-4">
        {/* Título de la página */}
        <div className="text-center mb-8 md:mb-12 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-3 md:mb-4 text-glow">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-4 md:mb-6">
            {t.subtitle}
          </p>
          {/* Texto explicativo */}
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-primary)] rounded-lg p-4 md:p-6 max-w-4xl mx-auto text-left space-y-3 md:space-y-4 text-sm md:text-base">
            <div>
              <p className="text-[var(--color-text)] leading-relaxed mb-4">
                {t.intro}
              </p>
              
              <p className="text-[var(--color-text)] leading-relaxed mb-3">
                {t.costsTitle}
              </p>
              <ul className="list-disc list-inside text-[var(--color-text)] space-y-2 ml-4 mb-4">
                <li>{t.cost1}</li>
                <li>{t.cost2}</li>
                <li>{t.cost3}</li>
              </ul>
              
              <p className="text-[var(--color-text)] leading-relaxed mb-4">
                {t.fairTitle}
              </p>
              
              <ul className="list-disc list-inside text-[var(--color-text)] space-y-2 ml-4 mb-4">
                <li><span className="text-[var(--color-secondary)] font-semibold">{t.fixedFee}</span> {t.fixedFeeDesc}</li>
                <li><span className="text-[var(--color-secondary)] font-semibold">{t.variableFee}</span> {t.variableFeeDesc}</li>
              </ul>
              
              <div className="bg-[var(--color-background)] border border-[var(--color-secondary)] rounded p-4 my-4">
                <p className="text-[var(--color-secondary)] font-bold text-center text-lg mb-2">
                  {t.result}
                </p>
              </div>
              
              <p className="text-[var(--color-text)] leading-relaxed mb-4">
                <strong>{t.goal}</strong> {t.goalText}
              </p>
              
              <p className="text-[var(--color-text)] leading-relaxed">
                <strong>{t.variableNote}</strong> {t.variableNoteText}
              </p>
            </div>
          </div>
        </div>

        {/* Sección de explicación de comisiones */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6 text-center">
            {t.whyTitle}
          </h2>
        </div>

        {/* Mostrar estado de carga con skeleton */}
        {loading && <StatsSkeleton />}

        {/* Mostrar error si ocurre */}
        {error && (
          <div className="bg-[#FFEBEE] border border-[var(--color-secondary)] rounded-md p-3 md:p-4 text-[var(--color-secondary)] text-center mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base px-2">
            {error}
            {error.includes('Supabase') && (
              <div className="mt-3 text-sm text-[var(--color-secondary)]">
                <p>{t.errorSupabase}</p>
                <p className="text-xs mt-1">{t.errorSupabaseHelp}</p>
              </div>
            )}
          </div>
        )}

        {/* Mostrar estadísticas */}
        {!loading && !error && stats && (
          <div className="max-w-4xl mx-auto">
            {/* Tarjetas de estadísticas principales */}
            <StatsCards
              totalRecaudado={stats.total_recaudado}
              totalDonado={stats.total_donado}
              totalPlataforma={stats.total_plataforma}
              formatCurrency={formatCurrency}
            />

            {/* Gráfico de Pastel */}
            <PieChart
              totalRecaudado={stats.total_recaudado}
              totalDonado={stats.total_donado}
              totalPlataforma={stats.total_plataforma}
              formatCurrency={formatCurrency}
            />

            {/* Tabla de ejemplos */}
            <ExampleTable />

            {/* Gráfico visual de barras (adicional) */}
            <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 mb-12 shadow-sm">
              <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 text-center">
                {t.breakdownTitle}
              </h2>
              
              {stats.total_recaudado > 0 ? (
                <div className="space-y-4">
                  {/* Barra de donación */}
                  <div>
                    <div className="flex justify-between text-sm text-[var(--color-text-secondary)] mb-2">
                      <span>{t.donationLabel}</span>
                      <span className="text-[var(--color-secondary)] font-bold">
                        {donationPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-background-alt)] rounded-full h-10 overflow-hidden relative">
                      <div
                        className="bg-[var(--color-secondary)] h-full flex items-center justify-end pr-4 text-white font-bold text-sm transition-all duration-1000"
                        style={{
                          width: `${donationPercentage}%`,
                        }}
                      >
                        {donationPercentage.toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1 text-right">
                      {formatCurrency(stats.total_donado)}
                    </div>
                  </div>

                  {/* Barra de plataforma */}
                  <div>
                    <div className="flex justify-between text-sm text-[var(--color-text-secondary)] mb-2">
                      <span>{t.platformLabel}</span>
                      <span className="text-[var(--color-primary)] font-bold">
                        {platformPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-background-alt)] rounded-full h-10 overflow-hidden relative">
                      <div
                        className="bg-[var(--color-primary)] h-full flex items-center justify-end pr-4 text-white font-bold text-sm transition-all duration-1000"
                        style={{
                          width: `${platformPercentage}%`,
                        }}
                      >
                        {platformPercentage.toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1 text-right">
                      {formatCurrency(stats.total_plataforma)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-xl text-[var(--color-text)] mb-2 font-bold">{t.emptyTitle}</p>
                  <p className="text-[var(--color-text-secondary)] mb-6">{t.emptySubtitle}</p>
                  <Link
                    href={homePath}
                    className="inline-block px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold rounded-md transition-colors"
                  >
                    {t.emptyButton}
                  </Link>
                </div>
              )}
            </div>

            {/* Donaciones recientes */}
            <RecentDonationsSection />

            {/* Sección de videos de YouTube */}
            <YouTubeVideos />

            {/* Nota sobre el objetivo futuro */}
            <div className="bg-[var(--color-background-alt)] border border-[var(--color-primary)] rounded-lg p-6 text-center">
              <p className="text-[var(--color-primary)] text-sm md:text-base">
                <strong>{t.futureGoal}</strong> {t.futureGoalText}
              </p>
              <p className="text-[var(--color-text-secondary)] text-xs mt-2">
                {t.futureNote}
              </p>
            </div>

            {/* Galería de animales ayudados */}
            <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-4 md:p-6 lg:p-8 mt-6 md:mt-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-4 md:mb-6 text-center">
                {t.animalsTitle}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {/* Imagen 1 */}
                <div className="relative h-40 md:h-56 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md">
                  <Image
                    src="/images/IMG_3035.JPG"
                    alt="Animales rescatados esperando hogar"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                {/* Imagen 2 */}
                <div className="relative h-40 md:h-56 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md">
                  <Image
                    src="/images/IMG_3036.JPG"
                    alt="Animal esperando adopción"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                {/* Imagen 3 */}
                <div className="relative h-40 md:h-56 rounded-lg overflow-hidden border border-[var(--color-border-dark)] shadow-md">
                  <Image
                    src="/images/IMG_3037.AVIF"
                    alt="Animal rescatado"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
              <p className="text-center text-[var(--color-text-secondary)] mt-6 text-sm">
                {t.animalsNote}
              </p>
            </div>

            {/* Botón para volver a la home */}
            <div className="text-center mt-8 md:mt-12 px-2">
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

