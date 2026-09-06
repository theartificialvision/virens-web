'use client';

import { useRef, useState } from 'react';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { contactForm } from '@/content/contacto';

/**
 * Zona de adjunto del formulario de contacto. Vive aparte de `ContactForm`
 * porque es lo único del panel con estado propio —el archivo elegido y su
 * error— y sacarlo deja los dos componentes por debajo del tope de 150 líneas.
 *
 * El `<input type="file">` real se oculta y lo dispara el botón: así el bloque
 * puede tener la composición del mockup (icono, rótulo, pista y límite) sin
 * renunciar a un control nativo, que es lo que entiende el teclado.
 */
export function ContactAttach() {
  const input = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setFileName(null);
      setError(null);
      return;
    }
    // El tope se comprueba aquí porque el rótulo lo promete ("Máx. 10MB"): sin
    // esto el usuario no se enteraría hasta el envío, que además aún no existe.
    if (file.size > contactForm.attach.maxBytes) {
      setFileName(null);
      setError(contactForm.attach.tooLarge);
      event.target.value = '';
      return;
    }
    setFileName(file.name);
    setError(null);
  }

  return (
    <>
      <input ref={input} type="file" name="adjunto" className="sr-only" onChange={handleChange} />
      <button type="button" className="contact-attach mt-4" onClick={() => input.current?.click()}>
        <span className="contact-attach-icon">
          <ContactIcon name="clip" className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-blue">
            {fileName ?? contactForm.attach.label}
          </span>
          <span className="block text-[length:var(--text-small)] text-gray-500">
            {contactForm.attach.hint}
          </span>
        </span>
        <span className="contact-attach-max shrink-0 text-[length:var(--text-note)] text-gray-500">
          {contactForm.attach.max}
        </span>
      </button>
      {/* `role="alert"` para que el aviso se anuncie sin mover el foco. */}
      {error && (
        <p role="alert" className="mt-2 text-[length:var(--text-small)] text-tech">
          {error}
        </p>
      )}
    </>
  );
}
