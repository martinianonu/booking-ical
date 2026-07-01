import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Kicker, Subtext } from "../components/Typography";
import { CarIcon } from "../components/Icons";
import { PanicNotification } from "../components/PhoneMockup";
import { colors } from "../brand";

export const SCENE_4_DURATION = 140;

export const Scene4Response: React.FC = () => {
  const frame = useCurrentFrame();

  const carX = interpolate(frame, [4, 44], [-480, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const carOpacity = interpolate(frame, [4, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Background variant="night">
      <GlowOrb size={600} top={200} left={-160} color={colors.blue} opacity={0.2} />

      <Stage gap={36} padTop={190}>
        <Kicker delay={4}>Respuesta inmediata</Kicker>
        <Heading delay={14} size={78}>
          Verificamos la alerta y enviamos un
          <br />
          <span style={{ color: colors.blueGlow }}>móvil exclusivo a tu casa</span>
        </Heading>

        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: 130,
            background: "rgba(47,107,255,0.12)",
            border: `3px solid ${colors.blueGlow}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div style={{ translate: `${carX}px 0`, opacity: carOpacity }}>
            <CarIcon size={130} color={colors.white} />
          </div>
        </div>

        <PanicNotification delay={58} />

        <Subtext delay={78} size={38}>
          Máxima protección, sin que muevas un dedo.
        </Subtext>
      </Stage>
    </Background>
  );
};
