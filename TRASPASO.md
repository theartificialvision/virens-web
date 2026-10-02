# Traspaso — estado del proyecto (02/10/2026)

Resumen vigente para quien retome. Reglas en `CLAUDE.md`; guías para personas en
`EMPEZAR-AQUI.md` y `GUIA-PRINCIPIANTES.md`; cambios recientes al final de `HISTORIAL.md`.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Código | GitHub `theartificialvision/virens-web`. Rama **`v2`** = trabajo. `produccion` = lo publicado. `main` = V1 antigua, no tocar. |
| Web real | **https://lvirens.com** — hosting cdmon, carpeta `web/`. Se actualiza con push a `produccion` (GitHub Actions «Publicar en cdmon», ~1 min). |
| Web de pruebas | https://virenslab.netlify.app (Netlify `virenslab`), se actualiza sola con cada push a `v2`. |
| WordPress anterior | Guardado en cdmon en `backup_db/oldvirens`. |
| Material original (vídeos, logos, referencias) | Fuera del repo: carpeta `material/` en iCloud de Ignacio. |
| Restos antiguos | Repo `theartificialvision/VIrensLab` y proyectos Netlify `virens-v2`, `virenslabv2`, `virens-web`: pruebas viejas, no usar. |

## Cómo se publica (técnico)

- `npm run build:static` → `out/` (HTML estático, `output: 'export'`) + `.htaccess` generado
  (URLs limpias, 301 de `redirects.mjs`, HTTPS sin www, 404, caché) + `api/contacto.php`.
- El workflow sube el zip por FTP con `curl` y lo descomprime llamando a
  `scripts/descomprimir.php` (clave aleatoria por ejecución). cdmon no admite FTPS. Detalles:
  `docs/publicar-cdmon.md`. Secretos `CDMON_FTP_SERVER/USER/PASSWORD` en GitHub.
- Formulario de Contacto → `static-host/api/contacto.php` (`mail()`), destino **adg@lvirens.com**.
- Las redirecciones viven en `redirects.mjs` (una lista para Next/Netlify y para el `.htaccess`).

## Estructura de la web

- **Páginas:** Home (= Virens Labs; `/virens-labs` redirige a `/`), Virens Tech, Compañía,
  Contacto y legales, en ES (raíz) y EN (`/en/...`). Rutas en `src/lib/i18n.ts`.
- **Vistas** en `src/views/*View.tsx`; componentes en `src/components/` (`v2/` = home y comunes,
  `sections/` = Tech, Compañía, Contacto).
- **Textos** en `src/content/*` (ES) y `src/content/en/*` (EN, obligado por tipo a tener las
  mismas claves). Inglés marcado `[TR]` = traducción pendiente de revisar (`docs/i18n-ingles.md`).
- **Diseño:** tokens en el `@theme` de `src/app/globals.css`. La tipografía de la home es la
  norma para todas las páginas. Isotipos 3D de color en cabecera y pie (el blanco, no).

## Pendiente

- **Pop-up de eventos** (`src/components/cphi/`, `src/content/cphi.ts`, estilos `.cphi__*` en
  `globals.css`): **no borrar, es la plantilla para futuros eventos.** Se oculta solo pasada la
  fecha `end` (CPHI: 8/10/2026 17:00). Para un evento nuevo: cambiar en `cphi.ts` fechas, textos,
  stand e imágenes (`public/img/cphi/`), y cambiar `SEEN_KEY` en `CphiPopup.tsx` para que vuelva a
  salir a quien ya vio el anterior. La nota de la tarjeta `.vcf` (`src/app/virens-labs.vcf/`)
  menciona CPHI: actualizarla o quitarla.
- **Política de cookies:** no hay texto; `/uso-de-cookies` redirige a una página inexistente (404).
- **Legales:** falta el email real para derechos RGPD (el texto trae «email@laempresa.com»).
- **Datos sin confirmar por el cliente:** `site.pendingClientConfirmation` en `src/config/site.ts`.
- **Inglés `[TR]`** pendiente de revisión por el cliente.
- **Sello «FDA Approved»** publicado por decisión del cliente (02/10); la FDA no «aprueba»
  complementos: si tienen registro FDA o FDA-GMP, conviene usar esa denominación.
