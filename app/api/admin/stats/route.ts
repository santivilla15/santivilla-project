// API route para obtener estadísticas del admin
// Protegida con una simple verificación de token
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    // Verificar token de admin (simple, puedes mejorarlo después)
    const authHeader = request.headers.get('authorization')
    const adminToken = process.env.ADMIN_TOKEN || 'santivilla-admin-2026'

    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Obtener estadísticas usando el cliente de servidor
    // Este cliente puede leer datos públicos sin problemas
    const supabase = await createClient()

    // Obtener totales de pagos
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('total_amount, donation_amount, platform_amount')

    if (paymentsError) {
      console.error('Error obteniendo pagos:', paymentsError)
      return NextResponse.json(
        { error: 'Error obteniendo estadísticas' },
        { status: 500 }
      )
    }

    // Calcular totales
    const totalRecaudado = payments.reduce((sum, p) => sum + (p.total_amount || 0), 0)
    const totalDonado = payments.reduce((sum, p) => sum + (p.donation_amount || 0), 0)
    const totalPlataforma = payments.reduce((sum, p) => sum + (p.platform_amount || 0), 0)

    // Obtener número de donantes únicos
    const { data: ranking, error: rankingError } = await supabase
      .from('ranking_users')
      .select('id')

    if (rankingError) {
      console.error('Error obteniendo ranking:', rankingError)
    }

    const uniqueDonors = ranking?.length || 0
    const totalDonations = payments.length || 0
    const averageDonation = totalDonations > 0 ? totalRecaudado / totalDonations : 0

    // Obtener pagos recientes
    const { data: recentPayments, error: recentError } = await supabase
      .from('payments')
      .select('id, user_name, total_amount, donation_amount, created_at')
      .order('created_at', { ascending: false })
      .limit(20)

    if (recentError) {
      console.error('Error obteniendo pagos recientes:', recentError)
    }

    return NextResponse.json({
      totalDonations,
      totalAmount: totalRecaudado,
      totalDonated: totalDonado,
      totalPlatform: totalPlataforma,
      uniqueDonors,
      averageDonation,
      recentPayments: recentPayments || [],
    })
  } catch (error) {
    console.error('Error en /api/admin/stats:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

