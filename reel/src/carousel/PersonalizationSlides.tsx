import { AbsoluteFill } from "remotion";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { colors } from "../brand";
import { fontFamily as bodyFont } from "../fonts";
import { condensedFont } from "../daily/typeFonts";
import { DotGrid, SlideKicker, SlideHeadline, SlideNumber, SlideFooter, PhotoBackdrop } from "./shared";

// 4:5 Instagram carousel — Pilar: Producto | Tema: personalización de la
// instalación | Objetivo: consideración | Idea creativa: infografía
// educativa con tono más suelto/de venta consultiva, "consultá cuál kit
// es ideal para vos". No CTA slide — the client already has one — so
// slide 4 closes the narrative softly instead of repeating a WhatsApp
// button. Each slide uses a different real product/lifestyle photo.

// ---------- Slide 1: hook (playful analogy) ----------
export const Personalization1Hook: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop src="house-photo.png" brightness={0.4} saturate={0.35} />
    <DotGrid />
    <SlideNumber n={1} />
    <Stage gap={22} justify="flex-end" padTop={90} padBottom={230}>
      <SlideKicker>Ojo con esto</SlideKicker>
      <SlideHeadline
        size={54}
        lines={[{ text: "Tu casa no es" }, { text: "un depto en serie.", accent: true }]}
      />
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 29,
          lineHeight: 1.4,
          color: colors.textMuted,
          maxWidth: 780,
        }}
      >
        Y tu alarma tampoco debería serlo. Instalar lo mismo en todos lados es
        como usar las mismas zapatillas para correr una maratón y para ir a
        un casamiento.
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);

// ---------- Slide 2: playful "quiz" instead of a dry factor list ----------
const QuizChip: React.FC<{ emoji: string; text: string; rotate: number }> = ({ emoji, text, rotate }) => (
  <div
    style={{
      transform: `rotate(${rotate}deg)`,
      display: "flex",
      alignItems: "center",
      gap: 16,
      background: "rgba(255,255,255,0.07)",
      border: `1px solid ${colors.blueGlow}44`,
      borderRadius: 20,
      padding: "16px 24px",
    }}
  >
    <div style={{ fontSize: 30, lineHeight: 1 }}>{emoji}</div>
    <div
      style={{
        fontFamily: bodyFont,
        fontWeight: 700,
        fontSize: 25,
        color: colors.white,
        lineHeight: 1.25,
      }}
    >
      {text}
    </div>
  </div>
);

export const Personalization2Factors: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop
      src="person-phone.png"
      brightness={0.24}
      saturate={0.5}
      scrim={`linear-gradient(180deg, rgba(6,15,38,0.72) 0%, rgba(6,15,38,0.86) 45%, rgba(6,15,38,0.97) 100%)`}
    />
    <DotGrid />
    <SlideNumber n={2} />

    <Stage gap={20} padTop={110} padBottom={140}>
      <SlideKicker>Antes de instalar</SlideKicker>
      <SlideHeadline size={44} lines={[{ text: "Te hacemos algunas" }, { text: "preguntas raras.", accent: true }]} />

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", marginTop: 12 }}>
        <QuizChip emoji="🐶" text="¿Tenés un perro que cruza el patio a toda hora?" rotate={-1.2} />
        <QuizChip emoji="🚪" text="¿Cuántas puertas y ventanas hay que cubrir?" rotate={1} />
        <QuizChip emoji="🏢" text="¿Es tu casa, tu depto o tu local?" rotate={-0.8} />
        <QuizChip emoji="📹" text="¿Necesitás ver todo desde el celular, estés donde estés?" rotate={1.3} />
      </div>

      <div
        style={{
          marginTop: 14,
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 24,
          color: colors.textMuted,
          textAlign: "center",
        }}
      >
        Ninguna respuesta es "incorrecta". Todas nos ayudan a armar TU kit.
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);

// ---------- Slide 3: kit comparison with witty one-liners ----------
const KitCard: React.FC<{ name: string; profile: string; joke: string; accent?: boolean }> = ({
  name,
  profile,
  joke,
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
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
      <div
        style={{
          fontFamily: condensedFont,
          fontWeight: 800,
          fontSize: 29,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: accent ? colors.blueGlow : colors.white,
        }}
      >
        {name}
      </div>
      <div style={{ fontFamily: bodyFont, fontWeight: 600, fontSize: 18, color: colors.textFaint }}>{profile}</div>
    </div>
    <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 21, color: colors.textMuted, lineHeight: 1.35, fontStyle: "italic" }}>
      "{joke}"
    </div>
  </div>
);

export const Personalization3Kits: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
    <PhotoBackdrop
      src="app-arm-disarm.png"
      brightness={0.24}
      saturate={0.55}
      scrim={`linear-gradient(180deg, rgba(6,15,38,0.8) 0%, rgba(6,15,38,0.9) 45%, rgba(6,15,38,0.97) 100%)`}
    />
    <GlowOrb size={600} top={-140} left={220} color={colors.blue} opacity={0.16} />
    <DotGrid />
    <SlideNumber n={3} />

    <Stage gap={20} padTop={120} padBottom={130}>
      <SlideKicker>Elegí el tuyo</SlideKicker>
      <SlideHeadline size={44} lines={[{ text: "3 kits." }, { text: "Cero genéricos.", accent: true }]} />

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", marginTop: 10 }}>
        <KitCard
          name="Kit Hogar"
          profile="Depto o casa chica"
          joke="Para cuando tu mayor amenaza es el gato del vecino."
        />
        <KitCard
          name="Kit Hogar+"
          profile="Casa grande o PH"
          joke="Para la casa con patio, perro y esa ventana que 'siempre queda abierta'."
          accent
        />
        <KitCard
          name="Kit Negocio"
          profile="Local u oficina"
          joke="Para cuando lo de adentro vale más que la vidriera."
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
      <SlideKicker>Así lo armamos</SlideKicker>
      <SlideHeadline
        size={40}
        lines={[{ text: "Nada de 'una alarma" }, { text: "para todos'.", accent: true }]}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", marginTop: 14 }}>
        <ProcessStep n={1} text="Te conocemos (y a tu espacio también)" />
        <ProcessStep n={2} text="Te armamos el kit ideal" />
        <ProcessStep n={3} text="Lo instalamos y activamos el monitoreo" />
      </div>

      <div
        style={{
          marginTop: 18,
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 28,
          color: colors.textMuted,
          textAlign: "center",
          maxWidth: 780,
        }}
      >
        La tuya, a tu manera. ¿Cuál es la tuya?
      </div>
    </Stage>
    <SlideFooter />
  </AbsoluteFill>
);
