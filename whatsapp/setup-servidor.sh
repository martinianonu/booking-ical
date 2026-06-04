#!/bin/bash
# setup-servidor.sh — Configura Sofia en un VPS Ubuntu 22/24

set -e
echo ""
echo "=================================================="
echo "   Instalando Sofía — GAMA Departamentos"
echo "=================================================="
echo ""

# Node.js 20
echo "→ Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Google Chrome
echo "→ Instalando Chrome..."
wget -q -O /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt-get install -y /tmp/chrome.deb || sudo apt-get install -f -y
rm /tmp/chrome.deb

# Dependencias del sistema para Puppeteer
sudo apt-get install -y \
  libgbm-dev libxss1 libasound2 libatk-bridge2.0-0 \
  libgtk-3-0 libx11-xcb1 --no-install-recommends

# PM2 (proceso en background)
echo "→ Instalando PM2..."
sudo npm install -g pm2

# Clonar repo
echo "→ Descargando Sofía..."
if [ -d "booking-ical" ]; then
  cd booking-ical
  git pull origin claude/whatsapp-agentkit-setup-61F1Y-clean
  cd ..
else
  git clone https://github.com/martinianonu/booking-ical.git
  cd booking-ical
  git checkout claude/whatsapp-agentkit-setup-61F1Y-clean
  cd ..
fi

# Instalar dependencias npm
echo "→ Instalando dependencias..."
cd booking-ical/whatsapp
npm install
cd ../..

echo ""
echo "=================================================="
echo "   ✅ Instalación completa"
echo ""
echo "   Paso siguiente: configurar las claves API"
echo "   Ejecutá: nano booking-ical/.env"
echo ""
echo "   Escribí esto dentro del archivo:"
echo "   ANTHROPIC_API_KEY=tu-clave-aqui"
echo "   OPENAI_API_KEY=tu-clave-aqui"
echo ""
echo "   Guardá con Ctrl+O, Enter, Ctrl+X"
echo "=================================================="
echo ""
