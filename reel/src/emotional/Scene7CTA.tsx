import { useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { colors } from "../brand";
import { fontFamily } from "../fonts";
import { enterUp, popIn } from "../animation";

export const SCENE_DURATION = 75;

const Pill: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 12, 20);
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${colors.blueGlow}44`,
        borderRadius: 40,
        padding: "16px 32px",
        fontFamily: fontFamily,
        fontWeight: 600,
        fontSize: 30,
        color: colors.textMuted,
      }}
    >
      {text}
    </div>
  );
};

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const tagline = enterUp(frame, 2, 14, 30);
  const logo = popIn(frame, 16, 18);
  const cta = enterUp(frame, 42, 16, 24);

  return (
    <Background variant="vertical">
      <GlowOrb size={700} top={-160} left={190} color={colors.blue} opacity={0.22} />

      <Stage gap={22} padTop={230} padBottom={180}>
        <div
          style={{
            opacity: tagline.opacity,
            translate: `0 ${tagline.translateY}px`,
            fontFamily,
            fontWeight: 900,
            fontSize: 52,
            lineHeight: 1.1,
            textTransform: "uppercase",
            color: colors.white,
            textAlign: "center",
          }}
        >
          Así se protege
          <br />
          <span style={{ color: colors.blueGlow }}>tu hogar. De verdad.</span>
        </div>

        <div style={{ scale: logo.scale, opacity: logo.opacity, marginTop: 20, marginBottom: 6 }}>
          <Logo width={400} />
        </div>

        <Pill text="Monitoreo 24/7" delay={30} />

        <div
          style={{
            opacity: cta.opacity,
            translate: `0 ${cta.translateY}px`,
            marginTop: 24,
            background: colors.green,
            borderRadius: 44,
            padding: "22px 52px",
            fontFamily: fontFamily,
            fontWeight: 800,
            fontSize: 36,
            color: colors.navyDeepest,
          }}
        >
          Contactanos
        </div>
      </Stage>
    </Background>
  );
};
