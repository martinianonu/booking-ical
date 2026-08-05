import { AbsoluteFill } from "remotion";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { IntrusionOverlay } from "../components/IntrusionOverlay";
import { OperatorSilhouette } from "../components/OperatorSilhouette";
import { SensorIcon, HeadsetIcon, PhoneIcon, WhatsAppIcon } from "../components/Icons";
import { colors } from "../brand";
import { fontFamily as bodyFont } from "../fonts";
import { condensedFont } from "../daily/typeFonts";
import { DotGrid, SlideKicker, SlideHeadline, SlideNumber, SlideFooter, PhotoBackdrop } from "./shared";

// Static (non-animated) 4:5 carousel slides for Instagram feed, reusing the
// same narrative arc and visual language as the 60s WhatsApp ad: hook,
// problem, solution, call-to-action. Every slide shares the same photo-
// backed treatment, dot grid, and closing brand footer so the four read as
// one consistent, professional set rather than four separate looks.

// ---------- Slide 1: hook ----------
export const Slide1Hook: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop src="house-photo.png" brightness={0.42} saturate={0.35} />
    <DotGrid />
    <SlideNumber n={1} />
    <Stage gap={22} justify="flex-end" padTop={90} padBottom={230}>
      <SlideKicker>Central Vigía</SlideKicker>
      <SlideHeadline
        size={62}
        lines={[{ text: "¿Una sirena alcanza" }, { text: "para protegerte?", accent: true }]}
      />
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 30,
          lineHeight: 1.35,
          color: colors.textMuted,
          maxWidth: 780,
        }}
      >
        Una sirena sola no siempre es suficiente para proteger tu casa o tu negocio.
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);

// ---------- Slide 2: problem ----------
export const Slide2Problem: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop
      src="house-photo.png"
      brightness={0.4}
      saturate={0.32}
      scrim={`linear-gradient(180deg, rgba(6,15,38,0.4) 0%, rgba(6,15,38,0.65) 55%, rgba(6,15,38,0.93) 100%)`}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, rgba(228,61,69,0.2) 0%, rgba(228,61,69,0) 46%)`,
      }}
    />
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: "-16%" }}>
      <IntrusionOverlay width={280} />
    </AbsoluteFill>
    <DotGrid />
    <SlideNumber n={2} />

    <Stage gap={24} justify="flex-end" padTop={90} padBottom={230}>
      <SlideKicker color={colors.textFaint}>Alarma convencional</SlideKicker>
      <SlideHeadline size={54} lines={[{ text: "Solo emite" }, { text: "un sonido." }]} />
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 32,
          lineHeight: 1.35,
          color: colors.red,
          maxWidth: 780,
        }}
      >
        Y si nadie interviene, el problema sigue ahí.
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);

// ---------- Slide 3: solution ----------
export const Slide3Solution: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop
      src="system-lineup.png"
      brightness={0.28}
      saturate={0.55}
      scrim={`linear-gradient(180deg, rgba(6,15,38,0.72) 0%, rgba(6,15,38,0.86) 45%, rgba(6,15,38,0.97) 100%)`}
    />
    <GlowOrb size={600} top={-140} left={220} color={colors.blue} opacity={0.18} />
    <DotGrid />
    <SlideNumber n={3} />

    <Stage gap={24} padTop={120} padBottom={130}>
      <SlideKicker>Monitoreo real</SlideKicker>
      <SlideHeadline
        size={50}
        lines={[{ text: "Cada evento, atendido" }, { text: "las 24 horas.", accent: true }]}
      />

      <div style={{ marginTop: 2 }}>
        <OperatorSilhouette width={380} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", marginTop: 2 }}>
        {[
          { icon: SensorIcon, text: "Detección inmediata" },
          { icon: HeadsetIcon, text: "Verificación del evento" },
          { icon: PhoneIcon, text: "Respuesta rápida" },
        ].map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "rgba(255,255,255,0.07)",
              border: `1px solid ${colors.blueGlow}44`,
              borderRadius: 16,
              padding: "12px 24px",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(91,143,232,0.18)",
                border: `2px solid ${colors.blueGlow}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={20} color={colors.blueGlow} />
            </div>
            <div
              style={{
                fontFamily: condensedFont,
                fontWeight: 700,
                fontSize: 27,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                color: colors.white,
              }}
            >
              {text}
            </div>
          </div>
        ))}
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);

// ---------- Slide 4: CTA ----------
export const Slide4CTA: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop
      src="house-system-full.png"
      brightness={0.38}
      saturate={0.5}
      scrim={`linear-gradient(180deg, rgba(6,15,38,0.55) 0%, rgba(6,15,38,0.7) 40%, rgba(6,15,38,0.94) 100%)`}
    />
    <GlowOrb size={640} top={-150} left={220} color={colors.blue} opacity={0.16} />
    <DotGrid />
    <SlideNumber n={4} />

    <Stage gap={0} padTop={140} padBottom={130}>
      <Logo width={320} />

      <div style={{ height: 1, width: 120, background: `${colors.blueGlow}55`, margin: "32px 0 28px" }} />

      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 25,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: colors.blueGlow,
          marginBottom: 14,
        }}
      >
        Más de 30 años de experiencia
      </div>

      <SlideHeadline size={42} lines={[{ text: "Pedí tu asesoramiento" }, { text: "sin cargo.", accent: true }]} />

      <div
        style={{
          marginTop: 32,
          display: "flex",
          alignItems: "center",
          gap: 20,
          background: "#25D366",
          borderRadius: 32,
          padding: "20px 42px",
          boxShadow: "0 12px 50px #25D36655",
        }}
      >
        <WhatsAppIcon size={42} color={colors.navyDeepest} glyphColor={colors.white} />
        <div style={{ fontFamily: condensedFont, fontWeight: 800, fontSize: 36, color: colors.navyDeepest }}>
          3444-532519
        </div>
      </div>
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 25,
          color: colors.textMuted,
          marginTop: 16,
        }}
      >
        Escribinos por WhatsApp
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);
