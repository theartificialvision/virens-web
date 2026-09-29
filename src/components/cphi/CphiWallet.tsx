'use client';

import { useEffect, useState } from 'react';
import { cphiPopup as c } from '@/content/cphi';

type Platform = 'ios' | 'android' | 'desktop';

/**
 * «Añadir a Apple Wallet» en el pop-up de CPHI (29/09/2026).
 * - iPhone / iPad: el badge oficial de Apple, que descarga el pase y abre Wallet.
 * - Escritorio: un botón discreto que despliega un QR; se escanea con la cámara
 *   del iPhone y el pase se abre allí, que es donde vive Wallet.
 * - Android: nada por ahora (Google Wallet necesita su propio pase).
 * La plataforma se decide en el cliente; hasta entonces no se pinta nada.
 */
export function CphiWallet() {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [qr, setQr] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    setPlatform(ios ? 'ios' : /Android/.test(ua) ? 'android' : 'desktop');
  }, []);

  if (platform === 'ios') {
    return (
      <a href={c.wallet.pass} data-focusable className="cphi__wallet-badge">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.wallet.badge} alt={c.wallet.badgeAlt} height={44} />
      </a>
    );
  }
  if (platform !== 'desktop') return null;
  return (
    <div className="cphi__wallet">
      <button type="button" data-focusable className="cphi__wallet-toggle" aria-expanded={qr} aria-controls="cphi-wallet-qr" onClick={() => setQr((v) => !v)}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <rect x="2.5" y="4.5" width="15" height="11" rx="2.5" />
          <path d="M2.5 8.5h15M12.5 12h2.5" strokeLinecap="round" />
        </svg>
        {c.wallet.desktopLabel}
      </button>
      <div id="cphi-wallet-qr" className="cphi__wallet-qr" data-open={qr || undefined} role="group" aria-label={c.wallet.scanTitle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.wallet.qr} alt={c.wallet.qrAlt} width={132} height={132} />
        <p><strong>{c.wallet.scanTitle}</strong><span>{c.wallet.scanHint}</span></p>
      </div>
    </div>
  );
}
