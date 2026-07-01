import { useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { colors } from "../brand";
import { fontFamily } from "../fonts";
import { enterUp, popIn } from "../animation";

export const SCENE_7_DURATION = 125;

const Pill: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 18, 26);
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${colors.blueGlow}44`,
        borderRadius: 40,
        padding: "18px 34px",
        fontFamily: fontFamily,
        fontWeight: 600,
        fontSize: 32,
        color: colors.textMuted,
      }}
    >
      {text}
    </div>
  );
};

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const logo = popIn(frame, 2, 24);
  const cta = enterUp(frame, 47, 22, 28);

  return (
    <Background variant="vertical">
      <GlowOrb size={700} top={-160} left={190} color={colors.blue} opacity={0.22} />

      <Stage gap={26} padTop={280} padBottom={200}>
        <div style={{ scale: logo.scale, opacity: logo.opacity, marginBottom: 30 }}>
          <Logo width={440} />
        </div>

        <Pill text="Monitoreo 24/7" delay={25} />

        <div
          style={{
            opacity: cta.opacity,
            translate: `0 ${cta.translateY}px`,
            marginTop: 30,
            background: colors.green,
            borderRadius: 44,
            padding: "24px 56px",
            fontFamily: fontFamily,
            fontWeight: 800,
            fontSize: 38,
            color: colors.navyDeepest,
          }}
        >
          Contactanos
        </div>
      </Stage>
    </Background>
  );
};
