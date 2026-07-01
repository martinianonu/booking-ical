import { colors } from "../brand";

export const IconCircle: React.FC<{
  size?: number;
  color?: string;
  bg?: string;
  children: React.ReactNode;
}> = ({ size = 96, color = colors.blueGlow, bg = "rgba(95,160,255,0.12)", children }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        border: `3px solid ${color}`,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

const stroke = (color: string) => ({
  fill: "none",
  stroke: color,
  strokeWidth: 5.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const ShieldIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <path d="M24 5 L41 12 V23 C41 33 34 40 24 43 C14 40 7 33 7 23 V12 Z" />
    <path d="M16 24 L21.5 29.5 L33 17" />
  </svg>
);

export const HouseIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <path d="M7 24 L24 9 L41 24" />
    <path d="M12 20 V41 H36 V20" />
    <path d="M20 41 V29 H28 V41" />
  </svg>
);

export const BellIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <path d="M12 34 V21 C12 13.8 17.4 9 24 9 C30.6 9 36 13.8 36 21 V34 L41 39 H7 Z" />
    <path d="M19 39 C19 42 21.2 44 24 44 C26.8 44 29 42 29 39" />
  </svg>
);

export const HeadsetIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <path d="M8 26 V23 C8 13.6 15.2 6 24 6 C32.8 6 40 13.6 40 23 V26" />
    <rect x="5" y="26" width="10" height="14" rx="4" />
    <rect x="33" y="26" width="10" height="14" rx="4" />
    <path d="M40 33 V35 C40 39.4 36.4 42 32 42 H27" />
  </svg>
);

export const CarIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <path d="M6 30 L9 19 C10 16 12.5 14 15.5 14 H32.5 C35.5 14 38 16 39 19 L42 30" />
    <path d="M4 30 H44 V36 H4 Z" />
    <circle cx="13" cy="36" r="4" fill={color} stroke="none" />
    <circle cx="35" cy="36" r="4" fill={color} stroke="none" />
    <path d="M9 22 H39" />
  </svg>
);

export const PhoneIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <rect x="13" y="4" width="22" height="40" rx="5" />
    <path d="M21 38 H27" />
  </svg>
);

export const PanicButtonIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <circle cx="24" cy="24" r="18" />
    <circle cx="24" cy="24" r="9" fill={color} stroke="none" />
  </svg>
);

export const CameraIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <rect x="5" y="15" width="28" height="20" rx="4" />
    <path d="M33 21 L43 16 V34 L33 29" />
    <circle cx="19" cy="25" r="5" />
  </svg>
);

export const SensorIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <rect x="10" y="10" width="28" height="28" rx="6" />
    <circle cx="24" cy="24" r="6" fill={color} stroke="none" />
    <path d="M24 4 V9" />
    <path d="M24 39 V44" />
  </svg>
);
