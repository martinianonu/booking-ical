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

export const CheckIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <path d="M10 25 L19 34 L38 14" />
  </svg>
);

export const BoltIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = colors.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...stroke(color)}>
    <path d="M26 4 L11 27 H22 L20 44 L38 19 H27 Z" strokeLinejoin="round" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ size?: number; color?: string; glyphColor?: string }> = ({
  size = 44,
  color = colors.white,
  glyphColor = colors.navyDeepest,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path
      d="M24 6 C14.6 6 7 13.6 7 23 C7 26.1 7.8 29 9.4 31.5 L7 42 L17.8 39.7 C20.2 41 22.5 41.9 24 41.9 C33.4 41.9 41 34.3 41 24.9 C41 15.5 33.4 6 24 6 Z"
      fill={color}
    />
    <path
      d="M17.6 15.9 C17.1 15.9 16.4 16 15.8 16.7 C15.3 17.4 13.8 18.7 13.8 21.5 C13.8 24.3 15.9 26.9 16.2 27.3 C16.5 27.7 20 33.4 25.6 35.6 C30.3 37.4 31.2 37 32.2 36.9 C33.2 36.8 35.4 35.6 35.9 34.3 C36.3 33 36.3 31.9 36.2 31.6 C36 31.4 35.6 31.2 34.9 30.9 C34.3 30.6 31.3 29.1 30.7 28.9 C30.1 28.7 29.7 28.6 29.3 29.2 C28.9 29.8 27.8 31.1 27.4 31.5 C27.1 31.9 26.8 32 26.2 31.7 C25.6 31.4 23.6 30.7 21.2 28.6 C19.3 26.9 18 24.9 17.7 24.3 C17.4 23.7 17.7 23.4 18 23.1 C18.3 22.8 18.6 22.4 18.9 22 C19.2 21.7 19.3 21.4 19.5 21 C19.7 20.6 19.6 20.2 19.5 19.9 C19.3 19.6 18 16.6 17.6 15.9 Z"
      fill={glyphColor}
    />
  </svg>
);
