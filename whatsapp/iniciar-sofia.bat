@echo off
chcp 65001 >nul
title Sofia — Agente WhatsApp GAMA

echo.
echo ==================================================
echo    Sofia — Agente WhatsApp de GAMA Departamentos
echo ==================================================
echo.
echo  Iniciando Sofia...
echo  Cuando aparezca el QR, escanealo con tu celular:
echo  WhatsApp - Menu (tres puntos) - Dispositivos vinculados
echo.
echo  IMPORTANTE: No cierres esta ventana mientras
echo  quieras que Sofia siga respondiendo mensajes.
echo.
echo ==================================================
echo.

node sofia.js

echo.
echo Sofia se detuvo. Presiona cualquier tecla para cerrar.
pause >nul
