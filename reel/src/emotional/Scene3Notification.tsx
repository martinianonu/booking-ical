import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { fontFamily } from "../fonts";
import { colors } from "../brand";
import { ShieldIcon } from "../components/Icons";
import { enterUp } from "../animation";

export const SCENE_DURATION = 75;

export const Scene3Notification: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const kenBurns = interpolate(frame, [0, SCENE_DURATION], [1.05, 1.16], {
    easing: Easing.out(Easing.cubic),
  });
  const { opacity: cardOpacity, translateY: cardY } = enterUp(frame, 8, 16, -60);
  const glow = interpolate(Math.sin(frame / 6), [-1, 1], [0.5, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("person-phone.png")}
          style={{ width, height, objectFit: "cover", scale: kenBurns }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(3,6,20,0.55) 0%, rgba(3,6,20,0.05) 24%, rgba(3,6,20,0.1) 60%, rgba(3,6,20,0.6) 100%)",
        }}
      />

      {/* notification card, floating above the phone */}
      <div
        style={{
          opacity: cardOpacity,
          translate: `0 ${cardY}px`,
          position: "absolute",
          left: 56,
          right: 56,
          top: 150,
          background: "rgba(255,255,255,0.98)",
          borderRadius: 26,
          padding: "26px 26px 30px",
          boxShadow: `0 0 ${40 + glow * 30}px ${colors.blue}99`,
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
        <div style={{ fontFamily, fontWeight: 700, fontSize: 30, color: "#161C33", lineHeight: 1.3 }}>
          Sonó tu alarma.
          <br />
          Te enviamos el móvil.
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
    </AbsoluteFill>
  );
};
