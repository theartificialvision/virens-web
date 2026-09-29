# Prompt — rediseño de «De la idea al producto final» (Virens Tech)

Contexto: repo `theartificialvision/virens-web`, rama `v2` (Next.js 15, TS
estricto, Tailwind v4). Lee primero `CLAUDE.md`, `TRASPASO.md` y las últimas
entradas de `HISTORIAL.md`. Publicar = commit + push a `v2` (Netlify despliega).

Tarea: rediseñar por completo, en /virens-tech, la franja magenta «De la idea al
producto final» (`TypographicBlock` + `integratedSolutions`) y el bloque de
servicios que sigue (`TechProcess`, `ProcessMolecule`, `ProcessStep`,
`moleculeGeometry.ts`, `useProcessProgress.ts`, CSS `.proc*` en `globals.css`).
El cliente considera la versión actual «un desastre».

Objetivo: que Virens Tech se lea como **expertos en complementos alimenticios**:
química, inteligencia, rigor científico. Premium, sobrio, tipo Apple.
- Evitar: estética gamer (neón, fondos oscuros con retícula, halos), aspecto
  PowerPoint (diapositivas que se reemplazan), rejillas de tarjetas.
- Buscar: lógica de fluidos/átomos con movimiento suave y orgánico, detalle de
  laboratorio (tipografía técnica discreta, finura de líneas), fotografía
  grande y bien encuadrada (fotos 16:9 en `public/img/virens-tech/`).
- Contenido (no cambiar textos, viven en `src/content/tech.ts` y `en/tech.ts`):
  5 servicios — Formulación, Galénica, Estabilidad de productos, Garantía de
  calidad, Regulatorio. Anclas `#formulacion`, `#rd-galenicos`, `#estabilidad`,
  `#garantia-de-calidad`, `#regulatory-consulting` deben seguir funcionando.
- Escritorio y móvil igual de cuidados. Sin secuestrar el scroll.
- Reglas: tokens solo en `@theme` de `globals.css`; ningún texto en JSX;
  `prefers-reduced-motion` con alternativa estática; foco visible; un solo h1;
  `npm run typecheck` limpio; ES y EN.

Entrega: propone 2 direcciones en texto antes de programar; implementa la
elegida; captura escritorio (1440) y móvil (390); añade entrada en HISTORIAL.
