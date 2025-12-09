// Componente skeleton para las donaciones recientes (loading state mejorado)
'use client'

export default function DonationsSkeleton() {
  return (
    <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 shadow-sm">
      <div className="h-8 w-48 bg-[var(--color-border-dark)] rounded mx-auto mb-6 animate-pulse"></div>
      
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => {
          const rowBg = index % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-background-alt)]'
          return (
            <div
              key={index}
              className={`${rowBg} border border-[var(--color-border)] rounded-md p-4 flex justify-between items-center animate-pulse`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--color-border-dark)] rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-[var(--color-border-dark)] rounded"></div>
                  <div className="h-4 w-24 bg-[var(--color-border-dark)] rounded"></div>
                </div>
              </div>
              <div className="h-4 w-24 bg-[var(--color-border-dark)] rounded"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

