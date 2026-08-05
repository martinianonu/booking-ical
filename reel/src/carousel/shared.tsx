import { AbsoluteFill, Img, staticFile } from "remotion";
import { Grain } from "../components/Background";
import { colors } from "../brand";
import { fontFamily as bodyFont } from "../fonts";
import { condensedFont } from "../daily/typeFonts";

// Shared building blocks for every 4:5 Instagram carousel slide, so
// different carousels (problem/solution, personalization, etc.) still read
// as the same Central Vigía visual identity: photo backdrop + grain, dot
// grid, numbered badge, and a consistent closing brand footer.

export const DotGrid: React.FC = () => {
  const cols = 6;
  const rows = 6;
  const gap = 20;
  return (
    <svg width={cols * gap} height={rows * gap} style={{ position: "absolute", top: 60, right: 60, opacity: 0.45 }}>
      {Array.from({ length: cols }).map((_, x) =>
        Array.from({ length: rows }).map((_, y) => (
          <circle key={`${x}-${y}`} cx={x * gap + gap / 2} cy={y * gap + gap / 2} r={2.6} fill={colors.blueGlow} />
        )),
      )}
    </svg>
  );
};

export const SlideKicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = colors.blueGlow,
}) => (
  <div
    style={{
      fontFamily: bodyFont,
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: 5,
      textTransform: "uppercase",
      color,
    }}
  >
    {children}
  </div>
);

export const SlideHeadline: React.FC<{ lines: { text: string; accent?: boolean }[]; size?: number }> = ({
  lines,
  size = 66,
}) => (
  <div>
    {lines.map((line, i) => (
      <div
        key={i}
        style={{
          fontFamily: condensedFont,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 0.98,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: line.accent ? colors.blueGlow : colors.white,
        }}
      >
        {line.text}
      </div>
    ))}
  </div>
);

export const SlideNumber: React.FC<{ n: number; of?: number }> = ({ n, of = 4 }) => (
  <div
    style={{
      position: "absolute",
      top: 64,
      right: 64,
      fontFamily: condensedFont,
      fontWeight: 700,
      fontSize: 26,
      color: colors.textMuted,
      letterSpacing: 1,
      background: "rgba(6,15,38,0.55)",
      border: `1px solid ${colors.blueGlow}33`,
      borderRadius: 20,
      padding: "6px 16px",
    }}
  >
    {n}/{of}
  </div>
);

export const SlideFooter: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 48,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
    }}
  >
    <div style={{ height: 1, width: 80, background: `${colors.textFaint}55`, marginBottom: 14 }} />
    <div
      style={{
        fontFamily: condensedFont,
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: 1.5,
        color: colors.textMuted,
      }}
    >
      CENTRAL VIGÍA
    </div>
    <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 18, color: colors.textFaint }}>
      centralvigiaseguridad.com
    </div>
  </div>
);

export const PhotoBackdrop: React.FC<{
  src: string;
  brightness?: number;
  saturate?: number;
  scrim?: string;
}> = ({ src, brightness = 0.4, saturate = 0.4, scrim }) => (
  <>
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `brightness(${brightness}) saturate(${saturate})`,
        }}
      />
    </AbsoluteFill>
    <AbsoluteFill
      style={{
        background:
          scrim ??
          `linear-gradient(180deg, rgba(6,15,38,0.4) 0%, rgba(6,15,38,0.62) 55%, rgba(6,15,38,0.92) 100%)`,
      }}
    />
    <Grain />
  </>
);
