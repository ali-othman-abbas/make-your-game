import type DrawComponent from "../../gameEngine/components/DrawComponent.js";
import type Vec from "../math/vector.js";
import type { State } from "../states.js";
type FlashColor = "white" | "red";

const IMPACT_FRAME_DURATION = 200;

export default class ImpactFrame {
  SinceStart: number = -1;
  duration: number;
  impactFrameDrawComp: DrawComponent;
  flashDrawComp: DrawComponent;

  constructor(impactFrameDrawComp: DrawComponent, flashDrawComp:DrawComponent, duration: number = IMPACT_FRAME_DURATION) {
    this.duration = duration;
    this.impactFrameDrawComp = impactFrameDrawComp;
    this.flashDrawComp = flashDrawComp;
    this.impactFrameDrawComp.setColor('black');
    this.impactFrameDrawComp.setFullHeight();
    this.impactFrameDrawComp.setFullWidth();
  }

  update(): State {
    if (performance.now() - this.SinceStart >= this.duration) {
      this.impactFrameDrawComp.setHidden(true);
      this.SinceStart = -1;
      return 'play';
    }
    return 'onImpactFrame';
  }

  putImpactFrame(
    { x, y }: Vec,
    flashWidth: number,
    flashHeight: number,
    flashColor: FlashColor = "white",
  ): State {
    this.impactFrameDrawComp.setHidden(false)
    this.flashDrawComp.moveTo(x, y);
    this.flashDrawComp.setWidth(flashWidth);
    this.flashDrawComp.setHeight(flashHeight);
    this.flashDrawComp.setColor(flashColor);
    this.SinceStart = performance.now();
    return 'onImpactFrame';
  }

  setDuration(duration: number) {
    this.duration = duration;
  }
}