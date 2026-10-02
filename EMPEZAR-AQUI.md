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

## Preparar el Mac (una sola vez)

Se trabaja con la **app de Claude para Mac** (pestaña **Code**, sesión local).
Paso a paso, con capturas mentales, en [`GUIA-PRINCIPIANTES.md`](GUIA-PRINCIPIANTES.md) §3:

1. Instalar **Node.js** (LTS), **GitHub Desktop** y la **app de Claude**.
2. Aceptar la invitación de GitHub a `theartificialvision/virens-web`.
3. GitHub Desktop → iniciar sesión → **Clone Repository** → rama **`v2`**.
4. App de Claude → **Code** → carpeta del proyecto → «arranca la web y enséñamela».

(VS Code también sirve: el repo trae tareas en `.vscode/tasks.json`, incluida
«Publicar en lvirens.com». No es necesario.)

## El día a día

Todo se pide a Claude en la pestaña Code:

1. «Trae lo último de v2».
2. Pedir el cambio (texto, foto, espacio, color…), mejor con capturas.
3. «Enséñame cómo queda en escritorio y en móvil».
4. «Guarda y sube a v2» → en 1-2 min en https://virenslab.netlify.app.
5. «Publica en lvirens.com» (solo cuando esté aprobado) → GitHub lo sube a
   cdmon en ~1 min; se ve en GitHub → **Actions** → «Publicar en cdmon».

Si Claude no puede subir a GitHub, GitHub Desktop → **Push origin**.

## Dónde se cambia cada cosa (para orientarte, Claude ya lo sabe)

| Qué | Dónde |
|---|---|
| Textos en español | `src/content/*.ts` |
| Textos en inglés | `src/content/en/*.ts` (mismas claves que el español) |
| Colores, tamaños, espacios, tipografía | bloque `@theme` de `src/app/globals.css` (tokens) |
| Fotos y vídeos | `public/img/…` y `public/video/…` |
| Datos de empresa (teléfono, emails, dirección) | `src/config/site.ts` |
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
