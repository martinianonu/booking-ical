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

function guardarMensaje(telefono, role, content) {
  db.prepare('INSERT INTO mensajes (telefono, role, content) VALUES (?, ?, ?)').run(telefono, role, content);
}

function obtenerHistorial(telefono, limite = 20) {
  return db.prepare(`
    SELECT role, content FROM mensajes
    WHERE telefono = ? ORDER BY timestamp DESC LIMIT ?
  `).all(telefono, limite).reverse();
}

// ── Sistema de pausa ───────────────────────────────────────
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

function procesarComando(msg) {
  const texto = msg.body?.trim().toLowerCase();
  const chatId = msg.to;
  if (texto === '!pausa')       { setPausa(chatId, 1);  console.log(`⏸  Pausada para ${chatId}`);  return true; }
  if (texto === '!activar')     { setPausa(chatId, 0);  console.log(`▶️  Activa para ${chatId}`);   return true; }
  if (texto === '!pausatodo')   { setPausaGlobal(1);    console.log('⏸  Pausada para TODOS');       return true; }
  if (texto === '!activartodo') { setPausaGlobal(0);    console.log('▶️  Activa para TODOS');        return true; }
  return false;
}

// ── Leer knowledge base ────────────────────────────────────
function cargarKnowledge() {
  try {
    return fs.readFileSync(path.join(__dirname, '..', 'knowledge', 'gama-info.md'), 'utf-8');
  } catch { return ''; }
}

// ── System prompt ──────────────────────────────────────────
function buildSystemPrompt() {
  const knowledge = cargarKnowledge();
  return `Eres Sofía, agente comercial exclusiva de GAMA Departamentos, Gualeguay. Respondés por WhatsApp.

## ESTILO DE COMUNICACIÓN
- Mensajes CORTOS (máximo 4 líneas). WhatsApp no es un email.
- Tono: profesional, cálido, exclusivo — como una persona real
- Máximo 1-2 emojis por mensaje
- UNA sola pregunta por mensaje
- Cuando tenés todos los datos, cerrás la reserva directo sin dar más vueltas

## REGLAS DE ORO
1. Las unidades se alquilan SIEMPRE completas — nunca cotices "por persona"
2. Verificá disponibilidad antes de confirmar (mencioná que lo verificás)
3. Destacá siempre: seguridad, cochera privada (A y B), propiedades en estado impecable
4. Para reservar más de una noche: seña del 20% por transferencia al alias **gamaal.mp**
5. El comprobante se envía al: **+54 9 3444 53-2516**
6. Cuando tengas TODOS los datos de reserva confirmados (nombre, fechas, unidad, huéspedes, seña abonada), incluí al FINAL de tu respuesta exactamente este bloque (no lo muestres al cliente, es solo para el sistema):
   [[RESERVA_CONFIRMADA: propiedad=X | fechas=X | huespedes=X | nombre=X | estado_pago=seña abonada]]

## DATOS REQUERIDOS PARA CERRAR RESERVA
- Nombre y apellido
- Teléfono de contacto
- Departamento elegido
- Fechas de entrada y salida
- Número de huéspedes

## ALQUILER FIJO
Si consultan por alquiler fijo mensual: pediles nombre, apellido, cantidad de personas y fecha aproximada de ingreso. Decí: "Anotamos tu consulta y te brindamos la info disponible a la brevedad."

## HORARIO
Lunes a Domingo 6:00 AM a 10:00 PM.
Fuera de horario: "Gracias por escribirnos 🏠 Nuestro horario es L-D 6am-10pm. Te respondemos a la brevedad."

## INFORMACIÓN DEL NEGOCIO
${knowledge}`;
}

// ── Notificación al administrador ──────────────────────────
const ADMIN_NUMBER = '5493444532537@c.us'; // +54 9 3444 53-2537

async function notificarAdmin(datosReserva, telefonoCliente) {
  try {
    const msg = `🏠 *NUEVA RESERVA CONFIRMADA — GAMA*\n\n${datosReserva}\n\n📱 Cliente: ${telefonoCliente}`;
    await client.sendMessage(ADMIN_NUMBER, msg);
    console.log('📨 Notificación enviada al admin');
  } catch (err) {
    console.error('Error notificando admin:', err.message);
  }
}

function extraerNotificacion(respuesta) {
  const match = respuesta.match(/\[\[RESERVA_CONFIRMADA:(.*?)\]\]/s);
  if (match) {
    return {
      datos: match[1].trim(),
      textoLimpio: respuesta.replace(/\[\[RESERVA_CONFIRMADA:.*?\]\]/s, '').trim()
    };
  }
  return null;
}

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
      max_tokens: 600,
      system: buildSystemPrompt(),
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
    (process.env.LOCALAPPDATA || '') + '\\Google\\Chrome\\Application\\chrome.exe',
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
if (chromeExecutable) console.log('Usando Chrome:', chromeExecutable);

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

client.on('authenticated', () => console.log('\n✅ WhatsApp autenticado'));

client.on('ready', () => {
  console.log('\n================================================');
  console.log('   ✅ Sofía está en línea — GAMA Departamentos');
  console.log('   Comandos: !pausa | !activar | !pausatodo | !activartodo');
  console.log('================================================\n');
});

client.on('message', async (msg) => {
  if (msg.isGroupMsg || msg.from === 'status@broadcast') return;

  if (msg.fromMe) {
    procesarComando(msg);
    return;
  }

  const telefono = msg.from;
  const texto = msg.body?.trim();
  if (!texto) return;

  if (estaPausado(telefono)) {
    console.log(`⏸  Ignorado (pausado): ${telefono}`);
    return;
  }

  console.log(`📩 ${telefono}: ${texto}`);

  try {
    const respuestaRaw = await generarRespuesta(telefono, texto);

    // Detectar si hay una reserva confirmada para notificar al admin
    const notif = extraerNotificacion(respuestaRaw);
    const respuesta = notif ? notif.textoLimpio : respuestaRaw;

    guardarMensaje(telefono, 'user', texto);
    guardarMensaje(telefono, 'assistant', respuesta);

    await msg.reply(respuesta);
    console.log(`💬 Sofía: ${respuesta.substring(0, 80)}...`);

    if (notif) {
      await notificarAdmin(notif.datos, telefono);
    }
  } catch (err) {
    console.error('Error procesando mensaje:', err.message);
  }
});

client.on('disconnected', (reason) => {
  console.log('⚠️  WhatsApp desconectado:', reason);
  process.exit(1);
});

client.initialize();
