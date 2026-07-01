import { Easing, interpolate } from "remotion";

export const enterUp = (
  frame: number,
  delay: number,
  duration = 22,
  distance = 46,
) => {
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(
    frame,
    [delay, delay + duration],
    [distance, 0],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  return { opacity, translateY };
};

export const popIn = (frame: number, delay: number, duration = 20) => {
  const scale = interpolate(frame, [delay, delay + duration], [0.7, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [delay, delay + duration * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { scale, opacity };
};

export const fadeOutTail = (
  frame: number,
  sceneDuration: number,
  duration = 18,
) => {
  return interpolate(
    frame,
    [sceneDuration - duration, sceneDuration],
    [1, 0],
    {
      easing: Easing.in(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
};

export const pulse = (frame: number, period: number, min: number, max: number) => {
  const phase = (frame % period) / period;
  const wave = Math.sin(phase * Math.PI * 2) * 0.5 + 0.5;
  return min + wave * (max - min);
};
