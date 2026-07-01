export const GlowOrb: React.FC<{
  size: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  color: string;
  opacity?: number;
}> = ({ size, top, left, right, bottom, color, opacity = 0.35 }) => {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        borderRadius: size / 2,
        background: color,
        opacity,
        filter: `blur(${size * 0.35}px)`,
      }}
    />
  );
};
