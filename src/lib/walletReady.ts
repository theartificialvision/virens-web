import { existsSync } from 'node:fs';
import path from 'node:path';
import { cphiPopup } from '@/content/cphi';

/**
 * El botón de Wallet del pop-up de CPHI solo aparece cuando existen el pase
 * firmado, el badge oficial de Apple y el QR (`wallet/build-pass.sh` los deja
 * en `public/`). Se comprueba en build: sin ellos el pop-up sigue como estaba
 * y nadie pulsa un botón que acabe en «No se puede añadir el pase».
 */
export function walletReady(): boolean {
  const { pass, badge, qr } = cphiPopup.wallet;
  return [pass, badge, qr].every((p) => existsSync(path.join(process.cwd(), 'public', p)));
}
