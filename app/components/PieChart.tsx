// Componente para el gráfico de pastel
'use client'

interface PieChartProps {
  totalRecaudado: number
  totalDonado: number
  totalPlataforma: number
  formatCurrency: (amount: number) => string
}

export default function PieChart({
  totalRecaudado,
  totalDonado,
  totalPlataforma,
  formatCurrency,
}: PieChartProps) {
  // Calcular porcentajes
  const donacionPercent = totalRecaudado > 0 ? (totalDonado / totalRecaudado) * 100 : 70
  const plataformaPercent = totalRecaudado > 0 ? (totalPlataforma / totalRecaudado) * 100 : 30
  
  // Radio del círculo
  const radius = 90
  const circumference = 2 * Math.PI * radius
  
  // Calcular dash arrays para el gráfico
  const donacionDash = (circumference * donacionPercent) / 100
  const plataformaDash = (circumference * plataformaPercent) / 100

  return (
    <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8 mb-12">
      <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
        Distribución Visual
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Gráfico de pastel SVG */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <svg 
            className="transform -rotate-90 drop-shadow-lg" 
            width="100%" 
            height="100%" 
            viewBox="0 0 200 200"
          >
            {/* Círculo de fondo */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#1f2937"
              strokeWidth="20"
            />
            {/* Segmento del 70% (Animales) - Verde */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#22c55e"
              strokeWidth="20"
              strokeDasharray={`${donacionDash} ${circumference}`}
              strokeDashoffset="0"
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
            {/* Segmento del 30% (Plataforma) - Gris */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#6b7280"
              strokeWidth="20"
              strokeDasharray={`${plataformaDash} ${circumference}`}
              strokeDashoffset={`-${donacionDash}`}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
            {/* Texto central */}
            <text
              x="100"
              y="95"
              textAnchor="middle"
              className="fill-white font-bold"
              fontSize="24"
              fontWeight="bold"
            >
              {formatCurrency(totalRecaudado)}
            </text>
            <text
              x="100"
              y="115"
              textAnchor="middle"
              className="fill-gray-400"
              fontSize="14"
            >
              Total
            </text>
          </svg>
        </div>
        
        {/* Leyenda */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
              🐾
            </div>
            <div>
              <div className="text-green-400 font-bold text-lg">70% - Animales</div>
              <div className="text-gray-400 text-sm">{formatCurrency(totalDonado)}</div>
              <div className="text-xs text-gray-500 mt-1">
                {totalRecaudado > 0 ? `${donacionPercent.toFixed(1)}%` : '70%'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-500/20">
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-xl">
              ⚙️
            </div>
            <div>
              <div className="text-gray-400 font-bold text-lg">30% - Plataforma</div>
              <div className="text-gray-500 text-sm">{formatCurrency(totalPlataforma)}</div>
              <div className="text-xs text-gray-500 mt-1">
                {totalRecaudado > 0 ? `${plataformaPercent.toFixed(1)}%` : '30%'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

