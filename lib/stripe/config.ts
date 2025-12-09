// Configuración de Stripe
import Stripe from 'stripe'

// Función para obtener la instancia de Stripe
// Se inicializa solo cuando se necesita y si hay una clave configurada
export const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY
  
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY no está configurada en las variables de entorno. Por favor, revisa tu archivo .env.local')
  }
  
  if (!secretKey.startsWith('sk_')) {
    throw new Error('STRIPE_SECRET_KEY debe empezar con sk_ (sk_test_ para desarrollo, sk_live_ para producción)')
  }
  
  return new Stripe(secretKey, {
    apiVersion: '2025-11-17.clover',
  })
}

// Clave pública de Stripe para usar en el cliente
export const getStripePublicKey = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
  
  if (!key) {
    console.warn('⚠️  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY no está configurada')
  } else if (!key.startsWith('pk_')) {
    console.warn('⚠️  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY debe empezar con pk_')
  }
  
  return key
}

