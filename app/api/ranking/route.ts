// API Route para obtener el ranking de usuarios
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    // Crear el cliente de Supabase
    const supabase = await createClient()

    // Obtener todos los usuarios ordenados por score descendente
    // Limitar a los primeros 100 como se especificó
    const { data, error } = await supabase
      .from('ranking_users')
      .select('*')
      .order('score', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Error obteniendo ranking:', error)
      return NextResponse.json(
        { error: 'Error al obtener el ranking' },
        { status: 500 }
      )
    }

    // Convertir los datos a números para asegurar que score sea numérico
    const ranking = (data || []).map((user, index) => ({
      rank: index + 1,
      name: user.name,
      score: parseFloat(user.score),
      id: user.id,
    }))

    return NextResponse.json({ ranking })
  } catch (error: unknown) {
    console.error('Error en API ranking:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json(
      { error: 'Error al obtener el ranking', details: errorMessage },
      { status: 500 }
    )
  }
}

