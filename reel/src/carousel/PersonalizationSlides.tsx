import { AbsoluteFill } from "remotion";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { HouseIcon, SensorIcon, CameraIcon, ShieldIcon } from "../components/Icons";
import { colors } from "../brand";
import { fontFamily as bodyFont } from "../fonts";
import { condensedFont } from "../daily/typeFonts";
import { DotGrid, SlideKicker, SlideHeadline, SlideNumber, SlideFooter, PhotoBackdrop } from "./shared";

// 4:5 Instagram carousel — Pilar: Producto | Tema: personalización de la
// instalación | Objetivo: consideración | Idea creativa: infografía
// educativa, "consultá cuál kit es ideal para vos". No CTA slide — the
// client already has one — so slide 4 closes the narrative softly instead
// of repeating a WhatsApp button.

// ---------- Slide 1: hook ----------
export const Personalization1Hook: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop src="house-photo.png" brightness={0.4} saturate={0.35} />
    <DotGrid />
    <SlideNumber n={1} />
    <Stage gap={22} justify="flex-end" padTop={90} padBottom={230}>
      <SlideKicker>Personalización</SlideKicker>
      <SlideHeadline
        size={58}
        lines={[{ text: "Cada espacio" }, { text: "es único.", accent: true }]}
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
        Por eso tu alarma también debería serlo. En Central Vigía no instalamos
        alarmas genéricas: diseñamos cada sistema a medida.
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);

// ---------- Slide 2: what we evaluate ----------
const FactorRow: React.FC<{
  icon: React.FC<{ size?: number; color?: string }>;
  title: string;
  detail: string;
}> = ({ icon: Icon, title, detail }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 18,
      background: "rgba(255,255,255,0.06)",
      border: `1px solid ${colors.blueGlow}44`,
      borderRadius: 18,
      padding: "18px 24px",
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "rgba(91,143,232,0.16)",
        border: `2px solid ${colors.blueGlow}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={24} color={colors.blueGlow} />
    </div>
    <div>
      <div
        style={{
          fontFamily: condensedFont,
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: 0.3,
          textTransform: "uppercase",
          color: colors.white,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 21, color: colors.textMuted, lineHeight: 1.3 }}>
        {detail}
      </div>
    </div>
  </div>
);

export const Personalization2Factors: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop
      src="system-lineup.png"
      brightness={0.2}
      saturate={0.45}
      scrim={`linear-gradient(180deg, rgba(6,15,38,0.78) 0%, rgba(6,15,38,0.88) 45%, rgba(6,15,38,0.97) 100%)`}
    />
    <DotGrid />
    <SlideNumber n={2} />

    <Stage gap={22} padTop={110} padBottom={130}>
      <SlideKicker>Infografía</SlideKicker>
      <SlideHeadline size={46} lines={[{ text: "¿Qué evaluamos para" }, { text: "armar tu kit?", accent: true }]} />

      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", marginTop: 10 }}>
        <FactorRow
          icon={HouseIcon}
          title="Tamaño del espacio"
          detail="Metros cuadrados y distribución de ambientes."
        />
        <FactorRow
          icon={SensorIcon}
          title="Accesos"
          detail="Cantidad de puertas y ventanas a cubrir."
        />
        <FactorRow
          icon={CameraIcon}
          title="Zonas a proteger"
          detail="Interior, perímetro o exterior."
        />
        <FactorRow
          icon={ShieldIcon}
          title="Uso del inmueble"
          detail="Hogar, local comercial u oficina."
        />
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);

// ---------- Slide 3: kit comparison ----------
const KitCard: React.FC<{ name: string; profile: string; features: string; accent?: boolean }> = ({
  name,
  profile,
  features,
  accent = false,
}) => (
  <div
    style={{
      background: accent ? "rgba(91,143,232,0.12)" : "rgba(255,255,255,0.05)",
      border: `1px solid ${accent ? colors.blueGlow : colors.blueGlow + "44"}`,
      borderRadius: 18,
      padding: "20px 24px",
    }}
  >
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
      <div
        style={{
          fontFamily: condensedFont,
          fontWeight: 800,
          fontSize: 30,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: accent ? colors.blueGlow : colors.white,
        }}
      >
        {name}
      </div>
      <div style={{ fontFamily: bodyFont, fontWeight: 600, fontSize: 19, color: colors.textFaint }}>{profile}</div>
    </div>
    <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 21, color: colors.textMuted, lineHeight: 1.35 }}>
      {features}
    </div>
  </div>
);

export const Personalization3Kits: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop
      src="camera-device.png"
      brightness={0.22}
      saturate={0.5}
      scrim={`linear-gradient(180deg, rgba(6,15,38,0.8) 0%, rgba(6,15,38,0.9) 45%, rgba(6,15,38,0.97) 100%)`}
    />
    <GlowOrb size={600} top={-140} left={220} color={colors.blue} opacity={0.16} />
    <DotGrid />
    <SlideNumber n={3} />

    <Stage gap={22} padTop={120} padBottom={130}>
      <SlideKicker>Educativo</SlideKicker>
      <SlideHeadline size={44} lines={[{ text: "3 kits, pensados" }, { text: "para cada espacio.", accent: true }]} />

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", marginTop: 10 }}>
        <KitCard
          name="Kit Hogar"
          profile="Depto o casa chica"
          features="Sensores de apertura, 1 cámara y panel de control básico."
        />
        <KitCard
          name="Kit Hogar+"
          profile="Casa grande o PH"
          features="Suma cámaras exteriores, sirena y control remoto por app."
          accent
        />
        <KitCard
          name="Kit Negocio"
          profile="Local u oficina"
          features="Cobertura perimetral, múltiples zonas y monitoreo prioritario."
        />
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);

// ---------- Slide 4: how we design it (soft close, no CTA) ----------
const ProcessStep: React.FC<{ n: number; text: string }> = ({ n, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: "rgba(91,143,232,0.16)",
        border: `2px solid ${colors.blueGlow}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontFamily: condensedFont,
        fontWeight: 800,
        fontSize: 22,
        color: colors.blueGlow,
      }}
    >
      {n}
    </div>
    <div style={{ fontFamily: bodyFont, fontWeight: 600, fontSize: 26, color: colors.white }}>{text}</div>
  </div>
);

export const Personalization4Process: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop
      src="house-system-full.png"
      brightness={0.36}
      saturate={0.5}
      scrim={`linear-gradient(180deg, rgba(6,15,38,0.55) 0%, rgba(6,15,38,0.72) 45%, rgba(6,15,38,0.94) 100%)`}
    />
    <GlowOrb size={620} top={-150} left={220} color={colors.blue} opacity={0.16} />
    <DotGrid />
    <SlideNumber n={4} />

    <Stage gap={26} padTop={130} padBottom={150}>
      <SlideKicker>Así lo hacemos</SlideKicker>
      <SlideHeadline size={44} lines={[{ text: "Tu instalación," }, { text: "diseñada a medida.", accent: true }]} />

      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", marginTop: 14 }}>
        <ProcessStep n={1} text="Evaluamos tu espacio" />
        <ProcessStep n={2} text="Diseñamos el kit ideal" />
        <ProcessStep n={3} text="Instalamos y activamos el monitoreo" />
      </div>

      <div
        style={{
          marginTop: 18,
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 28,
          color: colors.textMuted,
          textAlign: "center",
          maxWidth: 780,
        }}
      >
        Consultá cuál es el kit ideal para tu hogar o negocio.
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);
