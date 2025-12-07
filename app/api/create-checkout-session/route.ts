// API Route para crear una sesión de pago con Stripe Checkout
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/config'
import { calculateCommissions } from '@/lib/utils/commission'

export async function POST(request: NextRequest) {
  try {
    // Leer el cuerpo de la petición
    const body = await request.json()
    const { name, amount } = body

    // Validar que se proporcionaron los datos necesarios
    if (!name || !amount || amount < 1) {
      return NextResponse.json(
        { error: 'Nombre y monto válido son requeridos' },
        { status: 400 }
      )
    }

    // Convertir el monto a céntimos (Stripe usa céntimos)
    const amountInCents = Math.round(amount * 100)

    // Calcular las comisiones según el nuevo modelo
    const commission = calculateCommissions(amount)

    // Obtener la instancia de Stripe
    const stripe = getStripe()

    // Crear la sesión de checkout de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Boost en el ranking de Santivilla`,
              description: `${amount.toFixed(2)}€ para subir en el ranking. El ~95% va a refugios de animales.`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin') || 'http://localhost:3000'}/ranking?success=true`,
      cancel_url: `${request.headers.get('origin') || 'http://localhost:3000'}/?canceled=true`,
      metadata: {
        user_name: name,
        amount: amount.toString(),
        donation_amount: commission.donationAmount.toString(),
        platform_amount: commission.totalPlatformFee.toString(),
        fixed_fee: commission.fixedFee.toString(),
        variable_fee: commission.variableFee.toString(),
      },
    })

    // Retornar la URL de checkout
    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })
  } catch (error: unknown) {
    console.error('Error creando sesión de checkout:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json(
      { error: 'Error al crear la sesión de pago', details: errorMessage },
      { status: 500 }
    )
  }
}

