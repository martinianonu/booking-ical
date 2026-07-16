import { Background } from "../components/Background";
import { Stage } from "../components/Stage";
import { Heading, Kicker } from "../components/Typography";
import { RealPhone } from "../components/RealPhone";
import { colors } from "../brand";

export const SCENE_DURATION = 65;

export const Scene6App: React.FC = () => {
  return (
    <Background variant="vertical">
      <Stage gap={28} padTop={150} padBottom={70}>
        <Kicker delay={2}>Todo en tiempo real</Kicker>
        <Heading delay={8} size={64}>
          Vas a verlo todo
          <br />
          <span style={{ color: colors.blueGlow }}>desde tu celular</span>
        </Heading>

        <RealPhone delay={16} width={430} />
      </Stage>
    </Background>
  );
};
