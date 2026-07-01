import { useCurrentFrame } from "remotion";
import { colors } from "../brand";
import { fontFamily } from "../fonts";
import { enterUp } from "../animation";

export const Kicker: React.FC<{
  children: React.ReactNode;
  delay?: number;
  color?: string;
}> = ({ children, delay = 0, color = colors.blueGlow }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 10, 18);
  return (
    <div
      style={{
        fontFamily: fontFamily,
        fontWeight: 700,
        fontSize: 32,
        letterSpacing: 4,
        textTransform: "uppercase",
        color,
        opacity,
        translate: `0 ${translateY}px`,
      }}
    >
      {children}
    </div>
  );
};

export const Heading: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  accent?: boolean;
  accentColor?: string;
  lineHeight?: number;
}> = ({
  children,
  delay = 0,
  size = 92,
  accent = false,
  accentColor = colors.blueGlow,
  lineHeight = 1.04,
}) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 14, 36);
  return (
    <div
      style={{
        fontFamily: fontFamily,
        fontWeight: 900,
        fontSize: size,
        lineHeight,
        letterSpacing: -1,
        textTransform: "uppercase",
        color: accent ? accentColor : colors.white,
        opacity,
        translate: `0 ${translateY}px`,
      }}
    >
      {children}
    </div>
  );
};

export const Subtext: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
}> = ({ children, delay = 0, size = 44, color = colors.textMuted }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 12, 22);
  return (
    <div
      style={{
        fontFamily: fontFamily,
        fontWeight: 500,
        fontSize: size,
        lineHeight: 1.3,
        color,
        opacity,
        translate: `0 ${translateY}px`,
      }}
    >
      {children}
    </div>
  );
};
