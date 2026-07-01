import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Kicker } from "../components/Typography";
import { CarPhoto } from "../components/CarPhoto";
import { PanicNotification } from "../components/PhoneMockup";
import { colors } from "../brand";

export const SCENE_4_DURATION = 55;

export const Scene4Response: React.FC = () => {
  return (
    <Background variant="night">
      <GlowOrb size={600} top={200} left={-160} color={colors.blue} opacity={0.2} />

      <Stage gap={36} padTop={190}>
        <Kicker delay={2}>Respuesta inmediata</Kicker>
        <Heading delay={6} size={72}>
          Verificamos la alerta y enviamos un
          <br />
          <span style={{ color: colors.blueGlow }}>móvil exclusivo a tu casa</span>
        </Heading>

        <CarPhoto delay={13} width={700} />

        <PanicNotification delay={32} />
      </Stage>
    </Background>
  );
};
