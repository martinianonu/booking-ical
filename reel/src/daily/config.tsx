import type { InfoReelConfig } from "./InfoReelTemplate";

// Short, purely informational reels — no dramatized narrative, no
// testimonials (those are filmed for real by the client). Mirrors the
// best-performing non-testimonial ads in the account (listicle / how-it-works
// style), per reel/learnings.json. 10 distinct angles, each with a different
// step-entrance animation and hero-image treatment (no hero / photo card /
// full-bleed banner / floating tilt / bobbing phone mock) so the 10 daily
// videos don't all look and move the same way — some spotlight the app,
// others the full hardware system.

export const dailyConfigs: InfoReelConfig[] = [
  {
    kicker: "Por qué Central Vigía",
    headingLines: ["3 RAZONES PARA TENER", "MONITOREO REAL"],
    stepAnimation: "slideUp",
    steps: [
      { icon: "headset", label: "Monitoreo 24/7 con operadores reales" },
      { icon: "car", label: "Móvil de verificación ante cualquier alerta" },
      { icon: "phone", label: "Control total desde tu celular" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Cómo funciona",
    headingLines: ["¿QUÉ PASA CUANDO", "SUENA TU ALARMA?"],
    stepAnimation: "slideSide",
    steps: [
      { icon: "sensor", label: "Se detecta el movimiento al instante" },
      { icon: "headset", label: "Un operador humano verifica la alerta" },
      { icon: "car", label: "Si hace falta, enviamos un móvil a tu casa" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Dato",
    headingLines: ["UNA ALARMA SIN MONITOREO", "SOLO HACE RUIDO"],
    stepAnimation: "scaleRotate",
    steps: [
      { icon: "shield", label: "Con Central Vigía, cada alerta la ve un operador real" },
      { icon: "headset", label: "Verificamos antes de movilizar a nadie" },
      { icon: "phone", label: "Vos recibís la novedad al instante" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Ojo con esto",
    headingLines: ["3 ERRORES COMUNES", "AL ELEGIR UNA ALARMA"],
    stepAnimation: "wipe",
    steps: [
      { icon: "bell", label: "Instalarla sin monitoreo real" },
      { icon: "headset", label: "No tener verificación humana" },
      { icon: "phone", label: "No poder controlarla desde el celular" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Monitoreo real",
    headingLines: ["TODO LO QUE INCLUYE", "UN MONITOREO DE VERDAD"],
    heroAsset: "siren",
    heroLayout: "card",
    stepAnimation: "slideUp",
    steps: [
      { icon: "sensor", label: "Sensores activos las 24 horas" },
      { icon: "headset", label: "Un operador ve cada alerta" },
      { icon: "car", label: "Móvil de verificación si hace falta" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Antes de contratar",
    headingLines: ["3 PREGUNTAS QUE TENÉS", "QUE HACERTE"],
    heroAsset: "systemLineup",
    heroLayout: "fullBleed",
    stepAnimation: "scaleRotate",
    steps: [
      { icon: "headset", label: "¿Quién atiende tu alerta?" },
      { icon: "shield", label: "¿La verifican antes de actuar?" },
      { icon: "phone", label: "¿La controlás desde el celular?" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Todo en tus manos",
    headingLines: ["ASÍ SE VE EL CONTROL", "DESDE TU CELULAR"],
    heroAsset: "app",
    heroLayout: "phoneMock",
    stepAnimation: "slideSide",
    steps: [
      { icon: "phone", label: "Armar y desarmar en un toque" },
      { icon: "sensor", label: "Cámaras en vivo, cuando quieras" },
      { icon: "bell", label: "Alertas al instante, estés donde estés" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Respuesta real",
    headingLines: ["POR QUÉ UN MÓVIL DE", "VERIFICACIÓN SUMA"],
    heroAsset: "car",
    heroLayout: "card",
    stepAnimation: "wipe",
    steps: [
      { icon: "car", label: "Confirma la situación antes de alarmar a nadie" },
      { icon: "headset", label: "Llega directo a tu casa si hace falta" },
      { icon: "phone", label: "Vos lo ves todo desde la app" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Del otro lado",
    headingLines: ["ASÍ TRABAJA UN OPERADOR", "DE CENTRAL VIGÍA"],
    heroAsset: "camera",
    heroLayout: "floatTilt",
    stepAnimation: "slideUp",
    steps: [
      { icon: "bell", label: "Recibe la alerta al instante" },
      { icon: "sensor", label: "Revisa cámaras y sensores" },
      { icon: "headset", label: "Decide la respuesta correcta" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Sin excepciones",
    headingLines: ["MONITOREO 24/7:", "QUÉ SIGNIFICA EN LA PRÁCTICA"],
    heroAsset: "houseSystem",
    heroLayout: "fullBleed",
    stepAnimation: "scaleRotate",
    steps: [
      { icon: "sensor", label: "De día" },
      { icon: "shield", label: "De noche, findes y feriados" },
      { icon: "headset", label: "Siempre hay alguien atento a tu casa" },
    ],
    cta: "Contactanos",
  },
];
