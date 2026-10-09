-- ============================================================================
-- BLOG — base de datos, permisos y almacenamiento de imágenes (09/10/2026).
--
-- Se pega UNA vez en Supabase → SQL Editor → Run. Es repetible: si se vuelve a
-- ejecutar no duplica nada.
--
-- Seguridad (lo que de verdad protege, no la pantalla de login):
-- - Row Level Security: el público solo puede LEER artículos publicados con
--   fecha ya cumplida. Escribir, borrar o ver borradores exige sesión iniciada
--   Y que el email esté en `blog_admins`.
-- - Las imágenes se leen en público, pero solo un admin puede subir o borrar.
-- ============================================================================

-- --- Quién puede editar ------------------------------------------------------
create table if not exists public.blog_admins (
  email text primary key check (email = lower(email))
);
alter table public.blog_admins enable row level security;
-- Sin políticas: nadie la lee ni la cambia desde la web; solo desde el panel
-- de Supabase. Para dar acceso a alguien:
--   insert into public.blog_admins (email) values ('persona@lvirens.com');

create or replace function public.is_blog_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.blog_admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- --- Artículos ---------------------------------------------------------------
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null default '',
  subtitle     text not null default '',
  slug         text not null unique
               check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 120),
  cover_image  text,
  -- HTML del editor. La web lo vuelve a limpiar al mostrarlo.
  content      text not null default '',
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  published_at timestamptz,
  -- Un artículo publicado siempre tiene fecha y título.
  constraint published_complete check (
    status = 'draft' or (published_at is not null and length(trim(title)) > 0)
  )
);

create index if not exists posts_public_idx on public.posts (status, published_at desc);

create or replace function public.posts_touch()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
  for each row execute function public.posts_touch();

alter table public.posts enable row level security;

drop policy if exists "Lectura pública de publicados" on public.posts;
create policy "Lectura pública de publicados" on public.posts
  for select to anon, authenticated
  using (status = 'published' and published_at <= now());

drop policy if exists "Admins: leer todo" on public.posts;
create policy "Admins: leer todo" on public.posts
  for select to authenticated using (public.is_blog_admin());

drop policy if exists "Admins: crear" on public.posts;
create policy "Admins: crear" on public.posts
  for insert to authenticated with check (public.is_blog_admin());

drop policy if exists "Admins: editar" on public.posts;
create policy "Admins: editar" on public.posts
  for update to authenticated
  using (public.is_blog_admin()) with check (public.is_blog_admin());

drop policy if exists "Admins: borrar" on public.posts;
create policy "Admins: borrar" on public.posts
  for delete to authenticated using (public.is_blog_admin());

-- --- Imágenes ----------------------------------------------------------------
-- Carpeta pública «blog», máx. 5 MB por imagen, solo formatos de imagen.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog', 'blog', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Blog: admins suben" on storage.objects;
create policy "Blog: admins suben" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'blog' and public.is_blog_admin());

drop policy if exists "Blog: admins cambian" on storage.objects;
create policy "Blog: admins cambian" on storage.objects
  for update to authenticated
  using (bucket_id = 'blog' and public.is_blog_admin());

drop policy if exists "Blog: admins borran" on storage.objects;
create policy "Blog: admins borran" on storage.objects
  for delete to authenticated
  using (bucket_id = 'blog' and public.is_blog_admin());
