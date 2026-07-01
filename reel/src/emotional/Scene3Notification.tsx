import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { fontFamily } from "../fonts";
import { colors } from "../brand";
import { Logo } from "../components/Logo";
import { ShieldIcon } from "../components/Icons";
import { enterUp } from "../animation";

export const SCENE_DURATION = 70;

export const Scene3Notification: React.FC = () => {
  const frame = useCurrentFrame();

  const phoneIn = interpolate(frame, [0, 18], [40, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const { opacity: cardOpacity, translateY: cardY } = enterUp(frame, 16, 16, -60);
  const glow = interpolate(Math.sin(frame / 6), [-1, 1], [0.5, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.navyLight} 0%, ${colors.navy} 55%, ${colors.navyDeepest} 100%)`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: phoneOpacity,
          translate: `0 ${phoneIn}px`,
          width: 640,
          height: 1360,
          borderRadius: 68,
          border: "14px solid #0A0D18",
          background: `linear-gradient(180deg, ${colors.navy}, ${colors.navyDeepest})`,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
        }}
      >
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            translate: "-50% 0",
            width: 220,
            height: 34,
            background: "#0A0D18",
            borderRadius: "0 0 20px 20px",
          }}
        />

        {/* lock + time */}
        <div style={{ textAlign: "center", marginTop: 130 }}>
          <svg width={30} height={34} viewBox="0 0 30 34" style={{ opacity: 0.85 }}>
            <rect x="4" y="15" width="22" height="17" rx="4" fill={colors.white} />
            <path
              d="M9 15 V10 C9 5.6 11.7 3 15 3 C18.3 3 21 5.6 21 10 V15"
              stroke={colors.white}
              strokeWidth={3.4}
              fill="none"
            />
          </svg>
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 96,
              color: colors.white,
              marginTop: 10,
              letterSpacing: -2,
            }}
          >
            03:14
          </div>
        </div>

        {/* notification card */}
        <div
          style={{
            opacity: cardOpacity,
            translate: `0 ${cardY}px`,
            position: "absolute",
            left: 30,
            right: 30,
            top: 430,
            background: "rgba(255,255,255,0.98)",
            borderRadius: 26,
            padding: "26px 26px 30px",
            boxShadow: `0 0 ${40 + glow * 30}px ${colors.blue}88`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: colors.blue,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ShieldIcon size={26} color={colors.white} />
            </div>
            <div style={{ fontFamily, fontWeight: 800, fontSize: 26, color: colors.navyDeepest }}>
              Central Vigía
            </div>
            <div style={{ marginLeft: "auto", fontFamily, fontSize: 20, color: "#9099B5" }}>
              ahora
            </div>
          </div>
          <div style={{ fontFamily, fontWeight: 600, fontSize: 24, color: "#222A45", lineHeight: 1.35 }}>
            ALERTA: Movimiento detectado
            <br />— Zona 1, Frente —
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                border: `2px solid ${colors.blue}`,
                color: colors.blue,
                borderRadius: 14,
                padding: "12px 0",
                fontFamily,
                fontWeight: 700,
                fontSize: 19,
              }}
            >
              VER EN APP
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                background: colors.blue,
                color: colors.white,
                borderRadius: 14,
                padding: "12px 0",
                fontFamily,
                fontWeight: 700,
                fontSize: 19,
              }}
            >
              LLAMAR CENTRAL
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 30, right: 24, width: 70 }}>
          <Logo width={70} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
