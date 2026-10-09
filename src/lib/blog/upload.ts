'use client';

import { blogConfig } from '@/config/blog';
import { supabase } from './client';

const MAX_SIDE = 2000;

/**
 * Reduce la foto en el navegador antes de subirla (lado mayor 2000 px, WEBP;
 * JPG si el navegador no sabe hacer WEBP). Una foto de móvil de 8 MB queda en
 * unos cientos de KB y la web carga rápido sin que nadie tenga que editarla.
 */
async function shrink(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const toBlob = (type: string) => new Promise<Blob | null>((ok) => canvas.toBlob(ok, type, 0.85));
  const webp = await toBlob('image/webp');
  if (webp && webp.type === 'image/webp') return webp;
  const jpeg = await toBlob('image/jpeg');
  if (!jpeg) throw new Error('No se ha podido procesar la imagen');
  return jpeg;
}

/** Sube una imagen y devuelve su dirección pública. */
export async function uploadBlogImage(file: File, folder: 'portadas' | 'cuerpo'): Promise<string> {
  const blob = await shrink(file);
  const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
  const path = `${folder}/${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const storage = supabase().storage.from(blogConfig.bucket);
  const { error } = await storage.upload(path, blob, { contentType: blob.type, cacheControl: '31536000' });
  if (error) throw error;
  return storage.getPublicUrl(path).data.publicUrl;
}

/** Borra una imagen subida desde el panel. Las de `/img/…` (web) no se tocan. */
export async function deleteBlogImage(url: string | null): Promise<void> {
  const marker = `/storage/v1/object/public/${blogConfig.bucket}/`;
  const i = url?.indexOf(marker) ?? -1;
  if (!url || i < 0) return;
  await supabase().storage.from(blogConfig.bucket).remove([decodeURIComponent(url.slice(i + marker.length))]);
}
