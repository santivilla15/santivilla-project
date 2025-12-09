// Cliente de Supabase para uso en el lado del servidor (Server Components y API Routes)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Obtener las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validar que las variables estén configuradas (solo en desarrollo para ayudar al desarrollador)
if (process.env.NODE_ENV === 'development') {
  if (!supabaseUrl) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL no está configurada. Revisa tu archivo .env.local')
  }
  if (!supabaseAnonKey) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY no está configurada. Revisa tu archivo .env.local')
  }
}

// Crear y exportar el cliente de Supabase para el servidor
export const createClient = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variables de entorno de Supabase no configuradas. Por favor, revisa tu archivo .env.local')
  }

  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Las cookies solo se pueden establecer en una Server Action o Route Handler
        }
      },
    },
  })
}

