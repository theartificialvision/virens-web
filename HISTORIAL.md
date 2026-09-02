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
