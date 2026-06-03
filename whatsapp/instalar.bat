@echo off
chcp 65001 >nul
title Sofia GAMA — Instalacion

echo.
echo ==================================================
echo    Sofia GAMA — Instalacion automatica
echo ==================================================
echo.

:: Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no encontrado.
    echo Descargalo en: https://nodejs.org  (boton LTS)
    echo Instalalo y volvé a ejecutar este archivo.
    pause
    exit /b 1
)
echo OK — Node.js:
node --version

:: Crear .env si no existe
if not exist "..\\.env" (
    echo.
    echo Necesito tu Anthropic API Key para crear el archivo .env
    echo ^(empieza con sk-ant-...^)
    echo.
    set /p APIKEY="Pega tu API Key y presiona Enter: "
    (
        echo ANTHROPIC_API_KEY=%APIKEY%
        echo WHATSAPP_PROVIDER=twilio
    ) > "..\\.env"
    echo OK — Archivo .env creado
) else (
    echo OK — Archivo .env ya existe
)

:: Instalar dependencias
echo.
echo Instalando dependencias ^(puede tardar 2-3 minutos^)...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Fallo la instalacion de dependencias.
    pause
    exit /b 1
)

echo.
echo ==================================================
echo    Instalacion completada exitosamente!
echo ==================================================
echo.
echo Ahora ejecuta: iniciar-sofia.bat
echo.
pause
