// Página de Términos y Condiciones
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const translations = {
  es: {
    title: 'Términos y Condiciones',
    lastUpdated: 'Última actualización: Diciembre 2025',
    intro: 'Al usar Santivilla, aceptas estos términos y condiciones. Por favor, léelos cuidadosamente.',
    
    section1Title: '1. Aceptación de los Términos',
    section1Text: 'Al acceder y usar Santivilla, aceptas estar sujeto a estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro servicio.',
    
    section2Title: '2. Descripción del Servicio',
    section2Text: 'Santivilla es una plataforma de ranking solidario donde los usuarios pueden realizar donaciones a refugios de animales. El ~95% de cada donación se destina directamente a refugios de animales, mientras que el ~5% restante se utiliza para mantener la plataforma.',
    
    section3Title: '3. Elegibilidad',
    section3Text: 'Debes tener al menos 18 años para usar este servicio. Al usar Santivilla, garantizas que tienes la capacidad legal para realizar donaciones.',
    
    section4Title: '4. Donaciones',
    section4Sub1: 'Proceso de Donación:',
    section4Sub1Text: 'Las donaciones se procesan a través de Stripe, una plataforma de pagos segura y certificada. No almacenamos información de tarjetas de crédito.',
    section4Sub2: 'Finalidad:',
    section4Sub2Text: 'Todas las donaciones se destinan a refugios de animales. No garantizamos el destino específico de cada donación individual, pero mantenemos transparencia sobre el uso general de los fondos.',
    section4Sub3: 'Irrevocabilidad:',
    section4Sub3Text: 'Las donaciones son irrevocables una vez procesadas. No ofrecemos reembolsos salvo en casos excepcionales a nuestra discreción.',
    section4Sub4: 'Transparencia:',
    section4Sub4Text: 'Puedes ver cómo se distribuyen los fondos en nuestra página de Transparencia.',
    
    section5Title: '5. Ranking Público',
    section5Text: 'Tu nombre de usuario (si lo proporcionas) puede aparecer públicamente en nuestro ranking. Si prefieres donar de forma anónima, puedes usar un nombre genérico.',
    
    section6Title: '6. Conducta del Usuario',
    section6Text: 'Te comprometes a:',
    section6List1: 'Proporcionar información veraz y precisa',
    section6List2: 'No usar el servicio para actividades ilegales',
    section6List3: 'No intentar manipular o falsificar el ranking',
    section6List4: 'Respetar a otros usuarios y la comunidad',
    
    section7Title: '7. Propiedad Intelectual',
    section7Text: 'Todo el contenido de Santivilla, incluyendo pero no limitado a diseño, logos, textos y gráficos, es propiedad de Santivilla y está protegido por leyes de propiedad intelectual.',
    
    section8Title: '8. Limitación de Responsabilidad',
    section8Text: 'Santivilla se proporciona "tal cual" sin garantías. No garantizamos la disponibilidad ininterrumpida del servicio ni asumimos responsabilidad por pérdidas o daños resultantes del uso del servicio.',
    
    section9Title: '9. Modificaciones del Servicio',
    section9Text: 'Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento sin previo aviso.',
    
    section10Title: '10. Modificaciones de los Términos',
    section10Text: 'Podemos actualizar estos términos ocasionalmente. El uso continuado del servicio después de los cambios constituye aceptación de los nuevos términos.',
    
    section11Title: '11. Ley Aplicable',
    section11Text: 'Estos términos se rigen por las leyes de España. Cualquier disputa se resolverá en los tribunales competentes de España.',
    
    section12Title: '12. Contacto',
    section12Text: 'Para preguntas sobre estos términos, contáctanos en:',
    section12Email: 'contacto@santivilla.com',
    
    back: 'Volver al inicio',
  },
  en: {
    title: 'Terms and Conditions',
    lastUpdated: 'Last updated: December 2025',
    intro: 'By using Santivilla, you agree to these terms and conditions. Please read them carefully.',
    
    section1Title: '1. Acceptance of Terms',
    section1Text: 'By accessing and using Santivilla, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you must not use our service.',
    
    section2Title: '2. Description of Service',
    section2Text: 'Santivilla is a solidarity ranking platform where users can make donations to animal shelters. Approximately 95% of each donation goes directly to animal shelters, while the remaining ~5% is used to maintain the platform.',
    
    section3Title: '3. Eligibility',
    section3Text: 'You must be at least 18 years old to use this service. By using Santivilla, you warrant that you have the legal capacity to make donations.',
    
    section4Title: '4. Donations',
    section4Sub1: 'Donation Process:',
    section4Sub1Text: 'Donations are processed through Stripe, a secure and certified payment platform. We do not store credit card information.',
    section4Sub2: 'Purpose:',
    section4Sub2Text: 'All donations are directed to animal shelters. We do not guarantee the specific destination of each individual donation, but we maintain transparency about the general use of funds.',
    section4Sub3: 'Irrevocability:',
    section4Sub3Text: 'Donations are irrevocable once processed. We do not offer refunds except in exceptional cases at our discretion.',
    section4Sub4: 'Transparency:',
    section4Sub4Text: 'You can see how funds are distributed on our Transparency page.',
    
    section5Title: '5. Public Ranking',
    section5Text: 'Your username (if provided) may appear publicly in our ranking. If you prefer to donate anonymously, you can use a generic name.',
    
    section6Title: '6. User Conduct',
    section6Text: 'You agree to:',
    section6List1: 'Provide truthful and accurate information',
    section6List2: 'Not use the service for illegal activities',
    section6List3: 'Not attempt to manipulate or falsify the ranking',
    section6List4: 'Respect other users and the community',
    
    section7Title: '7. Intellectual Property',
    section7Text: 'All content on Santivilla, including but not limited to design, logos, text and graphics, is the property of Santivilla and is protected by intellectual property laws.',
    
    section8Title: '8. Limitation of Liability',
    section8Text: 'Santivilla is provided "as is" without warranties. We do not guarantee uninterrupted service availability and assume no liability for losses or damages resulting from the use of the service.',
    
    section9Title: '9. Service Modifications',
    section9Text: 'We reserve the right to modify, suspend or discontinue any aspect of the service at any time without prior notice.',
    
    section10Title: '10. Terms Modifications',
    section10Text: 'We may update these terms occasionally. Continued use of the service after changes constitutes acceptance of the new terms.',
    
    section11Title: '11. Applicable Law',
    section11Text: 'These terms are governed by the laws of Spain. Any dispute will be resolved in the competent courts of Spain.',
    
    section12Title: '12. Contact',
    section12Text: 'For questions about these terms, contact us at:',
    section12Email: 'contacto@santivilla.com',
    
    back: 'Back to home',
  },
  de: {
    title: 'Allgemeine Geschäftsbedingungen',
    lastUpdated: 'Letzte Aktualisierung: Dezember 2025',
    intro: 'Durch die Nutzung von Santivilla akzeptieren Sie diese Allgemeinen Geschäftsbedingungen. Bitte lesen Sie sie sorgfältig.',
    
    section1Title: '1. Annahme der Bedingungen',
    section1Text: 'Durch den Zugriff auf und die Nutzung von Santivilla stimmen Sie zu, an diese Allgemeinen Geschäftsbedingungen gebunden zu sein. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, dürfen Sie unseren Service nicht nutzen.',
    
    section2Title: '2. Beschreibung des Services',
    section2Text: 'Santivilla ist eine Solidaritäts-Ranking-Plattform, auf der Benutzer Spenden an Tierheime leisten können. Etwa 95% jeder Spende gehen direkt an Tierheime, während die verbleibenden ~5% zur Aufrechterhaltung der Plattform verwendet werden.',
    
    section3Title: '3. Berechtigung',
    section3Text: 'Sie müssen mindestens 18 Jahre alt sein, um diesen Service zu nutzen. Durch die Nutzung von Santivilla garantieren Sie, dass Sie die rechtliche Befugnis haben, Spenden zu leisten.',
    
    section4Title: '4. Spenden',
    section4Sub1: 'Spendenprozess:',
    section4Sub1Text: 'Spenden werden über Stripe, eine sichere und zertifizierte Zahlungsplattform, verarbeitet. Wir speichern keine Kreditkarteninformationen.',
    section4Sub2: 'Zweck:',
    section4Sub2Text: 'Alle Spenden werden an Tierheime geleitet. Wir garantieren nicht das spezifische Ziel jeder einzelnen Spende, behalten aber die Transparenz über die allgemeine Verwendung der Mittel bei.',
    section4Sub3: 'Unwiderruflichkeit:',
    section4Sub3Text: 'Spenden sind nach der Verarbeitung unwiderruflich. Wir bieten keine Rückerstattungen an, außer in Ausnahmefällen nach unserem Ermessen.',
    section4Sub4: 'Transparenz:',
    section4Sub4Text: 'Sie können auf unserer Transparenzseite sehen, wie die Mittel verteilt werden.',
    
    section5Title: '5. Öffentliches Ranking',
    section5Text: 'Ihr Benutzername (falls angegeben) kann öffentlich in unserem Ranking erscheinen. Wenn Sie lieber anonym spenden möchten, können Sie einen generischen Namen verwenden.',
    
    section6Title: '6. Benutzerverhalten',
    section6Text: 'Sie stimmen zu:',
    section6List1: 'Wahre und genaue Informationen anzugeben',
    section6List2: 'Den Service nicht für illegale Aktivitäten zu nutzen',
    section6List3: 'Nicht zu versuchen, das Ranking zu manipulieren oder zu fälschen',
    section6List4: 'Andere Benutzer und die Gemeinschaft zu respektieren',
    
    section7Title: '7. Geistiges Eigentum',
    section7Text: 'Alle Inhalte auf Santivilla, einschließlich, aber nicht beschränkt auf Design, Logos, Texte und Grafiken, sind Eigentum von Santivilla und durch Gesetze zum geistigen Eigentum geschützt.',
    
    section8Title: '8. Haftungsbeschränkung',
    section8Text: 'Santivilla wird "wie besehen" ohne Garantien bereitgestellt. Wir garantieren keine ununterbrochene Verfügbarkeit des Services und übernehmen keine Haftung für Verluste oder Schäden, die aus der Nutzung des Services resultieren.',
    
    section9Title: '9. Serviceänderungen',
    section9Text: 'Wir behalten uns das Recht vor, jeden Aspekt des Services jederzeit ohne vorherige Ankündigung zu ändern, auszusetzen oder einzustellen.',
    
    section10Title: '10. Änderungen der Bedingungen',
    section10Text: 'Wir können diese Bedingungen gelegentlich aktualisieren. Die fortgesetzte Nutzung des Services nach Änderungen stellt eine Annahme der neuen Bedingungen dar.',
    
    section11Title: '11. Anwendbares Recht',
    section11Text: 'Diese Bedingungen unterliegen dem Recht Spaniens. Streitigkeiten werden vor den zuständigen Gerichten Spaniens beigelegt.',
    
    section12Title: '12. Kontakt',
    section12Text: 'Bei Fragen zu diesen Bedingungen kontaktieren Sie uns unter:',
    section12Email: 'contacto@santivilla.com',
    
    back: 'Zur Startseite',
  },
}

export default function TerminosPage() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const homePath = lang === 'es' ? '/' : `/${lang}`

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          href={homePath}
          className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] mb-6 inline-block"
        >
          ← {t.back}
        </Link>
        
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">{t.title}</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-8">{t.lastUpdated}</p>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-[var(--color-text)] leading-relaxed">{t.intro}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section1Title}</h2>
            <p className="text-[var(--color-text)]">{t.section1Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section2Title}</h2>
            <p className="text-[var(--color-text)]">{t.section2Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section3Title}</h2>
            <p className="text-[var(--color-text)]">{t.section3Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section4Title}</h2>
            <div className="space-y-3 text-[var(--color-text)]">
              <div>
                <strong>{t.section4Sub1}</strong>
                <p className="ml-4">{t.section4Sub1Text}</p>
              </div>
              <div>
                <strong>{t.section4Sub2}</strong>
                <p className="ml-4">{t.section4Sub2Text}</p>
              </div>
              <div>
                <strong>{t.section4Sub3}</strong>
                <p className="ml-4">{t.section4Sub3Text}</p>
              </div>
              <div>
                <strong>{t.section4Sub4}</strong>
                <p className="ml-4">{t.section4Sub4Text}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section5Title}</h2>
            <p className="text-[var(--color-text)]">{t.section5Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section6Title}</h2>
            <p className="text-[var(--color-text)] mb-2">{t.section6Text}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text)] ml-4">
              <li>{t.section6List1}</li>
              <li>{t.section6List2}</li>
              <li>{t.section6List3}</li>
              <li>{t.section6List4}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section7Title}</h2>
            <p className="text-[var(--color-text)]">{t.section7Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section8Title}</h2>
            <p className="text-[var(--color-text)]">{t.section8Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section9Title}</h2>
            <p className="text-[var(--color-text)]">{t.section9Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section10Title}</h2>
            <p className="text-[var(--color-text)]">{t.section10Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section11Title}</h2>
            <p className="text-[var(--color-text)]">{t.section11Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section12Title}</h2>
            <p className="text-[var(--color-text)] mb-2">{t.section12Text}</p>
            <p className="text-[var(--color-primary)] font-semibold">
              <a href="mailto:contacto@santivilla.com" className="hover:underline">
                {t.section12Email}
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <Link 
            href={homePath}
            className="text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
          >
            ← {t.back}
          </Link>
        </div>
      </div>
    </div>
  )
}

