import { Img, staticFile } from "remotion";

export const Logo: React.FC<{ width?: number; style?: React.CSSProperties }> = ({
  width = 340,
  style,
}) => {
  return (
    <Img
      src={staticFile("logo-vigia.png")}
      style={{ width, height: "auto", display: "block", ...style }}
    />
  );
};
