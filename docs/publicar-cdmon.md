# Publicar como web estática en cdmon (Apache)

Desde el 01/10/2026 la web puede salir como HTML estático para cualquier
hosting Apache con PHP (cdmon). Netlify sigue funcionando igual que antes.

## Generar el zip

```bash
npm run build:static
```

Deja `virens-web-estatica.zip` en la raíz del repo (no se sube a GitHub). Lleva:

- La web entera en HTML (ES y EN), imágenes, vídeos, favicon, `robots.txt`,
  `sitemap.xml` y la tarjeta `virens-labs.vcf`.
- `.htaccess` (archivo oculto): URLs limpias sin `.html` ni barra final, las 301
  de la web antigua (`redirects.mjs`), página 404, tipos MIME, caché y gzip.
- `api/contacto.php`: el envío del formulario de Contacto.

## Subir

1. Panel de cdmon → Gestor de archivos (o FTP) → carpeta pública del dominio
   (`web/`).
2. Subir el zip y descomprimirlo ahí, de modo que `index.html` y `.htaccess`
   queden directamente en `web/` (no en una subcarpeta).
3. Comprobar en el navegador: `/`, `/compania`, `/en`, `/contacto`, una URL
   antigua (p. ej. `/aviso-legal/`) y una inexistente (debe salir la 404).

## Antes de publicar en lvirens.com

- **Email del formulario:** adg@lvirens.com (constante `TO` de
  `static-host/api/contacto.php`). Si cdmon exige que el remitente sea un buzón del dominio,
  poner ese buzón en `FROM` (si se deja vacío se usa el mismo `TO`). Sin `TO`
  el formulario responde error y la web invita a escribir a csp@lvirens.com.
- **Indexación:** el zip sale indexable (sustituye a la web actual, cliente
  01/10/2026). Para un zip de pruebas: `NEXT_PUBLIC_INDEXABLE=false npm run build:static`.
- **HTTPS y dominio:** el `.htaccess` manda http y www a `https://lvirens.com`
  (sin bucle si el TLS lo termina un proxy).
- **Sustituir WordPress:** copia de `web/` (Comprimir → Descargar), mover su
  contenido (incluido su `.htaccess`) a una carpeta fuera de `web/`, subir el
  zip a `web/` y descomprimirlo ahí. Si net2ftp no admite 26 MB, usar FileZilla.
- **Adjuntos de 10 MB:** depende de `upload_max_filesize` / `post_max_size` del
  PHP de cdmon (se cambian en su panel). Si son menores, el envío con un
  adjunto grande falla y la web muestra el aviso de error.

## Probado

Apache 2.4 + PHP 8.3 en local con el zip tal cual: todas las páginas 200, 301
de la web antigua, 404, favicon, vCard con su tipo, caché inmutable de
`/_next/static`, navegación y formulario (validación, envío con adjunto, correo
recibido con Reply-To del visitante).

## Actualizar la web ya publicada (02/10/2026)

net2ftp no sabe descomprimir zips con carpetas; se usa un `descomprimir.php` de
un solo uso con clave (se genera aparte, no está en el repo): se sube a `web/`
junto al zip, se abre `https://lvirens.com/descomprimir.php?clave=…` y
descomprime, sobrescribe y se borra junto con el zip.

- Si no han cambiado fotos ni vídeos: `virens-web-actualizacion.zip` (≈1 MB).
- Si han cambiado: `virens-web-estatica.zip` (completo).

No se puede subir solo el HTML de la página tocada: cada build regenera los JS
de `_next/` con hashes nuevos y el HTML apunta a ellos.
