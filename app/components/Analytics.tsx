// Componente para Google Analytics 4 (GA4)
'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Componente interno que usa usePathname
 */
function AnalyticsContent() {
  const pathname = usePathname()
  
  // Obtener el ID de GA
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // Rastrear cambios de página
  useEffect(() => {
    if (!gaId || typeof window === 'undefined') return

    // Usar window.location para obtener search params sin useSearchParams
    const url = pathname + (typeof window !== 'undefined' && window.location.search ? window.location.search : '')

    // Enviar evento de vista de página a GA4
    if (window.gtag) {
      window.gtag('config', gaId, {
        page_path: url,
      })
    }
  }, [pathname, gaId])

  // Si no hay ID configurado, no renderizar nada
  if (!gaId) {
    return null
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Componente wrapper para Analytics
 */
export default function Analytics() {
  return <AnalyticsContent />
}

// Extender el tipo Window para incluir gtag
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

/**
 * Función helper para rastrear eventos personalizados
 * @param eventName - Nombre del evento
 * @param eventParams - Parámetros adicionales del evento
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }
  
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (!gaId) {
    return
  }

  window.gtag('event', eventName, eventParams)
}

/**
 * Función helper para rastrear conversiones (pagos completados)
 * @param value - Valor del pago en euros
 * @param currency - Moneda (por defecto EUR)
 * @param transactionId - ID de la transacción
 */
export function trackPurchase(value: number, currency = 'EUR', transactionId?: string) {
  trackEvent('purchase', {
    value,
    currency,
    transaction_id: transactionId,
  })
}

/**
 * Función helper para rastrear inicio de checkout
 * @param value - Valor del pago en euros
 */
export function trackBeginCheckout(value: number) {
  trackEvent('begin_checkout', {
    value,
    currency: 'EUR',
  })
}

/**
 * Función helper para rastrear cancelaciones de checkout
 */
export function trackCheckoutCancelled() {
  trackEvent('checkout_cancelled')
}
