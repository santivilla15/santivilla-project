// API Route para obtener las donaciones recientes
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit, getClientIP } from '@/lib/utils/rate-limit'

export async function GET(request: NextRequest) {
  // Rate limiting: máximo 60 requests por minuto por IP
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
          // Cachear la respuesta por 10 segundos
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=20',
        },
      }
    )
  }
  try {
    // Crear el cliente de Supabase
    const supabase = await createClient()

    // Obtener las últimas 20 donaciones ordenadas por fecha
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('total_amount, donation_amount, created_at')
      .order('created_at', { ascending: false })
      .limit(20)

    if (paymentsError) {
      console.error('Error obteniendo donaciones recientes:', paymentsError)
      return NextResponse.json(
        { error: 'Error al obtener las donaciones recientes' },
        { status: 500 }
      )
    }

    // Formatear los datos para ocultar nombres pero mostrar montos
    const recentDonations = (payments || []).map((payment) => ({
      amount: parseFloat(payment.total_amount.toString()),
      donation: parseFloat(payment.donation_amount.toString()),
      date: payment.created_at,
    }))

    return NextResponse.json({ donations: recentDonations }, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=20', // Cachear 10 segundos
        'X-RateLimit-Limit': '60',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
      },
    })
  } catch (error: unknown) {
    console.error('Error en API recent-donations:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json(
      { error: 'Error al obtener las donaciones recientes', details: errorMessage },
      { status: 500 }
    )
  }
}

