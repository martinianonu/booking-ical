import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Kicker, Subtext } from "../components/Typography";
import { SirenPhoto } from "../components/SirenPhoto";
import { colors } from "../brand";

export const SCENE_2_DURATION = 88;

const Ring: React.FC<{ frame: number; delay: number; period: number }> = ({
  frame,
  delay,
  period,
}) => {
  const local = Math.max(0, frame - delay);
  const progress = (local % period) / period;
  const scale = interpolate(progress, [0, 1], [0.3, 2.1]);
  const opacity = interpolate(progress, [0, 0.15, 1], [0, 0.55, 0]);
  return (
    <div
      style={{
        position: "absolute",
        width: 180,
        height: 180,
        borderRadius: 90,
        border: `3px solid ${colors.red}`,
        scale,
        opacity,
      }}
    />
  );
};

export const Scene2Detection: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  return (
    <Background variant="night">
      <GlowOrb size={600} top={-120} left={width / 2 - 300} color={colors.red} opacity={0.18} />

      <Stage gap={40} padTop={230}>
        <div
          style={{
            position: "relative",
            width: 200,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ring frame={frame} delay={0} period={44} />
          <Ring frame={frame} delay={22} period={44} />
          <SirenPhoto delay={4} size={200} />
        </div>

        <Kicker delay={22} color={colors.red}>
          Detección inmediata
        </Kicker>
        <Heading delay={34} size={84}>
          En segundos, tu alarma
          <br />
          <span style={{ color: colors.red }}>detecta el movimiento</span>
        </Heading>
        <Subtext delay={60} size={40}>
          Sensores de última generación, activos las 24 horas.
        </Subtext>
      </Stage>
    </Background>
  );
};
