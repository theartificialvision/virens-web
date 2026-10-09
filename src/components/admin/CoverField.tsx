'use client';

import { useRef, useState } from 'react';
import { adminText } from '@/content/blog';
import { uploadBlogImage } from '@/lib/blog/upload';

const t = adminText.editor;

/** Imagen principal: subir desde el ordenador, ver la vista previa, cambiar o quitar. */
export function CoverField({ value, onChange }: { value: string | null; onChange: (url: string | null) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function pick(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      onChange(await uploadBlogImage(file, 'portadas'));
    } catch {
      setError(t.errors.cover);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="admin-label">{t.cover}</p>
      <div className="mt-2 grid gap-4 sm:grid-cols-[minmax(0,22rem)_1fr] sm:items-end">
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="admin-cover"
          aria-label={value ? t.coverChange : t.coverPick}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- vista previa de una subida recién hecha */}
          {value ? <img src={value} alt="" className="size-full object-cover" /> : <span>{busy ? t.coverUploading : `+ ${t.coverPick}`}</span>}
        </button>
        <div className="text-[length:var(--text-micro)] text-gray-500">
          {busy && <p className="font-semibold text-blue">{t.coverUploading}</p>}
          {value && !busy && (
            <p className="flex gap-4 text-[length:var(--text-small)]">
              <button type="button" className="underline underline-offset-4" onClick={() => input.current?.click()}>{t.coverChange}</button>
              <button type="button" className="underline underline-offset-4" onClick={() => onChange(null)}>{t.coverRemove}</button>
            </p>
          )}
          <p className="mt-2">{t.coverHint}</p>
          {error && <p role="alert" className="mt-2 font-semibold text-tech">{error}</p>}
        </div>
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => { void pick(e.target.files?.[0]); e.target.value = ''; }} />
    </div>
  );
}
