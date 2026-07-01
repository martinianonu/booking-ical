import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill } from "remotion";

import { Scene1Title, SCENE_DURATION as D1 } from "./emotional/Scene1Title";
import { Scene2Situation, SCENE_DURATION as D2 } from "./emotional/Scene2Situation";
import { Scene3Notification, SCENE_DURATION as D3 } from "./emotional/Scene3Notification";
import { Scene4Verify, SCENE_DURATION as D4 } from "./emotional/Scene4Verify";
import { Scene5Dispatch, SCENE_DURATION as D5 } from "./emotional/Scene5Dispatch";
import { Scene6App, SCENE_DURATION as D6 } from "./emotional/Scene6App";
import { Scene7CTA, SCENE_DURATION as D7 } from "./emotional/Scene7CTA";

const TRANSITION = 14;

export const EMOTIONAL_TOTAL_DURATION = D1 + D2 + D3 + D4 + D5 + D6 + D7 - TRANSITION * 6;

export const CentralVigiaEmotional: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={D1}>
          <Scene1Title />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={D2}>
          <Scene2Situation />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={D3}>
          <Scene3Notification />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={D4}>
          <Scene4Verify />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={D5}>
          <Scene5Dispatch />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={D6}>
          <Scene6App />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence durationInFrames={D7}>
          <Scene7CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
