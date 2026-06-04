// whatsapp/sofia.js — Sofía para GAMA Departamentos via WhatsApp Web
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Anthropic = require('@anthropic-ai/sdk');
const Database = require('better-sqlite3');
const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// ── Calendarios Booking.com + Airbnb ──────────────────────
const CALENDARIOS = {
  'Depto A': [
    'https://ical.booking.com/v1/export?t=18fa0402-6e0b-4ea5-af96-8fc518f0b968',
    'https://www.airbnb.com/calendar/ical/1596334572814734710.ics?t=edc70c78d3644c85950d71577c9df4ae&locale=es-419',
  ],
  'Tierra del Fuego': [
    'https://ical.booking.com/v1/export?t=428cf286-d6d0-4a59-a8c4-4558afb6cf86',
    'https://www.airbnb.com/calendar/ical/1334885664072870742.ics?t=08bfaeeb176f4819acf3d1c362762ca1&locale=es-419',
  ],
  'Depto B': [
    'https://ical.booking.com/v1/export?t=75a5d696-07bf-4a38-8f70-28020215ccfd',
    'https://www.airbnb.com/calendar/ical/1298755662560739643.ics?t=c202f3c6dc2544eda77da40dedf469e2&locale=es-419',
  ],
};

// Cache — 1 minuto para reflejar cambios rápido
const cache = { data: null, ts: 0 };
const CACHE_MS = 1 * 60 * 1000;

function fetchUrl(url, redireccionesRestantes = 5) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? require('https') : require('http');
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redireccionesRestantes > 0) {
        return fetchUrl(res.headers.location, redireccionesRestantes - 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parsearEventos(ical) {
  const eventos = [];
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  // Usar hora LOCAL (no UTC) para evitar desfase de zona horaria Argentina (UTC-3)
  const toDate = s => new Date(parseInt(s.slice(0,4)), parseInt(s.slice(4,6))-1, parseInt(s.slice(6,8)));
  const texto = ical.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const bloques = texto.split('BEGIN:VEVENT');
  for (const bloque of bloques.slice(1)) {
    const inicio = bloque.match(/DTSTART[^:]*:(\d{8})/);
    const fin    = bloque.match(/DTEND[^:]*:(\d{8})/);
    if (inicio && fin) {
      const fechaFin = toDate(fin[1]);
      if (fechaFin >= hoy) eventos.push({ inicio: toDate(inicio[1]), fin: fechaFin });
    }
  }
  return eventos;
}

function estaOcupado(eventos, entrada, salida) {
  return eventos.some(e => e.inicio < salida && e.fin > entrada);
}

const cacheRaw = {}; // iCal crudo por propiedad para diagnóstico

async function consultarDisponibilidad() {
  const ahora = Date.now();
  if (cache.data && ahora - cache.ts < CACHE_MS) return cache.data;

  const resultado = {};
  await Promise.all(
    Object.entries(CALENDARIOS).map(async ([nombre, urls]) => {
      const lista = Array.isArray(urls) ? urls : [urls];
      let eventos = [];
      const rawParts = [];
      for (const url of lista) {
        const fuente = url.includes('airbnb') ? 'Airbnb' : 'Booking';
        try {
          const ical = await fetchUrl(url);
          rawParts.push(ical);
          const ev = parsearEventos(ical);
          eventos = eventos.concat(ev);
          console.log(`📅 ${nombre} [${fuente}]: ${ev.length} reservas futuras`);
        } catch (err) {
          console.error(`Error ${nombre} [${fuente}]:`, err.message);
        }
      }
      cacheRaw[nombre] = rawParts.join('\n');
      resultado[nombre] = eventos;
    })
  );

  cache.data = resultado;
  cache.ts = ahora;
  return resultado;
}

// Extrae los primeros N eventos del iCal con DTSTART, DTEND y SUMMARY
function resumenEventos(ical, n = 5) {
  const texto = ical.replace(/\r\n /g, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const bloques = texto.split('BEGIN:VEVENT').slice(1, n + 1);
  if (!bloques.length) return 'Sin eventos';
  return bloques.map((b, i) => {
    const start   = (b.match(/DTSTART[^:]*:([\dT Z]+)/) || [])[1] || '?';
    const end     = (b.match(/DTEND[^:]*:([\dT Z]+)/)   || [])[1] || '?';
    const summary = (b.match(/SUMMARY:(.+)/)              || [])[1] || '?';
    return `${i+1}. START:${start.trim()} END:${end.trim()}\n   ${summary.trim()}`;
  }).join('\n');
}

function proximaFechaLibre(eventos, desde, noches = 2) {
  // Busca el próximo hueco disponible de al menos 'noches' días, hasta 60 días adelante
  const MAX_DIAS = 60;
  let candidato = new Date(desde);
  candidato.setDate(candidato.getDate() + 1); // empieza al día siguiente

  for (let i = 0; i < MAX_DIAS; i++) {
    const fin = new Date(candidato);
    fin.setDate(fin.getDate() + noches);
    if (!estaOcupado(eventos, candidato, fin)) {
      const fmt = d => d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
      return `${fmt(candidato)} al ${fmt(fin)}`;
    }
    candidato.setDate(candidato.getDate() + 1);
  }
  return null;
}

function detectarUnidad(texto) {
  const t = texto.toLowerCase();
  if (t.includes('tierra del fuego') || t.includes('tdf') || t.includes('tierra')) return 'Tierra del Fuego';
  if (t.includes('depto b') || t.includes('dpto b') || t.includes('departamento b') || t.includes('unidad b')) return 'Depto B';
  if (t.includes('depto a') || t.includes('dpto a') || t.includes('departamento a') || t.includes('unidad a')) return 'Depto A';
  return null; // no especificó
}

function disponibilidadTexto(calendarios, entrada, salida, unidadSolicitada) {
  if (!entrada || !salida) return '';
  const noches = Math.round((salida - entrada) / (1000 * 60 * 60 * 24));
  const lineas = ['\n## DISPONIBILIDAD REAL (Booking.com — verificada ahora mismo)'];
  lineas.push(`Fechas consultadas: ${entrada.toLocaleDateString('es-AR')} → ${salida.toLocaleDateString('es-AR')} (${noches} noche${noches !== 1 ? 's' : ''})`);

  for (const [nombre, eventos] of Object.entries(calendarios)) {
    // Si el cliente pidió una unidad específica, solo mostrar esa
    if (unidadSolicitada && nombre !== unidadSolicitada) continue;

    const ocupado = estaOcupado(eventos, entrada, salida);
    if (ocupado) {
      const proxima = proximaFechaLibre(eventos, salida, noches);
      lineas.push(`❌ ${nombre}: OCUPADO para esas fechas.`);
      if (proxima) {
        lineas.push(`   → Próxima disponibilidad para ${nombre}: ${proxima}`);
      } else {
        lineas.push(`   → No hay disponibilidad en los próximos 60 días para ${nombre}.`);
      }
    } else {
      lineas.push(`✅ ${nombre}: DISPONIBLE para esas fechas.`);
    }
  }

  lineas.push('\nIMPORTANTE: Usá esta info para responder. Si está ocupado, ofrecé la fecha alternativa indicada arriba.');
  return lineas.join('\n');
}

// Extrae fechas mencionadas en el mensaje
function extraerFechas(texto) {
  const meses = { enero:1,febrero:2,marzo:3,abril:4,mayo:5,junio:6,julio:7,agosto:8,septiembre:9,octubre:10,noviembre:11,diciembre:12 };
  const hoy = new Date();
  const año = hoy.getFullYear();

  // "del 5 al 7 de junio" / "10 al 15 de julio"
  const m1 = texto.match(/(\d{1,2})\s+al\s+(\d{1,2})\s+de\s+(\w+)/i);
  if (m1) {
    const mes = meses[m1[3].toLowerCase()];
    if (mes) return {
      entrada: new Date(año, mes-1, parseInt(m1[1])),
      salida:  new Date(año, mes-1, parseInt(m1[2]))
    };
  }

  // "5/6 al 7/6" o "05/06 al 07/06"
  const m2 = texto.match(/(\d{1,2})\/(\d{1,2}).*?al.*?(\d{1,2})\/(\d{1,2})/);
  if (m2) return {
    entrada: new Date(año, parseInt(m2[2])-1, parseInt(m2[1])),
    salida:  new Date(año, parseInt(m2[4])-1, parseInt(m2[3]))
  };

  // "del 5 al 7" sin mes → asume mes actual o próximo
  const m3 = texto.match(/\b(\d{1,2})\s+al\s+(\d{1,2})\b/);
  if (m3) {
    const d1 = parseInt(m3[1]), d2 = parseInt(m3[2]);
    let mes = hoy.getMonth(); // mes actual (0-indexed)
    // Si el día ya pasó, asumir mes siguiente
    if (d1 < hoy.getDate()) mes = (mes + 1) % 12;
    return {
      entrada: new Date(año, mes, d1),
      salida:  new Date(año, mes, d2)
    };
  }

  // "el viernes 5" o "lunes 9 al miércoles 11"
  const m4 = texto.match(/(?:lunes|martes|miércoles|miercoles|jueves|viernes|sábado|sabado|domingo)\s+(\d{1,2}).*?(?:lunes|martes|miércoles|miercoles|jueves|viernes|sábado|sabado|domingo)\s+(\d{1,2})/i);
  if (m4) {
    const d1 = parseInt(m4[1]), d2 = parseInt(m4[2]);
    let mes = hoy.getMonth();
    if (d1 < hoy.getDate()) mes = (mes + 1) % 12;
    return {
      entrada: new Date(año, mes, d1),
      salida:  new Date(año, mes, d2)
    };
  }

  // Fecha única "el 4/6", "para el 04/06", "el 4 de junio" → 1 noche
  const m5 = texto.match(/\b(\d{1,2})\/(\d{1,2})\b/);
  if (m5) {
    const entrada = new Date(año, parseInt(m5[2])-1, parseInt(m5[1]));
    const salida  = new Date(año, parseInt(m5[2])-1, parseInt(m5[1]) + 1);
    return { entrada, salida };
  }

  const m6 = texto.match(/\b(\d{1,2})\s+de\s+(\w+)/i);
  if (m6) {
    const mes = meses[m6[2].toLowerCase()];
    if (mes) {
      const entrada = new Date(año, mes-1, parseInt(m6[1]));
      const salida  = new Date(año, mes-1, parseInt(m6[1]) + 1);
      return { entrada, salida };
    }
  }

  return null;
}

// ── Claude AI ──────────────────────────────────────────────
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── OpenAI Whisper (transcripción de audios) ───────────────
let openai = null;
if (process.env.OPENAI_API_KEY) {
  const { OpenAI } = require('openai');
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  console.log('🎤 Transcripción de audios activada (Whisper)');
} else {
  console.log('ℹ️  Sin OPENAI_API_KEY — audios no serán transcriptos');
}

async function transcribirAudio(media) {
  // WhatsApp envía PTT como audio/ogg;codecs=opus — Whisper acepta .ogg
  const ext = media.mimetype.includes('mp4') ? 'mp4'
            : media.mimetype.includes('webm') ? 'webm'
            : media.mimetype.includes('mp3')  ? 'mp3'
            : 'ogg';
  const tmpPath = path.join(os.tmpdir(), `audio_${Date.now()}.${ext}`);
  fs.writeFileSync(tmpPath, Buffer.from(media.data, 'base64'));
  console.log(`🎙 Transcribiendo: ${tmpPath} (${media.mimetype})`);
  try {
    const { toFile } = require('openai');
    const resultado = await openai.audio.transcriptions.create({
      file: await toFile(fs.createReadStream(tmpPath), `audio.${ext}`, { type: media.mimetype.split(';')[0] }),
      model: 'whisper-1',
      language: 'es',
    });
    return resultado.text;
  } finally {
    try { fs.unlinkSync(tmpPath); } catch {}
  }
}

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

// Comandos recibidos desde el celular del dueño (msg entrante, no fromMe)
async function procesarComandoEntrante(texto, msg) {
  const t = texto.trim().toLowerCase();
  const from = msg.from;

  if (t === '!pausatodo')   { setPausaGlobal(1); await msg.reply('⏸ Sofía pausada para TODOS'); return true; }
  if (t === '!activartodo') { setPausaGlobal(0); await msg.reply('▶️ Sofía activa para TODOS');  return true; }

  if (t === '!precios') {
    await msg.reply(formatearPrecios(cargarPrecios()));
    return true;
  }
  if (t.startsWith('!set ')) {
    await msg.reply(procesarSet(t));
    return true;
  }
  if (t === '!reservas') {
    cache.data = null; cache.ts = 0;
    const cals = await consultarDisponibilidad();
    const hoy = new Date();
    const en60 = new Date(); en60.setDate(en60.getDate() + 60);
    const fmt = d => d.toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit' });
    let r = `📅 *RESERVAS PRÓXIMOS 60 DÍAS*\n`;
    for (const [nombre, eventos] of Object.entries(cals)) {
      const proximas = eventos.filter(e => e.fin >= hoy && e.inicio <= en60);
      r += `\n*${nombre}* (${proximas.length}):\n`;
      for (const e of proximas) {
        // DTEND en iCal es exclusivo (día siguiente al último ocupado), restamos 1 para mostrar
        const finDisplay = new Date(e.fin); finDisplay.setDate(finDisplay.getDate() - 1);
        r += `  • ${fmt(e.inicio)} → ${fmt(finDisplay)}\n`;
      }
      if (proximas.length === 0) r += `  sin reservas próximas\n`;
    }
    await msg.reply(r);
    return true;
  }
  if (t.startsWith('!ical')) {
    // !ical a | !ical b | !ical tdf → muestra primer evento crudo del calendario
    await consultarDisponibilidad(); // asegura que cacheRaw esté cargado
    const clave = t.replace('!ical', '').trim();
    const mapa = { a: 'Depto A', b: 'Depto B', tdf: 'Tierra del Fuego', 'tierra del fuego': 'Tierra del Fuego' };
    const nombre = mapa[clave] || 'Depto A';
    const resumen = cacheRaw[nombre] ? resumenEventos(cacheRaw[nombre], 6) : 'Sin datos';
    await msg.reply(`🔍 *${nombre} — próximos eventos:*\n${resumen}`);
    return true;
  }
  if (t === '!reiniciar') {
    await msg.reply('🔄 Reiniciando...');
    setTimeout(() => process.exit(2), 1500);
    return true;
  }
  if (t === '!apagar') {
    await msg.reply('🛑 Apagando Sofía...');
    setTimeout(() => process.exit(0), 1500);
    return true;
  }
  return false;
}

function procesarComando(msg) {
  const texto = msg.body?.trim().toLowerCase();
  const chatId = msg.to;
  if (texto === '!pausa')       { setPausa(chatId, 1);  console.log(`⏸  Pausada para ${chatId}`);  return true; }
  if (texto === '!activar')     { setPausa(chatId, 0);  console.log(`▶️  Activa para ${chatId}`);   return true; }
  if (texto === '!pausatodo')   { setPausaGlobal(1);    console.log('⏸  Pausada para TODOS');       return true; }
  if (texto === '!activartodo') { setPausaGlobal(0);    console.log('▶️  Activa para TODOS');        return true; }
  if (texto === '!precios') {
    const p = cargarPrecios();
    client.sendMessage(msg.from, formatearPrecios(p));
    return true;
  }
  if (texto.startsWith('!set ')) {
    const respuesta = procesarSet(texto);
    client.sendMessage(msg.from, respuesta);
    console.log('💰 Precio actualizado:', texto);
    return true;
  }
  if (texto === '!reservas') {
    cache.data = null; cache.ts = 0; // forzar recarga
    consultarDisponibilidad().then(cals => {
      const hoy = new Date();
      const en60 = new Date(); en60.setDate(en60.getDate() + 60);
      const fmt = d => d.toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit' });
      let respuesta = `📅 *RESERVAS PRÓXIMOS 60 DÍAS*\n`;
      for (const [nombre, eventos] of Object.entries(cals)) {
        const proximas = eventos.filter(e => e.fin >= hoy && e.inicio <= en60);
        respuesta += `\n*${nombre}*: ${proximas.length === 0 ? 'sin reservas' : ''}\n`;
        for (const e of proximas) {
          const finDisplay = new Date(e.fin); finDisplay.setDate(finDisplay.getDate() - 1);
          respuesta += `  • ${fmt(e.inicio)} → ${fmt(finDisplay)}\n`;
        }
      }
      client.sendMessage(msg.from, respuesta);
    }).catch(err => client.sendMessage(msg.from, '❌ Error al cargar calendarios: ' + err.message));
    return true;
  }
  if (texto === '!reiniciar') {
    console.log('🔄 Reiniciando Sofía...');
    setTimeout(() => process.exit(2), 1500);
    return true;
  }
  if (texto === '!apagar') {
    console.log('🛑 Apagando Sofía...');
    setTimeout(() => process.exit(0), 1500);
    return true;
  }
  return false;
}

// ── Precios dinámicos ─────────────────────────────────────
const PRECIOS_PATH = path.join(__dirname, 'precios.json');

function cargarPrecios() {
  try { return JSON.parse(fs.readFileSync(PRECIOS_PATH, 'utf-8')); }
  catch { return {}; }
}

function guardarPrecios(p) {
  fs.writeFileSync(PRECIOS_PATH, JSON.stringify(p, null, 2));
}

function formatearPrecios(p) {
  const f = n => '$' + Number(n).toLocaleString('es-AR');
  return `💰 *PRECIOS ACTUALES — GAMA*

*Tierra del Fuego*
  Lun-Jue: ${f(p.tdf_semana)}
  Vie-Dom: ${f(p.tdf_finde)}
  Alta/Eventos: ${f(p.tdf_alta)}
  Corporativo: ${f(p.tdf_corporativo)}

*Deptos A y B*
  Lun-Jue: ${f(p.ab_semana)}
  Vie-Dom: ${f(p.ab_finde)}
  Alta/Eventos: ${f(p.ab_alta)}
  Corporativo: ${f(p.ab_corporativo)}

*Adicionales*
  Persona extra (3ra+): ${f(p.persona_extra)}/noche
  Limpieza extra: ${f(p.limpieza_extra)}/servicio

*Descuentos*
  7+ noches: ${p.descuento_7_noches}% OFF
  14+ noches: ${p.descuento_14_noches}% OFF

Para cambiar: !set [clave] [valor]
Ej: !set tdf_semana 60000`;
}

const CLAVES_VALIDAS = {
  'tdf semana': 'tdf_semana',
  'tdf finde': 'tdf_finde',
  'tdf alta': 'tdf_alta',
  'tdf corp': 'tdf_corporativo',
  'a semana': 'ab_semana',
  'ab semana': 'ab_semana',
  'a finde': 'ab_finde',
  'ab finde': 'ab_finde',
  'a alta': 'ab_alta',
  'ab alta': 'ab_alta',
  'a corp': 'ab_corporativo',
  'ab corp': 'ab_corporativo',
  'extra': 'persona_extra',
  'limpieza': 'limpieza_extra',
  'descuento7': 'descuento_7_noches',
  'descuento14': 'descuento_14_noches',
};

function procesarSet(texto) {
  // formato: !set tdf semana 60000 o !set extra 12000
  const partes = texto.replace('!set', '').trim().split(/\s+/);
  if (partes.length < 2) return '❌ Formato: !set [clave] [valor]\nEjemplo: !set tdf semana 60000';

  const valor = parseInt(partes[partes.length - 1]);
  if (isNaN(valor)) return '❌ El valor debe ser un número. Ej: !set tdf finde 70000';

  const claveTexto = partes.slice(0, -1).join(' ').toLowerCase();
  const claveJson = CLAVES_VALIDAS[claveTexto];
  if (!claveJson) {
    return `❌ Clave no reconocida: "${claveTexto}"\n\nClaves válidas:\n${Object.keys(CLAVES_VALIDAS).join('\n')}`;
  }

  const precios = cargarPrecios();
  const anterior = precios[claveJson];
  precios[claveJson] = valor;
  guardarPrecios(precios);

  return `✅ *Precio actualizado*\n${claveTexto}: $${anterior?.toLocaleString('es-AR')} → $${valor.toLocaleString('es-AR')}`;
}


function cargarKnowledge() {
  try {
    return fs.readFileSync(path.join(__dirname, '..', 'knowledge', 'gama-info.md'), 'utf-8');
  } catch { return ''; }
}

// ── System prompt ──────────────────────────────────────────
function buildSystemPrompt() {
  const knowledge = cargarKnowledge();
  const p = cargarPrecios();
  const f = n => '$' + Number(n).toLocaleString('es-AR');
  const preciosTexto = `
## TARIFAS VIGENTES (actualización automática)
| Unidad           | Lun-Jue      | Vie-Dom      | Alta/Eventos  |
|------------------|--------------|--------------|---------------|
| Tierra del Fuego | ${f(p.tdf_semana)} | ${f(p.tdf_finde)} | ${f(p.tdf_alta)} |
| Dpto A o B       | ${f(p.ab_semana)} | ${f(p.ab_finde)} | ${f(p.ab_alta)} |

Corporativo: TDF ${f(p.tdf_corporativo)} | A/B ${f(p.ab_corporativo)} (máx 2 personas)
Persona extra (3ra+): ${f(p.persona_extra)}/noche
Limpieza extra (si la pide): ${f(p.limpieza_extra)}/servicio
Descuentos: 7+ noches ${p.descuento_7_noches}% OFF | 14+ noches ${p.descuento_14_noches}% OFF`;
  return `Eres Sofía, agente comercial exclusiva de GAMA Departamentos, Gualeguay. Respondés por WhatsApp.

## ESTILO DE COMUNICACIÓN
- Mensajes CORTOS (máximo 4 líneas). WhatsApp no es un email.
- Tono: profesional, cálido, exclusivo — como una persona real
- Máximo 1-2 emojis por mensaje
- UNA sola pregunta por mensaje
- Cuando tenés todos los datos, cerrás la reserva directo sin dar más vueltas

## REGLAS DE ORO
1. Las unidades se alquilan SIEMPRE completas — nunca cotices "por persona"
2. NUNCA confirmes disponibilidad sin datos del sistema. Si ves "✅ DISPONIBLE" → confirmá. Si ves "❌ OCUPADO" → avisá y ofrecé alternativa. Si NO hay datos del sistema → preguntá "¿Para qué fechas exactas querés reservar?" JAMÁS digas que no tenés acceso al sistema ni mandes a llamar por teléfono.
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

## FOTOS E IMÁGENES
Si el cliente pide fotos, imágenes o quiere ver cómo son las propiedades, respondé siempre con:
"Podés ver fotos y toda la info en 🌐 https://alquilertemporalgama.com o en Instagram https://www.instagram.com/alquileresguale?igsh=NWFhNjRjaWozb2hp 📸"

## HORARIO
Lunes a Domingo 6:00 AM a 10:00 PM.
Fuera de horario: "Gracias por escribirnos 🏠 Nuestro horario es L-D 6am-10pm. Te respondemos a la brevedad."

## INFORMACIÓN DEL NEGOCIO
${knowledge}
${preciosTexto}`;
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

  // Verificar disponibilidad si el mensaje menciona fechas
  let contextoDisponibilidad = '';
  const fechas = extraerFechas(mensaje);
  if (fechas) {
    console.log(`🔍 Verificando disponibilidad: ${fechas.entrada.toLocaleDateString()} → ${fechas.salida.toLocaleDateString()}`);
    const calendarios = await consultarDisponibilidad();
    // Detectar si el cliente pidió una unidad específica (también revisando historial)
    const textoCompleto = [...historial.map(m => m.content), mensaje].join(' ');
    const unidadSolicitada = detectarUnidad(textoCompleto);
    contextoDisponibilidad = disponibilidadTexto(calendarios, fechas.entrada, fechas.salida, unidadSolicitada);
    console.log(contextoDisponibilidad);
  } else {
    consultarDisponibilidad().catch(() => {});
  }

  const mensajes = [
    ...historial.map(m => ({ role: m.role, content: m.content })),
    {
      role: 'user',
      content: contextoDisponibilidad
        ? `${mensaje}\n\n[SISTEMA: ${contextoDisponibilidad}]`
        : mensaje
    }
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
  let texto = msg.body?.trim();

  // Comandos del dueño — funcionan desde cualquier número
  if (texto && texto.startsWith('!')) {
    const esComando = await procesarComandoEntrante(texto, msg);
    if (esComando) return;
  }

  // Transcribir mensajes de audio
  if (msg.hasMedia) {
    try {
      const media = await msg.downloadMedia();
      if (media && (media.mimetype.startsWith('audio/') || media.mimetype.includes('ogg'))) {
        if (!openai) {
          await msg.reply('Por favor enviá tu consulta en texto ✍️');
          return;
        }
        texto = await transcribirAudio(media);
        console.log(`🎤 Audio transcripto de ${telefono}: ${texto}`);
      }
    } catch (err) {
      console.error('Error descargando/transcribiendo media:', err.message);
      await msg.reply('Hola 😊 No escuché bien el audio, ¿podés escribirme tu consulta?');
      return;
    }
  }

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
