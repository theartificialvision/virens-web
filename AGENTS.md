# Instrucciones para agentes (Codex, Copilot y otros)

Este proyecto se trabaja con varias IA. Las reglas son las mismas para todas y
viven en un solo sitio:

1. [`TRASPASO.md`](TRASPASO.md) — dónde está todo, cómo se publica, estado y pendientes.
2. [`CLAUDE.md`](CLAUDE.md) — reglas del proyecto (stack cerrado, tokens, contenido
   fuera del JSX, no inventar datos, accesibilidad…). Son obligatorias aunque el
   archivo se llame así.
3. Las últimas entradas de [`HISTORIAL.md`](HISTORIAL.md) — qué se hizo y por qué.

Lo imprescindible, por si solo lees esto:

- Rama **`v2`** = pruebas (Netlify `virenslab` despliega solo). **lvirens.com** se publica
  llevando `v2` a la rama `produccion` (GitHub Actions → cdmon), solo cuando la persona lo pida.
  **Nunca** `netlify deploy` directo: el siguiente push lo pisa.
- Antes de empezar, `git pull --ff-only origin v2`: otras sesiones suben cambios.
- `npm run typecheck` en limpio antes de cada commit. Añade una entrada al final
  de `HISTORIAL.md` con lo que cambias.
- Textos en `src/content/*` (ES y `src/content/en/*`), nunca en el JSX. Valores de
  color, tamaño y espacio solo como tokens en el `@theme` de `src/app/globals.css`.
- La tipografía no se cambia sin que el cliente lo pida.
