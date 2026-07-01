import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Kicker, Subtext } from "../components/Typography";
import { SensorIcon } from "../components/Icons";
import { colors } from "../brand";
import { popIn } from "../animation";

export const SCENE_2_DURATION = 110;

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
  const { scale: iconScale, opacity: iconOpacity } = popIn(frame, 4, 22);
  const shake =
    frame > 18 ? Math.sin(frame * 1.4) * interpolate(frame, [18, 40], [3, 0], { extrapolateRight: "clamp" }) : 0;

  return (
    <Background variant="night">
      <GlowOrb size={600} top={-120} left={width / 2 - 300} color={colors.red} opacity={0.18} />

      <Stage gap={44} padTop={230}>
        <div
          style={{
            position: "relative",
            width: 180,
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: iconScale,
            opacity: iconOpacity,
            rotate: `${shake}deg`,
          }}
        >
          <Ring frame={frame} delay={0} period={55} />
          <Ring frame={frame} delay={27} period={55} />
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 32,
              background: "rgba(228,61,69,0.16)",
              border: `3px solid ${colors.red}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SensorIcon size={62} color={colors.white} />
          </div>
        </div>

        <Kicker delay={30} color={colors.red}>
          Detección inmediata
        </Kicker>
        <Heading delay={44} size={84}>
          En segundos, tu alarma
          <br />
          <span style={{ color: colors.red }}>detecta el movimiento</span>
        </Heading>
        <Subtext delay={78} size={40}>
          Sensores de última generación, activos las 24 horas.
        </Subtext>
      </Stage>
    </Background>
  );
};
