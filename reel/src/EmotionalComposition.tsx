import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate } from "remotion";

import { Scene1Title, SCENE_DURATION as D1 } from "./emotional/Scene1Title";
import { Scene2Situation, SCENE_DURATION as D2 } from "./emotional/Scene2Situation";
import { Scene3Notification, SCENE_DURATION as D3 } from "./emotional/Scene3Notification";
import { Scene4Verify, SCENE_DURATION as D4 } from "./emotional/Scene4Verify";
import { Scene5Dispatch, SCENE_DURATION as D5 } from "./emotional/Scene5Dispatch";
import { Scene6App, SCENE_DURATION as D6 } from "./emotional/Scene6App";
import { Scene7CTA, SCENE_DURATION as D7 } from "./emotional/Scene7CTA";
import { Grain } from "./components/Background";
import { Watermark } from "./components/Watermark";

const TRANSITION = 16;

export const EMOTIONAL_TOTAL_DURATION = D1 + D2 + D3 + D4 + D5 + D6 + D7 - TRANSITION * 6;

// Cumulative start frame of each scene, so the watermark can fade in once
// we're past the title card and fade out once the CTA (with its own big
// logo) takes over, without hardcoding frame numbers that drift when a
// scene's duration changes.
const SCENE2_START = D1 - TRANSITION;
const SCENE7_START =
  SCENE2_START + (D2 - TRANSITION) + (D3 - TRANSITION) + (D4 - TRANSITION) + (D5 - TRANSITION) + (D6 - TRANSITION);

const WatermarkLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [SCENE2_START - 10, SCENE2_START + 6, SCENE7_START - 6, SCENE7_START + 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <div style={{ opacity }}>
      <Watermark />
    </div>
  );
};

export const CentralVigiaEmotional: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Client's original narration/sound from their reference clip. It runs
          ~9.6s; our cut is longer (added the verification beat), so it plays
          under the first scenes and the video continues silently after. */}
      <Audio src={staticFile("audio/reference-voice.mp3")} />
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

      <Grain />
      <WatermarkLayer />
    </AbsoluteFill>
  );
};
