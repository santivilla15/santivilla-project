// API Route para obtener las donaciones recientes
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
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

    return NextResponse.json({ donations: recentDonations })
  } catch (error: unknown) {
    console.error('Error en API recent-donations:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json(
      { error: 'Error al obtener las donaciones recientes', details: errorMessage },
      { status: 500 }
    )
  }
}

