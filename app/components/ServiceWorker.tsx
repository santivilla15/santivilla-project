// Componente para registrar el Service Worker
'use client'

import { useEffect } from 'react'

export default function ServiceWorker() {
  useEffect(() => {
    // Solo registrar en el cliente y si el navegador lo soporta
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registrado:', registration.scope)
        })
        .catch((error) => {
          console.warn('⚠️ Error registrando Service Worker:', error)
        })
    }
  }, [])

  return null // Este componente no renderiza nada
}

