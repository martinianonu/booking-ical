import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { fontFamily } from "../fonts";
import { colors } from "../brand";
import { ShieldIcon } from "../components/Icons";
import { enterUp } from "../animation";

export const SCENE_DURATION = 75;

// The phone screen is tilted in the source photo (950x1483). Mapped through
// the frame's object-fit: cover (scale 1.2946, ~75px horizontal crop) the
// screen's usable notification area centers around (702, 1139) in the
// 1080x1920 canvas, tilted ~7.75deg clockwise.
const BANNER_X = 702;
const BANNER_Y = 1120;
const BANNER_W = 300;
const BANNER_ROTATE = 7.75;

export const Scene3Notification: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const kenBurns = interpolate(frame, [0, SCENE_DURATION], [1.05, 1.16], {
    easing: Easing.out(Easing.cubic),
  });
  const { opacity: cardOpacity, translateY: cardY } = enterUp(frame, 8, 16, -30);
  const glow = interpolate(Math.sin(frame / 6), [-1, 1], [0.4, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDeepest }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, scale: kenBurns }}>
          <Img
            src={staticFile("person-phone.png")}
            style={{ width, height, objectFit: "cover" }}
          />

          {/* notification banner, composited onto the phone's lock screen */}
          <div
            style={{
              position: "absolute",
              left: BANNER_X - BANNER_W / 2,
              top: BANNER_Y,
              width: BANNER_W,
              rotate: `${BANNER_ROTATE}deg`,
              opacity: cardOpacity,
              translate: `0 ${cardY}px`,
              background: "rgba(255,255,255,0.97)",
              borderRadius: 20,
              padding: "16px 18px",
              boxShadow: `0 0 ${22 + glow * 18}px ${colors.blue}aa`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: colors.blue,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ShieldIcon size={15} color={colors.white} />
              </div>
              <div style={{ fontFamily, fontWeight: 800, fontSize: 15, color: colors.navyDeepest }}>
                Central Vigía
              </div>
            </div>
            <div style={{ fontFamily, fontWeight: 700, fontSize: 17, color: "#161C33", lineHeight: 1.25 }}>
              Sonó tu alarma.
              <br />
              Te enviamos el móvil.
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(3,6,20,0.3) 0%, rgba(3,6,20,0) 20%, rgba(3,6,20,0) 70%, rgba(3,6,20,0.4) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
