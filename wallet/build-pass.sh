#!/usr/bin/env bash
# Firma el pase de Apple Wallet de CPHI Milán y lo deja en public/wallet/.
#
# Necesita un certificado «Pass Type ID» de una cuenta Apple Developer
# (developer.apple.com → Certificates, Identifiers & Profiles → Pass Type IDs)
# exportado como .p12, y el certificado intermedio WWDR G4 de Apple en PEM.
#
#   PASS_P12=virens-pass.p12 PASS_P12_PASSWORD=… WWDR_PEM=AppleWWDRCAG4.pem \
#   PASS_TYPE_ID=pass.com.lvirens.events TEAM_ID=ABCDE12345 \
#   ./wallet/build-pass.sh
#
# Sin variables (o con DRY_RUN=1) solo comprueba el paquete y genera el
# manifest, sin firmar.
set -euo pipefail
cd "$(dirname "$0")"
SRC="cphi-milan-2026.pass"
OUT="../public/wallet/virens-cphi-milan-2026.pkpass"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
cp -R "$SRC/." "$WORK/"

python3 - "$WORK" <<'PY'
import hashlib, json, os, sys
work = sys.argv[1]
p = json.load(open(os.path.join(work, "pass.json"), encoding="utf-8"))
if os.environ.get("PASS_TYPE_ID"): p["passTypeIdentifier"] = os.environ["PASS_TYPE_ID"]
if os.environ.get("TEAM_ID"): p["teamIdentifier"] = os.environ["TEAM_ID"]
json.dump(p, open(os.path.join(work, "pass.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
manifest = {}
for root, _, files in os.walk(work):
    for f in files:
        path = os.path.join(root, f)
        rel = os.path.relpath(path, work)
        if rel in ("manifest.json", "signature") or f.startswith("."): continue
        manifest[rel] = hashlib.sha1(open(path, "rb").read()).hexdigest()
json.dump(manifest, open(os.path.join(work, "manifest.json"), "w"), indent=2, sort_keys=True)
print(f"manifest: {len(manifest)} archivos")
PY

if [[ "${DRY_RUN:-}" == "1" || -z "${PASS_P12:-}" ]]; then
  echo "DRY_RUN: paquete correcto; falta el certificado para firmar."
  exit 0
fi

openssl pkcs12 -in "$PASS_P12" -clcerts -nokeys -out "$WORK/.cert.pem" -passin env:PASS_P12_PASSWORD -legacy 2>/dev/null \
  || openssl pkcs12 -in "$PASS_P12" -clcerts -nokeys -out "$WORK/.cert.pem" -passin env:PASS_P12_PASSWORD
openssl pkcs12 -in "$PASS_P12" -nocerts -nodes -out "$WORK/.key.pem" -passin env:PASS_P12_PASSWORD -legacy 2>/dev/null \
  || openssl pkcs12 -in "$PASS_P12" -nocerts -nodes -out "$WORK/.key.pem" -passin env:PASS_P12_PASSWORD
openssl smime -binary -sign -certfile "$WWDR_PEM" -signer "$WORK/.cert.pem" -inkey "$WORK/.key.pem" \
  -in "$WORK/manifest.json" -out "$WORK/signature" -outform DER
rm -f "$WORK/.cert.pem" "$WORK/.key.pem"
mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"
(cd "$WORK" && zip -q -r -X - . -x '.*') > "$OUT"
echo "Listo: $OUT"
