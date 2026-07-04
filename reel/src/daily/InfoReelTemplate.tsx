import { useCurrentFrame } from "remotion";
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

export type InfoStep = {
  icon: IconKey;
  label: string;
};

export type InfoReelConfig = {
  kicker: string;
  headingLines: string[]; // last line renders in the accent color
  steps: InfoStep[];
  cta: string;
};

const STEP_STAGGER = 26;
const INTRO_DELAY = 4;
const STEPS_START = 34;

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

export const infoReelDuration = (steps: number) => STEPS_START + steps * STEP_STAGGER + 30 + 70;

export const InfoReel: React.FC<InfoReelConfig> = ({ kicker, headingLines, steps, cta }) => {
  const frame = useCurrentFrame();
  const logoDelay = STEPS_START + steps.length * STEP_STAGGER + 10;
  const logo = popIn(frame, logoDelay, 16);
  const { opacity: ctaOpacity, translateY: ctaY } = enterUp(frame, logoDelay + 16, 14, 24);

  return (
    <Background variant="night">
      <GlowOrb size={640} top={-140} left={220} color={colors.blue} opacity={0.2} />

      <Stage gap={26} padTop={170} padBottom={90}>
        <Kicker delay={INTRO_DELAY}>{kicker}</Kicker>
        <Heading delay={INTRO_DELAY + 8} size={62}>
          {headingLines.map((line, i) => (
            <span key={i} style={{ color: i === headingLines.length - 1 ? colors.blueGlow : colors.white }}>
              {line}
              {i < headingLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </Heading>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 14 }}>
          {steps.map((step, i) => (
            <Step key={i} step={step} index={i} delay={STEPS_START + i * STEP_STAGGER} />
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
