# Historial del proyecto — Laboratorios Virens

Este archivo es la bitácora viva del proyecto. Se trabaja con más de un asistente
(Claude Code y Codex) en sesiones separadas: **antes de tocar código, lee este
archivo entero.** Al terminar una sesión con cambios reales, añade una entrada
nueva en "Registro de sesiones" (no borres las anteriores) y actualiza "Estado
actual" y "Pendiente" si cambiaron.

No dupliques aquí las reglas del proyecto — esas viven en [`CLAUDE.md`](CLAUDE.md)
(o el equivalente que use cada asistente) y en el documento maestro
[`docs/00-auditoria-y-rediseno-virens.md`](docs/00-auditoria-y-rediseno-virens.md).
Esto es solo: qué se ha hecho, qué decisiones se tomaron y qué falta.

---

## Decisión de producto clave (2026-09-01)

El documento maestro incluye en su §08 ("Copy propuesto") reescrituras de
marketing del texto real de la web actual — el cliente **las ha rechazado**.
Regla vigente a partir de ahora:

> **Todo el copy debe ser el texto LITERAL de lvirens.com, palabra por
> palabra.** Las únicas excepciones son (a) traducir al español un claim que
> en la web actual está en inglés (p. ej. "Experts in food supplements" →
> "Expertos en complementos alimenticios"), por consistencia de idioma y SEO,
> y (b) corregir errores tipográficos ya reconocidos por el propio documento
> (el "Home" como H1, "desarollo" sin la segunda r, "2000 m" sin el "²").
> Nunca reformular un mensaje para que suene "mejor" o más comercial.

Cuando un párrafo literal es largo y no cabe bien como titular corto (H1/H2),
se reparte en título (primera frase) + cuerpo (resto), sin cambiar palabras,
y se reduce el tamaño de fuente visual si hace falta para que no se desborde
— pero el elemento sigue siendo `<h1>`/`<h2>` real para SEO.

## Casos abiertos — pendientes de que el cliente confirme

Estos títulos de sección **no son literales** (no existen en la web actual)
pero tampoco son mensajes de venta reescritos: son etiquetas cortas
necesarias para que la sección tenga un encabezado. Quedan así por ahora,
pero hay que confirmarlos explícitamente con el cliente, no darlos por
buenos:

| Dónde | Texto | Por qué no es literal |
|---|---|---|
| Labs, bloque Capacidad | eyebrow "Capacidad productiva" + H2 "Escala industrial propia" | El literal real es solo "Contamos con más de 2000 m..." (con el error del ²) |
| Labs, bloque Calidad | H2 "Control propio en cada lote" | El literal no tiene titular corto, es un párrafo |
| Labs, bloque Áreas terapéuticas | H2 "Diez categorías de producto" | Mismo caso; el lead que sigue ("Nuestro expertise abarca...") sí es literal |
| Labs y Tech, banner cruzado | eyebrow "La otra mitad del proceso" | El literal es solo el link "Visitar Tech" / "Visitar Labs" (ya corregido, ver abajo) |
| Home | Todo el hero (eyebrow/lead), "Dos divisiones, un mismo proceso", CTA global "¿Hablamos de tu proyecto?" | La home actual casi no tiene texto (es el problema #01 del documento); no hay de dónde sacar un literal |

Si el cliente prefiere quitar estos títulos y dejar solo el eyebrow + los
datos/lista, es un cambio rápido — están todos centralizados en `src/content/*`.

## Estado actual (snapshot — se sobreescribe cada sesión)

- **Fase A (Base sólida):** cerrada. Tokens, Header condicional por página,
  MenuOverlay con mecánica direccional (desktop abajo / mobile arriba) y
  trampa de foco real verificada, placeholders de imagen en `public/img/`
  (12 archivos, color plano + aspect ratio real).
- **Pendiente de Fase A:** vídeos placeholder (`public/video/*.mp4|.webm`) —
  no generados, no hay ffmpeg en el servidor de desarrollo. El hero funciona
  igualmente con el poster.
- **Copy:** revisado y corregido a literal en Home, Compañía, Labs y Tech
  (ver decisión de arriba). Todo el contenido vive en `src/content/*`, ya no
  queda texto de página hardcodeado en JSX salvo microcopy genuinamente sin
  equivalente literal (documentado caso a caso arriba).
- **Fase B (Virens Labs, 12 bloques del §06):** completa, incluido el bloque
  07 (imagen a sangre "Instalaciones", con placeholder — sustituir por foto
  real de planta cuando exista sesión fotográfica).
- **Fase C (Virens Tech, 13 bloques del §07):** completa y verificada.
  Un solo H1, jerarquía de encabezados sin saltos, sin errores de consola,
  navegación cruzada a Labs consistente con el botón literal "Visitar Labs".
- **Fase D (Home y Compañía):** Home tiene hero (desde 2026-09-02 el hero
  ES el split Labs/Tech, ya no hay vídeo en Home) + franja de datos + cómo
  trabajamos + CTA — faltan capacidad resumida,
  certificaciones, áreas terapéuticas (resumen) y noticias (§07.b). Compañía
  tiene intro + pilares + timeline + CTA — falta el bloque "Qué hacemos"
  (cadena de valor ya existe en Home, revisar si se duplica aquí) y "Nuestra
  calidad" con certificaciones.
- **Fase E (Contacto):** solo placeholder con dirección, sin formulario.
- **Fase F (Noticias):** solo placeholder de título, sin CMS ni listado.
- **Dirección visual:** pivote completo a sistema oscuro el 2026-09-02 (ver
  registro de sesión de abajo) — reemplaza la nota anterior de esta línea.
  Fondos `ink`/`surface` en vez de blanco/gris en Home/Labs/Tech, campo
  molecular animado (canvas), cursor y botones magnéticos, titulares
  cinéticos. Compañía/Contacto/Noticias se quedan en el sistema claro
  original hasta su propia fase. Copy sin tocar (sigue siendo literal).
- **Fase G (SEO/i18n/legal):** sitemap y robots básicos ya existen
  (`app/sitemap.ts`, `app/robots.ts`) y las 9 redirecciones 301 ya están en
  `next.config.mjs`. Falta todo lo demás: metadatos completos, datos
  estructurados más allá de `Organization`, páginas `/legal/*`, i18n `/en`,
  Lighthouse.

- Primer vídeo de hero real instalado: `public/video/home-hero.mp4` (línea de
  llenado/dosificado en marcha, 1920×1080, ~7 s). Verificado con Playwright:
  carga, reproduce en loop, buena legibilidad del texto encima con el velo
  existente. Falta el `.webm` (no crítico — el navegador cae al `.mp4` sin
  error) y `labs-hero`/`tech-hero` siguen sin vídeo real.

## Pendiente del cliente (bloquea publicar, no bloquea seguir desarrollando)

Ver `site.pendingClientConfirmation` en `src/config/site.ts` para la lista
corta ya trackeada en código (unidad/periodo de capacidades, año de
referencia de "20 años", certificados, países, dirección postal). A eso se
suma ahora la tabla de "Casos abiertos" de arriba.

---

## Registro de sesiones

### 2026-09-01 — Claude Code — Setup inicial + Fase A + corrección de copy

- Descomprimido el proyecto, leído el documento maestro completo, revisado
  el scaffold existente (estaba más avanzado de lo esperado: tokens,
  componentes base y las one-page de Labs/Tech casi completas).
- Instalado Node.js 22 LTS en el servidor (no estaba presente).
- Creado `CLAUDE.md` con las reglas del proyecto.
- Fase A: `MenuOverlay` reescrito (mecánica direccional + trampa de foco
  real, con un bug de condición de carrera detectado y arreglado vía
  Playwright), `Header` condicional por ruta, 12 placeholders de imagen
  generados, tokens sueltos de `Button.tsx` arreglados.
- A petición del cliente: revisado y corregido todo el copy de Home,
  Compañía, Labs y Tech para que sea literal de la web actual en vez de las
  reescrituras de marketing del documento (ver "Decisión de producto clave"
  arriba). De paso, se movió a `src/content/*` contenido que estaba
  hardcodeado directamente en componentes (`GalenicForms`, `CapacityGrid`,
  `TherapeuticAreas`, `DivisionSwitch`, `CtaContact`, home `page.tsx`).
- Creado este archivo (`HISTORIAL.md`) a petición del cliente, para dar
  continuidad entre sesiones de Claude Code y Codex.
- `npm run typecheck` limpio en todo momento. Verificado visualmente con
  Playwright headless (instalado aparte, no es dependencia del proyecto).
- Cerrada la Fase B: añadido el bloque 07 que faltaba (imagen a sangre
  "Instalaciones", componente nuevo `FullBleedImage`, placeholder generado,
  caption con dato literal combinado — ciudad real + año de la timeline).
- Cerrada la Fase C: verificación completa de Virens Tech (jerarquía de
  encabezados, sin errores de consola, scroll completo de los 13 bloques).
  No hizo falta tocar código, ya estaba correcto.
- Home: confirmado con el cliente que el contenido nuevo sin literal
  (hero, "Dos divisiones, un mismo proceso", CTA global) se queda tal cual.
- Menú rediseñado por completo, en desktop y mobile: pasa de overlay a
  pantalla completa a un panel flotante en franja (nunca cubre toda la
  pantalla), estilo Apple HIG — radio, blur y sombra sutil, cierra con clic
  fuera además de Esc y el trigger. Desktop: ancla arriba-derecha bajo el
  header, cae hacia abajo. Mobile: ancla abajo-derecha junto al FAB, crece
  hacia arriba. **Decisión de regla:** se actualizó `CLAUDE.md` punto 4 para
  permitir esta excepción puntual (paneles flotantes de navegación) al "sin
  sombra/radio 0" — el resto de la web sigue sin excepción. Tokens nuevos en
  `globals.css`: `--radius-panel`, `--shadow-panel`.
- Escala tipográfica global reducida (a petición del cliente: "tipografías
  enormes que no combinan"). La escala original venía literal del documento
  (§10.2: Display 92px, H1 72px, H2 56px, Stat 96px en desktop) y resultaba
  desproporcionada. Nueva escala en `globals.css` (Display 68, H1 56, H2 44,
  H3 30, Stat 76 como máximos en desktop) — al vivir en tokens, el cambio se
  propaga a toda la web con una sola edición. De paso revisé los dos sitios
  donde había bajado manualmente un H1/H2 a H3 por desbordamiento (Compañía,
  Tech): con la escala nueva, Compañía ya cabía bien en H1 real y se
  restauró; Tech (párrafo más largo) se queda en H3 porque a H2 completo
  desequilibraba el bloque frente a la columna vecina.
- Auditoría visual completa de Home y Labs (scroll entero, ambas páginas)
  tras el cambio de escala: encontré y arreglé un bug real en `StatRow`
  (franja de 4 datos) — con la fuente de "cifra grande" completa, el texto
  "9 formatos" se desbordaba fuera de la columna (cualquier valor con una
  palabra larga, no solo dígitos, lo habría hecho). Añadido un token más
  contenido `--text-stat-compact` específico para franjas de este tipo.
- Quitada la barra de fondo del header (a petición del cliente: aunque el
  menú ya era hamburguesa/panel flotante, el header seguía siendo una franja
  de ancho completo con fondo blanco/filete). Ahora el logo y el grupo
  ES/EN+trigger son elementos flotantes sin barra que los una. Dos bugs
  reales que aparecieron al quitar el fondo, encontrados y arreglados con
  Playwright:
  1. El cambio de color blanco→azul del logo saltaba a los 80px de scroll
     (umbral pensado para cuando había fondo blanco de respaldo); sin fondo,
     el logo azul quedaba flotando sobre el propio vídeo del hero (900px+ de
     alto), casi invisible. Corregido: el umbral ahora depende de la altura
     real del viewport (`innerHeight * 0.85`), coincide con el final del hero.
  2. Aun así, al hacer scroll por bloques de color (el azul #00285C de
     "Áreas terapéuticas"), un logo de color fijo se perdía contra fondos del
     mismo tono. Solución: cápsula individual con blur (`bg-white/85
     backdrop-blur-md`, radio completo) detrás del logo y del grupo derecho
     — solo fuera del hero (sobre el hero sigue sin fondo, el velo ya da
     contraste). No es una barra completa (no conecta ambos lados, no ocupa
     el ancho total), es invisible sobre fondo blanco y da contraste
     garantizado sobre cualquier color.

### 2026-09-01 — Codex — Ajuste visual desde referencias del cliente

- Revisadas las imágenes de referencia de la carpeta
  `Inspiracion para Codex, estilo etc/virens_web_finales/virens_web_finales`
  y trasladada su dirección visual a la web: azul corporativo, teal para
  Labs, magenta para Tech, iconografía lineal, numeración editorial,
  matrices con filetes y composiciones divididas de mayor escala.
- Conservado el copy existente sin reformular textos. Los cambios se han
  limitado a presentación, jerarquía, espaciado, color, iconos y estructura
  visual de las secciones.
- Refinados los componentes compartidos de áreas terapéuticas, formas
  galénicas, capacidad, certificaciones, bloques editoriales, CTA y campo
  molecular, además de Home, Compañía, Contacto, Noticias, Labs y Tech.
- No se han usado los prompts guardados en el proyecto ni se han añadido
  imágenes generadas. Los placeholders actuales siguen en uso hasta que el
  cliente aporte o seleccione material fotográfico definitivo.
- Corregidas las fuentes de vídeo inexistentes del hero y el montaje de
  `Reveal` para evitar discrepancias de hidratación respetando la preferencia
  de movimiento reducido.
- `npm run typecheck` finaliza limpio. El entorno local queda disponible en
  `http://localhost:3000` mediante el servidor de desarrollo.

### 2026-09-02 — Claude Code — Split de Home + pivote completo a sistema oscuro + limpieza + puesta en marcha de git/deploy

- **Home, bloque "Dos divisiones" (§06 bloque 10 tal cual estaba, ahora
  distinto):** sustituida la rejilla de tarjetas por `DivisionSplit.tsx`,
  un split a sangre 50/50 con crecimiento al hover/foco (`:has()` en
  `globals.css`, con un bug real encontrado y corregido — `flex-basis: 50%`
  no dejaba espacio libre que repartir; corregido a `0%`). Cada mitad usa
  duotono (`mix-blend-mode: color`) con el color de su división y el
  isotipo de molécula que aportó el cliente (`public/img/labs-molecule.png`
  / `tech-molecule.png`), en blanco por defecto y virando a su gradiente
  real en hover. Contenido reutilizado de `divisionCards` (ya literal), sin
  copy nuevo.
- **Pivote a oscuro (a petición explícita del cliente, con aprobación
  expresa vía pregunta directa):** Home + Virens Labs + Virens Tech pasan a
  fondo oscuro (`--color-ink`/`--color-surface`, nuevos en `globals.css`,
  aditivos — `white`/`gray` originales intactos para Compañía/Contacto/
  Noticias, que NO se tocaron). Nuevas primitivas, todas sin dependencias
  nuevas: `MolecularField.tsx` (canvas + RAF, nodos/enlaces por división,
  retira al antiguo `MoleculeField.tsx` estático), `Cursor.tsx` y
  `Magnetic.tsx` (autolimitados a Home/Labs/Tech vía `DARK_ROUTES`),
  `KineticHeading.tsx` (stagger por palabra, nunca por carácter — riesgo de
  lector de pantalla), `Grain.tsx`. Hook compartido
  `usePrefersReducedMotion` (`src/lib/useReducedMotion.ts`), migrado
  `Reveal.tsx` a usarlo. Todo animado comprueba reduced-motion
  explícitamente en JS (verificado con Playwright: cursor no se activa,
  campo molecular queda en un frame estático). `CLAUDE.md` actualizado
  (reglas 4/7/8 + nota "Identidad molecular").
- **Bug propio, corregido con transparencia:** al crear
  `src/config/navigation.ts` lo escribí sin leer el archivo existente
  primero y pisé su contenido real (`mainNav`, `labsAnchors`,
  `techAnchors`, `legalNav`). Reconstruido cruzando los sitios que lo
  importan, el documento maestro (§5.3, redirecciones §14) y los ids reales
  de cada bloque — pasa el build, pero si algún label de ancla no coincide
  con el original, revisar.
- **Limpieza de raíz del proyecto** (fuera de `web/`, a petición del
  cliente y con confirmación explícita antes de borrar): eliminados
  `virens-web/` (copia vieja abandonada, sin `CLAUDE.md`), `scratch/`
  (808 MB de perfiles de Chrome de una verificación anterior, no era
  contenido del proyecto), los `.zip` redundantes de `midjourney_session` e
  `Inspiracion para Codex` (ya estaban descomprimidos al lado), los PNG
  sueltos del logo ya copiados a `public/img/`. Limpieza de código: borrado
  `Sourced<T>` (tipo sin uso en `lib/types.ts`) y 8 entradas muertas en
  `FormIcon.tsx` (`PATHS`, ya cubiertas por `ALIAS`).
- **Git y despliegue:** no había `git` instalado en la máquina — instalado
  (Git for Windows oficial, silencioso). Repo inicializado en `web/`
  (identidad de commit configurada con el email de contacto del cliente).
  Pendiente: primer push a GitHub y conexión con Netlify (el cliente lo
  pidió, instrucciones dadas en la conversación, no en este archivo).
- `npm run typecheck` y `npm run build` (producción, 11 páginas estáticas)
  limpios. Verificado con Playwright: Home/Labs/Tech en desktop y mobile,
  interacción de hover del split, cursor visible, reduced-motion, y
  regresión de Compañía (sigue clara, única costura aceptada: la banda de
  `CtaContact`, compartida, ahora oscura también ahí hasta su propia fase).

### 2026-09-02 (tarde) — Claude Code — El split de divisiones pasa a ser el hero de Home

- **Home, bloque 01:** el hero de vídeo (`HeroVideo`) desaparece de Home y su
  sitio lo ocupa `DivisionSplit` a pantalla completa (`100svh`). El
  claim/subclaim de `site` es ahora el H1 compartido, centrado sobre la
  costura entre las dos mitades y retirándose a opacidad 0.2 cuando una mitad
  gana espacio (hover/foco), para que el color y la foto de esa división
  protagonicen el momento. Lo primero que se lee en la web es que Virens son
  dos divisiones. `HeroVideo` sigue en uso en Labs y Tech, sin tocar.
- Contenido de cada mitad centrado y anclado abajo (`mt-auto`), moléculas
  centradas en vez de ancladas arriba-izquierda, y los claims suben de `h3` a
  `h2` al subir de nivel el bloque (jerarquía verificada: un solo H1, sin
  saltos).
- **Bug real encontrado y corregido en móvil:** el eyebrow del titular
  ("Laboratorios Virens") quedaba pegado justo debajo del logo del header y
  repetía el mismo texto palabra por palabra. Ahora el rótulo es solo desktop,
  donde el titular está centrado y lejos del logo.
- `StatRow` pasa de tono `ink` a `surface` para no repetir fondo con el bloque
  siguiente (regla 5, ritmo).
- Fotografía: entran las dos candidatas de la sesión Midjourney del cliente
  (`labs-hero-mj.png` / `tech-hero-mj.png`) en lugar de los pósters
  placeholder. Siguen siendo NO LITERAL, a la espera de reportaje propio.
- `divisionsIntro` deja de usarse (su titular ya no existe) y `homeHero.lead`
  se conserva definido pero sin renderizar — la composición centrada
  mitad/mitad no tiene sitio para un párrafo largo.
- **Falsa alarma que conviene no repetir:** en capturas de página completa
  (`fullPage`) los bloques con `Reveal` salen vacíos porque nunca llegan a
  intersectar. No es un bug de la web; verificar siempre con scroll real.
- `npm run typecheck` y `npm run build` limpios (11 páginas estáticas).
  Verificado con Playwright en desktop (1440) y móvil (390): sin errores de
  consola, hover del split correcto.

## Despliegue — estado

- **GitHub:** `https://github.com/theartificialvision/virens-web` (rama
  `main`). El commit del pivote a oscuro (`f606c45`) sí está pusheado.
- **Netlify:** ya conectado y en producción — `https://virens-web.netlify.app`
  (proyecto `virens-web`, equipo `primeravisita`). Sirve lo que hay en `main`.
- **Bloqueo actual:** la máquina no tiene credenciales de GitHub guardadas
  (Git Credential Manager sin token en el almacén de Windows, y `gh` no está
  instalado), así que desde la sesión de Claude Code no se puede hacer `push`
  sin intervención. El commit del hero nuevo está hecho en local y espera
  push. Al resolverlo, Netlify reconstruye solo.

### 2026-09-02 (noche) — Claude Code — Cabecera sin logo/idioma, split con seguimiento continuo del ratón

Feedback directo del cliente sobre el hero nuevo: quitar el wordmark y el
selector de idioma de la cabecera, y convertir el gesto de hover del split
(discreto, "una mitad gana espacio fijo") en continuo (la costura sigue la
posición X del ratón en todo el bloque).

- **Cabecera:** fuera "Laboratorios Virens" de arriba-izquierda y fuera
  ES/EN de junto al trigger del menú — la cabecera fija queda solo con
  "Menú". El selector de idioma se trasladó dentro del panel (`MenuOverlay`,
  franja superior, junto a "Cerrar"). Sin logo que enlace a "/", se añadió
  "Inicio" como primera entrada de `mainNav` para no perder la vuelta a
  Home — comprobado en el menú de las tres rutas.
- **Split de divisiones — gesto continuo:** sustituido el salto discreto
  (`flex-grow` vía `:has(:hover)`/`:has(:focus-visible)` en CSS) por
  seguimiento continuo de la posición X del ratón dentro de todo el
  contenedor, con `requestAnimationFrame` + interpolación lineal escrita
  directamente en el DOM vía refs (no en estado de React, para no
  re-renderizar a 60 fps). Ratón en el borde derecho → Tech al ~100%, Labs
  desaparece; centro → 50/50; borde izquierdo → Labs al ~100%. El titular
  compartido se desvanece con la misma interpolación (antes: salto discreto
  a opacidad 0.2; ahora: curva que llega a 0 antes del extremo, para no
  solaparse visualmente con el nombre/claim de la mitad que gana la
  pantalla). Paridad de teclado: el foco en una mitad simula la misma
  posición extrema que produciría el ratón en ese borde, así un usuario de
  teclado ve el mismo efecto. Gate único vía `matchMedia('(hover: hover)
  and (pointer: fine) and (min-width: 1024px)')`; en mobile/táctil las
  mitades se quedan apiladas y estáticas, sin JS. `prefers-reduced-motion`
  comprobado explícitamente (regla 8): con la preferencia activa no se
  engancha ningún listener, queda fijo en 50/50 — verificado con Playwright
  simulando `reducedMotion: 'reduce'` y moviendo el ratón al extremo (sin
  efecto).
- **Moléculas de isotipo, más grandes:** en desktop (lg+) pasan a estar
  centradas en todo el panel (antes: pequeñas, ancladas arriba). **Bug
  real encontrado y corregido en mobile:** centrar la molécula agrandada en
  todo el panel de 46svh la solapaba con el nombre/claim de abajo — en
  mobile se queda arriba (como antes, algo más grande), solo el desktop
  usa el centrado completo.
- `npm run typecheck` y `npm run build` limpios (11 páginas estáticas).
  Verificado con Playwright: los tres bordes del split (derecha/centro/
  izquierda) en desktop, paridad de teclado (Tab a cada mitad), reduced
  motion, contenido del menú (Inicio + ES/EN), y las tres páginas que
  comparten `Header` (Labs/Tech/Compañía, tema claro) sin errores de
  consola.

### 2026-09-02 (noche, 2) — Claude Code — Pasada "premium": serif editorial + coherencia de paletas y pesos

Feedback del cliente: "se ve barato todavía, falta coherencia de paletas y
tipografía, los pesos de las mismas." Antes de rediseñar a ciegas, auditoría
del sistema de tokens (`globals.css`) contra cómo lo usa realmente cada
componente — los cuatro hallazgos de abajo son concretos, no una relectura
estética. El más importante: `--font-serif` ya existía y apuntaba a
`--font-editorial`, una variable que nadie definía — el token estaba muerto
desde el origen del proyecto (código sin usar, no un bug introducido ahora).

- **Serif editorial activado (doc §10.2, "opcional... como mucho un
  titular por página"):** cargada **Newsreader** (Google Fonts, pesos
  500/600) vía `next/font/google`, cableada a `--font-editorial`. Aplicada
  solo al H1 de cada hero — Home (`DivisionSplit`) y Labs/Tech
  (`HeroVideo`) — en semibold (600), nunca en H2 en adelante: el resto del
  sistema sigue en Montserrat. Es el cambio de mayor impacto visual de la
  sesión: contraste serif/grotesk en vez de Montserrat bold a todo volumen
  en toda la jerarquía.
  - **Bug real encontrado al aplicarlo:** en el H1 de Home, `max-w-[20ch]`
    dejó de bastar — Newsreader es más estrecho que Montserrat al mismo
    tamaño, así que el mismo límite en `ch` dejó pasar una línea más ancha
    que antes, invadiendo los dos logos moleculares a los lados. Corregido
    a un ancho fijo (`max-w-[34rem]`) en vez de una unidad relativa a la
    fuente activa.
- **Coherencia de paletas — texto secundario sobre fondo oscuro:**
  `globals.css` ya definía `--color-mist`/`--color-mist-dim` (con ratios de
  contraste calculados, ~9:1 y ~5,4:1 sobre `--color-ink`) para esto
  exactamente, pero la mayoría de componentes los ignoraban y usaban
  opacidades sueltas (`text-white/60`, `/70`, `/75`, `/80`, `/85`, `/90` —
  seis valores distintos para el mismo rol de "texto secundario", sin
  ningún criterio). Sustituidos por los tokens semánticos en
  `DivisionSplit`, `HeroVideo`, `TherapeuticAreas` y el icono suelto de
  `CapacityGrid` — **comprobado el contraste real de cada sustitución
  antes de aplicarla** (calculado a mano contra ink/azul/teal/magenta):
  `GalenicForms` (fondo teal sólido) y `TypographicBlock` (fondo magenta
  sólido) se quedaron fuera de esta sustitución porque `mist` da un
  contraste inservible ahí (1,5:1 y 3,5:1) — en su lugar se corrigieron a
  **blanco puro**, que es literalmente lo que pide el documento maestro
  en §10.1 ("sobre #00A099 y #A2195B, el texto siempre es blanco puro") y
  que ninguno de los dos cumplía (estaban en 70/85/90 % de opacidad).
- **Coherencia de pesos:** `CtaContact` tenía su título a tamaño de rol H3
  pero en `font-bold` (700) — el doc asigna 600 a ese escalón, y el resto
  de H3 del sistema (`EditorialSplit`) ya usaba 600 correctamente.
  Corregido a `font-semibold`.
- `npm run typecheck` y `npm run build` limpios (11 páginas estáticas).
  Verificado con Playwright: Home/Labs/Tech en desktop y mobile, sin
  errores de consola, sin solape del H1 tras el ajuste de ancho.

### 2026-09-02 (noche, 3) — Claude Code — Hero de Home: una línea, logos a color, y el hover pasa a dos botones

Feedback directo del cliente sobre el hero: el H1 debía caber en una sola
línea sin tocar las moléculas, las moléculas debían ir a color, y el
seguimiento continuo del ratón "marea mucho" — pide sustituirlo por dos
botones (uno por división) con estética glass y una transición de color
"como un tinte que se esparce bajo el agua".

- **H1 en una sola línea:** nuevo token `--text-display-compact` (mismo
  criterio que `--text-stat-compact`) más `whitespace-nowrap` en desktop.
  Verificado sin overflow en 1024/1280/1440/1920px.
- **Moléculas a color por defecto** (antes blancas, coloreadas solo al
  hover): un único `<img>` sin el filtro `brightness(0) invert(1)`, con un
  halo sutil (`blur-2xl` del color de división) a juego con el glass de
  los botones.
- **Se retira el arrastre continuo del split** (rAF + flex-basis + lerp
  sobre la posición X del ratón, de la sesión anterior) por usabilidad —
  cita del cliente: "se marea mucho con movimientos del mouse". El split
  vuelve a ser 50/50 fijo, sin JS de layout.
- **Dos botones nuevos, `DivisionButton`** ("Visitar Labs" / "Visitar
  Tech" — reutiliza el literal ya existente de `DivisionSwitch`, añadido
  a `divisionSplit` en `content/home.ts` como campo `cta`, nunca en el
  JSX). Estética glass (blur, borde, pulso suave en el glow de cada
  división — CLAUDE.md regla 4, excepción ya sancionada).
- **Difusión de tinte al activar** (hover o foco del botón — paridad de
  teclado automática, sin simular nada): un `clip-path: circle()` con el
  color de la división crece desde la costura hasta cubrir el panel
  entero, mientras la foto pasa de gris a color. Cambio de estado
  discreto (React state + transición CSS de 1,1–1,2 s), no una animación
  por frame — nada que pueda "marear". Bajo `prefers-reduced-motion` el
  cambio es instantáneo (ya cubierto por la regla global de
  `transition-duration: 0.01ms`), sin JS adicional.
  - **Ajuste real tras la primera prueba:** con el lavado de reposo en el
    color de la propia división (como antes), el cambio apenas se notaba
    — la foto de planta ya tiene un cian natural por la iluminación que
    se confundía con el teal de marca. Corregido: en reposo la mitad
    queda neutra/apagada (`bg-ink/55` + `brightness-[0.82]` + escala de
    grises), y solo el círculo de difusión lleva el color — así "llega"
    de verdad al activar, en vez de simplemente subir de intensidad.
- **Dos bugs reales encontrados y corregidos en el propio proceso:**
  1. Al comprimir el H1 a una línea, el bloque del titular compartido
     cambió de posición vertical y las moléculas (antes centradas en todo
     el panel) empezaron a chocar con el subtítulo y los botones —
     corregido ancladas siempre arriba (antes solo en mobile).
  2. Al mover el orden del JSX, el titular pasó a renderizarse DESPUÉS de
     las dos fotos en el flujo de mobile — invisible en desktop (todo
     `absolute`, el DOM no importa) pero en mobile el usuario veía dos
     pantallas completas de foto antes de llegar al titular. Corregido
     devolviendo el bloque del titular al principio del JSX.
- **Sin resolver, marcado explícitamente:** el mensaje del cliente
  mencionaba "contract developement" junto a "contract manufacturating".
  El claim de Tech (`divisionCards.tech.claim`) sigue en "Development"
  literal de la web actual — no se ha cambiado a "Contract Development"
  porque violaría la regla de copy literal (CLAUDE.md regla 3) sin
  confirmación explícita de que es un cambio de copy deliberado y no una
  paráfrasis del mensaje. Pendiente de que el cliente lo confirme.
- `npm run typecheck` y `npm run build` limpios (11 páginas estáticas).
  Verificado con Playwright: los tres tests de ancho (una línea sin
  overflow), difusión de tinte en ambos botones, paridad de teclado,
  `prefers-reduced-motion`, orden de mobile corregido, sin errores de
  consola.

### 2026-09-02 (noche, 4) — Claude Code — Ajustes de hero: copy CDMO, color desde el inicio, fuera el cursor personalizado

Cuarta ronda de feedback sobre el mismo hero. Cuatro peticiones, todas
aplicadas:

- **Copy (excepción deliberada a la regla de literal):** los claims pasan
  a "Contract Manufacturing" y "Contract Development" — el cliente lo pidió
  explícitamente tras la pregunta que quedó abierta en la sesión anterior.
  El literal real de la web actual era "Contract manufacturing" y
  "Development"; queda documentado en `content/home.ts` como excepción a
  CLAUDE.md regla 3, no como descuido. (El cliente escribió "Developing" /
  "Manufacturating"; se ha usado la forma correcta en inglés, que además es
  la terminología estándar de CDMO.)
- **Fuera el arranque en blanco y negro:** cita del cliente, "NO quiero que
  empiece en ByN, quiero que cada uno su color". Se retira el lavado neutro
  de `--color-ink` que había introducido la sesión anterior en reposo: cada
  mitad vuelve a llevar su acento desde el primer fotograma (la foto sigue
  en escala de grises, pero el `mix-blend-mode: color` al 55 % ya la tiñe
  por completo). Al activar el botón, el mismo acento sube al 95 % y se
  extiende desde la costura: el tinte "se unifica" en un tono más sólido,
  en vez de aparecer de la nada.
- **Cursor personalizado eliminado** ("quiero un cursor tradicional"):
  borrado `src/components/ui/Cursor.tsx`, su render en `layout.tsx` y la
  regla `.cursor-none` de `globals.css`, más las dos referencias en
  comentarios (`Grain.tsx`, `navigation.ts`). Verificado: `cursor: auto` y
  sin clase `cursor-none` en `<html>`.
- **Navegación por clic de los botones:** verificada explícitamente (8/8
  en producción). Merece nota porque durante la verificación aparecieron
  fallos intermitentes que resultaron ser un artefacto del propio test:
  solo se reproducían cuando el script intercalaba `page.screenshot()`
  entre el hover y el clic (las capturas fuerzan pasadas de composición en
  Chromium headless y alteran el timing de los eventos de entrada). Sin
  capturas de por medio, 8 de 8 navegaciones correctas. No es un bug del
  sitio, pero queda anotado por si vuelve a verse en otra sesión.
- **De paso, aviso real de Next resuelto:** las dos fotos del hero son el
  elemento LCP y no llevaban `priority`; añadido (CLAUDE.md regla 9).
- `npm run typecheck` y `npm run build` limpios. Verificado con Playwright
  en desktop y mobile, con y sin `prefers-reduced-motion`, sin errores de
  consola.

### 2026-09-02 (noche, 5) — Claude Code — Logos 3D del hero + botones LABS/TECH, pulso, legibilidad y tinte cruzado

Dos peticiones en la misma sesión: incorporar los logos 3D del diseño
compartido por el cliente (Claude Design, `Logos 3D (standalone).html` en
la raíz del proyecto, fuera de `web/`) y cuatro ajustes más del hero.

- **Logos 3D — decisión técnica:** el diseño es una escena three.js
  (esferas + enlaces torneados con acuerdos cóncavos por `LatheGeometry`,
  material metálico `metalness 0.88 / roughness 0.19`, degradado de marca
  muestreado en 10 materiales). Meter three.js en la web serían ~600 KB de
  JS en el LCP para una marca de 112 px — contra CLAUDE.md regla 9 y sin
  avisar de la dependencia (regla de stack). Solución: **render estático**
  de la misma escena (Playwright + Chromium headless con SwiftShader,
  capturando el buffer WebGL vía `toDataURL` porque el compositor no
  llegaba a completar un frame), recortado al contenido y exportado a
  **WebP transparente de 512 px** (`public/img/labs-molecule-3d.webp` 18 KB,
  `tech-molecule-3d.webp` 20 KB). Mismo acabado, coste cero de JS. Ángulo
  fijo 3/4 suave para que la silueta siga leyéndose como el logo 2D. Los
  PNG planos anteriores (`labs-molecule.png`/`tech-molecule.png`) quedan
  sin referencias en `src/` pero se conservan en `public/img` por ser
  material de marca del cliente. Tamaño del isotipo subido a 112/128 px en
  desktop (antes 64/80): con volumen metálico merece presencia; verificado
  184 px de holgura hasta el titular compartido.
- **Botones "LABS" / "TECH"** (antes "Visitar Labs/Tech →"): solo el nombre
  de la división, mayúsculas y tracking amplio vía CSS, sin flecha. El
  texto vive en `content/home.ts` (`cta`).
- **Pulso mejorado:** de un anillo único a dos capas — halo que respira
  (18→34 px) + anillo que nace en el borde y se expande hasta
  desvanecerse; 3,4 s con la curva del sistema (`--ease-out-quart`). Al
  pasar el ratón o el foco, el bucle se para y queda un brillo fijo.
- **Legibilidad de los textos grises:** sobre fotografía, `mist`/`mist-dim`
  se apagaban demasiado (el token está calibrado para superficies planas
  ink/surface, no para imagen). En el hero pasan a blanco con opacidad
  alta (`white/80` eyebrows, `white/90` cuerpo). `mist` sigue siendo el
  token del resto de la web.
- **Tinte cruzado:** al pasar por LABS, también la mitad Tech se inunda de
  teal (y viceversa): cada mitad recibe ahora la división ACTIVA
  (`activeDivision`), no "si yo estoy activa", y el círculo de difusión
  usa el color de esa división (`flood`). Resultado: todo el hero se
  unifica en un solo color desde la costura.
- `npm run typecheck` y `npm run build` limpios. Verificado con
  Playwright: rótulos/`text-transform`/animación por computed style,
  carga de los WebP, hover en ambas direcciones, holgura logo↔titular,
  mobile. Sin errores de consola.

### 2026-09-03 — Claude Code — Hero: expansión a ancho completo + isotipo 3D en movimiento

- **Expansión del split:** al pasar el ratón (o el foco) por un botón, esa
  mitad se lleva el **ancho completo** y la otra se repliega a cero; al
  salir, vuelven al 50/50. 620 ms con `cubic-bezier(0.22,1,0.36,1)` —
  "rápido y fluido", petición del cliente. El reparto se publica como
  `--half-basis` desde el componente y solo se aplica de `lg` en adelante
  (en mobile las mitades se apilan y `flex-basis` gobernaría la altura).
  La difusión de tinte se acorta de 1200 a 620 ms para que expansión y
  color se lean como un solo gesto.
  - **Detalle que costó una vuelta:** con `flex-basis: 0` la mitad
    replegada seguía ocupando 96 px — era su propio `padding`, que no
    colapsa. Ahora el padding se apaga con la misma curva y la expansión
    llega a 1440/0 de verdad (verificado midiendo los anchos reales).
- **Isotipo 3D en movimiento** (antes un render estático): se
  pre-renderizaron **30 fotogramas de un balanceo de ±10°** de la misma
  escena three.js y viajan como tira horizontal WebP
  (`*-molecule-3d-sprite.webp`, 89 y 92 KB). La tira se desplaza con
  `steps(30)` + `alternate`: son fotogramas reales de 3D (la luz recorre
  el metal), no un truco 2D sobre una imagen plana, y sigue sin entrar
  three.js en el bundle. 42 ms/fotograma ≈ 24 fps; baja a 26 ms cuando su
  división está activa.
  - Descartado el giro completo de 360°: a 30 fotogramas salía a tirones
    salvo acelerándolo mucho, y un logo girando sin parar leía a novedad.
    El balanceo corto es más suave y pesa menos.
  - **`prefers-reduced-motion`:** la regla global (`animation-duration:
    0.01ms`) no vale para `steps()` — recorrería los 30 fotogramas en un
    parpadeo. Se apaga explícitamente (`animation: none`) y queda el
    primer fotograma fijo. Verificado.
- Retirados los PNG/WebP estáticos del isotipo que quedaban sin uso.
- `npm run typecheck` limpio. Verificado con Playwright: anchos reales en
  reposo/hover/vuelta (720-720 → 1440-0 → 0-1440 → 720-720), propiedades
  computadas de la animación, carga de los sprites, reduced-motion y
  mobile. Sin errores de consola.

### 2026-09-04 — Claude Code — Hero: dos áreas que se abren, tipografía unificada y vuelta a los logos estáticos

- **Separación de LABS y TECH:** de `gap-4` (16 px) a 24 / 40 / 56 / 80 px
  según ancho. Se leen como dos opciones distintas, no como un par de
  botones pegados.
- **Tipografía unificada:** fuera la serif (Newsreader) del hero. Todo en
  Montserrat con una escala de cuatro escalones: H1
  `--text-display-compact`, claim `--text-hero-claim` (token nuevo, 18→30),
  lead `--text-lead`, cuerpo `--text-body`, servicios y botones
  `--text-small`. `--text-display-compact` se recalibró de 54 a 44 px de
  tope: Montserrat es bastante más ancha que Newsreader al mismo cuerpo y la
  línea ya no entraba entera. Verificado por `computed style`: cero serif en
  el hero (`--font-serif` sigue vivo, pero solo en los heroes de
  Labs/Tech — **pendiente de decidir si también salen de ahí**).
- **Comportamiento al activar:** en reposo, la composición de siempre. Al
  pasar el ratón (o el foco, o un toque), el H1 sube a la franja alta del
  hero, en su hueco aparece «Contract Manufacturing» / «Contract
  Development» pegado encima de los botones, y debajo se despliega la
  información de la división. Una sola línea en desktop en los dos claims.
  - **Cómo se mueve sin saltos:** `.hero-copy` es una columna flex con dos
    espaciadores; en reposo ambos crecen por igual (de ahí el centrado) y al
    activar el de arriba baja a `flex-grow: 0` y la columna se apoya en
    `--hero-lead-min` (184 px, 208 en 2xl: por debajo de los isotipos y muy
    lejos del trigger del menú). `flex-grow` interpola, así que es una
    transición CSS, sin JS por fotograma. El H1 sube 63-143 px según alto de
    pantalla.
  - **Las ranuras** (subtítulo, claim, información) son rejillas que van de
    `0fr` a `1fr`: el contenido decide su altura y nada queda recortado por
    una altura pactada.
  - **Labs y Tech comparten celda** (`.hero-stack`, `grid-area: 1/1`), así
    que la ranura reserva siempre la altura de Tech y cambiar de división es
    un fundido en el sitio: medido, **0,00 px** de desplazamiento de los
    botones entre LABS y TECH.
  - **El área se mantiene** mientras el puntero esté sobre el botón *o* sobre
    su texto desplegado; solo se cierra al abandonar el hero completo
    (`onMouseLeave` en la raíz, no en el botón). Teclado: `onFocus` abre y el
    cierre va por `focusout` de la raíz, mismo criterio.
- **Táctil:** primer toque abre, segundo navega. El apunte de "¿estaba ya
  abierta?" se toma en `pointerdown`, no dentro del `click`: al tocar, el
  navegador sintetiza `mouseenter` **antes** del click, así que mirar el
  estado ahí hacía que el primer toque navegase siempre (lo hacía, y así
  salió en la primera pasada de Playwright). `touch-manipulation` en el botón
  para que dos toques seguidos no se coman como doble toque de zoom.
  Verificado 12/12 en 360/390/430/768.
- **Información de cada división recuperada** (`divisionInfo` en
  `content/home.ts`, textos del cliente): párrafo a 52ch y servicios en dos
  columnas de 328 px — el rótulo más largo mide 305 px, así que ninguno parte
  en dos líneas. Sin tarjeta, filete ni viñeta (regla 7); lo que separa
  párrafo de servicios es peso, color y aire. Cada mitad pierde su rótulo y
  claim propios: repetían literalmente el mismo texto que ahora va al centro.
- **Altura del hero:** `min-h` de 46 a **49rem**. Con los seis servicios de
  Tech, un portátil de 1280×720 se quedaba 3 px corto y los cortaba. Ahora la
  holgura es de 22-135 px entre 720 y 1080 de alto.
- **Contraste:** el velo pasa de plano 0,25 a 0,30 en reposo y **0,52 al
  activar** — el hero "baja la luz" al entrar en modo lectura. Medido
  ocultando el texto y muestreando el fondo real: el píxel más claro bajo
  cualquier texto da **4,67:1** contra blanco (AA para texto normal pide
  4,5:1); las medianas van de 5,1:1 a 12,9:1.
- **Logos: vuelta a los estáticos originales.** Fuera el sprite de 30
  fotogramas y todo su CSS (`.molecule-sway`, sus `@keyframes` y su excepción
  de `prefers-reduced-motion`, que ya no hace falta). Vuelven
  `labs-molecule.png` / `tech-molecule.png` tal cual: 1254×1254 RGBA, sin
  recorte ni recoloreado, vía `next/image` (a DPR 2 sirve 256 px para una
  caja de 112 px). Los `*-molecule-3d-sprite.webp` se quedan en `public/img`
  sin referencias, por si se retoma la exploración.
- **Componente partido** (regla de 150 líneas): `DivisionSplit` se queda con
  el estado y la composición; `DivisionHalf`, `DivisionButton` y
  `DivisionInfo` salen a archivo propio. Hook nuevo `useCoarsePointer`
  (`lib/usePointer.ts`).
- `npm run typecheck` y `npm run build` limpios. Verificado con Playwright en
  1440×900, 1920×1080, 1366×768, 1280×720, 768×1024, 430, 390, 360 y 320:
  posiciones subpíxel en reposo/activo/vuelta, cero salto entre divisiones,
  los seis servicios sin recortar, teclado (Tab abre, Tab fuera cierra),
  táctil (primer/segundo toque, cambio directo, toque fuera),
  `prefers-reduced-motion`, resolución de los isotipos y contraste real.
  Sin errores de consola.

### 2026-09-04 (2) — Claude Code — Fuera la serif también de los heroes de Labs y Tech

Cierre de la unificación tipográfica del punto anterior, a petición del
cliente: el H1 de `HeroVideo` (heroes de /virens-labs y /virens-tech) era el
último uso de Newsreader.

- **H1 a Montserrat** con las mismas medidas que el de Home —semibold,
  interlineado 1,1, tracking −0,02em— y un escalón más de cuerpo: allí el
  titular está obligado a una línea entre las dos moléculas, aquí tiene una
  columna de 7/12 donde respirar. `--text-display` recalibrado de 68 a
  **60 px** de tope (36 en móvil) por el mismo motivo que
  `--text-display-compact`: Montserrat es más ancha que Newsreader al mismo
  cuerpo. Medido: 3 líneas en 653 px dentro de una columna de 747 px, sin
  desborde de 320 a 1920.
- **Textos sobre imagen:** eyebrow y lead pasan de `mist-dim`/`mist` a blanco
  con opacidad (70 % / 85 %) — el mismo criterio que ya se aplicó al hero de
  Home el 2026-09-02 (los tokens `mist` están calibrados para superficies
  planas ink/surface, no para fotografía). El lead gana además tamaño y
  interlineado explícitos (`--text-body` / 1,65) para igualar el párrafo del
  hero de Home.
- **Newsreader retirada del proyecto:** ya no la usaba ningún componente, así
  que se va su carga de `layout.tsx` y su token `--font-serif` de
  `globals.css` (apuntaba a `--font-editorial`, que habría quedado sin
  definir). Una sola familia en todo el sistema. Verificado en el navegador:
  **un solo .woff2** por página y cero elementos con Newsreader/Georgia
  aplicadas en /, /virens-labs y /virens-tech.
- **Nota de proceso:** los 404 de `main-app.js` que aparecieron a mitad de la
  verificación no eran del código — se lanzó `npm run build` con `next dev`
  en marcha y el build sobrescribió `.next/`, dejando obsoleto el manifiesto
  de chunks del servidor de desarrollo. Se resolvió borrando `.next` y
  reiniciando. Conviene no solapar ambos comandos.
- `npm run typecheck` y `npm run build` limpios. Verificado con Playwright en
  1440, 1280, 390 y 320 sobre las tres rutas con hero: familia, cuerpo, peso,
  interlineado y tracking aplicados, número de líneas, desborde horizontal y
  peticiones de fuente. Sin errores de consola ni 404.

### 2026-09-04 (3) — Claude Code — Isotipos 3D con giro y titular anclado arriba

El cliente aporta una versión nueva de los logos 3D, con giro y apertura
molecular (`logo-spin.js`), y pide usarla en lugar de los PNG estáticos, con
los isotipos al centro y el titular arriba.

- **three.js entra en el proyecto.** Se avisó antes de instalarla (regla del
  stack) con el dato medido: el archivo del cliente pide three a unpkg y
  `three.module.js` arrastra `three.core.js` — **410 KB gzip desde un CDN de
  terceros en cada visita**, no los ≈150 KB que anunciaba su demo (esa cifra
  es la del bundle tree-shakeado). Decisión del cliente: instalarla.
  Resultado medido tras empaquetar: **130 KB gzip** en chunks diferidos y
  **First Load JS de / sin cambio, 160 KB** — three no entra en el bundle
  inicial.
- **Port a TypeScript** (`lib/logoSpin.ts`). Geometría, degradado por vértice,
  entorno de estudio y coreografía molecular intactos. Dos cambios: `three` se
  importa como módulo (Next la empaqueta) y deja de ser un custom element con
  shadow DOM para montar sobre un contenedor de React. Tipado estricto de
  verdad: con `noUncheckedIndexedAccess` los `Record` indexados del original
  no compilan, así que los nodos viajan en un `Map` con lectura que narra.
- **`LogoSpin.tsx`** carga el motor con `import()` dinámico después del primer
  pintado y usa el **PNG original como póster** debajo del canvas: es lo que
  se ve mientras llega three, y se queda si no hay WebGL o falla el chunk.
  Nunca hay hueco ni salto de layout. Verificado: en el test con render por
  software el relevo tarda 8-9 s y el póster cubre todo ese hueco.
- **Composición nueva.** El titular se ancla arriba en los dos estados
  (`--hero-lead-min` baja de 184 a 112 px) y el centro pasa a ser de los
  isotipos. Cada uno vive en una ranura que replica `--half-basis`, el mismo
  reparto que gobierna las fotos: **en reposo cae en el centro exacto de su
  mitad (desvío medido 0,0 px) y al activarse queda centrado en todo el hero**,
  porque su mitad se lleva el ancho completo. La ranura contraria se repliega
  a 0 y recorta su logo.
  - La banda cancela el `px-6` de la columna (`width: calc(100% + 3rem)`): sin
    eso cada logo caía 12 px hacia el eje. Se hace en la regla CSS y no con
    utilidades porque la regla va sin capa y le gana a un `w-*` de Tailwind.
  - El sobrante vertical lo reparten tres espaciadores con `flex-grow`
    interpolable. Centrado del isotipo en reposo: exacto a 1440×900, ±15-37 px
    en el resto de alturas.
- **Al activar, el isotipo se reduce a tamaño de firma** (259 → 101 px en
  1440). No es capricho: a tamaño de reposo, claim + párrafo + seis servicios
  se salen de pantalla en cualquier portátil. Con el recorte, los seis
  servicios de Tech caben con 12-32 px de holgura entre 720 y 1080 de alto, y
  los botones siguen dentro del viewport en reposo en todos ellos.
- **Pendiente de decidir con el cliente:** el ciclo de apertura (`assemble`)
  mantiene el logo legible como marca solo en los dos reposos de cada vuelta;
  el resto del tiempo se lee como fragmentos. A tamaño grande funciona, a
  tamaño de firma se aprecia menos. Se puede pasar a giro puro sin apertura.
- `npm run typecheck` y `npm run build` limpios. Verificado con Playwright en
  1920, 1440, 1366, 1280 y 390: dos canvas WebGL activos, relevo del póster,
  centrado horizontal y vertical, ranura contraria replegada, titular sin
  moverse al activar, holgura de los seis servicios, botones en viewport y
  `prefers-reduced-motion` (un fotograma, sin rAF). Sin errores de consola.

### 2026-09-04 (4) — Claude Code — Isotipos más grandes, contraluz y fluidez

Tras revertir el pivote a claro (`229a49a`, decisión del cliente), tres
ajustes sobre la versión oscura con los isotipos 3D. Nada más.

- **Fluidez.** Dos causas reales de tirones, ninguna era el bucle de rAF:
  - `resize()` recorría toda la geometría (`Box3.setFromObject`) para
    recalcular el encuadre, y como la banda de isotipos anima su tamaño
    620 ms, el `ResizeObserver` lo disparaba en cada fotograma de la
    transición. El radio se calcula ahora **una sola vez**, con las mitades
    abiertas del todo, y `resize()` sale si las medidas no han cambiado.
  - Cada `resize()` reasigna además el búfer de dibujo WebGL (`setSize`):
    ~37 reasignaciones por transición y canvas a 60 fps. Se limitan a **una
    cada 160 ms más una de cola** cuando la transición se asienta; entre
    medias el canvas se estira por CSS (imperceptible en movimiento) y
    termina nítido — verificado: búfer 144 px = 144 px CSS × dpr al asentar.
  - Sin supersampling: costaría GPU y lo que se pide es fluidez.
  - Nota: la prueba headless con GL por software no puede mostrar la
    mejora — solo produce ~3 fotogramas en los 620 ms de transición—; la
    garantía es estructural, no medida en este entorno.
- **Isotipos más grandes en los dos estados.** Reposo de 18vw a **22vw**
  (274 → 317 px en 1440) y firma de 7vw a **10vw** (101 → 144 px). El salto al
  activar baja de 2,7× a 2,2×. Además, **encuadre más ceñido**: el `FIT` de
  1,3 venía del original, que medía la pose del momento; como el radio ya es
  el de la pose abierta, era holgura sobre holgura y la marca cerrada se
  quedaba en ~55 % de su caja. Con 1,06 crece un 23 % más sin tocar el
  layout. El sitio vertical sale de la holgura bajo la nav (112 → 96 px) y
  de 4 px en cada uno de los tres espacios del estado activo. Verificado en
  1280, 1366, 1440 y 1920: botones dentro del viewport en reposo y los seis
  servicios de Tech sin recortar (holgura mínima 5 px a 1366×768).
- **Contraluz.** Radial difuso del color de la división (`--color-*-glow`)
  detrás del póster y del canvas, escala 1,6, opacidad 0,55, desenfoque
  64 px. A 0,4 no llegaba a integrar el metal en la foto; a 0,55 lo asienta
  sin leerse como efecto.
- `npm run typecheck` limpio. Sin errores de consola.

### 2026-09-04 (5) — Claude Code — Menú: franja vertical y trigger sin texto

Petición directa del cliente: "el menú está espantoso, que no diga menú, y
ese icono de hamburguesa está fatal; al abrirlo quiero una franja vertical
que llegue hasta abajo, elegante, morphing glass, azul profundo".

- **Fuera la palabra "Menú".** El trigger queda como botón circular de
  vidrio (48 px en desktop, 56 el flotante de mobile) con el glifo solo.
  Sobre rutas oscuras es vidrio blanco; sobre las claras, vidrio azul
  tintado — en blanco sobre blanco el botón desaparecía.
- **Glifo nuevo.** Tres trazos de 1,5 px alineados a la derecha en escalera
  descendente (100 / 80 / 60 %), que se igualan al pasar el ratón y, al
  abrir, giran los dos extremos sobre el centro mientras el del medio se
  retira. Antes eran dos filetes sueltos sin estado de cierre real.
- **El desplegable pasa a franja vertical** pegada al borde derecho, de
  arriba abajo (`--menu-rail`, 25 rem / 86 vw), vidrio azul profundo
  (`--menu-surface`, 84 % de `--color-blue-deep` + `backdrop-blur`) con
  filete de marca en el canto (teal arriba, magenta abajo). El 84 % es el
  punto en que el texto secundario sigue legible cuando la franja cae sobre
  una página clara (/contacto) sin dejar de leerse como vidrio sobre las
  oscuras. Radio 0: toca tres bordes de pantalla.
- **"Morphing glass".** La franja no desliza: se revela con un recorte
  circular que nace en el centro exacto del trigger —`Header` mide su
  posición al abrir y la pasa como origen— y crece hasta cubrirla, así que
  el botón parece dilatarse hasta convertirse en la franja. Mismo mecanismo
  en los dos breakpoints, sin ramas por tamaño. Con
  `prefers-reduced-motion`, fundido sin recorte ni escalonado (regla 8).
- **Entradas del menú:** filete-guía que crece al pasar el ratón y ya viene
  crecido en la página actual (`aria-current`), con el color de la división
  en Labs y Tech. Antes solo esas dos llevaban un taco de color y no había
  señal de página activa.
- **Arreglado de paso:** el trigger de mobile no llegaba a cerrar nunca (el
  cierre por clic fuera se disparaba antes y su propio `onClick` volvía a
  abrir en el mismo gesto); ahora el listener excluye `[data-menu-trigger]`.
  La franja fija de la cabecera ya no intercepta clics del hero
  (`pointer-events-none`, solo el botón recupera el puntero).
- Verificado en 1440×900 y 390×844, ruta oscura (/) y clara (/contacto):
  apertura, fotograma intermedio del recorte, estado abierto y glifo a 4×.
  `npm run typecheck` limpio.
