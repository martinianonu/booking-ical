import type { TypeImpactConfig } from "./TypeImpactTemplate";

// Same informational content as the daily reels, redesigned purely for
// typographic impact: much larger type, and three genuinely different
// display fonts/layouts instead of just varying Outfit's size or weight.

export const typeImpactConfigs: TypeImpactConfig[] = [
  {
    kicker: "Por qué Central Vigía",
    headingLines: ["3 razones para", "monitoreo real"],
    style: "condensed",
    steps: [
      { icon: "headset", label: "Monitoreo 24/7 con operadores reales" },
      { icon: "car", label: "Móvil de verificación ante cualquier alerta" },
      { icon: "phone", label: "Control total desde tu celular" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Cómo funciona",
    headingLines: ["¿Qué pasa cuando", "suena tu alarma?"],
    style: "tech",
    steps: [
      { icon: "sensor", label: "Se detecta el movimiento al instante" },
      { icon: "headset", label: "Un operador humano verifica la alerta" },
      { icon: "car", label: "Si hace falta, enviamos un móvil a tu casa" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Dato",
    headingLines: ["Una alarma sin monitoreo", "solo hace ruido"],
    style: "premium",
    steps: [
      { icon: "shield", label: "Con Central Vigía, cada alerta la ve un operador real" },
      { icon: "headset", label: "Verificamos antes de movilizar a nadie" },
      { icon: "phone", label: "Vos recibís la novedad al instante" },
    ],
    cta: "Contactanos",
  },
  // Same large-scale type, but the refined/on-brand take: Outfit (the
  // client's real brand font) instead of a novelty display face, sentence
  // case instead of shouting caps, restrained accents.
  {
    kicker: "Por qué Central Vigía",
    headingLines: ["3 razones para", "monitoreo real"],
    style: "professional",
    steps: [
      { icon: "headset", label: "Monitoreo 24/7 con operadores reales" },
      { icon: "car", label: "Móvil de verificación ante cualquier alerta" },
      { icon: "phone", label: "Control total desde tu celular" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Cómo funciona",
    headingLines: ["¿Qué pasa cuando", "suena tu alarma?"],
    style: "professional",
    steps: [
      { icon: "sensor", label: "Se detecta el movimiento al instante" },
      { icon: "headset", label: "Un operador humano verifica la alerta" },
      { icon: "car", label: "Si hace falta, enviamos un móvil a tu casa" },
    ],
    cta: "Contactanos",
  },
  {
    kicker: "Dato",
    headingLines: ["Una alarma sin monitoreo", "solo hace ruido"],
    style: "professional",
    steps: [
      { icon: "shield", label: "Con Central Vigía, cada alerta la ve un operador real" },
      { icon: "headset", label: "Verificamos antes de movilizar a nadie" },
      { icon: "phone", label: "Vos recibís la novedad al instante" },
    ],
    cta: "Contactanos",
  },
];
