#!/bin/bash
# iniciar-servidor.sh — Inicia Sofía con PM2 (ejecutar UNA vez después del setup)

set -e
cd "$(dirname "$0")"

echo ""
echo "=================================================="
echo "   Iniciando Sofía con PM2"
echo "=================================================="
echo ""

# Verificar que .env existe
if [ ! -f "../.env" ]; then
  echo "❌ ERROR: No se encontró el archivo .env"
  echo "   Crealo primero: nano ../.env"
  echo "   Contenido necesario:"
  echo "   ANTHROPIC_API_KEY=tu-clave-aqui"
  echo "   OPENAI_API_KEY=tu-clave-aqui"
  exit 1
fi

# Iniciar con PM2
pm2 start sofia.js --name sofia

echo ""
echo "→ Guardando configuración PM2..."
pm2 save

echo ""
echo "→ Configurando inicio automático..."
pm2 startup | tail -1

echo ""
echo "=================================================="
echo "   ✅ Sofía iniciada correctamente"
echo ""
echo "   Escaneá el QR que aparece ahora:"
echo "   pm2 logs sofia --lines 50"
echo ""
echo "   Comandos útiles:"
echo "   pm2 status          → ver si está corriendo"
echo "   pm2 logs sofia      → ver mensajes en tiempo real"
echo "   pm2 restart sofia   → reiniciar"
echo "   pm2 stop sofia      → detener"
echo "=================================================="
echo ""
