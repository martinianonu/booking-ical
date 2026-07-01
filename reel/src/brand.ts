// Central Vigía brand tokens, extracted from client-provided marketing assets
// (app UI, promo graphics, and website screenshots).

export const colors = {
  navyDeepest: "#050B22",
  navy: "#0A1440",
  navyLight: "#132563",
  blue: "#2F6BFF",
  blueGlow: "#5FA0FF",
  cyan: "#7FD4FF",
  red: "#E43D45",
  amber: "#F0A93A",
  teal: "#1FC59A",
  green: "#2ECC71",
  white: "#FFFFFF",
  textMuted: "#B9C4E6",
  textFaint: "#7C88B8",
} as const;

export const SAFE_X = 90;

export const gradients = {
  night: `linear-gradient(180deg, ${colors.navyDeepest} 0%, ${colors.navy} 55%, ${colors.navyLight} 100%)`,
  vertical: `linear-gradient(180deg, ${colors.navy} 0%, ${colors.navyDeepest} 100%)`,
};
