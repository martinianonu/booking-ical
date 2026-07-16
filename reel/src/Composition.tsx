import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

import { Scene1Hook, SCENE_1_DURATION } from "./scenes/Scene1Hook";
import { Scene2Detection, SCENE_2_DURATION } from "./scenes/Scene2Detection";
import { Scene3Alert, SCENE_3_DURATION } from "./scenes/Scene3Alert";
import { Scene4Response, SCENE_4_DURATION } from "./scenes/Scene4Response";
import { Scene5App, SCENE_5_DURATION } from "./scenes/Scene5App";
import { Scene6CTA, SCENE_6_DURATION } from "./scenes/Scene6CTA";
import { Watermark } from "./components/Watermark";

const TRANSITION = 8;

export const TOTAL_DURATION =
  SCENE_1_DURATION +
  SCENE_2_DURATION +
  SCENE_3_DURATION +
  SCENE_4_DURATION +
  SCENE_5_DURATION +
  SCENE_6_DURATION -
  TRANSITION * 5;

// Watermark shows once we're past the opening hook and hides once the CTA
// (which already carries the full logo) takes over.
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

export const CentralVigiaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050B22" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_1_DURATION}>
          <Scene1Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_2_DURATION}>
          <Scene2Detection />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_3_DURATION}>
          <Scene3Alert />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_4_DURATION}>
          <Scene4Response />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_5_DURATION}>
          <Scene5App />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_6_DURATION}>
          <Scene6CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <WatermarkLayer />
    </AbsoluteFill>
  );
};
