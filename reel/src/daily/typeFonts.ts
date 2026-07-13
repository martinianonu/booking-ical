import { loadFont } from "@remotion/fonts";
import { continueRender, delayRender, staticFile } from "remotion";

// Three display fonts with distinct personalities, used only by the
// TypeImpact templates: Big Shoulders (tall condensed, poster impact),
// Tektur (angular/futuristic, tech feel), Bricolage Grotesque (clean
// modern geometric, editorial/premium feel). Kept separate from the main
// Outfit loader in fonts.ts so the everyday InfoReel template doesn't pay
// for fonts it never uses.
export const condensedFont = "Big Shoulders";
export const techFont = "Tektur";
export const premiumFont = "Bricolage Grotesque";

const handle = delayRender("Loading TypeImpact display fonts");

Promise.all([
  loadFont({ family: condensedFont, url: staticFile("fonts/BigShoulders-Regular.ttf"), weight: "500" }),
  loadFont({ family: condensedFont, url: staticFile("fonts/BigShoulders-Bold.ttf"), weight: "800" }),
  loadFont({ family: techFont, url: staticFile("fonts/Tektur-Regular.ttf"), weight: "500" }),
  loadFont({ family: techFont, url: staticFile("fonts/Tektur-Medium.ttf"), weight: "700" }),
  loadFont({ family: premiumFont, url: staticFile("fonts/BricolageGrotesque-Regular.ttf"), weight: "500" }),
  loadFont({ family: premiumFont, url: staticFile("fonts/BricolageGrotesque-Bold.ttf"), weight: "800" }),
])
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });
