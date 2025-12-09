// Componente para mostrar ejemplos de cómo se calculan las comisiones
'use client'

import { usePathname } from 'next/navigation'
import { calculateCommissions } from '@/lib/utils/commission'
import { formatCurrency } from '@/lib/utils/validation'

const translations = {
  es: {
    title: 'Ejemplos de Cálculo',
    subtitle: 'La comisión es variable: cuanto más donas, menor es el porcentaje que cobra Santivilla.',
    header1: 'Si donas',
    header2: 'Van a animales',
    header3: 'Costos plataforma',
    header4: '% a animales',
    fixedFee: 'Comisión Fija',
    fixedFeeDesc: 'por transacción',
    variableFee: 'Comisión Variable',
    variableFeeDesc: '5% sobre lo restante',
  },
  en: {
    title: 'Calculation Examples',
    subtitle: 'The fee is variable: the more you donate, the lower the percentage Santivilla charges.',
    header1: 'If you donate',
    header2: 'Goes to animals',
    header3: 'Platform costs',
    header4: '% to animals',
    fixedFee: 'Fixed Fee',
    fixedFeeDesc: 'per transaction',
    variableFee: 'Variable Fee',
    variableFeeDesc: '5% on the remainder',
  },
  de: {
    title: 'Berechnungsbeispiele',
    subtitle: 'Die Gebühr ist variabel: Je mehr du spendest, desto niedriger ist der Prozentsatz, den Santivilla verlangt.',
    header1: 'Wenn du spendest',
    header2: 'Geht an Tiere',
    header3: 'Plattformkosten',
    header4: '% für Tiere',
    fixedFee: 'Feste Gebühr',
    fixedFeeDesc: 'pro Transaktion',
    variableFee: 'Variable Gebühr',
    variableFeeDesc: '5% auf den Restbetrag',
  },
}

export default function ExampleTable() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  // Ejemplos de montos para mostrar
  const examples = [50, 100, 250, 500, 1000, 2000]

  return (
    <div className="bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-8 mb-12 shadow-sm">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 text-center">
        {t.title}
      </h2>
      <p className="text-[var(--color-text-secondary)] text-center mb-6 text-sm">
        {t.subtitle}
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-primary)] bg-[var(--color-primary)]">
              <th className="text-left py-3 px-4 text-white font-semibold">{t.header1}</th>
              <th className="text-center py-3 px-4 text-white font-semibold">{t.header2}</th>
              <th className="text-center py-3 px-4 text-white font-semibold">{t.header3}</th>
              <th className="text-center py-3 px-4 text-white font-semibold text-xs">{t.header4}</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((amount, index) => {
              const commission = calculateCommissions(amount)
              const rowBg = index % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-background-alt)]'
              return (
                <tr 
                  key={amount} 
                  className={`border-b border-[var(--color-border)] hover:bg-[var(--color-hover)] transition-colors ${rowBg}`}
                >
                  <td className="py-3 px-4 text-[var(--color-text)] font-semibold">
                    {formatCurrency(amount)}
                  </td>
                  <td className="py-3 px-4 text-center text-[var(--color-secondary)] font-bold">
                    {formatCurrency(commission.donationAmount)}
                  </td>
                  <td className="py-3 px-4 text-center text-[var(--color-primary)]">
                    {formatCurrency(commission.totalPlatformFee)}
                  </td>
                  <td className="py-3 px-4 text-center text-[var(--color-text-secondary)] text-sm">
                    {commission.donationPercentage}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-secondary)]/30 rounded p-3">
            <p className="text-[var(--color-secondary)] font-semibold mb-1">{t.fixedFee}</p>
            <p className="text-[var(--color-text)]">{formatCurrency(1.50)} {t.fixedFeeDesc}</p>
          </div>
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-primary)]/30 rounded p-3">
            <p className="text-[var(--color-primary)] font-semibold mb-1">{t.variableFee}</p>
            <p className="text-[var(--color-text)]">{t.variableFeeDesc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

