'use client'

// Componente del formulario para realizar un boost (pago)
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isValidName, isValidAmount, formatCurrency } from '@/lib/utils/validation'
import { calculateCommissions } from '@/lib/utils/commission'
import { trackBeginCheckout } from '@/app/components/Analytics'

// Traducciones
const translations = {
  es: {
    title: 'Subir en el Ranking',
    subtitle: 'Contribuye y ayuda a animales al mismo tiempo',
    nameLabel: 'Tu nombre público',
    namePlaceholder: 'Ej: Juan Pérez',
    amountLabel: 'Monto a pagar (€)',
    amountPlaceholder: '25.00',
    previewTitle: '📍 PREVIEW DE TU POSICIÓN',
    previewName: 'Nombre:',
    previewAmount: 'Monto:',
    previewPosition: 'Tu posición:',
    previewAfter: '(después de pagar)',
    buttonPay: 'Pagar',
    buttonProcessing: 'Procesando...',
    buttonAndRank: 'y subir en el ranking',
    errorNameRequired: 'Por favor, ingresa tu nombre',
    errorNameInvalid: 'El nombre debe tener entre 2 y 50 caracteres y solo puede contener letras, números y espacios',
    errorAmountInvalid: 'El monto debe estar entre 1€ y 10.000€',
    errorPayment: 'Error al crear la sesión de pago',
    errorStripe: 'Error de configuración de Stripe. Verifica las claves en .env.local',
    errorNoUrl: 'No se recibió la URL de checkout',
    errorGeneric: 'Hubo un error al procesar el pago',
    breakdownOf: 'De',
    breakdownGoesTo: 'van a animales',
    breakdownCosts: 'Costos Santivilla:',
  },
  en: {
    title: 'Boost Your Ranking',
    subtitle: 'Contribute and help animals at the same time',
    nameLabel: 'Your public name',
    namePlaceholder: 'E.g: John Doe',
    amountLabel: 'Amount to pay (€)',
    amountPlaceholder: '25.00',
    previewTitle: '📍 PREVIEW OF YOUR POSITION',
    previewName: 'Name:',
    previewAmount: 'Amount:',
    previewPosition: 'Your position:',
    previewAfter: '(after payment)',
    buttonPay: 'Pay',
    buttonProcessing: 'Processing...',
    buttonAndRank: 'and boost your ranking',
    errorNameRequired: 'Please enter your name',
    errorNameInvalid: 'Name must be between 2 and 50 characters and can only contain letters, numbers and spaces',
    errorAmountInvalid: 'Amount must be between €1 and €10,000',
    errorPayment: 'Error creating payment session',
    errorStripe: 'Stripe configuration error. Check keys in .env.local',
    errorNoUrl: 'Checkout URL not received',
    errorGeneric: 'There was an error processing the payment',
    breakdownOf: 'Of',
    breakdownGoesTo: 'goes to animals',
    breakdownCosts: 'Santivilla costs:',
  },
  de: {
    title: 'Im Ranking aufsteigen',
    subtitle: 'Beitragen und gleichzeitig Tieren helfen',
    nameLabel: 'Dein öffentlicher Name',
    namePlaceholder: 'z.B: Max Mustermann',
    amountLabel: 'Zu zahlender Betrag (€)',
    amountPlaceholder: '25.00',
    previewTitle: '📍 VORSCHAU DEINER POSITION',
    previewName: 'Name:',
    previewAmount: 'Betrag:',
    previewPosition: 'Deine Position:',
    previewAfter: '(nach Zahlung)',
    buttonPay: 'Zahlen',
    buttonProcessing: 'Wird verarbeitet...',
    buttonAndRank: 'und im Ranking aufsteigen',
    errorNameRequired: 'Bitte gib deinen Namen ein',
    errorNameInvalid: 'Der Name muss zwischen 2 und 50 Zeichen lang sein und darf nur Buchstaben, Zahlen und Leerzeichen enthalten',
    errorAmountInvalid: 'Der Betrag muss zwischen 1€ und 10.000€ liegen',
    errorPayment: 'Fehler beim Erstellen der Zahlungssitzung',
    errorStripe: 'Stripe-Konfigurationsfehler. Überprüfe die Schlüssel in .env.local',
    errorNoUrl: 'Checkout-URL nicht erhalten',
    errorGeneric: 'Es gab einen Fehler bei der Zahlungsverarbeitung',
    breakdownOf: 'Von',
    breakdownGoesTo: 'geht an Tiere',
    breakdownCosts: 'Santivilla-Kosten:',
  },
}

export default function BoostForm() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  // Estados para el nombre y el monto
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(25) // Valor por defecto de 25€
  const [loading, setLoading] = useState(false) // Estado de carga durante el proceso de pago
  const [error, setError] = useState('') // Mensaje de error si algo falla
  const [previewPosition, setPreviewPosition] = useState<number | null>(null) // Posición estimada en el ranking
  const [ranking, setRanking] = useState<Array<{ score: number }>>([]) // Ranking actual para calcular posición

  // Obtener el ranking para calcular la posición estimada
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('/api/ranking')
        if (response.ok) {
          const data = await response.json()
          setRanking(data.ranking || [])
        }
      } catch (error) {
        console.error('Error obteniendo ranking para preview:', error)
      }
    }
    fetchRanking()
  }, [])

  // Calcular la posición estimada en tiempo real
  useEffect(() => {
    if (amount >= 1 && ranking.length > 0) {
      const userScore = amount
      // Encontrar cuántos usuarios tienen un score mayor
      const usersAbove = ranking.filter(user => user.score > userScore).length
      setPreviewPosition(usersAbove + 1)
    } else {
      setPreviewPosition(null)
    }
  }, [amount, ranking])

  // Función que se ejecuta cuando el usuario hace clic en el botón de pago
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevenir el comportamiento por defecto del formulario

    // Validar que se haya ingresado un nombre
    if (!name.trim()) {
      setError(t.errorNameRequired)
      return
    }

    // Validar que el nombre sea válido
    if (!isValidName(name)) {
      setError(t.errorNameInvalid)
      return
    }

    // Validar que el monto sea válido
    if (!isValidAmount(amount)) {
      setError(t.errorAmountInvalid)
      return
    }

    setLoading(true) // Activar el estado de carga
    setError('') // Limpiar cualquier error previo

    try {
      // Llamar a la API para crear la sesión de checkout de Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          amount: amount,
          lang: lang, // Enviar el idioma actual a la API
        }),
      })

      const data = await response.json()

      // Si hay un error en la respuesta
      if (!response.ok) {
        const errorMsg = data.error || t.errorPayment
        if (errorMsg.includes('Stripe') || errorMsg.includes('STRIPE')) {
          throw new Error(t.errorStripe)
        }
        throw new Error(errorMsg)
      }

      // Si se creó correctamente, rastrear el inicio de checkout y redirigir a Stripe Checkout
      if (data.url) {
        // Rastrear evento de inicio de checkout en Google Analytics
        trackBeginCheckout(amount)
        window.location.href = data.url
      } else {
        throw new Error(t.errorNoUrl)
      }
    } catch (err: unknown) {
      // Capturar y mostrar cualquier error
      const errorMessage = err instanceof Error ? err.message : t.errorGeneric
      setError(errorMessage)
      setLoading(false) // Desactivar el estado de carga
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-[var(--color-background)] border border-[var(--color-border-dark)] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-2 text-center">
        {t.title}
      </h2>
      <p className="text-sm text-[var(--color-text-secondary)] text-center mb-6">
        {t.subtitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario para realizar una donación y subir en el ranking">
        {/* Campo de nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            {t.nameLabel}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
            required
            disabled={loading}
            aria-required="true"
            aria-describedby={error ? "name-error" : undefined}
          />
        </div>

        {/* Campo de monto */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            {t.amountLabel}
          </label>
          <input
            type="number"
            id="amount"
            value={amount === 0 ? '' : amount}
            onChange={(e) => {
              const value = e.target.value
              // Si el campo está vacío, establecer 0 (pero mostrar vacío)
              if (value === '') {
                setAmount(0)
                return
              }
              // Convertir a número, eliminar ceros iniciales innecesarios
              const numValue = parseFloat(value)
              if (!isNaN(numValue)) {
                setAmount(numValue)
              }
            }}
            onBlur={() => {
              // Cuando el usuario sale del campo, asegurar que el valor mínimo es 1
              if (amount < 1 && amount > 0) {
                setAmount(1)
              }
            }}
            min="1"
            step="0.01"
            placeholder="25.00"
            className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
            required
            disabled={loading}
            aria-required="true"
            aria-label="Monto en euros a pagar (mínimo 1€)"
            aria-describedby={error ? "amount-error" : undefined}
          />
        </div>

        {/* Preview en tiempo real de la posición */}
        {name.trim() && amount >= 1 && previewPosition && (
          <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border-2 border-[var(--color-primary)] rounded-lg p-4 animate-fade-in" role="region" aria-label="Vista previa de tu posición en el ranking">
            <h4 className="text-lg font-bold text-[var(--color-primary)] mb-3 flex items-center gap-2">
              {t.previewTitle}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">{t.previewName}</span>
                <span className="font-semibold text-[var(--color-text)]">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">{t.previewAmount}</span>
                <span className="font-semibold text-[var(--color-text)]">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[var(--color-border-dark)]">
                <span className="text-[var(--color-text-secondary)]">{t.previewPosition}</span>
                <span className="text-2xl font-bold text-[var(--color-secondary)]">
                  #{previewPosition}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-2 italic">
                {t.previewAfter}
              </p>
            </div>
          </div>
        )}

        {/* Botón de pago */}
        <button
          type="submit"
          disabled={loading || !isValidName(name) || !isValidAmount(amount)}
          className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold text-lg rounded-md transition-colors disabled:bg-[var(--color-border-dark)] disabled:cursor-not-allowed disabled:text-[var(--color-text-secondary)]"
          aria-label={loading ? t.buttonProcessing : `${t.buttonPay} ${amount.toFixed(2)} € ${t.buttonAndRank}`}
          aria-busy={loading}
        >
          {loading ? t.buttonProcessing : `${t.buttonPay} ${amount.toFixed(2)} € ${t.buttonAndRank}`}
        </button>

        {/* Texto informativo sobre el reparto con nuevo modelo */}
        {amount >= 1 && (
          <div className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-md p-4 space-y-3" role="region" aria-label="Desglose de la donación">
            {(() => {
              const commission = calculateCommissions(amount)
              return (
                <>
                  <div className="text-center">
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                      {t.breakdownOf} <span className="text-[var(--color-text)] font-bold text-base">{formatCurrency(amount)}</span>:
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl" aria-hidden="true">✅</span>
                      <p className="text-lg text-[var(--color-secondary)] font-bold">
                        {formatCurrency(commission.donationAmount)} {t.breakdownGoesTo}
                      </p>
                      <span className="text-lg" aria-hidden="true">🐾</span>
                    </div>
                    <p className="text-sm text-[var(--color-secondary)] font-semibold">
                      ({commission.donationPercentage}%)
                    </p>
                  </div>
                  <div className="border-t border-[var(--color-border-dark)] pt-3 mt-3">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl" aria-hidden="true">💚</span>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {t.breakdownCosts} <span className="text-[var(--color-text)] font-semibold">{formatCurrency(commission.totalPlatformFee)}</span>
                      </p>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] text-center mt-1">
                      ({commission.platformPercentage}%)
                    </p>
                  </div>
                </>
              )
            })()}
          </div>
        )}

        {/* Mostrar error si existe */}
        {error && (
          <div 
            className="bg-[#FFEBEE] border border-[var(--color-secondary)] rounded-md p-3 text-[var(--color-secondary)] text-sm"
            role="alert"
            aria-live="polite"
            id={error.includes('nombre') ? "name-error" : error.includes('monto') ? "amount-error" : "form-error"}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  )
}

