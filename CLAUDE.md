# Laboratorios Virens — reglas del proyecto

Rediseño completo de `lvirens.com`. Documento maestro (fuente de verdad de contenido,
arquitectura, copy y sistema visual): [`docs/00-auditoria-y-rediseno-virens.md`](docs/00-auditoria-y-rediseno-virens.md).
Ante cualquier duda de color, espaciado, texto u orden de bloque, la respuesta está ahí — no improvisar.

## Stack — cerrado

Next.js 15 (App Router) · TypeScript estricto · Tailwind CSS v4 · Framer Motion.

Astro está descartado por decisión de proyecto: no proponerlo ni mencionarlo como alternativa.
Tampoco migrar a Vite, Remix, Nuxt ni ningún otro framework. Si algo es difícil con Next, se
resuelve dentro de Next — la tecnología se adapta al diseño, nunca al revés.

Solo se añade una dependencia nueva si es imprescindible, y avisando antes de instalarla.

## Pivote 2026-09-05 — de oscuro a claro

El sistema oscuro del 2026-09-01 queda **sustituido** por uno de base blanca,
con criterio Apple HIG y por decisión directa del cliente. El blanco domina,
los colores de marca entran a plena intensidad y en dosis cortas, y el ritmo lo
dan el aire y la medida. Los tokens viven en el bloque `@theme` de
`globals.css`; las reglas 4 y 5 se reescribieron ese mismo día para dar cabida
a radios, sombras y fondo blanco repetido.

Consecuencia de accesibilidad que conviene no olvidar: **el teal de marca
(#00A099) da 3,24:1 con texto blanco y no llega a AA**. Donde el verde es
superficie con texto encima se usa `--color-labs-ink` (#007A75, 5,2:1). El
#00A099 se reserva para lo que no es texto: el isotipo 3D, filetes y cifras
grandes. El granate (#A2195B) da 7,4:1 y no necesita variante.

## Reglas inviolables

1. **Tokens.** Ningún hex, tamaño de fuente ni espaciado fuera del bloque `@theme` de
   `src/app/globals.css`. Si falta un valor, se añade como token; nunca se escribe suelto en un
   componente.
2. **Contenido fuera del JSX.** Ningún texto visible se escribe dentro de un componente. Todo
   vive tipado en `src/content/*`. Un componente recibe datos, no frases.
3. **No inventar datos.** Cada entrada de contenido lleva su origen (`literal` · `rewritten` ·
   `image-only` · `unverified`). Los `unverified` no se renderizan por defecto. Si falta un dato,
   se deja como pendiente en `site.pendingClientConfirmation` y se dice explícitamente — jamás se
   rellena con una suposición plausible. Incluye cifras, certificaciones, países, años y plazos.
4. **Radios y sombras: escala de sistema (reescrita 2026-09-05).** Hasta esta
   fecha regía "radio 0 y cero sombra" con excepciones puntuales. Con el pivote
   a claro y criterio Apple HIG, ambos pasan a ser sistema y viven en
   `globals.css`: radios `--radius-xs|sm|md|lg|xl|pill` (6/10/14/20/28/999) y
   elevación `--shadow-1|2|3`. Dos condiciones, y no son negociables: (a) **el
   radio crece con la superficie** —un panel de imagen usa `xl`, una celda
   `sm`— para que el arco se lea igual de suave a cualquier tamaño; (b) **solo
   lleva sombra lo que flota de verdad**: botones, paneles de navegación,
   paneles de imagen y controles elevados. Una rejilla de datos no flota: se
   resuelve con filete (`--color-hairline`) y cambio de relleno, sin sombra por
   celda. Las sombras van teñidas de azul corporativo, nunca de negro puro:
   sobre blanco una sombra negra ensucia y una azulada asienta.
5. **Ritmo (reescrita 2026-09-05).** Antes: "ninguna sección repite el fondo
   de la anterior". Con el blanco dominando, esa regla obligaba a intercalar
   franjas de color y era justo lo que el cliente pidió quitar. Ahora: **el
   blanco es el fondo por defecto** y el descanso es `surface` (#F5F5F7); dos
   secciones blancas seguidas son normales. El ritmo lo dan el aire, la medida
   de lectura y el cambio de estructura, no el fondo. `blue`, `labs` y `tech`
   son golpes puntuales: **como mucho una franja de color por página**, nunca
   dos seguidas, y nunca a pantalla completa si se puede evitar. Antes de dar
   una página por terminada, recorrer la secuencia y verificar que no hay dos
   estructuras iguales seguidas ni más color del pactado.
6. **Aire.** Ningún bloque baja de 120 px de padding vertical en desktop. El ritmo lo da el
   espacio, no el borde.
7. **Nada de tarjetas.** Prohibidas las rejillas de cards con borde y sombra. Única excepción del
   sistema: el listado de noticias. Los seis servicios de Virens Tech son seis secciones
   completas alternando imagen y texto, nunca una rejilla de dos columnas. **Aclaración
   2026-09-01**: las rejillas de filete compartido (borde + `divide`, sin radio, sin sombra
   individual, cuyo único relleno propio es un paso de elevación de color) — `CapacityGrid`,
   `Certifications`, `TherapeuticAreas`, `StatRow` — no son «tarjetas» a efectos de esta regla. Sí
   lo sería cualquier celda con radio, sombra propia o fondo aislado del resto de la rejilla.
8. **Accesibilidad como requisito.** Foco visible siempre, `prefers-reduced-motion` respetado en
   toda animación, vídeo mudo con poster, menú navegable por teclado con cierre en `Esc` y trampa
   de foco real, `alt` real en cada imagen informativa, un solo `h1` por página y jerarquía de
   encabezados sin saltos. **Añadido 2026-09-01**: todo componente que anime vía `<canvas>` +
   `requestAnimationFrame`, cursor personalizado, atracción magnética o stagger de texto debe
   comprobar explícitamente `window.matchMedia('(prefers-reduced-motion: reduce)')` en JS — la
   regla CSS global no basta para RAF/canvas — y renderizar una alternativa estática/no-op. Usar
   el hook compartido `usePrefersReducedMotion` (`src/lib/useReducedMotion.ts`). El overlay de
   grano (`Grain`) queda exento por no tener animación.
9. **Rendimiento.** El poster del hero es la imagen LCP y se precarga; el vídeo nunca bloquea la
   carga. Objetivo en móvil: LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
10. **`any` prohibido.** TypeScript estricto de verdad. `npm run typecheck` tiene que pasar en
    limpio en cada checkpoint.

## Cómo trabajar

- Componentes pequeños y de un solo propósito. Si un componente pasa de 150 líneas, separarlo.
- Comentar el porqué, no el qué. Cuando una decisión venga del documento, citar el apartado
  (p. ej. `§06 bloque 06`).
- Móvil incluido desde el principio, no como pasada final. Los bloques imagen/texto se apilan
  siempre con la imagen arriba.
- Código y comentarios en español; nombres de variables, funciones y componentes en inglés.
- No refactorizar lo que no se ha pedido ni cambiar decisiones ya tomadas sin consultar.
- Preguntar cuando el documento no cubra algo. Una pregunta corta es mejor que una suposición.

## Prohibido explícitamente

Estética WordPress o de plantilla genérica · rejillas de tarjetas repetidas · iconos dentro de
círculos por defecto · columnas estrechas llenas de texto · degradados «tecnológicos»
decorativos · aspecto SaaS/startup · estética hospitalaria · rellenar todos los huecos · imágenes
decorativas que no aporten información.

**Añadido 2026-09-05**: prohibido también el duotono sobre fotografía —teñir con
`mix-blend-mode` sobre una imagen en escala de grises con el contraste subido
producía fringing de color y una lectura anaglífica (ver el hero de Home antes
de esta fecha)—, y prohibida cualquier superficie de color que ocupe más de
una franja por página. Las sombras dejan de estar prohibidas: pasan a ser
escala de sistema (regla 4).

**Matiz 2026-09-01, revisado el 2026-09-05** sobre degradados: el grano global (`Grain`) y los
halos ambientales se retiran con el pivote a claro — sobre blanco ensuciaban. Sigue permitido el
filete cruzado de marca de `DivisionSwitch`, y sigue prohibido cualquier fondo mesh/sheen
multicolor puramente ornamental.

## Identidad molecular (2026-09-01)

El lenguaje decorativo de movimiento del sistema es atómico/molecular (nodos + enlaces), nunca
partículas genéricas tipo polvo de estrellas/bokeh — conecta con el isotipo de marca (los
logotipos de molécula de Labs/Tech). Color por división: teal (`--color-labs-glow`) en Labs,
magenta (`--color-tech-glow`) en Tech. Referencia de implementación:
`src/components/ui/MolecularField.tsx`.

## Orden de trabajo

El proyecto avanza por fases (ver el prompt de encargo / historial de conversación para el
detalle de cada una: A Base sólida · B Virens Labs · C Virens Tech · D Home y Compañía ·
E Contacto y formulario · F Noticias y CMS · G SEO y cierre). Al terminar una fase: parar,
resumir en tres líneas lo hecho, y esperar el visto bueno antes de encadenar la siguiente.
