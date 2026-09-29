# Noticias — APARCADO (29/09/2026)

El cliente no quiere la sección de noticias de momento. Aquí queda guardado el
trabajo de Muse Code para retomarlo cuando la pidan. **Nada de esta carpeta se
compila ni se publica**: está fuera de `src/` y `public/`, y excluida en
`tsconfig.json`.

## Qué hay
- `src/content/noticias.ts` — los 18 artículos reales de lvirens.com (extracción
  wp-json del 29/09/2026): títulos y fechas literales, cuerpos saneados.
- `src/components/news/*`, `src/lib/news.ts`, `src/app/noticias/**` — índice
  filtrable y plantilla de artículo.
- `public/img/noticias/` — 29 imágenes en local.
- `noticias.css` — bloque de estilos que iba al final de `globals.css`.
- `redirecciones-301.txt` — las 18 redirecciones `/<slug>/` → `/noticias/<slug>`.

## Antes de reactivarlo (ver doc del proyecto `noticias-revision-2026-09-29`)
- Está hecho sobre la web del **24/09**: hay que portarlo a la estructura actual
  (`app/(es)` y `app/en`, i18n, `CtaBand` en vez de `CtaContact`, sitemap y
  `next.config.mjs` actuales). No copiarlo tal cual.
- Bug: `vitafoods-2026.jpg` no existe, el archivo es `.png`.
- Textos en JSX (`aria-label`) y fecha fijada a `es-ES`.
- Estética pendiente: imágenes heterogéneas (stock, gráficos con texto,
  miniaturas de 225–280 px), cabecera sin hero, negritas del cuerpo en azul,
  filtros en pastilla. Preguntas abiertas: CMS, imágenes, inglés, textos y
  categorías.
