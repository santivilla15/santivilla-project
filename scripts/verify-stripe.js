#!/usr/bin/env node

/**
 * Script para verificar la configuración de Stripe
 * Ejecuta: npm run verify:stripe
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Verificando configuración de Stripe...\n')

// Verificar que existe .env.local
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.error('❌ Error: No se encontró el archivo .env.local')
  console.log('\n📝 Crea el archivo .env.local y agrega:')
  console.log('   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...')
  console.log('   STRIPE_SECRET_KEY=sk_test_...')
  console.log('   STRIPE_WEBHOOK_SECRET=whsec_... (opcional en desarrollo)')
  process.exit(1)
}

// Leer .env.local
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}

envContent.split('\n').forEach(line => {
  const trimmed = line.trim()
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=')
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim()
    }
  }
})

let hasErrors = false

// Verificar NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
console.log('1️⃣ Verificando NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY...')
if (!envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.error('   ❌ No está configurada')
  hasErrors = true
} else if (!envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_')) {
  console.error('   ❌ Debe empezar con pk_ (pk_test_ para desarrollo, pk_live_ para producción)')
  hasErrors = true
} else {
  const isTest = envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_')
  console.log(`   ✅ Configurada correctamente (${isTest ? 'Modo Test' : 'Modo Live'})`)
  console.log(`   📋 Valor: ${envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 20)}...`)
}

// Verificar STRIPE_SECRET_KEY
console.log('\n2️⃣ Verificando STRIPE_SECRET_KEY...')
if (!envVars.STRIPE_SECRET_KEY) {
  console.error('   ❌ No está configurada')
  hasErrors = true
} else if (!envVars.STRIPE_SECRET_KEY.startsWith('sk_')) {
  console.error('   ❌ Debe empezar con sk_ (sk_test_ para desarrollo, sk_live_ para producción)')
  hasErrors = true
} else {
  const isTest = envVars.STRIPE_SECRET_KEY.startsWith('sk_test_')
  console.log(`   ✅ Configurada correctamente (${isTest ? 'Modo Test' : 'Modo Live'})`)
  console.log(`   📋 Valor: ${envVars.STRIPE_SECRET_KEY.substring(0, 20)}...`)
  
  // Verificar que ambas claves sean del mismo modo
  const pubIsTest = envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_test_')
  if (pubIsTest !== isTest) {
    console.warn('   ⚠️  Advertencia: Las claves pública y secreta deben ser del mismo modo (test o live)')
  }
}

// Verificar STRIPE_WEBHOOK_SECRET (opcional)
console.log('\n3️⃣ Verificando STRIPE_WEBHOOK_SECRET...')
if (!envVars.STRIPE_WEBHOOK_SECRET) {
  console.warn('   ⚠️  No está configurada (opcional en desarrollo)')
  console.log('   💡 En desarrollo, usa Stripe CLI: stripe listen --forward-to localhost:3000/api/webhook')
  console.log('   💡 En producción, configúralo desde el Dashboard de Stripe')
} else if (!envVars.STRIPE_WEBHOOK_SECRET.startsWith('whsec_')) {
  console.error('   ❌ Debe empezar con whsec_')
  hasErrors = true
} else {
  console.log('   ✅ Configurada correctamente')
  console.log(`   📋 Valor: ${envVars.STRIPE_WEBHOOK_SECRET.substring(0, 20)}...`)
}

// Resumen
console.log('\n' + '='.repeat(50))
if (hasErrors) {
  console.error('❌ Hay errores en la configuración. Por favor, corrígelos antes de continuar.')
  console.log('\n📚 Consulta STRIPE_SETUP.md para más información.')
  process.exit(1)
} else {
  console.log('✅ Configuración de Stripe verificada correctamente!')
  console.log('\n📝 Próximos pasos:')
  console.log('   1. Reinicia el servidor: npm run dev')
  console.log('   2. Prueba un pago con la tarjeta de test: 4242 4242 4242 4242')
  console.log('   3. Verifica que el webhook funcione (en desarrollo, usa Stripe CLI)')
  console.log('\n📚 Consulta STRIPE_SETUP.md para más detalles.')
}

