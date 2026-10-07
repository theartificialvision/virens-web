# Historial — Laboratorios Virens

Una entrada breve por cambio, al final (fecha · qué · por qué). Lo anterior al
01/10/2026 está en [`docs/archivo/HISTORIAL-hasta-2026-09-30.md`](docs/archivo/HISTORIAL-hasta-2026-09-30.md):
buscar ahí solo si hace falta saber el porqué de una decisión antigua.

## 2026-10-01 · Home: se retiran los clips del recorrido del laboratorio
- A petición del cliente se quitan los clips del vídeo corporativo añadidos el
  30/09/2026 en «Ciencia, desarrollo y fabricación» y vuelven las cinco fotos
  fijas de cada fase (revierte `ace2759`: `LabClip.tsx`, `public/video/lab/` y
  las rutas `video` de `v2Laboratory`). El vídeo del hero no se toca.

## 2026-10-01 · Compañía: hero sin recorte, textos del proceso y último hito de la historia
- Hero (escritorio): la foto de los frascos ya no se recorta con una elipse (que
  «mordía» el frasco de la izquierda y rozaba el titular); ocupa el 46 % de la
  derecha con borde recto (`--company-hero-media-w`). En móvil no cambia.
- «Qué hacemos» (cliente, texto nuevo): 02 «Realización de muestras para
  conseguir el producto deseado por el cliente»; 03 «Transformación de la idea
  en producto acabado» (los títulos no cambian). EN ajustado en consecuencia
  (`[EN]`, pendiente de revisión).
- Línea del tiempo: el último hito deja de repetir el texto de 2023 y dice
  «FDA-GMP Elevando la excelencia.» (EN: «FDA-GMP Elevating excellence.»). Su
  año es siempre el año en curso (`currentYear` en `TimelineEntry`): se calcula en
  el navegador con `useSyncExternalStore`, así que el 01/01/2027 mostrará 2027
  sin tocar nada. El HTML estático lleva el año de la última compilación como
  valor de reserva. Probado adelantando el reloj a 2027.

## 2026-10-01 · Pie: nuevo layout de escritorio y fuera la web
- Se quita «www.lvirens.com» de la dirección (ya se está en la web): sale del
  pie y del contenido (`v2FooterAddress.web`, ES y EN). Queda «Telf. +34 93 682 89 72».
- Layout de escritorio rehecho sobre cinco columnas iguales: fila 1, logo +
  Virens Labs / Virens Tech / Empresa / Documentación (el logo a la altura de
  los rótulos); fila 2, bajo un filete, Producción y Almacén / Oficina en las dos
  primeras columnas y localidad + teléfono en la tercera, sobre las mismas
  columnas que los enlaces. Antes la dirección iba comprimida bajo el logo y
  partía líneas. Móvil sin cambios (solo desaparece la web).

## 2026-10-01 · Pie: claim «EXPERTS IN FOOD SUPPLEMENTS» en cristal con destello
- Nuevo claim a todo el ancho del pie, entre la fila de dirección y el copyright
  (decorativo: `aria-hidden`). El texto sale de `v2Hero.title` —el mismo claim
  del hero—, así que no se duplica contenido en el JSX.
- Efecto «glass»: letras de cristal esmerilado (relleno blanco translúcido que
  se apaga hacia abajo, filete de luz arriba y abajo de la caja de mayúsculas) y
  un halo teal tenue detrás para que el cristal tenga algo que refractar. Sin
  `-webkit-text-stroke`: Montserrat lleva contornos solapados (X, P, R, M, N) y
  el trazo dibujaba costuras dentro de las letras.
- Destello: una pasada de luz diagonal, izquierda a derecha, cada 9 s (~1,8 s de
  recorrido, resto en reposo). Con `prefers-reduced-motion` queda estático.
- Tamaño por ancho de contenedor (`cqw`) calibrado con las métricas reales de
  Montserrat 700: una línea en escritorio (llena el ancho sin desbordar a 1280,
  1440 y 1920) y dos líneas en móvil («EXPERTS IN FOOD / SUPPLEMENTS»). Todos los
  valores son tokens `--claim-*` en `globals.css`.

## 2026-10-01 · Hero de la home: vídeos nuevos de 40 s (horizontal + vertical móvil)
- El cliente entrega dos cortes de 40 s del corporativo (sin textos ni logos):
  horizontal 1920×1080 y vertical 1080×1920. Sustituyen al corte largo anterior
  (`hero-corporativo-sin-texto.*`, borrado).
- Formato: sin audio y sin metadatos; horizontal a 1920×1080, vertical bajado a
  720×1280. Cada uno en AV1 10 bits (`.webm`, SVT-AV1 CRF 38) y H.264
  (`.mp4`, CRF 28, `faststart`). Pesos: horizontal 4,8 MB AV1 / 8,2 MB H.264;
  vertical 2,3 MB / 4,0 MB.
- Hasta ahora el móvil se quedaba solo con el póster; ahora reproduce el corte
  vertical (`media="(max-width: 767.98px)"`). El póster (`hero-poster-40s.jpg`,
  primer fotograma del horizontal) sigue siendo la imagen LCP.

## 2026-10-01 · Pie: claim plano, según referencia del cliente
- El cliente pide el claim «más sencillo, más plano», sin halo ni efectos, y
  manda una captura de referencia. Fuera el cristal esmerilado, los filetes de
  luz, el halo teal y el destello cada 9 s: ahora es texto plano en blanco al
  30 % (`--claim-color`, medido sobre la referencia) en Montserrat 700. El
  tamaño y la partición en móvil no cambian.

## 2026-10-01 · Compañía: vuelve el corte curvo de la foto del hero
- Cliente: «antes era curvo el corte, quedaba mucho mejor». En escritorio la foto
  vuelve a recortarse con la elipse de antes (`--company-hero-media-curve`,
  `ellipse(76% 92% at 75% 50%)`) en lugar del borde recto con banda azul. Se
  mantiene el ancho del 46 % del cambio de esta mañana, así que la curva no
  vuelve a rozar el titular. Móvil sin cambios.

## 2026-10-01 · Compañía: curva del hero sin tramo recto
- Cliente: la curva tenía una parte recta a la izquierda pegada a la banda azul.
  Causa: la elipse (`ellipse(76% 92% at 75% 50%)`) se salía 1 % por la izquierda
  de la caja de la foto y el borde de la caja la cortaba en vertical (≈ 30 % de
  la altura). Nueva elipse `ellipse(75% 95% at 78% 50%)`: su punto más a la
  izquierda queda al 3 % dentro de la caja, así que el borde es curvo de arriba
  abajo. La forma de las esquinas apenas cambia.

## 2026-10-01 · Web estática para cdmon (Apache), favicon y envío del formulario
- `npm run build:static` (`scripts/build-static.mjs`): `next build` con
  `STATIC_EXPORT=1` (`output: 'export'`, imágenes sin optimizador), copia el PHP
  de `static-host/`, genera `.htaccess` (URLs limpias, 301, 404, MIME, caché,
  gzip) y empaqueta `virens-web-estatica.zip`. Las 301 salen a `redirects.mjs`
  para que Next y Apache compartan la lista. `robots.ts` y `sitemap.ts` pasan a
  `force-static` (lo exige la exportación). Guía: `docs/publicar-cdmon.md`.
- Favicon: `icon.svg` (isotipo de color en lienzo cuadrado), `apple-icon.png`
  180 px sobre blanco y `favicon.ico` 16/32/48.
- Formulario de Contacto: envía por `fetch` a `/api/contacto.php` (campos,
  departamento y adjunto ≤ 10 MB) con trampa anti-bots, avisos de enviando /
  enviado / error / campos pendientes (ES + EN `[TR]`) y vaciado tras enviar. El
  email de destino está **pendiente del cliente** (constante `TO` del PHP;
  añadido a `site.pendingClientConfirmation`). Sin él responde error y la web
  ofrece csp@lvirens.com.
- Probado con el zip en Apache 2.4 + PHP 8.3: páginas ES/EN 200, 301 antiguas,
  404, favicon, vCard, caché, navegación sin errores y envío real con adjunto
  (correo capturado: asunto, Reply-To del visitante, adjunto). La build de
  Netlify sigue pasando con las mismas 35 redirecciones.

## 2026-10-01 · Tech: las fotos entran con un barrido tipo escáner
- Cliente: fuera el círculo («gota») con el que entraban las fotos del recorrido
  de Tech; quiere algo horizontal, como un escáner, sutil y elegante. Ahora la
  foto se descubre de izquierda a derecha (`clip-path: inset`) y en su filo va
  una línea de luz blanca de 2 px con una estela magenta corta (4,5 rem) que se
  apaga al llegar. Tinte magenta inicial rebajado (0,45 → 0,2) y zoom de
  entrada más leve (1,08 → 1,04). Mismo efecto en el visor de escritorio y en
  las fotos de cada capítulo en móvil. Tokens `--tech-scan-*` en `globals.css`.
- La línea se mueve con `left` y no con `transform`: el transform va por el
  compositor, se adelanta un fotograma al `clip-path` y la línea quedaba
  recortada (invisible). Con `prefers-reduced-motion` no hay barrido ni línea.

## 2026-10-01 · Formulario de Contacto: destino adg@lvirens.com
- El cliente da el email que recibe el formulario: adg@lvirens.com (distinto del
  general csp@lvirens.com). Puesto en `TO` de `static-host/api/contacto.php` y
  retirado de `site.pendingClientConfirmation`. `FROM` vacío: el correo sale
  como adg@lvirens.com con Reply-To de quien escribe.

## 2026-10-01 · Zip de cdmon definitivo: sustituye a la web actual
- El cliente confirma que la web estática sustituye a la actual (WordPress en
  `web/` de cdmon). `npm run build:static` sale ahora indexable por defecto
  (`robots.txt` Allow + sitemap, meta `index, follow`) y el `.htaccess` fuerza
  `https://lvirens.com` (www y http → 301), con guarda de `X-Forwarded-Proto`
  contra bucles. Probado en Apache: redirecciones, páginas, 404 y formulario.
- Siguen abiertos los datos de `site.pendingClientConfirmation` (dirección
  48-A/48B, «FDA APPROVED», países), ahora en la web pública.

## 2026-10-02 · Certificaciones: se muestra el sello FDA Approved
- El cliente pide mostrar el sello «FDA APPROVED» (estaba vectorizado en
  `/img/v2/sellos/fda.svg` pero oculto como `unverified`). Pasa a `image-only`
  en ES y EN y sale de `site.pendingClientConfirmation`. La franja queda con
  nueve sellos: una fila en escritorio, 3 + 3 + 3 en móvil.
- Para actualizar cdmon basta con subir de nuevo el zip y `descomprimir.php`
  (script de un solo uso con clave, fuera del repo): sobrescribe sin borrar.

## 2026-10-02 · cdmon: zip de actualización ligero (sin fotos ni vídeos)
- `npm run build:static` genera además `virens-web-actualizacion.zip` (≈1 MB):
  la web sin `img/` ni `video/`, para actualizar cdmon cuando solo cambian
  textos o código. No vale subir solo el HTML de la página tocada: cada build
  regenera los JS de `_next/` con hashes nuevos. Probado sobre la build del
  01/10: tras descomprimir el ligero, todo carga y sale el sello FDA.

## 2026-10-02 · Publicación automática en cdmon desde GitHub
- Workflow `publicar-cdmon.yml`: push a `produccion` → typecheck, build
  estática y subida FTP incremental a `web/` (SamKirkland/FTP-Deploy-Action).
  `v2` sigue siendo Netlify. Pendiente: que el cliente cargue los tres secretos
  FTP y crear la rama `produccion`.

## 2026-10-02 · Workflow de cdmon: FTPS
- Primera ejecución (rama `produccion` creada por el cliente): login y build
  bien, pero cdmon cortó el canal de datos (`ECONNRESET`) al crear `_next/`.
  Se pasa a FTPS explícito (`protocol: ftps`, `security: loose` por conectar
  por IP). La web de cdmon no se tocó: sigue la subida manual del 01-02/10.

## 2026-10-02 · Workflow de cdmon: un zip + descomprimir.php
- FTPS tampoco: cdmon responde «500 AUTH not understood». Se abandona
  FTP-Deploy-Action (subida archivo a archivo; moría al listar carpetas por
  FTP plano) y se automatiza el método manual que sí funcionó: `curl` sube el
  zip completo y `scripts/descomprimir.php` (clave aleatoria por ejecución,
  enmascarada en el log) con PASV clásico, y luego se abre el script por HTTPS
  y se exige «LISTO».

- Primera publicación automática correcta (02/10/2026, ~1 min): compila, sube el
  zip y descomprime con «LISTO». Publicar = «publica» → push de `v2` a `produccion`.

## 2026-10-02 · Traspaso al diseñador gráfico
- Nuevo `EMPEZAR-AQUI.md` (guía para personas: preparar el Mac, día a día,
  pruebas en Netlify, publicar en lvirens.com, dónde se cambia cada cosa y
  primer mensaje para Claude en una cuenta nueva).
- `CLAUDE.md`: estado actual (web publicada, `v2` → pruebas, `produccion` →
  lvirens.com solo cuando se pida) y «Orden de trabajo» pasa de fases a
  mantenimiento por un no programador. `AGENTS.md` y `TRASPASO.md` al día.
- Tarea de VS Code «Publicar en lvirens.com» (push de `v2` a `produccion`).

## 2026-10-02 · Guía para principiantes
- `GUIA-PRINCIPIANTES.md` para el diseñador: vocabulario básico, cuentas, dos
  formas de conectar GitHub (VS Code en el Mac o claude.ai/code + connect-github),
  día a día, qué hacer si algo sale mal y ejercicio del primer día. Enlazada
  desde `EMPEZAR-AQUI.md` y `CLAUDE.md`.
- Ajuste: el diseñador trabaja con la app de Claude para Mac (pestaña Code,
  sesión local) + GitHub Desktop para iniciar sesión y clonar; VS Code queda
  como opción. Guías reescritas en ese sentido.

## 2026-10-02 · Limpieza del proyecto (eficiencia para la IA)
- Fuera código muerto: 11 componentes sin uso (`CapacityGrid`, `Certifications`,
  `Timeline`, `DivisionSwitch`, `StatRow`…), `NumberBadge`, `content/labs.ts`,
  Apple Wallet del pop-up CPHI (nunca se mostraba), ~20 reglas y 10 tokens CSS
  huérfanos, 6 fotos y 7 SVG de `public/` que ninguna página carga.
- Fuera carpetas: `aparcado/` (Noticias) y `wallet/`, y tres docs de encargos
  de septiembre. Todo recuperable desde el historial de git.
- Documentación: `CLAUDE.md` reescrito y más corto (mismas reglas; ya no manda
  leer todo al empezar), `TRASPASO.md` y `docs/publicar-cdmon.md` solo con lo
  vigente, `README.md` mínimo, historial de septiembre archivado en
  `docs/archivo/`. Regla de copy literal conservada en `CLAUDE.md`.
- Verificado: typecheck, build estática y de Netlify, 9 páginas × escritorio y
  móvil sin 404 ni errores ni imágenes rotas, formulario enviando.

## 2026-10-02 · Pop-up de eventos como plantilla
- El pop-up de CPHI no se retira: se oculta solo tras `end` y queda como plantilla
  de futuros eventos (cliente: habrá más). Cómo reutilizarlo en `TRASPASO.md`,
  `src/content/cphi.ts` y `EMPEZAR-AQUI.md`.

## 2026-10-02 · Certificaciones: una sola fila en todo escritorio
- Antes solo cabían en una fila entre ~1280 y 1680 px; en 1024-1152 y 1920 se
  partían. Ahora, desde 1024 px, el lado de los sellos se ajusta al ancho de la
  fila (`.cert-row`, container query) sin pasar de `--v2-seal`; `CertStrip`
  calcula `--seal-units`/`--seal-count` con los sellos visibles. Tablet y móvil
  sin cambios. Verificado a 1024, 1152, 1280, 1366, 1440, 1680 y 1920.

## 2026-10-02 · Certificaciones: fuera «Organic Certified»
- Cliente: el sello ecológico ya no va. Quitado de ES y EN y borrado su SVG.
  Quedan 8 sellos (una fila en escritorio; 3 + 3 + 2 en móvil). El hito de 2015
  «Certificación ECO y Veterinaria» de la historia de Compañía no se toca.

## 2026-10-07 · Proyecto compartido con el socio
- El socio de Ignacio se suma con su Mac y su Claude. `EMPEZAR-AQUI.md`: sección
  «Trabajar dos a la vez» (traer antes de empezar, avisar de la zona, publicar
  incluye lo del otro) y cómo invitar a alguien en GitHub. `CLAUDE.md`: pull con
  rebase antes de cada push, conflictos se preguntan, commits con la identidad
  de quien trabaja. `TRASPASO.md` al día.

## 2026-10-07 · El socio lleva el proyecto (entrega en zip)
- El socio pasa a llevar la web; Ignacio solo interviene si se le pide.
- Entrega por zip (carpeta con `.git`, sin `node_modules`) para que solo tenga que
  descomprimir y abrirla en la app de Claude. `EMPEZAR-AQUI.md`: preparar el Mac en
  3 pasos. `CLAUDE.md`: lista de «primera vez en un Mac nuevo» para que Claude deje
  todo listo (Node, identidad git, `npm install`, conexión con GitHub vía GitHub Desktop).
- Corrección: sin zip (46 MB, y de todas formas hacía falta GitHub Desktop para subir).
  Se trae el proyecto clonando con GitHub Desktop, que deja la conexión hecha.
