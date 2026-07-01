import { Background } from "../components/Background";
import { Stage } from "../components/Stage";
import { Heading, Kicker } from "../components/Typography";
import { RealPhone } from "../components/RealPhone";
import { colors } from "../brand";

export const SCENE_5_DURATION = 50;

export const Scene5App: React.FC = () => {
  return (
    <Background variant="vertical">
      <Stage gap={30} padTop={150} padBottom={70}>
        <Kicker delay={2}>Todo en tus manos</Kicker>
        <Heading delay={6} size={68}>
          Controlá tu alarma
          <br />
          <span style={{ color: colors.blueGlow }}>desde el celular</span>
        </Heading>

        <RealPhone delay={14} width={440} />
      </Stage>
    </Background>
  );
};
