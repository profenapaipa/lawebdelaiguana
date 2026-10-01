@echo off
rem ============================================================
rem  Iniciar sitio.bat - abre "Un cafe con la iguana" en el navegador
rem ============================================================
rem  Doble clic y listo. No hay que abrir index.html ni instalar nada:
rem  este archivo enciende un servidor local (herramientas\servidor.ps1)
rem  y abre la pagina. Desde ahi el sitio carga completo: videos,
rem  podcasts, documentos y todas las secciones.
rem
rem  Para cerrarlo: Ctrl+C o cerrar la ventana negra.
rem ============================================================

title Un cafe con la iguana - sitio local
cd /d "%~dp0"

if not exist "docs\index.html" (
  echo.
  echo  No encuentro docs\index.html.
  echo  Este archivo debe estar en la carpeta principal del proyecto,
  echo  junto a las carpetas "docs" y "herramientas".
  echo.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0herramientas\servidor.ps1"

if errorlevel 1 (
  echo.
  echo  El sitio no pudo arrancar. Lee el mensaje de arriba.
  pause
)
