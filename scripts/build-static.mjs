/**
 * Web estática para Apache (cdmon) — `npm run build:static` (01/10/2026).
 *
 * 1. `next build` con `STATIC_EXPORT=1` → HTML estático en `out/`.
 * 2. Copia `static-host/` (el PHP del formulario) dentro de `out/`.
 * 3. Escribe `out/.htaccess`: URLs limpias, las 301 de `redirects.mjs`, 404,
 *    tipos MIME, caché y compresión.
 * 4. Empaqueta `out/` en `virens-web-estatica.zip` (con el `.htaccess`) y en
 *    `virens-web-actualizacion.zip`, igual pero sin `img/` ni `video/` (≈1 MB
 *    frente a ≈26): para actualizar una web ya publicada cuando no han
 *    cambiado fotos ni vídeos. No se puede subir solo «la página cambiada»:
 *    cada build regenera los JS de `_next/` con otro hash, y el HTML nuevo
 *    apunta a ellos, así que páginas y `_next/` van siempre juntos.
 *
 * Lo que se sube al hosting es el CONTENIDO del zip, en la raíz pública del
 * dominio (en cdmon, la carpeta `web/`).
 */
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import { redirectRules } from '../redirects.mjs';

const OUT = 'out';
const ZIP = 'virens-web-estatica.zip';
const UPDATE_ZIP = 'virens-web-actualizacion.zip';
const run = (cmd, env = {}) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, ...env } });

// La build estática es la de lvirens.com en producción (cliente, 01/10/2026:
// sustituye a la web actual), así que sale indexable. Para un zip de pruebas
// que no deba indexarse: `NEXT_PUBLIC_INDEXABLE=false npm run build:static`.
const indexable = process.env.NEXT_PUBLIC_INDEXABLE ?? 'true';

rmSync(OUT, { recursive: true, force: true });
run('npx next build', { STATIC_EXPORT: '1', NEXT_PUBLIC_INDEXABLE: indexable });
cpSync('static-host', OUT, { recursive: true });

/** `/noticias/:path*` → `^noticias(?:/.*)?$`; `/compania/` → `^compania/$`. */
function toPattern(source) {
  const path = source.replace(/^\//, '').replace(/[.+?()[\]{}|\\^$]/g, '\\$&');
  return `^${path.replace(/\/:path\*$/, '(?:/.*)?')}$`;
}

const redirects = redirectRules()
  .map(([source, destination]) => `RewriteRule ${toPattern(source)} ${destination} [R=301,L]`)
  .join('\n');

const htaccess = `# Generado por scripts/build-static.mjs — no editar a mano.
Options -Indexes -MultiViews
# /en y /en/… conviven con la carpeta en/: sin esto Apache añadiría la barra.
DirectorySlash Off
DirectoryIndex index.html
ErrorDocument 404 /404.html

AddType text/vcard .vcf
AddType application/vnd.apple.pkpass .pkpass
AddType image/avif .avif
AddType image/webp .webp
AddType video/webm .webm
AddType video/mp4 .mp4
AddType image/svg+xml .svg
AddType text/plain .txt
AddDefaultCharset utf-8
AddCharset utf-8 .html .txt .xml .vcf

<IfModule mod_headers.c>
  <FilesMatch "\\.vcf$">
    Header set Content-Disposition "attachment; filename=\\"virens-labs.vcf\\""
  </FilesMatch>
  <FilesMatch "\\.pkpass$">
    Header set Content-Disposition "attachment; filename=virens-cphi-milan-2026.pkpass"
  </FilesMatch>
  # Los assets de Next llevan hash en el nombre: inmutables.
  <If "%{REQUEST_URI} =~ m#^/_next/static/#">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </If>
  <FilesMatch "\\.(html|txt)$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/xml application/javascript text/javascript application/json image/svg+xml text/vcard
</IfModule>

RewriteEngine On

# Dominio canónico con HTTPS y sin www (site.url = https://lvirens.com).
# Se mira también X-Forwarded-Proto por si el hosting termina el TLS en un
# proxy: sin eso, la regla redirigiría en bucle.
RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
RewriteRule ^ https://%1%{REQUEST_URI} [R=301,L]
RewriteCond %{HTTPS} off
RewriteCond %{HTTP:X-Forwarded-Proto} !https
RewriteCond %{HTTP_HOST} !^(localhost|127\\.0\\.0\\.1)(:\\d+)?$
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# Redirecciones 301 de la web anterior (redirects.mjs, §14.5).
${redirects}

# Sin barra final, como en la web publicada: /compania/ → /compania.
RewriteCond %{REQUEST_URI} !^/$
RewriteRule ^(.+)/$ /$1 [R=301,L]

# URLs limpias: /compania sirve compania.html; /en sirve en.html.
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+)$ $1.html [L]
`;
writeFileSync(`${OUT}/.htaccess`, htaccess);

for (const z of [ZIP, UPDATE_ZIP]) if (existsSync(z)) rmSync(z);
run(`cd ${OUT} && zip -rqX ../${ZIP} .`);
run(`cd ${OUT} && zip -rqX ../${UPDATE_ZIP} . -x 'img/*' -x 'video/*'`);
console.log(`\n✓ ${ZIP} (web completa) y ${UPDATE_ZIP} (sin fotos ni vídeos) listos.`);
