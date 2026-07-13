import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { colors } from "../brand";
import { fontFamily as bodyFont } from "../fonts";
import { condensedFont, techFont, premiumFont } from "./typeFonts";
import { ICONS, type IconKey } from "./InfoReelTemplate";
import { enterUp } from "../animation";

// Deliberately different typography-led designs for the same kind of
// informational content: "condensed" is a tall poster-style headline with
// huge ghost numerals, "tech" is angular/uppercase with bracket numbering,
// "premium" is a clean editorial layout with generous whitespace, and
// "professional" is the refined, on-brand version — same large scale as
// the others, but in the client's actual brand font (Outfit), sentence
// case instead of shouting caps, and a restrained, corporate finish. Text
// sizes are pushed noticeably larger than the InfoReel template across
// all of them — the point is visual impact, not density.
export type TypeStyle = "condensed" | "tech" | "premium" | "professional";

export type TypeStep = {
  icon: IconKey;
  label: string;
};

export type TypeImpactConfig = {
  kicker: string;
  headingLines: string[];
  steps: TypeStep[];
  cta: string;
  style: TypeStyle;
};

const INTRO_DELAY = 4;
const WORD_STAGGER = 5;
const STEP_STAGGER = 30;

const KineticHeading: React.FC<{
  lines: string[];
  delay: number;
  font: string;
  size: number;
  weight: number;
  uppercase: boolean;
  letterSpacing?: number;
  align?: "center" | "left";
}> = ({ lines, delay, font, size, weight, uppercase, letterSpacing = 0, align = "center" }) => {
  const frame = useCurrentFrame();
  let wordIndex = 0;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
      }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: align === "center" ? "center" : "flex-start",
            gap: `0 ${Math.round(size * 0.22)}px`,
          }}
        >
          {line.split(" ").map((word, wi) => {
            const d = delay + wordIndex * WORD_STAGGER;
            wordIndex += 1;
            const opacity = interpolate(frame, [d, d + 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const scale = interpolate(frame, [d, d + 14], [0.5, 1], {
              easing: Easing.bezier(0.2, 1.4, 0.4, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const isAccentLine = li === lines.length - 1;
            return (
              <span
                key={wi}
                style={{
                  display: "inline-block",
                  opacity,
                  transform: `scale(${scale})`,
                  fontFamily: font,
                  fontWeight: weight,
                  fontSize: size,
                  lineHeight: 1,
                  letterSpacing,
                  textTransform: uppercase ? "uppercase" : "none",
                  color: isAccentLine ? colors.blueGlow : colors.white,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// --- condensed: tall poster type, ghost numerals behind bold labels ---
const CondensedStep: React.FC<{ step: TypeStep; index: number; delay: number }> = ({ step, index, delay }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 16, 40);
  const Icon = ICONS[step.icon];
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        width: "100%",
        borderBottom: `2px solid ${colors.blueGlow}44`,
        paddingBottom: 22,
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: condensedFont,
          fontWeight: 800,
          fontSize: 108,
          lineHeight: 1,
          color: `${colors.blueGlow}30`,
          width: 110,
          flexShrink: 0,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <Icon size={30} color={colors.blueGlow} />
      <div
        style={{
          fontFamily: condensedFont,
          fontWeight: 800,
          fontSize: 46,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          color: colors.white,
          lineHeight: 1.05,
        }}
      >
        {step.label}
      </div>
    </div>
  );
};

// --- tech: angular clipped cards, bracket numbering ---
const TechStep: React.FC<{ step: TypeStep; index: number; delay: number }> = ({ step, index, delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(frame, [delay, delay + 18], [90, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const Icon = ICONS[step.icon];
  return (
    <div
      style={{
        opacity,
        translate: `${translateX}px 0`,
        display: "flex",
        alignItems: "center",
        gap: 22,
        width: 840,
        background: "rgba(127,212,255,0.06)",
        border: `1px solid ${colors.cyan}55`,
        clipPath: "polygon(0 0, 100% 0, 100% 78%, 94% 100%, 0 100%)",
        padding: "24px 30px",
      }}
    >
      <div
        style={{
          fontFamily: techFont,
          fontWeight: 700,
          fontSize: 26,
          color: colors.cyan,
          letterSpacing: 2,
          flexShrink: 0,
        }}
      >
        [{String(index + 1).padStart(2, "0")}]
      </div>
      <div
        style={{
          width: 56,
          height: 56,
          border: `2px solid ${colors.cyan}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={26} color={colors.cyan} />
      </div>
      <div
        style={{
          fontFamily: techFont,
          fontWeight: 500,
          fontSize: 34,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: colors.white,
          lineHeight: 1.15,
        }}
      >
        {step.label}
      </div>
    </div>
  );
};

// --- premium / professional: clean editorial rows, light numerals, thin
// rule. Shared between both styles, just with a different font + accent.
const PremiumStep: React.FC<{
  step: TypeStep;
  index: number;
  delay: number;
  font?: string;
  accent?: string;
}> = ({ step, index, delay, font = premiumFont, accent = colors.blueGlow }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 18, 34);
  const Icon = ICONS[step.icon];
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        display: "flex",
        alignItems: "flex-start",
        gap: 28,
        width: "100%",
      }}
    >
      <div
        style={{
          fontFamily: font,
          fontWeight: 500,
          fontSize: 40,
          color: colors.textFaint,
          flexShrink: 0,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: font,
            fontWeight: 700,
            fontSize: 40,
            color: colors.white,
            lineHeight: 1.25,
            marginBottom: 14,
          }}
        >
          {step.label}
        </div>
        <div style={{ height: 2, width: 56, background: accent }} />
      </div>
      <Icon size={28} color={accent} />
    </div>
  );
};

const STYLE_STEPS_START = 62;

export const typeImpactDuration = (steps: number) => STYLE_STEPS_START + steps * STEP_STAGGER + 40 + 70;

export const TypeImpact: React.FC<TypeImpactConfig> = ({ kicker, headingLines, steps, cta, style }) => {
  const frame = useCurrentFrame();
  const stepsStart = STYLE_STEPS_START;
  const logoDelay = stepsStart + steps.length * STEP_STAGGER + 14;
  const { opacity: logoOpacity, translateY: logoY } = enterUp(frame, logoDelay, 16, 24);
  const { opacity: ctaOpacity, translateY: ctaY } = enterUp(frame, logoDelay + 16, 14, 24);

  const kickerStyle: React.CSSProperties = {
    fontFamily: bodyFont,
    fontWeight: 700,
    fontSize: 28,
    letterSpacing: 5,
    textTransform: "uppercase",
    color: style === "tech" ? colors.cyan : colors.blueGlow,
    opacity: interpolate(frame, [INTRO_DELAY, INTRO_DELAY + 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  };

  const ctaStyle: React.CSSProperties = {
    opacity: ctaOpacity,
    translate: `0 ${ctaY}px`,
    background: style === "tech" ? colors.cyan : colors.green,
    borderRadius: style === "condensed" ? 6 : style === "tech" ? 0 : 999,
    padding: "18px 46px",
    fontFamily:
      style === "condensed"
        ? condensedFont
        : style === "tech"
          ? techFont
          : style === "professional"
            ? bodyFont
            : premiumFont,
    fontWeight: 800,
    fontSize: 30,
    letterSpacing: style === "tech" ? 2 : 0,
    textTransform: style === "tech" ? "uppercase" : "none",
    color: colors.navyDeepest,
  };

  if (style === "condensed") {
    return (
      <Background variant="night">
        <GlowOrb size={640} top={-140} left={220} color={colors.blue} opacity={0.2} />
        <Stage gap={30} padTop={150} padBottom={90} align="flex-start" justify="center">
          <div style={kickerStyle}>{kicker}</div>
          <KineticHeading
            lines={headingLines}
            delay={INTRO_DELAY + 6}
            font={condensedFont}
            size={122}
            weight={800}
            uppercase
            align="left"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 20, width: "100%" }}>
            {steps.map((step, i) => (
              <CondensedStep key={i} step={step} index={i} delay={stepsStart + i * STEP_STAGGER} />
            ))}
          </div>
          <div style={{ opacity: logoOpacity, translate: `0 ${logoY}px`, marginTop: 20 }}>
            <Logo width={240} />
          </div>
          <div style={ctaStyle}>{cta}</div>
        </Stage>
      </Background>
    );
  }

  if (style === "tech") {
    return (
      <Background variant="night">
        <GlowOrb size={640} top={-140} left={220} color={colors.cyan} opacity={0.18} />
        <Stage gap={26} padTop={150} padBottom={90}>
          <div style={kickerStyle}>// {kicker}</div>
          <KineticHeading
            lines={headingLines}
            delay={INTRO_DELAY + 6}
            font={techFont}
            size={68}
            weight={700}
            uppercase
            letterSpacing={1}
            align="center"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 16 }}>
            {steps.map((step, i) => (
              <TechStep key={i} step={step} index={i} delay={stepsStart + i * STEP_STAGGER} />
            ))}
          </div>
          <div style={{ opacity: logoOpacity, translate: `0 ${logoY}px`, marginTop: 20 }}>
            <Logo width={240} />
          </div>
          <div style={ctaStyle}>{cta}</div>
        </Stage>
      </Background>
    );
  }

  if (style === "professional") {
    return (
      <Background variant="night">
        <GlowOrb size={600} top={-160} left={240} color={colors.blue} opacity={0.15} />
        <Stage gap={38} padTop={170} padBottom={90} align="flex-start" justify="center">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 40, height: 2, background: colors.blueGlow }} />
            <div style={kickerStyle}>{kicker}</div>
          </div>
          <KineticHeading
            lines={headingLines}
            delay={INTRO_DELAY + 6}
            font={bodyFont}
            size={82}
            weight={800}
            uppercase={false}
            align="left"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 36, marginTop: 8, width: "100%" }}>
            {steps.map((step, i) => (
              <PremiumStep
                key={i}
                step={step}
                index={i}
                delay={stepsStart + i * STEP_STAGGER}
                font={bodyFont}
                accent={colors.blueGlow}
              />
            ))}
          </div>
          <div style={{ opacity: logoOpacity, translate: `0 ${logoY}px`, marginTop: 16, alignSelf: "center" }}>
            <Logo width={240} />
          </div>
          <div style={{ ...ctaStyle, alignSelf: "center" }}>{cta}</div>
        </Stage>
      </Background>
    );
  }

  // premium
  return (
    <Background variant="night">
      <GlowOrb size={640} top={-140} left={220} color={colors.blue} opacity={0.2} />
      <Stage gap={40} padTop={160} padBottom={90} align="flex-start" justify="center">
        <div style={kickerStyle}>{kicker}</div>
        <KineticHeading
          lines={headingLines}
          delay={INTRO_DELAY + 6}
          font={premiumFont}
          size={92}
          weight={800}
          uppercase={false}
          align="left"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 10, width: "100%" }}>
          {steps.map((step, i) => (
            <PremiumStep key={i} step={step} index={i} delay={stepsStart + i * STEP_STAGGER} />
          ))}
        </div>
        <div style={{ opacity: logoOpacity, translate: `0 ${logoY}px`, marginTop: 16, alignSelf: "center" }}>
          <Logo width={240} />
        </div>
        <div style={{ ...ctaStyle, alignSelf: "center" }}>{cta}</div>
      </Stage>
    </Background>
  );
};
