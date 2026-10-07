# Laboratorios Virens — reglas del proyecto

Web de `lvirens.com` (Next.js, estática). **Publicada** en cdmon desde el 02/10/2026.
Lo mantiene un diseñador gráfico, no un programador: explica en español llano y breve, sin jerga,
y guía paso a paso cuando haya que hacer algo fuera del editor.

## Flujo

- Se trabaja en la rama **`v2`** → web de pruebas https://virenslab.netlify.app (sola, 1-2 min).
- **Publicar en lvirens.com** = `git push origin origin/v2:refs/heads/produccion` → GitHub Actions
  («Publicar en cdmon») la sube sola. **Solo cuando la persona lo pida** («publica»); después,
  comprobar que la ejecución termina en verde.
- Antes de empezar: `git pull --ff-only origin v2`.
- **Quién lo lleva:** desde el 07/10/2026, el socio de Ignacio (nuevo en código y en GitHub).
  Ignacio solo toca algo si se lo pide. Antes de cada push, `git pull --rebase origin v2`; si hay
  conflicto, no elegir a ciegas: enseñar qué choca y preguntar. Commits con la identidad git de
  quien trabaja (no fijar autor).
- Cada cambio: uno a uno, enseñar el resultado (localhost o Netlify), `npm run typecheck` en
  limpio, una entrada breve al final de `HISTORIAL.md`, commit y push a `v2`.

## Primera vez en un Mac nuevo («es mi primera vez», «déjalo todo listo»)

El proyecto le llega como zip (carpeta con `.git` incluido, sin `node_modules`). Revisar y
resolver en este orden, explicando cada paso en una frase y sin jerga:

1. `node -v`: si falta, mandarle a https://nodejs.org (botón LTS) y esperar a que lo instale.
2. `git -C . status` y `git remote -v` (debe ser `theartificialvision/virens-web`, rama `v2`).
   Pedirle su nombre y email y fijarlos con `git config user.name` / `user.email` (solo en este repo).
3. `npm install`, luego arrancar (`npm run dev`) y enseñarle la web en localhost:3000.
4. Conectar GitHub: `git pull --ff-only origin v2`; si pide usuario o contraseña, o falla el
   permiso, guiarle: aceptar la invitación al repo (email de GitHub) → instalar GitHub Desktop
   (https://desktop.github.com) → **Sign in** → **File → Add Local Repository** → esta carpeta.
   Con eso queda conectado; si un push sigue fallando, que pulse **Push origin** en GitHub Desktop.
5. Terminar con un resumen de cinco líneas: cómo pedir cambios, «guarda y sube a v2» (pruebas en
   virenslab.netlify.app) y «publica en lvirens.com».

## Dónde mirar (solo si hace falta; no leer por defecto)

- Guías para personas: `EMPEZAR-AQUI.md`, `GUIA-PRINCIPIANTES.md`.
- Estado, pendientes y dónde está cada cosa: `TRASPASO.md`.
- Por qué se decidió algo: buscar en `HISTORIAL.md` (reciente) o `docs/archivo/` (septiembre).
- Diseño original, copy y arquitectura: `docs/00-auditoria-y-rediseno-virens.md`.
- Publicación técnica (cdmon, FTP, `.htaccess`): `docs/publicar-cdmon.md`.

## Stack — cerrado

Next.js 15 (App Router) · TypeScript estricto · Tailwind CSS v4 · Framer Motion · three (isotipo
3D). No proponer otro framework (Astro descartado). Dependencias nuevas solo si son
imprescindibles y avisando antes.

## Reglas

1. **Tokens.** Ningún hex, tamaño de fuente ni espaciado suelto: todo en el `@theme` de
   `src/app/globals.css`. Si falta un valor, se añade como token.
2. **Textos fuera del JSX.** Todo texto visible vive en `src/content/*` (ES) y
   `src/content/en/*` (EN, mismas claves por tipo). Si cambia un texto en español, cambia
   también el inglés. El copy es el que da el cliente: **nunca reformularlo** para que suene
   «mejor» o más comercial. Si un párrafo no cabe como titular, se reparte en título + cuerpo
   sin cambiar palabras.
3. **No inventar datos** (cifras, certificaciones, países, años, plazos). Cada entrada lleva su
   origen (`literal` · `rewritten` · `image-only` · `unverified`); los `unverified` no se
   muestran. Si falta un dato, se apunta en `site.pendingClientConfirmation` y se pregunta.
4. **Sin sombras ni radios**, salvo: botones, círculos (`999px`), paneles flotantes de navegación
   (`--radius-panel`, `--shadow-panel`, blur) y superficies «glass» puntuales no repetidas en
   rejilla (`--radius-surface`, `--shadow-elevate`). Rejillas de datos (certificaciones,
   capacidades…): radio 0 y cero sombra; la profundidad se da con un paso de color de fondo.
5. **Ritmo.** Ninguna sección repite fondo ni estructura de la anterior.
6. **Aire.** Mínimo 120 px de padding vertical por bloque en escritorio.
7. **Nada de tarjetas** (rejillas de cards con borde y sombra). Las rejillas de filete
   compartido sin radio ni sombra propia sí valen.
8. **Accesibilidad.** Foco visible, `prefers-reduced-motion` respetado (en JS para canvas/RAF:
   `usePrefersReducedMotion`, `src/lib/useReducedMotion.ts`), vídeo mudo con póster, menú con
   teclado y `Esc`, `alt` real en imágenes informativas, un solo `h1` y encabezados sin saltos.
9. **Rendimiento.** El póster del hero es la imagen LCP y se precarga; el vídeo nunca bloquea.
   Móvil: LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
10. **TypeScript estricto**, `any` prohibido; `npm run typecheck` siempre limpio.

## Estilo de trabajo

- Componentes pequeños (más de 150 líneas → separar). Comentar el porqué, no el qué.
- Móvil desde el principio; en móvil, imagen arriba y texto debajo.
- Código y comentarios en español; nombres de variables y componentes en inglés.
- No refactorizar lo que no se ha pedido ni cambiar decisiones tomadas sin consultar. Si una
  petición choca con una regla, decirlo y proponer alternativa.
- La tipografía no se cambia sin que se pida.

## Prohibido

Estética de plantilla/WordPress, aspecto SaaS/startup u hospitalario, rejillas de tarjetas,
iconos en círculos por defecto, columnas estrechas llenas de texto, sombras, degradados
decorativos o mesh multicolor, rellenar todos los huecos, imágenes decorativas sin información.
Permitidos: halo ambiental tenue, grano global y la identidad molecular.

**Identidad molecular:** el movimiento decorativo es atómico (nodos + enlaces), nunca partículas
genéricas. Teal (`--color-labs-glow`) en Labs, magenta (`--color-tech-glow`) en Tech. Referencia:
`src/components/ui/MolecularField.tsx`.
