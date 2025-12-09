#!/usr/bin/env node

// Script para verificar que todo está listo para producción
const fs = require('fs')
const path = require('path')

console.log('🔍 Verificando configuración para producción...\n')

let errors = []
let warnings = []

// Verificar que los archivos críticos existen
const criticalFiles = [
  'app/manifest.ts',
  'public/sw.js',
  'app/components/ServiceWorker.tsx',
  'lib/utils/email.ts',
  'app/faq/page.tsx',
]

criticalFiles.forEach((file) => {
  if (!fs.existsSync(path.join(process.cwd(), file))) {
    errors.push(`❌ Archivo faltante: ${file}`)
  } else {
    console.log(`✅ ${file}`)
  }
})

// Verificar iconos PWA (opcional pero recomendado)
const pwaIcons = ['public/icon-192.png', 'public/icon-512.png']
pwaIcons.forEach((icon) => {
  if (!fs.existsSync(path.join(process.cwd(), icon))) {
    warnings.push(`⚠️  Icono PWA faltante: ${icon} (ver PWA_ICONS_GUIDE.md)`)
  } else {
    console.log(`✅ ${icon}`)
  }
})

// Verificar que el manifest está configurado
try {
  const manifestContent = fs.readFileSync(
    path.join(process.cwd(), 'app/manifest.ts'),
    'utf8'
  )
  if (manifestContent.includes('icon-192.png') && manifestContent.includes('icon-512.png')) {
    console.log('✅ Manifest configurado correctamente')
  } else {
    warnings.push('⚠️  Manifest podría necesitar configuración')
  }
} catch (err) {
  errors.push(`❌ Error leyendo manifest.ts: ${err.message}`)
}

// Verificar que el service worker existe
try {
  const swContent = fs.readFileSync(
    path.join(process.cwd(), 'public/sw.js'),
    'utf8'
  )
  if (swContent.includes('CACHE_NAME')) {
    console.log('✅ Service Worker configurado')
  } else {
    warnings.push('⚠️  Service Worker podría necesitar configuración')
  }
} catch (err) {
  errors.push(`❌ Error leyendo sw.js: ${err.message}`)
}

// Resumen
console.log('\n' + '='.repeat(50))
console.log('📊 RESUMEN')
console.log('='.repeat(50))

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n✅ ¡Todo está configurado correctamente!')
  console.log('\n📝 Próximos pasos:')
  console.log('   1. Crear iconos PWA (ver PWA_ICONS_GUIDE.md)')
  console.log('   2. Configurar variables de entorno en producción')
  console.log('   3. Revisar PRODUCTION_CHECKLIST.md')
  process.exit(0)
} else {
  if (errors.length > 0) {
    console.log('\n❌ ERRORES CRÍTICOS:')
    errors.forEach((error) => console.log(`   ${error}`))
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  ADVERTENCIAS:')
    warnings.forEach((warning) => console.log(`   ${warning}`))
  }
  
  console.log('\n💡 Revisa los archivos mencionados y vuelve a ejecutar este script')
  process.exit(errors.length > 0 ? 1 : 0)
}

