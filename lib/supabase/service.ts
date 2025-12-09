// Cliente de Supabase con Service Role Key para operaciones privilegiadas
// SOLO usar en API routes del servidor, NUNCA exponer en el cliente
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

/**
 * Crea un cliente de Supabase con Service Role Key
 * Este cliente puede escribir directamente sin pasar por RLS
 * SOLO usar en API routes del servidor
 */
export function createServiceClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY no está configurada. Necesaria para escribir en Supabase desde el webhook.')
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

