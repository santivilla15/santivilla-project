// Webhook de Stripe para procesar pagos completados
// Este endpoint recibe notificaciones de Stripe cuando un pago se completa
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/config'
import { createServiceClient } from '@/lib/supabase/service'
import { sanitizeName } from '@/lib/utils/sanitize'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  console.log('🔔 Webhook recibido - Iniciando procesamiento...')
  try {
    // Leer el cuerpo de la petición como texto (Stripe necesita verificar la firma)
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    console.log('📋 Headers recibidos:', {
      hasSignature: !!signature,
      contentType: request.headers.get('content-type'),
    })

    if (!signature) {
      console.error('❌ No se encontró la firma de Stripe')
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
    console.log('📦 Tipo de evento:', event.type)
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('✅ Evento checkout.session.completed recibido')
      console.log('💰 Estado del pago:', session.payment_status)
      console.log('📝 Metadatos:', session.metadata)

      // Verificar que el pago fue exitoso
      if (session.payment_status !== 'paid') {
        console.warn('⚠️  Pago no completado, estado:', session.payment_status)
        return NextResponse.json({ received: true, message: 'Pago no completado' })
      }

      // Obtener los metadatos del pago
      const userName = session.metadata?.user_name?.trim()
      const amountStr = session.metadata?.amount
      const donationAmountStr = session.metadata?.donation_amount
      const platformAmountStr = session.metadata?.platform_amount
      const fixedFeeStr = session.metadata?.fixed_fee
      const variableFeeStr = session.metadata?.variable_fee

      // Validar que todos los metadatos necesarios estén presentes
      if (!userName || !amountStr) {
        console.error('Metadatos faltantes en la sesión de checkout:', {
          userName: !!userName,
          amount: !!amountStr,
        })
        return NextResponse.json({ error: 'Metadatos faltantes' }, { status: 400 })
      }

      // Validar y parsear los montos
      const amount = parseFloat(amountStr)
      const donationAmount = parseFloat(donationAmountStr || '0')
      const platformAmount = parseFloat(platformAmountStr || '0')
      const fixedFee = parseFloat(fixedFeeStr || '1.50')
      const variableFee = parseFloat(variableFeeStr || '0')

      // Validar que los montos sean números válidos y positivos
      if (isNaN(amount) || amount <= 0 || amount > 10000) {
        console.error('Monto inválido en metadatos:', amount)
        return NextResponse.json({ error: 'Monto inválido' }, { status: 400 })
      }

      // Validar que el nombre tenga longitud válida
      if (userName.length < 2 || userName.length > 50) {
        console.error('Nombre inválido en metadatos:', userName)
        return NextResponse.json({ error: 'Nombre inválido' }, { status: 400 })
      }

      // Sanitizar el nombre antes de guardarlo (doble protección)
      const sanitizedName = sanitizeName(userName)
      if (sanitizedName.length < 2) {
        console.error('Nombre no válido después de sanitización:', userName)
        return NextResponse.json({ error: 'Nombre inválido' }, { status: 400 })
      }

      // Crear el cliente de Supabase con Service Role Key para escribir directamente
      // Esto permite escribir sin pasar por RLS (Row Level Security)
      console.log('🔐 Creando cliente de Supabase con Service Role Key...')
      let supabase
      try {
        supabase = createServiceClient()
        console.log('✅ Cliente de Supabase creado')
      } catch (error) {
        console.error('❌ Error creando cliente de Supabase:', error)
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
        return NextResponse.json(
          { error: 'Error de configuración de Supabase', details: errorMessage },
          { status: 500 }
        )
      }

      // 1. Registrar el pago en la tabla payments
      console.log('💾 Guardando pago en la tabla payments...', {
        user_name: sanitizedName,
        total_amount: amount,
        donation_amount: donationAmount,
      })
      
      const { error: paymentError, data: paymentData } = await supabase
        .from('payments')
        .insert({
          user_name: sanitizedName, // Usar nombre sanitizado
          total_amount: amount,
          donation_amount: donationAmount,
          platform_amount: platformAmount,
          fixed_fee: fixedFee || 1.50, // Fallback por si no está en metadata
          variable_fee: variableFee || 0,
          stripe_payment_intent_id: session.payment_intent as string,
        })
        .select()

      if (paymentError) {
        console.error('❌ Error guardando pago:', paymentError)
        console.error('📋 Detalles del error:', JSON.stringify(paymentError, null, 2))
        return NextResponse.json(
          { error: 'Error guardando pago', details: paymentError.message },
          { status: 500 }
        )
      }
      
      console.log('✅ Pago guardado correctamente:', paymentData)

      // 2. Actualizar o crear el usuario en el ranking
      // Primero buscar si el usuario ya existe (usar nombre sanitizado)
      console.log('🔍 Buscando usuario en el ranking:', sanitizedName)
      const { data: existingUser, error: fetchError } = await supabase
        .from('ranking_users')
        .select('*')
        .eq('name', sanitizedName)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 significa "no encontrado", lo cual está bien si es un usuario nuevo
        console.error('❌ Error buscando usuario:', fetchError)
        console.error('📋 Código de error:', fetchError.code)
        return NextResponse.json(
          { error: 'Error buscando usuario', details: fetchError.message },
          { status: 500 }
        )
      }

      if (existingUser) {
        // Usuario existe: actualizar su score sumando el nuevo monto
        console.log('👤 Usuario existente encontrado:', existingUser.name, 'Score actual:', existingUser.score)
        const currentScore = parseFloat(existingUser.score.toString())
        const newScore = currentScore + amount

        // Validar que el nuevo score sea válido
        if (isNaN(newScore) || !isFinite(newScore) || newScore < 0) {
          console.error('❌ Score inválido calculado:', newScore)
          return NextResponse.json(
            { error: 'Error calculando score' },
            { status: 500 }
          )
        }

        console.log('📈 Actualizando score:', currentScore, '→', newScore)
        const { error: updateError, data: updateData } = await supabase
          .from('ranking_users')
          .update({ score: newScore })
          .eq('id', existingUser.id)
          .select()

        if (updateError) {
          console.error('❌ Error actualizando score:', updateError)
          console.error('📋 Detalles:', JSON.stringify(updateError, null, 2))
          return NextResponse.json(
            { error: 'Error actualizando score', details: updateError.message },
            { status: 500 }
          )
        }
        
        console.log('✅ Score actualizado correctamente:', updateData)
      } else {
        // Usuario nuevo: crear entrada en el ranking
        console.log('🆕 Usuario nuevo, creando entrada en el ranking...')
        // Validar que el score inicial sea válido
        if (isNaN(amount) || amount <= 0) {
          console.error('❌ Monto inválido para crear usuario:', amount)
          return NextResponse.json(
            { error: 'Monto inválido' },
            { status: 400 }
          )
        }

        const { error: insertError, data: insertData } = await supabase
          .from('ranking_users')
          .insert({
            name: sanitizedName, // Usar nombre sanitizado
            score: amount,
          })
          .select()

        if (insertError) {
          console.error('❌ Error creando usuario:', insertError)
          console.error('📋 Detalles:', JSON.stringify(insertError, null, 2))
          return NextResponse.json(
            { error: 'Error creando usuario', details: insertError.message },
            { status: 500 }
          )
        }
        
        console.log('✅ Usuario creado correctamente:', insertData)
      }

      console.log('🎉 Webhook procesado exitosamente')
      return NextResponse.json({ received: true, success: true })
    }

    // Si es otro tipo de evento, simplemente confirmamos que lo recibimos
    console.log('ℹ️  Evento recibido pero no procesado:', event.type)
    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    console.error('❌ Error procesando webhook:', error)
    if (error instanceof Error) {
      console.error('📋 Stack trace:', error.stack)
      console.error('📋 Mensaje:', error.message)
    }
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json(
      { error: 'Error procesando webhook', details: errorMessage },
      { status: 500 }
    )
  }
}

