// API Route para crear una sesión de pago con Stripe Checkout
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/config'
import { calculateCommissions } from '@/lib/utils/commission'
import { checkRateLimit, getClientIP } from '@/lib/utils/rate-limit'
import { sanitizeName } from '@/lib/utils/sanitize'
import { logger, logApiRequest } from '@/lib/utils/logger'

// Traducciones para mensajes de error y textos de Stripe
const translations = {
  es: {
    errors: {
      nameAndAmountRequired: 'Nombre y monto son requeridos',
      invalidAmount: 'El monto debe ser un número válido',
      amountRange: 'El monto debe estar entre 1€ y 10,000€',
      invalidName: 'El nombre debe tener entre 2 y 50 caracteres',
      invalidConverted: 'El monto convertido no es válido',
      paymentError: 'Error al crear la sesión de pago',
      unknownError: 'Error desconocido',
    },
    stripe: {
      productName: 'Boost en el ranking de Santivilla',
      productDescription: (amount: number) => `${amount.toFixed(2)}€ para subir en el ranking. El ~95% va a refugios de animales.`,
    },
  },
  en: {
    errors: {
      nameAndAmountRequired: 'Name and amount are required',
      invalidAmount: 'Amount must be a valid number',
      amountRange: 'Amount must be between €1 and €10,000',
      invalidName: 'Name must be between 2 and 50 characters',
      invalidConverted: 'Converted amount is not valid',
      paymentError: 'Error creating payment session',
      unknownError: 'Unknown error',
    },
    stripe: {
      productName: 'Boost in Santivilla ranking',
      productDescription: (amount: number) => `${amount.toFixed(2)}€ to climb the ranking. ~95% goes to animal shelters.`,
    },
  },
  de: {
    errors: {
      nameAndAmountRequired: 'Name und Betrag sind erforderlich',
      invalidAmount: 'Der Betrag muss eine gültige Zahl sein',
      amountRange: 'Der Betrag muss zwischen 1€ und 10.000€ liegen',
      invalidName: 'Der Name muss zwischen 2 und 50 Zeichen lang sein',
      invalidConverted: 'Der umgerechnete Betrag ist nicht gültig',
      paymentError: 'Fehler beim Erstellen der Zahlungssitzung',
      unknownError: 'Unbekannter Fehler',
    },
    stripe: {
      productName: 'Boost im Santivilla-Ranking',
      productDescription: (amount: number) => `${amount.toFixed(2)}€ um im Ranking aufzusteigen. ~95% gehen an Tierheime.`,
    },
  },
}

export async function POST(request: NextRequest) {
  // Rate limiting: máximo 10 requests por minuto por IP
  const clientIP = getClientIP(request)
  const rateLimit = checkRateLimit(clientIP, {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 10, // 10 requests máximo
  })

  if (!rateLimit.allowed) {
    const t = translations['es'] // Usar español por defecto para errores de rate limit
    return NextResponse.json(
      { 
        error: t.errors.paymentError,
        message: 'Demasiadas solicitudes. Por favor, intenta de nuevo en un momento.',
      },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        },
      }
    )
  }

  // Leer el cuerpo de la petición una sola vez
  let body: { name?: string; amount?: number; lang?: string } = {}
  let validLang = 'es'
  
  try {
    body = await request.json()
    const { name, amount, lang = 'es' } = body
    
    // Validar que lang sea válido
    validLang = (lang === 'en' || lang === 'de') ? lang : 'es'
    const t = translations[validLang as 'es' | 'en' | 'de']

    // Validar que se proporcionaron los datos necesarios
    if (!name || amount === undefined || amount === null) {
      return NextResponse.json(
        { error: t.errors.nameAndAmountRequired },
        { status: 400 }
      )
    }

    // Validar que el monto sea un número válido
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
    if (isNaN(numericAmount) || !isFinite(numericAmount)) {
      return NextResponse.json(
        { error: t.errors.invalidAmount },
        { status: 400 }
      )
    }

    // Validar límites de monto (mínimo 1€, máximo 10,000€)
    if (numericAmount < 1 || numericAmount > 10000) {
      return NextResponse.json(
        { error: t.errors.amountRange },
        { status: 400 }
      )
    }

    // Validar que el nombre sea una cadena y tenga longitud válida
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
      return NextResponse.json(
        { error: t.errors.invalidName },
        { status: 400 }
      )
    }

    // Sanitizar el nombre para prevenir XSS
    const sanitizedName = sanitizeName(name)
    if (sanitizedName.length < 2) {
      return NextResponse.json(
        { error: t.errors.invalidName },
        { status: 400 }
      )
    }

    // Convertir el monto a céntimos (Stripe usa céntimos)
    // Usar el monto validado numéricamente
    const amountInCents = Math.round(numericAmount * 100)
    
    // Validar que el monto en céntimos sea válido (mínimo 100 céntimos = 1€)
    if (amountInCents < 100 || amountInCents > 1000000) {
      return NextResponse.json(
        { error: t.errors.invalidConverted },
        { status: 400 }
      )
    }

    // Calcular las comisiones según el nuevo modelo
    const commission = calculateCommissions(numericAmount)

    // Obtener la instancia de Stripe
    const stripe = getStripe()

    // Determinar las URLs de éxito y cancelación según el idioma
    const origin = request.headers.get('origin') || 'http://localhost:3000'
    const rankingPath = validLang === 'es' ? '/ranking' : `/${validLang}/ranking`
    const homePath = validLang === 'es' ? '/' : `/${validLang}`
    const successUrl = `${origin}${rankingPath}?success=true`
    const cancelUrl = `${origin}${homePath}?canceled=true`

    // Crear la sesión de checkout de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: t.stripe.productName,
              description: t.stripe.productDescription(numericAmount),
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_name: sanitizedName, // Usar nombre sanitizado
        amount: numericAmount.toString(),
        donation_amount: commission.donationAmount.toFixed(2),
        platform_amount: commission.totalPlatformFee.toFixed(2),
        fixed_fee: commission.fixedFee.toFixed(2),
        variable_fee: commission.variableFee.toFixed(2),
        lang: validLang, // Guardar el idioma en los metadatos
      },
    })

    // Log de éxito
    logger.info('Checkout session created', {
      sessionId: session.id,
      amount: numericAmount,
      lang: validLang,
      ip: clientIP,
    })

    // Retornar la URL de checkout con headers de rate limit
    const response = NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    }, {
      headers: {
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
      },
    })

    logApiRequest('POST', '/api/create-checkout-session', 200)
    return response
  } catch (error: unknown) {
    // Usar el idioma que se leyó del body (o español por defecto)
    const errorLang = validLang as 'es' | 'en' | 'de'
    const t = translations[errorLang]
    const errorMessage = error instanceof Error ? error.message : t.errors.unknownError
    
    // Log del error usando el logger estructurado
    logger.error('Error creating checkout session', error instanceof Error ? error : undefined, {
      lang: errorLang,
      ip: clientIP,
    })
    
    logApiRequest('POST', '/api/create-checkout-session', 500, undefined, error instanceof Error ? error : undefined)
    
    return NextResponse.json(
      { error: t.errors.paymentError, details: errorMessage },
      { status: 500 }
    )
  }
}

