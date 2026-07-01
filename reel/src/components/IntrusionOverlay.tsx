import { useCurrentFrame } from "remotion";
import { colors } from "../brand";
import { pulse } from "../animation";

// Transparent overlay (flashlight + crouched figure + detection ring) meant
// to sit on top of a real house photo near the door/window.
export const IntrusionOverlay: React.FC<{ width?: number }> = ({ width = 340 }) => {
  const frame = useCurrentFrame();
  const flicker = pulse(frame, 14, 0.7, 1);
  const scan = pulse(frame, 110, 0, 1);

  return (
    <svg width={width} height={width * 0.9} viewBox="0 0 400 360" fill="none">
      <defs>
        <radialGradient id="beam2" cx="1" cy="0.5" r="0.9">
          <stop offset="0" stopColor="#FFE8A3" stopOpacity="0.8" />
          <stop offset="1" stopColor="#FFE8A3" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g opacity={flicker}>
        <path d="M400 190 L120 140 L120 250 Z" fill="url(#beam2)" />
      </g>

      <g transform="translate(60 190)">
        <path
          d="M0 60 C -4 20 8 -10 34 -12 C 58 -14 70 6 66 34 C 64 52 50 66 30 66 C 14 66 2 60 0 60 Z"
          fill="#02040A"
        />
        <circle cx={40} cy={-30} r={20} fill="#02040A" />
        <path d="M58 10 C 30 0 10 -6 -6 -10" stroke="#02040A" strokeWidth={14} strokeLinecap="round" fill="none" />
      </g>

      <circle
        cx={140}
        cy={175}
        r={70}
        stroke={colors.red}
        strokeWidth={3}
        opacity={0.25 + scan * 0.35}
        fill="none"
      />
    </svg>
  );
};
