import { Img, staticFile } from "remotion";

// Small persistent brand mark, present through every scene so the video
// reads as Central Vigía even mid-scroll on social media.
export const Watermark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 56,
      right: 44,
      width: 108,
      opacity: 0.85,
      filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.5))",
    }}
  >
    <Img src={staticFile("logo-vigia.png")} style={{ width: "100%", height: "auto", display: "block" }} />
  </div>
);
