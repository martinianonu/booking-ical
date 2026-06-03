// whatsapp/sofia.js — Sofía para GAMA Departamentos via WhatsApp Web
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Anthropic = require('@anthropic-ai/sdk');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// ── Claude AI ──────────────────────────────────────────────
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Base de datos SQLite ───────────────────────────────────
const db = new Database(path.join(__dirname, '..', 'sofia.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS mensajes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telefono TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_telefono ON mensajes(telefono);
`);

function guardarMensaje(telefono, role, content) {
  db.prepare('INSERT INTO mensajes (telefono, role, content) VALUES (?, ?, ?)').run(telefono, role, content);
}

function obtenerHistorial(telefono, limite = 20) {
  return db.prepare(`
    SELECT role, content FROM mensajes
    WHERE telefono = ?
    ORDER BY timestamp DESC LIMIT ?
  `).all(telefono, limite).reverse();
}

// ── Sistema de pausa (control manual) ─────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS pausas (
    telefono TEXT PRIMARY KEY,
    pausado INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS pausa_global (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    pausado INTEGER DEFAULT 0
  );
  INSERT OR IGNORE INTO pausa_global (id, pausado) VALUES (1, 0);
`);

function estaPausado(telefono) {
  const global = db.prepare('SELECT pausado FROM pausa_global WHERE id = 1').get();
  if (global?.pausado) return true;
  const row = db.prepare('SELECT pausado FROM pausas WHERE telefono = ?').get(telefono);
  return row?.pausado === 1;
}

function setPausa(telefono, valor) {
  db.prepare('INSERT INTO pausas (telefono, pausado) VALUES (?, ?) ON CONFLICT(telefono) DO UPDATE SET pausado = ?')
    .run(telefono, valor, valor);
}

function setPausaGlobal(valor) {
  db.prepare('UPDATE pausa_global SET pausado = ? WHERE id = 1').run(valor);
}

// Procesa comandos del dueño (mensajes propios que empiezan con !)
function procesarComando(msg) {
  const texto = msg.body?.trim().toLowerCase();
  const chatId = msg.to; // número del cliente en la conversación

  if (texto === '!pausa') {
    setPausa(chatId, 1);
    console.log(`⏸  Sofía pausada para ${chatId}`);
    return true;
  }
  if (texto === '!activar') {
    setPausa(chatId, 0);
    console.log(`▶️  Sofía activada para ${chatId}`);
    return true;
  }
  if (texto === '!pausatodo') {
    setPausaGlobal(1);
    console.log('⏸  Sofía pausada para TODOS');
    return true;
  }
  if (texto === '!activartodo') {
    setPausaGlobal(0);
    console.log('▶️  Sofía activada para TODOS');
    return true;
  }
  if (texto === '!estado') {
    const global = db.prepare('SELECT pausado FROM pausa_global WHERE id = 1').get();
    console.log(`📊 Estado — Global: ${global?.pausado ? 'PAUSADA' : 'ACTIVA'}`);
    return true;
  }
  return false;
}

// ── Leer knowledge base ────────────────────────────────────
function cargarKnowledge() {
  const ruta = path.join(__dirname, '..', 'knowledge', 'gama-info.md');
  try {
    return fs.readFileSync(ruta, 'utf-8');
  } catch {
    return '';
  }
}

// ── System prompt ──────────────────────────────────────────
function buildSystemPrompt() {
  const knowledge = cargarKnowledge();
  return `Eres Sofía, la asistente virtual de GAMA Departamentos. Respondés por WhatsApp.

## Estilo de comunicación
- Cálida, amable y profesional — como una persona real, no un bot
- Mensajes CORTOS y directos. WhatsApp no es un email.
- Máximo 3-4 líneas por mensaje, salvo que el cliente pida más info
- Usá emojis con moderación (1-2 por mensaje máximo)
- NO hagas más de UNA pregunta por mensaje
- Cuando tengas toda la info necesaria, confirmá y cerrá la reserva — no des vueltas
- Si el cliente saluda, respondé el saludo Y ofrecé ayuda en el mismo mensaje
- Si pregunta por disponibilidad sin dar fechas, pedí fechas Y cantidad de personas en UN solo mensaje
- Si ya tenés fechas y personas, ofrecé opciones concretas de unidades — no preguntes más

## Propiedades GAMA
**Yrigoyen 487:** Dpto completo 2 hab | Dpto 2 hab A y B | Duplex 2 hab A y B
**Tierra del Fuego 109:** Dpto 1 hab | Dpto 1 hab A | Duplex 1 hab A
**Gualeguay:** Suite 1 hab | Suite 2 hab + cochera A y B

## Tipos de alquiler
- **Temporario (por noche):** totalmente equipado — WiFi, ropa de cama, cocina completa, baño privado
- **Fijo mensual:** disponibilidad variable

## Para confirmar una reserva necesitás
- Nombre completo, fechas entrada/salida, cantidad de personas

## Horario
Lunes a Domingo 6:00 AM a 10:00 PM.
Fuera de horario: "Gracias por escribir a GAMA 🏠 Nuestro horario es L-D 6am-10pm. Te respondemos a la brevedad!"

## Información del negocio
${knowledge || '*(Completar el archivo knowledge/gama-info.md con precios y datos reales)*'}

## Reglas importantes
- Si no sabés el precio exacto: "Te confirmo el precio en un momento"
- Nunca inventes datos que no están en la información del negocio
- Si el cliente tiene un problema: primero empatía, luego solución`;
}

// ── Generar respuesta con Claude ───────────────────────────
async function generarRespuesta(telefono, mensaje) {
  const historial = obtenerHistorial(telefono);
  const systemPrompt = buildSystemPrompt();

  const mensajes = [
    ...historial.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: mensaje }
  ];

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: systemPrompt,
      messages: mensajes
    });
    return response.content[0].text;
  } catch (err) {
    console.error('Error Claude API:', err.message);
    return 'Lo siento, tuve un problema técnico. Por favor intentá de nuevo en unos minutos.';
  }
}

// ── WhatsApp Client ────────────────────────────────────────
function buscarChrome() {
  const rutas = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
  ];
  for (const ruta of rutas) {
    try { if (fs.existsSync(ruta)) return ruta; } catch {}
  }
  return null;
}

const chromeExecutable = buscarChrome();
if (chromeExecutable) {
  console.log('Usando Chrome:', chromeExecutable);
} else {
  console.log('Chrome del sistema no encontrado, usando puppeteer bundled');
}

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, '.wwebjs_auth') }),
  puppeteer: {
    headless: true,
    executablePath: chromeExecutable || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  }
});

client.on('qr', (qr) => {
  console.clear();
  console.log('\n================================================');
  console.log('   Sofía — GAMA Departamentos');
  console.log('   Escaneá este QR con tu celular:');
  console.log('================================================\n');
  qrcode.generate(qr, { small: true });
  console.log('\n  WhatsApp → ⋮ → Dispositivos vinculados → Vincular dispositivo\n');
});

client.on('authenticated', () => {
  console.log('\n✅ WhatsApp autenticado correctamente');
});

client.on('ready', () => {
  console.log('\n================================================');
  console.log('   ✅ Sofía está en línea — GAMA Departamentos');
  console.log('================================================\n');
});

client.on('message', async (msg) => {
  if (msg.isGroupMsg || msg.from === 'status@broadcast') return;

  // Mensajes propios: solo procesar comandos !
  if (msg.fromMe) {
    procesarComando(msg);
    return;
  }

  const telefono = msg.from;
  const texto = msg.body?.trim();
  if (!texto) return;

  // Si está pausada para este contacto, no responder
  if (estaPausado(telefono)) {
    console.log(`⏸  Mensaje de ${telefono} ignorado (pausado)`);
    return;
  }

  console.log(`📩 ${telefono}: ${texto}`);

  try {
    const respuesta = await generarRespuesta(telefono, texto);
    guardarMensaje(telefono, 'user', texto);
    guardarMensaje(telefono, 'assistant', respuesta);
    await msg.reply(respuesta);
    console.log(`💬 Sofía: ${respuesta.substring(0, 80)}...`);
  } catch (err) {
    console.error('Error procesando mensaje:', err.message);
  }
});

client.on('disconnected', (reason) => {
  console.log('⚠️  WhatsApp desconectado:', reason);
  process.exit(1);
});

client.initialize();
