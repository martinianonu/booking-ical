import { useCurrentFrame } from "remotion";
import { colors } from "../brand";
import { condensedFont } from "../daily/typeFonts";
import { fontFamily as bodyFont } from "../fonts";
import { enterUp } from "../animation";

// Big, bold, condensed all-caps headline — the "muy impactante" display
// style called out in the brand brief (Impact/Bebas/Futura-like). Each
// line can render in white or the accent blue.
export const BigHeadline: React.FC<{
  lines: { text: string; accent?: boolean }[];
  delay: number;
  size?: number;
  align?: "center" | "left";
}> = ({ lines, delay, size = 76, align = "center" }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ textAlign: align, display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start" }}>
      {lines.map((line, i) => {
        const d = delay + i * 6;
        const { opacity, translateY } = enterUp(frame, d, 16, 34);
        return (
          <div
            key={i}
            style={{
              opacity,
              translate: `0 ${translateY}px`,
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
        );
      })}
    </div>
  );
};

// Supporting sentence-case subtitle line, doubles as the video's spoken
// (voice-over) caption track since there's no synthesized voice track.
export const Caption: React.FC<{
  text: string;
  delay: number;
  size?: number;
  color?: string;
  align?: "center" | "left";
  maxWidth?: number;
}> = ({ text, delay, size = 34, color = colors.textMuted, align = "center", maxWidth = 780 }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 16, 24);
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        fontFamily: bodyFont,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1.35,
        color,
        textAlign: align,
        maxWidth,
      }}
    >
      {text}
    </div>
  );
};

export const BulletRow: React.FC<{
  icon: React.FC<{ size?: number; color?: string }>;
  text: string;
  delay: number;
}> = ({ icon: Icon, text, delay }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 14, 28);
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${colors.blueGlow}44`,
        borderRadius: 18,
        padding: "14px 26px",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(91,143,232,0.16)",
          border: `2px solid ${colors.blueGlow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={22} color={colors.blueGlow} />
      </div>
      <div
        style={{
          fontFamily: condensedFont,
          fontWeight: 700,
          fontSize: 32,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: colors.white,
        }}
      >
        {text}
      </div>
    </div>
  );
};
