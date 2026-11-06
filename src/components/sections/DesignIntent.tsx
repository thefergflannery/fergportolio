import IntroStrip from "./IntroStrip";

export default function DesignIntent() {
  return (
    <IntroStrip
      text="I get websites built right: on brief, on standard and WCAG 2.2 AA compliant. Available now for freelance and contract work."
      modelSrc="/models/logo-green.glb"
      align="left"
      arrowHref="#selected-work"
      split={true}
    />
  );
}
