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
import { enterUp, popIn } from "../animation";

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
} as const;

export type HeroAssetKey = keyof typeof HERO_ASSETS;

export type InfoStep = {
  icon: IconKey;
  label: string;
};

export type InfoReelConfig = {
  kicker: string;
  headingLines: string[]; // last line renders in the accent color
  heroAsset?: HeroAssetKey;
  steps: InfoStep[];
  cta: string;
};

const STEP_STAGGER = 26;
const INTRO_DELAY = 4;
const HERO_DELAY = 18;
const HERO_DURATION = 26;

const HeroAsset: React.FC<{ asset: HeroAssetKey; delay: number }> = ({ asset, delay }) => {
  const frame = useCurrentFrame();
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

const Step: React.FC<{ step: InfoStep; index: number; delay: number }> = ({
  step,
  index,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = enterUp(frame, delay, 14, 30);
  const Icon = ICONS[step.icon];
  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
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

const STEPS_START_NO_HERO = 34;
const STEPS_START_WITH_HERO = 50;

export const infoReelDuration = (steps: number, hasHero = false) =>
  (hasHero ? STEPS_START_WITH_HERO : STEPS_START_NO_HERO) + steps * STEP_STAGGER + 30 + 70;

export const InfoReel: React.FC<InfoReelConfig> = ({ kicker, headingLines, heroAsset, steps, cta }) => {
  const frame = useCurrentFrame();
  const stepsStart = heroAsset ? STEPS_START_WITH_HERO : STEPS_START_NO_HERO;
  const logoDelay = stepsStart + steps.length * STEP_STAGGER + 10;
  const logo = popIn(frame, logoDelay, 16);
  const { opacity: ctaOpacity, translateY: ctaY } = enterUp(frame, logoDelay + 16, 14, 24);

  return (
    <Background variant="night">
      <GlowOrb size={640} top={-140} left={220} color={colors.blue} opacity={0.2} />

      <Stage gap={22} padTop={150} padBottom={90}>
        <Kicker delay={INTRO_DELAY}>{kicker}</Kicker>
        <Heading delay={INTRO_DELAY + 8} size={58}>
          {headingLines.map((line, i) => (
            <span key={i} style={{ color: i === headingLines.length - 1 ? colors.blueGlow : colors.white }}>
              {line}
              {i < headingLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </Heading>

        {heroAsset ? <HeroAsset asset={heroAsset} delay={HERO_DELAY} /> : null}

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 14 }}>
          {steps.map((step, i) => (
            <Step key={i} step={step} index={i} delay={stepsStart + i * STEP_STAGGER} />
          ))}
        </div>

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
