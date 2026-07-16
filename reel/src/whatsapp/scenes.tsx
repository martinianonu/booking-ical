import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { IntrusionOverlay } from "../components/IntrusionOverlay";
import { OperatorSilhouette } from "../components/OperatorSilhouette";
import { CarPhoto } from "../components/CarPhoto";
import {
  SensorIcon,
  HeadsetIcon,
  PhoneIcon,
  CheckIcon,
  BoltIcon,
  WhatsAppIcon,
} from "../components/Icons";
import { colors } from "../brand";
import { fontFamily as bodyFont } from "../fonts";
import { condensedFont } from "../daily/typeFonts";
import { enterUp, popIn, pulse } from "../animation";
import { BigHeadline, Caption, BulletRow } from "./BigText";

// ---------- Scene 1 (0-5s): hook question over the house photo ----------
export const SCENE_1_DURATION = 150;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const kenBurns = interpolate(frame, [0, SCENE_1_DURATION], [1, 1.1], {
    easing: Easing.out(Easing.cubic),
  });
  const grade = interpolate(frame, [4, 26], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const vignette = interpolate(frame, [4, 26], [0, 0.72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("house-photo.png")}
          style={{
            width,
            height,
            objectFit: "cover",
            scale: kenBurns,
            filter: `brightness(${1 - grade * 0.55}) saturate(${1 - grade * 0.6})`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: colors.navy, mixBlendMode: "color", opacity: grade * 0.8 }} />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(3,6,20,${vignette * 0.55}) 0%, rgba(3,6,20,${
            0.35 + vignette * 0.35
          }) 55%, rgba(3,6,20,${0.55 + vignette * 0.35}) 100%)`,
        }}
      />

      <Stage gap={20} justify="flex-end" padTop={90} padBottom={140}>
        <div
          style={{
            opacity: interpolate(frame, [16, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: colors.blueGlow,
          }}
        >
          Central Vigía
        </div>
        <BigHeadline
          delay={34}
          size={70}
          lines={[{ text: "¿Una sirena alcanza" }, { text: "para protegerte?", accent: true }]}
        />
        <Caption
          delay={64}
          size={34}
          text="Una sirena sola no siempre es suficiente."
          maxWidth={820}
        />
      </Stage>
    </AbsoluteFill>
  );
};

// ---------- Scene 2 (5-15s): conventional alarm falls short ----------
export const SCENE_2_DURATION = 300;

export const Scene2Conventional: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const kenBurns = interpolate(frame, [0, SCENE_2_DURATION], [1.05, 1.16], {
    easing: Easing.out(Easing.cubic),
  });
  const danger = interpolate(frame, [0, 40], [0.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("house-photo.png")}
          style={{
            width,
            height,
            objectFit: "cover",
            scale: kenBurns,
            filter: "brightness(0.42) saturate(0.35)",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(3,6,20,0.35) 0%, rgba(3,6,20,0.55) 55%, rgba(3,6,20,0.82) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, rgba(228,61,69,${danger * 0.22}) 0%, rgba(228,61,69,0) 48%)`,
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: "-16%" }}>
        <div
          style={{
            opacity: interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <IntrusionOverlay width={340} />
        </div>
      </AbsoluteFill>

      <Stage gap={26} justify="flex-end" padTop={90} padBottom={150}>
        <div
          style={{
            opacity: interpolate(frame, [4, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: colors.textFaint,
          }}
        >
          Alarma convencional
        </div>
        <BigHeadline
          delay={20}
          size={62}
          lines={[{ text: "Cuando se activa," }, { text: "solo emite un sonido." }]}
        />
        <Caption
          delay={150}
          size={38}
          color={colors.red}
          text="Pero si nadie interviene, el problema sigue ahí."
          maxWidth={800}
        />
      </Stage>
    </AbsoluteFill>
  );
};

// ---------- Scene 3 (15-30s): monitored 24/7 ----------
export const SCENE_3_DURATION = 450;

export const Scene3Monitored: React.FC = () => {
  const frame = useCurrentFrame();
  const { opacity: opOpacity, translateY: opY } = enterUp(frame, 10, 14, 30);

  return (
    <Background variant="night">
      <GlowOrb size={640} top={-140} left={220} color={colors.blue} opacity={0.2} />

      <Stage gap={26} padTop={130} padBottom={90}>
        <div
          style={{
            opacity: interpolate(frame, [2, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: colors.blueGlow,
          }}
        >
          Monitoreo real
        </div>
        <BigHeadline
          delay={16}
          size={56}
          lines={[{ text: "Cada evento llega a una" }, { text: "central de monitoreo 24/7", accent: true }]}
        />

        <div style={{ opacity: opOpacity, translate: `0 ${opY}px`, marginTop: 4 }}>
          <OperatorSilhouette width={480} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", marginTop: 4 }}>
          <BulletRow icon={CheckIcon} text="Monitoreo 24/7" delay={210} />
          <BulletRow icon={CheckIcon} text="365 días del año" delay={240} />
        </div>
      </Stage>
    </Background>
  );
};

// ---------- Scene 4 (30-45s): protocol sequence ----------
export const SCENE_4_DURATION = 450;

const ProtocolStep: React.FC<{
  icon: React.FC<{ size?: number; color?: string }>;
  label: string;
  delay: number;
  index: number;
}> = ({ icon: Icon, label, delay, index }) => {
  const frame = useCurrentFrame();
  const { scale, opacity } = popIn(frame, delay, 16);
  const active = pulse(frame, 60, 0.7, 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: 150 }}>
      <div
        style={{
          scale,
          opacity,
          width: 84,
          height: 84,
          borderRadius: "50%",
          background: "rgba(91,143,232,0.14)",
          border: `3px solid ${colors.blueGlow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: index === 0 ? `0 0 ${20 + active * 20}px ${colors.blue}88` : undefined,
        }}
      >
        <Icon size={36} color={colors.white} />
      </div>
      <div
        style={{
          opacity,
          fontFamily: condensedFont,
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: colors.white,
          textAlign: "center",
          lineHeight: 1.15,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Scene4Protocol: React.FC = () => {
  const frame = useCurrentFrame();
  const lineProgress = interpolate(frame, [30, 120], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Background variant="night">
      <GlowOrb size={620} top={200} left={-160} color={colors.blue} opacity={0.2} />

      <Stage gap={30} padTop={140} padBottom={90}>
        <div
          style={{
            opacity: interpolate(frame, [2, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: colors.blueGlow,
          }}
        >
          Respuesta inmediata
        </div>
        <BigHeadline
          delay={16}
          size={52}
          lines={[{ text: "Protocolo de verificación" }, { text: "y respuesta inmediata", accent: true }]}
        />

        <div style={{ position: "relative", width: 780, marginTop: 10 }}>
          <div
            style={{
              position: "absolute",
              top: 42,
              left: 75,
              right: 75,
              height: 3,
              background: `linear-gradient(90deg, ${colors.blueGlow}00, ${colors.blueGlow}88 ${
                lineProgress * 100
              }%, ${colors.blueGlow}00 ${lineProgress * 100}%)`,
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ProtocolStep icon={SensorIcon} label="Detecta movimiento" delay={30} index={0} />
            <ProtocolStep icon={HeadsetIcon} label="Operador recibe alerta" delay={55} index={1} />
            <ProtocolStep icon={PhoneIcon} label="Contacta al cliente" delay={80} index={2} />
          </div>
        </div>

        <div style={{ marginTop: 6 }}>
          <CarPhoto delay={130} width={620} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", marginTop: 4 }}>
          <BulletRow icon={BoltIcon} text="Detección inmediata" delay={230} />
          <BulletRow icon={BoltIcon} text="Verificación del evento" delay={256} />
          <BulletRow icon={BoltIcon} text="Respuesta rápida" delay={282} />
        </div>
      </Stage>
    </Background>
  );
};

// ---------- Scene 5 (45-55s): true peace of mind ----------
export const SCENE_5_DURATION = 300;

export const Scene5Peace: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const kenBurns = interpolate(frame, [0, SCENE_5_DURATION], [1, 1.08], {
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("house-photo.png")}
          style={{ width, height, objectFit: "cover", scale: kenBurns, filter: "brightness(0.85) saturate(0.9)" }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(6,15,38,0.3) 0%, rgba(6,15,38,0.55) 55%, rgba(6,15,38,0.86) 100%)`,
        }}
      />

      <Stage gap={26} justify="flex-end" padTop={90} padBottom={150}>
        <BigHeadline
          delay={14}
          size={56}
          lines={[{ text: "La verdadera tranquilidad" }, { text: "no es tener una alarma.", accent: true }]}
        />
        <Caption
          delay={60}
          size={36}
          text="Es saber que hay profesionales atentos cuando más los necesitás."
          maxWidth={820}
        />
        <div
          style={{
            opacity: interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            marginTop: 6,
            background: "rgba(255,255,255,0.07)",
            border: `1px solid ${colors.blueGlow}55`,
            borderRadius: 40,
            padding: "14px 30px",
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 28,
            color: colors.white,
          }}
        >
          Tranquilidad para tu hogar y tu negocio
        </div>
      </Stage>
    </AbsoluteFill>
  );
};

// ---------- Scene 6 (55-60s): WhatsApp CTA ----------
export const SCENE_6_DURATION = 150;

export const Scene6WhatsApp: React.FC = () => {
  const frame = useCurrentFrame();
  const logo = popIn(frame, 2, 16);
  const button = popIn(frame, 24, 18);
  const glow = pulse(frame, 40, 0.5, 1);
  const closing = enterUp(frame, 90, 14, 20);

  return (
    <Background variant="vertical">
      <GlowOrb size={700} top={-160} left={190} color={colors.blue} opacity={0.24} />

      <Stage gap={28} padTop={220} padBottom={170}>
        <div style={{ scale: logo.scale, opacity: logo.opacity }}>
          <Logo width={380} />
        </div>

        <div
          style={{
            scale: button.scale,
            opacity: button.opacity,
            display: "flex",
            alignItems: "center",
            gap: 20,
            background: "#25D366",
            borderRadius: 32,
            padding: "22px 40px",
            boxShadow: `0 0 ${30 + glow * 30}px #25D36688`,
          }}
        >
          <WhatsAppIcon size={46} color={colors.navyDeepest} glyphColor={colors.white} />
          <div
            style={{
              fontFamily: condensedFont,
              fontWeight: 800,
              fontSize: 40,
              letterSpacing: 0.5,
              color: colors.navyDeepest,
            }}
          >
            3444-532519
          </div>
        </div>
        <div
          style={{
            opacity: button.opacity,
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 28,
            color: colors.textMuted,
          }}
        >
          Escribinos por WhatsApp
        </div>

        <div
          style={{
            opacity: closing.opacity,
            translate: `0 ${closing.translateY}px`,
            marginTop: 26,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: condensedFont,
              fontWeight: 800,
              fontSize: 34,
              letterSpacing: 1,
              color: colors.white,
            }}
          >
            CENTRAL VIGÍA
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 24,
              color: colors.textMuted,
              marginTop: 6,
            }}
          >
            Cuidándote hace más de 30 años.
          </div>
        </div>
      </Stage>
    </Background>
  );
};
