// Cliente de Supabase para uso en el lado del cliente (browser)
import { createBrowserClient } from '@supabase/ssr'

// Obtener las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Crear y exportar el cliente de Supabase para el navegador
export const createClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

