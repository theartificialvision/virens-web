<?php
/**
 * Envío del formulario de Contacto (lvirens.com en Apache/cdmon, 01/10/2026).
 *
 * Recibe el POST de `src/lib/useContactSubmit.ts` (campos, departamento y un
 * adjunto opcional de hasta 10 MB) y lo reenvía por email con `mail()`.
 * Responde JSON: 200 si se ha enviado, 4xx/5xx si no; la web muestra el aviso.
 *
 * ─── CONFIGURACIÓN ───────────────────────────────────────────────────────
 * TO:   email que recibe los mensajes: adg@lvirens.com (cliente, 01/10/2026;
 *       distinto del general csp@lvirens.com del pie y Contacto). Si se
 *       vacía, el formulario responde error e invita a escribir a csp@.
 * FROM: remitente técnico. cdmon solo entrega correo cuyo remitente es un
 *       buzón real del dominio; si se deja vacío se usa el mismo TO. La
 *       respuesta va siempre al email de quien escribe (Reply-To).
 */
const TO = 'adg@lvirens.com';
const FROM = '';
const MAX_BYTES = 10 * 1024 * 1024; // el mismo tope que promete el formulario

const DEPARTMENTS = ['comercial' => 'Comercial', 'compras' => 'Compras', 'rrhh' => 'RRHH'];

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

function reply(int $code, string $error = ''): void
{
    http_response_code($code);
    echo json_encode($error === '' ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

/** Una línea limpia: sin saltos (evita inyectar cabeceras) y con tope. */
function line(string $key, int $max = 200): string
{
    $v = isset($_POST[$key]) && is_string($_POST[$key]) ? $_POST[$key] : '';
    return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', $v)), 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, 'method');
}
// Un POST mayor que post_max_size llega vacío: se distingue de un envío vacío.
if (empty($_POST) && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) {
    reply(413, 'too-large');
}
// Trampa para bots: si el campo oculto viene relleno, se finge éxito.
if (line('web') !== '') {
    reply(200);
}

$name = line('nombre');
$email = line('email');
$phone = line('telefono', 60);
$subject = line('asunto');
$department = DEPARTMENTS[line('departamento', 30)] ?? 'Sin departamento';
$message = isset($_POST['mensaje']) && is_string($_POST['mensaje']) ? mb_substr(trim($_POST['mensaje']), 0, 10000) : '';

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || line('consentimiento') === '') {
    reply(422, 'invalid');
}

$to = TO;
if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
    reply(503, 'not-configured');
}
$from = FROM !== '' ? FROM : $to;

$host = $_SERVER['HTTP_HOST'] ?? 'lvirens.com';
$body = "Nuevo mensaje desde el formulario de contacto de {$host}\n\n"
    . "Departamento: {$department}\n"
    . "Nombre: {$name}\n"
    . "Email: {$email}\n"
    . 'Teléfono: ' . ($phone !== '' ? $phone : '—') . "\n"
    . 'Asunto: ' . ($subject !== '' ? $subject : '—') . "\n"
    . "Aceptación de la política de protección de datos: sí\n"
    . 'Fecha: ' . date('d/m/Y H:i') . "\n\n"
    . "Mensaje:\n{$message}\n";

$mailSubject = '=?UTF-8?B?' . base64_encode("[Web · {$department}] " . ($subject !== '' ? $subject : $name)) . '?=';
$headers = [
    'From: =?UTF-8?B?' . base64_encode('Web Laboratorios Virens') . "?= <{$from}>",
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
];

$file = $_FILES['adjunto'] ?? null;
$hasFile = is_array($file) && ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE;
if ($hasFile) {
    if ($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE || $file['size'] > MAX_BYTES) {
        reply(413, 'too-large');
    }
    if ($file['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) {
        reply(400, 'upload');
    }
    $boundary = 'virens-' . bin2hex(random_bytes(12));
    $fileName = preg_replace('/[^\w.\- ]+/u', '_', basename((string) $file['name'])) ?: 'adjunto';
    $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"";
    $payload = "--{$boundary}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($body)) . "\r\n"
        . "--{$boundary}\r\n"
        . "Content-Type: application/octet-stream; name=\"{$fileName}\"\r\n"
        . "Content-Transfer-Encoding: base64\r\n"
        . "Content-Disposition: attachment; filename=\"{$fileName}\"\r\n\r\n"
        . chunk_split(base64_encode((string) file_get_contents($file['tmp_name']))) . "\r\n"
        . "--{$boundary}--\r\n";
} else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: base64';
    $payload = chunk_split(base64_encode($body));
}

$ok = mail($to, $mailSubject, $payload, implode("\r\n", $headers), '-f' . $from);
reply($ok ? 200 : 500, $ok ? '' : 'mail');
