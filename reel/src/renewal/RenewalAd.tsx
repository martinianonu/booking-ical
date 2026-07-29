import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import {
  Scene1Old,
  SCENE_1_DURATION,
  Scene2Bridge,
  SCENE_2_DURATION,
  Scene3Demo,
  SCENE_3_DURATION,
  Scene4CTA,
  SCENE_4_DURATION,
} from "./scenes";
import { Watermark } from "../components/Watermark";
import { colors } from "../brand";

const TRANSITION = 8;

export const RENEWAL_AD_DURATION =
  SCENE_1_DURATION + SCENE_2_DURATION + SCENE_3_DURATION + SCENE_4_DURATION - TRANSITION * 3;

const SCENE2_START = SCENE_1_DURATION - TRANSITION;
const SCENE4_START = SCENE2_START + (SCENE_2_DURATION - TRANSITION) + (SCENE_3_DURATION - TRANSITION);

const WatermarkLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [SCENE2_START - 6, SCENE2_START + 4, SCENE4_START - 4, SCENE4_START + 6],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <div style={{ opacity }}>
      <Watermark />
    </div>
  );
};

export const RenewalAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_1_DURATION}>
          <Scene1Old />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION })} />
        <TransitionSeries.Sequence durationInFrames={SCENE_2_DURATION}>
          <Scene2Bridge />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION })} />
        <TransitionSeries.Sequence durationInFrames={SCENE_3_DURATION}>
          <Scene3Demo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION })} />
        <TransitionSeries.Sequence durationInFrames={SCENE_4_DURATION}>
          <Scene4CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <WatermarkLayer />
    </AbsoluteFill>
  );
};
