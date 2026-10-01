# ===========================================================
# servidor.ps1 - un servidor local para ver el sitio
# ===========================================================
# Por que hace falta: el sitio carga los videos, podcasts y documentos
# con fetch(), y el navegador lo bloquea si se abre index.html con
# doble clic (file://). Este script entrega la carpeta docs/ por
# http://localhost, que es como la va a ver el mundo cuando se publique.
#
# No instala nada y no necesita permisos de administrador: usa solo
# PowerShell, que ya viene con Windows. Lo arranca "Iniciar sitio.bat".
#
# Solo responde en ESTE computador (localhost): nadie mas en la red
# puede entrar. Para cerrarlo: Ctrl+C o cerrar la ventana.
# ===========================================================

param(
  [string]$Carpeta = (Join-Path $PSScriptRoot "..\docs"),
  [int]$PuertoInicial = 8080
)

$ErrorActionPreference = "Stop"

$raiz = (Resolve-Path $Carpeta).Path
if (-not (Test-Path (Join-Path $raiz "index.html"))) {
  Write-Host "No encuentro index.html en $raiz" -ForegroundColor Red
  exit 1
}

$tipos = @{
  ".html" = "text/html; charset=utf-8";  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"; ".json" = "application/json; charset=utf-8"
  ".png"  = "image/png";  ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"
  ".webp" = "image/webp"; ".svg" = "image/svg+xml"; ".ico" = "image/x-icon"
  ".woff" = "font/woff";  ".woff2" = "font/woff2"; ".ttf" = "font/ttf"
  ".pdf"  = "application/pdf"; ".txt" = "text/plain; charset=utf-8"
  ".mp3"  = "audio/mpeg"; ".mp4" = "video/mp4"
}

# Busca un puerto libre a partir del 8080.
$escucha = $null
foreach ($puerto in $PuertoInicial..($PuertoInicial + 19)) {
  $intento = New-Object System.Net.HttpListener
  $intento.Prefixes.Add("http://localhost:$puerto/")
  try { $intento.Start(); $escucha = $intento; break } catch { $intento.Close() }
}
if (-not $escucha) {
  Write-Host "No encontre un puerto libre entre $PuertoInicial y $($PuertoInicial + 19)." -ForegroundColor Red
  exit 1
}

$direccion = "http://localhost:$puerto/"
Write-Host ""
Write-Host "  Un cafe con la iguana - sitio en marcha" -ForegroundColor Green
Write-Host "  $direccion"
Write-Host ""
Write-Host "  Carpeta: $raiz"
Write-Host "  Para cerrar el sitio: Ctrl+C o cierra esta ventana."
Write-Host ""

Start-Process $direccion

try {
  while ($escucha.IsListening) {
    # Espera por partes para que Ctrl+C funcione.
    $pedido = $escucha.GetContextAsync()
    while (-not $pedido.AsyncWaitHandle.WaitOne(300)) { }
    $contexto = $pedido.Result
    $respuesta = $contexto.Response

    try {
      $ruta = [Uri]::UnescapeDataString($contexto.Request.Url.AbsolutePath)
      if ($ruta.EndsWith("/")) { $ruta += "index.html" }

      $archivo = [System.IO.Path]::GetFullPath((Join-Path $raiz $ruta.TrimStart("/")))
      $dentro = $archivo.StartsWith($raiz, [StringComparison]::OrdinalIgnoreCase)

      if ($dentro -and (Test-Path $archivo -PathType Leaf)) {
        $respuesta.StatusCode = 200
      } else {
        $respuesta.StatusCode = 404
        $archivo = Join-Path $raiz "404.html"
      }

      $extension = [System.IO.Path]::GetExtension($archivo).ToLower()
      $respuesta.ContentType = if ($tipos.ContainsKey($extension)) { $tipos[$extension] } else { "application/octet-stream" }
      $respuesta.Headers.Add("Cache-Control", "no-store")   # siempre lo ultimo que guardaste

      $bytes = [System.IO.File]::ReadAllBytes($archivo)
      $respuesta.ContentLength64 = $bytes.Length
      $respuesta.OutputStream.Write($bytes, 0, $bytes.Length)
      Write-Host ("  {0}  {1}" -f $respuesta.StatusCode, $ruta)
    }
    catch {
      # El navegador cancelo la descarga (pasa al recargar rapido): no es un error.
    }
    finally {
      $respuesta.Close()
    }
  }
}
finally {
  $escucha.Stop()
  $escucha.Close()
}
