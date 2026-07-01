import "./index.css";
import { Composition } from "remotion";
import { CentralVigiaReel, TOTAL_DURATION } from "./Composition";

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
    </>
  );
};
