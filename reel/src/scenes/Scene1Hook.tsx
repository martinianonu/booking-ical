import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { Stage } from "../components/Stage";
import { Heading, Kicker } from "../components/Typography";
import { IntrusionOverlay } from "../components/IntrusionOverlay";
import { colors } from "../brand";
import { enterUp } from "../animation";

export const SCENE_1_DURATION = 108;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Slow push-in on the real house photo — the first thing the viewer sees
  // is the photo itself, no text, for maximum opening impact.
  const kenBurns = interpolate(frame, [0, SCENE_1_DURATION], [1, 1.22], {
    easing: Easing.out(Easing.cubic),
  });

  // The shot opens in broad daylight (the real photo, untouched) and grades
  // down into dusk/night as the tension builds — day-for-night color grade.
  const grade = interpolate(frame, [10, 40], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brightness = 1 - grade * 0.62;
  const saturate = 1 - grade * 0.75;

  const vignette = interpolate(frame, [10, 40], [0, 0.78], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const danger = interpolate(frame, [72, SCENE_1_DURATION], [0, 1], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const { opacity: overlayOpacity, translateY: overlayY } = enterUp(frame, 32, 16, 20);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("house-photo.png")}
          style={{
            width,
            height,
            objectFit: "cover",
            scale: kenBurns,
            filter: `brightness(${brightness}) saturate(${saturate})`,
          }}
        />
      </AbsoluteFill>

      {/* night-blue color grade wash, ramps in with the brightness drop */}
      <AbsoluteFill
        style={{
          background: colors.navy,
          mixBlendMode: "color",
          opacity: grade * 0.85,
        }}
      />

      {/* dark scrim for legibility + mood, strongest at the bottom */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(3,6,20,${vignette * 0.7}) 0%, rgba(3,6,20,${
            vignette * 0.4
          }) 35%, rgba(3,6,20,${0.4 + vignette * 0.4}) 70%, rgba(3,6,20,${0.55 + vignette * 0.4}) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 26%, rgba(228,61,69,${danger * 0.28}) 0%, rgba(228,61,69,0) 45%)`,
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          top: "-18%",
        }}
      >
        <div style={{ opacity: overlayOpacity, translate: `0 ${overlayY}px` }}>
          <IntrusionOverlay width={380} />
        </div>
      </AbsoluteFill>

      <Stage gap={26} justify="flex-end" padTop={90} padBottom={150}>
        <Kicker delay={44}>Central Vigía</Kicker>
        <Heading delay={56} size={72}>
          ¿Y si alguien entra
          <br />
          a tu casa <span style={{ color: colors.blueGlow }}>cuando no estás?</span>
        </Heading>
      </Stage>
    </AbsoluteFill>
  );
};
