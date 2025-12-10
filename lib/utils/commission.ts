// Utilidades para calcular comisiones según el nuevo modelo

// Constantes del modelo de comisiones
export const FIXED_COMMISSION = 1.50 // EUR - Comisión fija por transacción
export const VARIABLE_COMMISSION_RATE = 0.05 // 5% - Porcentaje variable sobre lo restante

// Interface para el resultado del cálculo de comisiones
export interface CommissionCalculation {
  totalAmount: number
  fixedFee: number
  variableFee: number
  totalPlatformFee: number
  donationAmount: number
  donationPercentage: string // Como string para mostrar (ej: "93.6%")
  platformPercentage: string // Como string para mostrar (ej: "6.4%")
}

/**
 * Calcula las comisiones según el nuevo modelo:
 * - Comisión fija: 1.50€
 * - Comisión variable: 5% sobre el monto restante después de la comisión fija
 * 
 * @param totalAmount - Monto total pagado por el usuario
 * @returns Objeto con el desglose completo de comisiones
 */
export function calculateCommissions(totalAmount: number): CommissionCalculation {
  // Comisión fija de 1.50€
  const fixedFee = FIXED_COMMISSION
  
  // Monto restante después de restar la comisión fija
  const remainingAfterFixed = Math.max(0, totalAmount - fixedFee)
  
  // Comisión variable (5% sobre lo restante)
  // Para coincidir EXACTAMENTE con los ejemplos de la página de transparencia:
  // Método que prioriza la donación (redondeando hacia arriba) y ajusta la plataforma
  const donationRaw = remainingAfterFixed * 0.95
  // Redondear donación hacia arriba para garantizar máximo beneficio a animales
  const donationAmount = Math.ceil(donationRaw * 100) / 100
  
  // Total que se queda la plataforma (diferencia entre total y donación)
  // Esto garantiza que donation + platform = total exactamente
  const totalPlatformFee = Math.round((totalAmount - donationAmount) * 100) / 100
  
  // Comisión variable (plataforma menos comisión fija)
  const variableFee = totalPlatformFee - fixedFee
  
  // Calcular porcentajes (redondeados a 1 decimal)
  const donationPercentage = totalAmount > 0 
    ? ((donationAmount / totalAmount) * 100).toFixed(1)
    : "0.0"
  
  const platformPercentage = totalAmount > 0
    ? ((totalPlatformFee / totalAmount) * 100).toFixed(1)
    : "0.0"

  return {
    totalAmount,
    fixedFee,
    variableFee,
    totalPlatformFee,
    donationAmount,
    donationPercentage,
    platformPercentage,
  }
}

/**
 * Calcula solo el monto de donación (para casos simples)
 */
export function calculateDonation(totalAmount: number): number {
  const calculation = calculateCommissions(totalAmount)
  return Math.round(calculation.donationAmount * 100) / 100
}

/**
 * Calcula solo el monto de plataforma (para casos simples)
 */
export function calculatePlatform(totalAmount: number): number {
  const calculation = calculateCommissions(totalAmount)
  return Math.round(calculation.totalPlatformFee * 100) / 100
}

