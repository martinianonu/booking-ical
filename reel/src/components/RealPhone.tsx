import { Img, staticFile, useCurrentFrame } from "remotion";
import { colors } from "../brand";
import { enterUp, pulse } from "../animation";

export const RealPhone: React.FC<{ delay?: number; width?: number }> = ({
  delay = 0,
  width = 420,
}) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 14, 50);
  const float = Math.sin(frame / 45) * 8;
  const glow = pulse(frame, 80, 0.5, 1);

  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY + float}px`,
        width,
        borderRadius: 40,
        filter: `drop-shadow(0 0 ${50 + glow * 30}px ${colors.blue}77)`,
      }}
    >
      <Img
        src={staticFile("app-screenshot.png")}
        style={{ width: "100%", height: "auto", display: "block", borderRadius: 40 }}
      />
    </div>
  );
};
