// Página de Política de Privacidad (GDPR Compliant)
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const translations = {
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Diciembre 2025',
    intro: 'En Santivilla nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal de acuerdo con el Reglamento General de Protección de Datos (RGPD) de la Unión Europea.',
    
    section1Title: '1. Responsable del Tratamiento',
    section1Text: 'El responsable del tratamiento de tus datos personales es Santivilla. Puedes contactarnos en: contacto@santivilla.com',
    
    section2Title: '2. Datos que Recopilamos',
    section2Text: 'Recopilamos los siguientes tipos de datos personales:',
    section2List1: 'Nombre de usuario (proporcionado voluntariamente al hacer una donación)',
    section2List2: 'Información de pago procesada a través de Stripe (no almacenamos datos de tarjetas)',
    section2List3: 'Datos de navegación y uso del sitio web (a través de cookies con tu consentimiento)',
    section2List4: 'Direcciones IP (registradas temporalmente en nuestros logs del servidor)',
    
    section3Title: '3. Base Legal y Finalidad del Tratamiento',
    section3Text: 'Procesamos tus datos personales bajo las siguientes bases legales:',
    section3Sub1: 'Ejecución de contrato:',
    section3Sub1Text: 'Para procesar tus donaciones y mantener el ranking solidario.',
    section3Sub2: 'Consentimiento:',
    section3Sub2Text: 'Para el uso de cookies analíticas (Google Analytics) y seguimiento del sitio web.',
    section3Sub3: 'Interés legítimo:',
    section3Sub3Text: 'Para mantener la seguridad del sitio y prevenir fraudes.',
    
    section4Title: '4. Cómo Usamos tus Datos',
    section4Text: 'Utilizamos tus datos personales para:',
    section4List1: 'Procesar y registrar tus donaciones',
    section4List2: 'Mostrar tu nombre en el ranking público (si proporcionas uno)',
    section4List3: 'Mejorar la experiencia del usuario en nuestro sitio web',
    section4List4: 'Cumplir con obligaciones legales y prevenir fraudes',
    
    section5Title: '5. Cookies y Tecnologías de Seguimiento',
    section5Text: 'Utilizamos cookies para mejorar tu experiencia. Solo cargamos cookies de análisis (Google Analytics) con tu consentimiento explícito. Puedes retirar tu consentimiento en cualquier momento.',
    
    section6Title: '6. Compartir Datos con Terceros',
    section6Text: 'Compartimos datos limitados con los siguientes servicios:',
    section6List1: 'Stripe: Para procesar pagos (cumplen con PCI-DSS y PSD2)',
    section6List2: 'Supabase: Para almacenar información de donaciones (cumplen con GDPR)',
    section6List3: 'Google Analytics: Solo con tu consentimiento, para análisis del sitio web',
    section6List4: 'Vercel: Para hosting del sitio web',
    
    section7Title: '7. Retención de Datos',
    section7Text: 'Conservamos tus datos personales solo durante el tiempo necesario para cumplir con los fines descritos en esta política o según requiera la ley.',
    
    section8Title: '8. Tus Derechos (GDPR)',
    section8Text: 'Tienes los siguientes derechos respecto a tus datos personales:',
    section8List1: 'Derecho de acceso: Puedes solicitar una copia de tus datos personales',
    section8List2: 'Derecho de rectificación: Puedes corregir datos inexactos',
    section8List3: 'Derecho de supresión: Puedes solicitar la eliminación de tus datos',
    section8List4: 'Derecho a la portabilidad: Puedes solicitar una copia de tus datos en formato estructurado',
    section8List5: 'Derecho de oposición: Puedes oponerte al procesamiento de tus datos',
    section8List6: 'Derecho a retirar el consentimiento: Puedes retirar tu consentimiento para cookies en cualquier momento',
    section8Contact: 'Para ejercer estos derechos, contáctanos en: contacto@santivilla.com',
    
    section9Title: '9. Seguridad de los Datos',
    section9Text: 'Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos personales contra acceso no autorizado, pérdida o destrucción.',
    
    section10Title: '10. Transferencias Internacionales',
    section10Text: 'Algunos de nuestros proveedores de servicios (como Stripe, Google Analytics) pueden transferir datos fuera del EEE. Solo utilizamos proveedores que ofrecen garantías adecuadas de protección de datos.',
    
    section11Title: '11. Menores de Edad',
    section11Text: 'Nuestro servicio está dirigido a mayores de 18 años. No recopilamos intencionalmente datos de menores sin el consentimiento de sus padres.',
    
    section12Title: '12. Cambios en esta Política',
    section12Text: 'Podemos actualizar esta política ocasionalmente. Te notificaremos cualquier cambio importante mediante un aviso en nuestro sitio web.',
    
    section13Title: '13. Contacto',
    section13Text: 'Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tus datos, contáctanos en:',
    section13Email: 'contacto@santivilla.com',
    
    back: 'Volver al inicio',
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: December 2025',
    intro: 'At Santivilla we are committed to protecting your privacy. This policy explains how we collect, use and protect your personal information in accordance with the European Union General Data Protection Regulation (GDPR).',
    
    section1Title: '1. Data Controller',
    section1Text: 'The controller of your personal data is Santivilla. You can contact us at: contacto@santivilla.com',
    
    section2Title: '2. Data We Collect',
    section2Text: 'We collect the following types of personal data:',
    section2List1: 'Username (voluntarily provided when making a donation)',
    section2List2: 'Payment information processed through Stripe (we do not store card data)',
    section2List3: 'Browsing and website usage data (through cookies with your consent)',
    section2List4: 'IP addresses (temporarily recorded in our server logs)',
    
    section3Title: '3. Legal Basis and Purpose of Processing',
    section3Text: 'We process your personal data under the following legal bases:',
    section3Sub1: 'Contract performance:',
    section3Sub1Text: 'To process your donations and maintain the solidarity ranking.',
    section3Sub2: 'Consent:',
    section3Sub2Text: 'For the use of analytical cookies (Google Analytics) and website tracking.',
    section3Sub3: 'Legitimate interest:',
    section3Sub3Text: 'To maintain site security and prevent fraud.',
    
    section4Title: '4. How We Use Your Data',
    section4Text: 'We use your personal data to:',
    section4List1: 'Process and record your donations',
    section4List2: 'Display your name on the public ranking (if you provide one)',
    section4List3: 'Improve user experience on our website',
    section4List4: 'Comply with legal obligations and prevent fraud',
    
    section5Title: '5. Cookies and Tracking Technologies',
    section5Text: 'We use cookies to improve your experience. We only load analytics cookies (Google Analytics) with your explicit consent. You can withdraw your consent at any time.',
    
    section6Title: '6. Sharing Data with Third Parties',
    section6Text: 'We share limited data with the following services:',
    section6List1: 'Stripe: To process payments (they comply with PCI-DSS and PSD2)',
    section6List2: 'Supabase: To store donation information (they comply with GDPR)',
    section6List3: 'Google Analytics: Only with your consent, for website analytics',
    section6List4: 'Vercel: For website hosting',
    
    section7Title: '7. Data Retention',
    section7Text: 'We retain your personal data only for as long as necessary to fulfill the purposes described in this policy or as required by law.',
    
    section8Title: '8. Your Rights (GDPR)',
    section8Text: 'You have the following rights regarding your personal data:',
    section8List1: 'Right of access: You can request a copy of your personal data',
    section8List2: 'Right to rectification: You can correct inaccurate data',
    section8List3: 'Right to erasure: You can request deletion of your data',
    section8List4: 'Right to data portability: You can request a copy of your data in structured format',
    section8List5: 'Right to object: You can object to the processing of your data',
    section8List6: 'Right to withdraw consent: You can withdraw your consent for cookies at any time',
    section8Contact: 'To exercise these rights, contact us at: contacto@santivilla.com',
    
    section9Title: '9. Data Security',
    section9Text: 'We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, loss or destruction.',
    
    section10Title: '10. International Transfers',
    section10Text: 'Some of our service providers (such as Stripe, Google Analytics) may transfer data outside the EEA. We only use providers that offer adequate data protection guarantees.',
    
    section11Title: '11. Minors',
    section11Text: 'Our service is aimed at people over 18 years of age. We do not intentionally collect data from minors without parental consent.',
    
    section12Title: '12. Changes to this Policy',
    section12Text: 'We may update this policy occasionally. We will notify you of any significant changes by posting a notice on our website.',
    
    section13Title: '13. Contact',
    section13Text: 'If you have questions about this privacy policy or how we handle your data, contact us at:',
    section13Email: 'contacto@santivilla.com',
    
    back: 'Back to home',
  },
  de: {
    title: 'Datenschutzerklärung',
    lastUpdated: 'Letzte Aktualisierung: Dezember 2025',
    intro: 'Bei Santivilla sind wir verpflichtet, Ihre Privatsphäre zu schützen. Diese Richtlinie erklärt, wie wir Ihre persönlichen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) der Europäischen Union sammeln, verwenden und schützen.',
    
    section1Title: '1. Verantwortlicher für die Datenverarbeitung',
    section1Text: 'Der Verantwortliche für Ihre persönlichen Daten ist Santivilla. Sie können uns kontaktieren unter: contacto@santivilla.com',
    
    section2Title: '2. Daten, die wir sammeln',
    section2Text: 'Wir sammeln folgende Arten von personenbezogenen Daten:',
    section2List1: 'Benutzername (freiwillig bei einer Spende angegeben)',
    section2List2: 'Zahlungsinformationen, die über Stripe verarbeitet werden (wir speichern keine Kartendaten)',
    section2List3: 'Browser- und Website-Nutzungsdaten (über Cookies mit Ihrer Zustimmung)',
    section2List4: 'IP-Adressen (temporär in unseren Server-Logs gespeichert)',
    
    section3Title: '3. Rechtsgrundlage und Zweck der Verarbeitung',
    section3Text: 'Wir verarbeiten Ihre persönlichen Daten auf folgenden Rechtsgrundlagen:',
    section3Sub1: 'Vertragserfüllung:',
    section3Sub1Text: 'Um Ihre Spenden zu verarbeiten und das Solidaritäts-Ranking zu führen.',
    section3Sub2: 'Einwilligung:',
    section3Sub2Text: 'Für die Verwendung von Analyse-Cookies (Google Analytics) und Website-Tracking.',
    section3Sub3: 'Berechtigtes Interesse:',
    section3Sub3Text: 'Um die Sicherheit der Website zu gewährleisten und Betrug zu verhindern.',
    
    section4Title: '4. Wie wir Ihre Daten verwenden',
    section4Text: 'Wir verwenden Ihre persönlichen Daten, um:',
    section4List1: 'Ihre Spenden zu verarbeiten und zu registrieren',
    section4List2: 'Ihren Namen im öffentlichen Ranking anzuzeigen (wenn Sie einen angeben)',
    section4List3: 'Das Benutzererlebnis auf unserer Website zu verbessern',
    section4List4: 'Rechtliche Verpflichtungen zu erfüllen und Betrug zu verhindern',
    
    section5Title: '5. Cookies und Tracking-Technologien',
    section5Text: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Wir laden Analyse-Cookies (Google Analytics) nur mit Ihrer ausdrücklichen Zustimmung. Sie können Ihre Zustimmung jederzeit widerrufen.',
    
    section6Title: '6. Datenweitergabe an Dritte',
    section6Text: 'Wir teilen begrenzte Daten mit folgenden Diensten:',
    section6List1: 'Stripe: Zur Zahlungsabwicklung (entsprechen PCI-DSS und PSD2)',
    section6List2: 'Supabase: Zur Speicherung von Spendeninformationen (entsprechen DSGVO)',
    section6List3: 'Google Analytics: Nur mit Ihrer Zustimmung, für Website-Analysen',
    section6List4: 'Vercel: Für das Website-Hosting',
    
    section7Title: '7. Datenspeicherung',
    section7Text: 'Wir speichern Ihre persönlichen Daten nur so lange, wie es zur Erfüllung der in dieser Richtlinie beschriebenen Zwecke oder gesetzlich erforderlich ist.',
    
    section8Title: '8. Ihre Rechte (DSGVO)',
    section8Text: 'Sie haben folgende Rechte bezüglich Ihrer persönlichen Daten:',
    section8List1: 'Auskunftsrecht: Sie können eine Kopie Ihrer persönlichen Daten anfordern',
    section8List2: 'Berichtigungsrecht: Sie können ungenaue Daten korrigieren',
    section8List3: 'Löschungsrecht: Sie können die Löschung Ihrer Daten anfordern',
    section8List4: 'Datenübertragbarkeitsrecht: Sie können eine Kopie Ihrer Daten in strukturiertem Format anfordern',
    section8List5: 'Widerspruchsrecht: Sie können der Verarbeitung Ihrer Daten widersprechen',
    section8List6: 'Recht auf Widerruf der Einwilligung: Sie können Ihre Zustimmung für Cookies jederzeit widerrufen',
    section8Contact: 'Um diese Rechte auszuüben, kontaktieren Sie uns unter: contacto@santivilla.com',
    
    section9Title: '9. Datensicherheit',
    section9Text: 'Wir implementieren angemessene technische und organisatorische Sicherheitsmaßnahmen, um Ihre persönlichen Daten vor unbefugtem Zugriff, Verlust oder Zerstörung zu schützen.',
    
    section10Title: '10. Internationale Übertragungen',
    section10Text: 'Einige unserer Dienstanbieter (wie Stripe, Google Analytics) können Daten außerhalb des EWR übertragen. Wir verwenden nur Anbieter, die angemessene Datenschutzgarantien bieten.',
    
    section11Title: '11. Minderjährige',
    section11Text: 'Unser Service richtet sich an Personen über 18 Jahre. Wir sammeln nicht absichtlich Daten von Minderjährigen ohne Zustimmung der Eltern.',
    
    section12Title: '12. Änderungen dieser Richtlinie',
    section12Text: 'Wir können diese Richtlinie gelegentlich aktualisieren. Wir werden Sie über wichtige Änderungen durch eine Ankündigung auf unserer Website informieren.',
    
    section13Title: '13. Kontakt',
    section13Text: 'Wenn Sie Fragen zu dieser Datenschutzerklärung oder zur Handhabung Ihrer Daten haben, kontaktieren Sie uns unter:',
    section13Email: 'contacto@santivilla.com',
    
    back: 'Zur Startseite',
  },
}

export default function PrivacidadPage() {
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
            <p className="text-[var(--color-text)] mb-2">{t.section2Text}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text)] ml-4">
              <li>{t.section2List1}</li>
              <li>{t.section2List2}</li>
              <li>{t.section2List3}</li>
              <li>{t.section2List4}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section3Title}</h2>
            <p className="text-[var(--color-text)] mb-3">{t.section3Text}</p>
            <div className="space-y-3 text-[var(--color-text)]">
              <div>
                <strong>{t.section3Sub1}</strong>
                <p className="ml-4">{t.section3Sub1Text}</p>
              </div>
              <div>
                <strong>{t.section3Sub2}</strong>
                <p className="ml-4">{t.section3Sub2Text}</p>
              </div>
              <div>
                <strong>{t.section3Sub3}</strong>
                <p className="ml-4">{t.section3Sub3Text}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section4Title}</h2>
            <p className="text-[var(--color-text)] mb-2">{t.section4Text}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text)] ml-4">
              <li>{t.section4List1}</li>
              <li>{t.section4List2}</li>
              <li>{t.section4List3}</li>
              <li>{t.section4List4}</li>
            </ul>
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
            <p className="text-[var(--color-text)] mb-2">{t.section8Text}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text)] ml-4">
              <li>{t.section8List1}</li>
              <li>{t.section8List2}</li>
              <li>{t.section8List3}</li>
              <li>{t.section8List4}</li>
              <li>{t.section8List5}</li>
              <li>{t.section8List6}</li>
            </ul>
            <p className="text-[var(--color-text)] mt-4 font-semibold">{t.section8Contact}</p>
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
            <p className="text-[var(--color-text)]">{t.section12Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section13Title}</h2>
            <p className="text-[var(--color-text)] mb-2">{t.section13Text}</p>
            <p className="text-[var(--color-primary)] font-semibold">
              <a href="mailto:contacto@santivilla.com" className="hover:underline">
                {t.section13Email}
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

