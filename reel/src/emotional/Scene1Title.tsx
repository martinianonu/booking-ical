import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { fontFamily } from "../fonts";
import { colors } from "../brand";

export const SCENE_DURATION = 60;

export const Scene1Title: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 16], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, SCENE_DURATION], [1, 1.05], {
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity,
          scale,
          fontFamily,
          fontWeight: 900,
          fontSize: 78,
          lineHeight: 1.12,
          letterSpacing: -1,
          textTransform: "uppercase",
          color: colors.white,
          textAlign: "center",
        }}
      >
        Son las 3
        <br />
        de la mañana
      </div>
    </AbsoluteFill>
  );
};
