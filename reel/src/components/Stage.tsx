import { AbsoluteFill } from "remotion";
import { SAFE_X } from "../brand";

export const Stage: React.FC<{
  children: React.ReactNode;
  justify?: "center" | "flex-start" | "flex-end" | "space-between";
  align?: "center" | "flex-start" | "stretch";
  gap?: number;
  padTop?: number;
  padBottom?: number;
}> = ({
  children,
  justify = "center",
  align = "center",
  gap = 28,
  padTop = 140,
  padBottom = 140,
}) => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: justify,
        alignItems: align,
        gap,
        paddingLeft: SAFE_X,
        paddingRight: SAFE_X,
        paddingTop: padTop,
        paddingBottom: padBottom,
        textAlign: align === "center" ? "center" : "left",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
