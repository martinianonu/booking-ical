import type { InfoReelConfig } from "./InfoReelTemplate";

// Short, purely informational reels — no dramatized narrative, no
// testimonials (those are filmed for real by the client). Mirrors the
// best-performing non-testimonial ads in the account (listicle / how-it-works
// style), per reel/learnings.json.

export const dailyConfigs: InfoReelConfig[] = [
  {
    kicker: "Por qué Central Vigía",
    headingLines: ["3 RAZONES PARA TENER", "MONITOREO REAL"],
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
    steps: [
      { icon: "shield", label: "Con Central Vigía, cada alerta la ve un operador real" },
      { icon: "headset", label: "Verificamos antes de movilizar a nadie" },
      { icon: "phone", label: "Vos recibís la novedad al instante" },
    ],
    cta: "Contactanos",
  },
];
