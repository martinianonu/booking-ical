import { AbsoluteFill, Img, staticFile } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { IntrusionOverlay } from "../components/IntrusionOverlay";
import { OperatorSilhouette } from "../components/OperatorSilhouette";
import { SensorIcon, HeadsetIcon, PhoneIcon, WhatsAppIcon } from "../components/Icons";
import { colors } from "../brand";
import { fontFamily as bodyFont } from "../fonts";
import { condensedFont } from "../daily/typeFonts";

// Static (non-animated) 4:5 carousel slides for Instagram feed, reusing the
// same narrative arc and visual language as the 60s WhatsApp ad: hook,
// problem, solution, call-to-action.

const SlideKicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = colors.blueGlow,
}) => (
  <div
    style={{
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

const SlideHeadline: React.FC<{ lines: { text: string; accent?: boolean }[]; size?: number }> = ({
  lines,
  size = 66,
}) => (
  <div>
    {lines.map((line, i) => (
      <div
        key={i}
        style={{
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
    ))}
  </div>
);

const SlideNumber: React.FC<{ n: number }> = ({ n }) => (
  <div
    style={{
      position: "absolute",
      top: 64,
      right: 64,
      fontFamily: condensedFont,
      fontWeight: 700,
      fontSize: 30,
      color: colors.textFaint,
      letterSpacing: 1,
    }}
  >
    {n}/4
  </div>
);

// ---------- Slide 1: hook ----------
export const Slide1Hook: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile("house-photo.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.42) saturate(0.35)" }}
      />
    </AbsoluteFill>
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, rgba(3,6,20,0.35) 0%, rgba(3,6,20,0.55) 55%, rgba(3,6,20,0.85) 100%)`,
      }}
    />
    <SlideNumber n={1} />
    <Stage gap={22} justify="flex-end" padTop={90} padBottom={150}>
      <SlideKicker>Central Vigía</SlideKicker>
      <SlideHeadline
        size={64}
        lines={[{ text: "¿Una sirena alcanza" }, { text: "para protegerte?", accent: true }]}
      />
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.35,
          color: colors.textMuted,
          maxWidth: 780,
        }}
      >
        Una sirena sola no siempre es suficiente para proteger tu casa o tu negocio.
      </div>
    </Stage>
  </AbsoluteFill>
);

// ---------- Slide 2: problem ----------
export const Slide2Problem: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile("house-photo.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4) saturate(0.32)" }}
      />
    </AbsoluteFill>
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, rgba(3,6,20,0.35) 0%, rgba(3,6,20,0.6) 55%, rgba(3,6,20,0.86) 100%)`,
      }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 32%, rgba(228,61,69,0.22) 0%, rgba(228,61,69,0) 48%)`,
      }}
    />
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: "-14%" }}>
      <IntrusionOverlay width={300} />
    </AbsoluteFill>
    <SlideNumber n={2} />

    <Stage gap={24} justify="flex-end" padTop={90} padBottom={150}>
      <SlideKicker color={colors.textFaint}>Alarma convencional</SlideKicker>
      <SlideHeadline size={56} lines={[{ text: "Solo emite" }, { text: "un sonido." }]} />
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 34,
          lineHeight: 1.35,
          color: colors.red,
          maxWidth: 780,
        }}
      >
        Y si nadie interviene, el problema sigue ahí.
      </div>
    </Stage>
  </AbsoluteFill>
);

// ---------- Slide 3: solution ----------
export const Slide3Solution: React.FC = () => (
  <Background variant="night">
    <GlowOrb size={640} top={-140} left={220} color={colors.blue} opacity={0.2} />
    <SlideNumber n={3} />

    <Stage gap={26} padTop={130} padBottom={90}>
      <SlideKicker>Monitoreo real</SlideKicker>
      <SlideHeadline
        size={54}
        lines={[{ text: "Cada evento, atendido" }, { text: "las 24 horas.", accent: true }]}
      />

      <div style={{ marginTop: 6 }}>
        <OperatorSilhouette width={420} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", marginTop: 4 }}>
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
              gap: 18,
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${colors.blueGlow}44`,
              borderRadius: 18,
              padding: "14px 26px",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(91,143,232,0.16)",
                border: `2px solid ${colors.blueGlow}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={22} color={colors.blueGlow} />
            </div>
            <div
              style={{
                fontFamily: condensedFont,
                fontWeight: 700,
                fontSize: 30,
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
  </Background>
);

// ---------- Slide 4: CTA ----------
export const Slide4CTA: React.FC = () => (
  <Background variant="vertical">
    <GlowOrb size={700} top={-160} left={190} color={colors.blue} opacity={0.24} />
    <SlideNumber n={4} />

    <Stage gap={28} padTop={220} padBottom={170}>
      <Logo width={380} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          background: "#25D366",
          borderRadius: 32,
          padding: "22px 40px",
          boxShadow: "0 0 50px #25D36688",
        }}
      >
        <WhatsAppIcon size={46} color={colors.navyDeepest} glyphColor={colors.white} />
        <div style={{ fontFamily: condensedFont, fontWeight: 800, fontSize: 40, color: colors.navyDeepest }}>
          3444-532519
        </div>
      </div>
      <div style={{ fontFamily: bodyFont, fontWeight: 600, fontSize: 28, color: colors.textMuted }}>
        Escribinos por WhatsApp
      </div>

      <div style={{ marginTop: 26, textAlign: "center" }}>
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
        <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 24, color: colors.textMuted, marginTop: 6 }}>
          Cuidándote hace más de 30 años.
        </div>
      </div>
    </Stage>
  </Background>
);
