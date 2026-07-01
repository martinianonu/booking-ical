import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Kicker, Subtext } from "../components/Typography";
import { OperatorSilhouette } from "../components/OperatorSilhouette";
import { HouseIcon } from "../components/Icons";
import { colors } from "../brand";
import { enterUp } from "../animation";

export const SCENE_3_DURATION = 140;

export const Scene3Alert: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const travel = interpolate(frame, [6, 46], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotOpacity = interpolate(frame, [6, 16, 40, 50], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const { opacity: operatorOpacity, translateY: operatorY } = enterUp(frame, 30, 26, 40);

  return (
    <Background variant="night">
      <GlowOrb size={640} top={-140} left={width / 2 - 320} color={colors.blue} opacity={0.2} />

      <Stage gap={30} padTop={150} padBottom={110}>
        <Kicker delay={4}>Respuesta en tiempo real</Kicker>
        <Heading delay={14} size={78}>
          La alerta llega a nuestra
          <br />
          <span style={{ color: colors.blueGlow }}>central de monitoreo 24/7</span>
        </Heading>

        <div
          style={{
            position: "relative",
            width: 640,
            height: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "rgba(47,107,255,0.14)",
              border: `2px solid ${colors.blueGlow}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HouseIcon size={38} color={colors.white} />
          </div>

          <div
            style={{
              position: "absolute",
              left: 90,
              right: 90,
              top: "50%",
              height: 3,
              background: `linear-gradient(90deg, ${colors.blueGlow}00, ${colors.blueGlow}88)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `calc(90px + ${travel} * (100% - 180px))`,
              top: "50%",
              width: 20,
              height: 20,
              marginTop: -10,
              borderRadius: 10,
              background: colors.cyan,
              opacity: dotOpacity,
              boxShadow: `0 0 24px ${colors.cyan}`,
            }}
          />

          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "rgba(127,212,255,0.14)",
              border: `2px solid ${colors.cyan}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit",
              color: colors.white,
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            CV
          </div>
        </div>

        <div style={{ opacity: operatorOpacity, translate: `0 ${operatorY}px` }}>
          <OperatorSilhouette width={520} />
        </div>

        <Subtext delay={64} size={38}>
          Un operador humano confirma la emergencia al instante.
        </Subtext>
      </Stage>
    </Background>
  );
};
