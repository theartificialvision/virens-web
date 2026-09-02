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
4. **Sin sombras y sin radios**, salvo botones, círculos de numeración (`999px`), **paneles
   flotantes de navegación** (el desplegable del menú en desktop): ahí sí se permite radio
   (`--radius-panel`, 20px), blur de fondo y una sombra de elevación sutil (`--shadow-panel`),
   siguiendo las Human Interface Guidelines de Apple como referencia de estilo para este tipo de
   elemento (2026-09-01, decisión del cliente), y — **añadido 2026-09-01, pivote a oscuro** —
   superficies «glass» puntuales y no repetidas en rejilla (el icono de `CtaContact`, el cursor
   personalizado, cualquier elemento flotante nuevo equivalente), con `--radius-surface` (12px) y
   `--shadow-elevate`. Esta cuarta excepción **no** cubre las rejillas de datos (capacidad,
   certificaciones, áreas terapéuticas, franjas de estadística): esas siguen en radio 0 / cero
   sombra y ganan profundidad subiendo el relleno de celda un escalón (`--color-ink` →
   `--color-surface` → `--color-surface-2`), nunca con esquina redondeada ni sombra por celda. En
   el resto de la web —secciones, bloques, imágenes, tarjetas de noticias— sigue rigiendo radio 0
   y cero sombra sin excepción.
5. **Ritmo.** Ninguna sección repite el fondo ni el layout de la anterior. Antes de dar una
   página por terminada, recorrer la secuencia de `tone` y de estructura y verificar que no hay
   dos iguales seguidas.
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
círculos por defecto · columnas estrechas llenas de texto · sombras · degradados «tecnológicos»
decorativos · aspecto SaaS/startup · estética hospitalaria · rellenar todos los huecos · imágenes
decorativas que no aporten información.

**Matiz 2026-09-01** sobre degradados: el halo ambiental (`--glow-labs`/`--glow-tech`), el grano
global y el filete cruzado de marca de `DivisionSwitch` sí están permitidos — son señal de
marca/profundidad, no relleno decorativo. Sigue prohibido cualquier fondo mesh/sheen multicolor
puramente ornamental.

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
