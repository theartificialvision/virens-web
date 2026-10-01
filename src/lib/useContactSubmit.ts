'use client';

import { useState, type FormEvent } from 'react';

export type ContactSubmitState = 'idle' | 'invalid' | 'sending' | 'sent' | 'error';

/**
 * Envío del formulario de Contacto (01/10/2026). Manda el `FormData` tal cual
 * —campos, departamento y adjunto— al PHP del hosting (`site.contactForm`).
 * Va por `fetch` y no por `action` para no sacar al usuario de la página ni
 * perder lo escrito si falla. `sent` cuenta envíos correctos: el formulario
 * lo usa como `key` para vaciar el adjunto, que guarda su propio estado.
 */
export function useContactSubmit(endpoint: string) {
  const [state, setState] = useState<ContactSubmitState>('idle');
  const [sent, setSent] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    // El formulario lleva `noValidate` para que los avisos sean los nuestros;
    // aquí se comprueban igual y se marca el primer campo que falla.
    if (!form.checkValidity()) {
      setState('invalid');
      form.reportValidity();
      return;
    }
    setState('sending');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setSent((n) => n + 1);
      setState('sent');
    } catch {
      setState('error');
    }
  }

  return { state, sent, onSubmit };
}
