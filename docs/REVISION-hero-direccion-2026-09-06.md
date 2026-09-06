# Revisión: nueva dirección del hero de Home (2026-09-06, tarde)

Documento de traspaso para revisar el cambio en frío desde VS Code.
Contexto completo en `../HISTORIAL.md`, entrada `2026-09-06 (5)`.

## Qué se pretendía

El cliente rechazó el hero ("efectos 2007") y aprobó la nueva dirección:
foto B/N como protagonista y prueba documental, color de división solo como
señal, movimiento ambiente cero. Este cambio la implementa sin tocar la
interacción de dos pasos, el copy, la tipografía, `/contacto` ni el material
`.glass`.

## Ficheros nuevos (3)

- `src/components/sections/DivisionBackdrops.tsx` (~68 líneas). Solo los
  fondos: las 3 fotos a pantalla completa con fundido entre escenas + el velo
  neutro único. Conserva la carga diferida por montaje (azul con `priority`
  como LCP; Labs/Tech en `requestIdleCallback`, montaje inmediato si el clic
  llega antes). Sin duotono, sin líquido, sin WebGL.
- `src/components/sections/DivisionMarks.tsx` (~50 líneas). Isotipos 3D
  (`LogoSpin`, sin cambios de props) + wordmarks + el filete-señal
  (`.home-rule`, 3 px, color de su división).
- `src/components/sections/DivisionActions.tsx` (~80 líneas). Los dos botones
  `.glass`. Presentacional: el estado `active` y los guardias `hoverLocked` /
  `skipFocusSelect` los posee `DivisionSplit` y entran por props.

## Ficheros reescritos (2)

- `src/components/sections/DivisionSplit.tsx` (285 → 150 líneas). Misma
  máquina de estados y mismos tres gestos (ratón: hover desplaza + clic entra;
  táctil: primer toque desplaza + segundo entra; teclado: foco desplaza +
  Enter entra; salida por `mouseleave`/`blur`/Escape/flecha). Solo orquesta.
- `src/app/globals.css`. Eliminado: tokens `--home-hi-*`, `--home-lo-*`,
  `--home-liquid-*`, `--home-depth`, `--home-scrim`, `--home-labs/tech-ink`;
  reglas `.home-tint`, `.home-tone`, `.home-liquid` (+ 3 `@keyframes` de
  deriva), `home-breathe`, `.home-depth-field`. Añadido: tokens
  `--home-veil-top/mid/low` (`rgba(2,10,20,0.44/0.52/0.66)`); `.home-photo`
  pasa a `grayscale(1) contrast(1.08) brightness(0.94)` sin animación;
  `.home-shade` es un degradado vertical neutro único; `.home-rule` es el
  filete teal/magenta (`--color-labs`/`--color-tech`) según
  `[data-side]`. Se mantiene el fundido+asentado de `.home-backdrop`
  (transición de estado, no ambiente).

## Ficheros borrados (5)

- `src/lib/heroDepth.ts` + `src/components/ui/HeroDepth.tsx`: motor y
  componente del campo molecular WebGL. `three` sigue en `package.json`
  porque la usa `LogoSpin` (decisión vigente del cliente).
- `public/img/home-presentation-{blue,labs,tech}.jpg`: sin uso desde las B/N.

## Ficheros retocados (3)

- `src/lib/utils.ts`: fuera `divisionColor` / `divisionGlow` (sin uso).
- `src/content/home.ts`: actualizado el comentario del bloque de fotos
  (el CSS ya no tiñe; la foto se lee tal cual).
- `HISTORIAL.md`: entrada `2026-09-06 (5)` con dirección, bajas, altas y
  verificación.

## Verificación hecha

- `npm run typecheck`: limpio.
- `npm run build`: limpio, 11 rutas estáticas. `/` = 3.48 kB / 159 kB
  First Load (three fuera del bundle inicial, igual que antes).
- Incidencia: el primer build falló con
  `Cannot find module './vendor-chunks/framer-motion.js'`; era caché `.next`
  rancia, se resolvió con `rm -rf .next` (igual que el 04/09). No tocar código.
- `grep` de restos: cero referencias a `HeroDepth`, `heroDepth`,
  `home-tint/tone/liquid/breathe/drift/depth-field`, `home-presentation`.

## Pendiente de verificar EN NAVEGADOR (no se pudo aquí)

- Contraste real del velo sobre cada foto (objetivo: 3:1 al ser texto
  grande; el 4,67:1 anterior era con el duotono, hay que remedir).
- Los tres gestos + Escape + flecha, en desktop y móvil real (iframe 390,
  táctil por CDP con `hover:none` + `pointer:coarse`). Método al final del
  TRASPASO en HISTORIAL.md.
- Cómo arrancar: `cd web && npm run dev` → `http://127.0.0.1:3000`.

## Puntos para la revisión

1. ¿El velo 0.44/0.52/0.66 deja la foto con cuerpo sin matar el blanco del
   texto? Es el número más opinable del cambio.
2. ¿El filete de 3 px se lee como señal de división o pide más presencia?
3. `DivisionSplit` queda en 150 líneas justas (la regla pide partir
   "a partir de" esa cifra); si crece algo, lo siguiente en salir es el
   bloque de la flecha de retorno.
4. Nada commiteado: todo está en el working tree, igual que el resto de la
   sesión (ver `git status` en `web/`).
