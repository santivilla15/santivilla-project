// Utilidades para sanitización de inputs y prevención de XSS

/**
 * Sanitiza un string removiendo caracteres HTML peligrosos
 * @param input - String a sanitizar
 * @returns String sanitizado
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }

  // Remover caracteres HTML peligrosos
  return input
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript: protocol
    .replace(/on\w+=/gi, '') // Remover event handlers (onclick=, onerror=, etc.)
    .trim()
}

/**
 * Sanitiza un nombre de usuario
 * Permite letras, números, espacios y algunos caracteres especiales seguros
 * @param name - Nombre a sanitizar
 * @returns Nombre sanitizado o string vacío si es inválido
 */
export function sanitizeName(name: string): string {
  if (typeof name !== 'string') {
    return ''
  }

  // Primero sanitizar contra XSS
  let sanitized = sanitizeString(name)

  // Validar que solo contenga caracteres permitidos
  // Letras (incluyendo acentos), números, espacios, guiones, puntos, guiones bajos
  const allowedPattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-_.]+$/
  
  if (!allowedPattern.test(sanitized)) {
    // Si no cumple el patrón, remover caracteres no permitidos
    sanitized = sanitized.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-_.]/g, '')
  }

  // Limitar longitud
  sanitized = sanitized.trim().slice(0, 50)

  return sanitized
}

/**
 * Escapa HTML para prevenir XSS
 * @param text - Texto a escapar
 * @returns Texto escapado
 */
export function escapeHtml(text: string): string {
  if (typeof text !== 'string') {
    return ''
  }

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }

  return text.replace(/[&<>"']/g, (char) => map[char] || char)
}

