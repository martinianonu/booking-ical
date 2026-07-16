import { useCurrentFrame } from "remotion";
import { colors } from "../brand";
import { pulse } from "../animation";

// Stylized illustrated operator at the monitoring desk, seen from behind —
// mirrors the framing Central Vigía already uses in its own monitoring-room
// photography, built as original vector art (not a photo of a real person).
export const OperatorSilhouette: React.FC<{ width?: number }> = ({
  width = 620,
}) => {
  const frame = useCurrentFrame();
  const breathe = pulse(frame, 90, 0, 1);
  const monitorFlicker = pulse(frame, 40, 0.55, 1);
  const headTilt = Math.sin(frame / 55) * 2.2;

  return (
    <svg width={width} height={width * 0.86} viewBox="0 0 620 534" fill="none">
      <defs>
        <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors.navyLight} />
          <stop offset="1" stopColor={colors.navyDeepest} />
        </linearGradient>
        <radialGradient id="screenGlow" cx="0.5" cy="0.35" r="0.75">
          <stop offset="0" stopColor={colors.cyan} stopOpacity="0.9" />
          <stop offset="1" stopColor={colors.blue} stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {/* monitor wall */}
      {[0, 1, 2].map((i) => {
        const x = 60 + i * 175;
        const active = i === 1 ? monitorFlicker : 0.7;
        return (
          <g key={i}>
            <rect
              x={x}
              y={70}
              width={150}
              height={100}
              rx={10}
              fill={colors.navy}
              stroke={colors.blueGlow}
              strokeOpacity={0.5}
              strokeWidth={2}
            />
            <rect
              x={x + 10}
              y={80}
              width={130}
              height={80}
              rx={4}
              fill={colors.blue}
              opacity={active * 0.35}
            />
            <rect
              x={x + 18}
              y={92}
              width={70}
              height={8}
              rx={4}
              fill={colors.cyan}
              opacity={active * 0.8}
            />
            <rect
              x={x + 18}
              y={108}
              width={100}
              height={6}
              rx={3}
              fill={colors.cyan}
              opacity={active * 0.5}
            />
            <rect
              x={x + 18}
              y={122}
              width={50}
              height={6}
              rx={3}
              fill={colors.cyan}
              opacity={active * 0.5}
            />
          </g>
        );
      })}

      {/* ambient glow behind operator */}
      <ellipse cx={310} cy={230} rx={230} ry={130} fill="url(#screenGlow)" opacity={0.35} />

      {/* desk */}
      <rect x={40} y={330} width={540} height={26} rx={8} fill="url(#deskGrad)" />

      {/* chair back */}
      <rect x={230} y={250} width={160} height={190} rx={40} fill={colors.navyDeepest} />

      {/* operator silhouette group, subtle breathing + head tilt */}
      <g transform={`translate(310 ${300 + breathe * 3})`}>
        {/* shoulders */}
        <path
          d="M -125 190 C -125 110 -70 70 0 70 C 70 70 125 110 125 190 L 125 220 L -125 220 Z"
          fill={colors.navyDeepest}
        />
        {/* head */}
        <g transform={`rotate(${headTilt})`}>
          <ellipse cx={0} cy={0} rx={62} ry={70} fill={colors.navyDeepest} />
          {/* headset band */}
          <path
            d="M -60 -10 C -60 -55 -33 -78 0 -78 C 33 -78 60 -55 60 -10"
            stroke={colors.blueGlow}
            strokeWidth={7}
            fill="none"
            strokeLinecap="round"
          />
          {/* ear cup */}
          <rect x={44} y={-14} width={22} height={40} rx={10} fill={colors.blue} />
          <rect x={-66} y={-14} width={22} height={40} rx={10} fill={colors.blue} />
          {/* mic boom */}
          <path
            d="M 55 18 C 40 40 18 48 2 46"
            stroke={colors.blueGlow}
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
          />
          <circle cx={2} cy={46} r={6} fill={colors.cyan} />
        </g>
      </g>
    </svg>
  );
};
