# Blog — cómo funciona y cómo se pone en marcha

Rama `blog` (09/10/2026). La web pública sigue en `v2` sin blog hasta que se decida unirlo.

## Piezas

- **Supabase** (gratis): base de datos de artículos, login del panel e imágenes subidas.
  - `supabase/schema.sql`: tablas, permisos (RLS) y carpeta de imágenes `blog`.
  - `supabase/import-noticias.sql`: las 18 noticias de la web de WordPress. Sus imágenes
    están en `public/img/noticias/`, no en Supabase.
- **Panel** `/admin` (`src/app/(admin)`, `src/components/admin`): login con email y
  contraseña, lista de artículos y editor (Tiptap). Funciona en el navegador; la seguridad
  real la ponen las reglas de Supabase: solo los emails de la tabla `blog_admins` pueden
  escribir o ver borradores.
- **Web pública** `/blog` y `/blog/<slug>` (`src/app/(es)/blog`, `src/views/Blog*`): se
  generan en el servidor con lo publicado. En Netlify se actualizan solas cada 60 s.
  En la exportación estática (cdmon) solo se actualizan al volver a publicar la web
  (pendiente: publicación automática al pulsar «Publicar»).
- Claves en `src/config/blog.ts`: la dirección del proyecto y la clave **publicable**
  (pública por diseño). La clave secreta no va nunca en el proyecto.

## Puesta en marcha (una sola vez)

1. Crear cuenta y proyecto en supabase.com (región Europa, plan Free).
2. **SQL Editor** → pegar `supabase/schema.sql` → **Run**. Después `import-noticias.sql` → **Run**.
3. Dar permiso de admin (SQL Editor):
   `insert into public.blog_admins (email) values ('email@de-quien-edita');`
4. **Authentication → Users → Add user → Create new user**: el mismo email, una contraseña y
   marcar **Auto Confirm User**.
5. **Authentication → Sign In / Providers**: desactivar **Allow new users to sign up**.
6. **Project Settings → API Keys**: copiar la **Project URL** y la **Publishable key** a
   `src/config/blog.ts`.
7. Netlify (cuenta de Ignacio): **Site configuration → Build & deploy → Branches and deploy
   contexts → Branch deploys → Let me add individual branches → `blog`**. Queda en
   `https://blog--virenslab.netlify.app`.

## Añadir o quitar a alguien del panel

Pasos 3 y 4 con su email. Para quitarlo: borrarlo en Authentication → Users y
`delete from public.blog_admins where email = '…';`.
