// Utilidad para rate limiting simple basado en IP
// Usa un Map en memoria (para producción, considera usar Redis o Upstash)

interface RateLimitConfig {
  windowMs: number // Ventana de tiempo en milisegundos
  maxRequests: number // Máximo de requests en la ventana
}

interface RequestRecord {
  count: number
  resetTime: number
}

// Map para almacenar los registros de requests por IP
// En producción, esto debería ser Redis o similar para escalar
const requestMap = new Map<string, RequestRecord>()

// Limpiar registros expirados cada minuto
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [ip, record] of requestMap.entries()) {
      if (now > record.resetTime) {
        requestMap.delete(ip)
      }
    }
  }, 60000) // Limpiar cada minuto
}

/**
 * Verifica si una IP ha excedido el límite de requests
 * @param ip - IP del cliente
 * @param config - Configuración del rate limit
 * @returns true si está dentro del límite, false si lo excedió
 */
export function checkRateLimit(ip: string, config: RateLimitConfig): {
  allowed: boolean
  remaining: number
  resetTime: number
} {
  const now = Date.now()
  const record = requestMap.get(ip)

  // Si no hay registro o el tiempo de reset expiró, crear uno nuevo
  if (!record || now > record.resetTime) {
    const newRecord: RequestRecord = {
      count: 1,
      resetTime: now + config.windowMs,
    }
    requestMap.set(ip, newRecord)
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: newRecord.resetTime,
    }
  }

  // Si el límite fue excedido
  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  // Incrementar el contador
  record.count++
  requestMap.set(ip, record)

  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  }
}

import type { NextRequest } from 'next/server'

/**
 * Obtiene la IP del cliente desde el request
 * @param request - NextRequest object
 * @returns IP del cliente
 */
export function getClientIP(request: NextRequest): string {
  // Intentar obtener la IP real (útil cuando hay proxy/load balancer)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    // x-forwarded-for puede contener múltiples IPs, tomar la primera
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback: usar 'unknown' si no se puede obtener la IP
  return 'unknown'
}


