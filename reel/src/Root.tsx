import "./index.css";
import { Composition } from "remotion";
import { CentralVigiaReel, TOTAL_DURATION } from "./Composition";
import { CentralVigiaEmotional, EMOTIONAL_TOTAL_DURATION } from "./EmotionalComposition";
import { InfoReel, infoReelDuration } from "./daily/InfoReelTemplate";
import { dailyConfigs } from "./daily/config";
import { TypeImpact, typeImpactDuration } from "./daily/TypeImpactTemplate";
import { typeImpactConfigs } from "./daily/typeImpactConfig";

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
      {dailyConfigs.map((config, i) => (
        <Composition
          key={i}
          id={`Daily${i + 1}`}
          component={InfoReel}
          durationInFrames={infoReelDuration(
            config.steps.length,
            config.heroAsset ? config.heroLayout ?? "card" : "none",
          )}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={config}
        />
      ))}
      {typeImpactConfigs.map((config, i) => (
        <Composition
          key={i}
          id={`TypeImpact${i + 1}`}
          component={TypeImpact}
          durationInFrames={typeImpactDuration(config.steps.length)}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={config}
        />
      ))}
    </>
  );
};
