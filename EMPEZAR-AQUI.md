# Empezar aquí — web de Laboratorios Virens (lvirens.com)

Guía para quien coge el proyecto a partir de octubre de 2026. No hace falta
saber programar: los cambios se piden a Claude Code en lenguaje normal y él
sigue las reglas del proyecto, que ya están escritas en esta carpeta.

**¿Primera vez con código, GitHub o VS Code?** Empieza por
[`GUIA-PRINCIPIANTES.md`](GUIA-PRINCIPIANTES.md): vocabulario, cuentas,
conexión con GitHub (en el Mac o desde el navegador) y qué hacer si algo sale
mal. Esta página es el resumen rápido.

## Cómo está montado (en una frase cada cosa)

- **Esta carpeta** es la web entera: código, textos, fotos, vídeos y reglas.
- **GitHub** (`theartificialvision/virens-web`) guarda la carpeta en la nube.
  Hay dos ramas que importan:
  - **`v2`**: donde se trabaja. Cada vez que se sube, se actualiza la web de
    pruebas **https://virenslab.netlify.app** en 1-2 minutos.
  - **`produccion`**: lo que está en **lvirens.com**. Cuando se sube, GitHub
    publica sola la web en el hosting de cdmon en ~1 minuto.
- **La web real (lvirens.com)** vive en cdmon. Nunca hace falta entrar en cdmon
  ni en net2ftp: se publica desde aquí.

## Preparar el Mac (una sola vez, ~15 minutos)

1. **Instalar tres programas** (como cualquier app):
   - **Node.js**: https://nodejs.org → botón «LTS».
   - **GitHub Desktop**: https://desktop.github.com.
   - **App de Claude**: https://claude.ai/download → iniciar sesión.
2. **Traer el proyecto** con GitHub Desktop (antes, aceptar la invitación que
   llega por email de GitHub):
   **Sign in to GitHub.com** → **File → Clone Repository** →
   `theartificialvision/virens-web` → carpeta `Documentos/virens-web` →
   **Clone**. Arriba, en **Current Branch**, elegir **`v2`**.
3. **Abrir en Claude:** app de Claude → pestaña **Code** → trabajar en **tu Mac**
   → elegir la carpeta `Documentos/virens-web` y escribir:

   > Es mi primera vez. Lee EMPEZAR-AQUI.md y déjalo todo listo.

Claude comprueba lo que falta, instala lo necesario y te enseña la web. Si pide
permiso para algo («Allow»), es normal.

## El día a día

Todo se pide a Claude en la pestaña Code:

1. «Trae lo último de v2».
2. Pedir el cambio (texto, foto, espacio, color…), mejor con capturas.
3. «Enséñame cómo queda en escritorio y en móvil».
4. «Guarda y sube a v2» → en 1-2 min en https://virenslab.netlify.app.
5. «Publica en lvirens.com» (solo cuando esté aprobado) → GitHub lo sube a
   cdmon en ~1 min; se ve en GitHub → **Actions** → «Publicar en cdmon».

Si Claude no puede subir a GitHub, GitHub Desktop → **Push origin**.

## Trabajar dos a la vez

El proyecto lo llevan dos personas, cada una desde su Mac y con su propio Claude.
Para no pisarse:

- **Siempre «trae lo último de v2» antes de empezar.** Claude además lo repite
  antes de subir; si los dos tocasteis lo mismo, te enseñará el choque y te
  preguntará cuál se queda.
- **Avisaos de qué zona estáis tocando** (una página, un bloque). Dos personas en
  el mismo archivo a la vez es lo único que da guerra.
- **Publicar en lvirens.com publica todo lo que haya en `v2`**, también lo del
  otro. Antes de «publica», mirad juntos https://virenslab.netlify.app.
- Cada uno sube con su propia cuenta de GitHub: en el historial se ve quién hizo qué.

**Para dar acceso a alguien nuevo** (lo hace Ignacio, dueño del repo): GitHub →
`theartificialvision/virens-web` → Settings → Collaborators → **Add people** → su
usuario o email → rol **Write**. La persona acepta el correo y sigue
[`GUIA-PRINCIPIANTES.md`](GUIA-PRINCIPIANTES.md) §3. No hace falta darle acceso a
cdmon ni a Netlify: la publicación sale de GitHub.

## Dónde se cambia cada cosa (para orientarte, Claude ya lo sabe)

| Qué | Dónde |
|---|---|
| Textos en español | `src/content/*.ts` |
| Textos en inglés | `src/content/en/*.ts` (mismas claves que el español) |
| Colores, tamaños, espacios, tipografía | bloque `@theme` de `src/app/globals.css` (tokens) |
| Fotos y vídeos | `public/img/…` y `public/video/…` |
| Datos de empresa (teléfono, emails, dirección) | `src/config/site.ts` |
| Pop-up de eventos (ferias) | `src/content/cphi.ts` — se reutiliza: «haz el pop-up del próximo evento con estos datos» |
| Email que recibe el formulario | `static-host/api/contacto.php` (`TO`, hoy adg@lvirens.com) |

## Para la IA y para profundizar

- `CLAUDE.md` — reglas del proyecto (Claude Code lo lee solo).
- `TRASPASO.md` — estado, dónde está todo y pendientes.
- `HISTORIAL.md` — cada cambio hecho y por qué (lo último, al final).
- `docs/00-auditoria-y-rediseno-virens.md` — documento maestro del diseño.
- `docs/publicar-cdmon.md` — detalles técnicos de la publicación.

**Primer mensaje recomendado a Claude Code en una cuenta nueva:**

> Lee EMPEZAR-AQUI.md, TRASPASO.md y las últimas entradas de HISTORIAL.md y
> resúmeme en cinco líneas el estado de la web y cómo se publica. No cambies
> nada todavía.
