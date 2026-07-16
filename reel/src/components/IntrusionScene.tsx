import { useCurrentFrame } from "remotion";
import { colors } from "../brand";
import { pulse } from "../animation";

// High-impact illustrated dramatization of a break-in attempt at night.
// Built as original vector art (no stock photo/video asset available in
// this environment) — swap for a real photo/clip if the client has one.
export const IntrusionScene: React.FC<{ width?: number }> = ({ width = 900 }) => {
  const frame = useCurrentFrame();
  const flicker = pulse(frame, 14, 0.75, 1);
  const breathe = pulse(frame, 70, 0, 1);
  const scan = pulse(frame, 130, 0, 1);

  return (
    <svg width={width} height={width * 0.78} viewBox="0 0 900 700" fill="none">
      <defs>
        <radialGradient id="moon" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#DCE6FF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#DCE6FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors.navy} />
          <stop offset="1" stopColor={colors.navyDeepest} />
        </linearGradient>
        <radialGradient id="beam" cx="0" cy="0.5" r="0.9">
          <stop offset="0" stopColor="#FFE8A3" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFE8A3" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* moon */}
      <circle cx={760} cy={90} r={110} fill="url(#moon)" />
      <circle cx={760} cy={90} r={34} fill="#EFF3FF" opacity={0.9} />

      {/* distant tree silhouettes */}
      <path d="M40 480 L40 620 M20 500 L60 500 M25 470 L55 470" stroke={colors.navyDeepest} strokeWidth={10} />

      {/* house silhouette */}
      <path
        d="M150 420 L340 300 L530 420 L530 620 L150 620 Z"
        fill={colors.navyDeepest}
      />
      <path d="M150 420 L340 300 L530 420" stroke="#000" strokeWidth={4} fill="none" />
      {/* unlit windows */}
      <rect x={195} y={460} width={70} height={90} rx={4} fill="#060A1C" stroke="#1B2A55" strokeWidth={3} />
      <rect x={420} y={460} width={70} height={90} rx={4} fill="#060A1C" stroke="#1B2A55" strokeWidth={3} />
      {/* the targeted window, glass cracked */}
      <g>
        <rect x={300} y={470} width={90} height={80} rx={4} fill="#0A1330" stroke="#2C3E72" strokeWidth={3} />
        <path
          d="M300 490 L340 505 L330 470 M330 470 L345 515 L390 500 M330 470 L320 550"
          stroke="#8FA8E8"
          strokeWidth={2}
          opacity={0.8}
        />
      </g>

      {/* ground */}
      <rect x={0} y={620} width={900} height={80} fill="url(#ground)" />

      {/* flashlight beam from intruder toward window */}
      <g opacity={flicker}>
        <path d="M255 585 L60 520 L60 650 Z" fill="url(#beam)" />
      </g>

      {/* intruder silhouette, crouched at the window */}
      <g transform={`translate(${230 + breathe * 2} 560)`}>
        <path
          d="M0 60 C -4 20 8 -10 34 -12 C 58 -14 70 6 66 34 C 64 52 50 66 30 66 C 14 66 2 60 0 60 Z"
          fill="#02040D"
        />
        {/* head */}
        <circle cx={40} cy={-30} r={20} fill="#02040D" />
        {/* arm reaching to window */}
        <path d="M58 10 C 30 0 10 -6 -6 -10" stroke="#02040D" strokeWidth={14} strokeLinecap="round" fill="none" />
        {/* flashlight in hand */}
        <rect x={-16} y={-16} width={16} height={7} rx={2} fill="#111" transform="rotate(-18 -16 -16)" />
      </g>

      {/* red motion-detection scan sweeping across the facade, foreshadowing detection */}
      <rect
        x={150 + scan * 380}
        y={300}
        width={6}
        height={320}
        fill={colors.red}
        opacity={0.55}
      />
      <circle cx={330} cy={505} r={70} stroke={colors.red} strokeWidth={2} opacity={0.25 + scan * 0.2} fill="none" />
    </svg>
  );
};
