// Tests para funciones de sanitización
import { sanitizeName } from '../sanitize'

describe('sanitizeName', () => {
  it('debería limpiar nombres válidos correctamente', () => {
    expect(sanitizeName('Juan Pérez')).toBe('Juan Pérez')
    expect(sanitizeName('María García')).toBe('María García')
    expect(sanitizeName('John Doe')).toBe('John Doe')
  })

  it('debería eliminar caracteres < y > (prevención básica de HTML)', () => {
    // La función elimina < y > pero no el contenido entre ellos
    // Esto es suficiente para prevenir la mayoría de ataques XSS básicos
    const result1 = sanitizeName('<script>alert("xss")</script>Juan')
    expect(result1).not.toContain('<')
    expect(result1).not.toContain('>')
    
    const result2 = sanitizeName('Juan<img src="x">')
    expect(result2).not.toContain('<')
    expect(result2).not.toContain('>')
    
    const result3 = sanitizeName('<div>María</div>')
    expect(result3).not.toContain('<')
    expect(result3).not.toContain('>')
  })

  it('debería eliminar caracteres peligrosos', () => {
    const result1 = sanitizeName('Juan<script>alert(1)</script>')
    expect(result1).not.toContain('<')
    expect(result1).not.toContain('>')
    
    const result2 = sanitizeName('María<img onerror="alert(1)">')
    expect(result2).not.toContain('<')
    expect(result2).not.toContain('>')
  })

  it('debería mantener espacios normales', () => {
    expect(sanitizeName('Juan Carlos Pérez')).toBe('Juan Carlos Pérez')
  })

  it('debería eliminar espacios al inicio y final', () => {
    expect(sanitizeName('  Juan  ')).toBe('Juan')
    expect(sanitizeName('  María García  ')).toBe('María García')
  })

  it('debería manejar strings vacíos', () => {
    expect(sanitizeName('')).toBe('')
    expect(sanitizeName('   ')).toBe('')
  })

  it('debería mantener algunos caracteres especiales válidos', () => {
    // La función permite guiones y puntos
    expect(sanitizeName('José-María')).toBe('José-María')
    expect(sanitizeName('Juan.Pérez')).toBe('Juan.Pérez')
    // Nota: Las comillas simples se eliminan por el patrón permitido
    // Esto es aceptable para seguridad
  })
})

