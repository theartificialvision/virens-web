/**
 * Pop-up de entrada CPHI Milán (29/09/2026). Texto e imágenes del diseño que
 * envió el cliente («Pop-ups_CPHI_evento.zip»), en inglés en los dos idiomas
 * como en la pieza original. Se muestra desde que se publica hasta el cierre
 * de la feria; a partir de `end` no se monta.
 */
export const cphiPopup = {
  source: 'literal',
  start: '2026-10-06T09:30:00+02:00',
  end: '2026-10-08T17:00:00+02:00',
  dialogLabel: 'Virens Labs at CPHI Milan, 6–8 October 2026',
  close: 'Close',
  kicker: ['We are', 'exhibiting at'],
  wordmark: { src: '/img/cphi/cphi-wordmark.png', alt: 'CPHI Milan', width: 1080, height: 750 },
  logo: { src: '/img/cphi/virens-logo.png', alt: 'Virens Labs — Experts in food supplements', width: 920, height: 380 },
  stand: 'STAND 8J28',
  joinTitle: 'Join us in Milan!',
  join: ['Visit stand ', '8J28', ' to discover what’s next in Pharma'],
  dates: { from: '6', to: '8 October 2026' },
  meet: 'Meet our Business development team!',
  startsIn: 'Starts in',
  units: { d: 'd', h: 'h', m: 'm', s: 's' },
  live: 'Live now · Hall 8',
  cta: 'Book a meeting',
  /** Pase de Apple Wallet (29/09/2026). Rutas en `public/`; los genera
   *  `wallet/build-pass.sh`. El badge es el oficial de Apple, sin tocar. */
  wallet: {
    pass: '/wallet/virens-cphi-milan-2026.pkpass',
    badge: '/img/wallet/add-to-apple-wallet.svg',
    badgeAlt: 'Add to Apple Wallet',
    qr: '/wallet/cphi-pass-qr.svg',
    qrAlt: 'QR code to add the Virens Labs CPHI pass to Apple Wallet',
    desktopLabel: 'Add to Apple Wallet',
    scanTitle: 'Scan with your iPhone',
    scanHint: 'The pass opens in Wallet',
  },
  /** Cápsula que queda abajo a la izquierda al cerrar el pop-up. */
  dock: { name: 'CPHI Milan', date: '6–8 Oct 2026', live: 'Live now', aria: 'CPHI Milan, 6–8 October 2026 — open event details' },
} as const;
