// Componente para mostrar las donaciones recientes
'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/utils/validation'

interface RecentDonation {
  amount: number
  donation: number
  date: string
}

export default function RecentDonationsSection() {
  const [donations, setDonations] = useState<RecentDonation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('/api/recent-donations')
        const data = await response.json()

        if (response.ok && data.donations) {
          setDonations(data.donations)
        }
      } catch (error) {
        console.error('Error cargando donaciones recientes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchDonations, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8 mb-12">
      <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
        Donaciones Recientes
      </h2>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          <p className="text-gray-400 mt-4 text-sm">Cargando donaciones...</p>
        </div>
      ) : donations.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <p className="text-sm text-gray-500">
            Las donaciones recientes aparecerán aquí cuando se realicen pagos.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            (Por privacidad, solo mostramos montos y fechas, no nombres completos)
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 text-center mb-4">
            Por privacidad, solo mostramos montos y fechas
          </p>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {donations.map((donation, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-green-500/10 rounded-md p-4 flex justify-between items-center hover:border-green-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="text-green-400 font-semibold">
                      {formatCurrency(donation.donation)} a animales
                    </p>
                    <p className="text-xs text-gray-500">
                      Total: {formatCurrency(donation.amount)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {formatDate(donation.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

