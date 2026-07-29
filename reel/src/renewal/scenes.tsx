import { Img, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { PanicButtonIcon, PhoneIcon, BellIcon, WhatsAppIcon, ShieldIcon } from "../components/Icons";
import { colors } from "../brand";
import { fontFamily as bodyFont } from "../fonts";
import { condensedFont } from "../daily/typeFonts";
import { enterUp, popIn, pulse, bob } from "../animation";

const Headline: React.FC<{
  lines: { text: string; accent?: boolean }[];
  delay: number;
  size?: number;
}> = ({ lines, delay, size = 64 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ textAlign: "center" }}>
      {lines.map((line, i) => {
        const d = delay + i * 6;
        const { opacity, translateY } = enterUp(frame, d, 16, 34);
        return (
          <div
            key={i}
            style={{
              opacity,
              translate: `0 ${translateY}px`,
              fontFamily: condensedFont,
              fontWeight: 800,
              fontSize: size,
              lineHeight: 0.98,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              color: line.accent ? colors.blueGlow : colors.white,
            }}
          >
            {line.text}
          </div>
        );
      })}
    </div>
  );
};

const Kicker: React.FC<{ children: React.ReactNode; delay: number; color?: string }> = ({
  children,
  delay,
  color = colors.blueGlow,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        opacity,
        fontFamily: bodyFont,
        fontWeight: 700,
        fontSize: 26,
        letterSpacing: 5,
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </div>
  );
};

// ---------- Scene 1: old system hook ----------
export const SCENE_1_DURATION = 130;

const PainRow: React.FC<{ icon: React.FC<{ size?: number; color?: string }>; text: string; delay: number }> = ({
  icon: Icon,
  text,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 14, 26);
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${colors.textFaint}44`,
        borderRadius: 16,
        padding: "14px 26px",
      }}
    >
      <Icon size={26} color={colors.textFaint} />
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 28,
          color: colors.textMuted,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Scene1Old: React.FC = () => {
  const frame = useCurrentFrame();
  const iconOpacity = interpolate(frame, [0, 16], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Background variant="night">
      <GlowOrb size={560} top={-120} left={260} color={colors.textFaint} opacity={0.12} />
      <Stage gap={26} padTop={180} padBottom={110}>
        <div style={{ opacity: iconOpacity }}>
          <PanicButtonIcon size={70} color={colors.textFaint} />
        </div>
        <Kicker delay={6} color={colors.textFaint}>
          Sistema viejo
        </Kicker>
        <Headline size={58} delay={16} lines={[{ text: "¿Tu alarma ya" }, { text: "no da más?" }]} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16, width: "100%" }}>
          <PainRow icon={PhoneIcon} text="Sin control desde el celular" delay={56} />
          <PainRow icon={BellIcon} text="Sin monitoreo ni actualizaciones" delay={78} />
          <PainRow icon={PanicButtonIcon} text="Difícil de operar" delay={100} />
        </div>
      </Stage>
    </Background>
  );
};

// ---------- Scene 2: bridge ----------
export const SCENE_2_DURATION = 80;

export const Scene2Bridge: React.FC = () => {
  const frame = useCurrentFrame();
  const shield = popIn(frame, 4, 20);
  const glow = pulse(frame, 40, 0.5, 1);

  return (
    <Background variant="vertical">
      <GlowOrb size={680} top={200} left={190} color={colors.blue} opacity={0.15 + glow * 0.12} />
      <Stage gap={22}>
        <div style={{ scale: shield.scale, opacity: shield.opacity }}>
          <ShieldIcon size={64} color={colors.blueGlow} />
        </div>
        <Headline
          size={62}
          delay={16}
          lines={[{ text: "Es hora de" }, { text: "renovarlo.", accent: true }]}
        />
      </Stage>
    </Background>
  );
};

// ---------- Scene 3: phone arm/disarm demo ----------
export const SCENE_3_DURATION = 300;

const TAP_DELAY = 90;
const CONFIRM_DELAY = 108;

const TapRipple: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const period = 46;
  const cycle = local % period;
  const scale = interpolate(cycle, [0, period], [0.5, 2.4], {
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(cycle, [0, 6, period], [0, 0.55, 0], {
    extrapolateRight: "clamp",
  });
  const started = local >= 0 && frame >= delay;
  return started ? (
    <div
      style={{
        position: "absolute",
        left: "49.7%",
        top: "52%",
        width: 70,
        height: 70,
        marginLeft: -35,
        marginTop: -35,
        borderRadius: "50%",
        border: `3px solid ${colors.white}`,
        scale,
        opacity,
      }}
    />
  ) : null;
};

const StatusChip: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const beforeOpacity = interpolate(frame, [30, 42, CONFIRM_DELAY, CONFIRM_DELAY + 10], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterOpacity = interpolate(frame, [CONFIRM_DELAY + 6, CONFIRM_DELAY + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterScale = interpolate(frame, [CONFIRM_DELAY + 6, CONFIRM_DELAY + 20], [0.85, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", left: "50%", top: "10%", translate: "-50% 0" }}>
      <div
        style={{
          position: "absolute",
          opacity: beforeOpacity,
          whiteSpace: "nowrap",
          background: "rgba(6,15,38,0.85)",
          border: `1px solid ${colors.teal}77`,
          borderRadius: 30,
          padding: "10px 22px",
          fontFamily: condensedFont,
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: colors.teal,
          translate: "-50% 0",
          left: "50%",
        }}
      >
        Estado: Desarmado
      </div>
      <div
        style={{
          opacity: afterOpacity,
          scale: afterScale,
          whiteSpace: "nowrap",
          background: colors.red,
          borderRadius: 30,
          padding: "10px 24px",
          fontFamily: condensedFont,
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: colors.white,
          boxShadow: `0 0 30px ${colors.red}88`,
        }}
      >
        ✓ Armado Ausente
      </div>
    </div>
  );
};

export const Scene3Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { opacity, scale } = popIn(frame, 4, 22);
  const floatY = bob(frame, 110, 6);
  const { opacity: capOpacity, translateY: capY } = enterUp(frame, 190, 16, 24);

  return (
    <Background variant="night">
      <GlowOrb size={600} top={-140} left={220} color={colors.blue} opacity={0.18} />
      <Stage gap={20} padTop={110} padBottom={80}>
        <Kicker delay={2}>Así de fácil</Kicker>
        <Headline size={46} delay={8} lines={[{ text: "Armá y desarmá" }, { text: "desde tu celular", accent: true }]} />

        <div
          style={{
            position: "relative",
            opacity,
            transform: `scale(${scale}) translateY(${floatY}px)`,
            width: 300,
            marginTop: 8,
            filter: `drop-shadow(0 0 40px ${colors.blue}55)`,
          }}
        >
          <Img src={staticFile("app-arm-disarm.png")} style={{ width: "100%", height: "auto", display: "block" }} />
          <TapRipple delay={TAP_DELAY} />
          <StatusChip delay={CONFIRM_DELAY} />
        </div>

        <div style={{ opacity: capOpacity, translate: `0 ${capY}px`, marginTop: 4 }}>
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 28,
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            Un toque. Desde cualquier lugar.
          </div>
        </div>
      </Stage>
    </Background>
  );
};

// ---------- Scene 4: CTA ----------
export const SCENE_4_DURATION = 150;

export const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const logo = popIn(frame, 2, 16);
  const button = popIn(frame, 24, 18);
  const glow = pulse(frame, 40, 0.5, 1);

  return (
    <Background variant="vertical">
      <GlowOrb size={700} top={-160} left={190} color={colors.blue} opacity={0.24} />
      <Stage gap={22} padTop={220} padBottom={170}>
        <Headline size={46} delay={0} lines={[{ text: "Renová tu sistema" }, { text: "hoy mismo.", accent: true }]} />

        <div style={{ scale: logo.scale, opacity: logo.opacity, marginTop: 16 }}>
          <Logo width={300} />
        </div>

        <div
          style={{
            scale: button.scale,
            opacity: button.opacity,
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            gap: 20,
            background: "#25D366",
            borderRadius: 32,
            padding: "20px 42px",
            boxShadow: `0 0 ${30 + glow * 30}px #25D36688`,
          }}
        >
          <WhatsAppIcon size={42} color={colors.navyDeepest} glyphColor={colors.white} />
          <div style={{ fontFamily: condensedFont, fontWeight: 800, fontSize: 36, color: colors.navyDeepest }}>
            3444-532519
          </div>
        </div>
        <div
          style={{
            opacity: button.opacity,
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 25,
            color: colors.textMuted,
          }}
        >
          Escribinos por WhatsApp
        </div>
      </Stage>
    </Background>
  );
};
