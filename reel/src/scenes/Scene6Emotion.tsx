import { useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Subtext } from "../components/Typography";
import { ShieldIcon } from "../components/Icons";
import { colors } from "../brand";
import { popIn, pulse } from "../animation";

export const SCENE_6_DURATION = 100;

export const Scene6Emotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { scale, opacity } = popIn(frame, 4, 26);
  const glow = pulse(frame, 80, 0.5, 1);

  return (
    <Background variant="night" showDots={false}>
      <GlowOrb size={780} top={260} left={150} color={colors.blue} opacity={0.18 + glow * 0.12} />

      <Stage gap={44} padTop={260}>
        <div style={{ scale, opacity }}>
          <ShieldIcon size={130} color={colors.blueGlow} />
        </div>
        <Heading delay={18} size={82}>
          Tu familia.
          <br />
          Tu hogar.
          <br />
          <span style={{ color: colors.blueGlow }}>Protegidos. Siempre.</span>
        </Heading>
        <Subtext delay={50} size={38}>
          Más de 25 años cuidando lo que más importa.
        </Subtext>
      </Stage>
    </Background>
  );
};
