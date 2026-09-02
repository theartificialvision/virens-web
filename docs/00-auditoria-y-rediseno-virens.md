# LABORATORIOS VIRENS — Auditoría, arquitectura y rediseño web
**Documento maestro · Fase 1–6**
Fecha de extracción: 1 de septiembre de 2026 · Fuente: `lvirens.com` (versión ES)
Uso: briefing directo para Figma y para desarrollo frontend.

> **Regla de este documento:** todo dato marcado como extraído procede literalmente de la web actual.
> Lo que no puede verificarse en la web aparece explícitamente como **NO VERIFICADO**.
> Ninguna inferencia se presenta como hecho.

---

# 01. AUDITORÍA DE LA WEB ACTUAL

## 1.1 Mapa real del sitio (verificado vía `page-sitemap.xml`)

El sitio **no tiene** páginas independientes para Development, Private Label, Full Service, Formas galénicas, Capacidad productiva, Áreas terapéuticas, Formulación, R+D galénicos, Centro de sabores, Estabilidad, Garantía de calidad ni Regulatory consulting.
Todo eso vive **dentro de pestañas (tabs) de dos páginas**: `/virens-labs/` y `/virens-tech/`.

El sitemap declara 60 entradas, pero corresponden a **10 URLs únicas** (el resto son duplicados de revisiones de Yoast):

| # | URL | Rol |
|---|---|---|
| 1 | `/` | Home (pantalla partida de acceso) |
| 2 | `/compania/` | Quiénes somos + Qué hacemos + Calidad + Historia |
| 3 | `/virens-labs/` | División de fabricación (6 pestañas) |
| 4 | `/virens-tech/` | División de desarrollo (6 pestañas) |
| 5 | `/noticias/` | Blog / actualidad |
| 6 | `/contacto/` | Datos + formulario |
| 7 | `/aviso-legal/` | Legal |
| 8 | `/politica-de-proteccion-de-datos/` | Legal |
| 9 | `/uso-de-cookies/` | Legal |
| 10 | `/condiciones-generales-de-venta/` | Legal |

**Idiomas activos (WPML):** Español, Català, English, Français, Italiano, 简体中文 (6 idiomas).
**Stack actual:** WordPress + tema JupiterX (child) + Elementor + WPML + Yoast + Contact Form 7 + reCAPTCHA + GA4/GTM.
**Créditos en footer:** «© 2023 | We're Sinapsis». Badge **Kit Digital** en footer.

## 1.2 Diagnóstico — 12 problemas estructurales

| # | Problema | Evidencia en la web actual | Impacto |
|---|---|---|---|
| 01 | **La home no comunica nada** | Solo un logo, un claim en inglés y dos accesos con 1 línea de texto cada uno | El visitante B2B no sabe qué fabrica Virens, dónde, ni con qué capacidad. Cero credibilidad en 5 s |
| 02 | **Los datos duros están dentro de imágenes** | Capacidades (`img-es.png`), certificaciones (`calidad-virens-labs.png`) e historia (`historia-desktop-1.png`) son PNG | Lo más vendible de la empresa es invisible para Google, para lectores de pantalla y para el móvil |
| 03 | **Contenido escondido tras pestañas** | 12 de los ~14 bloques de contenido comercial están colapsados en tabs de Elementor | El usuario debe hacer clic para descubrir que existen. La mayoría no lo hará |
| 04 | **Idioma mezclado** | Claim `Experts in food supplements` en inglés sobre cuerpo en español; `Contract manufacturing`, `Development`, `Full service`, `Private Label` sin traducir | Ambigüedad de marca: no queda claro si es internacional o descuidado |
| 05 | **Terminología inconsistente** | La intro de Tech lista «Project management formulaciones / R+D & Desarrollos galénicos / Laboratorio control calidad» y las pestañas de la misma página los llaman «Formulación / R+D galénicos / Garantía de calidad» | Seis servicios con dos nombres cada uno. Imposible construir marca ni SEO |
| 06 | **Textos genéricos y autorreferenciales** | «Nuestro compromiso con los más altos estándares de calidad, ha sido y es una constante obsesión para nuestro equipo» | Afirmación no verificable. Ocupa el lugar donde debería estar el certificado |
| 07 | **Errores de redacción publicados** | «Nuevo concepto integrado de tecnología aplicada al **desarollo** de producto» (home); «más de 2000 **m** de instalaciones» (falta m²) | Erosiona la percepción de precisión de un laboratorio |
| 08 | **Contaminación de idioma en legales** | El aviso legal en español titula «1. INFORMACIÓ GENERAL» y «2. OBJECTO DEL SITIO WEB» (catalán) | Descuido visible en la página que debe transmitir rigor |
| 09 | **Dirección contradictoria** | `/contacto/`: «Indústria 48B». `/aviso-legal/`: «Calle Industria 48-A» | Un dato tan básico contradictorio daña la confianza |
| 10 | **Una forma galénica que no lo es** | «Estuchado automático» aparece listado junto a Cápsulas, Comprimidos, Jarabes | Estuchado es acondicionamiento secundario, no forma galénica. Error técnico ante un cliente experto |
| 11 | **SEO base sin construir** | H1 de la home es literalmente «Home»; dos H1 por página; sin meta description en home | La web no compite por «fabricación complementos alimenticios», «contract manufacturing España» ni por ninguna forma galénica |
| 12 | **Señales de abandono** | «© 2023» en 2026; zona de clientes declarada «(inactivo)» en el aviso legal; `page-sitemap.xml` sin cambios desde 08/11/2023 | El único contenido vivo es el blog (posts de 2025 y 2026): la web parece congelada |

## 1.3 Lo que la web actual hace bien (a conservar)

- **La arquitectura de dos divisiones (Labs / Tech) es correcta y diferencial.** No la toques: dale escala.
- **Los datos de capacidad productiva son excelentes** y muy poco frecuentes en el sector. Son el mayor activo desaprovechado.
- **La historia 2000–2023 es una prueba de solidez** (25+ años de instalaciones, hitos de certificación, internacionalización).
- **El blog está vivo y bien alimentado** (CPHI Milan 2026, Vitafoods 2026, contenido divulgativo de producto).
- **El formulario de contacto segmenta por departamento** (Comercial / Compras / RRHH) y admite adjuntos. Es un buen formulario B2B.
- **Seis idiomas** implica vocación exportadora real, coherente con «más de 20 países».

---

# 02. INVENTARIO COMPLETO DE CONTENIDOS (extracción literal)

## 2.1 HOME — `/`

**H1 estructural:** `Home` *(erróneo)*
**H1 visible:** `Experts in food supplements`

Bloque de acceso partido, dos entradas:

| Bloque | Titular | Texto | CTA | Destino |
|---|---|---|---|---|
| Izquierda | `Contract manufacturing` | `En formas sólidas y líquidos siguiendo los más estrictos estándares de calidad` | `Ver más` | `/virens-labs` |
| Derecha | `Development` | `Nuevo concepto integrado de tecnología aplicada al desarollo de producto` *(typo en origen)* | `Ver más` | `/virens-tech` |

Sin vídeo. Sin cifras. Sin footer informativo más allá del menú. Badge **Kit Digital**.

## 2.2 COMPAÑÍA — `/compania/`

### Quiénes somos *(literal)*
> «Laboratorios Virens es una empresa con más de 20 años de experiencia en la fabricación de complementos alimenticios.»
> «En Virens entendemos la salud como un estado de bienestar físico, mental y social y no solo como la ausencia de enfermedades.»
> «Somos expertos en elaborar productos de alta calidad y valor añadido satisfaciendo así las exigencias de nuestros clientes.»

**Cinco pilares** *(literal, con icono):*
1. `Fabricación en instalaciones propias`
2. `Equipo altamente cualificado y orientado al cliente`
3. `Altos estándares de calidad, seguridad y control`
4. `Conocimiento científico de nutrición y fitoterapia`
5. `Empresa con vocación internacional`

### Qué hacemos *(literal)*
> «Laboratorios Virens ofrece soluciones integrales. Desde el desarrollo del producto a su entrega como producto final para su puesta en el mercado; pasando por el proceso de formulación, producción y acondicionamiento.»

**Cadena de valor en 4 etapas** *(literal):*

| Etapa | Descripción literal |
|---|---|
| `Desarrollo y formulación` | `Elaboración de la fórmula siguiendo las directrices establecidas` · `Elaboración de muestras` · `Realización de tests para conseguir el producto deseado por el cliente` |
| `Fabricación y envasado` | `Transformación de la idea inicial en producto` |
| `Acondicionado` | `Acondicionado primario y secundario` |
| `Control de calidad` | `Definición y supervisión de protocolos para asegurar la calidad del producto y procesos` |

> «Disponemos de un equipo de I+D el cual cuenta con una amplia experiencia en el desarrollo de nuevas fórmulas y asesora a nuestros clientes a personalizar las suyas. Además contamos con un Laboratorio de Control de Calidad equipado para garantizar el cumplimiento de las especificaciones y requerimientos solicitados. También tenemos la capacidad para elaborar muestras, realizar test piloto y estudios de estabilidad si el proceso lo requiere.»

### Nuestra calidad *(literal)*
> «Nuestro compromiso con los más altos estándares de calidad, ha sido y es una constante obsesión para nuestro equipo.»

### Nuestra historia — **contenido solo en imagen** (`historia-desktop-1.png`)
Transcrito del PNG. **Este texto no existe como HTML en la web actual.**

| Año | Hito (literal de la imagen) |
|---|---|
| **2000** | `Se construyen las instalaciones actuales como laboratorio farmacéutico` |
| **2006** | `Fundación de Laboratorios Virens; adaptación de las instalaciones a complementos alimenticios` |
| **2010** | `Obtención de la ISO 22000 y GMP's en seguridad alimentaria` |
| **2015** | `Certificación ECO y Veterinaria. Expansión internacional en más de 20 países` |
| **2021** | `Ampliación de las instalaciones, aumento capacidad productiva y almacén` |
| **2023** | `Creación Virens Tech, ampliación R+D y nuevo laboratorio de calidad` |

## 2.3 VIRENS LABS — `/virens-labs/`

**Hero:** vídeo `IMG_7696.mp4` a ancho completo.
**Titular:** `Experts in food supplements` · **Subtítulo:** `Contract manufacturing`

**Intro** *(literal):*
> «En Virens Labs sabemos de la importancia de nuestros clientes con sus necesidades de calidad, servicio, competitividad y fidelidad de su fabricante. Virens Labs le ofrece todo ello para que nuestros clientes se preocupen únicamente de vender sus productos.»
> `– Servicio integral de producción`
> `– Acondicionado primario & secundario`
> `– Private label`

### Private Label *(literal)*
> «En Virens contamos con una amplia experiencia en el desarrollo de fórmulas personalizadas y únicas. Nos adaptamos a los requerimientos técnicos y comerciales de nuestros clientes. Basándonos en la idea inicial y junto con nuestro equipo de I+D desarrollamos su fórmula garantizando la máxima seguridad y trazabilidad.»

### Full service *(literal)*
> «Virens ofrece un servicio integral. Desde el desarrollo del producto a su entrega como producto final para su puesta en el mercado; interviniendo en fabricaciones parciales; entregando fabricaciones a granel; u ofreciendo servicio de acondicionamiento parcial o completo.»

### Formas galénicas *(literal)*
> «En Laboratorios Virens fabricamos complementos alimenticios en diferentes formas galénicas: sólidas (comprimidos, capsulas) y líquidos (jarabes) con distintos formatos: blister, bote, stick, viales, drops.»

**Listado exacto publicado (10 ítems, en el orden de la web):**

`Cápsulas` · `Jarabes` · `Comprimidos` · `Goteros` · `Estuchado automático` · `Envasado en frasco` · `Viales` · `Sticks` · `Blisters` · `Sobres`

> **Corrección respecto al briefing:** la web dice **«Estuchado automático»**, no «Encapsulado automático». Son cosas distintas (estuchado = acondicionamiento secundario en estuche). Además **«Estuchado automático» y «Envasado en frasco» no son formas galénicas**, son operaciones de acondicionamiento: en el rediseño deben salir de esa lista (ver §03).

### Capacidad productiva *(literal en HTML)*
> «Contamos con más de 2000 m de instalaciones donde llevamos a cabo la fabricación, acondicionamiento primario y secundario.» *(falta el «²»)*

**Cifras — contenido solo en imagen** (`img-es.png`). **No existen como texto en la web actual.**

| Formato | Capacidad | Rango / material |
|---|---|---|
| Cápsulas | **200M** | — |
| Comprimidos | **150M** | — |
| Viales | **20M** | 10 ml a 25 ml |
| Blísters | **15M** | PVDC-Pvc/Alu + Alu/Alu |
| Sticks | **10M** | 5 grs a 20 grs |
| Sobres | **10M** | 5 grs a 10 grs |
| Llenado de frascos | **10M** | 50 ml a 500 ml |
| Goteros | **5M** | 30 ml a 60 ml |
| Jarabes | **5M** | 100 ml a 1000 ml |

> **NO VERIFICADO:** la web **no indica** qué significa «M» (se asume millones de unidades) **ni el periodo** (se asume anual). **Antes de publicar hay que confirmarlo con el cliente.** Si se publica «200 millones de cápsulas/año» sin confirmación, se está inventando un dato.

### Control de Calidad *(literal)*
> «Nuestro Laboratorio de Control de Calidad está equipado tecnológicamente para garantizar el cumplimiento de las más exigentes especificaciones y estándares de calidad de los productos. Siempre empleamos las exigencias más estrictas para la fabricación de nuestros productos (GMP).»
> «Nuestro compromiso con la calidad se traduce en las siguientes certificaciones:»

**Certificaciones — contenido solo en imagen** (`calidad-virens-labs.png`). Transcritas de los sellos:

1. `FDA APPROVED`
2. `ISO 22000` (sello SGS System Certification)
3. `GMP` (sello SGS)
4. `HACCP` (sello SGS)
5. `European Manufactured`
6. `Organic Certified` (hoja ecológica UE)
7. `Veterinary Products`

> **NO VERIFICADO:** no consta número de certificado, entidad emisora completa, alcance ni fecha de vigencia de ninguno.
> **Alerta de compliance:** el sello **«FDA APPROVED»** es un claim de riesgo. La FDA **no aprueba** complementos alimenticios ni instalaciones; como mucho existe *FDA Food Facility Registration*. Recomiendo sustituirlo por la denominación exacta que figure en el certificado real. Pendiente de confirmar con el cliente.

### Áreas terapéuticas *(literal)*
> «Nuestro expertise abarca las siguientes áreas:»

**Listado exacto publicado (10, en el orden de la web) — coincide con el briefing:**

`Control peso` · `Sist. Nervioso` · `Articulaciones` · `Digestivo` · `Infantil` · `Cardiovascular` · `Inmunitario` · `Salud Mujer` · `Mascotas` · `Sport nutrition`

**CTA final:** banner `Visitar Tech` → `/virens-tech`

## 2.4 VIRENS TECH — `/virens-tech/`

**Hero:** imagen estática `development.jpg` (**no hay vídeo** en esta página actualmente).
**Titular:** `Experts in food supplements` · **Subtítulo:** `Development`

**Intro** *(literal):*
> «En Virens Tech ayudamos a nuestros clientes a tener los mejores productos, con exclusividad en los desarrollos, asegurando que sus fórmulas son industrialmente factibles. Les ayudamos también en testar los productos en nuestras cámaras de estabilidad para requerimientos de calidad interna y export, así como les ofrecemos los controles y análisis más avanzados.»

**Lista de la intro** *(literal, 6 ítems):*
`– Project management formulaciones` · `– R+D & Desarrollos galénicos` · `– Centro de sabores` · `– Estabilidad de productos` · `– Laboratorio control calidad` · `– Regulatory consulting`

**Pestañas de la misma página** *(literal, 6 ítems con OTROS nombres):*
`Formulación` · `R+D galénicos` · `Centro de sabores` · `Estabilidad de productos` · `Garantía de calidad` · `Regulatory consulting`

> **Denominación oficial recomendada:** usar la de las pestañas (es la que titula cada contenido). La lista de la intro debe alinearse con ella.

| Servicio | Texto literal |
|---|---|
| **Formulación** | «Nuestro departamento de I+D desarrolla nuevas fórmulas para cooperar eficazmente con nuestros clientes y sus departamentos técnicos y de desarrollo. Contamos con zonas de fabricación separadas y diferenciadas para asegurar el aislamiento de los distintos productos y evitar el contacto de unos procesos con otros.» |
| **R+D galénicos** | «Teniendo en cuenta la legislación vigente, el uso y la dosificación proporcionamos las formas galénicas más adecuadas para los proyectos de nuestros clientes.» |
| **Centro de sabores** | «Espacio donde se hacen pruebas de gusto y aromas a los productos. De este modo nos aseguramos de que el producto ideado sea viable comercialmente.» |
| **Estabilidad de productos** | «Disponemos de cámara de estabilidad que nos permite obtener información sobre la estabilidad del producto. De esta forma disponemos de un conocimiento previo del tiempo de conservación y periodo de utilización en determinadas condiciones de envase y almacenamiento.» |
| **Garantía de calidad** | «En nuestros laboratorios realizamos controles microbiológicos y físico-químicos durante el proceso de fabricación así como en el producto acabado.» |
| **Regulatory consulting** | «Nuestro departamento de Atención al Cliente le brindará todo el apoyo técnico comercial necesario con la elaboración de dosieres técnicos de productos y documentación comercial. También contamos con un servicio de regulatorio para registros y notificaciones de productos.» |

**CTA final:** banner `Visitar Labs` → `/virens-labs`

## 2.5 NOTICIAS — `/noticias/`

Blog activo. Entradas visibles en portada (literal):
`CPHI MILAN 2026` · `Verano 2026` · `Vitafoods 2026 un éxito! Gracias por formar parte de esta gran edición` · `VITAFOODS 2026` · `Nootrópicos y Salud Cognitiva: Cómo los suplementos apoyan la salud cerebral` · `Cierre por vacaciones de agosto` · `La Creatina – el boom en los suplementos para la mujer` · `Laboratorios Virens presente en Vitafood Europe 2025 en Barcelona`

Mezcla tres tipos de contenido sin distinguirlos: **ferias**, **divulgación científica** y **avisos de empresa**.

## 2.6 CONTACTO — `/contacto/`

*(literal)*
> `LABORATORIOS VIRENS S.L.`
> `Indústria 48B – Políg. Ind. Nord-Est 08740 Sant Andreu de la Barca, BARCELONA (España)`
> `Telf: (+34) 936 828 972`
> `GPS: 41º27'28'' N 1º58'9'' E`
> «Estamos ubicados a 20 km de Barcelona, en una zona industrial, nudo de infraestructuras de conexión de Barcelona con el resto del mundo.»

**Formulario (Contact Form 7):** selector de departamento `Comercial` / `Compras` / `RRHH` + campos `Nombre`, `Apellidos`, `e-mail`, `Teléfono`, `Empresa`, `País`, `Calle`, `Ciudad`, `Código Postal`, `Asunto`, `Mensaje`, adjunto de archivo, y checkbox `He leído y acepto la política de protección de datos.` + reCAPTCHA invisible.

## 2.7 LEGALES

`/aviso-legal/` (titular: `LABORATORIOS VIRENS, S.L.` · Domicilio: `Calle Industria 48-A Pol. Ind. Nord-Est, 08740 Sant Andreu de la Barca (Barcelona)` · `csp@lvirens.com` · `936 828 972` · `N.I.F: B-64294473`) · `/politica-de-proteccion-de-datos/` · `/uso-de-cookies/` · `/condiciones-generales-de-venta/`

Declara además una «zona de clientes» marcada como **`(inactivo)`**.

## 2.8 Resumen de los 16 puntos solicitados

| # | Pregunta | Respuesta verificada en la web |
|---|---|---|
| 1 | **Qué hace Virens** | Fabricación por contrato (CDMO) y desarrollo de **complementos alimenticios**, en instalaciones propias en Sant Andreu de la Barca (Barcelona) |
| 2 | **Servicios** | Private Label · Full Service (integral, parcial, granel, acondicionamiento) · Acondicionado primario y secundario · Formulación · R+D galénicos · Centro de sabores · Estabilidad · Control de calidad · Regulatory consulting |
| 3 | **Labs vs Tech** | **Labs = Contract Manufacturing** (fabricar, acondicionar, entregar). **Tech = Development** (formular, testar, validar, registrar). Creada en **2023** |
| 4 | **Capacidad industrial** | «más de 2000 m²» de instalaciones · fabricación + acondicionado primario y secundario · ampliación de instalaciones y almacén en 2021 |
| 5 | **Formas y formatos** | Sólidas: comprimidos, cápsulas. Líquidas: jarabes. Formatos: blíster, frasco/bote, stick, vial, gotero, sobre |
| 6 | **I+D** | Departamento propio de I+D · zonas de fabricación separadas · elaboración de muestras · test piloto · cámara de estabilidad · centro de sabores |
| 7 | **Regulatorio** | Dosieres técnicos, documentación comercial, registros y notificaciones de producto |
| 8 | **Áreas terapéuticas** | 10, listadas en §2.3 |
| 9 | **Tecnología e instalaciones** | Laboratorio de control de calidad propio (nuevo en 2023) · cámara(s) de estabilidad · centro de sabores · zonas de fabricación segregadas · almacén ampliado (2021) |
| 10 | **Argumentos comerciales** | «para que nuestros clientes se preocupen únicamente de vender sus productos» · servicio integral extremo a extremo · exclusividad en los desarrollos · factibilidad industrial de la fórmula · instalaciones propias |
| 11 | **Claims existentes** | «Experts in food supplements» · «más de 20 años de experiencia» · «Expansión internacional en más de 20 países» (2015) · «los más estrictos estándares de calidad» · «GMP» |
| 12 | **Datos objetivos** | +2000 m² · 9 capacidades de producción · 7 sellos de certificación · 6 hitos históricos 2000–2023 · 20 km de Barcelona · 6 idiomas |
| 13 | **Certificaciones/cifras** | Ver §2.3. **Todas dentro de imágenes** |
| 14 | **Mercados / cliente tipo** | Marcas de complementos alimenticios que externalizan fabricación · exportación a «más de 20 países» · segmento veterinario/mascotas · ecológico · deportivo |
| 15 | **Credibilidad disponible** | Historia desde 2000 · certificaciones · capacidades numéricas · instalaciones propias · presencia en Vitafoods y CPHI |
| 16 | **Débil, confuso o repetido** | Ver §1.2 y §03 |

---

# 03. QUÉ CONSERVAR / REESCRIBIR / ELIMINAR (Fase 2)

| Contenido actual | Qué comunica | Problema | Conservar | Reescribir | Eliminar | Nueva ubicación |
|---|---|---|---|---|---|---|
| Home: claim `Experts in food supplements` | Especialización | En inglés en la versión ES; sin contexto ni prueba | Sí, como *eyebrow* de marca | Titular real en ES debajo | — | HOME · Bloque 01 (hero vídeo) |
| Home: pantalla partida Labs/Tech | Arquitectura de marca | Es todo lo que hay: la home no informa | Sí | Ampliar a bloque editorial con cifras | — | HOME · Bloque 03 |
| Home: `desarollo` (typo) | — | Error ortográfico publicado | — | — | **Sí** | — |
| Compañía: «más de 20 años de experiencia» | Trayectoria | Escondido en párrafo; contradice la propia historia (instalaciones de 2000, fundación 2006) | Sí | Convertir en dato destacado y **fijar la cifra correcta con el cliente** | — | HOME · franja de datos + COMPAÑÍA |
| Compañía: «salud como bienestar físico, mental y social» | Filosofía | Definición de la OMS, no un diferencial | — | Reescribir o mover | Opcional | COMPAÑÍA · intro corta |
| Compañía: 5 pilares | Fortalezas | Genéricos, en iconos pequeños | Sí (contenido) | Sí (formato editorial, sin iconos en círculo) | — | COMPAÑÍA · Bloque 03 |
| Compañía: cadena de 4 etapas | Proceso | Buen contenido, formato de tarjetas apagado | **Sí, muy valioso** | Ligeramente | — | HOME · Bloque «Cómo trabajamos» (numerado 01–04) |
| Compañía: historia 2000–2023 | Solidez | **Solo imagen**: invisible para SEO y móvil | **Sí, muy valioso** | Pasar a HTML, timeline horizontal | — | COMPAÑÍA · Bloque 05 |
| Compañía: «constante obsesión» | Calidad | Marketing vacío sin evidencia | — | — | **Sí** | Sustituido por certificaciones con alcance |
| Labs: intro «se preocupen únicamente de vender» | Propuesta de valor | Frase larga y enrevesada, pero la idea es buena | Idea | **Sí** | — | LABS · Bloque 02 |
| Labs: Private Label | Servicio | Correcto; escondido en tab | Sí | Ligeramente | — | LABS · Bloque 03 (editorial imagen/texto) |
| Labs: Full service | Servicio | Correcto; escondido en tab | Sí | Ligeramente | — | LABS · Bloque 04 (texto/imagen) |
| Labs: 10 «formas galénicas» | Capacidad técnica | Mezcla formas galénicas con operaciones de acondicionamiento | Sí | **Sí: separar en dos listas** | — | LABS · Bloque 05 (fondo #00A099) |
| Labs: `Estuchado automático`, `Envasado en frasco` | Acondicionamiento | Mal clasificados como forma galénica | Sí (contenido) | Reubicar | — | LABS · Bloque 06 «Acondicionamiento» |
| Labs: «más de 2000 m» | Escala industrial | Falta «²»; enterrado en una frase | Sí | **Sí: dato destacado** | — | LABS · Bloque 06 (gran número) |
| Labs: cifras de capacidad (PNG) | Escala industrial | **Lo mejor de la web, invisible** | **Sí, prioridad máxima** | Pasar a HTML + confirmar unidad y periodo | — | LABS · Bloque 06 (pieza de datos) |
| Labs: Control de Calidad | Confianza | Texto correcto | Sí | Ligeramente | — | LABS · Bloque 08 |
| Labs: 7 sellos (PNG) | Confianza | Invisibles; «FDA APPROVED» es un claim de riesgo | Sí | **Sí: nombre exacto + alcance + entidad** | Revisar «FDA APPROVED» | LABS · Bloque 08 |
| Labs: 10 áreas terapéuticas | Especialización | Iconos pequeños, poca presencia | **Sí** | Formato (listado editorial numerado) | — | LABS · Bloque 09 (fondo #00285C) |
| Tech: lista de intro con 6 nombres alternativos | Servicios | **Duplica** las 6 pestañas con otros nombres | — | Unificar con la denominación oficial | **Sí (la duplicidad)** | TECH · Bloque 02 |
| Tech: 6 servicios | Capacidad I+D | Buen contenido, formato colapsado | **Sí** | Ampliar cada uno | — | TECH · Bloques 05–10 (alternados) |
| Tech: hero imagen estática | — | Rompe la coherencia con Labs (que sí tiene vídeo) | — | Sustituir por vídeo | — | TECH · Bloque 01 |
| Noticias | Actividad | Mezcla ferias, divulgación y avisos internos | Sí | Categorizar | — | NOTICIAS con filtro |
| Contacto: dirección `48B` vs `48-A` | — | Contradicción entre páginas | — | **Unificar** | — | CONTACTO + Footer + Schema |
| Contacto: formulario 13 campos | Captación | Demasiado largo para un primer contacto | Sí | Reducir a 6 + campos opcionales | — | CONTACTO |
| Legales: «INFORMACIÓ GENERAL», «OBJECTO» | — | Catalán dentro de la versión española | — | **Corregir** | — | Legales |
| Aviso legal: «zona de clientes (inactivo)» | — | Declara una función que no existe | — | — | **Sí** | — |
| Footer «© 2023» | — | Desactualizado | — | Año dinámico | — | Footer |

## 3.1 Los 8 señalamientos críticos

1. **Contenido duplicado:** los 6 servicios de Tech aparecen dos veces con nombres distintos en la misma página. La calidad se explica en Labs *y* en Compañía. «Full service» de Labs y «Qué hacemos» de Compañía son casi el mismo texto.
2. **Información poco clara:** «Estuchado automático» como forma galénica. «2000 m». «M» sin unidad ni periodo.
3. **Textos demasiado largos:** la intro de Labs es una sola frase de 42 palabras con cuatro sustantivos abstractos encadenados.
4. **Argumentos comerciales débiles:** «constante obsesión», «los más estrictos estándares», «los mejores productos». Ninguno es verificable ni diferencial.
5. **Información valiosa escondida:** capacidades productivas, historia y certificaciones — los tres activos más vendibles — están dentro de PNG, detrás de pestañas, o ambas cosas.
6. **Cifras que deberían destacarse:** `200M cápsulas` · `150M comprimidos` · `+2000 m²` · `+20 países` · `desde 2000` · `9 formatos` · `10 áreas` · `6 idiomas`.
7. **Falta de evidencia:** ningún certificado con número/alcance, ninguna referencia de cliente, ninguna foto real de planta identificable, ningún dato de plazo, MOQ ni lead time.
8. **Terminología inconsistente:** Control de Calidad / Garantía de calidad / Laboratorio control calidad · Formulación / Project management formulaciones · R+D galénicos / R+D & Desarrollos galénicos · Full service / Servicio integral de producción.

## 3.2 Preguntas abiertas para el cliente (bloqueantes antes de publicar)

| # | Pregunta | Por qué bloquea |
|---|---|---|
| 1 | ¿«M» = millones de unidades? ¿Al año? | Sin esto no se pueden publicar las capacidades |
| 2 | ¿Año de referencia de «más de 20 años»? ¿2000 o 2006? | Cambia el claim de portada |
| 3 | Denominación exacta, entidad y alcance de cada certificado | «FDA APPROVED» es un claim de riesgo regulatorio |
| 4 | Nº de países actual (el dato «+20» es de 2015) | Es un dato de hace 11 años |
| 5 | Nº de empleados, líneas de producción, m² de almacén | Datos de credibilidad hoy inexistentes |
| 6 | ¿Existen IFS / BRC / ISO 9001 / ISO 14001? | Competencia directa suele mostrarlos |
| 7 | Lead time medio y MOQ orientativos | Es la primera pregunta de todo cliente CDMO |
| 8 | ¿Se puede grabar/fotografiar planta y laboratorio? | Condiciona toda la dirección de arte |
| 9 | ¿Se mantiene la «zona de clientes»? | Afecta a arquitectura y a legales |
| 10 | Idiomas de la fase 1 (acordado ES + EN) y destino de CA/FR/IT/ZH | Afecta a rutas, sitemap y hreflang |

---

# 04. POSICIONAMIENTO PROPUESTO

## 4.1 Territorio

> **Virens no es «un laboratorio que fabrica». Es el socio industrial que convierte una idea de producto en unidades en el mercado.**

El activo real de Virens no es la calidad (todos la dicen), es **la combinación de I+D propio + planta propia + regulatorio propio bajo un mismo techo, a 20 km de Barcelona, con capacidad para 200 millones de cápsulas**. El posicionamiento debe apoyarse en lo que es medible.

## 4.2 Idea rectora

**`De la fórmula a la unidad.`**

Una sola línea que contiene las dos divisiones: **Tech** es la fórmula, **Labs** es la unidad. Toda la web se organiza como un recorrido por esa cadena.

## 4.3 Los tres pilares del discurso

| Pilar | Qué dice | Con qué se prueba |
|---|---|---|
| **Capacidad** | Fabricamos a escala industrial en instalaciones propias | +2000 m² · 9 formatos · 200M cápsulas · 150M comprimidos |
| **Control** | Desarrollamos, testamos y certificamos internamente | Laboratorio de control propio · cámara de estabilidad · centro de sabores · ISO 22000 · GMP · HACCP · ECO |
| **Continuidad** | Un solo interlocutor de la idea al mercado | Cadena de 4 etapas · Full Service · regulatory consulting · trayectoria desde 2000 |

## 4.4 Público objetivo (por orden de prioridad)

1. **Marca de complementos** que externaliza fabricación (nacional e internacional) — busca capacidad, formatos y certificados.
2. **Startup/marca nueva** sin producto — busca desarrollo, formulación y factibilidad industrial.
3. **Distribuidor / exportador** — busca certificaciones, mercados y volúmenes.
4. **Segmentos especializados**: veterinaria/mascotas, ecológico, deportivo, infantil.

## 4.5 Tono de marca

Sobrio, técnico, afirmativo. Frases cortas. Cifra antes que adjetivo. Sin superlativos sin evidencia. Ninguna frase que empiece por «Somos líderes», «Nuestro compromiso» o «En un mundo cada vez más».

---

# 05. NUEVA ARQUITECTURA WEB (Fase 3)

## 5.1 Mapa

```
/                                  HOME — editorial completa, no pantalla de acceso
│
├── /virens-labs                    ONE PAGE extensa · Contract Manufacturing
│     #private-label
│     #full-service
│     #formas-galenicas
│     #acondicionamiento
│     #capacidad-productiva
│     #calidad
│     #areas-terapeuticas
│
├── /virens-tech                    ONE PAGE extensa · Development
│     #formulacion
│     #rd-galenicos
│     #centro-de-sabores
│     #estabilidad
│     #garantia-de-calidad
│     #regulatory-consulting
│
├── /compania                       Quiénes somos · Qué hacemos · Calidad · Historia · Instalaciones
│
├── /noticias                       Índice con filtro
│     └── /noticias/[slug]           Artículo (editable por el cliente vía CMS)
│
├── /contacto                       Formulario corto + datos + mapa
│
└── /legal
      ├── /legal/aviso-legal
      ├── /legal/politica-de-privacidad
      ├── /legal/politica-de-cookies
      └── /legal/condiciones-generales-de-venta
```

**Profundidad máxima: 2 niveles.** Ninguna información comercial a más de un clic de la home.
**Idiomas fase 1:** `/` (ES) y `/en/` (EN). Estructura preparada para `ca`, `fr`, `it`, `zh` sin refactor.

## 5.2 Decisiones de arquitectura y por qué

| Decisión | Razón |
|---|---|
| **La home deja de ser una pantalla de acceso** | Hoy pierde el 100 % del mensaje en el primer scroll. La home debe explicar qué es Virens y mostrar las cifras antes de bifurcar |
| **Labs y Tech como one-page largas con anclas** | El brief lo pide y además resuelve el problema real: elimina las pestañas y saca todo el contenido a superficie. Las anclas dan URLs compartibles por servicio |
| **Sin páginas hijas por servicio en fase 1** | Cada servicio tiene 1–3 frases de contenido real. Una página por servicio sería una página vacía. Cuando el cliente aporte contenido, cada ancla se promociona a `/virens-tech/centro-de-sabores` sin romper enlaces |
| **`Instalaciones` dentro de Compañía, no como página** | No hay contenido escrito suficiente; sí puede haber fotografía. Funciona como bloque, no como página |
| **Legales agrupados bajo `/legal/`** | Ordena el footer y aísla lo que no aporta SEO |
| **Menú plegado (hamburguesa)** | Solo hay 6 destinos. Un menú horizontal obliga a comprimir la marca; el overlay permite un header limpio con los tres logos |

## 5.3 Navegación

**Header (fijo, blanco, 80 px):** logo Laboratorios Virens a la izquierda · idioma + icono hamburguesa a la derecha. Sobre hero de vídeo: header transparente con logo en blanco, que pasa a blanco sólido al hacer scroll.

**Overlay de menú (pantalla completa, fondo `#00285C`):**

```
COMPAÑÍA
VIRENS LABS        ← barra fina #00A099 a la izquierda
VIRENS TECH        ← barra fina #A2195B a la izquierda
NOTICIAS
CONTACTO
────────────────────────────
ES · EN
Indústria 48 · Sant Andreu de la Barca
(+34) 936 828 972 · csp@lvirens.com
```

Tipografía Montserrat 48–64 px, una entrada por línea, entrada escalonada de 40 ms. Sin submenús.

**Navegación interna en Labs y Tech:** barra de anclas fina y *sticky* bajo el header, con el ancla activa subrayada en el color de la división. Es lo que sustituye a las pestañas actuales.

**Navegación cruzada entre divisiones:** en Labs, un único acceso a Tech al final. En Tech, un único acceso a Labs. Nunca el botón de la división en la que ya estás.

---

# 06. VIRENS LABS — ESTRUCTURA COMPLETA (wireframe por bloques)

> Ficha por bloque: **Objetivo · Contenido · Layout · Imagen/vídeo · Fondo · Jerarquía · CTA**
> Alto de bloque orientativo en desktop. Todos los textos marcados `LITERAL` proceden de la web actual.

---

### BLOQUE 01 — HERO VÍDEO
- **Objetivo:** situar a Virens como fabricante industrial en 3 segundos.
- **Contenido:**
  - *Eyebrow:* `VIRENS LABS`
  - *H1:* **Expertos en complementos alimenticios**
  - *Subtítulo:* Fabricación por contrato y desarrollo
  - *Párrafo breve (máx. 2 líneas):* Fabricamos complementos alimenticios en formas sólidas y líquidas, en instalaciones propias, con acondicionamiento primario y secundario.
  - *Indicador de scroll* (línea fina vertical animada)
- **Layout:** vídeo a sangre 100 vw × 100 vh (mín. 720 px). Texto anclado abajo-izquierda, sobre la columna 1–7 del grid de 12. Nunca centrado.
- **Vídeo:** cadena de encapsulado / blisteadora / línea de llenado en marcha. Plano medio-corto, cámara fija o travelling lento. Sin personas mirando a cámara. 12–18 s, loop, `muted autoplay playsinline`. Poster JPG obligatorio.
- **Fondo:** vídeo + velo `rgba(0,40,92,0.20)` + degradado inferior `transparent → rgba(0,0,0,0.45)` en el último 40 % para legibilidad.
- **Jerarquía:** eyebrow 13/2.4 · H1 clamp(48→92) peso 700 · subtítulo 20–26 peso 400 · párrafo 16–18 al 80 % opacidad.
- **CTA:** ninguno. Solo el indicador de scroll. *(El brief lo pide: sin botón «Virens Labs» porque ya estás dentro.)*
- **Alto:** 100 vh.

### BLOQUE 02 — DECLARACIÓN DE DIVISIÓN
- **Objetivo:** decir en una frase qué es Virens Labs, y anclar la barra de navegación interna.
- **Contenido:**
  - *Eyebrow:* `CONTRACT MANUFACTURING`
  - *H2 (2 líneas máx.):* Usted vende. Nosotros fabricamos.
  - *Cuerpo* (reescritura del `LITERAL`): Nos ocupamos de la calidad, el servicio y los plazos para que su equipo pueda centrarse en el mercado.
  - *Tres entradas numeradas:* `01 Servicio integral de producción` · `02 Acondicionado primario y secundario` · `03 Private label` — `LITERAL`
- **Layout:** asimétrico. H2 en columnas 1–5; cuerpo y las tres entradas en columnas 7–12. Filete horizontal `#E4E7EB` a 1 px sobre el bloque.
- **Imagen:** ninguna.
- **Fondo:** `#FFFFFF`.
- **Jerarquía:** H2 clamp(36→60) · cuerpo 18/1.65 · entradas con número en `#00A099` 13 px y etiqueta 18 px.
- **CTA:** ninguno.
- **Elemento persistente:** aquí empieza la **barra de anclas sticky** (Private Label · Full Service · Formas galénicas · Acondicionamiento · Capacidad · Calidad · Áreas).

### BLOQUE 03 — PRIVATE LABEL
- **Objetivo:** explicar el servicio de marca blanca.
- **Contenido:** *Número:* `01` · *H3:* Private Label · *Cuerpo:* `LITERAL` de la web (ver §2.3), dividido en dos párrafos cortos.
- **Layout:** **imagen izquierda 55 % / texto derecha 45 %**. Imagen a sangre por el borde izquierdo. Texto con padding interior de 80 px y máximo 520 px de ancho.
- **Imagen:** producto terminado sin marca — bote blanco, blíster, estuche neutro sobre superficie limpia. Macro. Nada de manos sonrientes.
- **Fondo:** `#FFFFFF`.
- **Jerarquía:** número 13 px `#00A099` · H3 32–40 px · cuerpo 17/1.7 `#4A5560`.
- **CTA:** enlace de texto `Hablar de un proyecto de marca propia →`.
- **Alto:** 620–720 px.

### BLOQUE 04 — FULL SERVICE
- **Objetivo:** explicar la modularidad del servicio.
- **Contenido:** *Número:* `02` · *H3:* Full Service · *Cuerpo:* `LITERAL`.
  - *Cuatro modalidades extraídas del literal, como lista con filete:* Desarrollo completo de producto · Fabricación parcial · Fabricación a granel · Acondicionamiento parcial o completo.
- **Layout:** **invertido respecto al 03: texto izquierda 45 % / imagen derecha 55 %**, imagen a sangre por el borde derecho.
- **Imagen:** línea de acondicionamiento en funcionamiento, plano largo, perspectiva de nave.
- **Fondo:** `#F4F6F8`.
- **Jerarquía:** igual que el bloque 03. Las cuatro modalidades separadas por filete de 1 px `#D9DEE4`.
- **CTA:** ninguno (la lista es la información).

### BLOQUE 05 — FORMAS GALÉNICAS
- **Objetivo:** demostrar amplitud técnica de fabricación.
- **Contenido:**
  - *Eyebrow:* `FORMAS GALÉNICAS`
  - *H2:* Sólidas y líquidas
  - *Cuerpo:* `LITERAL` (frase de formas sólidas y líquidas).
  - *Rejilla de 8 ítems* — **corregida**: se retiran `Estuchado automático` y `Envasado en frasco` (van al bloque 06 por ser acondicionamiento):
    `Cápsulas` · `Comprimidos` · `Jarabes` · `Viales` · `Goteros` · `Sticks` · `Sobres` · `Blísters`
- **Layout:** rejilla 4 × 2 en desktop, 2 × 4 en tablet, 2 × 4 en móvil. Cada celda: icono lineal blanco 48 px + etiqueta. Sin caja, sin borde, sin sombra: solo aire y un filete de 1 px `rgba(255,255,255,0.25)` entre filas.
- **Imagen:** fotografía de planta a sangre en la mitad superior del bloque, tratada en **blanco y negro + virado `#00A099`** (`filter: grayscale(1)` + capa `mix-blend-mode: multiply` en `#00A099` al 85 %).
- **Fondo:** `#00A099`.
- **Jerarquía:** todo blanco. Eyebrow 13/2.4 al 70 % · H2 40–56 · cuerpo 17 al 85 % · etiquetas 15 px peso 600.
- **CTA:** ninguno.
- **Nota para desarrollo:** iconografía lineal blanca de 1,5 px, trazo uniforme, dibujada a medida (los `ico-XX.png` actuales no se reutilizan).

### BLOQUE 06 — CAPACIDAD PRODUCTIVA *(pieza clave de la página)*
- **Objetivo:** convertir el mayor activo de la empresa en la pieza más memorable de la web.
- **Contenido:**
  - *Eyebrow:* `CAPACIDAD PRODUCTIVA`
  - *H2:* Escala industrial propia
  - *Tres grandes números:* `+2000 m²` instalaciones · `9` formatos de producción · `2` líneas de acondicionamiento (primario y secundario)
  - *Tabla visual de capacidades* (silueta de envase + cifra + rango), datos `LITERAL` del PNG actual:

    | Cápsulas 200M | Comprimidos 150M | Viales 20M · 10–25 ml | Blísters 15M · PVDC-PVC/Alu + Alu/Alu |
    |---|---|---|---|
    | **Sticks 10M** · 5–20 g | **Sobres 10M** · 5–10 g | **Frascos 10M** · 50–500 ml | **Goteros 5M** · 30–60 ml |
    | **Jarabes 5M** · 100–1000 ml | | | |

  - *Sub-bloque `Acondicionamiento`:* `Estuchado automático` · `Envasado en frasco` · Acondicionado primario y secundario — `LITERAL`, reubicado desde formas galénicas.
  - *Nota al pie obligatoria:* pendiente de confirmar la unidad y el periodo (**«unidades/año»**) con el cliente antes de publicar.
- **Layout:** dos partes. Arriba, los tres grandes números en tres columnas con filete divisor vertical. Abajo, rejilla de 5 columnas × 2 filas con las siluetas de envase en línea (SVG, trazo 1,5 px `#00285C`), cifra en 40–56 px y rango en 13 px.
- **Imagen:** **ninguna fotografía.** Solo siluetas SVG dibujadas. Es un bloque de datos, no decorativo.
- **Fondo:** `#F4F6F8`.
- **Jerarquía:** grandes números clamp(56→96) peso 700 `#00285C` · etiqueta 13/2.4 · cifras de formato 40–56 `#00285C` · rango 13 px `#6B7684`.
- **CTA:** `Descargar ficha de capacidades (PDF)` — *si el cliente la proporciona; si no, se retira*.
- **Alto:** 900–1100 px. Es el bloque con más aire de la página.

### BLOQUE 07 — INSTALACIONES (imagen a sangre)
- **Objetivo:** dar respiro visual y prueba física entre dos bloques densos.
- **Contenido:** una sola línea sobre la imagen: `Sant Andreu de la Barca, Barcelona. Instalaciones propias desde 2000.` — dato `LITERAL` (imagen de historia).
- **Layout:** imagen 100 vw × 70 vh, texto en la esquina inferior izquierda.
- **Imagen:** exterior o nave interior real, luz natural, sin personas. Alternativa: plano cenital de línea de producción.
- **Fondo:** fotografía + velo `rgba(0,40,92,0.25)`.
- **CTA:** ninguno.

### BLOQUE 08 — CALIDAD Y CERTIFICACIONES
- **Objetivo:** sustituir la afirmación de calidad por evidencia.
- **Contenido:**
  - *Eyebrow:* `GARANTÍA DE CALIDAD`
  - *H2:* Control propio en cada lote
  - *Cuerpo:* `LITERAL` del texto de Control de Calidad.
  - *Tira de certificaciones en HTML* (no imagen): `ISO 22000` · `GMP` · `HACCP` · `Certificación ECO` · `Producto veterinario` · `European Manufactured` · *(«FDA APPROVED» sujeto a revisión — ver §3.2)*. Cada una con **entidad certificadora y alcance** en 12 px bajo el nombre.
- **Layout:** texto en columnas 1–5; certificaciones en rejilla 3 × 2 en columnas 7–12, cada una en celda con filete de 1 px, sin sombra.
- **Imagen:** una sola fotografía de laboratorio de control (pipeta, vial de muestra, campana) en columnas 1–5 bajo el texto.
- **Fondo:** `#FFFFFF`.
- **CTA:** ninguno.

### BLOQUE 09 — ÁREAS TERAPÉUTICAS
- **Objetivo:** demostrar especialización por categoría.
- **Contenido:** *Eyebrow:* `ÁREAS TERAPÉUTICAS` · *H2:* Diez categorías de producto · *Cuerpo:* `Nuestro expertise abarca las siguientes áreas:` — `LITERAL`
  - `01 Control peso` · `02 Sist. Nervioso` · `03 Articulaciones` · `04 Digestivo` · `05 Infantil` · `06 Cardiovascular` · `07 Inmunitario` · `08 Salud Mujer` · `09 Mascotas` · `10 Sport nutrition` — **denominaciones verificadas contra la web, sin cambios**
- **Layout:** listado editorial en **dos columnas de 5** en desktop; una columna en móvil. Cada línea: círculo de 44 px con el número + etiqueta. Filete de 1 px `rgba(255,255,255,0.15)` bajo cada línea.
- **Imagen:** ninguna. **Sin iconos. Sin flechas.**
- **Fondo:** `#00285C`.
- **Jerarquía:** círculos `#00A099` con número blanco 14 px peso 700 · etiquetas 22–28 px peso 500 blancas · H2 40–56 blanco.
- **CTA:** ninguno.
- **Alto:** 700–800 px.

### BLOQUE 10 — PASO A VIRENS TECH
- **Objetivo:** conducir a la otra división. **Único acceso cruzado de la página.**
- **Contenido:** *Eyebrow:* `LA OTRA MITAD DEL PROCESO` · *H2:* ¿Todavía no tiene la fórmula? · *Cuerpo:* Virens Tech desarrolla, formula y valida el producto antes de fabricarlo. · *Botón:* `VIRENS TECH →`
- **Layout:** bloque centrado, ancho máximo 760 px, mucho aire vertical.
- **Fondo:** `#FFFFFF`, con un filete superior de 2 px en degradado `#00A099 → #A2195B` a modo de transición entre divisiones.
- **Botón:** relleno `#A2195B`, texto blanco, radio 999 px, 18 px × 40 px.
- **Nota:** **no aparece ningún botón «Virens Labs»** en esta página.

### BLOQUE 11 — CTA CONTACTO
- **Contenido:** *H2:* ¿Hablamos de tu proyecto? · *Botón:* `Contactar ahora` (relleno `#A2195B`, blanco, radio 999 px) · *Debajo, en 14 px:* (+34) 936 828 972 · csp@lvirens.com
- **Layout:** centrado, 100 % de ancho, 320 px de alto.
- **Fondo:** `#F4F6F8`.

### BLOQUE 12 — FOOTER
Ver §10.9.

---

# 07. VIRENS TECH — ESTRUCTURA COMPLETA (wireframe por bloques)

> Misma arquitectura visual que Labs. Color de acento `#A2195B`.
> Los seis servicios **no van en tarjetas**: cada uno es un bloque completo, alternando imagen/texto.

---

### BLOQUE 01 — HERO VÍDEO
- **Objetivo:** situar a Tech como el laboratorio de desarrollo.
- **Contenido:** *Eyebrow:* `VIRENS TECH` · *H1:* **Development** · *Subtítulo:* I+D, formulación y servicio integral · *Párrafo breve:* Desarrollamos fórmulas propias, verificamos su factibilidad industrial y las validamos antes de fabricar. · *Botón:* `VIRENS LAB` — relleno `#00A099`, texto blanco, radio 999 px.
- **Layout:** vídeo a sangre 100 vw × 100 vh. Texto abajo-izquierda, columnas 1–7. Botón bajo el párrafo.
- **Vídeo:** laboratorio de formulación — pipeteo, balanza de precisión, vasos de precipitados, polvos, cámara de estabilidad. Plano corto, poca profundidad de campo, luz fría neutra. 12–18 s, loop, mudo.
- **Fondo:** vídeo + velo `rgba(0,40,92,0.20)` + degradado inferior.
- **Jerarquía:** idéntica a Labs 01.
- **Nota:** **no aparece ningún botón «Virens Tech»** en esta página.

### BLOQUE 02 — DECLARACIÓN DE DIVISIÓN
- **Contenido:** *Eyebrow:* `DEVELOPMENT` · *H2:* La fórmula tiene que funcionar en planta. · *Cuerpo:* reescritura del `LITERAL` de la intro. · *Seis entradas numeradas* con la **denominación oficial unificada** (se elimina la lista duplicada actual): `01 Formulación` · `02 R+D galénicos` · `03 Centro de sabores` · `04 Estabilidad de productos` · `05 Garantía de calidad` · `06 Regulatory consulting`
- **Layout:** H2 en columnas 1–5; cuerpo y las seis entradas (2 columnas × 3) en columnas 7–12.
- **Fondo:** `#FFFFFF`.
- **Elemento persistente:** inicio de la barra de anclas sticky con los seis servicios.

### BLOQUE 03 — SOLUCIONES INTEGRADAS *(bloque tipográfico, sin fotografía)*
- **Objetivo:** enunciar la propuesta integral con una pausa visual fuerte.
- **Contenido:**
  - *Título pequeño:* `SOLUCIONES INTEGRADAS` — en **`#00285C`**
  - *Título principal:* **De la idea al producto final** — blanco
  - *Texto:* Acompañamos cada etapa del desarrollo de tu producto con un enfoque integral, flexible y orientado a resultados.
  - *Cuatro entradas:* Desarrollo a medida · Alta calidad garantizada · Cumplimiento normativo · Innovación constante
- **Layout:** contenido centrado con ancho máximo de 900 px, o alineado a izquierda en columnas 1–8. Las cuatro entradas en una fila de 4 en desktop y 2 × 2 en móvil, separadas por filete vertical de 1 px `rgba(255,255,255,0.3)`.
- **Imagen:** **ninguna.** Elementos gráficos moleculares abstractos en SVG: nodos y enlaces de trazo 1 px en `rgba(255,255,255,0.12)`, colocados fuera del área de texto, sin animación o con deriva muy lenta (respetando `prefers-reduced-motion`).
- **Fondo:** `#A2195B`.
- **Jerarquía:** título pequeño 13/2.4 peso 700 `#00285C` · título principal clamp(44→72) peso 700 blanco · texto 18–20 blanco al 90 % · entradas 16 px peso 600 blancas.
- **CTA:** ninguno.
- **Alto:** 600–700 px.

---
## Los seis servicios — composición editorial alternada
Fotografía al **45–60 %** del ancho, texto en el resto. Aire vertical de 140–180 px entre bloques. Numeración `01`–`06` en `#A2195B`.

### BLOQUE 04 — `01 FORMULACIÓN` · **IMAGEN IZQUIERDA / TEXTO DERECHA**
- **Contenido:** H3 `Formulación`. Cuerpo `LITERAL` en dos párrafos (departamento de I+D · zonas de fabricación separadas). Dato destacado: `Zonas de fabricación segregadas`.
- **Imagen (55 %):** científico trabajando con pipeta y vasos de laboratorio, mezclas y pesadas. Plano medio, manos y material en foco, sin mirada a cámara.
- **Fondo:** `#FFFFFF`.

### BLOQUE 05 — `02 R+D GALÉNICOS` · **TEXTO IZQUIERDA / IMAGEN DERECHA**
- **Contenido:** H3 `R+D galénicos`. Cuerpo `LITERAL`. Enlace de texto: `Ver formas galénicas disponibles →` a `/virens-labs#formas-galenicas`.
- **Imagen (55 %):** cápsulas, comprimidos y polvos en contexto de laboratorio; bandeja de muestras, distintas formas farmacéuticas juntas. Macro.
- **Fondo:** `#F4F6F8`.

### BLOQUE 06 — `03 CENTRO DE SABORES` · **IMAGEN IZQUIERDA / TEXTO DERECHA**
- **Contenido:** H3 `Centro de sabores`. Cuerpo `LITERAL`. Dato destacado: `Validación organoléptica antes de escalar`.
- **Imagen (60 %):** extractos, goteros, aromas, cítricos y planta fresca, ensayo organoléptico. Es el único bloque donde el color puede ser cálido y saturado: contrasta bien con el resto.
- **Fondo:** `#FFFFFF`.

### BLOQUE 07 — `04 ESTABILIDAD DE PRODUCTOS` · **TEXTO IZQUIERDA / IMAGEN DERECHA**
- **Contenido:** H3 `Estabilidad de productos`. Cuerpo `LITERAL`. Dato destacado: `Cámara de estabilidad propia`.
- **Imagen (55 %):** interior de cámara climática con bandejas de muestras etiquetadas; o panel de control con temperatura y humedad. Luz fría.
- **Fondo:** `#F4F6F8`.

### BLOQUE 08 — `05 GARANTÍA DE CALIDAD` · **IMAGEN IZQUIERDA / TEXTO DERECHA**
- **Contenido:** H3 `Garantía de calidad`. Cuerpo `LITERAL` (controles microbiológicos y físico-químicos, en proceso y en producto acabado). Dos etiquetas: `Control microbiológico` · `Control físico-químico`.
- **Imagen (55 %):** microscopía, placa de cultivo, tubos de ensayo, control de muestras. Nada de batas posando.
- **Fondo:** `#FFFFFF`.

### BLOQUE 09 — `06 REGULATORY CONSULTING` · **TEXTO IZQUIERDA / IMAGEN DERECHA**
- **Contenido:** H3 `Regulatory consulting`. Cuerpo `LITERAL` (dosieres técnicos, documentación comercial, registros y notificaciones). Tres etiquetas: `Dosier técnico` · `Notificación de producto` · `Documentación para exportación`.
- **Imagen (55 %):** documentación técnica y dossier sobre mesa, archivadores, sellos de registro. Cenital o plano corto. **Sin gente firmando ni apretones de manos.**
- **Fondo:** `#F4F6F8`.

### BLOQUE 10 — CIFRAS DE TECH
- **Contenido:** `2023` creación de Virens Tech y nuevo laboratorio de calidad · `+20` años de experiencia en formulación · `10` áreas terapéuticas — todos `LITERAL`.
- **Layout:** tres columnas con filete divisor vertical, grandes números.
- **Fondo:** `#00285C`, números en `#FFFFFF`, etiquetas en `#00A099`.

### BLOQUE 11 — PASO A VIRENS LABS
- **Contenido:** *Eyebrow:* `LA OTRA MITAD DEL PROCESO` · *H2:* ¿La fórmula ya está lista? · *Cuerpo:* Virens Labs la fabrica y la acondiciona en instalaciones propias. · *Botón:* `VIRENS LAB →` relleno `#00A099`.
- **Fondo:** `#FFFFFF` con filete superior en degradado `#A2195B → #00A099`.

### BLOQUE 12 — CTA CONTACTO
Idéntico a Labs bloque 11.

### BLOQUE 13 — FOOTER
Ver §10.9.

---

# 07.b HOME — ESTRUCTURA (referencia)

| # | Bloque | Fondo | Contenido |
|---|---|---|---|
| 01 | Hero vídeo a sangre | vídeo + velo 20 % | Eyebrow `LABORATORIOS VIRENS` · H1 **Expertos en complementos alimenticios** · Sub `Fabricación por contrato y desarrollo` |
| 02 | Franja de datos | `#FFFFFF` | `Desde 2000` · `+2000 m²` · `+20 países` · `9 formatos` — 4 columnas con filete |
| 03 | Las dos divisiones | `#F4F6F8` | Dos bloques grandes a media pantalla: **VIRENS LABS** (barra `#00A099`, «Fabricación por contrato») y **VIRENS TECH** (barra `#A2195B`, «I+D y desarrollo de producto»). Imagen a sangre en cada mitad |
| 04 | Cómo trabajamos | `#FFFFFF` | Las 4 etapas `LITERAL` de Compañía, numeradas 01–04, en línea horizontal con filete |
| 05 | Capacidad (resumen) | `#00285C` | `200M cápsulas` · `150M comprimidos` · `+2000 m²` + enlace `Ver capacidad completa →` |
| 06 | Certificaciones | `#FFFFFF` | Tira en HTML con alcance |
| 07 | Áreas terapéuticas (resumen) | imagen a sangre | Las 10 en una línea tipográfica + enlace |
| 08 | Noticias | `#F4F6F8` | Últimas 3 entradas |
| 09 | CTA contacto | `#A2195B` | ¿Hablamos de tu proyecto? |
| 10 | Footer | `#00285C` | — |

---

# 08. COPY PROPUESTO (Fase 4)

> **Formato:** se muestra el texto actual y la propuesta, para que el cliente apruebe cada cambio.
> Ningún servicio nuevo, ninguna cifra nueva, ninguna capacidad inventada. Solo redacción.
> Regla aplicada: frases cortas, español profesional, sin superlativos sin evidencia, terminología técnica intacta.

## 8.1 Marca

| Elemento | Propuesta |
|---|---|
| **Claim principal** | **Expertos en complementos alimenticios** |
| **Bajada** | Fabricación por contrato y desarrollo |
| **Descriptor de una línea** | Laboratorio de fabricación y desarrollo de complementos alimenticios en Barcelona. |
| **Idea rectora interna** | De la fórmula a la unidad |

*(Se mantiene «Experts in food supplements» **solo** en la versión EN. En la versión ES se traduce. Hoy conviven mezclados.)*

## 8.2 Home

**H1** · Expertos en complementos alimenticios
**Subtítulo** · Fabricación por contrato y desarrollo
**Entradilla** · Desarrollamos, fabricamos y acondicionamos complementos alimenticios en instalaciones propias en Barcelona. Formas sólidas y líquidas, nueve formatos, certificación ISO 22000 y GMP.

**H2 divisiones** · Dos divisiones, un mismo proceso
- **Virens Labs — Fabricación por contrato.** Producción, acondicionamiento primario y secundario, y marca propia. → `Ver Virens Labs`
- **Virens Tech — Desarrollo.** Formulación, galénica, estabilidad, calidad y regulatorio. → `Ver Virens Tech`

**H2 proceso** · Cómo trabajamos
`01 Desarrollo y formulación` · `02 Fabricación y envasado` · `03 Acondicionado` · `04 Control de calidad` — *(literal de Compañía, sin cambios)*

## 8.3 Virens Labs

| Actual (literal) | Propuesta |
|---|---|
| «En Virens Labs sabemos de la importancia de nuestros clientes con sus necesidades de calidad, servicio, competitividad y fidelidad de su fabricante. Virens Labs le ofrece todo ello para que nuestros clientes se preocupen únicamente de vender sus productos.» | **H2:** Usted vende. Nosotros fabricamos.<br>**Cuerpo:** Nos ocupamos de la calidad, el servicio y los plazos. Su equipo se centra en el mercado.<br>`01 Servicio integral de producción` · `02 Acondicionado primario y secundario` · `03 Private label` |
| **Private Label** — «En Virens contamos con una amplia experiencia en el desarrollo de fórmulas personalizadas y únicas…» | **H3:** Private Label<br>Desarrollamos fórmulas exclusivas a partir de su idea inicial.<br>Nos adaptamos a sus requerimientos técnicos y comerciales. Nuestro equipo de I+D construye la fórmula con trazabilidad completa del proceso. |
| **Full Service** — «Virens ofrece un servicio integral. Desde el desarrollo del producto a su entrega…» | **H3:** Full Service<br>Del desarrollo a la entrega del producto terminado.<br>Intervenimos en el punto que necesite: desarrollo completo · fabricación parcial · fabricación a granel · acondicionamiento parcial o completo. |
| **Formas galénicas** — «…sólidas (comprimidos, capsulas) y líquidos (jarabes) con distintos formatos: blister, bote, stick, viales, drops.» | **H2:** Sólidas y líquidas<br>Fabricamos en forma sólida —comprimidos y cápsulas— y líquida —jarabes—, con acabado en ocho formatos.<br>Cápsulas · Comprimidos · Jarabes · Viales · Goteros · Sticks · Sobres · Blísters |
| **Capacidad** — «Contamos con más de 2000 m de instalaciones donde llevamos a cabo la fabricación, acondicionamiento primario y secundario.» | **H2:** Escala industrial propia<br>Más de **2.000 m²** de instalaciones para fabricación y acondicionamiento primario y secundario.<br>*(+ tabla de capacidades en HTML, pendiente de confirmar unidad y periodo)* |
| **Control de calidad** — «Nuestro Laboratorio de Control de Calidad está equipado tecnológicamente para garantizar el cumplimiento de las más exigentes especificaciones…» | **H2:** Control propio en cada lote<br>Nuestro laboratorio de control de calidad verifica el cumplimiento de las especificaciones del producto. Fabricamos bajo normas GMP.<br>*(+ certificaciones con entidad y alcance)* |
| «Nuestro compromiso con la calidad se traduce en las siguientes certificaciones:» | **Certificaciones** *(como titular, sin frase de relleno)* |
| **Áreas terapéuticas** — «Nuestro expertise abarca las siguientes áreas:» | **H2:** Diez categorías de producto<br>Formulamos y fabricamos en las siguientes áreas: *(los 10 nombres se mantienen literales)* |

## 8.4 Virens Tech

| Actual (literal) | Propuesta |
|---|---|
| «En Virens Tech ayudamos a nuestros clientes a tener los mejores productos, con exclusividad en los desarrollos, asegurando que sus fórmulas son industrialmente factibles…» | **H2:** La fórmula tiene que funcionar en planta.<br>Desarrollamos productos en exclusiva y verificamos su factibilidad industrial antes de fabricar. Testamos estabilidad en cámara propia para calidad interna y exportación, con controles y análisis completos. |
| Lista de intro duplicada (6 nombres alternativos) | **Se elimina la duplicidad.** Se usan las seis denominaciones oficiales: `01 Formulación` · `02 R+D galénicos` · `03 Centro de sabores` · `04 Estabilidad de productos` · `05 Garantía de calidad` · `06 Regulatory consulting` |
| **Formulación** | **H3:** Formulación<br>Nuestro departamento de I+D desarrolla fórmulas nuevas junto a los equipos técnicos del cliente.<br>Trabajamos en zonas de fabricación separadas para aislar cada producto y evitar el contacto entre procesos. |
| **R+D galénicos** | **H3:** R+D galénicos<br>Elegimos la forma galénica adecuada para cada proyecto, atendiendo a la legislación vigente, el uso previsto y la dosificación. |
| **Centro de sabores** | **H3:** Centro de sabores<br>Espacio dedicado a pruebas de gusto y aroma. Verificamos que el producto formulado sea viable comercialmente antes de escalar. |
| **Estabilidad de productos** | **H3:** Estabilidad de productos<br>Cámara de estabilidad propia. Determinamos el tiempo de conservación y el periodo de utilización en condiciones definidas de envase y almacenamiento. |
| **Garantía de calidad** | **H3:** Garantía de calidad<br>Controles microbiológicos y físico-químicos durante el proceso de fabricación y sobre el producto acabado. |
| **Regulatory consulting** | **H3:** Regulatory consulting<br>Elaboramos dosieres técnicos y documentación comercial. Gestionamos registros y notificaciones de producto para los mercados de destino. |

**Bloque Soluciones integradas** *(texto facilitado en el briefing, se mantiene literal):*
`SOLUCIONES INTEGRADAS` / **De la idea al producto final** / «Acompañamos cada etapa del desarrollo de tu producto con un enfoque integral, flexible y orientado a resultados.» / Desarrollo a medida · Alta calidad garantizada · Cumplimiento normativo · Innovación constante

## 8.5 Compañía

**H1** · Fabricamos complementos alimenticios desde 2006
**Entradilla** · Laboratorios Virens desarrolla y fabrica complementos alimenticios en instalaciones propias en Sant Andreu de la Barca, Barcelona. Las instalaciones se construyeron en 2000 como laboratorio farmacéutico y se adaptaron a complementos alimenticios en 2006.
*(Los dos datos son literales de la línea de tiempo. Resuelve la ambigüedad de «más de 20 años».)*

**H2 Qué hacemos** · Soluciones integrales — *(cuerpo literal, sin cambios)*
**H2 Nuestra historia** · Seis hitos, 2000–2023 — *(literal de la imagen, pasado a HTML)*
**H2 Nuestra calidad** — se sustituye «constante obsesión» por: Certificamos el sistema y el producto. ISO 22000 y GMP desde 2010; certificación ECO y veterinaria desde 2015.

## 8.6 Microcopy y CTA

| Contexto | Texto |
|---|---|
| CTA principal global | `Contactar ahora` |
| Titular de CTA | `¿Hablamos de tu proyecto?` |
| CTA de sección | `Hablar de un proyecto de marca propia →` |
| Enlace entre divisiones | `VIRENS LAB →` / `VIRENS TECH →` |
| Indicador de scroll en hero | `Desplázate` |
| Botón de menú | `Menú` / `Cerrar` |
| Formulario, enviado | `Mensaje enviado. Le responderemos en un máximo de 48 horas laborables.` *(el plazo debe confirmarlo el cliente)* |
| Formulario, error | `Revise los campos marcados.` |
| Adjunto | `Adjuntar briefing o especificación (PDF, máx. 10 MB)` |
| Nota bajo capacidades | `Capacidades orientativas. Consulte disponibilidad para su formato.` |
| Estado vacío de noticias | `No hay entradas en esta categoría todavía.` |

## 8.7 Vocabulario — decisiones cerradas

| Usar siempre | No usar |
|---|---|
| Garantía de calidad | Control de Calidad / Laboratorio control calidad *(como nombre de servicio)* |
| Formulación | Project management formulaciones |
| R+D galénicos | R+D & Desarrollos galénicos |
| Full Service | Servicio integral de producción *(como nombre de servicio)* |
| Acondicionamiento primario y secundario | Acondicionado |
| Blísters | Blisters |
| Cápsulas | Capsulas |
| Complementos alimenticios | Suplementos |
| m² | m |

---

# 09. DIRECCIÓN DE ARTE

## 9.1 Principio

**La fotografía es información, no decoración.** Cada imagen debe mostrar algo que Virens tiene: una máquina, un formato, un instrumento, un espacio. Si una foto no prueba nada, se sustituye por aire o por un bloque de color.

## 9.2 Qué fotografiar (por orden de prioridad)

1. **Máquina en movimiento** — encapsuladora, blisteadora, llenadora, estuchadora. Con producto en marcha.
2. **Producto en formato** — cápsulas cayendo, comprimidos en tolva, blíster saliendo de línea, stick sellándose.
3. **Laboratorio de control** — pipeta, matraz, balanza analítica, placa de cultivo, microscopio.
4. **Cámara de estabilidad** — bandejas etiquetadas, panel de temperatura y humedad.
5. **Centro de sabores** — extractos, goteros, cítricos, planta fresca. Único bloque con color cálido.
6. **Espacio** — nave, pasillo técnico, almacén, sala limpia. Sin gente.
7. **Personal técnico trabajando** — de espaldas o de perfil, atento a la tarea. **Nunca mirando a cámara.**

## 9.3 Tratamiento

| Contexto | Tratamiento |
|---|---|
| Fotografía general | Color natural, contraste medio, ligera desaturación. Blancos algo fríos. Sin viñeteo, sin HDR |
| Bloque `#00A099` (formas galénicas) | B/N + virado `#00A099`: `filter: grayscale(1) contrast(1.05)` + capa `#00A099` con `mix-blend-mode: multiply` al 85 % |
| Bloque `#00285C` | B/N + virado `#00285C` con el mismo método, opacidad 80 % |
| Hero de vídeo | Velo `rgba(0,40,92,0.20)` + degradado inferior a `rgba(0,0,0,0.45)` |
| Imagen a sangre con texto | Velo `rgba(0,40,92,0.25)` |

**Encuadre:** horizontal 16:9 y 3:2 para bloques a sangre; 4:5 vertical para las composiciones editoriales alternadas. Aire alrededor del sujeto. Composición asimétrica; el sujeto raramente centrado.

## 9.4 Prohibiciones

Médicos con estetoscopio · hospitales · consultas · poses corporativas · reuniones de stock · apretones de manos · científicos sonriendo a cámara · azul clínico saturado · renders futuristas · hélices de ADN 3D · hologramas · partículas y redes neuronales genéricas · imágenes con artefactos evidentes de IA · degradados morado-azul de startup · mockups de portátil.

## 9.5 Vídeo

- 12–18 s, en bucle, mudo, sin locución ni rótulos.
- Un solo tema por hero: **Labs = producción**, **Tech = laboratorio**.
- Cámara fija o travelling muy lento. Sin cortes rápidos, sin zoom digital.
- Entregar en `.webm` (VP9) + `.mp4` (H.264), ≤ 3 MB, 1920×1080, y **poster JPG obligatorio**.
- Móvil: el vídeo se sustituye por el poster (ahorro de datos) o por una versión recortada de ≤ 1,2 MB.
- Respetar `prefers-reduced-motion: reduce` → mostrar poster estático.

## 9.6 Grafismo

- **Siluetas de envase** en SVG con trazo de 1,5 px para el bloque de capacidad. Es la firma gráfica de la web.
- **Iconografía** solo en el bloque de formas galénicas: lineal, blanca, 1,5 px, 48 px, dibujada a medida. Sin círculo de fondo, sin relleno.
- **Numeración** `01`–`10` como recurso constante de jerarquía.
- **Filetes de 1 px** como único separador. Sin sombras en ningún elemento.
- **Moléculas abstractas** solo en el bloque `#A2195B` de Tech: nodos y enlaces de 1 px al 12 % de opacidad, fuera del área de texto.

---

# 10. SISTEMA VISUAL (Fase 6)

## 10.1 Color

| Token | Hex | Uso |
|---|---|---|
| `--c-blue` | `#00285C` | Color corporativo. Titulares, fondos oscuros, footer, menú |
| `--c-labs` | `#00A099` | Virens Labs. Fondos de bloque, círculos de numeración, acentos |
| `--c-tech` | `#A2195B` | Virens Tech. Fondos de bloque, botón de CTA global |
| `--c-white` | `#FFFFFF` | Fondo base |
| `--c-gray-50` | `#F7F8FA` | Fondo alterno muy claro |
| `--c-gray-100` | `#F4F6F8` | Fondo de bloque claro (el gris de trabajo) |
| `--c-gray-200` | `#E4E7EB` | Filetes y bordes |
| `--c-gray-300` | `#D9DEE4` | Filetes sobre gris |
| `--c-gray-500` | `#6B7684` | Texto secundario, notas |
| `--c-gray-700` | `#4A5560` | Texto de cuerpo sobre blanco |
| `--c-ink` | `#0B1520` | Texto máximo contraste (uso puntual) |

**Reglas de color**
- Nunca `#00A099` y `#A2195B` juntos en el mismo bloque, salvo el filete de transición entre divisiones.
- Sobre `#00A099` y `#A2195B`, el texto siempre es blanco puro.
- `#00285C` sobre `#A2195B` **solo** para el título pequeño «SOLUCIONES INTEGRADAS» (indicado en el briefing). Contraste medido: **2,3:1** — es un uso decorativo de rótulo, no de texto de lectura; debe ir en 13 px peso 700 con `letter-spacing` amplio y **nunca** por debajo de 12 px.
- Sin degradados, salvo los velos de legibilidad sobre imagen y el filete de 2 px de transición entre divisiones.

## 10.2 Tipografía

**Montserrat** (400 / 500 / 600 / 700) como sistema completo. Variable font, subconjuntos `latin` y `latin-ext`, `font-display: swap`, precarga del woff2 del peso 400 y 700.
**Serif editorial opcional** para titulares por encima de 64 px: **Newsreader** o **Instrument Serif** (Google Fonts, licencia abierta). Uso limitado: como mucho un titular por página. Si genera dudas, se retira: Montserrat sola sostiene el sistema.

### Escala desktop (≥1280 px)

| Rol | Tamaño / interlineado | Peso | Tracking |
|---|---|---|---|
| Display (hero H1) | 92 / 0.98 | 700 | −0.02em |
| H1 de página | 72 / 1.05 | 700 | −0.02em |
| H2 de bloque | 56 / 1.1 | 700 | −0.015em |
| H3 de servicio | 36 / 1.2 | 600 | −0.01em |
| H4 | 24 / 1.3 | 600 | 0 |
| Cuerpo grande (entradilla) | 20 / 1.6 | 400 | 0 |
| Cuerpo | 17 / 1.7 | 400 | 0 |
| Cuerpo pequeño | 15 / 1.6 | 400 | 0 |
| Eyebrow / etiqueta | 13 / 1.2 | 700 | 0.24em · MAYÚSCULAS |
| Dato grande | 96 / 1 | 700 | −0.03em |
| Nota al pie | 12 / 1.5 | 400 | 0.02em |

### Escala mobile (<768 px)

| Rol | Tamaño / interlineado |
|---|---|
| Display | 44 / 1.05 |
| H1 | 36 / 1.1 |
| H2 | 30 / 1.15 |
| H3 | 24 / 1.25 |
| Entradilla | 18 / 1.55 |
| Cuerpo | 16 / 1.7 |
| Eyebrow | 11 / 1.2 · tracking 0.2em |
| Dato grande | 52 / 1 |

Fluidez con `clamp()`, por ejemplo: `font-size: clamp(2.75rem, 1.2rem + 5vw, 5.75rem)` para el display.

## 10.3 Grid y medidas

- **Grid:** 12 columnas · *gutter* 32 px desktop / 24 px tablet / 16 px móvil.
- **Ancho máximo de contenido:** `1440 px`. Márgenes laterales: 80 px (≥1440), 48 px (1024–1439), 24 px (768–1023), 20 px (<768).
- **Ancho máximo de texto corrido:** `680 px` (≈ 72 caracteres). Nunca un párrafo a 12 columnas.
- **Bloques a sangre** (vídeo, imagen full bleed, bloques de color): 100 vw, ignorando el contenedor.

## 10.4 Espaciado

Escala base de 8 px: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 96 · 120 · 160 · 200`

| Contexto | Desktop | Mobile |
|---|---|---|
| Padding vertical de sección (estándar) | 160 px | 80 px |
| Padding vertical de sección (respiro) | 200 px | 96 px |
| Padding vertical de sección (compacta) | 120 px | 64 px |
| Separación titular → cuerpo | 32 px | 24 px |
| Separación entre ítems de lista | 24 px | 16 px |
| Padding interior de bloque de color | 120 px vertical | 64 px |

**Regla de aire:** ningún bloque con menos de 120 px de padding vertical en desktop. El ritmo lo da el aire, no el borde.

## 10.5 Botones

| Variante | Especificación |
|---|---|
| **Primario** | Fondo `#A2195B` · texto `#FFFFFF` · radio `999px` · padding `18px 40px` · 15 px peso 600 · tracking 0.04em |
| **Primario Labs** | Igual, fondo `#00A099` |
| **Secundario** | Transparente · borde 1 px `#00285C` · texto `#00285C` · mismo radio y padding |
| **Sobre imagen** | Transparente · borde 1 px `rgba(255,255,255,0.7)` · texto blanco |
| **Enlace de texto** | Sin fondo · 15 px peso 600 · subrayado a 1 px con `text-underline-offset: 6px` · flecha `→` |

**Hover** (200 ms `cubic-bezier(0.4,0,0.2,1)`):
- Primario: oscurecer 8 % + `translateY(-1px)`. Sin sombra.
- Secundario: relleno `#00285C`, texto blanco.
- Enlace de texto: la flecha se desplaza 4 px a la derecha; el subrayado pasa de 1 px a 2 px.
- Imagen dentro de bloque editorial: `scale(1.02)` en 600 ms con `overflow:hidden` en el contenedor.
- **Focus visible:** `outline: 2px solid #00A099; outline-offset: 3px` en todos los elementos interactivos.

## 10.6 Otros elementos

- **Divisores:** `1px solid #E4E7EB` sobre blanco · `rgba(255,255,255,0.15)` sobre color. Nunca más de 1 px.
- **Numeración:** `01`–`10`, dos dígitos siempre. Círculo de 44 px `#00A099` con número blanco 14 px peso 700 solo en el bloque de áreas terapéuticas; en el resto, número suelto en 13 px con tracking amplio.
- **Sombras:** ninguna. Cero `box-shadow` en todo el sistema, salvo el header sticky, que usa un filete inferior de 1 px, no sombra.
- **Radios:** `0` en imágenes, bloques y contenedores. `999px` solo en botones y en los círculos de numeración.
- **Cards:** permitidas **solo** en el listado de noticias. Imagen 16:9, categoría, fecha, titular, filete inferior. Sin borde completo, sin sombra, sin fondo.
- **Animación:** entradas con `opacity 0→1` + `translateY(16px→0)` en 500 ms, disparadas por `IntersectionObserver` con `rootMargin: -10%`. Nunca en más de un elemento por bloque. Todo desactivado bajo `prefers-reduced-motion: reduce`.

## 10.7 Header

Altura 80 px desktop / 64 px móvil. Fondo blanco con filete inferior de 1 px `#E4E7EB`. Sobre un hero de vídeo arranca transparente con el logo en blanco y pasa a blanco sólido tras 80 px de scroll (transición de 300 ms). Contiene: logo · selector `ES / EN` · botón de menú.

## 10.8 Barra de anclas (Labs y Tech)

Sticky a 80 px del borde superior. Altura 56 px. Fondo blanco con opacidad 92 % y `backdrop-filter: blur(8px)`. Enlaces en 13 px con tracking 0.12em. El activo se subraya en 2 px con el color de la división. Con scroll horizontal en móvil, sin barra visible.

## 10.9 Footer

Fondo `#00285C`, texto blanco. Cuatro columnas en desktop, una en móvil.

```
LABORATORIOS VIRENS S.L.        VIRENS LABS          VIRENS TECH        CONTACTO
Indústria 48 · Pol. Ind.        Private Label        Formulación        (+34) 936 828 972
Nord-Est                        Full Service         R+D galénicos      csp@lvirens.com
08740 Sant Andreu de la         Formas galénicas     Centro de sabores  Compañía
Barca, Barcelona (España)       Capacidad            Estabilidad        Noticias
                                Calidad              Garantía calidad
[logo Virens]                   Áreas terapéuticas   Regulatory
──────────────────────────────────────────────────────────────────────────────
© {año} Laboratorios Virens S.L. · Aviso legal · Política de privacidad · Cookies · Condiciones generales de venta        [Kit Digital]
```

> **Nota:** unificar la dirección. Hoy figura «Indústria 48B» en contacto y «Calle Industria 48-A» en el aviso legal. Debe usarse una sola versión en web, footer y datos estructurados.

---

# 11. WIREFRAME TEXTUAL DESKTOP (esqueleto de scroll)

Los bloques están detallados uno a uno en §06 y §07. Este es el esqueleto de ritmo, para verificar de un vistazo que no se repite nunca la misma estructura dos veces seguidas.

## 11.1 Virens Labs

```
┌──────────────────────────────────────────────────────────────┐
│ HEADER transparente · logo blanco · ES/EN · ☰                │
├──────────────────────────────────────────────────────────────┤
│ 01  VÍDEO A SANGRE · 100vh                       [vídeo]     │
│     VIRENS LABS                                              │
│     Expertos en complementos alimenticios                    │
│     Fabricación por contrato y desarrollo                    │
│                                              ↓ Desplázate    │
├──────────────────────────────────────────────────────────────┤
│ ▓ barra de anclas sticky ▓                                   │
├──────────────────────────────────────────────────────────────┤
│ 02  BLANCO · asimétrico 5/7                                  │
│     H2 ...........  │  cuerpo + 01 02 03                     │
├──────────────────────────────────────────────────────────────┤
│ 03  BLANCO · IMAGEN 55% ▓▓▓▓▓▓ │ TEXTO 45%   Private Label   │
├──────────────────────────────────────────────────────────────┤
│ 04  GRIS · TEXTO 45% │ ▓▓▓▓▓▓ IMAGEN 55%      Full Service   │
├──────────────────────────────────────────────────────────────┤
│ 05  ██ #00A099 ██ · foto virada + rejilla 4×2 iconos blancos │
│     FORMAS GALÉNICAS                                         │
├──────────────────────────────────────────────────────────────┤
│ 06  GRIS · datos. 3 grandes números + rejilla 5×2 siluetas   │
│     CAPACIDAD PRODUCTIVA                       [sin foto]    │
├──────────────────────────────────────────────────────────────┤
│ 07  IMAGEN A SANGRE 70vh · una línea de texto                │
├──────────────────────────────────────────────────────────────┤
│ 08  BLANCO · texto 5 col │ certificaciones 3×2 en 7-12       │
├──────────────────────────────────────────────────────────────┤
│ 09  ██ #00285C ██ · listado editorial 5+5, círculos #00A099  │
│     ÁREAS TERAPÉUTICAS                         [sin iconos]  │
├──────────────────────────────────────────────────────────────┤
│ 10  BLANCO · centrado · botón VIRENS TECH (#A2195B)          │
├──────────────────────────────────────────────────────────────┤
│ 11  GRIS · ¿Hablamos de tu proyecto? · Contactar ahora       │
├──────────────────────────────────────────────────────────────┤
│ 12  FOOTER ██ #00285C ██                                     │
└──────────────────────────────────────────────────────────────┘
```

Secuencia de fondos: `vídeo → blanco → blanco → gris → verde → gris → foto → blanco → azul → blanco → gris → azul`.
Secuencia de layouts: `full → asimétrico → img/txt → txt/img → color+rejilla → datos → full → mixto → listado → centrado → CTA → footer`. **Ninguna estructura se repite consecutivamente.**

## 11.2 Virens Tech

```
01  VÍDEO A SANGRE 100vh · Development · botón VIRENS LAB (#00A099)
▓ barra de anclas sticky ▓
02  BLANCO · asimétrico 5/7 · seis servicios numerados
03  ██ #A2195B ██ · SOLO TIPOGRAFÍA · moléculas 1px 12%
    SOLUCIONES INTEGRADAS (#00285C) / De la idea al producto final
04  BLANCO · IMG 55% │ TXT      01 FORMULACIÓN
05  GRIS   · TXT     │ IMG 55%  02 R+D GALÉNICOS
06  BLANCO · IMG 60% │ TXT      03 CENTRO DE SABORES
07  GRIS   · TXT     │ IMG 55%  04 ESTABILIDAD DE PRODUCTOS
08  BLANCO · IMG 55% │ TXT      05 GARANTÍA DE CALIDAD
09  GRIS   · TXT     │ IMG 55%  06 REGULATORY CONSULTING
10  ██ #00285C ██ · tres grandes números
11  BLANCO · centrado · botón VIRENS LAB (#00A099)
12  GRIS · CTA contacto
13  FOOTER ██ #00285C ██
```

> El bloque 03 (tipográfico, magenta) es la pausa que impide que los seis bloques alternados se lean como una lista monótona. Es deliberado que aparezca **antes** de la serie, no en medio.

---

# 12. ADAPTACIÓN MOBILE

| Elemento | Comportamiento en móvil |
|---|---|
| **Hero de vídeo** | `100svh` (no `100vh`, para evitar el salto de la barra del navegador). Si la conexión es lenta o `prefers-reduced-motion`, se muestra el poster. Texto abajo, ancho completo menos 20 px de margen |
| **Bloques imagen/texto** | Se apilan: **siempre imagen arriba, texto debajo**, en los seis servicios. No se alterna en móvil: la alternancia solo tiene sentido con dos columnas |
| **Imagen apilada** | Ancho completo a sangre, ratio 4:5. Texto con 20 px de margen |
| **Formas galénicas** | Rejilla 2 × 4. Icono 40 px. La fotografía virada pasa a 40 vh |
| **Capacidad productiva** | Los tres grandes números en columna, uno por fila, con filete horizontal. La tabla de capacidades pasa a lista vertical: silueta 40 px a la izquierda, cifra y rango a la derecha. **No usar scroll horizontal aquí** |
| **Áreas terapéuticas** | Una sola columna, 10 filas. Círculo 36 px + etiqueta 20 px |
| **Barra de anclas** | Scroll horizontal, sin barra visible, con degradado de 24 px en los bordes para indicar continuidad |
| **Menú** | Overlay a pantalla completa, entradas en 32 px, área táctil de 56 px de alto por entrada |
| **Botones** | Ancho completo (`100%`) en bloques de CTA; en línea en el resto. Altura mínima 48 px |
| **Padding de sección** | 80 px estándar / 96 px respiro / 64 px compacto |
| **Tipografía** | Escala de §10.2. Ningún titular por debajo de 30 px en H2 |
| **Footer** | Acordeón de cuatro secciones, o cuatro bloques apilados con filete |
| **Tablas** | Ninguna tabla real en móvil: todas se convierten en listas de definición |

**Breakpoints:** `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1440`.
**Rendimiento móvil objetivo:** LCP < 2,5 s en 4G. El vídeo nunca bloquea el LCP: el poster es la imagen LCP y se precarga.

---

# 13. RECOMENDACIONES UX

1. **La home debe informar antes de bifurcar.** Hoy obliga a elegir entre dos palabras en inglés sin contexto. El nuevo orden es: qué somos → cifras → las dos divisiones.
2. **Eliminar todas las pestañas.** Es el cambio de UX con mayor impacto: multiplica el contenido visible sin escribir una línea nueva.
3. **Anclas con URL propia.** `/virens-labs#capacidad-productiva` debe poder pegarse en un correo comercial. Hoy no existe forma de enlazar a un contenido concreto.
4. **Barra de anclas sticky** en las dos one-page. Sin ella, una página de 12 bloques desorienta.
5. **Acortar el formulario.** De 13 campos a 5 obligatorios (Nombre, Empresa, Email, País, Mensaje) + un desplegable de departamento + adjunto opcional. Cada campo obligatorio de más reduce el envío.
6. **Confirmación real tras enviar.** Mensaje visible con plazo de respuesta, no un texto que aparece y desaparece.
7. **Un solo CTA por página.** `Contactar ahora`. Los enlaces entre divisiones son navegación, no conversión, y deben distinguirse visualmente (enlace, no botón sólido).
8. **Descargables como captación.** Una ficha de capacidades en PDF es el activo que más pide un cliente CDMO. Si el cliente la facilita, se coloca en el bloque de capacidad.
9. **Fotografía real, aunque sea imperfecta.** Una foto de la propia planta vale más que el mejor banco de imágenes: es la única prueba de que las instalaciones existen.
10. **Accesibilidad como requisito, no como extra.** Vídeo mudo con poster, `prefers-reduced-motion` respetado, foco visible, contraste AA en todo texto de lectura, `alt` descriptivo en cada imagen informativa, y navegación completa por teclado en el menú overlay (trampa de foco y cierre con `Esc`).
11. **Rendimiento como argumento de marca.** Una web de un laboratorio que carga lento contradice el discurso de precisión. Objetivo: LCP < 2,5 s · CLS < 0,1 · INP < 200 ms.
12. **Cookies con rechazo real.** Banner con «Rechazar todas» al mismo nivel visual que «Aceptar». GTM/GA4 solo tras consentimiento.
13. **El blog debe ser editable por el cliente** sin tocar código, y con categorías (`Ferias` · `Divulgación` · `Compañía`) para no mezclar un aviso de vacaciones con un artículo científico.

---

# 14. SEO Y ESTRUCTURA H1/H2

## 14.1 Jerarquía por página

| Página | H1 (único) | H2 |
|---|---|---|
| **Home** | Expertos en complementos alimenticios | Dos divisiones, un mismo proceso · Cómo trabajamos · Capacidad de producción · Certificaciones · Áreas terapéuticas · Actualidad |
| **Virens Labs** | Virens Labs — Fabricación por contrato de complementos alimenticios | Usted vende. Nosotros fabricamos · Sólidas y líquidas · Escala industrial propia · Control propio en cada lote · Diez categorías de producto |
| **Virens Tech** | Virens Tech — Desarrollo y formulación de complementos alimenticios | La fórmula tiene que funcionar en planta · De la idea al producto final · *(H3 por servicio: Formulación · R+D galénicos · Centro de sabores · Estabilidad de productos · Garantía de calidad · Regulatory consulting)* |
| **Compañía** | Fabricamos complementos alimenticios desde 2006 | Quiénes somos · Qué hacemos · Nuestra calidad · Nuestra historia · Instalaciones |
| **Noticias** | Noticias y actualidad de Laboratorios Virens | *(por categoría)* |
| **Contacto** | Contacto | Dónde estamos · Escríbanos |

**Reglas:** un solo H1 por página · nunca saltar de H2 a H4 · los eyebrow no son encabezados (van en `<p>` o `<span>`, no en `<h*>`).

## 14.2 Corrección de los errores actuales
- H1 «Home» → eliminado.
- Dos H1 por página → uno.
- Home sin meta description → añadida.
- Datos en imagen → HTML.

## 14.3 Títulos y descripciones

| Página | `<title>` (≤60) | `meta description` (≤155) |
|---|---|---|
| Home | Laboratorios Virens · Fabricación de complementos alimenticios | Fabricación por contrato y desarrollo de complementos alimenticios en Barcelona. Más de 2.000 m², nueve formatos, ISO 22000 y GMP. |
| Labs | Virens Labs · Contract manufacturing de complementos | Private label y full service en formas sólidas y líquidas. Cápsulas, comprimidos, jarabes, viales, sticks, sobres y blísters. |
| Tech | Virens Tech · I+D y formulación de complementos | Formulación, R+D galénicos, centro de sabores, estabilidad, control de calidad y consultoría regulatoria. |
| Compañía | Compañía · Laboratorios Virens | Laboratorio propio en Sant Andreu de la Barca desde 2000. Historia, calidad, certificaciones e instalaciones. |
| Contacto | Contacto · Laboratorios Virens | Sant Andreu de la Barca, Barcelona. (+34) 936 828 972. Cuéntenos su proyecto de fabricación o desarrollo. |

## 14.4 Términos objetivo *(por volumen de intención B2B, no por volumen de búsqueda)*

`fabricación complementos alimenticios` · `contract manufacturing complementos alimenticios` · `fabricante marca blanca complementos` · `private label suplementos España` · `laboratorio complementos alimenticios Barcelona` · `fabricación cápsulas / comprimidos / sticks / viales por contrato` · `desarrollo y formulación complementos alimenticios` · `CDMO nutracéutica España`
EN: `food supplement contract manufacturer Spain` · `private label supplements Europe` · `nutraceutical CDMO Spain`

## 14.5 Técnico

- **Datos estructurados:** `Organization` + `LocalBusiness` (NIF, dirección unificada, teléfono, geo `41.4578 / 1.9692`, horario), `BreadcrumbList`, `Article` en cada entrada de blog, `FAQPage` si se añade un bloque de preguntas.
- **hreflang** recíproco `es-ES` / `en` + `x-default`. Al retirar CA/FR/IT/ZH de la fase 1, redirigir 301 sus URLs a la equivalente en ES o EN — **nunca dejarlas en 404**.
- **Sitemap y robots** generados en build. Un solo sitemap, sin las 50 entradas duplicadas actuales.
- **Redirecciones 301 obligatorias** desde la web actual:
  `/compania/` → `/compania` · `/virens-labs/` → `/virens-labs` · `/virens-tech/` → `/virens-tech` · `/noticias/` → `/noticias` · `/contacto/` → `/contacto` · `/aviso-legal/` → `/legal/aviso-legal` · `/politica-de-proteccion-de-datos/` → `/legal/politica-de-privacidad` · `/uso-de-cookies/` → `/legal/politica-de-cookies` · `/condiciones-generales-de-venta/` → `/legal/condiciones-generales-de-venta` · **todos los slugs de `/noticias/*` se conservan tal cual**.
- **Imágenes:** AVIF/WebP con fallback, `width`/`height` siempre declarados, `loading="lazy"` salvo la del LCP, `alt` descriptivo real.
- **Canonical** absoluto en todas las páginas. `www` → sin `www` (o al revés) con un solo 301.

---

# 15. CHECKLIST FINAL

## 15.1 Para el diseñador (Figma)

- [ ] Librería de estilos con los 11 tokens de color de §10.1 como *variables*, no como colores sueltos
- [ ] Escala tipográfica completa desktop + mobile como *text styles* (§10.2)
- [ ] Grid de 12 columnas configurado en los tres breakpoints (§10.3)
- [ ] Componentes: Header · Header sobre vídeo · Overlay de menú · Barra de anclas · Botón (5 variantes + hover + focus) · Eyebrow · Círculo numerado · Filete · Card de noticia
- [ ] Bloque plantilla `EditorialSplit` con variante imagen-izquierda / imagen-derecha y control del porcentaje 45–60 %
- [ ] Bloque plantilla `ColorBlock` con variante `#00A099`, `#00285C`, `#A2195B`
- [ ] Siluetas de envase en SVG (9 formatos) con trazo de 1,5 px
- [ ] Iconografía lineal blanca de formas galénicas (8 iconos, 48 px, trazo 1,5 px)
- [ ] Grafismo molecular abstracto para el bloque `#A2195B`
- [ ] **Ninguna sombra en todo el archivo**
- [ ] **Radio 0** salvo botones y círculos
- [ ] Comprobar que ningún bloque queda por debajo de 120 px de padding vertical en desktop
- [ ] Comprobar que no hay dos bloques consecutivos con el mismo fondo ni el mismo layout
- [ ] Maquetas: Home · Labs (completa) · Tech (completa) · Compañía · Noticias · Detalle de noticia · Contacto · Legal — en 1440 y 390 px
- [ ] Estados: hover, focus, formulario con error, formulario enviado, listado de noticias vacío
- [ ] Verificar contraste AA en todo texto de lectura antes de entregar

## 15.2 Para el desarrollador

- [ ] Next.js (App Router) + TypeScript estricto + Tailwind — ver §16
- [ ] Tokens de §10.1 y §10.4 definidos **una sola vez** en el CSS de tema; ningún hex suelto en un componente
- [ ] Todo el contenido en archivos de datos tipados (`src/content/data/*.ts`), nunca escrito dentro del JSX
- [ ] i18n `es` (por defecto) + `en`, con estructura preparada para 4 idiomas más sin refactor
- [ ] Blog editable por el cliente sin tocar código, con categorías
- [ ] Hero de vídeo: `muted autoplay playsinline loop preload="none"` + poster + fuente `webm` y `mp4` + fallback a poster bajo `prefers-reduced-motion` y en móvil
- [ ] Menú overlay accesible: trampa de foco, cierre con `Esc`, `aria-expanded`, bloqueo de scroll del body
- [ ] Barra de anclas con `IntersectionObserver` y `scroll-margin-top` correcto en cada sección
- [ ] Animaciones de entrada solo una vez por elemento, desactivadas bajo `prefers-reduced-motion`
- [ ] Imágenes optimizadas con `next/image`, `sizes` correcto, `priority` únicamente en el LCP
- [ ] Formulario con validación en cliente y servidor, honeypot + rate limit, y confirmación visible
- [ ] Banner de cookies con rechazo al mismo nivel; GA4/GTM solo tras consentimiento
- [ ] Datos estructurados de §14.5
- [ ] Las 9 redirecciones 301 de §14.5 configuradas antes del cambio de DNS
- [ ] `sitemap.xml` y `robots.txt` generados en build
- [ ] Lighthouse ≥ 95 en Rendimiento, Accesibilidad, Prácticas recomendadas y SEO, en móvil
- [ ] Repositorio en Git desde el primer commit y despliegue con preview por rama

## 15.3 Pendiente del cliente (bloquea la publicación)

- [ ] Confirmar unidad y periodo de las capacidades («M» = millones/año)
- [ ] Confirmar el año de referencia de la trayectoria (2000 o 2006)
- [ ] Denominación exacta, entidad y alcance de cada certificado · **revisar «FDA APPROVED»**
- [ ] Número de países actualizado (el «+20» es de 2015)
- [ ] Unificar la dirección postal (48-A / 48B)
- [ ] Autorización y sesión de fotografía y vídeo en planta y laboratorio
- [ ] Ficha de capacidades en PDF, si existe
- [ ] Plazo de respuesta comprometido para el formulario
- [ ] Decisión sobre los idiomas CA / FR / IT / ZH
- [ ] Credenciales de dominio (cdmon) y de analítica, para el cambio de DNS

---

# 16. DECISIÓN DE STACK

**Next.js (App Router) + TypeScript + Tailwind + Framer Motion.**

| Requisito del proyecto | Por qué Next.js lo resuelve |
|---|---|
| Libertad total de maquetación y animación | React puro en todos los componentes. Framer Motion sin restricciones de isla ni de hidratación parcial |
| Vídeo, scroll y componentes interactivos | Cliente completo donde se necesita, servidor donde conviene, decidido componente a componente |
| SEO crítico (es el objetivo del rediseño) | Renderizado estático por defecto, metadatos por página, sitemap y `robots` generados, datos estructurados |
| Blog editable por el cliente | Rutas dinámicas + CMS headless o MDX, sin acoplar el contenido al código |
| Multiidioma con crecimiento previsto | Segmento `[locale]` en el router; añadir un idioma es añadir un diccionario |
| Ampliaciones futuras (zona de clientes, catálogo, formularios con lógica) | Rutas de API y renderizado dinámico ya disponibles, sin migrar de framework |
| Rendimiento | Optimización de imagen, fuentes y división de código integradas |

Se descarta Astro por decisión del proyecto: **la tecnología se adapta al diseño, no al revés.**
Vite + React se descarta como base principal porque obligaría a montar a mano SSG, metadatos, rutas de contenido y sitemap — exactamente el trabajo que aquí es crítico.

