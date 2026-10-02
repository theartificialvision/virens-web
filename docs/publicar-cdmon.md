# Publicación en cdmon (técnico)

**Normal:** push a la rama `produccion` (o «Run workflow» en Actions) →
`.github/workflows/publicar-cdmon.yml`:

1. `npm ci` · `npm run typecheck` · `npm run build:static`.
2. `curl` sube por FTP (PASV clásico, `--disable-epsv`) a `web/` el zip completo y
   `scripts/descomprimir.php` con una clave aleatoria de esa ejecución.
3. Abre `https://lvirens.com/descomprimir.php?clave=…`: descomprime encima, borra el
   zip y se borra a sí mismo. El paso exige la respuesta «LISTO».

Secretos en GitHub: `CDMON_FTP_SERVER`, `CDMON_FTP_USER`, `CDMON_FTP_PASSWORD`.

**Por qué así:** cdmon no admite FTPS («500 AUTH not understood») y con FTP plano la subida
archivo a archivo (FTP-Deploy-Action) moría al listar carpetas (ECONNRESET). net2ftp tampoco
descomprime bien zips con carpetas.

## Qué genera `npm run build:static` (`scripts/build-static.mjs`)

- `out/`: web estática (`STATIC_EXPORT=1` → `output: 'export'`, imágenes sin optimizador),
  indexable por defecto (`NEXT_PUBLIC_INDEXABLE=false` para un zip de pruebas).
- `out/.htaccess`: URLs limpias (`/compania` → `compania.html`, sin barra final), 301 de
  `redirects.mjs`, http/www → `https://lvirens.com`, 404, tipos MIME, caché y gzip.
- `out/api/contacto.php` (copiado de `static-host/`): formulario → `mail()` a `TO`
  (adg@lvirens.com); remitente `FROM` vacío = el propio `TO`; Reply-To = el visitante.
- `virens-web-estatica.zip` (completo) y `virens-web-actualizacion.zip` (sin `img/` ni `video/`).

## A mano (si GitHub Actions fallara)

En net2ftp, subir a `web/` el zip y `descomprimir.php` (de `scripts/`, sustituyendo
`__CLAVE__` por una clave cualquiera) y abrir `https://lvirens.com/descomprimir.php?clave=…`.
No sirve subir solo el HTML de una página: cada build cambia los nombres de los JS de `_next/`.

## Límites conocidos

- Adjuntos del formulario hasta 10 MB: depende de `upload_max_filesize`/`post_max_size` de cdmon.
- Si cdmon exige que el remitente sea un buzón real, poner ese buzón en `FROM`.
