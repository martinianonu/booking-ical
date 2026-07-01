import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill } from "remotion";

import { Scene1Hook, SCENE_1_DURATION } from "./scenes/Scene1Hook";
import { Scene2Detection, SCENE_2_DURATION } from "./scenes/Scene2Detection";
import { Scene3Alert, SCENE_3_DURATION } from "./scenes/Scene3Alert";
import { Scene4Response, SCENE_4_DURATION } from "./scenes/Scene4Response";
import { Scene5App, SCENE_5_DURATION } from "./scenes/Scene5App";
import { Scene6Emotion, SCENE_6_DURATION } from "./scenes/Scene6Emotion";
import { Scene7CTA, SCENE_7_DURATION } from "./scenes/Scene7CTA";

const TRANSITION = 15;

export const TOTAL_DURATION =
  SCENE_1_DURATION +
  SCENE_2_DURATION +
  SCENE_3_DURATION +
  SCENE_4_DURATION +
  SCENE_5_DURATION +
  SCENE_6_DURATION +
  SCENE_7_DURATION -
  TRANSITION * 6;

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
          <Scene6Emotion />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_7_DURATION}>
          <Scene7CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
