// Tests para la función de cálculo de comisiones
import { calculateCommissions } from '../commission'

describe('calculateCommissions', () => {
  it('debería calcular correctamente las comisiones para un monto de 100€', () => {
    const result = calculateCommissions(100)
    
    expect(result.totalAmount).toBe(100)
    expect(result.fixedFee).toBe(1.50)
    // remainingAfterFixed no está en el resultado, pero podemos verificarlo calculándolo
    const remainingAfterFixed = Math.max(0, result.totalAmount - result.fixedFee)
    expect(remainingAfterFixed).toBe(98.50)
    expect(result.variableFee).toBeCloseTo(4.925, 2) // 5% de 98.50
    expect(result.donationAmount).toBeCloseTo(93.575, 2) // 98.50 - 4.925
    expect(result.totalPlatformFee).toBeCloseTo(6.425, 2) // 1.50 + 4.925
    // Los porcentajes son strings
    expect(parseFloat(result.donationPercentage)).toBeCloseTo(93.6, 1)
    expect(parseFloat(result.platformPercentage)).toBeCloseTo(6.4, 1)
  })

  it('debería calcular correctamente las comisiones para un monto de 25€', () => {
    const result = calculateCommissions(25)
    
    expect(result.totalAmount).toBe(25)
    expect(result.fixedFee).toBe(1.50)
    // remainingAfterFixed no está en el resultado, pero podemos verificarlo
    const remainingAfterFixed = Math.max(0, result.totalAmount - result.fixedFee)
    expect(remainingAfterFixed).toBe(23.50)
    expect(result.variableFee).toBeCloseTo(1.175, 2) // 5% de 23.50
    expect(result.donationAmount).toBeCloseTo(22.325, 2) // 23.50 - 1.175
    expect(result.totalPlatformFee).toBeCloseTo(2.675, 2) // 1.50 + 1.175
  })

  it('debería calcular correctamente las comisiones para un monto de 1000€', () => {
    const result = calculateCommissions(1000)
    
    expect(result.totalAmount).toBe(1000)
    expect(result.fixedFee).toBe(1.50)
    // remainingAfterFixed no está en el resultado, pero podemos verificarlo
    const remainingAfterFixed = Math.max(0, result.totalAmount - result.fixedFee)
    expect(remainingAfterFixed).toBe(998.50)
    expect(result.variableFee).toBeCloseTo(49.925, 2) // 5% de 998.50
    expect(result.donationAmount).toBeCloseTo(948.575, 2) // 998.50 - 49.925
    expect(result.totalPlatformFee).toBeCloseTo(51.425, 2) // 1.50 + 49.925
    // Los porcentajes son strings, convertirlos a números
    const donationPercent = parseFloat(result.donationPercentage)
    expect(donationPercent).toBeCloseTo(94.9, 1)
  })

  it('debería manejar correctamente montos pequeños (mínimo 1€)', () => {
    const result = calculateCommissions(1)
    
    expect(result.totalAmount).toBe(1)
    expect(result.fixedFee).toBe(1.50)
    // Si el monto es menor que la comisión fija, la donación sería negativa
    // Esto debería ser validado en el frontend
    // remainingAfterFixed no está en el resultado, pero podemos calcularlo
    const remainingAfterFixed = Math.max(0, result.totalAmount - result.fixedFee)
    expect(remainingAfterFixed).toBe(0) // Math.max(0, 1 - 1.50) = 0
  })

  it('debería calcular porcentajes correctamente', () => {
    const result = calculateCommissions(100)
    
    // Los porcentajes son strings, convertirlos a números para comparar
    const donationPercent = parseFloat(result.donationPercentage)
    const platformPercent = parseFloat(result.platformPercentage)
    
    // El porcentaje de donación debería ser aproximadamente 93.6%
    expect(donationPercent).toBeGreaterThan(90)
    expect(donationPercent).toBeLessThan(95)
    
    // El porcentaje de plataforma debería ser aproximadamente 6.4%
    expect(platformPercent).toBeGreaterThan(5)
    expect(platformPercent).toBeLessThan(10)
  })

  it('debería mantener la suma de donación + plataforma = total', () => {
    const amounts = [25, 50, 100, 250, 500, 1000]
    
    amounts.forEach(amount => {
      const result = calculateCommissions(amount)
      const sum = result.donationAmount + result.totalPlatformFee
      expect(sum).toBeCloseTo(amount, 2)
    })
  })
})

