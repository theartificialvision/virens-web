# Traspaso — cómo retomar el proyecto (actualizado 29/09/2026)

Nota para cualquier asistente (Claude, Codex, otro) que continúe. Léelo antes
que nada; luego [`CLAUDE.md`](CLAUDE.md) (reglas) y las últimas entradas de
[`HISTORIAL.md`](HISTORIAL.md) (qué se hizo y por qué). Al terminar una sesión
con cambios, añade una entrada al final de `HISTORIAL.md` y actualiza este
archivo si cambió algo de lo de abajo.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Código (este repo) | GitHub `theartificialvision/virens-web`, **rama `v2`** (la buena). `main` = V1 antigua, no tocar. |
| Web publicada | Netlify, proyecto **`virenslab`** → https://virenslab.netlify.app. Se publica solo con cada push a `v2` (~1-2 min). |
| Carpeta del cliente en su Mac | `~/Documents/Claude/Projects/WEB VIRENS` (en iCloud): `web/` = este repo; `material/` = vídeos, logos, iconos, fotos IA, referencias, prototipos 3D; `LEEME.md`; `ARRANCAR WEB.command` y `GUARDAR Y PUBLICAR.command`. |
| Repo duplicado | `theartificialvision/VIrensLab` es una copia vieja parada el 22/09. No usar. |
| Otros proyectos de Netlify | `virens-v2`, `virenslabv2`, `virens-web` son pruebas antiguas. El bueno es `virenslab`. |

## Trabajar desde VS Code (Mac) — desde el 28/09/2026

El cliente sigue el proyecto en **VS Code** en su Mac (con Claude Code, Codex u
otra IA dentro). Todo está preparado en el repo:

- **Abrir:** VS Code → Archivo → Abrir carpeta →
  `~/Documents/Claude/Projects/WEB VIRENS/web` (la carpeta `web`, no la de
  arriba). VS Code propondrá las extensiones recomendadas
  (`.vscode/extensions.json`: Claude Code, Tailwind CSS IntelliSense, ESLint):
  aceptar.
- **Reglas para la IA:** Claude Code lee `CLAUDE.md` solo; Codex y Copilot leen
  `AGENTS.md`, que remite a este archivo y a `CLAUDE.md`. Mismas reglas para
  todas.
- **Antes de tocar nada:** traer lo último de GitHub. Panel Control de código
  → «…» → Pull, o Terminal → Ejecutar tarea → «Traer lo último de GitHub (v2)».
  Hay sesiones en la nube que suben a `v2`; trabajar sobre una copia vieja es
  lo que rompió la Compañía el 27/09.
- **Ver la web:** Terminal → Ejecutar tarea → «Arrancar web (localhost:3000)»
  (o doble clic en `ARRANCAR WEB.command`). La primera vez instala
  dependencias si faltan.
- **Comprobar:** tarea «Comprobar tipos (typecheck)»: tiene que salir limpio.
- **Publicar:** panel Control de código → escribir mensaje → Commit → Sync
  (push a `v2`; Netlify publica en 1-2 min). La primera vez VS Code pide
  «Iniciar sesión con GitHub» en el navegador: así el Mac queda con
  credenciales y el push funciona (también el de `GUARDAR Y PUBLICAR.command`
  si usa las mismas). Nunca commit en `main` (VS Code avisa: está protegida
  en `.vscode/settings.json`).
- **iCloud:** `node_modules` y `.next` son **enlaces** a `node_modules.nosync` y
  `.next.nosync` (iCloud no sube `*.nosync`). No convertirlos en carpetas. Si
  alguna vez `node_modules` apunta a otro sitio (p. ej. `/tmp/...`), rehacer
  el enlace: `ln -sfn node_modules.nosync node_modules` dentro de `web/`.
  `.vscode/settings.json` los saca del buscador y del vigilante de archivos.
- Si aparecen carpetas «nombre 2», «nombre 3» vacías: son duplicados de iCloud,
  se pueden borrar.

## Cómo se trabaja (flujo acordado con el cliente)

- **El cliente quiere que lo hagas todo tú**, incluido guardar y publicar: no le
  dejes comandos para que los ejecute él. Escribe en español, directo y breve.
- **Publicar:** commit en `v2` y push a GitHub; Netlify despliega solo.
  **Nunca publicar directo a Netlify** (`netlify deploy` desde el Mac): el
  siguiente push a `v2` lo pisa. Pasó el 27/09 con la Compañía de Codex, que
  hubo que rescatar de la copia del Mac.
  - Desde una sesión en la nube de Claude: añadir el repo con acceso `push`
    (herramienta `add_repo`), clonar la rama `v2`, trabajar, commit y push.
    Después sincronizar la copia del Mac: en la carpeta `web/` del Mac,
    `git fetch origin v2 && git reset --hard origin/v2` (hace falta permiso
    de borrado en esa carpeta para que git reescriba archivos).
  - Desde el Mac: `GUARDAR Y PUBLICAR.command` (mensaje en
    `mensaje-commit.txt` junto al script). El repo del Mac usa SSH con la clave `~/.ssh/id_ed25519_github`,
    verificada con GitHub; no necesita usuario y token por HTTPS.
- **Ver en local (Mac):** `ARRANCAR WEB.command` → http://localhost:3000.
  La carpeta está en iCloud, así que `node_modules` y `.next` son enlaces a
  `node_modules.nosync` / `.next.nosync` (iCloud no sincroniza `*.nosync`).
  El script lo mantiene; no los conviertas en carpetas normales.
- **Comprobar antes de subir:** `npm run typecheck` en limpio (regla 10) y
  revisar en navegador (Playwright) escritorio 1440 y móvil 390. Las capturas
  de página completa (`fullPage`) salen vacías por las entradas `Reveal`:
  verifica con scroll real.
- **Commits:** autor «Ignacio Pisano <pisanoignacio@gmail.com>».

## Estado a 28/09/2026

- **Home** (`src/views/HomeView.tsx`, componentes en `src/components/v2/`):
  Hero (vídeo corporativo) → presentación integral del laboratorio (titular,
  panorámica y cinco capacidades; maqueta aprobada 28/09) → **Formas
  galénicas + escala industrial** en un solo bloque (`GalenicBlock`): cabecera
  teal con texto y foto; debajo, en gris, las **nueve** formas (fuera
  «Encapsulado automático») con su capacidad contando y su rango bajo cada
  una (`GalenicRailItem`, `GalenicFigure`; carril deslizable en móvil) y la
  fila de totales +2.000 m² · 9 · 2, sin la fila de acondicionamiento (`GalenicScale`) →
  **Capacidad productiva**: las siete siluetas que crecen por tamaños →
  Áreas terapéuticas (marquee compacto en mayúsculas, blanco/teal/magenta, barras sutiles y movimiento pausado) →
  Certificaciones → CTA. Ver `HISTORIAL.md` (29)–(31).
- **Virens Tech** (`src/app/virens-tech/page.tsx`), sin repeticiones desde
  el 27/09: portada con titular propio «Desarrollo y formulación de
  complementos alimenticios» → intro de una frase → frase puente magenta
  (sin pilares) → **slide guiado por el scroll** de los seis servicios
  (`ServicesSlider` + `ServiceSlide` + `useSlideProgress`, inercia y deriva
  continuas; panel alterno azul #00285C / verde #164E3B; versión móvil propia)
  → certificaciones → CTA. Fuera cifras, «Visitar Labs» y la barra de anclas.
- **Virens Labs es la Home:** la página `/virens-labs` se retiró y redirige
  permanentemente a `/`; menú, pie y enlaces cruzados apuntan ya a la Home.
- **Compañía** (`src/app/compania/page.tsx`): portada nueva con claim
  «Expertos en complementos alimenticios», bloque «Quiénes somos» con cinco
  pilares iconográficos, «Qué hacemos» con cadena de valor en panel continuo,
  bloque I+D/control de calidad y timeline rediseñada en vidrio sobre foto.
- **CTA «¿Hablamos de tu proyecto?»:** el mismo componente (`CtaBand`) en Home, Tech y Compañía.
- **Tipografía (27/09):** la home es la norma para todas las páginas (H1
  `--v2-hero-title` peso normal, H2 `--text-h2` peso medio, cuerpo
  `--text-small`/1,85, ritmo `--v2-section`). Ver `HISTORIAL.md` (12).
- El isotipo 3D **blanco** no va en ninguna parte (cliente). Los isotipos de
  color de cabecera y pie sí se quedan.

## Idiomas (desde el 27/09/2026)

- **ES + EN.** Español en la raíz (`/`, `/compania`, `/virens-tech`,
  `/contacto`); inglés con rutas traducidas, las mismas que ya
  publica lvirens.com (`/en`, `/en/company`, `/en/virens-tech`,
  `/en/contact`). Mapa de rutas y utilidades en `src/lib/i18n.ts`.
- **Estructura:** cada idioma tiene su layout raíz (`src/app/(es)/layout.tsx`,
  `src/app/en/layout.tsx`, con `<html lang>` correcto). Las páginas son
  «vistas» en `src/views/*View.tsx` que reciben `locale`; las rutas solo las
  montan. Los componentes reciben `locale` y piden el texto a
  `src/content/index.ts` (`homeContent(locale)`, etc.). Textos de interfaz
  (menú, pie, metadatos) en `src/content/ui.ts`.
- **Contenido inglés:** `src/content/en/*.ts`, obligado por tipo a tener las
  mismas claves que el español (si falta un texto, no compila). Origen de cada
  texto (`[EN]` literal web actual, `[IMG]` literal de imagen, `[TR]` traducción
  de Claude **pendiente de revisión**) y lista de pendientes en
  `docs/i18n-ingles.md`.
- **Añadir un idioma:** columna en `routes` (`src/lib/i18n.ts`) + `src/content/<xx>/`
  + entrada en `ui.ts` + carpeta `src/app/<xx>/`.
- Selector ES / EN dentro del menú: lleva a la misma página en el otro idioma.
- Redirecciones: `/en/virens-labs` → `/en`; `/ca/*` → `/`; `/fr/*`, `/it/*`,
  `/zh-hans/*` → `/en` (`next.config.mjs`).
- `next build` local: sin red a Google Fonts falla; se puede compilar con
  `NEXT_FONT_GOOGLE_MOCKED_RESPONSES=<archivo>` (ver HISTORIAL 19).

## Pendiente / preguntas abiertas

- **Copia del Mac sincronizada el 29/09/2026** con `origin/v2` (8 commits
  nuevos traídos). Un commit local sin subir del 28/09 (`2b2385e`, «Home:
  Private Label y Full service como progresión 01-02»), superado por el
  recorrido del laboratorio ya publicado, quedó guardado en la rama local
  `respaldo-mac-2b2385e`, por si hiciera falta. Sigue también el `git stash`
  del 28/09. Desde ahora: pull antes de trabajar y publicar solo por push a `v2`.
- **Noticias: retirada por decisión del cliente (29/09).** Fuera del menú, el
  pie, el sitemap y las rutas; `/noticias/*` redirige a `/` y `/en/news/*` a
  `/en`. El trabajo de Muse está en `aparcado/noticias/`, fuera de la build.
- **Tech, «De la idea al producto final» + proceso de servicios: rehacer entero**
  (cliente, 29/09 noche). Encargo en `docs/PROMPT-tech-proceso.md`.
- **Páginas legales**: no existen aún en ningún idioma (`/legal/*`,
  `/en/legal/*`); pie, formulario y redirecciones ya apuntan ahí.
- **Revisión del inglés `[TR]`** por el cliente: `docs/i18n-ingles.md`.

- Compañía: el hito 2026 de la historia repite literalmente el texto de 2023
  (viene así de la maqueta). Pedir el texto real o quitar el hito.
- Slide de Tech: empieza en azul por el primer slide del diseño del cliente;
  confirmar si prefiere empezar en verde. La frase destacada (`highlight`) de
  cada servicio no se muestra (su diseño no la lleva).
- Datos que el cliente debe confirmar antes de publicar en `lvirens.com`:
  `site.pendingClientConfirmation` en `src/config/site.ts` y la tabla
  «Casos abiertos» de `HISTORIAL.md`.
- Pendientes de fase (contacto con formulario, noticias/CMS, SEO, `/en`,
  legales): la sección «Estado actual» de `HISTORIAL.md` es del 02/09 y no se
  ha vuelto a revisar entera; compruébalo en el código y el registro de
  sesiones antes de dar nada por hecho.
