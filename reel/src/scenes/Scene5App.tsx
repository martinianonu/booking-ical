import { Background } from "../components/Background";
import { Stage } from "../components/Stage";
import { Heading, Kicker } from "../components/Typography";
import { PhoneMockup } from "../components/PhoneMockup";
import { colors } from "../brand";

export const SCENE_5_DURATION = 150;

export const Scene5App: React.FC = () => {
  return (
    <Background variant="vertical">
      <Stage gap={30} padTop={140} padBottom={70}>
        <Kicker delay={4}>Todo en tus manos</Kicker>
        <Heading delay={14} size={68}>
          Controlá tu alarma
          <br />
          <span style={{ color: colors.blueGlow }}>desde el celular</span>
        </Heading>

        <PhoneMockup delay={40} scale={0.92} />
      </Stage>
    </Background>
  );
};
