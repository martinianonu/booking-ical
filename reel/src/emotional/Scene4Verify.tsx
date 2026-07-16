import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Kicker } from "../components/Typography";
import { OperatorSilhouette } from "../components/OperatorSilhouette";
import { colors } from "../brand";

export const SCENE_DURATION = 70;

export const Scene4Verify: React.FC = () => {
  return (
    <Background variant="night">
      <GlowOrb size={640} top={-140} left={140} color={colors.blue} opacity={0.2} />

      <Stage gap={30} padTop={190} padBottom={90}>
        <Kicker delay={2}>Verificación humana</Kicker>
        <Heading delay={8} size={70}>
          Antes de actuar, un operador
          <br />
          <span style={{ color: colors.blueGlow }}>confirma la alerta</span>
        </Heading>

        <OperatorSilhouette width={560} />
      </Stage>
    </Background>
  );
};
