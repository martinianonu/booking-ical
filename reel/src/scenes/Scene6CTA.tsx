import { useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { ShieldIcon } from "../components/Icons";
import { colors } from "../brand";
import { fontFamily } from "../fonts";
import { enterUp, popIn } from "../animation";

export const SCENE_6_DURATION = 65;

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

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const shield = popIn(frame, 2, 14);
  const logo = popIn(frame, 12, 18);
  const cta = enterUp(frame, 34, 16, 24);

  return (
    <Background variant="vertical">
      <GlowOrb size={700} top={-160} left={190} color={colors.blue} opacity={0.22} />

      <Stage gap={20} padTop={210} padBottom={190}>
        <div style={{ scale: shield.scale, opacity: shield.opacity }}>
          <ShieldIcon size={68} color={colors.blueGlow} />
        </div>
        <div
          style={{
            scale: shield.scale,
            opacity: shield.opacity,
            fontFamily,
            fontWeight: 800,
            fontSize: 34,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Tu familia, protegida. Siempre.
        </div>

        <div style={{ scale: logo.scale, opacity: logo.opacity, marginTop: 16, marginBottom: 6 }}>
          <Logo width={400} />
        </div>

        <Pill text="Monitoreo 24/7" delay={22} />

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
