import { AbsoluteFill } from "remotion";
import { colors, gradients } from "../brand";

const DotGrid: React.FC<{ top: number; right: number; opacity?: number }> = ({
  top,
  right,
  opacity = 0.5,
}) => {
  const cols = 7;
  const rows = 7;
  const gap = 22;
  return (
    <svg
      width={cols * gap}
      height={rows * gap}
      style={{ position: "absolute", top, right, opacity }}
    >
      {Array.from({ length: cols }).map((_, x) =>
        Array.from({ length: rows }).map((_, y) => (
          <circle
            key={`${x}-${y}`}
            cx={x * gap + gap / 2}
            cy={y * gap + gap / 2}
            r={3}
            fill={colors.blueGlow}
          />
        )),
      )}
    </svg>
  );
};

// A faint noise layer breaks up banding/tiling seams that large smooth
// gradients otherwise show under headless-Chrome rasterization.
const Grain: React.FC = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }}>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

export const Background: React.FC<{
  variant?: "night" | "vertical";
  showDots?: boolean;
  children?: React.ReactNode;
}> = ({ variant = "vertical", showDots = true, children }) => {
  return (
    <AbsoluteFill
      style={{
        background: variant === "night" ? gradients.night : gradients.vertical,
      }}
    >
      <Grain />
      {showDots ? <DotGrid top={70} right={70} /> : null}
      {children}
    </AbsoluteFill>
  );
};
