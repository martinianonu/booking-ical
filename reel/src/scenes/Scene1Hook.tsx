import { useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Kicker, Subtext } from "../components/Typography";
import { HouseIcon } from "../components/Icons";
import { colors } from "../brand";
import { interpolate, Easing } from "remotion";
import { pulse } from "../animation";

export const SCENE_1_DURATION = 110;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const ringScale = pulse(frame, 100, 1, 1.18);
  const danger = interpolate(frame, [80, SCENE_1_DURATION], [0, 1], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Background variant="night">
      <GlowOrb size={700} top={-180} left={width / 2 - 350} color={colors.blue} opacity={0.22} />
      <GlowOrb
        size={520}
        top={520}
        left={width / 2 - 260}
        color={colors.red}
        opacity={0.1 + danger * 0.22}
      />

      <Stage gap={40} padTop={220}>
        <div
          style={{
            position: "relative",
            width: 220,
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: 110,
              border: `2px solid ${colors.blueGlow}`,
              opacity: 0.35,
              scale: ringScale,
            }}
          />
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              background: "rgba(47,107,255,0.14)",
              border: `3px solid ${colors.blueGlow}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HouseIcon size={70} color={colors.white} />
          </div>
        </div>

        <Kicker delay={8}>Central Vigía</Kicker>
        <Heading delay={22} size={90}>
          ¿Y si alguien
          <br />
          entra a tu casa
          <br />
          <span style={{ color: colors.blueGlow }}>cuando no estás?</span>
        </Heading>
        <Subtext delay={60} size={40}>
          En una emergencia, cada segundo cuenta.
        </Subtext>
      </Stage>
    </Background>
  );
};
