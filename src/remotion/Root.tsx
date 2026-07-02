import { Composition } from "remotion";
import { KingstonBetaPromo } from "./KingstonBetaPromo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="KingstonBetaPromo"
      component={KingstonBetaPromo}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
