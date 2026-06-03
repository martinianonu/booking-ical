// whatsapp/sofia.js — Sofía para GAMA Departamentos via WhatsApp Web
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Anthropic = require('@anthropic-ai/sdk');
const Database = require('better-sqlite3');
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

// ── System prompt ──────────────────────────────────────────
const SYSTEM_PROMPT = `Eres Sofía, la asistente virtual de GAMA Departamentos.

## Tu identidad
- Te llamás Sofía, representás a GAMA Departamentos
- Tono: empático, cálido y profesional

## Propiedades disponibles
**Yrigoyen 487:** Dpto completo 2 hab, Dpto 2 hab (A y B), Duplex 2 hab (A y B)
**Tierra del Fuego 109:** Dpto 1 hab (109 y A), Duplex 1 hab (109 A)
**Gualeguay:** Suite 1 hab, Suite 2 hab + cochera (A y B)

## Tipos de alquiler
- **Temporario por día:** completamente equipado (WiFi, ropa de cama, cocina, baño). Ideal para viajeros.
- **Fijo mensual:** disponibilidad variable, consultá.

## Para reservar necesitás
1. Nombre completo
2. Fechas de entrada y salida
3. Cantidad de personas
4. Zona preferida (opcional)

## Reglas
- Siempre en español, tono cálido y profesional
- Una pregunta a la vez
- Si no sabés el precio exacto: "Déjame verificarlo y te confirmo"
- Nunca inventes precios ni disponibilidad
- Si el cliente está frustrado: primero empatía, luego solución
- Horario de atención: Lunes a Domingo 6:00 AM a 10:00 PM
- Fuera de horario: "Gracias por escribirnos. Nuestro horario es L-D 6am a 10pm. Te respondemos pronto."`;

// ── Generar respuesta con Claude ───────────────────────────
async function generarRespuesta(telefono, mensaje) {
  const historial = obtenerHistorial(telefono);

  const mensajes = [
    ...historial.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: mensaje }
  ];

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: mensajes
    });
    return response.content[0].text;
  } catch (err) {
    console.error('Error Claude API:', err.message);
    return 'Lo siento, tuve un problema técnico. Por favor intentá de nuevo en unos minutos.';
  }
}

// ── WhatsApp Client ────────────────────────────────────────
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, '.wwebjs_auth') }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  }
});

client.on('qr', (qr) => {
  console.clear();
  console.log('\n================================================');
  console.log('   Sofía — GAMA Departamentos');
  console.log('   Escaneá este QR con tu WhatsApp:');
  console.log('================================================\n');
  qrcode.generate(qr, { small: true });
  console.log('\n  En tu celular: WhatsApp → ⋮ → Dispositivos vinculados → Vincular dispositivo\n');
});

client.on('authenticated', () => {
  console.log('\n✅ WhatsApp autenticado correctamente');
});

client.on('ready', () => {
  console.log('\n================================================');
  console.log('   ✅ Sofía está en línea y lista para responder');
  console.log('   Negocio: GAMA Departamentos');
  console.log('   Modelo: claude-sonnet-4-6');
  console.log('================================================\n');
});

client.on('message', async (msg) => {
  // Ignorar mensajes grupales, de estado y propios
  if (msg.isGroupMsg || msg.from === 'status@broadcast' || msg.fromMe) return;

  const telefono = msg.from;
  const texto = msg.body?.trim();
  if (!texto) return;

  console.log(`📩 ${telefono}: ${texto}`);

  try {
    const respuesta = await generarRespuesta(telefono, texto);

    guardarMensaje(telefono, 'user', texto);
    guardarMensaje(telefono, 'assistant', respuesta);

    await msg.reply(respuesta);
    console.log(`💬 Sofía → ${telefono}: ${respuesta.substring(0, 80)}...`);
  } catch (err) {
    console.error('Error procesando mensaje:', err.message);
  }
});

client.on('disconnected', (reason) => {
  console.log('⚠️  WhatsApp desconectado:', reason);
  process.exit(1);
});

client.initialize();
