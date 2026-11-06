import IntroStrip from "./IntroStrip";

export default function DesignIntent() {
  return (
    <IntroStrip
      text="Over 25 Years experience across the creative landscape from concept to creation."
      modelSrc="/models/logo-green.glb"
      align="left"
      arrowHref="#selected-work"
      split={true}
    />
  );
}
