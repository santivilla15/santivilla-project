// Utilidades para enviar emails (estructura básica)
// Para usar esto, necesitarás configurar un servicio de email como Resend, SendGrid, etc.

/**
 * Envía un email de confirmación de pago
 * @param to - Email del destinatario
 * @param userName - Nombre del usuario
 * @param amount - Monto donado
 * @param donationAmount - Monto que va a animales
 */
export async function sendPaymentConfirmationEmail(
  to: string,
  userName: string,
  amount: number,
  donationAmount: number
): Promise<void> {
  // TODO: Implementar con servicio de email (Resend, SendGrid, etc.)
  // Por ahora, solo logueamos
  console.log('📧 Email de confirmación:', {
    to,
    userName,
    amount,
    donationAmount,
  })

  // Ejemplo de implementación con Resend:
  /*
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY no configurada, no se enviará email')
    return
  }

  const resend = new Resend(RESEND_API_KEY)
  
  await resend.emails.send({
    from: 'Santivilla <noreply@santivilla.com>',
    to,
    subject: '¡Gracias por tu donación!',
    html: `
      <h1>¡Gracias, ${userName}!</h1>
      <p>Tu donación de ${amount}€ ha sido procesada correctamente.</p>
      <p><strong>${donationAmount}€</strong> irán directamente a refugios de animales.</p>
      <p>Puedes ver tu posición en el ranking <a href="${process.env.NEXT_PUBLIC_SITE_URL}/ranking">aquí</a>.</p>
    `,
  })
  */
}

/**
 * Envía un email cuando alguien alcanza el #1
 * @param to - Email del destinatario
 * @param userName - Nombre del usuario
 */
export async function sendTopRankEmail(to: string, userName: string): Promise<void> {
  console.log('📧 Email de #1:', { to, userName })

  // TODO: Implementar con servicio de email
}

/**
 * Envía un email de bienvenida para nuevos donantes
 * @param to - Email del destinatario
 * @param userName - Nombre del usuario
 */
export async function sendWelcomeEmail(to: string, userName: string): Promise<void> {
  console.log('📧 Email de bienvenida:', { to, userName })

  // TODO: Implementar con servicio de email
}

