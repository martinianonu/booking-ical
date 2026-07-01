import { useCurrentFrame } from "remotion";
import { colors } from "../brand";
import { fontFamily } from "../fonts";
import { enterUp, pulse } from "../animation";
import { CameraIcon, HouseIcon, PanicButtonIcon } from "./Icons";

const StatusChip: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      color: colors.navyDeepest,
    }}
  >
    <div
      style={{
        width: 26,
        height: 26,
        borderRadius: 6,
        background: colors.teal,
        opacity: 0.85,
      }}
    />
    <div style={{ fontFamily: fontFamily, fontSize: 15, fontWeight: 600, color: "#3A4568" }}>
      {label}
    </div>
  </div>
);

const CamThumb: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 16, 18);
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        background: "linear-gradient(135deg, #1c2c57, #0c1330)",
        borderRadius: 10,
        padding: "10px 10px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <CameraIcon size={26} color={colors.blueGlow} />
      <div style={{ fontFamily: fontFamily, fontSize: 15, color: colors.white, fontWeight: 600 }}>
        {label}
      </div>
    </div>
  );
};

export const PhoneMockup: React.FC<{ delay?: number; scale?: number }> = ({
  delay = 0,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 26, 60);
  const glow = pulse(frame, 70, 0.55, 1);

  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        scale,
        width: 480,
        borderRadius: 48,
        border: `10px solid #101423`,
        background: "#0d1428",
        boxShadow: `0 0 ${70 + glow * 40}px ${colors.blue}55`,
        overflow: "hidden",
      }}
    >
      {/* top bar */}
      <div
        style={{
          background: colors.navy,
          padding: "22px 26px 16px",
        }}
      >
        <div
          style={{
            fontFamily: fontFamily,
            fontWeight: 900,
            color: colors.white,
            fontSize: 22,
            letterSpacing: 0.5,
          }}
        >
          CENTRAL <span style={{ color: colors.blueGlow }}>VIGIA</span>
        </div>
        <div style={{ display: "flex", gap: 26, marginTop: 14 }}>
          <StatusChip label="Batería" />
          <StatusChip label="WiFi" />
          <StatusChip label="4G" />
        </div>
      </div>

      {/* body */}
      <div style={{ background: "#eef1f8", padding: "30px 26px 26px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginBottom: 22,
          }}
        >
          <HouseIcon size={46} color={colors.teal} />
          <div style={{ fontFamily: fontFamily, fontWeight: 700, fontSize: 26, color: colors.teal }}>
            DESARMADO
          </div>
        </div>

        <div
          style={{
            background: colors.red,
            borderRadius: 16,
            padding: "16px 0",
            textAlign: "center",
            fontFamily: fontFamily,
            fontWeight: 700,
            fontSize: 21,
            color: colors.white,
            marginBottom: 12,
          }}
        >
          ARMAR AUSENTE
        </div>
        <div
          style={{
            background: colors.amber,
            borderRadius: 16,
            padding: "16px 0",
            textAlign: "center",
            fontFamily: fontFamily,
            fontWeight: 700,
            fontSize: 21,
            color: colors.navyDeepest,
            marginBottom: 22,
          }}
        >
          ARMAR PRESENTE
        </div>

        <div
          style={{
            fontFamily: fontFamily,
            fontWeight: 700,
            fontSize: 17,
            color: "#3A4568",
            marginBottom: 10,
          }}
        >
          CÁMARAS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <CamThumb label="Frente" delay={delay + 30} />
          <CamThumb label="Entrada" delay={delay + 38} />
          <CamThumb label="Patio" delay={delay + 46} />
          <CamThumb label="Garaje" delay={delay + 54} />
        </div>
      </div>
    </div>
  );
};

export const PanicNotification: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 18, -40);
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "rgba(255,255,255,0.08)",
        border: `1px solid ${colors.blueGlow}55`,
        borderRadius: 20,
        padding: "16px 22px",
      }}
    >
      <PanicButtonIcon size={34} color={colors.red} />
      <div style={{ fontFamily: fontFamily, color: colors.white, fontWeight: 600, fontSize: 22 }}>
        Botón de pánico activado
      </div>
    </div>
  );
};
