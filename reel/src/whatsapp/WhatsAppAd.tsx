import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import {
  Scene1Hook,
  SCENE_1_DURATION,
  Scene2Conventional,
  SCENE_2_DURATION,
  Scene3Monitored,
  SCENE_3_DURATION,
  Scene4Protocol,
  SCENE_4_DURATION,
  Scene5Peace,
  SCENE_5_DURATION,
  Scene6WhatsApp,
  SCENE_6_DURATION,
} from "./scenes";
import { Watermark } from "../components/Watermark";
import { colors } from "../brand";

const TRANSITION = 8;

export const WHATSAPP_AD_DURATION =
  SCENE_1_DURATION +
  SCENE_2_DURATION +
  SCENE_3_DURATION +
  SCENE_4_DURATION +
  SCENE_5_DURATION +
  SCENE_6_DURATION -
  TRANSITION * 5;

const SCENE2_START = SCENE_1_DURATION - TRANSITION;
const SCENE6_START =
  SCENE2_START +
  (SCENE_2_DURATION - TRANSITION) +
  (SCENE_3_DURATION - TRANSITION) +
  (SCENE_4_DURATION - TRANSITION) +
  (SCENE_5_DURATION - TRANSITION);

const WatermarkLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [SCENE2_START - 6, SCENE2_START + 4, SCENE6_START - 4, SCENE6_START + 6],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <div style={{ opacity }}>
      <Watermark />
    </div>
  );
};

export const WhatsAppAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_1_DURATION}>
          <Scene1Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION })} />
        <TransitionSeries.Sequence durationInFrames={SCENE_2_DURATION}>
          <Scene2Conventional />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION })} />
        <TransitionSeries.Sequence durationInFrames={SCENE_3_DURATION}>
          <Scene3Monitored />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION })} />
        <TransitionSeries.Sequence durationInFrames={SCENE_4_DURATION}>
          <Scene4Protocol />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION })} />
        <TransitionSeries.Sequence durationInFrames={SCENE_5_DURATION}>
          <Scene5Peace />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION })} />
        <TransitionSeries.Sequence durationInFrames={SCENE_6_DURATION}>
          <Scene6WhatsApp />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <WatermarkLayer />
    </AbsoluteFill>
  );
};
