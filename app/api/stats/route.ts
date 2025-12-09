// API Route para obtener las estadísticas de impacto y transparencia
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit, getClientIP } from '@/lib/utils/rate-limit'

export async function GET(request: NextRequest) {
  // Rate limiting: máximo 60 requests por minuto por IP (más permisivo que checkout)
  const clientIP = getClientIP(request)
  const rateLimit = checkRateLimit(clientIP, {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 60, // 60 requests máximo
  })

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Por favor, intenta de nuevo en un momento.' },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          'X-RateLimit-Limit': '60',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          // Cachear la respuesta por 30 segundos
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    )
  }
  try {
    // Crear el cliente de Supabase
    const supabase = await createClient()

    // Obtener todos los pagos para calcular los totales
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('total_amount, donation_amount, platform_amount, fixed_fee, variable_fee')

    if (paymentsError) {
      console.error('Error obteniendo pagos:', paymentsError)
      return NextResponse.json(
        { error: 'Error al obtener las estadísticas' },
        { status: 500 }
      )
    }

    // Calcular los totales sumando todos los pagos
    let totalRecaudado = 0
    let totalDonado = 0
    let totalPlataforma = 0

    if (payments && payments.length > 0) {
      payments.forEach((payment) => {
        totalRecaudado += parseFloat(payment.total_amount.toString())
        totalDonado += parseFloat(payment.donation_amount.toString())
        totalPlataforma += parseFloat(payment.platform_amount.toString())
      })
    }

    // Retornar las estadísticas con caché y headers de rate limit
    return NextResponse.json({
      total_recaudado: totalRecaudado,
      total_donado: totalDonado,
      total_plataforma: totalPlataforma,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60', // Cachear 30 segundos
        'X-RateLimit-Limit': '60',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
      },
    })
  } catch (error: unknown) {
    console.error('Error en API stats:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json(
      { error: 'Error al obtener las estadísticas', details: errorMessage },
      { status: 500 }
    )
  }
}

