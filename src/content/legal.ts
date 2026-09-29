/**
 * TEXTOS LEGALES — literal de los documentos Word que entregó el cliente
 * (`Textos legales`, 29/09/2026): Aviso legal, Política de protección de
 * datos y Condiciones generales de venta. Solo se ha normalizado el formato
 * (títulos de apartado en minúscula de frase, listas); el texto no se toca.
 *
 * OJO (pendiente del cliente): la política de protección de datos dice que los
 * derechos se ejercen escribiendo a «email@laempresa.com», un correo de
 * plantilla. Se transcribe tal cual hasta que el cliente dé el correcto.
 * Tampoco hay texto de política de cookies.
 */
export type LegalKey = 'legalNotice' | 'privacy' | 'sales';
export type LegalBlock = string | { readonly ordered: boolean; readonly list: readonly string[] };
export interface LegalSection { readonly heading: string; readonly body: readonly LegalBlock[] }
export interface LegalDoc {
  readonly key: LegalKey;
  readonly title: string;
  /** Rótulo corto para el pie y las pestañas. */
  readonly nav: string;
  readonly description: string;
  readonly sections: readonly LegalSection[];
}

export const legalUi = {
  eyebrow: 'Documentación',
  toc: 'Contenido',
  docsAria: 'Documentos legales',
  company: 'Laboratorios Virens S.L.',
} as const;

export const legalDocs: readonly LegalDoc[] = [
  {
    key: 'legalNotice',
    title: "Aviso legal",
    nav: "Aviso legal",
    description: "Aviso legal de Laboratorios Virens S.L.: información corporativa y condiciones de uso del sitio web.",
    sections: [
      {
        heading: "Información corporativa",
        body: [
        "En virtud de las obligaciones establecidas por la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico, le informamos de que esta página web es propiedad de LABORATORIOS VIRENS S.L., en adelante VIRENS, con domicilio social en C/Industria 48-B Polígono Industrial Nord-Est 08740 Sant Andreu de la Barca - Barcelona; provista de C.I.F. B64294473; y con dirección electrónica csp@lvirens.com",
        "Esta sociedad consta inscrita en el Registro Mercantil de Barcelona con el número de inscripción 146322.",
        ],
      },
      {
        heading: "Protección de contenidos",
        body: [
        "El usuario reconoce y acepta que todos los derechos de propiedad industrial e intelectual sobre los contenidos y/o cualquier otro elemento insertado por VIRENS en esta página web (incluyendo, a título meramente enunciativo y no limitativo, todos aquellos elementos que conforman la apariencia visual, imagen gráfica y otros estímulos sensoriales del sitio web o \"look and feel\": marcas, logotipos, nombres comerciales, textos, imágenes, gráficos, diseños, sonidos, bases de datos, software, diagramas de flujo, presentación, arquitectura de navegación, así como los códigos fuente de las páginas web) pertenecen a VIRENS y/o a terceros a los que les han sido cedidos sus derechos.",
        "En ningún caso el acceso al Sitio Web implica ningún tipo de permiso, renuncia, transmisión, licencia o cesión total ni parcial de dichos derechos por parte de sus titulares, salvo que se establezca expresamente lo contrario. Estos términos y condiciones de uso del Sitio Web no confieren a los usuarios ningún otro derecho de utilización, alteración, explotación, reproducción, distribución o comunicación pública del Sitio Web y/o de sus contenidos distinto de los aquí expresamente previstos.",
        "Queda totalmente prohibida la utilización de dichos elementos, su reproducción total o parcial, comunicación y/o distribución con fines comerciales o lucrativos, así como su modificación, alteración, descompilación y/o cualquier otro acto de explotación del Sitio Web.",
        "Sin perjuicio de todo lo anterior, si el usuario o un tercero considera que algún contenido del Sitio Web puede vulnerar los derechos de propiedad intelectual e industrial, rogamos que nos lo haga saber lo antes posible.",
        ],
      },
      {
        heading: "Acceso y uso del sitio web",
        body: [
        "Tanto el acceso al Sitio Web como el uso no consentido que pueda hacerse de la información contenida en la página es responsabilidad exclusiva de quien lo realiza.",
        "El usuario se compromete a utilizar los contenidos, la información y los datos del Sitio Web de conformidad con las condiciones, términos y políticas vigentes, con la normativa aplicable y con las buenas costumbres generalmente aceptadas y el orden público.",
        "El usuario se abstendrá de utilizar los contenidos del Sitio Web con fines o efectos ilícitos, prohibidos o contrarios a los aquí establecidos, lesivos de los derechos e intereses de VIRENS, del resto de usuarios o de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar este Sitio Web o impedir su normal utilización o disfrute por parte de los usuarios. VIRENS no responderá de ninguna consecuencia, daño o perjuicio que pudiera derivarse de dicho acceso o uso o del incumplimiento de las presentes condiciones, términos y políticas, ni se hará responsable de los errores de seguridad que se puedan producir ni de los daños que se puedan causar al sistema informático del usuario (hardware y software) o a los ficheros o documentos almacenados en él como consecuencia de:",
        { ordered: true, list: [
            "La presencia de un virus en el ordenador del usuario que sea utilizado para la conexión a los servicios y/o productos ofrecidos por VIRENS a través de su Sitio Web;",
            "Un mal funcionamiento del navegador;",
            "El uso de versiones no actualizadas del sistema.",
          ] },
        ],
      },
      {
        heading: "Enlaces a terceros",
        body: [
        "En este Sitio Web pueden utilizarse enlaces a otras páginas web. VIRENS no se responsabiliza ni del contenido ni de las medidas de seguridad adoptadas por cualquier otra página web a la que se tenga acceso desde este Sitio Web, páginas a las que el interesado accede bajo su única responsabilidad.",
        "Del mismo modo, tampoco se garantiza la ausencia de virus u otros elementos en los contenidos enlazados desde el Sitio Web de VIRENS que puedan producir alteraciones en el sistema informático (hardware y software) y/o en los documentos o ficheros del usuario, eximiendo igualmente a VIRENS de toda responsabilidad derivada de los daños de cualquier tipo ocasionados por todo lo descrito anteriormente.",
        ],
      },
      {
        heading: "Redes sociales",
        body: [
        "Le informamos de que VIRENS puede estar presente en las redes sociales. El tratamiento de los datos que se lleve a cabo de las personas que se hagan seguidoras en las redes sociales (y/o realicen cualquier vínculo o acción de conexión a través de las redes sociales) de las páginas oficiales de VIRENS se regirá por este apartado, así como por aquellas condiciones de uso, políticas de privacidad y normativas de acceso que pertenezcan a la red social que proceda en cada caso y que hayan sido aceptadas previamente por el usuario. VIRENS tratará sus datos con la finalidad de administrar correctamente su presencia en la red social, informándole de actividades, productos o servicios de VIRENS, así como para cualquier otra finalidad que las normativas de las redes sociales permitan.",
        "Queda prohibida la publicación de contenidos:",
        { ordered: false, list: [
            "Que sean presuntamente ilícitos según la normativa nacional, comunitaria o internacional, o que realicen actividades presuntamente ilícitas o contravengan los principios de la buena fe.",
            "Que atenten contra los derechos fundamentales de las personas, falten a la cortesía en la red, molesten o puedan generar opiniones negativas en nuestros usuarios o terceros y, en general, cualquier contenido que se considere no apropiado.",
            "Y, en general, que contravengan los principios de legalidad, honorabilidad, responsabilidad, protección de la dignidad humana, protección de menores, protección del orden público, protección de la vida privada, protección del consumidor y los derechos de propiedad intelectual e industrial.",
          ] },
        "Asimismo, VIRENS se reserva la potestad de retirar, sin previo aviso, de la página web o de la red social corporativa aquellos contenidos que se consideren no apropiados.",
        ],
      },
      {
        heading: "Modificación del aviso legal",
        body: [
        "VIRENS se reserva el derecho a modificar en todo momento y sin previo aviso el presente aviso legal para adaptarlo a las novedades legislativas o jurisprudenciales, así como a las modificaciones o prácticas de la industria, con la obligación por parte del usuario de consultar periódicamente estas condiciones, términos y políticas a fin de comprobar o asegurarse de la existencia de cambios, tomando como referencia la fecha de la última actualización.",
        ],
      },
    ],
  },
  {
    key: 'privacy',
    title: "Política de protección de datos",
    nav: "Protección de datos",
    description: "Política de protección de datos de Laboratorios Virens S.L. conforme al RGPD.",
    sections: [
      {
        heading: "Responsable",
        body: [
        "Los datos de carácter personal que nos facilite a través del sitio web www.lvirens.com (en adelante, el \"Sitio Web\") como usuario del mismo serán incluidos en un fichero titularidad de LABORATORIOS VIRENS S.L., en adelante VIRENS, con domicilio social en C/Industria 48-B Polígono Industrial Nord-Est 08740 Sant Andreu de la Barca - Barcelona; provista de N.I.F. núm. B64294473; y con dirección electrónica csp@lvirens.com",
        "El tratamiento de sus datos y la presente Política de Privacidad se regirán por el Reglamento General de Protección de Datos (Reglamento (UE) 2016/679) (el \"RGPD\").",
        ],
      },
      {
        heading: "Finalidad",
        body: [
        "Para el uso de determinados servicios, el usuario deberá comunicar datos de carácter personal. Los usuarios, mediante la marcación de la casilla habilitada en los formularios de contacto del sitio web, aceptan expresamente y de forma libre e inequívoca que sus datos personales sean tratados por VIRENS, que informará al usuario, a fin de analizar la información que se derive de esta gestión para mejorar nuestros servicios y adecuarlos a las preferencias de los usuarios, con las siguientes finalidades:",
        { ordered: false, list: [
            "Facilitarle el acceso al Sitio Web y mejorar la experiencia de usuario.",
            "Gestionar los servicios solicitados en el Sitio Web.",
            "Facilitar a los interesados ofertas de productos y servicios de su interés.",
            "Elaborar un \"perfil comercial\" de acuerdo con la información facilitada. No se tomarán decisiones automatizadas en base a este perfil.",
          ] },
        ],
      },
      {
        heading: "Legitimación",
        body: [
        "Al remitir el usuario sus datos de carácter personal a VIRENS, este consiente expresamente que VIRENS realice las siguientes actividades y/o acciones, salvo que se indique lo contrario al contratar o suscribir cualquier producto y/o servicio de VIRENS o como resultado de una revocación posterior del consentimiento inicialmente otorgado:",
        { ordered: false, list: [
            "El envío de comunicaciones comerciales y/o promocionales en papel, informando a los usuarios de las actividades, promociones, publicidad, noticias, ofertas y demás información sobre los servicios y productos relacionados con la actividad comercial.",
            "El envío de comunicaciones comerciales por vía electrónica, informando a los usuarios de las actividades, promociones, publicidad, noticias, ofertas y demás información sobre los servicios y productos de VIRENS iguales o similares a los que fueron inicialmente objeto de contratación o de interés por parte del usuario.",
            "Tramitar encargos o responder a las peticiones que realice el usuario a través de cualquiera de las formas de contacto que se ponen a su disposición en el sitio web de VIRENS.",
            "Realizar estudios estadísticos.",
            "O, en el caso de que se establezca en nuestro sitio web, tramitar su solicitud de registro de usuario y/o su pedido de productos ofrecidos por VIRENS. Una vez confirmada y aceptada su solicitud, el usuario recibirá un correo electrónico de confirmación en la dirección indicada al completar el formulario de registro.",
          ] },
        "Sin perjuicio de todo lo anterior, no se considerará comunicación comercial y/o publicitaria toda aquella información enviada por VIRENS —incluso por medios electrónicos— a los usuarios de VIRENS con la finalidad de llevar a cabo, ejecutar y/o desarrollar cualquier prestación suscrita o contratada —aunque no hubiera sido suscrita por medios electrónicos— por el usuario, así como todas las demás tareas, acciones y/o actividades derivadas de dicha relación contractual y/o comercial.",
        "Mediante el envío de sus datos, usted presta su consentimiento para que VIRENS trate sus datos personales conforme a las finalidades descritas. Usted garantiza que los datos facilitados son veraces, exactos y completos, y se responsabiliza de notificar cualquier cambio en los mismos.",
        ],
      },
      {
        heading: "Destinatarios",
        body: [
        "Los datos se comunicarán a otras empresas del grupo empresarial VIRENS para fines administrativos internos, incluido el tratamiento de datos personales de clientes o empleados.",
        { ordered: false, list: [
            "CDMon (10DENCEHISPAHARD, S.L.) como proveedor de hosting.",
          ] },
        "Los ficheros se almacenan en nuestros proveedores tecnológicos de almacenamiento web, correo electrónico y marketing en línea, de acuerdo con el marco de seguridad EU-US Privacy.",
        "Al aceptar esta política de privacidad, nos autoriza expresamente a tratar y comunicar sus datos personales a las sociedades mencionadas y/o a transferir los datos personales a los referidos prestadores de servicios, como encargados del tratamiento, para las finalidades descritas y para ofrecerle un servicio completo.",
        "VIRENS informa y garantiza expresamente a los usuarios que sus datos personales no serán cedidos en ningún caso a terceras compañías, y que, siempre que fuera a realizarse algún tipo de cesión de datos personales, se solicitaría de forma previa el consentimiento expreso, informado e inequívoco de los titulares.",
        ],
      },
      {
        heading: "Derechos",
        body: [
        "De acuerdo con la legislación de protección de datos, usted dispone de los derechos de información, acceso, rectificación, cancelación, oposición y portabilidad. Tiene derecho a obtener confirmación sobre si en VIRENS estamos tratando datos personales que le conciernan o no. Las personas interesadas tienen derecho a acceder a sus datos personales, así como a solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando, entre otros motivos, los datos ya no sean necesarios para los fines para los que fueron recogidos.",
        "En determinadas circunstancias, los interesados podrán solicitar la limitación del tratamiento de sus datos, en cuyo caso únicamente los conservaremos para el ejercicio o la defensa de reclamaciones.",
        "En determinadas circunstancias y por motivos relacionados con su situación particular, los interesados podrán oponerse al tratamiento de sus datos. VIRENS dejará de tratar los datos, salvo por motivos legítimos imperiosos o para el ejercicio o la defensa de posibles reclamaciones.",
        "Usted podrá ejercer los derechos de acceso, rectificación, cancelación, oposición y portabilidad mediante el envío de un correo electrónico a la dirección email@laempresa.com o por correo postal a la dirección VIRENS C/Industria 48-B Polígono Industrial Nord-Est 08740 Sant Andreu de la Barca - Barcelona, indicando su nombre y apellidos, la petición en la que se concreta su solicitud y una dirección a efectos de notificaciones, y deberá adjuntar copia de su DNI u otro documento válido que le identifique.",
        "Asimismo, VIRENS se compromete a garantizar la confidencialidad de sus datos personales y a utilizarlos de acuerdo con las finalidades anteriormente indicadas.",
        "Igualmente, adoptará todas las medidas necesarias para evitar su alteración, pérdida, tratamiento o acceso no autorizado, de acuerdo con lo establecido en la normativa sobre protección de datos de carácter personal.",
        ],
      },
      {
        heading: "Plazo de conservación de los datos",
        body: [
        "Mantendremos sus datos personales durante la vigencia de la relación contractual con nosotros y, una vez finalizada, durante los plazos de prescripción de las obligaciones que hayan podido nacer del tratamiento de los datos y/o los plazos que se establezcan legalmente.",
        ],
      },
    ],
  },
  {
    key: 'sales',
    title: "Condiciones Generales de Venta",
    nav: "Condiciones de venta",
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
