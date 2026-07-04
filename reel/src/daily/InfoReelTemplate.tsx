import { Img, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { GlowOrb } from "../components/GlowOrb";
import { Stage } from "../components/Stage";
import { Heading, Kicker } from "../components/Typography";
import { Logo } from "../components/Logo";
import {
  HeadsetIcon,
  CarIcon,
  PhoneIcon,
  SensorIcon,
  ShieldIcon,
  BellIcon,
} from "../components/Icons";
import { colors } from "../brand";
import { fontFamily } from "../fonts";
import { enterUp, popIn, slideSide, scaleRotateIn, wipeReveal, bob } from "../animation";

// Composition defaultProps get serialized for multi-process rendering, so
// every field here must be plain JSON — no JSX nodes, no function/component
// references.
export const ICONS = {
  headset: HeadsetIcon,
  car: CarIcon,
  phone: PhoneIcon,
  sensor: SensorIcon,
  shield: ShieldIcon,
  bell: BellIcon,
} as const;

export type IconKey = keyof typeof ICONS;

export const HERO_ASSETS = {
  house: "house-photo.png",
  siren: "siren-photo.png",
  car: "car-photo.png",
  phone: "app-screenshot.png",
  person: "person-phone.png",
  app: "app-vigia-screen.png",
  systemLineup: "system-lineup.png",
  camera: "camera-device.png",
  houseSystem: "house-system-full.png",
} as const;

export type HeroAssetKey = keyof typeof HERO_ASSETS;

// Different presentations for the hero image: "card" is a small centered
// photo card in the normal flow, "fullBleed" is a wide banner above the
// heading, "floatTilt" is a rotated card with a punchier pop-in, and
// "phoneMock" is a tall, gently bobbing phone screen — used to spotlight
// the app on its own.
export type HeroLayout = "card" | "fullBleed" | "floatTilt" | "phoneMock";

// Four distinct entrance styles for individual step rows.
export type StepAnimation = "slideUp" | "slideSide" | "scaleRotate" | "wipe";

// Four structurally different ways to present the step list, so videos
// don't all share the same skeleton — just a different move on the same
// shape. "list" stacks full-width rows, "grid" wraps compact cards two per
// row, "sequence" reveals one big step at a time instead of listing all
// three, and "chips" uses small pill-shaped bubbles.
export type ReelLayout = "list" | "grid" | "sequence" | "chips";

export type InfoStep = {
  icon: IconKey;
  label: string;
};

export type InfoReelConfig = {
  kicker: string;
  headingLines: string[]; // last line renders in the accent color
  heroAsset?: HeroAssetKey;
  heroLayout?: HeroLayout; // default "card"
  stepAnimation?: StepAnimation; // default "slideUp"
  layout?: ReelLayout; // default "list"
  steps: InfoStep[];
  cta: string;
};

const STEP_STAGGER = 26;
const INTRO_DELAY = 4;
const HERO_DELAY = 18;
const HERO_DURATION = 26;
const HERO_BANNER_HEIGHT = 460;

const HeroBanner: React.FC<{ asset: HeroAssetKey; delay: number }> = ({ asset, delay }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 20, 40);
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        width: "100%",
        maxWidth: 860,
        height: HERO_BANNER_HEIGHT,
        borderRadius: 28,
        overflow: "hidden",
        position: "relative",
        boxShadow: `0 20px 60px ${colors.blue}55`,
      }}
    >
      <Img
        src={staticFile(HERO_ASSETS[asset])}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent 45%, ${colors.navyDeepest}DD 100%)`,
        }}
      />
    </div>
  );
};

const HeroAsset: React.FC<{ asset: HeroAssetKey; delay: number; layout: HeroLayout }> = ({
  asset,
  delay,
  layout,
}) => {
  const frame = useCurrentFrame();

  if (layout === "floatTilt") {
    const { opacity, scale, rotate } = scaleRotateIn(frame, delay, HERO_DURATION);
    return (
      <div
        style={{
          opacity,
          transform: `scale(${scale}) rotate(${rotate - 6}deg)`,
          width: 300,
          height: 190,
          borderRadius: 24,
          overflow: "hidden",
          border: `2px solid ${colors.blueGlow}66`,
          boxShadow: `0 16px 46px ${colors.blue}66`,
        }}
      >
        <Img
          src={staticFile(HERO_ASSETS[asset])}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }

  if (layout === "phoneMock") {
    const { opacity, scale } = popIn(frame, delay, HERO_DURATION);
    const floatY = bob(frame, 80, 8);
    return (
      <div
        style={{
          opacity,
          transform: `scale(${scale}) rotate(2deg) translateY(${floatY}px)`,
          width: 210,
          borderRadius: 26,
          overflow: "hidden",
          border: `2px solid ${colors.blueGlow}88`,
          boxShadow: `0 0 60px ${colors.blue}77`,
        }}
      >
        <Img
          src={staticFile(HERO_ASSETS[asset])}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    );
  }

  // default "card"
  const opacity = interpolate(frame, [delay, delay + HERO_DURATION], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [delay, delay + HERO_DURATION], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        opacity,
        scale,
        width: 300,
        height: 190,
        borderRadius: 20,
        overflow: "hidden",
        border: `2px solid ${colors.blueGlow}66`,
        boxShadow: `0 0 40px ${colors.blue}55`,
      }}
    >
      <Img
        src={staticFile(HERO_ASSETS[asset])}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
};

// Shared entrance transform for a single step, reused by every ReelLayout.
const useStepAnimStyle = (
  animation: StepAnimation,
  delay: number,
  index: number,
): React.CSSProperties => {
  const frame = useCurrentFrame();
  if (animation === "slideSide") {
    const side = index % 2 === 0 ? -1 : 1;
    const { opacity, translateX } = slideSide(frame, delay, side, 20, 140);
    return { opacity, translate: `${translateX}px 0` };
  }
  if (animation === "scaleRotate") {
    const { opacity, scale, rotate } = scaleRotateIn(frame, delay, 22);
    return { opacity, transform: `scale(${scale}) rotate(${rotate}deg)` };
  }
  if (animation === "wipe") {
    const { opacity, progress } = wipeReveal(frame, delay, 18);
    return { opacity, clipPath: `inset(0 ${100 - progress}% 0 0)` };
  }
  const { opacity, translateY } = enterUp(frame, delay, 14, 30);
  return { opacity, translate: `0 ${translateY}px` };
};

const ListStep: React.FC<{ step: InfoStep; index: number; delay: number; animation: StepAnimation }> = ({
  step,
  index,
  delay,
  animation,
}) => {
  const style = useStepAnimStyle(animation, delay, index);
  const Icon = ICONS[step.icon];
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        gap: 24,
        width: 780,
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${colors.blueGlow}33`,
        borderRadius: 22,
        padding: "20px 28px",
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          background: "rgba(47,107,255,0.16)",
          border: `2px solid ${colors.blueGlow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={30} color={colors.white} />
      </div>
      <div style={{ fontFamily, fontWeight: 700, fontSize: 32, color: colors.white, lineHeight: 1.2 }}>
        <span style={{ color: colors.blueGlow, marginRight: 10 }}>{index + 1}.</span>
        {step.label}
      </div>
    </div>
  );
};

const GridStep: React.FC<{
  step: InfoStep;
  index: number;
  delay: number;
  animation: StepAnimation;
  span: boolean;
}> = ({ step, index, delay, animation, span }) => {
  const style = useStepAnimStyle(animation, delay, index);
  const Icon = ICONS[step.icon];
  return (
    <div
      style={{
        ...style,
        gridColumn: span ? "1 / span 2" : undefined,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 14,
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${colors.blueGlow}33`,
        borderRadius: 24,
        padding: "30px 22px",
      }}
    >
      <div
        style={{
          width: 66,
          height: 66,
          borderRadius: 18,
          background: "rgba(47,107,255,0.16)",
          border: `2px solid ${colors.blueGlow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={32} color={colors.white} />
      </div>
      <div style={{ fontFamily, fontWeight: 700, fontSize: 27, color: colors.white, lineHeight: 1.25 }}>
        {step.label}
      </div>
    </div>
  );
};

const ChipStep: React.FC<{ step: InfoStep; index: number; delay: number; animation: StepAnimation }> = ({
  step,
  index,
  delay,
  animation,
}) => {
  const style = useStepAnimStyle(animation, delay, index);
  const Icon = ICONS[step.icon];
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: "rgba(255,255,255,0.08)",
        border: `1px solid ${colors.blueGlow}44`,
        borderRadius: 100,
        padding: "12px 30px 12px 12px",
        width: "fit-content",
        maxWidth: 760,
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: colors.blueGlow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={23} color={colors.navyDeepest} />
      </div>
      <div style={{ fontFamily, fontWeight: 700, fontSize: 27, color: colors.white }}>{step.label}</div>
    </div>
  );
};

const SEQUENCE_STEP_HEIGHT = 300;

const SequenceStep: React.FC<{ step: InfoStep; index: number; start: number }> = ({
  step,
  index,
  start,
}) => {
  const frame = useCurrentFrame();
  const inD = 10;
  const holdD = STEP_STAGGER - 14;
  const outD = 8;
  const opacity = interpolate(
    frame,
    [start, start + inD, start + inD + holdD, start + inD + holdD + outD],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(frame, [start, start + inD], [0.7, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const Icon = ICONS[step.icon];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          fontFamily,
          fontWeight: 900,
          fontSize: 130,
          color: `${colors.blueGlow}2A`,
        }}
      >
        {index + 1}
      </div>
      <div
        style={{
          width: 108,
          height: 108,
          borderRadius: 28,
          background: "rgba(47,107,255,0.16)",
          border: `3px solid ${colors.blueGlow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={52} color={colors.white} />
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 38,
          color: colors.white,
          textAlign: "center",
          maxWidth: 680,
          lineHeight: 1.25,
        }}
      >
        {step.label}
      </div>
    </div>
  );
};

const StepsArea: React.FC<{
  layout: ReelLayout;
  steps: InfoStep[];
  stepsStart: number;
  animation: StepAnimation;
}> = ({ layout, steps, stepsStart, animation }) => {
  if (layout === "grid") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, width: 820, marginTop: 14 }}>
        {steps.map((step, i) => (
          <GridStep
            key={i}
            step={step}
            index={i}
            delay={stepsStart + i * STEP_STAGGER}
            animation={animation}
            span={steps.length % 2 === 1 && i === steps.length - 1}
          />
        ))}
      </div>
    );
  }

  if (layout === "chips") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 14 }}>
        {steps.map((step, i) => (
          <ChipStep key={i} step={step} index={i} delay={stepsStart + i * STEP_STAGGER} animation={animation} />
        ))}
      </div>
    );
  }

  if (layout === "sequence") {
    return (
      <div style={{ position: "relative", width: 820, height: SEQUENCE_STEP_HEIGHT, marginTop: 14 }}>
        {steps.map((step, i) => (
          <SequenceStep key={i} step={step} index={i} start={stepsStart + i * STEP_STAGGER} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 14 }}>
      {steps.map((step, i) => (
        <ListStep key={i} step={step} index={i} delay={stepsStart + i * STEP_STAGGER} animation={animation} />
      ))}
    </div>
  );
};

const STEPS_START: Record<"none" | HeroLayout, number> = {
  none: 34,
  card: 50,
  fullBleed: 64,
  floatTilt: 40,
  phoneMock: 40,
};

export const infoReelDuration = (steps: number, heroLayout: "none" | HeroLayout = "none") =>
  STEPS_START[heroLayout] + steps * STEP_STAGGER + 30 + 70;

export const InfoReel: React.FC<InfoReelConfig> = ({
  kicker,
  headingLines,
  heroAsset,
  heroLayout = "card",
  stepAnimation = "slideUp",
  layout = "list",
  steps,
  cta,
}) => {
  const frame = useCurrentFrame();
  const isFullBleed = Boolean(heroAsset) && heroLayout === "fullBleed";
  const isInlineHero = Boolean(heroAsset) && !isFullBleed;
  const stepsStart = heroAsset ? STEPS_START[heroLayout] : STEPS_START.none;
  const logoDelay = stepsStart + steps.length * STEP_STAGGER + 10;
  const logo = popIn(frame, logoDelay, 16);
  const { opacity: ctaOpacity, translateY: ctaY } = enterUp(frame, logoDelay + 16, 14, 24);

  return (
    <Background variant="night">
      <GlowOrb size={640} top={-140} left={220} color={colors.blue} opacity={0.2} />

      <Stage gap={22} padTop={isFullBleed ? 90 : 150} padBottom={90}>
        {isFullBleed && heroAsset ? <HeroBanner asset={heroAsset} delay={HERO_DELAY} /> : null}

        <Kicker delay={INTRO_DELAY}>{kicker}</Kicker>
        <Heading delay={INTRO_DELAY + 8} size={58}>
          {headingLines.map((line, i) => (
            <span key={i} style={{ color: i === headingLines.length - 1 ? colors.blueGlow : colors.white }}>
              {line}
              {i < headingLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </Heading>

        {isInlineHero && heroAsset ? (
          <HeroAsset asset={heroAsset} delay={HERO_DELAY} layout={heroLayout} />
        ) : null}

        <StepsArea layout={layout} steps={steps} stepsStart={stepsStart} animation={stepAnimation} />

        <div style={{ scale: logo.scale, opacity: logo.opacity, marginTop: 22 }}>
          <Logo width={260} />
        </div>
        <div
          style={{
            opacity: ctaOpacity,
            translate: `0 ${ctaY}px`,
            background: colors.green,
            borderRadius: 40,
            padding: "16px 40px",
            fontFamily,
            fontWeight: 800,
            fontSize: 28,
            color: colors.navyDeepest,
          }}
        >
          {cta}
        </div>
      </Stage>
    </Background>
  );
};
