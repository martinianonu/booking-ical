import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { fontFamily } from "../fonts";
import { colors } from "../brand";
import { enterUp, pulse } from "../animation";

export const SCENE_DURATION = 70;

// The VIGIA plaque sits at (350, 260) in the 680x1220 source photo. Mapped
// through the frame's object-fit: cover (scale 1.588, no horizontal crop,
// ~8.7px vertical crop) that lands at (556, 404) in the 1080x1920 canvas.
const PLAQUE_X = 556;
const PLAQUE_Y = 404;

const Ring: React.FC<{ frame: number; delay: number; period: number }> = ({
  frame,
  delay,
  period,
}) => {
  const local = Math.max(0, frame - delay);
  const progress = (local % period) / period;
  const scale = interpolate(progress, [0, 1], [0.25, 2.4]);
  const opacity = interpolate(progress, [0, 0.12, 1], [0, 0.6, 0]);
  return (
    <div
      style={{
        position: "absolute",
        width: 260,
        height: 260,
        left: -130,
        top: -130,
        borderRadius: 130,
        background: colors.red,
        scale,
        opacity: opacity * 0.35,
        filter: "blur(2px)",
      }}
    />
  );
};

export const Scene2Situation: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const kenBurns = interpolate(frame, [0, SCENE_DURATION], [1.04, 1.16]);
  const { opacity: kickerOpacity, translateY: kickerY } = enterUp(frame, 4, 12, 20);
  const { opacity: captionOpacity, translateY: captionY } = enterUp(frame, 34, 14, 24);
  const sirenScale = interpolate(frame, [22, 34], [0.4, 1], {
    easing: (t) => t * (2 - t),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sirenOpacity = interpolate(frame, [22, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sirenFlash = pulse(frame, 9, 0.4, 1);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
      {/* photo + all photo-anchored overlays share one zoom transform so
          they track the same points in the image as it pushes in */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, scale: kenBurns }}>
          <Img
            src={staticFile("house-photo.png")}
            style={{
              width,
              height,
              objectFit: "cover",
              filter: "brightness(0.42) saturate(0.35)",
            }}
          />
          <AbsoluteFill style={{ background: colors.navy, mixBlendMode: "color", opacity: 0.8 }} />

          {/* detection pulse, anchored on the plaque */}
          <div style={{ position: "absolute", left: PLAQUE_X, top: PLAQUE_Y, width: 0, height: 0 }}>
            <Ring frame={frame} delay={0} period={40} />
            <Ring frame={frame} delay={20} period={40} />

            {/* real siren, mounted a clear step to the right of the plaque */}
            <div
              style={{
                position: "absolute",
                left: 108,
                top: -45,
                width: 90,
                height: 90,
                scale: sirenScale,
                opacity: sirenOpacity,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: -18,
                  borderRadius: 26,
                  border: `3px solid ${colors.red}`,
                  opacity: 0.4 + sirenFlash * 0.5,
                  boxShadow: `0 0 ${18 + sirenFlash * 22}px ${colors.red}`,
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 18,
                  overflow: "hidden",
                  border: `2px solid ${colors.red}cc`,
                }}
              >
                <Img
                  src={staticFile("siren-photo.png")}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(3,6,20,0.55) 0%, rgba(3,6,20,0.15) 30%, rgba(3,6,20,0.35) 65%, rgba(3,6,20,0.85) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: kickerOpacity,
          translate: `0 ${kickerY}px`,
          fontFamily,
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: colors.white,
        }}
      >
        Situación
      </div>

      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          bottom: 130,
          opacity: captionOpacity,
          translate: `0 ${captionY}px`,
          background: "rgba(5,9,26,0.72)",
          borderLeft: `4px solid ${colors.red}`,
          padding: "22px 30px",
          fontFamily,
          fontWeight: 500,
          fontStyle: "italic",
          fontSize: 38,
          color: colors.white,
        }}
      >
        Se detecta un movimiento.
      </div>
    </AbsoluteFill>
  );
};
