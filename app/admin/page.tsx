// Panel de administración de Santivilla
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Tipos para las estadísticas
interface AdminStats {
  totalDonations: number
  totalAmount: number
  totalDonated: number
  totalPlatform: number
  uniqueDonors: number
  averageDonation: number
  recentPayments: Array<{
    id: string
    user_name: string
    total_amount: number
    donation_amount: number
    created_at: string
  }>
}

// Traducciones
const translations = {
  es: {
    title: 'Panel de Administración',
    subtitle: 'Gestión y estadísticas de Santivilla',
    stats: 'Estadísticas Generales',
    totalDonations: 'Total de Donaciones',
    totalAmount: 'Monto Total Recaudado',
    totalDonated: 'Total Donado a Animales',
    totalPlatform: 'Total Plataforma',
    uniqueDonors: 'Donantes Únicos',
    averageDonation: 'Donación Promedio',
    recentPayments: 'Pagos Recientes',
    noPayments: 'Aún no hay pagos',
    logout: 'Cerrar Sesión',
    backToSite: 'Volver al Sitio',
    loading: 'Cargando...',
    error: 'Error al cargar datos',
    retry: 'Reintentar',
    date: 'Fecha',
    donor: 'Donante',
    amount: 'Monto',
    donation: 'Donación',
    platform: 'Plataforma',
  },
  en: {
    title: 'Admin Panel',
    subtitle: 'Santivilla management and statistics',
    stats: 'General Statistics',
    totalDonations: 'Total Donations',
    totalAmount: 'Total Amount Raised',
    totalDonated: 'Total Donated to Animals',
    totalPlatform: 'Total Platform',
    uniqueDonors: 'Unique Donors',
    averageDonation: 'Average Donation',
    recentPayments: 'Recent Payments',
    noPayments: 'No payments yet',
    logout: 'Logout',
    backToSite: 'Back to Site',
    loading: 'Loading...',
    error: 'Error loading data',
    retry: 'Retry',
    date: 'Date',
    donor: 'Donor',
    amount: 'Amount',
    donation: 'Donation',
    platform: 'Platform',
  },
  de: {
    title: 'Administrationspanel',
    subtitle: 'Santivilla-Verwaltung und Statistiken',
    stats: 'Allgemeine Statistiken',
    totalDonations: 'Gesamte Spenden',
    totalAmount: 'Gesamter Betrag',
    totalDonated: 'Gesamt an Tiere gespendet',
    totalPlatform: 'Gesamt Plattform',
    uniqueDonors: 'Einzigartige Spender',
    averageDonation: 'Durchschnittliche Spende',
    recentPayments: 'Letzte Zahlungen',
    noPayments: 'Noch keine Zahlungen',
    logout: 'Abmelden',
    backToSite: 'Zurück zur Website',
    loading: 'Lädt...',
    error: 'Fehler beim Laden der Daten',
    retry: 'Wiederholen',
    date: 'Datum',
    donor: 'Spender',
    amount: 'Betrag',
    donation: 'Spende',
    platform: 'Plattform',
  },
}

export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lang, setLang] = useState<'es' | 'en' | 'de'>('es')

  // Detectar idioma desde la URL
  useEffect(() => {
    const pathname = window.location.pathname
    if (pathname.startsWith('/en')) {
      setLang('en')
    } else if (pathname.startsWith('/de')) {
      setLang('de')
    } else {
      setLang('es')
    }
  }, [])

  const t = translations[lang]

  // Cargar estadísticas
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)

        // Obtener token de admin desde localStorage o prompt
        let adminToken = localStorage.getItem('admin_token')
        if (!adminToken) {
          const token = prompt('Ingresa el token de administración:')
          if (!token) {
            setError('Token requerido')
            setLoading(false)
            return
          }
          adminToken = token
          localStorage.setItem('admin_token', adminToken)
        }

        // Obtener estadísticas usando la API protegida
        const statsResponse = await fetch('/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })

        if (!statsResponse.ok) {
          if (statsResponse.status === 401) {
            localStorage.removeItem('admin_token')
            setError('Token inválido. Por favor, recarga la página.')
            return
          }
          throw new Error('Error al cargar estadísticas')
        }

        const statsData = await statsResponse.json()
        setStats(statsData)
      } catch (err) {
        console.error('Error cargando estadísticas:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // Actualizar cada 30 segundos
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  // Formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  // Obtener ruta base según idioma
  const getBasePath = () => {
    return lang === 'es' ? '' : `/${lang}`
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-background)] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-primary)]">
                {t.title}
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {t.subtitle}
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href={`${getBasePath()}/`}
                className="px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                {t.backToSite}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {loading && !stats && (
          <div className="text-center py-12">
            <div className="text-[var(--color-text-secondary)]">{t.loading}</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{t.error}: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              {t.retry}
            </button>
          </div>
        )}

        {stats && (
          <>
            {/* Estadísticas generales */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                {t.stats}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-6">
                  <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                    {t.totalDonations}
                  </div>
                  <div className="text-3xl font-bold text-[var(--color-primary)]">
                    {stats.totalDonations}
                  </div>
                </div>

                <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-6">
                  <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                    {t.totalAmount}
                  </div>
                  <div className="text-3xl font-bold text-[var(--color-secondary)]">
                    {formatCurrency(stats.totalAmount)}
                  </div>
                </div>

                <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-6">
                  <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                    {t.totalDonated}
                  </div>
                  <div className="text-3xl font-bold text-[var(--color-secondary)]">
                    {formatCurrency(stats.totalDonated)}
                  </div>
                </div>

                <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-6">
                  <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                    {t.totalPlatform}
                  </div>
                  <div className="text-3xl font-bold text-[var(--color-primary)]">
                    {formatCurrency(stats.totalPlatform)}
                  </div>
                </div>

                <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-6">
                  <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                    {t.uniqueDonors}
                  </div>
                  <div className="text-3xl font-bold text-[var(--color-primary)]">
                    {stats.uniqueDonors}
                  </div>
                </div>

                <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-6">
                  <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                    {t.averageDonation}
                  </div>
                  <div className="text-3xl font-bold text-[var(--color-secondary)]">
                    {formatCurrency(stats.averageDonation)}
                  </div>
                </div>
              </div>
            </section>

            {/* Pagos recientes */}
            <section>
              <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                {t.recentPayments}
              </h2>
              {stats.recentPayments.length === 0 ? (
                <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-8 text-center">
                  <p className="text-[var(--color-text-secondary)]">{t.noPayments}</p>
                </div>
              ) : (
                <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[var(--color-primary)] text-white">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold">{t.date}</th>
                          <th className="text-left py-3 px-4 font-semibold">{t.donor}</th>
                          <th className="text-right py-3 px-4 font-semibold">{t.amount}</th>
                          <th className="text-right py-3 px-4 font-semibold">{t.donation}</th>
                          <th className="text-right py-3 px-4 font-semibold">{t.platform}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentPayments.map((payment, index) => (
                          <tr
                            key={payment.id}
                            className={`border-b border-[var(--color-border)] ${
                              index % 2 === 0
                                ? 'bg-[var(--color-background)]'
                                : 'bg-[var(--color-background-alt)]'
                            }`}
                          >
                            <td className="py-3 px-4 text-[var(--color-text)]">
                              {formatDate(payment.created_at)}
                            </td>
                            <td className="py-3 px-4 text-[var(--color-text)] font-semibold">
                              {payment.user_name}
                            </td>
                            <td className="py-3 px-4 text-right text-[var(--color-text)]">
                              {formatCurrency(payment.total_amount)}
                            </td>
                            <td className="py-3 px-4 text-right text-[var(--color-secondary)] font-semibold">
                              {formatCurrency(payment.donation_amount)}
                            </td>
                            <td className="py-3 px-4 text-right text-[var(--color-primary)]">
                              {formatCurrency(
                                payment.total_amount - payment.donation_amount
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

