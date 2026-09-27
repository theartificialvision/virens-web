# Traspaso — cómo retomar el proyecto (actualizado 27/09/2026)

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

## Cómo se trabaja (flujo acordado con el cliente)

- **El cliente quiere que lo hagas todo tú**, incluido guardar y publicar: no le
  dejes comandos para que los ejecute él. Escribe en español, directo y breve.
- **Publicar:** commit en `v2` y push a GitHub; Netlify despliega solo.
  - Desde una sesión en la nube de Claude: añadir el repo con acceso `push`
    (herramienta `add_repo`), clonar la rama `v2`, trabajar, commit y push.
    Después sincronizar la copia del Mac: en la carpeta `web/` del Mac,
    `git fetch origin v2 && git reset --hard origin/v2` (hace falta permiso
    de borrado en esa carpeta para que git reescriba archivos).
  - Desde el Mac: `GUARDAR Y PUBLICAR.command` (mensaje en
    `mensaje-commit.txt` junto al script). **Ojo:** el Mac aún no tiene
    credenciales de GitHub guardadas; ese push pide usuario y token.
- **Ver en local (Mac):** `ARRANCAR WEB.command` → http://localhost:3000.
  La carpeta está en iCloud, así que `node_modules` y `.next` son enlaces a
  `node_modules.nosync` / `.next.nosync` (iCloud no sincroniza `*.nosync`).
  El script lo mantiene; no los conviertas en carpetas normales.
- **Comprobar antes de subir:** `npm run typecheck` en limpio (regla 10) y
  revisar en navegador (Playwright) escritorio 1440 y móvil 390. Las capturas
  de página completa (`fullPage`) salen vacías por las entradas `Reveal`:
  verifica con scroll real.
- **Commits:** autor «Ignacio Pisano <pisanoignacio@gmail.com>».

## Estado a 27/09/2026

- **Home** (`src/app/page.tsx`, componentes en `src/components/v2/`):
  Hero (vídeo corporativo) → Private Label / Full service → **Formas
  galénicas** (dos pisos: texto + foto; debajo franja a todo el ancho con 10
  formatos, entrada «dibujada» y foco con zoom al pasar el cursor) →
  **Capacidad productiva integrada en dos tiempos**: primero las siete
  siluetas que crecen por tamaños (hover/foco; recorrido automático en táctil)
  y, debajo, «Escala industrial propia» con +2.000 m², 9 formatos, 2 niveles y
  capacidad numérica por formato → Áreas terapéuticas → Certificaciones
  («Nuestras certificaciones») → CTA.
- **Virens Tech** (`src/app/virens-tech/page.tsx`): portada nueva tintada en
  azul (WebP), sin isotipo 3D blanco, sin botón «Visitar Labs» en el hero,
  **sin barra horizontal de anclas**, y los seis servicios en un **slide
  guiado por el scroll** (`ServicesSlider` + `ServiceSlide`) con panel
  alterno azul #00285C / verde #164E3B.
- **Virens Labs es la Home:** la página `/virens-labs` se retiró y redirige
  permanentemente a `/`; menú, pie y enlaces cruzados apuntan ya a la Home.
- **CTA «¿Hablamos de tu proyecto?»:** el mismo icono en Home, Tech y Compañía.
- El isotipo 3D **blanco** no va en ninguna parte (cliente). Los isotipos de
  color de cabecera y pie sí se quedan.

## Pendiente / preguntas abiertas

- Franja final de Tech (`DivisionSwitch`, «Visitar Labs»): el cliente quitó el
  botón del hero; preguntar si también quiere quitar esta franja.
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
