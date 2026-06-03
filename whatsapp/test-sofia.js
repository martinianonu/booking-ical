// test-sofia.js — Prueba rápida de Sofía sin WhatsApp
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function cargarKnowledge() {
  try { return fs.readFileSync(path.join(__dirname, '..', 'knowledge', 'gama-info.md'), 'utf-8'); }
  catch { return ''; }
}

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
4. Para reservar más de una noche: seña del 20% por transferencia al alias gamaal.mp
5. El comprobante se envía al: +54 9 3444 53-2516

## DATOS REQUERIDOS PARA CERRAR RESERVA
Nombre y apellido, teléfono, departamento elegido, fechas entrada/salida, número de huéspedes

## ALQUILER FIJO
Si consultan por alquiler fijo mensual: pediles nombre, apellido, cantidad de personas y fecha aproximada de ingreso.
Responder: "Anotamos tu consulta y te brindamos la info disponible a la brevedad."

## HORARIO
Lunes a Domingo 6:00 AM a 10:00 PM.

## INFORMACIÓN DEL NEGOCIO
${knowledge}`;
}

async function chat(historial, mensaje) {
  const mensajes = [...historial, { role: 'user', content: mensaje }];
  const r = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    system: buildSystemPrompt(),
    messages: mensajes
  });
  return r.content[0].text;
}

async function main() {
  const casos = [
    {
      titulo: 'CASO 1 — Cotización Depto A, viernes y sábado, 4 personas',
      mensajes: ['Hola, quiero el depto A para el viernes y sábado, somos 4 personas, cuánto sale?']
    },
    {
      titulo: 'CASO 2 — Limpieza en estadía larga',
      mensajes: ['Hola, voy a estar 10 días, me incluyen limpieza diaria?']
    },
    {
      titulo: 'CASO 3 — Tierra del Fuego, 3 personas, lunes a miércoles',
      mensajes: ['Buenas, quiero Tierra del Fuego del lunes 9 al miércoles 11, somos 3 personas, cuánto sale?']
    },
    {
      titulo: 'CASO 4 — Descuento estadía larga',
      mensajes: ['Hola, quiero reservar 2 semanas el depto B, cuánto me sale?']
    },
    {
      titulo: 'CASO 5 — Consulta alquiler fijo',
      mensajes: ['Buen día, están dando alquileres fijos?']
    }
  ];

  for (const caso of casos) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📋 ${caso.titulo}`);
    console.log('='.repeat(60));
    let historial = [];
    for (const msg of caso.mensajes) {
      console.log(`\n👤 Cliente: ${msg}`);
      const resp = await chat(historial, msg);
      console.log(`🤖 Sofía: ${resp}`);
      historial.push({ role: 'user', content: msg });
      historial.push({ role: 'assistant', content: resp });
    }
  }
}

main().catch(console.error);
