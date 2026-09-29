'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cphiPopup as c } from '@/content/cphi';
import { pathFor, type Locale } from '@/lib/i18n';
import { CphiMark } from './CphiMark';
import { CphiDock } from './CphiDock';
import { CphiWallet } from './CphiWallet';

const SEEN_KEY = 'virens-cphi-popup';
const OPEN_DELAY = 900;
const CLOSE_MS = 560;
const START = Date.parse(c.start);
const END = Date.parse(c.end);
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Pop-up de entrada de CPHI Milán (29/09/2026, diseño del cliente). Sale una
 * vez por visita (sessionStorage), un poco después de cargar para no tapar la
 * pintura del hero, y deja de montarse al cerrar la feria. Antes de la feria,
 * cuenta atrás; durante, «Live now». Cierra con la X, el fondo o Esc.
 * Desde el 29/09/2026 al cerrarse se encoge hacia abajo a la izquierda y queda
 * como cápsula (`CphiDock`) que lo vuelve a abrir; en las páginas siguientes
 * de la misma visita ya solo aparece la cápsula. El foco vuelve a donde estaba
 * (a la cápsula, si se abrió desde ella).
 */
export function CphiPopup({ locale, wallet = false }: { locale: Locale; wallet?: boolean }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [docked, setDocked] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<Element | null>(null);

  useEffect(() => {
    if (Date.now() > END) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) {
        setDocked(true);
        return;
      }
    } catch { /* sin almacenamiento: se muestra igual */ }
    const t = window.setTimeout(() => {
      returnTo.current = document.activeElement;
      setOpen(true);
      try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* nada */ }
    }, OPEN_DELAY);
    return () => window.clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setClosing(true);
    setDocked(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      if (returnTo.current instanceof HTMLElement) returnTo.current.focus();
    }, CLOSE_MS);
  }, []);

  const reopen = useCallback(() => {
    returnTo.current = document.activeElement;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Foco dentro del diálogo, sin aro visible hasta que se use el teclado.
    closeRef.current?.focus({ focusVisible: false } as FocusOptions);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        // Trampa de foco: solo la X y el botón de reunión.
        const f = Array.from(document.querySelectorAll<HTMLElement>('.cphi [data-focusable]'));
        const first = f[0], last = f[f.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearInterval(tick);
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = overflow;
    };
  }, [open, close]);

  const live = now >= START;
  const dock = docked && now <= END ? (
    <div className="cphi-dock-wrap" data-hidden={(open && !closing) || undefined}>
      <CphiDock live={live} onOpen={reopen} />
    </div>
  ) : null;
  if (!open) return dock;
  const diff = Math.max(0, START - now);
  const countdown = { d: pad(Math.floor(diff / 864e5)), h: pad(Math.floor(diff / 36e5) % 24), m: pad(Math.floor(diff / 6e4) % 60), s: pad(Math.floor(diff / 1e3) % 60) };

  return (
    <>
    {dock}
    <div className="cphi" role="dialog" aria-modal="true" aria-label={c.dialogLabel} data-closing={closing || undefined} onClick={close}>
      <div className="cphi__backdrop" />
      <div className="cphi__card" onClick={(e) => e.stopPropagation()}>
        <div aria-hidden className="cphi__light">
          <span /><span /><span />
        </div>
        <button ref={closeRef} type="button" data-focusable className="cphi__close" aria-label={c.close} onClick={close} />

        <div className="cphi__left">
          <p className="cphi__kicker cphi__in" style={{ '--delay': '.35s' } as React.CSSProperties}>{c.kicker[0]}<br />{c.kicker[1]}</p>
          <div className="cphi__brand cphi__in" style={{ '--delay': '.5s' } as React.CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.wordmark.src} alt={c.wordmark.alt} width={c.wordmark.width} height={c.wordmark.height} className="cphi__wordmark" />
            <CphiMark />
          </div>
        </div>

        <div className="cphi__right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.logo.src} alt={c.logo.alt} width={c.logo.width} height={c.logo.height} className="cphi__logo cphi__in" style={{ '--delay': '.3s' } as React.CSSProperties} />
          <p className="cphi__stand cphi__in" style={{ '--delay': '.7s' } as React.CSSProperties}>{c.stand}<span aria-hidden className="cphi__shine" /></p>
          <p className="cphi__join cphi__in" style={{ '--delay': '.85s' } as React.CSSProperties}>
            <strong>{c.joinTitle}</strong>
            <span>{c.join[0]}<strong>{c.join[1]}</strong>{c.join[2]}</span>
          </p>
        </div>

        <div className="cphi__dates cphi__in" style={{ '--delay': '.45s' } as React.CSSProperties}>
          <p className="cphi__range"><span>{c.dates.from}</span><span aria-hidden className="cphi__dash" /><span>{c.dates.to}</span></p>
          <p className="cphi__meet">{c.meet}</p>
        </div>

        <div className="cphi__actions cphi__in" style={{ '--delay': '1s' } as React.CSSProperties}>
          {now < START ? (
            <div className="cphi__countdown">
              <span className="cphi__countdown-label">{c.startsIn}</span>
              {(['d', 'h', 'm', 's'] as const).map((unit) => (
                <span key={unit} className="cphi__unit"><b>{countdown[unit]}</b>{c.units[unit]}</span>
              ))}
            </div>
          ) : (
            <p className="cphi__live"><span aria-hidden />{c.live}</p>
          )}
          <div className="cphi__buttons">
            {wallet ? <CphiWallet /> : null}
            <a href={pathFor('contact', locale)} data-focusable className="cphi__cta" onClick={() => setOpen(false)}>
              {c.cta}<span aria-hidden>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
