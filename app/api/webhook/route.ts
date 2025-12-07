// Webhook de Stripe para procesar pagos completados
// Este endpoint recibe notificaciones de Stripe cuando un pago se completa
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/config'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    // Leer el cuerpo de la petición como texto (Stripe necesita verificar la firma)
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No se encontró la firma de Stripe' },
        { status: 400 }
      )
    }

    // Obtener la instancia de Stripe
    const stripe = getStripe()
    
    // Verificar la firma del webhook usando el secreto
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event

    try {
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      } else {
        // En desarrollo, podemos parsear el evento sin verificar la firma
        // PERO en producción SIEMPRE debes usar el webhook secret
        event = JSON.parse(body) as Stripe.Event
      }
    } catch (err: unknown) {
      console.error('Error verificando webhook:', err)
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      return NextResponse.json(
        { error: `Error de webhook: ${errorMessage}` },
        { status: 400 }
      )
    }

    // Procesar el evento según su tipo
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      // Obtener los metadatos del pago
      const userName = session.metadata?.user_name
      const amount = parseFloat(session.metadata?.amount || '0')
      const donationAmount = parseFloat(session.metadata?.donation_amount || '0')
      const platformAmount = parseFloat(session.metadata?.platform_amount || '0')
      const fixedFee = parseFloat(session.metadata?.fixed_fee || '0')
      const variableFee = parseFloat(session.metadata?.variable_fee || '0')

      if (!userName || !amount) {
        console.error('Metadatos faltantes en la sesión de checkout')
        return NextResponse.json({ error: 'Metadatos faltantes' }, { status: 400 })
      }

      // Crear el cliente de Supabase
      const supabase = await createClient()

      // 1. Registrar el pago en la tabla payments
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_name: userName,
          total_amount: amount,
          donation_amount: donationAmount,
          platform_amount: platformAmount,
          fixed_fee: fixedFee || 1.50, // Fallback por si no está en metadata
          variable_fee: variableFee || 0,
          stripe_payment_intent_id: session.payment_intent as string,
        })

      if (paymentError) {
        console.error('Error guardando pago:', paymentError)
        return NextResponse.json(
          { error: 'Error guardando pago' },
          { status: 500 }
        )
      }

      // 2. Actualizar o crear el usuario en el ranking
      // Primero buscar si el usuario ya existe
      const { data: existingUser, error: fetchError } = await supabase
        .from('ranking_users')
        .select('*')
        .eq('name', userName)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 significa "no encontrado", lo cual está bien si es un usuario nuevo
        console.error('Error buscando usuario:', fetchError)
        return NextResponse.json(
          { error: 'Error buscando usuario' },
          { status: 500 }
        )
      }

      if (existingUser) {
        // Usuario existe: actualizar su score sumando el nuevo monto
        const newScore = parseFloat(existingUser.score) + amount

        const { error: updateError } = await supabase
          .from('ranking_users')
          .update({ score: newScore })
          .eq('id', existingUser.id)

        if (updateError) {
          console.error('Error actualizando score:', updateError)
          return NextResponse.json(
            { error: 'Error actualizando score' },
            { status: 500 }
          )
        }
      } else {
        // Usuario nuevo: crear entrada en el ranking
        const { error: insertError } = await supabase
          .from('ranking_users')
          .insert({
            name: userName,
            score: amount,
          })

        if (insertError) {
          console.error('Error creando usuario:', insertError)
          return NextResponse.json(
            { error: 'Error creando usuario' },
            { status: 500 }
          )
        }
      }

      return NextResponse.json({ received: true })
    }

    // Si es otro tipo de evento, simplemente confirmamos que lo recibimos
    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    console.error('Error procesando webhook:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json(
      { error: 'Error procesando webhook', details: errorMessage },
      { status: 500 }
    )
  }
}

