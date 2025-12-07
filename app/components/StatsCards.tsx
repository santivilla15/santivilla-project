// Componente para mostrar tarjetas de estadísticas
'use client'

interface StatsCardsProps {
  totalRecaudado: number
  totalDonado: number
  totalPlataforma: number
  formatCurrency: (amount: number) => string
}

export default function StatsCards({
  totalRecaudado,
  totalDonado,
  totalPlataforma,
  formatCurrency,
}: StatsCardsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {/* Total Recaudado */}
      <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8 text-center hover:border-green-500/50 transition-colors">
        <div className="text-4xl mb-3">💰</div>
        <div className="text-3xl font-bold text-white mb-2">
          {formatCurrency(totalRecaudado)}
        </div>
        <div className="text-gray-400">Total Recaudado</div>
      </div>

      {/* Total Donado (70%) */}
      <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8 text-center hover:border-green-500/50 transition-colors">
        <div className="text-4xl mb-3">🐾</div>
        <div className="text-3xl font-bold text-green-400 mb-2">
          {formatCurrency(totalDonado)}
        </div>
        <div className="text-gray-400">Donado a Animales</div>
        <div className="text-xs text-green-400 mt-2 font-semibold">(70% del total)</div>
      </div>

      {/* Total Plataforma (30%) */}
      <div className="bg-gray-900 border border-gray-500/30 rounded-lg p-8 text-center hover:border-gray-500/50 transition-colors">
        <div className="text-4xl mb-3">⚙️</div>
        <div className="text-3xl font-bold text-gray-400 mb-2">
          {formatCurrency(totalPlataforma)}
        </div>
        <div className="text-gray-400">Para la Plataforma</div>
        <div className="text-xs text-gray-500 mt-2">(30% del total)</div>
      </div>
    </div>
  )
}

