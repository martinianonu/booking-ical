import { Img, staticFile, useCurrentFrame } from "remotion";
import { colors } from "../brand";
import { popIn, pulse } from "../animation";

export const SirenPhoto: React.FC<{ delay?: number; size?: number }> = ({
  delay = 4,
  size = 200,
}) => {
  const frame = useCurrentFrame();
  const { scale, opacity } = popIn(frame, delay, 20);
  const flash = pulse(frame, 10, 0.3, 1);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scale,
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: size * 1.5,
          height: size * 1.5,
          borderRadius: size,
          background: colors.red,
          opacity: 0.2 + flash * 0.35,
          filter: `blur(${size * 0.28}px)`,
        }}
      />
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: `0 0 ${30 + flash * 40}px ${colors.red}${flash > 0.6 ? "cc" : "66"}`,
          border: `2px solid ${colors.red}88`,
        }}
      >
        <Img
          src={staticFile("siren-photo.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
};
