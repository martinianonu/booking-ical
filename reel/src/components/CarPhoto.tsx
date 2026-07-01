import { Img, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { colors } from "../brand";

export const CarPhoto: React.FC<{ delay?: number; width?: number }> = ({
  delay = 4,
  width = 640,
}) => {
  const frame = useCurrentFrame();

  const slideX = interpolate(frame, [delay, delay + 40], [-260, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kenBurns = interpolate(frame, [delay, delay + 130], [1.06, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        translate: `${slideX}px 0`,
        width,
        borderRadius: 28,
        overflow: "hidden",
        border: `2px solid ${colors.blueGlow}66`,
        boxShadow: `0 0 70px ${colors.blue}55`,
      }}
    >
      <Img
        src={staticFile("car-photo.png")}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          scale: kenBurns,
        }}
      />
    </div>
  );
};
