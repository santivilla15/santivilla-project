// Sistema de logging estructurado para producción
// Reemplaza console.log/error con un sistema más robusto

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  error?: {
    name: string
    message: string
    stack?: string
  }
}

/**
 * Formatea un log entry para producción
 */
function formatLogEntry(entry: LogEntry): string {
  const base = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`
  
  if (entry.context && Object.keys(entry.context).length > 0) {
    return `${base} | Context: ${JSON.stringify(entry.context)}`
  }
  
  if (entry.error) {
    return `${base} | Error: ${entry.error.name} - ${entry.error.message}${entry.error.stack ? `\n${entry.error.stack}` : ''}`
  }
  
  return base
}

/**
 * Crea un log entry
 */
function createLogEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, any>,
  error?: Error
): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
    error: error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : undefined,
  }
}

/**
 * Logger estructurado para la aplicación
 */
export const logger = {
  /**
   * Log de debug (solo en desarrollo)
   */
  debug: (message: string, context?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      const entry = createLogEntry('debug', message, context)
      console.debug(formatLogEntry(entry))
    }
  },

  /**
   * Log de información
   */
  info: (message: string, context?: Record<string, any>) => {
    const entry = createLogEntry('info', message, context)
    console.info(formatLogEntry(entry))
    
    // En producción, podrías enviar esto a un servicio de logging
    // Ejemplo: sendToLogService(entry)
  },

  /**
   * Log de advertencia
   */
  warn: (message: string, context?: Record<string, any>, error?: Error) => {
    const entry = createLogEntry('warn', message, context, error)
    console.warn(formatLogEntry(entry))
    
    // En producción, podrías enviar esto a un servicio de logging
  },

  /**
   * Log de error
   */
  error: (message: string, error?: Error, context?: Record<string, any>) => {
    const entry = createLogEntry('error', message, context, error)
    console.error(formatLogEntry(entry))
    
    // En producción, podrías enviar esto a un servicio de error tracking (Sentry, etc.)
    // Ejemplo: Sentry.captureException(error, { extra: context })
  },
}

/**
 * Helper para logging de API routes
 */
export function logApiRequest(
  method: string,
  path: string,
  statusCode: number,
  duration?: number,
  error?: Error
) {
  const context: Record<string, any> = {
    method,
    path,
    statusCode,
  }

  if (duration !== undefined) {
    context.duration = `${duration}ms`
  }

  if (error) {
    logger.error(`API ${method} ${path} failed`, error, context)
  } else if (statusCode >= 400) {
    logger.warn(`API ${method} ${path} returned ${statusCode}`, context)
  } else {
    logger.info(`API ${method} ${path} completed`, context)
  }
}

/**
 * Helper para logging de operaciones de base de datos
 */
export function logDatabaseOperation(
  operation: string,
  table: string,
  success: boolean,
  error?: Error,
  context?: Record<string, any>
) {
  const fullContext = {
    operation,
    table,
    ...context,
  }

  if (error || !success) {
    logger.error(`Database operation failed: ${operation} on ${table}`, error, fullContext)
  } else {
    logger.debug(`Database operation: ${operation} on ${table}`, fullContext)
  }
}

