// Página de Aviso Legal
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const translations = {
  es: {
    title: 'Aviso Legal',
    lastUpdated: 'Última actualización: Diciembre 2025',
    intro: 'Este aviso legal regula el uso del sitio web Santivilla.',
    
    section1Title: '1. Datos Identificativos',
    section1Text: 'En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa de los siguientes datos:',
    section1Name: 'Denominación social: Santivilla',
    section1Email: 'Correo electrónico: contacto@santivilla.com',
    section1Website: 'Sitio web: https://santivilla.com',
    
    section2Title: '2. Objeto y Condiciones Generales',
    section2Text: 'El presente aviso legal regula el acceso y uso del sitio web Santivilla. El acceso y uso del sitio web implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este aviso legal.',
    
    section3Title: '3. Propiedad Intelectual e Industrial',
    section3Text: 'Todos los contenidos del sitio web, incluyendo textos, gráficos, logos, iconos, imágenes, así como su diseño y estructura, son propiedad de Santivilla y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.',
    
    section4Title: '4. Limitación de Responsabilidad',
    section4Text: 'Santivilla no se hace responsable de la información y contenidos almacenados en foros, chats, generadores de comentarios, redes sociales o cualquier otro medio que permita a terceros publicar contenidos de forma independiente en la página web.',
    
    section5Title: '5. Protección de Datos',
    section5Text: 'Para información sobre el tratamiento de datos personales, consulta nuestra Política de Privacidad.',
    
    section6Title: '6. Modificaciones',
    section6Text: 'Santivilla se reserva el derecho de realizar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.',
    
    section7Title: '7. Ley Aplicable y Jurisdicción',
    section7Text: 'Este aviso legal se rige por la legislación española. Para cualquier controversia que pueda derivarse del acceso o uso de este sitio web, Santivilla y el usuario se someten a los Juzgados y Tribunales del domicilio del usuario.',
    
    section8Title: '8. Contacto',
    section8Text: 'Para cualquier consulta relacionada con este aviso legal, puedes contactarnos en:',
    section8Email: 'contacto@santivilla.com',
    
    back: 'Volver al inicio',
    privacyLink: 'Política de Privacidad',
  },
  en: {
    title: 'Legal Notice',
    lastUpdated: 'Last updated: December 2025',
    intro: 'This legal notice regulates the use of the Santivilla website.',
    
    section1Title: '1. Identifying Information',
    section1Text: 'In compliance with Law 34/2002, of July 11, on Services of the Information Society and Electronic Commerce, the following information is provided:',
    section1Name: 'Company name: Santivilla',
    section1Email: 'Email: contacto@santivilla.com',
    section1Website: 'Website: https://santivilla.com',
    
    section2Title: '2. Purpose and General Conditions',
    section2Text: 'This legal notice regulates access to and use of the Santivilla website. Access to and use of the website implies full and unreserved acceptance of all provisions included in this legal notice.',
    
    section3Title: '3. Intellectual and Industrial Property',
    section3Text: 'All contents of the website, including texts, graphics, logos, icons, images, as well as their design and structure, are the property of Santivilla and are protected by Spanish and international legislation on intellectual and industrial property.',
    
    section4Title: '4. Limitation of Liability',
    section4Text: 'Santivilla is not responsible for information and content stored in forums, chats, comment generators, social networks or any other means that allows third parties to publish content independently on the website.',
    
    section5Title: '5. Data Protection',
    section5Text: 'For information on the processing of personal data, see our Privacy Policy.',
    
    section6Title: '6. Modifications',
    section6Text: 'Santivilla reserves the right to make without prior notice the modifications it deems appropriate on its portal, being able to change, delete or add both the contents and services provided through it and the way in which they appear presented or located on its portal.',
    
    section7Title: '7. Applicable Law and Jurisdiction',
    section7Text: 'This legal notice is governed by Spanish law. For any dispute that may arise from access to or use of this website, Santivilla and the user submit to the Courts and Tribunals of the user\'s domicile.',
    
    section8Title: '8. Contact',
    section8Text: 'For any questions related to this legal notice, you can contact us at:',
    section8Email: 'contacto@santivilla.com',
    
    back: 'Back to home',
    privacyLink: 'Privacy Policy',
  },
  de: {
    title: 'Impressum',
    lastUpdated: 'Letzte Aktualisierung: Dezember 2025',
    intro: 'Dieses Impressum regelt die Nutzung der Website Santivilla.',
    
    section1Title: '1. Identifikationsdaten',
    section1Text: 'In Übereinstimmung mit dem Gesetz 34/2002 vom 11. Juli über Dienste der Informationsgesellschaft und elektronischen Handel werden folgende Daten mitgeteilt:',
    section1Name: 'Firmenname: Santivilla',
    section1Email: 'E-Mail: contacto@santivilla.com',
    section1Website: 'Website: https://santivilla.com',
    
    section2Title: '2. Zweck und Allgemeine Bedingungen',
    section2Text: 'Dieses Impressum regelt den Zugang und die Nutzung der Website Santivilla. Der Zugang und die Nutzung der Website impliziert die vollständige und vorbehaltlose Annahme aller Bestimmungen, die in diesem Impressum enthalten sind.',
    
    section3Title: '3. Geistiges und Gewerbliches Eigentum',
    section3Text: 'Alle Inhalte der Website, einschließlich Texte, Grafiken, Logos, Symbole, Bilder sowie deren Design und Struktur, sind Eigentum von Santivilla und durch spanische und internationale Gesetze zum geistigen und gewerblichen Eigentum geschützt.',
    
    section4Title: '4. Haftungsbeschränkung',
    section4Text: 'Santivilla übernimmt keine Verantwortung für Informationen und Inhalte, die in Foren, Chats, Kommentargeneratoren, sozialen Netzwerken oder anderen Mitteln gespeichert werden, die Dritten ermöglichen, Inhalte unabhängig auf der Website zu veröffentlichen.',
    
    section5Title: '5. Datenschutz',
    section5Text: 'Für Informationen zur Verarbeitung personenbezogener Daten siehe unsere Datenschutzerklärung.',
    
    section6Title: '6. Änderungen',
    section6Text: 'Santivilla behält sich das Recht vor, ohne vorherige Ankündigung die Änderungen vorzunehmen, die es für angemessen hält, in seinem Portal, wobei es sowohl die Inhalte und Dienste, die darüber bereitgestellt werden, als auch die Art und Weise, wie sie präsentiert oder lokalisiert erscheinen, ändern, löschen oder hinzufügen kann.',
    
    section7Title: '7. Anwendbares Recht und Gerichtsstand',
    section7Text: 'Dieses Impressum unterliegt spanischem Recht. Für Streitigkeiten, die sich aus dem Zugang oder der Nutzung dieser Website ergeben können, unterwerfen sich Santivilla und der Benutzer den Gerichten des Wohnsitzes des Benutzers.',
    
    section8Title: '8. Kontakt',
    section8Text: 'Bei Fragen zu diesem Impressum können Sie uns kontaktieren unter:',
    section8Email: 'contacto@santivilla.com',
    
    back: 'Zur Startseite',
    privacyLink: 'Datenschutzerklärung',
  },
}

export default function AvisoLegalPage() {
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
        
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">{t.title}</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-8">{t.lastUpdated}</p>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-[var(--color-text)] leading-relaxed">{t.intro}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section1Title}</h2>
            <p className="text-[var(--color-text)] mb-2">{t.section1Text}</p>
            <ul className="list-none space-y-2 text-[var(--color-text)] ml-4">
              <li><strong>{t.section1Name}</strong></li>
              <li><strong>{t.section1Email}</strong></li>
              <li><strong>{t.section1Website}</strong></li>
            </ul>
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
            <p className="text-[var(--color-text)]">{t.section4Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section5Title}</h2>
            <p className="text-[var(--color-text)]">
              {t.section5Text}{' '}
              <Link href={privacyPath} className="text-[var(--color-primary)] hover:underline">
                {t.privacyLink}
              </Link>
            </p>
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
            <p className="text-[var(--color-primary)] font-semibold">
              <a href="mailto:contacto@santivilla.com" className="hover:underline">
                {t.section8Email}
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

