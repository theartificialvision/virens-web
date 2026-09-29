# Pase de Apple Wallet — Virens Labs en CPHI Milán 2026

Pase tipo «entrada de evento» (`eventTicket`), el mismo para todos: logo,
evento, stand 8J28, fechas, pabellón y un QR a `lvirens.com/contacto` (con UTM
para medirlo). Por detrás: reservar reunión, email, teléfono, dirección y web.
En español o inglés según el idioma del iPhone (`es.lproj` / `en.lproj`).
Aparece solo en la pantalla de bloqueo el día 6 y al acercarse a Fiera Milano.

`preview.png` es una vista aproximada; Wallet lo pinta con su propia tipografía.

## Qué falta para publicarlo

Apple solo abre pases firmados. Hace falta una cuenta **Apple Developer**
(99 €/año, de Virens o del estudio):

1. developer.apple.com → Identifiers → **Pass Type IDs** → crear
   `pass.com.lvirens.events` (o el que se elija).
2. Crear su certificado, descargarlo y exportarlo desde Llavero como `.p12`.
3. Descargar el intermedio **Apple WWDR G4** y pasarlo a PEM.
4. Firmar:

   ```sh
   PASS_P12=virens-pass.p12 PASS_P12_PASSWORD=… WWDR_PEM=AppleWWDRCAG4.pem \
   PASS_TYPE_ID=pass.com.lvirens.events TEAM_ID=ABCDE12345 \
   ./wallet/build-pass.sh
   ```

   Deja `public/wallet/virens-cphi-milan-2026.pkpass`; `netlify.toml` ya le
   pone el tipo MIME correcto.
5. Añadir en el pop-up de CPHI el botón oficial «Añadir a Apple Wallet»
   (artwork de Apple, sin modificar) apuntando a ese archivo.

`DRY_RUN=1 ./wallet/build-pass.sh` comprueba el paquete sin firmar.

Android: Google Wallet necesita su propia cuenta de emisor (gratuita) y otro
formato; no está hecho.

## Datos a confirmar

- Pabellón 8: sale del pop-up («Live now · Hall 8»).
- Coordenadas de Fiera Milano Rho (45.5209, 9.0870): aproximadas, para el aviso
  por cercanía.
- `teamIdentifier` y `passTypeIdentifier` de `pass.json` son de relleno: el
  script los sustituye al firmar.
