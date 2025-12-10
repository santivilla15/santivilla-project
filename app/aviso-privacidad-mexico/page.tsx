// Aviso de Privacidad Simplificado - México (LFPDPPP)
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const translations = {
  es: {
    title: 'Aviso de Privacidad Simplificado - México',
    subtitle: 'Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)',
    lastUpdated: 'Última actualización: Diciembre 2025',
    
    intro: 'Santivilla, con domicilio para efectos de la presente Ley en el territorio mexicano, es responsable del tratamiento de sus datos personales.',
    
    section1Title: '1. Datos Personales que Recabamos',
    section1Text: 'Para las finalidades señaladas en el presente aviso, recabamos los siguientes datos personales:',
    section1List1: 'Nombre de usuario (proporcionado voluntariamente)',
    section1List2: 'Información de pago (procesada a través de Stripe, no almacenamos datos de tarjetas)',
    section1List3: 'Datos de navegación (con su consentimiento)',
    section1List4: 'Direcciones IP (temporalmente en nuestros logs)',
    
    section2Title: '2. Finalidades del Tratamiento',
    section2Primary: 'Finalidades Primarias (necesarias para el servicio):',
    section2PrimaryList1: 'Procesar sus donaciones',
    section2PrimaryList2: 'Mantener el ranking solidario',
    section2PrimaryList3: 'Mostrar su nombre en el ranking público (si lo proporciona)',
    section2Secondary: 'Finalidades Secundarias (mejora del servicio):',
    section2SecondaryList1: 'Mejorar la experiencia del usuario',
    section2SecondaryList2: 'Análisis estadísticos del sitio web (con su consentimiento)',
    
    section3Title: '3. Transferencias',
    section3Text: 'Sus datos personales pueden ser transferidos y tratados dentro y fuera del país, por personas distintas a esta empresa, a los siguientes terceros:',
    section3List1: 'Stripe (procesamiento de pagos) - Estados Unidos',
    section3List2: 'Supabase (almacenamiento de datos) - Estados Unidos',
    section3List3: 'Google Analytics (análisis web, solo con consentimiento) - Estados Unidos',
    section3List4: 'Vercel (hosting) - Estados Unidos',
    section3Consent: 'Si no manifiesta su oposición para que sus datos personales sean transferidos, se entenderá que ha otorgado su consentimiento.',
    
    section4Title: '4. Derechos ARCO',
    section4Text: 'Usted tiene derecho de Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (Derechos ARCO), así como de revocar el consentimiento que para tal fin nos haya otorgado.',
    section4List1: 'Acceso: Conocer qué datos personales tenemos de usted y para qué los utilizamos',
    section4List2: 'Rectificación: Solicitar la corrección de sus datos personales',
    section4List3: 'Cancelación: Solicitar que eliminemos sus datos personales',
    section4List4: 'Oposición: Oponerse al uso de sus datos personales para ciertas finalidades',
    section4Contact: 'Para ejercer sus derechos ARCO, debe presentar su solicitud a través de: contacto@santivilla.com',
    
    section5Title: '5. Datos Sensibles',
    section5Text: 'No recabamos datos personales sensibles (como información sobre origen racial o étnico, estado de salud presente y futuro, información genética, creencias religiosas, filosóficas y morales, afiliación sindical, opiniones políticas, preferencia sexual, etc.).',
    
    section6Title: '6. Uso de Tecnologías de Rastreo',
    section6Text: 'Utilizamos cookies y tecnologías similares. Solo cargamos cookies de análisis con su consentimiento explícito. Puede retirar su consentimiento en cualquier momento.',
    
    section7Title: '7. Modificaciones al Aviso de Privacidad',
    section7Text: 'Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad. Las modificaciones estarán disponibles a través de nuestro sitio web.',
    
    section8Title: '8. Autoridad',
    section8Text: 'Si considera que sus derechos de protección de datos personales han sido lesionados, puede interponer una queja ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).',
    section8Website: 'Sitio web del INAI: www.inai.org.mx',
    
    section9Title: '9. Contacto',
    section9Text: 'Para cualquier duda o comentario relacionado con el tratamiento de sus datos personales, puede contactarnos en:',
    section9Email: 'contacto@santivilla.com',
    
    linkFull: 'Aviso de Privacidad Integral',
    back: 'Volver al inicio',
  },
  en: {
    title: 'Privacy Notice - Mexico',
    subtitle: 'In accordance with the Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP)',
    lastUpdated: 'Last updated: December 2025',
    
    intro: 'Santivilla, with address for purposes of this Law in Mexican territory, is responsible for the processing of your personal data.',
    
    section1Title: '1. Personal Data We Collect',
    section1Text: 'For the purposes stated in this notice, we collect the following personal data:',
    section1List1: 'Username (voluntarily provided)',
    section1List2: 'Payment information (processed through Stripe, we do not store card data)',
    section1List3: 'Browsing data (with your consent)',
    section1List4: 'IP addresses (temporarily in our logs)',
    
    section2Title: '2. Purposes of Processing',
    section2Primary: 'Primary Purposes (necessary for the service):',
    section2PrimaryList1: 'Process your donations',
    section2PrimaryList2: 'Maintain the solidarity ranking',
    section2PrimaryList3: 'Display your name on the public ranking (if provided)',
    section2Secondary: 'Secondary Purposes (service improvement):',
    section2SecondaryList1: 'Improve user experience',
    section2SecondaryList2: 'Statistical analysis of the website (with your consent)',
    
    section3Title: '3. Transfers',
    section3Text: 'Your personal data may be transferred and processed within and outside the country, by persons other than this company, to the following third parties:',
    section3List1: 'Stripe (payment processing) - United States',
    section3List2: 'Supabase (data storage) - United States',
    section3List3: 'Google Analytics (web analytics, only with consent) - United States',
    section3List4: 'Vercel (hosting) - United States',
    section3Consent: 'If you do not express your opposition for your personal data to be transferred, it will be understood that you have given your consent.',
    
    section4Title: '4. ARCO Rights',
    section4Text: 'You have the right to Access, Rectify, Cancel or Oppose the processing of your personal data (ARCO Rights), as well as to revoke the consent you have given us for such purpose.',
    section4List1: 'Access: Know what personal data we have about you and what we use it for',
    section4List2: 'Rectification: Request correction of your personal data',
    section4List3: 'Cancellation: Request that we delete your personal data',
    section4List4: 'Opposition: Oppose the use of your personal data for certain purposes',
    section4Contact: 'To exercise your ARCO rights, you must submit your request through: contacto@santivilla.com',
    
    section5Title: '5. Sensitive Data',
    section5Text: 'We do not collect sensitive personal data (such as information about racial or ethnic origin, present and future health status, genetic information, religious, philosophical and moral beliefs, union affiliation, political opinions, sexual preference, etc.).',
    
    section6Title: '6. Use of Tracking Technologies',
    section6Text: 'We use cookies and similar technologies. We only load analytics cookies with your explicit consent. You can withdraw your consent at any time.',
    
    section7Title: '7. Modifications to Privacy Notice',
    section7Text: 'We reserve the right to make modifications or updates to this privacy notice at any time. Modifications will be available through our website.',
    
    section8Title: '8. Authority',
    section8Text: 'If you believe your personal data protection rights have been violated, you can file a complaint with the National Institute for Transparency, Access to Information and Personal Data Protection (INAI).',
    section8Website: 'INAI website: www.inai.org.mx',
    
    section9Title: '9. Contact',
    section9Text: 'For any questions or comments related to the processing of your personal data, you can contact us at:',
    section9Email: 'contacto@santivilla.com',
    
    linkFull: 'Full Privacy Policy',
    back: 'Back to home',
  },
  de: {
    title: 'Datenschutzhinweis - Mexiko',
    subtitle: 'Gemäß dem Bundesgesetz zum Schutz personenbezogener Daten in Privatbesitz (LFPDPPP)',
    lastUpdated: 'Letzte Aktualisierung: Dezember 2025',
    
    intro: 'Santivilla, mit Adresse für die Zwecke dieses Gesetzes im mexikanischen Hoheitsgebiet, ist verantwortlich für die Verarbeitung Ihrer persönlichen Daten.',
    
    section1Title: '1. Personenbezogene Daten, die wir sammeln',
    section1Text: 'Für die in dieser Mitteilung angegebenen Zwecke sammeln wir folgende personenbezogene Daten:',
    section1List1: 'Benutzername (freiwillig angegeben)',
    section1List2: 'Zahlungsinformationen (über Stripe verarbeitet, wir speichern keine Kartendaten)',
    section1List3: 'Browserdaten (mit Ihrer Zustimmung)',
    section1List4: 'IP-Adressen (temporär in unseren Logs)',
    
    section2Title: '2. Zwecke der Verarbeitung',
    section2Primary: 'Primäre Zwecke (für den Service erforderlich):',
    section2PrimaryList1: 'Ihre Spenden verarbeiten',
    section2PrimaryList2: 'Das Solidaritäts-Ranking führen',
    section2PrimaryList3: 'Ihren Namen im öffentlichen Ranking anzeigen (falls angegeben)',
    section2Secondary: 'Sekundäre Zwecke (Serviceverbesserung):',
    section2SecondaryList1: 'Das Benutzererlebnis verbessern',
    section2SecondaryList2: 'Statistische Analyse der Website (mit Ihrer Zustimmung)',
    
    section3Title: '3. Übertragungen',
    section3Text: 'Ihre personenbezogenen Daten können innerhalb und außerhalb des Landes von Personen außerhalb dieses Unternehmens an folgende Dritte übertragen und verarbeitet werden:',
    section3List1: 'Stripe (Zahlungsabwicklung) - Vereinigte Staaten',
    section3List2: 'Supabase (Datenspeicherung) - Vereinigte Staaten',
    section3List3: 'Google Analytics (Webanalyse, nur mit Zustimmung) - Vereinigte Staaten',
    section3List4: 'Vercel (Hosting) - Vereinigte Staaten',
    section3Consent: 'Wenn Sie Ihrer Übertragung personenbezogener Daten nicht widersprechen, wird davon ausgegangen, dass Sie Ihre Zustimmung erteilt haben.',
    
    section4Title: '4. ARCO-Rechte',
    section4Text: 'Sie haben das Recht auf Zugang, Berichtigung, Löschung oder Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten (ARCO-Rechte) sowie das Recht, die erteilte Zustimmung zu widerrufen.',
    section4List1: 'Zugang: Wissen, welche personenbezogenen Daten wir über Sie haben und wofür wir sie verwenden',
    section4List2: 'Berichtigung: Korrektur Ihrer personenbezogenen Daten anfordern',
    section4List3: 'Löschung: Anfordern, dass wir Ihre personenbezogenen Daten löschen',
    section4List4: 'Widerspruch: Widerspruch gegen die Verwendung Ihrer personenbezogenen Daten für bestimmte Zwecke',
    section4Contact: 'Um Ihre ARCO-Rechte auszuüben, müssen Sie Ihre Anfrage über senden: contacto@santivilla.com',
    
    section5Title: '5. Sensible Daten',
    section5Text: 'Wir sammeln keine sensiblen personenbezogenen Daten (wie Informationen über rassische oder ethnische Herkunft, gegenwärtigen und zukünftigen Gesundheitsstatus, genetische Informationen, religiöse, philosophische und moralische Überzeugungen, Gewerkschaftszugehörigkeit, politische Meinungen, sexuelle Präferenz usw.).',
    
    section6Title: '6. Verwendung von Tracking-Technologien',
    section6Text: 'Wir verwenden Cookies und ähnliche Technologien. Wir laden Analyse-Cookies nur mit Ihrer ausdrücklichen Zustimmung. Sie können Ihre Zustimmung jederzeit widerrufen.',
    
    section7Title: '7. Änderungen am Datenschutzhinweis',
    section7Text: 'Wir behalten uns das Recht vor, diese Datenschutzhinweise jederzeit zu ändern oder zu aktualisieren. Änderungen werden über unsere Website verfügbar sein.',
    
    section8Title: '8. Behörde',
    section8Text: 'Wenn Sie der Ansicht sind, dass Ihre Rechte zum Schutz personenbezogener Daten verletzt wurden, können Sie eine Beschwerde beim Nationalen Institut für Transparenz, Zugang zu Informationen und Schutz personenbezogener Daten (INAI) einreichen.',
    section8Website: 'INAI-Website: www.inai.org.mx',
    
    section9Title: '9. Kontakt',
    section9Text: 'Bei Fragen oder Kommentaren zur Verarbeitung Ihrer personenbezogenen Daten können Sie uns kontaktieren unter:',
    section9Email: 'contacto@santivilla.com',
    
    linkFull: 'Vollständige Datenschutzerklärung',
    back: 'Zur Startseite',
  },
}

export default function AvisoPrivacidadMexicoPage() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const homePath = lang === 'es' ? '/' : `/${lang}`
  const privacyPath = lang === 'es' ? '/privacidad' : `/${lang}/privacidad`

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          href={homePath}
          className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] mb-6 inline-block"
        >
          ← {t.back}
        </Link>
        
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-2">{t.title}</h1>
        <p className="text-lg text-[var(--color-secondary)] mb-2">{t.subtitle}</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-8">{t.lastUpdated}</p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Este es el Aviso de Privacidad Simplificado conforme a la LFPDPPP de México. 
            Para información más detallada, consulte nuestra{' '}
            <Link href={privacyPath} className="underline font-semibold">
              {t.linkFull}
            </Link>.
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-[var(--color-text)] leading-relaxed">{t.intro}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section1Title}</h2>
            <p className="text-[var(--color-text)] mb-2">{t.section1Text}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text)] ml-4">
              <li>{t.section1List1}</li>
              <li>{t.section1List2}</li>
              <li>{t.section1List3}</li>
              <li>{t.section1List4}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section2Title}</h2>
            <div className="space-y-4 text-[var(--color-text)]">
              <div>
                <strong className="block mb-2">{t.section2Primary}</strong>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t.section2PrimaryList1}</li>
                  <li>{t.section2PrimaryList2}</li>
                  <li>{t.section2PrimaryList3}</li>
                </ul>
              </div>
              <div>
                <strong className="block mb-2">{t.section2Secondary}</strong>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t.section2SecondaryList1}</li>
                  <li>{t.section2SecondaryList2}</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section3Title}</h2>
            <p className="text-[var(--color-text)] mb-2">{t.section3Text}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text)] ml-4">
              <li>{t.section3List1}</li>
              <li>{t.section3List2}</li>
              <li>{t.section3List3}</li>
              <li>{t.section3List4}</li>
            </ul>
            <p className="text-[var(--color-text)] mt-3 italic">{t.section3Consent}</p>
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
            <p className="text-[var(--color-text)] mt-4 font-semibold">{t.section4Contact}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section5Title}</h2>
            <p className="text-[var(--color-text)]">{t.section5Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section6Title}</h2>
            <p className="text-[var(--color-text)]">{t.section6Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section7Title}</h2>
            <p className="text-[var(--color-text)]">{t.section7Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section8Title}</h2>
            <p className="text-[var(--color-text)] mb-2">{t.section8Text}</p>
            <p className="text-[var(--color-primary)]">
              <a href="https://www.inai.org.mx" target="_blank" rel="noopener noreferrer" className="hover:underline">
                {t.section8Website}
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section9Title}</h2>
            <p className="text-[var(--color-text)] mb-2">{t.section9Text}</p>
            <p className="text-[var(--color-primary)] font-semibold">
              <a href="mailto:contacto@santivilla.com" className="hover:underline">
                {t.section9Email}
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

