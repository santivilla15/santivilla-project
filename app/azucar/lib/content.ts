// Contenido estático de la app: hitos de salud, logros, consejos y motivación.
// Nota: información educativa general, no es consejo médico.

import { AppState, cravingsResisted, currentStreak } from './types'

export interface HealthMilestone {
  day: number
  emoji: string
  title: string
  body: string
}

/** Línea de tiempo de recuperación al dejar el azúcar añadido */
export const HEALTH_MILESTONES: HealthMilestone[] = [
  {
    day: 0,
    emoji: '🌱',
    title: 'Has empezado',
    body: 'La decisión más difícil ya está tomada. Tu cuerpo empieza a estabilizar el azúcar en sangre.',
  },
  {
    day: 1,
    emoji: '💧',
    title: 'Primer día',
    body: 'Puede que notes antojos o ganas de algo dulce. Es normal: tu cerebro está pidiendo su recompensa habitual. Beber agua ayuda.',
  },
  {
    day: 3,
    emoji: '🌊',
    title: 'El pico (día 2-3)',
    body: 'Aquí suelen aparecer los antojos más fuertes, algo de cansancio o dolor de cabeza. Es la fase más dura y también la más corta. Si pasas de aquí, lo tienes.',
  },
  {
    day: 7,
    emoji: '👅',
    title: 'Una semana',
    body: 'Tu paladar se reajusta: la fruta empieza a saber más dulce y los antojos se vuelven más débiles. Más energía estable durante el día.',
  },
  {
    day: 14,
    emoji: '😌',
    title: 'Dos semanas',
    body: 'Menos hinchazón y un ánimo más estable, sin los altibajos del subidón y bajón de azúcar. Dormir suele mejorar.',
  },
  {
    day: 30,
    emoji: '✨',
    title: 'Un mes',
    body: 'Piel más clara, mejor concentración y antojos mucho más manejables. El hábito nuevo empieza a sentirse natural.',
  },
  {
    day: 60,
    emoji: '🧠',
    title: 'Dos meses',
    body: 'Tu cerebro ha recableado buena parte de la rutina de recompensa. Ya no piensas en el azúcar todo el tiempo.',
  },
  {
    day: 90,
    emoji: '🏔️',
    title: 'Tres meses',
    body: 'Nuevo punto de partida. Tu paladar está reseteado y el dulce procesado puede llegar a saber empalagoso. Esto ya es tu normalidad.',
  },
]

/** Devuelve el próximo hito aún no alcanzado (o el último si ya pasó 90 días) */
export function nextMilestone(days: number): HealthMilestone {
  return (
    HEALTH_MILESTONES.find((m) => m.day > days) ??
    HEALTH_MILESTONES[HEALTH_MILESTONES.length - 1]
  )
}

/** Hito actual alcanzado */
export function currentMilestone(days: number): HealthMilestone {
  let current = HEALTH_MILESTONES[0]
  for (const m of HEALTH_MILESTONES) {
    if (days >= m.day) current = m
  }
  return current
}

// ---------- Logros ----------

export interface Achievement {
  id: string
  emoji: string
  title: string
  description: string
  /** Devuelve true si el logro está desbloqueado dado el estado actual */
  unlocked: (s: AppState) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'day1',
    emoji: '🌱',
    title: 'Primer día',
    description: 'Completaste tu primer día sin azúcar.',
    unlocked: (s) => currentStreak(s) >= 1 || s.longestStreak >= 1,
  },
  {
    id: 'day3',
    emoji: '🌊',
    title: 'Superaste el pico',
    description: '3 días: pasaste la parte más dura.',
    unlocked: (s) => currentStreak(s) >= 3 || s.longestStreak >= 3,
  },
  {
    id: 'week1',
    emoji: '🔥',
    title: 'Una semana',
    description: '7 días seguidos sin azúcar.',
    unlocked: (s) => currentStreak(s) >= 7 || s.longestStreak >= 7,
  },
  {
    id: 'week2',
    emoji: '⚡',
    title: 'Dos semanas',
    description: '14 días. Esto ya es una racha seria.',
    unlocked: (s) => currentStreak(s) >= 14 || s.longestStreak >= 14,
  },
  {
    id: 'month1',
    emoji: '✨',
    title: 'Un mes',
    description: '30 días. Tu cuerpo te lo agradece.',
    unlocked: (s) => currentStreak(s) >= 30 || s.longestStreak >= 30,
  },
  {
    id: 'day90',
    emoji: '🏔️',
    title: 'Tres meses',
    description: '90 días. Nueva normalidad conseguida.',
    unlocked: (s) => currentStreak(s) >= 90 || s.longestStreak >= 90,
  },
  {
    id: 'craving1',
    emoji: '🛡️',
    title: 'Primer antojo vencido',
    description: 'Resististe tu primer antojo con la app.',
    unlocked: (s) => cravingsResisted(s) >= 1,
  },
  {
    id: 'craving10',
    emoji: '🥷',
    title: 'Cazador de antojos',
    description: 'Resististe 10 antojos.',
    unlocked: (s) => cravingsResisted(s) >= 10,
  },
  {
    id: 'craving50',
    emoji: '👑',
    title: 'Maestro del autocontrol',
    description: 'Resististe 50 antojos.',
    unlocked: (s) => cravingsResisted(s) >= 50,
  },
]

// ---------- Antojos: distracciones y disparadores ----------

/** Ideas rápidas para distraerse mientras pasa el antojo */
export const DISTRACTIONS: string[] = [
  'Bebe un vaso grande de agua lentamente.',
  'Sal a caminar 5 minutos, aunque sea por casa.',
  'Lávate los dientes: el sabor a menta corta el antojo.',
  'Come algo con proteína o grasa buena: un puñado de nueces, un huevo, yogur natural.',
  'Toma una infusión o un café sin azúcar.',
  'Haz 20 sentadillas o estírate un minuto.',
  'Llama o escribe a alguien de confianza.',
  'Prueba fruta entera si necesitas algo dulce de verdad.',
  'Respira hondo y espera 10 minutos: la mayoría de antojos se desvanecen solos.',
  'Mastica chicle sin azúcar.',
]

/** Disparadores típicos de antojo para registrar */
export const TRIGGERS: string[] = [
  'Estrés',
  'Aburrimiento',
  'Cansancio',
  'Después de comer',
  'Costumbre',
  'Social / fiesta',
  'Tristeza',
  'Otro',
]

// ---------- Consejos / Aprende ----------

export interface Tip {
  emoji: string
  title: string
  body: string
}

export const TIPS: Tip[] = [
  {
    emoji: '🧠',
    title: '¿Por qué cuesta tanto?',
    body: 'El azúcar activa el sistema de recompensa del cerebro (dopamina) de forma parecida a otras sustancias adictivas. Por eso buscas "premio dulce" sin pensar. No es falta de fuerza de voluntad: es biología. La buena noticia es que ese circuito se reajusta en semanas.',
  },
  {
    emoji: '🍎',
    title: 'Cambios inteligentes',
    body: 'En vez de eliminar de golpe el placer, sustitúyelo: fruta entera en lugar de bollería, chocolate negro (85%+) en vez de chocolate con leche, yogur natural con canela, agua con gas y limón en lugar de refresco.',
  },
  {
    emoji: '🏷️',
    title: 'Lee las etiquetas',
    body: 'El azúcar se esconde con muchos nombres: jarabe de glucosa, dextrosa, maltosa, concentrado de fruta, sirope de maíz. Salsas, panes y "alimentos saludables" suelen llevar más del que crees. Mira los gramos de azúcar por 100 g.',
  },
  {
    emoji: '🍽️',
    title: 'No vayas con hambre',
    body: 'El hambre intensa dispara los antojos de azúcar. Come comidas completas con proteína, fibra y grasa buena. Si tu cuerpo está saciado, el antojo pierde fuerza.',
  },
  {
    emoji: '😴',
    title: 'Duerme y baja el estrés',
    body: 'Dormir poco y el estrés crónico aumentan el deseo de azúcar al día siguiente. Cuidar el sueño es una de las formas más eficaces de reducir antojos sin esfuerzo.',
  },
  {
    emoji: '🤝',
    title: 'Una recaída no es el final',
    body: 'Si un día caes, no tires la toalla. Un desliz es un dato, no un fracaso. Lo que importa es la tendencia de semanas y meses, no un día suelto. Vuelve al plan en la siguiente comida.',
  },
  {
    emoji: '🏠',
    title: 'Cambia el entorno',
    body: 'Es mucho más fácil no comer azúcar si no está en casa. Saca los dulces de la vista, no compres "por si acaso" y ten a mano alternativas saludables listas para picar.',
  },
  {
    emoji: '⏱️',
    title: 'La regla de los 10 minutos',
    body: 'Un antojo es una ola: sube, llega a un pico y baja. Casi ninguno dura más de 10-15 minutos. Si te distraes y dejas pasar ese rato, lo más probable es que se vaya solo.',
  },
]

/** Frases de ánimo que rotan en la pantalla de inicio */
export const ENCOURAGEMENTS: string[] = [
  'Un día a la vez. Solo tienes que ganar el día de hoy.',
  'Cada antojo que dejas pasar te hace más fuerte.',
  'No tienes que ser perfecto, solo constante.',
  'Tu yo del futuro te lo va a agradecer.',
  'El antojo es temporal. El orgullo de resistirlo, no.',
  'Estás reconstruyendo tu relación con la comida.',
  'Lo difícil de hoy es lo normal de mañana.',
  'No es una dieta, es libertad.',
]

/** Sugerencias de motivos durante el onboarding */
export const REASON_SUGGESTIONS: string[] = [
  'Tener más energía',
  'Perder peso',
  'Mejorar mi piel',
  'Dormir mejor',
  'Cuidar mi salud a largo plazo',
  'Dejar de depender del dulce',
  'Mejorar mi concentración',
  'Sentirme mejor conmigo mismo/a',
  'Reducir el riesgo de diabetes',
  'Ahorrar dinero',
]
