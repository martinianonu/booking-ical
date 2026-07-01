import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Kicker } from "../components/Typography";
import { IntrusionScene } from "../components/IntrusionScene";
import { colors } from "../brand";
import { enterUp } from "../animation";

export const SCENE_1_DURATION = 110;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const danger = interpolate(frame, [70, SCENE_1_DURATION], [0, 1], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const { opacity: sceneOpacity, translateY: sceneY } = enterUp(frame, 0, 26, 34);

  return (
    <Background variant="night" showDots={false}>
      <GlowOrb
        size={560}
        top={520}
        left={width / 2 - 280}
        color={colors.red}
        opacity={0.08 + danger * 0.24}
      />

      <Stage gap={26} justify="flex-start" padTop={90} padBottom={90}>
        <div style={{ opacity: sceneOpacity, translate: `0 ${sceneY}px` }}>
          <IntrusionScene width={880} />
        </div>

        <Kicker delay={16}>Central Vigía</Kicker>
        <Heading delay={30} size={72}>
          ¿Y si alguien entra
          <br />
          a tu casa <span style={{ color: colors.blueGlow }}>cuando no estás?</span>
        </Heading>
      </Stage>
    </Background>
  );
};
