// Utilidades para validación de datos

/**
 * Valida que un nombre sea válido
 * @param name - Nombre a validar
 * @returns true si es válido, false si no
 */
export function isValidName(name: string): boolean {
  // El nombre debe tener al menos 2 caracteres y máximo 50
  // Puede contener letras, números, espacios y algunos caracteres especiales
  const trimmed = name.trim()
  return trimmed.length >= 2 && trimmed.length <= 50 && /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-_.]+$/.test(trimmed)
}

/**
 * Valida que un monto sea válido
 * @param amount - Monto a validar
 * @returns true si es válido, false si no
 */
export function isValidAmount(amount: number): boolean {
  // El monto debe ser mayor o igual a 1 y menor o igual a 10000
  return amount >= 1 && amount <= 10000 && !isNaN(amount) && isFinite(amount)
}

/**
 * Formatea un monto como moneda
 * @param amount - Monto a formatear
 * @returns String formateado como moneda
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Estas funciones están obsoletas - usar calculateCommissions de commission.ts
// Se mantienen por compatibilidad temporal pero no deberían usarse
import { calculateDonation as calcDonationImport, calculatePlatform as calcPlatformImport } from './commission'

/**
 * @deprecated Usa calculateCommissions de commission.ts en su lugar
 */
export function calculateDonation(amount: number): number {
  return calcDonationImport(amount)
}

/**
 * @deprecated Usa calculateCommissions de commission.ts en su lugar
 */
export function calculatePlatform(amount: number): number {
  return calcPlatformImport(amount)
}

