// Componente skeleton para las estadísticas (loading state mejorado)
'use client'

export default function StatsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Tarjetas de estadísticas skeleton */}
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 text-center animate-pulse shadow-sm"
          >
            <div className="h-12 w-12 bg-[var(--color-border-dark)] rounded-full mx-auto mb-3"></div>
            <div className="h-10 w-32 bg-[var(--color-border-dark)] rounded mx-auto mb-2"></div>
            <div className="h-5 w-24 bg-[var(--color-border-dark)] rounded mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Gráfico de pastel skeleton */}
      <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 shadow-sm">
        <div className="h-8 w-48 bg-[var(--color-border-dark)] rounded mx-auto mb-6 animate-pulse"></div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Círculo skeleton */}
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="w-full h-full bg-[var(--color-border-dark)] rounded-full animate-pulse"></div>
          </div>
          
          {/* Leyenda skeleton */}
          <div className="space-y-4">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-[var(--color-background-alt)] rounded-lg border border-[var(--color-border-dark)] animate-pulse"
              >
                <div className="w-10 h-10 bg-[var(--color-border-dark)] rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-[var(--color-border-dark)] rounded"></div>
                  <div className="h-4 w-24 bg-[var(--color-border-dark)] rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla skeleton */}
      <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 shadow-sm">
        <div className="h-8 w-48 bg-[var(--color-border-dark)] rounded mx-auto mb-6 animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(6)].map((_, index) => {
            const rowBg = index % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-background-alt)]'
            return (
              <div
                key={index}
                className={`grid grid-cols-4 gap-4 p-4 border-b border-[var(--color-border)] animate-pulse ${rowBg}`}
              >
                <div className="h-6 bg-[var(--color-border-dark)] rounded"></div>
                <div className="h-6 bg-[var(--color-border-dark)] rounded"></div>
                <div className="h-6 bg-[var(--color-border-dark)] rounded"></div>
                <div className="h-6 bg-[var(--color-border-dark)] rounded"></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

