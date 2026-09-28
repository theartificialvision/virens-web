'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Loosen } from '@/lib/i18n';
import type { v2Laboratory } from '@/content/v2-home';

/** Las capas permanecen montadas para que cambios rápidos reviertan el fundido sin saltos. */
export function LaboratoryCapabilities({ content }: { content: Loosen<typeof v2Laboratory> }) {
  const [selected, setSelected] = useState(0);
  const [ready, setReady] = useState<Set<number>>(() => new Set());
  // Mantener la primera imagen mientras la solicitada termina de cargar.
  const active = ready.has(selected) ? selected : 0;
  return (
    <>
      <figure className="laboratory__figure">
        <div id="laboratory-visual" className="laboratory__image">
          {content.capabilities.map((item, index) => (
            <div key={item.label} className="laboratory__image-layer" data-active={active === index} aria-hidden={active !== index}>
              <Image src={item.image.src} alt={item.image.alt} fill
                sizes="(max-width: 1440px) 100vw, 1440px" className="object-cover"
                onLoad={() => setReady((previous) => new Set(previous).add(index))} />
            </div>
          ))}
        </div>
        <figcaption className="laboratory__caption">{content.caption}</figcaption>
      </figure>
      <ol className="laboratory__capabilities">
        {content.capabilities.map((item, index) => (
          <li key={item.label}>
            <button type="button" className="laboratory__capability" aria-pressed={selected === index}
              aria-controls="laboratory-visual" onPointerEnter={(event) => { if (event.pointerType !== 'touch') setSelected(index); }}
              onFocus={() => setSelected(index)} onClick={() => setSelected(index)}>
              <span className="laboratory__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}
