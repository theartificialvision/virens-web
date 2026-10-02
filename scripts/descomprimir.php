<?php
/**
 * Descomprime virens-web-actualizacion.zip (o virens-web-estatica.zip) en esta
 * misma carpeta (web/), sobrescribiendo, y después borra el zip y este script.
 * Uso: https://lvirens.com/descomprimir.php?clave=__CLAVE__
 */
header('Content-Type: text/plain; charset=utf-8');
if (($_GET['clave'] ?? '') !== '__CLAVE__') { http_response_code(403); exit("Clave incorrecta.\n"); }

$dir = __DIR__;
$zipFile = null;
foreach (['virens-web-actualizacion.zip', 'virens-web-estatica.zip'] as $name) {
  if (is_file("$dir/$name")) { $zipFile = "$dir/$name"; break; }
}
if (!$zipFile) exit("No encuentro el zip de la web en esta carpeta.\n");

$zip = new ZipArchive();
if ($zip->open($zipFile) !== true) exit("No se puede abrir el zip (¿subida incompleta?).\n");
$n = $zip->numFiles;
if (!$zip->extractTo($dir)) { $zip->close(); exit("Error al descomprimir.\n"); }
$zip->close();

$ok = is_file("$dir/index.html") && is_file("$dir/.htaccess") && is_dir("$dir/_next");
unlink($zipFile);
unlink(__FILE__);
echo $ok
  ? "LISTO: {$n} elementos descomprimidos de " . basename($zipFile) . ". Zip y este script borrados.\nAbre https://lvirens.com\n"
  : "Descomprimido ({$n} elementos), pero falta index.html, .htaccess o _next. Avisa.\n";
