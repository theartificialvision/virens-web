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

- **Email del formulario** (pendiente del cliente): editar `static-host/api/contacto.php`,
  constante `TO`. Si cdmon exige que el remitente sea un buzón del dominio,
  poner ese buzón en `FROM` (si se deja vacío se usa el mismo `TO`). Sin `TO`
  el formulario responde error y la web invita a escribir a csp@lvirens.com.
- **Indexación:** por defecto `robots.txt` bloquea buscadores (`site.ts`,
  `isIndexable`). El día que esto sustituya a la web real:
  `NEXT_PUBLIC_INDEXABLE=true npm run build:static`.
- **HTTPS:** cuando el certificado esté activo, descomentar las dos líneas
  «Forzar HTTPS» del `.htaccess` (en `scripts/build-static.mjs`).
- **Adjuntos de 10 MB:** depende de `upload_max_filesize` / `post_max_size` del
  PHP de cdmon (se cambian en su panel). Si son menores, el envío con un
  adjunto grande falla y la web muestra el aviso de error.

## Probado

Apache 2.4 + PHP 8.3 en local con el zip tal cual: todas las páginas 200, 301
de la web antigua, 404, favicon, vCard con su tipo, caché inmutable de
`/_next/static`, navegación y formulario (validación, envío con adjunto, correo
recibido con Reply-To del visitante).
