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

1. Instalar **Node.js** (versión LTS) desde https://nodejs.org.
2. Instalar **VS Code** desde https://code.visualstudio.com.
3. Pedir a Ignacio acceso al repositorio en GitHub (te invita como
   colaborador a `theartificialvision/virens-web`; acepta el correo).
4. VS Code → pestaña «Control de código» → **Clonar repositorio** →
   `https://github.com/theartificialvision/virens-web` → elige dónde guardarla.
   La primera vez pedirá iniciar sesión en GitHub en el navegador: acepta.
5. Abajo a la izquierda, cambia a la rama **`v2`** (no `main`).
6. VS Code propone extensiones recomendadas: acepta (incluye **Claude Code**).
   Inicia sesión en Claude Code con tu cuenta.

## El día a día

1. **Antes de nada, traer lo último:** menú Terminal → Ejecutar tarea →
   «Traer lo último de GitHub (v2)».
2. **Ver la web en el Mac:** Terminal → Ejecutar tarea → «Arrancar web
   (localhost:3000)» y abre http://localhost:3000. Se recarga sola al cambiar
   algo.
3. **Pedir cambios a Claude Code** (panel de Claude en VS Code). Ejemplos:
   - «Cambia el titular de la home por …»
   - «Sustituye la foto de Galénica por este archivo» (arrástralo al chat)
   - «Haz el espacio entre secciones un poco más grande»
   Claude conoce las reglas (colores, tipografía, textos fuera del código,
   accesibilidad) porque las lee de `CLAUDE.md` al empezar.
4. **Guardar y ver en pruebas:** dile a Claude «guarda y sube a v2», o en
   «Control de código» escribe un mensaje → Commit → Sync. En 1-2 min está en
   https://virenslab.netlify.app.
5. **Publicar en lvirens.com** (solo cuando lo de pruebas esté bien): dile a
   Claude «publica en lvirens.com», o Terminal → Ejecutar tarea → «Publicar en
   lvirens.com». Se ve el progreso en GitHub → pestaña **Actions** →
   «Publicar en cdmon» (✅ = publicado).

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
