// API Route para obtener el ranking de usuarios
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
          // Cachear la respuesta por 5 segundos
          'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10',
        },
      }
    )
  }

  try {
    // Crear el cliente de Supabase
    const supabase = await createClient()

    // Obtener todos los usuarios ordenados por score descendente
    // Limitar a los primeros 100 como se especificó
    const { data, error } = await supabase
      .from('ranking_users')
      .select('*')
      .order('score', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Error obteniendo ranking:', error)
      return NextResponse.json(
        { error: 'Error al obtener el ranking' },
        { status: 500 }
      )
    }

    // Convertir los datos a números para asegurar que score sea numérico
    const ranking = (data || []).map((user, index) => ({
      rank: index + 1,
      name: user.name,
      score: parseFloat(user.score),
      id: user.id,
    }))

    return NextResponse.json({ ranking }, {
      headers: {
        'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10', // Cachear 5 segundos
        'X-RateLimit-Limit': '60',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
      },
    })
  } catch (error: unknown) {
    console.error('Error en API ranking:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json(
      { error: 'Error al obtener el ranking', details: errorMessage },
      { status: 500 }
    )
  }
}

