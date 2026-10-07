/**
 * TEXTOS LEGALES — literal de los documentos Word que entregó el cliente.
 *
 * - Aviso legal, Política de privacidad y Política de cookies: versión del
 *   05/10/2026 (`TEXTOS WEB VIRENS`, recibida el 07/10/2026). Sustituye a la del
 *   29/09/2026. Solo se ha normalizado el formato (títulos de apartado en
 *   minúscula de frase, listas) y se han puesto los enlaces donde el documento
 *   dice «[HIPERENLAZAR]».
 * - Condiciones generales de venta: versión del 29/09/2026, sin cambios.
 *
 * Lo que NO se publica del documento del cliente (pendiente de que lo complete,
 * anotado en `site.pendingClientConfirmation`):
 * - Aviso legal: «Sección __» del Registro Mercantil. Tomo, Folio y Hoja los dio
 *   el cliente el 07/10/2026 (Tomo 38911, Folio 45, Hoja B 331705), sin Sección.
 * - Privacidad: el apartado «Complementos y herramientas del sitio web ›
 *   Notificaciones push», que es de plantilla: la web no envía notificaciones.
 * - Cookies: la nota interna para el redactor, el aviso emergente (capa 1: la
 *   web no instala cookies, así que no hace falta) y la tabla de cookies, que
 *   llega vacía; en su lugar va una frase propia (`rewritten`) que lo dice.
 *
 * Única corrección de texto: en el aviso legal, «si LABORATORIOS VIRENS, S.L
 * tuviera de que…» → «tuviera conocimiento de que…» (falta la palabra).
 *
 * Enlaces dentro del texto: `[texto](/ruta)`; los correos se enlazan solos.
 */
export type LegalKey = 'legalNotice' | 'privacy' | 'cookies' | 'sales';
export type LegalBlock =
  | string
  | { readonly ordered: boolean; readonly list: readonly string[]; /** Viñetas «a) b) c)» en vez de «1. 2. 3.». */ readonly alpha?: boolean }
  /** Subapartado dentro de un apartado (h3). */
  | { readonly subheading: string };
export interface LegalSection { readonly heading: string; readonly body: readonly LegalBlock[] }
export interface LegalDoc {
  readonly key: LegalKey;
  readonly title: string;
  /** Rótulo corto para el pie y las pestañas. */
  readonly nav: string;
  readonly description: string;
  /** Párrafos previos al primer apartado. */
  readonly intro?: readonly string[];
  readonly sections: readonly LegalSection[];
  /** Pie del documento («Última revisión…»). */
  readonly revised?: string;
}

export const legalUi = {
  eyebrow: 'Documentación',
  toc: 'Contenido',
  docsAria: 'Documentos legales',
  company: 'Laboratorios Virens S.L.',
} as const;

const PRIVACY = '/legal/politica-de-privacidad';

export const legalDocs: readonly LegalDoc[] = [
  {
    key: 'legalNotice',
    title: "Aviso legal",
    nav: "Aviso legal",
    description: "Aviso legal de Laboratorios Virens S.L.: datos identificativos y condiciones de uso del sitio web.",
    intro: [
      "De conformidad con lo establecido en la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico, se facilita la siguiente información:",
    ],
    sections: [
      {
        heading: "Datos identificativos",
        body: [
        "Usted está visitando la página web www.lvirens.com titularidad de LABORATORIOS VIRENS, S.L, con domicilio social en C/ Industria 48, Polig. Ind. Nord-Est (08740 Sant Andreu De La Barca) Barcelona, con NIF B64294473, inscrita en el Registro Mercantil de Barcelona, en el Tomo 38911, Folio 45, Hoja B 331705. En adelante, el TITULAR.",
        "Puede contactar con el Titular por cualquiera de los siguientes medios:",
        { ordered: false, list: [
            "Teléfono: 936828972",
            "Correo electrónico de contacto: cgestion@lvirens.com",
          ] },
        ],
      },
      {
        heading: "Usuarios",
        body: [
        "Mediante el presente documento ponemos en su conocimiento los términos y condiciones que regulan el uso del sitio web y/o app del Titular, así como de los servicios y contenidos asociados. Dicho uso implica la adquisición de la condición de “usuario” y, con dicha condición, una serie de derechos y obligaciones.",
        "A los efectos anteriormente descritos, le informamos que es de su responsabilidad acceder a las condiciones legales insertas en la presente web, así como, a las políticas de privacidad, cookies o en su caso, condiciones de venta y leerlas detenidamente. Recomendamos:",
        { ordered: false, list: [
            "Que visite las mismas cada vez que pretenda acceder o utilizar los servicios y contenidos del sitio y",
            "Que imprima o almacene en su sistema una copia.",
          ] },
        ],
      },
      {
        heading: "Uso del portal",
        body: [
        "Esta web proporciona el acceso a multitud de información, servicios, programas o datos (en adelante, “los contenidos”) en Internet pertenecientes a el Titular o a sus licenciantes a los que el Usuario puede tener acceso.",
        "El Usuario asume la responsabilidad del uso del portal en los términos que mediante la presente se establecen. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. En dicho registro, el Usuario será responsable de aportar información veraz y lícita. Como consecuencia de este registro, al Usuario se le puede proporcionar una contraseña de la que será asimismo responsable, comprometiéndose a hacer un uso diligente y confidencial de la misma.",
        "El Usuario se compromete a hacer un uso adecuado de los contenidos y servicios (por ejemplo, servicios de chat, foros de discusión o grupos de noticias) que el Titular ofrece a través de su portal y, con carácter enunciativo, pero no limitativo, a no emplearlos para:",
        { ordered: false, list: [
            "Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.",
            "Difundir contenidos o propaganda racista, xenófoba, pornográfico-ilegal, de apología del terrorismo o atentatoria contra los derechos humanos.",
            "Provocar daños en los sistemas físicos y lógicos del Titular, de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados.",
            "Intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes.",
            "Utilizar el sitio web ni las informaciones que en él se contienen con fines comerciales, políticos, publicitarios y para cualquier uso comercial, sobre todo en el envío de correos electrónicos no solicitados.",
          ] },
        "El Titular se reserva el derecho a retirar todos aquellos comentarios y aportaciones que vulneren el respeto a la dignidad de la persona, que sean discriminatorios, xenófobos, racistas, pornográficos, que atenten contra la juventud o la infancia, el orden o la seguridad pública o que, a su juicio, no resultarán adecuados para su publicación. En cualquier caso, el Titular no será responsable de las opiniones vertidas por los usuarios a través de los foros, chats, u otras herramientas de participación.",
        ],
      },
      {
        heading: "Protección de datos",
        body: [
        `Todo lo relativo al tratamiento de sus datos personales se encuentra recogido en la [Política de privacidad](${PRIVACY}).`,
        ],
      },
      {
        heading: "Contenidos. Propiedad intelectual e industrial",
        body: [
        "El Titular es propietario de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: imágenes, fotografías, sonido, audio, vídeo, software o textos, marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad del Titular o bien de sus licenciantes.",
        "Todos los derechos reservados. En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización del Titular.",
        ],
      },
      {
        heading: "Exclusión de garantías y responsabilidad",
        body: [
        "El Usuario reconoce que la utilización de la página web y de sus contenidos y servicios se desarrolla bajo su exclusiva responsabilidad. En concreto, a título meramente enunciativo, el Titular no asume ninguna responsabilidad en los siguientes ámbitos:",
        { ordered: false, list: [
            "La disponibilidad del funcionamiento de la página web, sus servicios y contenidos y su calidad o interoperabilidad.",
            "La finalidad para la que la página web sirva a los objetivos del Usuario.",
            "La infracción de la legislación vigente por parte del Usuario o terceros y, en concreto, de los derechos de propiedad intelectual e industrial que sean titularidad de otras personas o entidades.",
            "La existencia de códigos maliciosos o cualquier otro elemento informático dañino que pudiera causar el sistema informático del Usuario o de terceros. La entidad toma medidas para proteger el sitio web frente a ciberataques. No obstante, no puede garantizar que no se vayan a producir accesos no autorizados por parte de terceros. Por ello, corresponde al Usuario disponer de herramientas adecuadas para la detección y desinfección de estos elementos.",
            "El acceso fraudulento a los contenidos o servicios por terceros no autorizados o, en su caso, la captura, eliminación, alteración, modificación o manipulación de los mensajes y comunicaciones de cualquier clase que dichos terceros pudiera realizar.",
            "Los daños producidos a equipos informáticos durante el acceso a la página web y los daños producidos a los Usuarios cuando tengan su origen en fallos o desconexiones en las redes de telecomunicaciones que interrumpan el servicio.",
            "Los daños o perjuicios que se deriven de circunstancias acaecidas por caso fortuito o fuerza mayor.",
            "En caso de que existan foros, el uso de los mismos u otros espacios análogos, ha de tenerse en cuenta que los mensajes reflejan únicamente la opinión del Usuario que los remite, siendo este el único responsable de los mismos. En consecuencia, el Titular no se hace responsable del contenido de los mensajes enviados por el Usuario.",
          ] },
        ],
      },
      {
        heading: "Modificación de este aviso legal y duración",
        body: [
        "El Titular se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tantos contenidos y servicios que se presten a través de la misma, como la forma en la que estos aparezcan representados o localizados en su portal.",
        "La vigencia de las citadas condiciones irá en función de su exposición y estarán vigentes hasta que sean modificadas por otras debidamente publicadas.",
        ],
      },
      {
        heading: "Enlaces",
        body: [
        "En el caso de que en www.lvirens.com se incluyesen enlaces o hipervínculos hacia otros sitios de Internet, el Titular no ejercerá ningún tipo de control sobre dichos sitios y contenidos ni asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier materia o información contenida en ninguno de dichos hipervínculos y otros sitios en Internet. Igualmente, la inclusión de estas conexiones externas no implicará ningún tipo de asociación, fusión o participación con las entidades conectadas. No obstante, lo anterior, si LABORATORIOS VIRENS, S.L tuviera conocimiento de que la actividad o la información a la se remite o recomienda es ilícita, o de que lesiona bienes o derechos de un tercero susceptibles de indemnización, se suprimirán dichos datos o se inutilizará el enlace correspondiente.",
        ],
      },
      {
        heading: "Derechos de exclusión",
        body: [
        "El Titular se reserva el derecho a denegar o retirar el acceso al portal y/o los servicios ofrecidos sin necesidad de advertencia previa, a instancia propia o de un tercero, a aquellos usuarios que incumplan el contenido de este Aviso Legal.",
        ],
      },
      {
        heading: "Generalidades",
        body: [
        "El Titular perseguirá el incumplimiento de las presentes condiciones, así como cualquier utilización indebida de su portal ejerciendo todas las acciones civiles y penales que le puedan corresponder en derecho.",
        ],
      },
      {
        heading: "Legislación aplicable y jurisdicción",
        body: [
        "La relación entre el Titular y el Usuario se regirá por la normativa española vigente. Todas las disputas y reclamaciones derivadas de este aviso legal se resolverán por los juzgados y tribunales españoles del consumidor y usuario que resulten competentes.",
        ],
      },
      {
        heading: "Menores de edad",
        body: [
        "Esta web dirige sus servicios a usuarios mayores de 18 años. Los menores de esta edad no están autorizados a utilizar nuestros servicios y no deberán, por tanto, enviarnos sus datos personales. Informamos de que, si se da tal circunstancia, el Titular no se hace responsable de las posibles consecuencias que pudieran derivarse del incumplimiento del aviso que en esta misma cláusula se establece.",
        ],
      },
      {
        heading: "Medidas de seguridad - SSL",
        body: [
        "El Titular ha contratado para su sitio web un certificado SSL («Secure Sockets Layer»). Dicho certificado SSL permite proteger toda la información personal y confidencial que se pueda manejar en un sitio web, independientemente de la información que se esté transmitiendo como, por ejemplo, desde cualquiera de los formularios de contacto del sitio web hasta el servidor o los datos introducidos para la suscripción de boletines de noticias, accesos a las áreas protegidas, etc.",
        "La dirección del sitio web aparecerá en color verde, activándose el protocolo “https” que permite conexiones seguras desde un servidor web al navegador del usuario.",
        ],
      },
    ],
    revised: "Última revisión 05 de Octubre de 2026",
  },
  {
    key: 'privacy',
    title: "Política de privacidad",
    nav: "Política de privacidad",
    description: "Política de privacidad de Laboratorios Virens S.L. conforme al RGPD y la LOPDGDD.",
    intro: [
      "El objetivo de esta política es informar a los interesados acerca de los distintos tratamientos realizados por esta organización mediante la página web y que afecten a sus datos personales, de conformidad con lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 y en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales.",
    ],
    sections: [
      {
        heading: "Identificación y datos de contacto del responsable",
        body: [
        "LABORATORIOS VIRENS, S.L, domiciliada en C/ Industria 48, Polig. Ind. Nord-Est (08740 Sant Andreu De La Barca) Barcelona, con NIF B64294473, teléfono de contacto 936828972 y correo electrónico cgestion@lvirens.com",
        ],
      },
      {
        heading: "Finalidades del tratamiento de sus datos personales",
        body: [
        { subheading: "Usuarios/navegantes de la página web del responsable" },
        "Trataremos los datos de carácter personal facilitados para:",
        { ordered: false, list: [
            "Atender a las solicitudes, quejas e incidencias trasladadas a través de nuestros canales de contacto incorporados en la página web.",
            "Entender el comportamiento del navegante dentro de la web con el fin de detectar posibles ataques informáticos a nuestra web.",
            "Cumplir con las obligaciones legales que nos resulten directamente aplicables y regulen nuestra actividad.",
            "Proteger y ejercer nuestros derechos o responder ante reclamaciones de cualquier índole.",
            "En su caso, envío de comunicaciones comerciales relativas a los bienes o servicios que conforman nuestra actividad y/o noticias o boletines relacionados con nuestro sector. Su negativa a facilitarnos la autorización implicará la imposibilidad de enviarle información por parte de la entidad.",
            "En su caso, gestionar su participación en concursos y promociones que realice la entidad. Su negativa a facilitarnos la autorización implicará la imposibilidad de participar.",
            "En su caso, enviar encuestas de satisfacción y/o calidad. Su negativa a facilitarnos la autorización implicará la imposibilidad de evaluar el servicio prestado.",
          ] },
        { subheading: "Candidatos a ofertas de trabajo o postulantes a empleo" },
        "Además de las finalidades señaladas en el apartado «usuarios/navegantes de la página web», trataremos sus datos de carácter personal facilitados para:",
        { ordered: false, list: [
            "Gestionar su candidatura en el proceso de selección e informarle sobre el mismo.",
          ] },
        ],
      },
      {
        heading: "Base jurídica del tratamiento",
        body: [
        { subheading: "Usuarios/navegantes de la página web del responsable" },
        { ordered: false, list: [
            "En el consentimiento que nos has prestado para tratar tus datos con las finalidades indicadas. La negativa a facilitar sus datos personales conllevara la imposibilidad de tratar sus datos con las finalidades mencionadas.",
            "Para cumplir con las obligaciones legales que se nos aplican. En este caso, el interesado no podrá negarse al tratamiento de los datos personales.",
            "En nuestro interés legítimo de proteger nuestra imagen, negocio y trayectoria evitando ataques a nuestra página web. En este caso, el interesado no podrá negarse al tratamiento de los datos personales, aunque podrá ejercer, en su caso, los derechos reconocidos en el apartado «derechos» de la presente política.",
          ] },
        { subheading: "Candidatos a ofertas de trabajo o postulantes a empleo" },
        { ordered: false, list: [
            "En el consentimiento que nos has prestado para tratar tus datos con las finalidades indicadas. La negativa a facilitar sus datos personales conllevara la imposibilidad de tratar sus datos con las finalidades mencionadas.",
            "Para cumplir con las obligaciones legales que se nos aplican. En este caso, el interesado no podrá negarse al tratamiento de los datos personales.",
            "En nuestro interés legítimo de proteger nuestra imagen, negocio y trayectoria evitando ataques a nuestra página web. En este caso, el interesado no podrá negarse al tratamiento de los datos personales, aunque podrá ejercer, en su caso, los derechos reconocidos en el apartado «derechos» de la presente política.",
          ] },
        ],
      },
      {
        heading: "Plazos o criterios de conservación de los datos",
        body: [
        "Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con las finalidades para los que fueron recopilados inicialmente.",
        "Una vez que los datos dejen de ser necesarios para el tratamiento en cuestión, estos se mantendrán debidamente bloqueados para, en su caso, ponerlos a disposición de las Administraciones y Organismos Públicas competentes, Jueces y Tribunales o el Ministerio Fiscal, durante el plazo de prescripción de las acciones que pudieran derivarse de la relación mantenida con el cliente y/o los plazos de conservación previstos legalmente.",
        "En el caso de que nos haya facilitado su currículum, conservaremos sus datos durante un periodo máximo de dos años desde la recepción del mismo, momento en el que procederemos a su supresión, salvo que haya procedido a actualizar sus datos o nos haya autorizado a mantenerlos por un periodo de conservación mayor al indicado. A los efectos oportunos, le informamos que puede revocar su consentimiento en cualquier momento.",
        ],
      },
      {
        heading: "Decisiones automatizadas y elaboración de perfiles",
        body: [
        "La página web no toma decisiones automatizadas ni elabora perfiles.",
        ],
      },
      {
        heading: "Destinatarios",
        body: [
        "Durante el periodo de duración del tratamiento de sus datos personales, la organización podrá ceder sus datos a los siguientes destinatarios:",
        { ordered: false, list: [
            "Jueces y Tribunales.",
            "Fuerzas y Cuerpos de Seguridad del Estado.",
            "Otras autoridades u organismos públicos competentes, cuando el responsable tenga la obligación legal de facilitar los datos personales.",
          ] },
        ],
      },
      {
        heading: "Transferencias internacionales de datos",
        body: [
        "La organización no realiza Transferencia Internacional de Datos alguna. En caso de que posteriormente fuera necesario realizar transferencias internacionales de datos, se verificará el grado de protección del país de destino y se adoptarán las garantías exigidas por la normativa.",
        ],
      },
      {
        heading: "Redes sociales",
        body: [
        "Con la finalidad de hacerle partícipe de nuestra actividad, y de que pueda estar al tanto de nuestras novedades, le informamos de que LABORATORIOS VIRENS, S.L tiene creado un perfil en las Redes Sociales.",
        "Todos los usuarios tienen la oportunidad de unirse a nuestras redes sociales o grupos. Sin embargo, debe tener en cuenta que, salvo que le solicitemos sus datos directamente (por ejemplo, mediante acciones de marketing, concursos, promociones, o cualquier otra forma válida), sus datos pertenecerán a la Red Social correspondiente, por lo que le recomendamos que lea detenidamente sus condiciones de uso y políticas de privacidad, así como, se asegure de configurar sus preferencias en cuanto al tratamiento de los datos.",
        "A continuación, detallamos el enlace a la política de privacidad a las distintas Redes Sociales en las que tenemos presencia, para que pueda acceder en todo momento a las políticas de privacidad y configurar su perfil para garantizar su privacidad:",
        { ordered: false, list: [
            "LinkedIN: [https://es.linkedin.com/legal/privacy-policy](https://es.linkedin.com/legal/privacy-policy)",
          ] },
        ],
      },
      {
        heading: "Derechos",
        body: [
        "Los interesados podrán solicitar más información acerca del tratamiento de sus datos personales así como ejercer en cualquier momento y, de forma gratuita, los derechos de acceso, rectificación y supresión, así como solicitar que se limite el tratamiento de sus datos personales, oponerse al mismo, solicitar la portabilidad de estos (siempre que sea técnicamente posible) o retirar el consentimiento prestado y, en su caso, a no ser objeto de una decisión basada únicamente en un tratamiento automatizado, incluido la elaboración de perfiles.",
        "Para ello podrá emplear los formularios habilitados por la organización, o bien dirigir un escrito a la dirección postal o correo electrónico referenciados en el encabezamiento. A los efectos oportunos, le informamos que se le podrá solicitar su DNI o cualquier otro documento análogo, con la finalidad de acreditar su identidad, siempre que ello no pueda realizarse por otros medios menos intrusivos.",
        "En caso de que sienta vulnerados sus derechos en lo concerniente a la protección de sus datos personales, especialmente cuando no haya obtenido satisfacción en el ejercicio de sus derechos, puede presentar una reclamación ante la Autoridad de Control en materia de Protección de Datos competente (Agencia Española de Protección de Datos), a través de su sitio web [www.aepd.es](https://www.aepd.es)",
        "En cumplimiento de lo dispuesto en el artículo 21 de la Ley 34/2002 de servicios de la sociedad de la información y comercio electrónico, si usted no desea recibir más información sobre nuestros servicios, puede darse de baja enviando un correo electrónico a la dirección cgestion@lvirens.com, con asunto “BAJAS”",
        ],
      },
      {
        heading: "Veracidad de los datos",
        body: [
        "El interesado garantiza que los datos aportados son verdaderos, exactos, completos y se encuentran actualizados; comprometiéndose a informar de cualquier cambio respecto de los datos que aportara, por los canales habilitados al efecto e indicados en el punto uno de la presente política. Será responsable de cualquier daño o perjuicio, tanto directo como indirecto, que pudiera ocasionar como consecuencia del incumplimiento de la presente obligación.",
        "En el supuesto de que el usuario facilite datos de terceros, declara que cuenta con el consentimiento de los interesados y se compromete a trasladarle la información contenida en esta cláusula, eximiendo a la organización de cualquier responsabilidad derivada por la falta de cumplimiento de la presente obligación.",
        ],
      },
      {
        heading: "Modificaciones y actualización",
        body: [
        "La presente política de privacidad puede verse modificada/actualizada en función de las exigencias legales establecidas o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos, o a consecuencia de cambios en nuestro sitio web. Por esta razón, aconsejamos a los usuarios que visiten periódicamente nuestra Política de Privacidad.",
        "Si tiene dudas acerca de esta política, puede contactar con LABORATORIOS VIRENS, S.L a través de los formularios habilitados por la organización, o bien dirigir un escrito a la dirección postal o correo electrónico referenciados en el encabezamiento.",
        ],
      },
    ],
    revised: "Última revisión 05 de Octubre de 2026",
  },
  {
    key: 'cookies',
    title: "Política de cookies",
    nav: "Política de cookies",
    description: "Política de cookies de Laboratorios Virens S.L.: qué son las cookies y cuáles utiliza este sitio web.",
    sections: [
      {
        heading: "Uso de cookies. ¿Qué son las cookies?",
        body: [
        "Las cookies son ficheros que se descargan en su Ordenador, Smartphone o Tablet al acceder a determinadas páginas web, que almacenan y recuperan información cuando navega. La utilización de cookies ofrece numerosas ventajas en la prestación de servicios de la Sociedad de la Información, puesto que, entre otras:",
        { ordered: true, alpha: true, list: [
            "facilita la navegación del usuario en el Sitio Web;",
            "facilita al usuario el acceso a los diferentes servicios que ofrece el Sitio Web;",
            "evita al usuario volver a configurar las características generales predefinidas cada vez que accede al Sitio Web;",
            "favorece la mejora del funcionamiento y de los servicios prestados a través del Sitio Web, tras el correspondiente análisis de la información obtenida a través de las cookies instaladas;",
            "permiten a un Sitio Web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.",
          ] },
        "De conformidad con lo dispuesto en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, y el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016, informamos que esta web no utiliza cookies para recoger información de los usuarios. Únicamente se utilizan cookies con finalidad técnica y de personalización, con la finalidad de permitir su navegación y para posibilitar que determine sus preferencias.",
        "Con el fin de proporcionarle la máxima información posible, procedemos, en primer lugar, a realizar una clasificación de las cookies, en función de una serie de categorías:",
        { subheading: "Tipos de cookies según la entidad que las gestione" },
        { ordered: true, alpha: true, list: [
            "Cookies Propias: Son aquellas de las que es responsable el propio editor y que, generalmente, se envían al equipo terminal del usuario desde un equipo o dominio gestionado por el propio editor y desde el que se presta el servicio solicitado por el usuario.",
            "Cookies de Terceros: Son aquellas de las que es responsable una entidad distinta del editor y que, generalmente, se envían al equipo terminal del usuario desde un equipo o dominio que no es gestionado por el editor, sino por otra entidad que trata los datos obtenidos a través de las cookies.",
          ] },
        { subheading: "Tipos de cookies según su finalidad" },
        { ordered: true, alpha: true, list: [
            "Cookies técnicas: son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan, incluyendo aquellas que el editor utiliza para permitir la gestión y operativa de la página web y habilitar sus funciones y servicios, como, por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder a partes de acceso restringido, realizar el proceso de compra, realizar, almacenar contenidos, para la difusión de vídeos o sonido, habilitar contenidos dinámicos, etc.).",
            "Cookies de preferencias o personalización: son aquellas que permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios, como, por ejemplo, el idioma, el número de resultados a mostrar cuando el usuario realiza una búsqueda, etc.",
            "Cookies de análisis o medición: son aquellas que permiten al responsable de las mismas el seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que están vinculadas, incluida la cuantificación de los impactos de los anuncios.",
            "Cookies de publicidad comportamental: son aquellas que almacenan información del comportamiento de los usuarios obtenida a través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un perfil específico para mostrar publicidad en función del mismo.",
          ] },
        { subheading: "Tipos de cookies según el plazo de tiempo que permanecen activadas" },
        { ordered: true, alpha: true, list: [
            "Cookies de sesión: son aquellas diseñadas para recabar y almacenar datos mientras el usuario accede a una página web. Se suelen emplear para almacenar información que solo interesa conservar para la prestación del servicio solicitado por el usuario en una sola ocasión (por ejemplo, una lista de productos adquiridos) y desaparecen al terminar la sesión.",
            "Cookies persistentes: son aquellas en las que los datos siguen almacenados en el terminal y pueden ser accedidos y tratados durante un periodo definido por el responsable de la cookie, y que puede ir de unos minutos a varios años.",
          ] },
        { subheading: "Cookies que utilizamos" },
        // REWRITTEN (07/10/2026): el documento trae aquí una tabla de cookies
        // vacía. La web no instala ninguna cookie (comprobado en el código: ni
        // analítica, ni mapas, ni vídeos de terceros; las fuentes van en el
        // propio dominio). Si algún día se añade una, se lista aquí.
        "Actualmente, este sitio web no instala ninguna cookie en su dispositivo.",
        "El portal del que es titular LABORATORIOS VIRENS, S.L puede contener enlaces a sitios web de terceros, cuyas políticas de privacidad son ajenas a la de LABORATORIOS VIRENS, S.L. Al acceder a tales sitios web usted puede decidir si acepta sus políticas de privacidad y de cookies. Con carácter general, si navega por internet usted puede aceptar o rechazar las cookies de terceros desde las opciones de configuración de su navegador. LABORATORIOS VIRENS, S.L no se hace responsable, en ningún caso, ni del contenido ni de la veracidad de las políticas y/o condiciones de uso y privacidad de los terceros.",
        ],
      },
      {
        heading: "Modificaciones. Actualización",
        body: [
        "La presente política de cookies puede verse modificada/actualizada en función de las exigencias legales establecidas o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos o, por la actualización del sitio web. Por esta razón, aconsejamos a los usuarios que visiten periódicamente nuestra política de cookies.",
        "Si tiene dudas acerca de esta política de cookies, puede contactar con LABORATORIOS VIRENS, S.L a través del siguiente correo electrónico cgestion@lvirens.com",
        `Para obtener información adicional sobre el tratamiento de sus datos personales acuda a nuestra [Política de Privacidad](${PRIVACY})`,
        ],
      },
    ],
    revised: "Última revisión 05 de Octubre de 2026",
  },
  {
    key: 'sales',
    title: "Condiciones Generales de Venta",
    nav: "Política comercial",
    description: "Condiciones generales de venta de los productos fabricados y comercializados por Laboratorios Virens.",
    sections: [
      {
        heading: "Ámbito de aplicación",
        body: [
        "Las presentes Condiciones Generales de Venta (CGV) se aplicarán a todos los productos fabricados y/o comercializados por la EMPRESA. Asimismo, son aplicables a todas aquellas materias que no hayan sido reguladas expresamente en las condiciones pactadas previamente por escrito entre la EMPRESA y el CLIENTE que conduzcan a la formalización del pedido.",
        "La emisión de un pedido de suministro por parte de un CLIENTE presupone la aceptación de todas y cada una de las CGV, salvo que se hayan pactado previamente con la EMPRESA condiciones distintas de las aquí presentes, en cuyo caso continuarán en vigor todas las demás a las que no afecte expresamente la eliminación o modificación aceptada.",
        ],
      },
      {
        heading: "Precios",
        body: [
        "La EMPRESA puede modificar los precios de los productos, así como dejar de aplicar los descuentos previamente acordados con el CLIENTE, por cualquier motivo que la EMPRESA considere pertinente. Asimismo, la EMPRESA puede descatalogar cualquier producto objeto de la transacción por razones internas, regulatorias y/o administrativas.",
        "Los precios de venta unitarios de los productos se expresan sin IVA y/o cualquier otro impuesto que pudiera recaer sobre ellos. Los impuestos se añadirán al importe final de la factura.",
        "Los gastos de transporte correrán a cargo de la EMPRESA o del CLIENTE según lo pactado antes del envío de los pedidos.",
        "Cualquier otra tasa adicional que pudiera recaer sobre la transacción también deberá expresarse en las condiciones pactadas previamente con la EMPRESA, indicando la parte que se hará cargo de dichos gastos.",
        ],
      },
      {
        heading: "Formalización de pedidos y alcance de la compraventa",
        body: [
        "El alcance de la venta estará especificado en las condiciones pactadas previamente con la EMPRESA que conduzcan a la formalización del pedido por parte del CLIENTE.",
        "La venta incluye únicamente los productos objeto del pedido.",
        "En caso de que se realice una entrega parcial de los productos inicialmente pactados por problemas de falta de suministro de la EMPRESA, los productos pendientes serán enviados inmediatamente al CLIENTE en el momento en que la EMPRESA vuelva a disponer de la totalidad de los productos.",
        "Las modificaciones y/o variaciones del alcance, plazos u otros términos de un pedido que pueda proponer una de las partes deberán notificarse a la otra siempre por escrito y, para ser válidas, deberán ser aceptadas por esta. Tendrán igualmente la consideración de modificaciones y/o variaciones aquellas provocadas por cambios en la legislación, reglamentación y normativa aplicable que se produzcan después de la fecha de fijación de las condiciones pactadas previamente; si dichas modificaciones y/o variaciones impusieran obligaciones adicionales o más onerosas a la EMPRESA, esta tendrá derecho a que se realice un ajuste equitativo de los términos contractuales que refleje plenamente las consecuencias de la ley o regulación nueva o modificada.",
        ],
      },
      {
        heading: "Condiciones de pago",
        body: [
        "Las condiciones de pago se establecen en las condiciones previamente pactadas y, si no existe pacto entre las partes, el pago del pedido se realizará:",
        "50 % a la formalización del pedido y 50 % 3 días antes de la entrega del pedido.",
        "Estas condiciones de pago deberán ajustarse a lo previsto en la Ley 15/2010, de 5 de julio, por la que se establecen medidas de lucha contra la morosidad en las operaciones comerciales, sin superar en ningún caso los plazos máximos que en ella se establecen.",
        "Si por causas ajenas a la EMPRESA se retrasara la entrega de los productos, se mantendrán las condiciones y los plazos de pago contractuales.",
        ],
      },
      {
        heading: "Incumplimiento de pago",
        body: [
        "Si el CLIENTE no atiende total o parcialmente alguno de los pagos previstos, la EMPRESA tendrá derecho, a partir del día siguiente al vencimiento del pago, a percibir los intereses previstos en la Ley 3/2004, de 29 de diciembre, por la que se establecen medidas de lucha contra la morosidad en las operaciones comerciales, así como a la compensación por los costes de cobro, que se fija en el cinco por ciento (5 %) de la cantidad sobre la que se devenguen intereses de demora.",
        "Asimismo, la EMPRESA podrá suspender la ejecución del presente Contrato hasta que reciba el pago correspondiente, debiendo notificarlo previamente y por escrito al CLIENTE. Si transcurridos dos meses el CLIENTE no hubiera efectuado el pago de la cantidad debida, la EMPRESA podrá dar por resuelto automáticamente el contrato notificándolo al CLIENTE. La resolución del presente Contrato por este motivo dará derecho a la EMPRESA a reclamar, en concepto de daños y perjuicios, el pago de los costes pertinentes, así como el pago de los gastos derivados del incumplimiento del pago.",
        "En caso de pedidos sucesivos, si el CLIENTE no atendiera total o parcialmente el pago de alguno de los pedidos, la EMPRESA tendrá derecho a suspender los pedidos sucesivos/posteriores hasta que el CLIENTE haya abonado la cantidad debida. Si no se efectúa dicho pago en el plazo de 14 días naturales a contar desde el vencimiento del pago, la EMPRESA podrá resolver la totalidad de los contratos sucesivos/posteriores, dando por resuelta la totalidad de la relación comercial, con las consecuencias que de ello se deriven, incluida la pérdida de la exclusividad territorial. Asimismo, esta resolución dará derecho a la EMPRESA a reclamar, en concepto de daños y perjuicios, el pago de los costes pertinentes, así como el pago de los gastos derivados del incumplimiento del pago y una compensación por los pedidos que no hayan sido entregados.",
        ],
      },
      {
        heading: "Entrega del producto",
        body: [
        "Los plazos previstos para la entrega de los productos son meramente informativos y no son vinculantes para la EMPRESA.",
        "Salvo acuerdo expreso por escrito con la EMPRESA, el CLIENTE no tendrá derecho a solicitar la anulación de un pedido ni ninguna indemnización en caso de que se produzca un retraso en la entrega del producto debido a circunstancias ajenas a la voluntad de la EMPRESA.",
        "El CLIENTE no podrá negarse a pagar el precio de los productos ya entregados cuando la EMPRESA realice el suministro parcial de un pedido.",
        ],
      },
      {
        heading: "Devolución del producto y reclamaciones",
        body: [
        "Las reclamaciones por defectos de calidad se enviarán a la EMPRESA junto con una muestra del producto. Se considerará que las entregas de productos bajo este Contrato se han suministrado de acuerdo con la calidad acordada salvo que se reciba una reclamación dentro del plazo de 14 días a contar desde la recepción de los productos, mediante escrito dirigido a la EMPRESA.",
        "En ningún caso la EMPRESA admitirá devoluciones sin previo acuerdo con el CLIENTE y sin la previa firma y entrega del documento de autorización de devoluciones de la EMPRESA.",
        ],
      },
      {
        heading: "Garantías y calidad del producto",
        body: [
        "El CLIENTE examinará los productos recibidos de la EMPRESA para verificar el cumplimiento de la calidad acordada, la escasez y/o cualquier otra deficiencia, aplicando un control visual y todos los estándares de control de calidad razonables y avanzados para los productos entrantes.",
        "La EMPRESA tiene la obligación de garantizar la calidad del producto hasta la fecha de caducidad, siempre que dicho producto no haya sido manipulado, transformado, alterado o haya sufrido cualquier modificación que altere su estado, tanto en el interior del producto como en su embalaje, de forma total o parcial. El CLIENTE reconoce y exime de responsabilidad a la EMPRESA por la degradación en la concentración de vitaminas, minerales y otros ingredientes que se sepa que se degradan con el tiempo, aunque no hayan alcanzado la fecha de caducidad o de consumo preferente.",
        "El CLIENTE tiene la obligación de almacenar los productos según las normas legales vigentes aplicables en materia de seguridad alimentaria.",
        ],
      },
      {
        heading: "Límites de responsabilidad",
        body: [
        "La responsabilidad de la EMPRESA por las reclamaciones derivadas del cumplimiento o incumplimiento de sus obligaciones contractuales no excederá en conjunto del precio básico contractual y no incluirá en ningún caso perjuicios derivados del lucro cesante, pérdida de ingresos, producción o uso, coste de capital, costes de energía, pérdida de ahorros previstos, incrementos de los costes de explotación ni cualesquiera perjuicios especiales o indirectos, ni pérdidas de ninguna clase. La limitación de responsabilidad contenida en esta cláusula prevalecerá sobre cualquier otra contenida en cualquier otro documento contractual que sea contradictoria con ella, salvo que dicha previsión restrinja en mayor medida la responsabilidad de la EMPRESA.",
        ],
      },
      {
        heading: "Reserva de dominio y transmisión del riesgo",
        body: [
        "Hasta que el CLIENTE no haya pagado totalmente las cantidades debidas como consecuencia de la venta, el producto se considerará propiedad de la EMPRESA, con todos los derechos inherentes.",
        "El CLIENTE, además de la afección especial al cumplimiento de sus obligaciones establecida sobre los productos que se venden, responderá de ellas con todos sus demás bienes.",
        "No obstante, una vez entregados los productos al CLIENTE, estos pasan a ser responsabilidad suya a efectos de protección, almacenamiento, custodia y seguridad, robo o cualquier otra situación de riesgo, obligándose a colaborar con la EMPRESA para adoptar cualquier medida que fuera necesaria para proteger los derechos de propiedad de esta.",
        "Una vez satisfecha la totalidad de la cantidad debida, el pleno dominio de los productos pasará al CLIENTE.",
        ],
      },
      {
        heading: "Límites de comercialización",
        body: [
        "El CLIENTE reconoce y acepta que el producto adquirido puede estar sujeto a limitaciones, restricciones y/o prohibiciones de venta en su territorio.",
        "El CLIENTE deberá tener en vigor los permisos administrativos y las autorizaciones sanitarias pertinentes para poder realizar la venta de los productos adquiridos.",
        "El CLIENTE reconoce que los productos que le vende la EMPRESA están correctamente notificados o registrados en el país o países donde los comercializará, y que en el packaging de los productos no aparecerá el nombre ni el registro de la EMPRESA, salvo autorización expresa y por escrito a tal efecto.",
        "El CLIENTE reconoce que toda la publicidad y promoción del producto, incluido su packaging, es responsabilidad del CLIENTE, y exime a la EMPRESA de cualquier responsabilidad sobre posibles actuaciones de las autoridades sanitarias o de consumo.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        body: [
        "La propiedad industrial del presente contrato, en todos sus términos, y de la información adjunta al mismo es propiedad de la EMPRESA, así como la de los desarrollos internos de los productos objeto de venta, por lo que queda expresamente prohibida su utilización por el CLIENTE para fines distintos del cumplimiento de los objetivos de la compraventa.",
        "La propiedad intelectual de los productos objeto de venta y la de los diseños, marcas, logotipos, dibujos, etc., incorporados o relativos a los mismos pertenecen al CLIENTE, por lo que queda expresamente prohibida su utilización por la EMPRESA para fines distintos del cumplimiento de los objetivos de la compraventa.",
        ],
      },
      {
        heading: "Confidencialidad",
        body: [
        "Las partes aceptan, en relación con la información confidencial que proporcione el emisor o que obtengan de cualquier otro modo:",
        "Tratar la información confidencial como estrictamente privada y confidencial y, por tanto, limitar su divulgación exclusivamente a los directores, directivos, empleados y asesores cuya función exija tener acceso a ella, así como asegurarse de que dichas personas están informadas de las obligaciones incluidas en el presente acuerdo.",
        "Custodiar la información confidencial en depósito y en un lugar seguro.",
        "No revelar la información confidencial ni permitir que la obtenga ningún tercero sin el consentimiento previo y por escrito del emisor.",
        "No utilizar la información confidencial para fines distintos del objetivo.",
        "No copiar de ningún modo, total o parcialmente, la información confidencial cuando sea con fines distintos del objetivo o cuando esté destinada a personas cuya identidad no haya sido aprobada previamente por escrito por el emisor.",
        "Devolver al emisor, cuando así lo solicite por escrito, o bien destruir, toda o parte de la información confidencial —escrita o en cualquier otro formato— y todas las copias que posea o posean terceros, y confirmar por escrito su devolución o destrucción.",
        "Las partes se obligan a devolver cualquier documentación o antecedentes facilitados en cualquier tipo de soporte y, en su caso, las copias obtenidas de los mismos, que constituyan información amparada por el deber de confidencialidad objeto del presente Acuerdo, en caso de que cese la relación entre las partes por cualquier motivo.",
        ],
      },
      {
        heading: "Derecho aplicable y jurisdicción competente",
        body: [
        "Las presentes Condiciones Generales de Venta, en todo su ámbito de aplicación, y todas las relaciones que de ellas se deriven se rigen por las leyes españolas y deberán interpretarse de acuerdo con ellas.",
        "En caso de divergencia o de interpretación de las condiciones pactadas previamente (tarifas de precios, etc.), de la ejecución del contrato o de las presentes Condiciones Generales de Venta, las partes, con renuncia expresa a su propio fuero, acuerdan someterse a los juzgados y tribunales de la ciudad de Barcelona.",
        ],
      },
    ],
  },
];
