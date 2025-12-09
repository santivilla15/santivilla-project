// Página de Preguntas Frecuentes (FAQ)
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

// Traducciones
const translations = {
  es: {
    title: 'Preguntas Frecuentes',
    subtitle: 'Todo lo que necesitas saber sobre Santivilla',
    breadcrumbHome: 'Inicio',
    breadcrumbFAQ: 'FAQ',
    sections: {
      general: {
        title: 'General',
        questions: [
          {
            q: '¿Qué es Santivilla?',
            a: 'Santivilla es una plataforma de ranking solidario donde puedes competir por ser #1 donando a refugios de animales. El 95% de tu donación va directamente a los animales, y solo el 5% se usa para mantener la plataforma.',
          },
          {
            q: '¿Cómo funciona el ranking?',
            a: 'Cada vez que donas, tu monto se suma a tu score total. El ranking muestra a todos los donantes ordenados por su score total, de mayor a menor. ¡Compite por ser #1!',
          },
          {
            q: '¿Puedo donar de forma anónima?',
            a: 'Actualmente, todas las donaciones aparecen en el ranking con el nombre que proporcionas. Estamos trabajando en una opción de donación anónima para el futuro.',
          },
          {
            q: '¿Hay un monto mínimo o máximo?',
            a: 'Sí, el monto mínimo es de 1€ y el máximo es de 10,000€ por transacción. Puedes donar múltiples veces para aumentar tu score.',
          },
        ],
      },
      donaciones: {
        title: 'Donaciones',
        questions: [
          {
            q: '¿A dónde va mi dinero?',
            a: 'El 95% de tu donación va directamente a refugios de animales. El 5% restante se usa para mantener la plataforma (servidores, desarrollo, contacto con refugios, etc.).',
          },
          {
            q: '¿Cómo se calculan las comisiones?',
            a: 'Hay una comisión fija de 1.50€ por transacción, más un 5% sobre el monto restante. Esto significa que cuanto más donas, menor es el porcentaje que cobra Santivilla. Por ejemplo, si donas 100€, 93.58€ van a animales y 6.42€ a la plataforma.',
          },
          {
            q: '¿Qué métodos de pago aceptan?',
            a: 'Aceptamos todas las tarjetas de crédito y débito a través de Stripe, una plataforma de pagos segura y confiable.',
          },
          {
            q: '¿Es seguro donar?',
            a: 'Sí, absolutamente. Usamos Stripe, una de las plataformas de pagos más seguras del mundo. Nunca almacenamos tu información de tarjeta. Todo el proceso es seguro y encriptado.',
          },
          {
            q: '¿Recibiré un recibo?',
            a: 'Sí, Stripe te enviará un recibo por email automáticamente después de tu donación.',
          },
        ],
      },
      ranking: {
        title: 'Ranking',
        questions: [
          {
            q: '¿Cómo se actualiza el ranking?',
            a: 'El ranking se actualiza en tiempo real. Tan pronto como tu pago se procesa, aparecerás en el ranking con tu nuevo score.',
          },
          {
            q: '¿Puedo cambiar mi nombre en el ranking?',
            a: 'Cada donación usa el nombre que proporcionas en ese momento. Si donas con un nombre diferente, aparecerás como un usuario separado. Estamos trabajando en un sistema de cuentas para unificar tus donaciones.',
          },
          {
            q: '¿Qué pasa si dos personas tienen el mismo score?',
            a: 'Si dos personas tienen el mismo score, se ordenan por fecha de última donación (la más reciente primero).',
          },
        ],
      },
      transparencia: {
        title: 'Transparencia',
        questions: [
          {
            q: '¿Cómo puedo verificar que mi donación llegó a los animales?',
            a: 'En la página de Transparencia puedes ver exactamente cómo se distribuye cada euro. Además, estamos trabajando en videos de YouTube que mostrarán las donaciones reales a los refugios.',
          },
          {
            q: '¿Dónde puedo ver las estadísticas?',
            a: 'Visita la página de Transparencia (/impacto) para ver estadísticas detalladas, incluyendo el total recaudado, el total donado a animales, y el total usado por la plataforma.',
          },
          {
            q: '¿Cómo puedo estar seguro de que el dinero va a los animales?',
            a: 'Todas las transacciones son transparentes y verificables. Puedes ver cada donación en la página de Transparencia. Además, trabajamos directamente con refugios verificados y publicamos evidencia de las donaciones.',
          },
        ],
      },
      futuro: {
        title: 'Futuro',
        questions: [
          {
            q: '¿Cuáles son los planes futuros?',
            a: 'Nuestro objetivo es reducir las comisiones a 2-3% cuando seamos sostenibles con sponsors y YouTube, y eventualmente llegar a 0% de comisión. También estamos trabajando en autenticación de usuarios, múltiples rankings, y más funcionalidades.',
          },
          {
            q: '¿Puedo sugerir mejoras?',
            a: '¡Por supuesto! Estamos abiertos a sugerencias. Puedes contactarnos a través de nuestras redes sociales o por email.',
          },
        ],
      },
    },
    backToHome: 'Volver al inicio',
    backToHomeAria: 'Volver a la página principal',
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about Santivilla',
    breadcrumbHome: 'Home',
    breadcrumbFAQ: 'FAQ',
    sections: {
      general: {
        title: 'General',
        questions: [
          {
            q: 'What is Santivilla?',
            a: 'Santivilla is a solidarity ranking platform where you can compete to be #1 by donating to animal shelters. 95% of your donation goes directly to animals, and only 5% is used to maintain the platform.',
          },
          {
            q: 'How does the ranking work?',
            a: 'Every time you donate, your amount is added to your total score. The ranking shows all donors ordered by their total score, from highest to lowest. Compete to be #1!',
          },
          {
            q: 'Can I donate anonymously?',
            a: 'Currently, all donations appear in the ranking with the name you provide. We are working on an anonymous donation option for the future.',
          },
          {
            q: 'Is there a minimum or maximum amount?',
            a: 'Yes, the minimum amount is €1 and the maximum is €10,000 per transaction. You can donate multiple times to increase your score.',
          },
        ],
      },
      donaciones: {
        title: 'Donations',
        questions: [
          {
            q: 'Where does my money go?',
            a: '95% of your donation goes directly to animal shelters. The remaining 5% is used to maintain the platform (servers, development, contact with shelters, etc.).',
          },
          {
            q: 'How are fees calculated?',
            a: 'There is a fixed fee of €1.50 per transaction, plus 5% on the remaining amount. This means the more you donate, the lower the percentage Santivilla charges. For example, if you donate €100, €93.58 goes to animals and €6.42 to the platform.',
          },
          {
            q: 'What payment methods do you accept?',
            a: 'We accept all credit and debit cards through Stripe, a secure and reliable payment platform.',
          },
          {
            q: 'Is it safe to donate?',
            a: 'Yes, absolutely. We use Stripe, one of the world\'s most secure payment platforms. We never store your card information. The entire process is secure and encrypted.',
          },
          {
            q: 'Will I receive a receipt?',
            a: 'Yes, Stripe will automatically send you a receipt by email after your donation.',
          },
        ],
      },
      ranking: {
        title: 'Ranking',
        questions: [
          {
            q: 'How is the ranking updated?',
            a: 'The ranking is updated in real-time. As soon as your payment is processed, you will appear in the ranking with your new score.',
          },
          {
            q: 'Can I change my name in the ranking?',
            a: 'Each donation uses the name you provide at that time. If you donate with a different name, you will appear as a separate user. We are working on an account system to unify your donations.',
          },
          {
            q: 'What happens if two people have the same score?',
            a: 'If two people have the same score, they are ordered by date of last donation (most recent first).',
          },
        ],
      },
      transparencia: {
        title: 'Transparency',
        questions: [
          {
            q: 'How can I verify that my donation reached the animals?',
            a: 'On the Transparency page you can see exactly how every euro is distributed. Additionally, we are working on YouTube videos that will show real donations to shelters.',
          },
          {
            q: 'Where can I see the statistics?',
            a: 'Visit the Transparency page (/impacto) to see detailed statistics, including total raised, total donated to animals, and total used by the platform.',
          },
          {
            q: 'How can I be sure the money goes to animals?',
            a: 'All transactions are transparent and verifiable. You can see each donation on the Transparency page. Additionally, we work directly with verified shelters and publish evidence of donations.',
          },
        ],
      },
      futuro: {
        title: 'Future',
        questions: [
          {
            q: 'What are the future plans?',
            a: 'Our goal is to reduce fees to 2-3% when we are sustainable with sponsors and YouTube, and eventually reach 0% commission. We are also working on user authentication, multiple rankings, and more features.',
          },
          {
            q: 'Can I suggest improvements?',
            a: 'Of course! We are open to suggestions. You can contact us through our social media or by email.',
          },
        ],
      },
    },
    backToHome: 'Back to home',
    backToHomeAria: 'Go back to the home page',
  },
  de: {
    title: 'Häufig gestellte Fragen',
    subtitle: 'Alles, was du über Santivilla wissen musst',
    breadcrumbHome: 'Startseite',
    breadcrumbFAQ: 'FAQ',
    sections: {
      general: {
        title: 'Allgemein',
        questions: [
          {
            q: 'Was ist Santivilla?',
            a: 'Santivilla ist eine Solidaritäts-Ranking-Plattform, auf der du um den ersten Platz konkurrieren kannst, indem du an Tierheime spendest. 95% deiner Spende geht direkt an Tiere, und nur 5% werden verwendet, um die Plattform zu unterhalten.',
          },
          {
            q: 'Wie funktioniert das Ranking?',
            a: 'Jedes Mal, wenn du spendest, wird dein Betrag zu deinem Gesamtscore addiert. Das Ranking zeigt alle Spender, geordnet nach ihrem Gesamtscore, von höchstem zu niedrigstem. Konkuriere um Platz #1!',
          },
          {
            q: 'Kann ich anonym spenden?',
            a: 'Derzeit erscheinen alle Spenden im Ranking mit dem Namen, den du angibst. Wir arbeiten an einer Option für anonyme Spenden für die Zukunft.',
          },
          {
            q: 'Gibt es einen Mindest- oder Höchstbetrag?',
            a: 'Ja, der Mindestbetrag beträgt 1€ und der Höchstbetrag 10.000€ pro Transaktion. Du kannst mehrmals spenden, um deinen Score zu erhöhen.',
          },
        ],
      },
      donaciones: {
        title: 'Spenden',
        questions: [
          {
            q: 'Wohin geht mein Geld?',
            a: '95% deiner Spende geht direkt an Tierheime. Die verbleibenden 5% werden verwendet, um die Plattform zu unterhalten (Server, Entwicklung, Kontakt mit Tierheimen usw.).',
          },
          {
            q: 'Wie werden die Gebühren berechnet?',
            a: 'Es gibt eine feste Gebühr von 1,50€ pro Transaktion, plus 5% auf den verbleibenden Betrag. Das bedeutet, je mehr du spendest, desto niedriger ist der Prozentsatz, den Santivilla verlangt. Zum Beispiel, wenn du 100€ spendest, gehen 93,58€ an Tiere und 6,42€ an die Plattform.',
          },
          {
            q: 'Welche Zahlungsmethoden akzeptiert ihr?',
            a: 'Wir akzeptieren alle Kredit- und Debitkarten über Stripe, eine sichere und zuverlässige Zahlungsplattform.',
          },
          {
            q: 'Ist es sicher zu spenden?',
            a: 'Ja, absolut. Wir verwenden Stripe, eine der sichersten Zahlungsplattformen der Welt. Wir speichern niemals deine Karteninformationen. Der gesamte Prozess ist sicher und verschlüsselt.',
          },
          {
            q: 'Erhalte ich eine Quittung?',
            a: 'Ja, Stripe sendet dir automatisch eine Quittung per E-Mail nach deiner Spende.',
          },
        ],
      },
      ranking: {
        title: 'Ranking',
        questions: [
          {
            q: 'Wie wird das Ranking aktualisiert?',
            a: 'Das Ranking wird in Echtzeit aktualisiert. Sobald deine Zahlung verarbeitet wurde, erscheinst du im Ranking mit deinem neuen Score.',
          },
          {
            q: 'Kann ich meinen Namen im Ranking ändern?',
            a: 'Jede Spende verwendet den Namen, den du zu diesem Zeitpunkt angibst. Wenn du mit einem anderen Namen spendest, erscheinst du als separater Benutzer. Wir arbeiten an einem Kontosystem, um deine Spenden zu vereinheitlichen.',
          },
          {
            q: 'Was passiert, wenn zwei Personen den gleichen Score haben?',
            a: 'Wenn zwei Personen den gleichen Score haben, werden sie nach Datum der letzten Spende sortiert (neueste zuerst).',
          },
        ],
      },
      transparencia: {
        title: 'Transparenz',
        questions: [
          {
            q: 'Wie kann ich überprüfen, dass meine Spende die Tiere erreicht hat?',
            a: 'Auf der Transparenz-Seite kannst du genau sehen, wie jeder Euro verteilt wird. Zusätzlich arbeiten wir an YouTube-Videos, die echte Spenden an Tierheime zeigen werden.',
          },
          {
            q: 'Wo kann ich die Statistiken sehen?',
            a: 'Besuche die Transparenz-Seite (/impacto), um detaillierte Statistiken zu sehen, einschließlich Gesamterlös, Gesamtspende an Tiere und Gesamtbetrag, der von der Plattform verwendet wird.',
          },
          {
            q: 'Wie kann ich sicher sein, dass das Geld an Tiere geht?',
            a: 'Alle Transaktionen sind transparent und überprüfbar. Du kannst jede Spende auf der Transparenz-Seite sehen. Zusätzlich arbeiten wir direkt mit verifizierten Tierheimen zusammen und veröffentlichen Beweise für Spenden.',
          },
        ],
      },
      futuro: {
        title: 'Zukunft',
        questions: [
          {
            q: 'Was sind die Zukunftspläne?',
            a: 'Unser Ziel ist es, die Gebühren auf 2-3% zu reduzieren, wenn wir mit Sponsoren und YouTube nachhaltig sind, und schließlich 0% Provision zu erreichen. Wir arbeiten auch an Benutzerauthentifizierung, mehreren Rankings und weiteren Funktionen.',
          },
          {
            q: 'Kann ich Verbesserungen vorschlagen?',
            a: 'Natürlich! Wir sind offen für Vorschläge. Du kannst uns über unsere sozialen Medien oder per E-Mail kontaktieren.',
          },
        ],
      },
    },
    backToHome: 'Zur Startseite',
    backToHomeAria: 'Zurück zur Startseite gehen',
  },
}

export default function FAQPage() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]

  // Obtener ruta base según idioma
  const getBasePath = () => {
    return lang === 'es' ? '' : `/${lang}`
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-[var(--color-text-secondary)] mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href={`${getBasePath()}/`} className="hover:text-[var(--color-secondary)] transition-colors">
                {t.breadcrumbHome}
              </Link>
            </li>
            <li>/</li>
            <li className="text-[var(--color-text)]">{t.breadcrumbFAQ}</li>
          </ol>
        </nav>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            {t.subtitle}
          </p>
        </div>

        {/* Secciones de preguntas */}
        <div className="space-y-12">
          {Object.entries(t.sections).map(([key, section]) => (
            <section key={key} className="bg-[var(--color-background-alt)] border border-[var(--color-border-dark)] rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.questions.map((item, index) => (
                  <div key={index} className="border-b border-[var(--color-border)] pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                      {item.q}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Botón para volver */}
        <div className="mt-12 text-center">
          <Link
            href={`${getBasePath()}/`}
            className="inline-block px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold rounded-md transition-colors"
            aria-label={t.backToHomeAria}
          >
            {t.backToHome}
          </Link>
        </div>
      </main>
    </div>
  )
}

