// Componente para mostrar ejemplos de cómo se calculan las comisiones
'use client'

import { calculateCommissions } from '@/lib/utils/commission'
import { formatCurrency } from '@/lib/utils/validation'

export default function ExampleTable() {
  // Ejemplos de montos para mostrar
  const examples = [50, 100, 250, 500, 1000, 2000]

  return (
    <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8 mb-12">
      <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
        Ejemplos de Cálculo
      </h2>
      <p className="text-gray-400 text-center mb-6 text-sm">
        La comisión es variable: cuanto más donas, menor es el porcentaje que cobra Santivilla.
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-green-500/30">
              <th className="text-left py-3 px-4 text-green-400 font-semibold">Si donas</th>
              <th className="text-center py-3 px-4 text-green-400 font-semibold">Van a animales</th>
              <th className="text-center py-3 px-4 text-gray-400 font-semibold">Costos plataforma</th>
              <th className="text-center py-3 px-4 text-gray-500 font-semibold text-xs">% a animales</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((amount) => {
              const commission = calculateCommissions(amount)
              return (
                <tr 
                  key={amount} 
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-4 text-white font-semibold">
                    {formatCurrency(amount)}
                  </td>
                  <td className="py-3 px-4 text-center text-green-400 font-bold">
                    {formatCurrency(commission.donationAmount)}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    {formatCurrency(commission.totalPlatformFee)}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-500 text-sm">
                    {commission.donationPercentage}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-green-900/20 border border-green-500/20 rounded p-3">
            <p className="text-green-400 font-semibold mb-1">Comisión Fija</p>
            <p className="text-gray-300">{formatCurrency(1.50)} por transacción</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded p-3">
            <p className="text-gray-400 font-semibold mb-1">Comisión Variable</p>
            <p className="text-gray-300">5% sobre lo restante</p>
          </div>
        </div>
      </div>
    </div>
  )
}

