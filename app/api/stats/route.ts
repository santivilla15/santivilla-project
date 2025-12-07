// API Route para obtener las estadísticas de impacto y transparencia
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
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

    // Retornar las estadísticas
    return NextResponse.json({
      total_recaudado: totalRecaudado,
      total_donado: totalDonado,
      total_plataforma: totalPlataforma,
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

