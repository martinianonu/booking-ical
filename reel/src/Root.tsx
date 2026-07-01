import "./index.css";
import { Composition } from "remotion";
import { CentralVigiaReel, TOTAL_DURATION } from "./Composition";
import { CentralVigiaEmotional, EMOTIONAL_TOTAL_DURATION } from "./EmotionalComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CentralVigiaReel"
        component={CentralVigiaReel}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CentralVigiaEmotional"
        component={CentralVigiaEmotional}
        durationInFrames={EMOTIONAL_TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
