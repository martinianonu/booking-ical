import { Img, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { colors } from "../brand";
import { pulse } from "../animation";

const Rays: React.FC<{ size: number; opacity: number; spin: number }> = ({
  size,
  opacity,
  spin,
}) => {
  const count = 12;
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        rotate: `${spin}deg`,
        opacity,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 4,
            height: size * 0.52,
            background: `linear-gradient(${colors.red}, transparent)`,
            transformOrigin: "top center",
            translate: "-50% 0",
            rotate: `${(360 / count) * i}deg`,
          }}
        />
      ))}
    </div>
  );
};

export const SirenPhoto: React.FC<{ delay?: number; size?: number }> = ({
  delay = 2,
  size = 210,
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);

  // punchy "bang" entrance: overshoot pop + a hard rotational snap
  const pop = interpolate(local, [0, 12], [0, 1], {
    easing: Easing.bezier(0.2, 2.2, 0.4, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const introOpacity = interpolate(local, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wobble = interpolate(local, [0, 10, 20], [-8, 4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const flash = pulse(frame, 7, 0.25, 1);
  const spin = frame * 2.4;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scale: pop,
        opacity: introOpacity,
        rotate: `${wobble}deg`,
      }}
    >
      <Rays size={size * 2.1} opacity={0.35 + flash * 0.4} spin={spin} />

      <div
        style={{
          position: "absolute",
          width: size * 1.6,
          height: size * 1.6,
          borderRadius: size,
          background: colors.red,
          opacity: 0.22 + flash * 0.4,
          filter: `blur(${size * 0.3}px)`,
        }}
      />
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: `0 0 ${34 + flash * 46}px ${colors.red}${flash > 0.6 ? "dd" : "77"}`,
          border: `2px solid ${colors.red}aa`,
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
