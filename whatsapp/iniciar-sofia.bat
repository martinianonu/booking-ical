@echo off
chcp 65001 >nul
title Sofia — Agente WhatsApp GAMA

:inicio
echo.
echo ==================================================
echo    Sofia — Agente WhatsApp de GAMA Departamentos
echo ==================================================
echo.
echo  Comandos desde tu celular (en cualquier chat):
echo    !pausa       → Sofia deja de responder a esa persona
echo    !activar     → Sofia vuelve a responder a esa persona
echo    !pausatodo   → Sofia se calla con todos
echo    !activartodo → Sofia responde a todos
echo    !reiniciar   → Reinicia Sofia automaticamente
echo    !apagar      → Apaga Sofia
echo.
echo  No cierres esta ventana mientras Sofia este activa.
echo ==================================================
echo.

node sofia.js
set EXIT_CODE=%errorlevel%

if %EXIT_CODE%==2 (
    echo.
    echo  Reiniciando Sofia en 3 segundos...
    timeout /t 3 /nobreak >nul
    goto inicio
)

echo.
echo  Sofia se apago correctamente.
echo  Presiona cualquier tecla para cerrar.
pause >nul
