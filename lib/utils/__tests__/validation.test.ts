// Tests para funciones de validación
import { isValidName, isValidAmount, formatCurrency } from '../validation'

describe('isValidName', () => {
  it('debería aceptar nombres válidos', () => {
    expect(isValidName('Juan Pérez')).toBe(true)
    expect(isValidName('María García')).toBe(true)
    expect(isValidName('John Doe')).toBe(true)
    expect(isValidName('Max Mustermann')).toBe(true)
    expect(isValidName('Ana123')).toBe(true)
  })

  it('debería rechazar nombres muy cortos', () => {
    expect(isValidName('A')).toBe(false)
    expect(isValidName('')).toBe(false)
  })

  it('debería rechazar nombres muy largos', () => {
    const longName = 'A'.repeat(51)
    expect(isValidName(longName)).toBe(false)
  })

  it('debería rechazar nombres con caracteres especiales peligrosos', () => {
    expect(isValidName('Juan<script>')).toBe(false)
    expect(isValidName('María<img>')).toBe(false)
    expect(isValidName('John<div>')).toBe(false)
  })

  it('debería aceptar nombres con espacios', () => {
    expect(isValidName('Juan Carlos Pérez')).toBe(true)
    expect(isValidName('María de los Ángeles')).toBe(true)
  })

  it('debería rechazar nombres solo con espacios', () => {
    expect(isValidName('   ')).toBe(false)
  })
})

describe('isValidAmount', () => {
  it('debería aceptar montos válidos', () => {
    expect(isValidAmount(1)).toBe(true)
    expect(isValidAmount(25)).toBe(true)
    expect(isValidAmount(100)).toBe(true)
    expect(isValidAmount(1000)).toBe(true)
    expect(isValidAmount(9999)).toBe(true)
  })

  it('debería rechazar montos menores a 1€', () => {
    expect(isValidAmount(0)).toBe(false)
    expect(isValidAmount(0.5)).toBe(false)
    expect(isValidAmount(-10)).toBe(false)
  })

  it('debería rechazar montos mayores a 10000€', () => {
    expect(isValidAmount(10001)).toBe(false)
    expect(isValidAmount(50000)).toBe(false)
  })

  it('debería aceptar el límite exacto', () => {
    expect(isValidAmount(1)).toBe(true)
    expect(isValidAmount(10000)).toBe(true)
  })
})

describe('formatCurrency', () => {
  it('debería formatear correctamente montos en euros', () => {
    expect(formatCurrency(25)).toContain('25')
    expect(formatCurrency(100)).toContain('100')
    // En español, los miles se separan con puntos, no comas
    expect(formatCurrency(1000)).toMatch(/1[.,]000|1000/)
  })

  it('debería incluir el símbolo de euro', () => {
    expect(formatCurrency(25)).toContain('€')
  })

  it('debería formatear decimales correctamente', () => {
    const formatted = formatCurrency(25.50)
    expect(formatted).toContain('25')
    expect(formatted).toContain('50')
  })
})

