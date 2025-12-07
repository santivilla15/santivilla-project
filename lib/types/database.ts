// Tipos TypeScript para la base de datos

// Tipo para un usuario en el ranking
export interface RankingUser {
  id: string
  name: string // Nombre público del usuario
  score: number // Puntos totales (equivalente a euros pagados)
  created_at: string // Fecha de creación
  updated_at: string // Fecha de última actualización
}

// Tipo para un pago individual
export interface Payment {
  id: string
  user_name: string // Nombre del usuario que pagó
  total_amount: number // Monto total pagado en euros
  donation_amount: number // 70% destinado a animales
  platform_amount: number // 30% destinado a la plataforma
  stripe_payment_intent_id: string | null // ID del pago en Stripe
  created_at: string // Fecha del pago
}

// Tipo para las estadísticas totales
export interface TotalStats {
  total_recaudado: number // Total recaudado históricamente
  total_donado: number // Total donado a animales (70%)
  total_plataforma: number // Total para la plataforma (30%)
}

