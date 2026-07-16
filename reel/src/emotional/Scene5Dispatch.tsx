import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Kicker } from "../components/Typography";
import { CarPhoto } from "../components/CarPhoto";
import { colors } from "../brand";

export const SCENE_DURATION = 70;

export const Scene5Dispatch: React.FC = () => {
  return (
    <Background variant="night">
      <GlowOrb size={600} top={200} left={-160} color={colors.blue} opacity={0.2} />

      <Stage gap={34} padTop={200}>
        <Kicker delay={2}>Confirmado</Kicker>
        <Heading delay={8} size={68}>
          Enviamos un móvil
          <br />
          <span style={{ color: colors.blueGlow }}>exclusivo a tu casa</span>
        </Heading>

        <CarPhoto delay={16} width={700} />
      </Stage>
    </Background>
  );
};
