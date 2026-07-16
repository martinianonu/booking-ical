import { loadFont } from "@remotion/fonts";
import { continueRender, delayRender, staticFile } from "remotion";

export const fontFamily = "Outfit";

const handle = delayRender("Loading Outfit font");

Promise.all([
  loadFont({
    family: fontFamily,
    url: staticFile("fonts/Outfit-Regular.ttf"),
    weight: "500",
  }),
  loadFont({
    family: fontFamily,
    url: staticFile("fonts/Outfit-Bold.ttf"),
    weight: "700",
  }),
  loadFont({
    family: fontFamily,
    url: staticFile("fonts/Outfit-Bold.ttf"),
    weight: "900",
  }),
])
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });
