// Componente skeleton para el ranking (loading state mejorado)
'use client'

export default function RankingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Contenedor de la tabla */}
      <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg overflow-hidden shadow-md">
        {/* Encabezado de la tabla */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-[var(--color-primary)] border-b border-[var(--color-primary)] font-bold text-white">
          <div className="text-center">RANK</div>
          <div className="text-center">SCORE (€)</div>
          <div className="text-center">NAME</div>
        </div>

        {/* Cuerpo de la tabla con skeletons */}
        <div className="max-h-[600px] overflow-y-auto">
          {[...Array(10)].map((_, index) => {
            const rowBg = index % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-background-alt)]'
            return (
              <div
                key={index}
                className={`grid grid-cols-3 gap-4 p-4 border-b border-[var(--color-border)] animate-pulse ${rowBg}`}
              >
                {/* Columna RANK skeleton */}
                <div className="text-center">
                  <div className="h-6 w-12 bg-[var(--color-border-dark)] rounded mx-auto"></div>
                </div>

                {/* Columna SCORE skeleton */}
                <div className="text-center">
                  <div className="h-6 w-20 bg-[var(--color-border-dark)] rounded mx-auto"></div>
                </div>

                {/* Columna NAME skeleton */}
                <div className="text-center">
                  <div className="h-6 w-32 bg-[var(--color-border-dark)] rounded mx-auto"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

