'use client'

// Componente del formulario para realizar un boost (pago)
import { useState } from 'react'
import { isValidName, isValidAmount, formatCurrency } from '@/lib/utils/validation'
import { calculateCommissions, FIXED_COMMISSION, VARIABLE_COMMISSION_RATE } from '@/lib/utils/commission'

export default function BoostForm() {
  // Estados para el nombre y el monto
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(25) // Valor por defecto de 25€
  const [loading, setLoading] = useState(false) // Estado de carga durante el proceso de pago
  const [error, setError] = useState('') // Mensaje de error si algo falla

  // Función que se ejecuta cuando el usuario hace clic en el botón de pago
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevenir el comportamiento por defecto del formulario

    // Validar que se haya ingresado un nombre
    if (!name.trim()) {
      setError('Por favor, ingresa tu nombre')
      return
    }

    // Validar que el nombre sea válido
    if (!isValidName(name)) {
      setError('El nombre debe tener entre 2 y 50 caracteres y solo puede contener letras, números y espacios')
      return
    }

    // Validar que el monto sea válido
    if (!isValidAmount(amount)) {
      setError('El monto debe estar entre 1€ y 10.000€')
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
        }),
      })

      const data = await response.json()

      // Si hay un error en la respuesta
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la sesión de pago')
      }

      // Si se creó correctamente, redirigir a Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No se recibió la URL de checkout')
      }
    } catch (err: unknown) {
      // Capturar y mostrar cualquier error
      const errorMessage = err instanceof Error ? err.message : 'Hubo un error al procesar el pago'
      setError(errorMessage)
      setLoading(false) // Desactivar el estado de carga
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 border border-green-500/30 rounded-lg p-6 shadow-lg shadow-green-500/10 hover:shadow-green-500/20 transition-shadow">
      <h2 className="text-2xl font-bold text-green-400 mb-2 text-center">
        Subir en el Ranking
      </h2>
      <p className="text-sm text-gray-400 text-center mb-6">
        Contribuye y ayuda a animales al mismo tiempo
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Tu nombre público
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Juan Pérez"
            className="w-full px-4 py-3 bg-black border border-green-500/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
            required
            disabled={loading}
          />
        </div>

        {/* Campo de monto */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
            Monto a pagar (€)
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
            className="w-full px-4 py-3 bg-black border border-green-500/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
            required
            disabled={loading}
          />
        </div>

        {/* Botón de pago */}
        <button
          type="submit"
            disabled={loading || !isValidName(name) || !isValidAmount(amount)}
          className="w-full py-4 bg-green-500 hover:bg-green-600 text-black font-bold text-lg rounded-md transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          {loading ? 'Procesando...' : `Pagar ${amount.toFixed(2)} € y subir en el ranking`}
        </button>

        {/* Texto informativo sobre el reparto con nuevo modelo */}
        {amount >= 1 && (
          <div className="bg-gray-800/50 border border-green-500/20 rounded-md p-4 space-y-2">
            {(() => {
              const commission = calculateCommissions(amount)
              return (
                <>
                  <div className="text-center">
                    <p className="text-sm text-gray-300 mb-2">
                      De <span className="text-white font-bold">{formatCurrency(amount)}</span>:
                    </p>
                    <p className="text-lg text-green-400 font-bold">
                      {formatCurrency(commission.donationAmount)} van a animales 🐾
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      ({commission.donationPercentage}% del total)
                    </p>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <p className="text-xs text-gray-400 text-center">
                      Costos ({formatCurrency(FIXED_COMMISSION)} fijos + {(VARIABLE_COMMISSION_RATE * 100).toFixed(0)}% procesamiento):{' '}
                      <span className="text-gray-300">{formatCurrency(commission.totalPlatformFee)}</span>
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      ({commission.platformPercentage}% del total)
                    </p>
                  </div>
                  <p className="text-xs text-green-400/80 text-center mt-2 italic">
                    💡 Cuanto más donas, menor es el porcentaje que cobra Santivilla
                  </p>
                </>
              )
            })()}
          </div>
        )}

        {/* Mostrar error si existe */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-md p-3 text-red-400 text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}

