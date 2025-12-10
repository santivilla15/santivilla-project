// Página de Política de Privacidad (GDPR Compliant)
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const translations = {
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Diciembre 2025',
    intro: 'En Santivilla nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal de acuerdo con las leyes de protección de datos aplicables, incluyendo el Reglamento General de Protección de Datos (RGPD) de la Unión Europea, la Ley de Privacidad del Consumidor de California (CCPA), la Lei Geral de Proteção de Dados (LGPD) de Brasil, y otras regulaciones aplicables.',
    
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
    
    section8Title: '8. Tus Derechos de Privacidad',
    section8Text: 'Tienes los siguientes derechos respecto a tus datos personales (aplicables según tu jurisdicción):',
    section8List1: 'Derecho de acceso: Puedes solicitar una copia de tus datos personales',
    section8List2: 'Derecho de rectificación: Puedes corregir datos inexactos',
    section8List3: 'Derecho de supresión: Puedes solicitar la eliminación de tus datos',
    section8List4: 'Derecho a la portabilidad: Puedes solicitar una copia de tus datos en formato estructurado',
    section8List5: 'Derecho de oposición: Puedes oponerte al procesamiento de tus datos',
    section8List6: 'Derecho a retirar el consentimiento: Puedes retirar tu consentimiento para cookies en cualquier momento',
    section8Contact: 'Para ejercer estos derechos, contáctanos en: contacto@santivilla.com',
    
    section14Title: '14. Derechos Específicos por Jurisdicción',
    section14Sub1: '14.1. Residentes de California (CCPA)',
    section14Sub1Text: 'Si eres residente de California, tienes derechos adicionales bajo la Ley de Privacidad del Consumidor de California (CCPA):',
    section14Sub1List1: 'Derecho a saber: Puedes solicitar información sobre las categorías de datos personales que recopilamos, las fuentes, el propósito y las categorías de terceros con quienes compartimos tus datos',
    section14Sub1List2: 'Derecho a eliminar: Puedes solicitar la eliminación de tus datos personales (con ciertas excepciones)',
    section14Sub1List3: 'Derecho a opt-out: NO vendemos tus datos personales. Si alguna vez lo hiciéramos, te notificaríamos y proporcionaríamos una forma de opt-out',
    section14Sub1List4: 'Derecho a no discriminación: No te discriminaremos por ejercer tus derechos de privacidad',
    section14Sub1Contact: 'Para ejercer tus derechos bajo CCPA, contáctanos en: contacto@santivilla.com',
    
    section14Sub2: '14.2. Residentes de Brasil (LGPD)',
    section14Sub2Text: 'Si eres residente de Brasil, tienes derechos bajo la Lei Geral de Proteção de Dados (LGPD):',
    section14Sub2List1: 'Confirmación de la existencia de tratamiento de datos',
    section14Sub2List2: 'Acceso a los datos',
    section14Sub2List3: 'Corrección de datos incompletos, inexactos o desactualizados',
    section14Sub2List4: 'Eliminación de datos tratados con consentimiento',
    section14Sub2List5: 'Portabilidad de datos a otro proveedor de servicios',
    section14Sub2List6: 'Información sobre compartir datos con terceros',
    section14Sub2List7: 'Revocación del consentimiento',
    section14Sub2Contact: 'Para ejercer tus derechos bajo LGPD, contáctanos en: contacto@santivilla.com. También puedes contactar a la Autoridade Nacional de Proteção de Dados (ANPD).',
    
    section14Sub3: '14.3. Residentes de Canadá (PIPEDA)',
    section14Sub3Text: 'Si eres residente de Canadá, tus datos están protegidos bajo la Personal Information Protection and Electronic Documents Act (PIPEDA). Tienes derecho a acceder y corregir tus datos personales. Para más información, contacta a la Office of the Privacy Commissioner of Canada.',
    
    section14Sub4: '14.4. Residentes de México (LFPDPPP)',
    section14Sub4Text: 'Si eres residente de México, tus datos están protegidos bajo la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP). Tienes derechos ARCO (Acceso, Rectificación, Cancelación y Oposición). Consulta nuestro',
    section14Sub4Link: 'Aviso de Privacidad Simplificado específico para México',
    section14Sub4LinkPath: '/aviso-privacidad-mexico',
    
    section14Sub5: '14.5. Otras Jurisdicciones',
    section14Sub5Text: 'Reconocemos y respetamos las leyes de protección de datos de otras jurisdicciones, incluyendo:',
    section14Sub5List1: 'Singapur: Personal Data Protection Act (PDPA)',
    section14Sub5List2: 'Japón: Act on the Protection of Personal Information (APPI)',
    section14Sub5List3: 'India: Digital Personal Data Protection Act (DPDPA)',
    section14Sub5List4: 'Sudáfrica: Protection of Personal Information Act (POPIA)',
    section14Sub5List5: 'Argentina: Ley 25.326 de Protección de Datos Personales',
    section14Sub5List6: 'Chile: Ley 19.628 sobre Protección de Datos Personales',
    section14Sub5Contact: 'Si tienes preguntas sobre tus derechos específicos según tu ubicación, contáctanos.',
    
    section15Title: '15. No Vendemos tus Datos Personales',
    section15Text: 'Santivilla NO vende, alquila ni comercializa tus datos personales a terceros. No compartimos tus datos con fines comerciales de terceros. Solo compartimos datos limitados con proveedores de servicios esenciales (como Stripe para pagos, Supabase para almacenamiento, y Google Analytics para análisis del sitio web con tu consentimiento) que están obligados contractualmente a proteger tus datos.',
    
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
    intro: 'At Santivilla we are committed to protecting your privacy. This policy explains how we collect, use and protect your personal information in accordance with applicable data protection laws, including the European Union General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), Brazil\'s Lei Geral de Proteção de Dados (LGPD), and other applicable regulations.',
    
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
    
    section8Title: '8. Your Privacy Rights',
    section8Text: 'You have the following rights regarding your personal data (applicable depending on your jurisdiction):',
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
    
    section14Title: '14. Jurisdiction-Specific Rights',
    section14Sub1: '14.1. California Residents (CCPA)',
    section14Sub1Text: 'If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):',
    section14Sub1List1: 'Right to know: You can request information about the categories of personal data we collect, sources, purpose, and categories of third parties with whom we share your data',
    section14Sub1List2: 'Right to delete: You can request deletion of your personal data (with certain exceptions)',
    section14Sub1List3: 'Right to opt-out: We do NOT sell your personal data. If we ever did, we would notify you and provide a way to opt-out',
    section14Sub1List4: 'Right to non-discrimination: We will not discriminate against you for exercising your privacy rights',
    section14Sub1Contact: 'To exercise your rights under CCPA, contact us at: contacto@santivilla.com',
    
    section14Sub2: '14.2. Brazil Residents (LGPD)',
    section14Sub2Text: 'If you are a Brazil resident, you have rights under the Lei Geral de Proteção de Dados (LGPD):',
    section14Sub2List1: 'Confirmation of the existence of data processing',
    section14Sub2List2: 'Access to data',
    section14Sub2List3: 'Correction of incomplete, inaccurate or outdated data',
    section14Sub2List4: 'Deletion of data processed with consent',
    section14Sub2List5: 'Data portability to another service provider',
    section14Sub2List6: 'Information about sharing data with third parties',
    section14Sub2List7: 'Revocation of consent',
    section14Sub2Contact: 'To exercise your rights under LGPD, contact us at: contacto@santivilla.com. You may also contact the Autoridade Nacional de Proteção de Dados (ANPD).',
    
    section14Sub3: '14.3. Canada Residents (PIPEDA)',
    section14Sub3Text: 'If you are a Canada resident, your data is protected under the Personal Information Protection and Electronic Documents Act (PIPEDA). You have the right to access and correct your personal data. For more information, contact the Office of the Privacy Commissioner of Canada.',
    
    section14Sub4: '14.4. Mexico Residents (LFPDPPP)',
    section14Sub4Text: 'If you are a Mexico resident, your data is protected under the Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP). You have ARCO rights (Access, Rectification, Cancellation, and Opposition). See our',
    section14Sub4Link: 'Simplified Privacy Notice specific to Mexico',
    section14Sub4LinkPath: '/en/aviso-privacidad-mexico',
    
    section14Sub5: '14.5. Other Jurisdictions',
    section14Sub5Text: 'We recognize and respect data protection laws in other jurisdictions, including:',
    section14Sub5List1: 'Singapore: Personal Data Protection Act (PDPA)',
    section14Sub5List2: 'Japan: Act on the Protection of Personal Information (APPI)',
    section14Sub5List3: 'India: Digital Personal Data Protection Act (DPDPA)',
    section14Sub5List4: 'South Africa: Protection of Personal Information Act (POPIA)',
    section14Sub5List5: 'Argentina: Law 25.326 on Personal Data Protection',
    section14Sub5List6: 'Chile: Law 19.628 on Personal Data Protection',
    section14Sub5Contact: 'If you have questions about your specific rights based on your location, contact us.',
    
    section15Title: '15. We Do Not Sell Your Personal Data',
    section15Text: 'Santivilla does NOT sell, rent, or trade your personal data to third parties. We do not share your data for third-party commercial purposes. We only share limited data with essential service providers (such as Stripe for payments, Supabase for storage, and Google Analytics for website analytics with your consent) who are contractually obligated to protect your data.',
    
    back: 'Back to home',
  },
  de: {
    title: 'Datenschutzerklärung',
    lastUpdated: 'Letzte Aktualisierung: Dezember 2025',
    intro: 'Bei Santivilla sind wir verpflichtet, Ihre Privatsphäre zu schützen. Diese Richtlinie erklärt, wie wir Ihre persönlichen Daten gemäß den geltenden Datenschutzgesetzen sammeln, verwenden und schützen, einschließlich der Datenschutz-Grundverordnung (DSGVO) der Europäischen Union, dem California Consumer Privacy Act (CCPA), dem Lei Geral de Proteção de Dados (LGPD) von Brasilien und anderen geltenden Vorschriften.',
    
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
    
    section8Title: '8. Ihre Datenschutzrechte',
    section8Text: 'Sie haben folgende Rechte bezüglich Ihrer persönlichen Daten (je nach Ihrer Gerichtsbarkeit anwendbar):',
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
    
    section14Title: '14. Gerichtsspezifische Rechte',
    section14Sub1: '14.1. Kalifornische Einwohner (CCPA)',
    section14Sub1Text: 'Wenn Sie Einwohner von Kalifornien sind, haben Sie zusätzliche Rechte unter dem California Consumer Privacy Act (CCPA):',
    section14Sub1List1: 'Recht zu wissen: Sie können Informationen über die Kategorien personenbezogener Daten anfordern, die wir sammeln, Quellen, Zweck und Kategorien von Dritten, mit denen wir Ihre Daten teilen',
    section14Sub1List2: 'Recht auf Löschung: Sie können die Löschung Ihrer personenbezogenen Daten anfordern (mit bestimmten Ausnahmen)',
    section14Sub1List3: 'Recht auf Opt-out: Wir verkaufen Ihre personenbezogenen Daten NICHT. Falls wir dies jemals täten, würden wir Sie benachrichtigen und eine Möglichkeit zum Opt-out bieten',
    section14Sub1List4: 'Recht auf Nichtdiskriminierung: Wir werden Sie nicht diskriminieren, wenn Sie Ihre Datenschutzrechte ausüben',
    section14Sub1Contact: 'Um Ihre Rechte unter CCPA auszuüben, kontaktieren Sie uns unter: contacto@santivilla.com',
    
    section14Sub2: '14.2. Brasilianische Einwohner (LGPD)',
    section14Sub2Text: 'Wenn Sie Einwohner von Brasilien sind, haben Sie Rechte unter dem Lei Geral de Proteção de Dados (LGPD):',
    section14Sub2List1: 'Bestätigung der Existenz der Datenverarbeitung',
    section14Sub2List2: 'Zugang zu Daten',
    section14Sub2List3: 'Korrektur unvollständiger, ungenauer oder veralteter Daten',
    section14Sub2List4: 'Löschung von mit Zustimmung verarbeiteten Daten',
    section14Sub2List5: 'Datenübertragbarkeit an einen anderen Dienstanbieter',
    section14Sub2List6: 'Informationen über die Weitergabe von Daten an Dritte',
    section14Sub2List7: 'Widerruf der Zustimmung',
    section14Sub2Contact: 'Um Ihre Rechte unter LGPD auszuüben, kontaktieren Sie uns unter: contacto@santivilla.com. Sie können sich auch an die Autoridade Nacional de Proteção de Dados (ANPD) wenden.',
    
    section14Sub3: '14.3. Kanadische Einwohner (PIPEDA)',
    section14Sub3Text: 'Wenn Sie Einwohner von Kanada sind, sind Ihre Daten unter dem Personal Information Protection and Electronic Documents Act (PIPEDA) geschützt. Sie haben das Recht, auf Ihre personenbezogenen Daten zuzugreifen und diese zu korrigieren. Für weitere Informationen kontaktieren Sie das Office of the Privacy Commissioner of Canada.',
    
    section14Sub4: '14.4. Mexikanische Einwohner (LFPDPPP)',
    section14Sub4Text: 'Wenn Sie Einwohner von Mexiko sind, sind Ihre Daten unter dem Bundesgesetz zum Schutz personenbezogener Daten in Privatbesitz (LFPDPPP) geschützt. Sie haben ARCO-Rechte (Zugang, Berichtigung, Löschung und Widerspruch). Sehen Sie unser',
    section14Sub4Link: 'Vereinfachter Datenschutzhinweis speziell für Mexiko',
    section14Sub4LinkPath: '/de/aviso-privacidad-mexico',
    
    section14Sub5: '14.5. Andere Gerichtsbarkeiten',
    section14Sub5Text: 'Wir erkennen und respektieren Datenschutzgesetze in anderen Gerichtsbarkeiten an, einschließlich:',
    section14Sub5List1: 'Singapur: Personal Data Protection Act (PDPA)',
    section14Sub5List2: 'Japan: Act on the Protection of Personal Information (APPI)',
    section14Sub5List3: 'Indien: Digital Personal Data Protection Act (DPDPA)',
    section14Sub5List4: 'Südafrika: Protection of Personal Information Act (POPIA)',
    section14Sub5List5: 'Argentinien: Gesetz 25.326 zum Schutz personenbezogener Daten',
    section14Sub5List6: 'Chile: Gesetz 19.628 zum Schutz personenbezogener Daten',
    section14Sub5Contact: 'Wenn Sie Fragen zu Ihren spezifischen Rechten basierend auf Ihrem Standort haben, kontaktieren Sie uns.',
    
    section15Title: '15. Wir verkaufen Ihre personenbezogenen Daten nicht',
    section15Text: 'Santivilla verkauft, vermietet oder tauscht Ihre personenbezogenen Daten nicht an Dritte. Wir teilen Ihre Daten nicht für kommerzielle Zwecke Dritter. Wir teilen nur begrenzte Daten mit wesentlichen Dienstanbietern (wie Stripe für Zahlungen, Supabase für Speicherung und Google Analytics für Website-Analysen mit Ihrer Zustimmung), die vertraglich verpflichtet sind, Ihre Daten zu schützen.',
    
    back: 'Zur Startseite',
  },
}

export default function PrivacidadPage() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/de') ? 'de' : 'es'
  const t = translations[lang]
  const homePath = lang === 'es' ? '/' : `/${lang}`
  const mexicoPrivacyPath = lang === 'es' ? '/aviso-privacidad-mexico' : `/${lang}/aviso-privacidad-mexico`

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

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section14Title}</h2>
            
            <div className="space-y-6 text-[var(--color-text)]">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">{t.section14Sub1}</h3>
                <p className="mb-2">{t.section14Sub1Text}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t.section14Sub1List1}</li>
                  <li>{t.section14Sub1List2}</li>
                  <li>{t.section14Sub1List3}</li>
                  <li>{t.section14Sub1List4}</li>
                </ul>
                <p className="mt-3 font-semibold">{t.section14Sub1Contact}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">{t.section14Sub2}</h3>
                <p className="mb-2">{t.section14Sub2Text}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t.section14Sub2List1}</li>
                  <li>{t.section14Sub2List2}</li>
                  <li>{t.section14Sub2List3}</li>
                  <li>{t.section14Sub2List4}</li>
                  <li>{t.section14Sub2List5}</li>
                  <li>{t.section14Sub2List6}</li>
                  <li>{t.section14Sub2List7}</li>
                </ul>
                <p className="mt-3 font-semibold">{t.section14Sub2Contact}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">{t.section14Sub3}</h3>
                <p className="mb-2">{t.section14Sub3Text}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">{t.section14Sub4}</h3>
                <p className="mb-2">
                  {t.section14Sub4Text}{' '}
                  <Link href={mexicoPrivacyPath} className="text-[var(--color-primary)] hover:underline font-semibold">
                    {t.section14Sub4Link}
                  </Link>.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">{t.section14Sub5}</h3>
                <p className="mb-2">{t.section14Sub5Text}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t.section14Sub5List1}</li>
                  <li>{t.section14Sub5List2}</li>
                  <li>{t.section14Sub5List3}</li>
                  <li>{t.section14Sub5List4}</li>
                  <li>{t.section14Sub5List5}</li>
                  <li>{t.section14Sub5List6}</li>
                </ul>
                <p className="mt-3">{t.section14Sub5Contact}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t.section15Title}</h2>
            <p className="text-[var(--color-text)]">{t.section15Text}</p>
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

