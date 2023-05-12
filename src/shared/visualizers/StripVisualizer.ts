import { AllColors } from "../Colors";
import Visualizer from "./Visualizer";

export default class StripVisualizer implements Visualizer {
  private CONTAINER: HTMLElement;
  private BACKGROUND: HTMLElement;
  private TEMPLATES: HTMLElement;

  constructor(container: HTMLElement) {
    this.CONTAINER = container;
    this.BACKGROUND = container.children[0] as HTMLElement;
    this.TEMPLATES = container.children[1] as HTMLElement;
  }

  render(command: any): number | null {
    // Update background size
    let containerWidth = this.CONTAINER.getBoundingClientRect().width;
    let containerHeight = this.CONTAINER.getBoundingClientRect().height;

    let targetWidth = 1;
    let targetHeight = 1;
    if (targetWidth < 1) targetWidth = 1;
    if (targetHeight < 1) targetHeight = 1;

    let finalWidth, finalHeight;
    if (targetWidth / targetHeight < containerWidth / containerHeight) {
      finalHeight = containerHeight;
      finalWidth = containerHeight * (targetWidth / targetHeight);
    } else {
      finalWidth = containerWidth;
      finalHeight = containerWidth * (targetHeight / targetWidth);
    }

    this.BACKGROUND.style.width = Math.ceil(finalWidth + 1).toString() + "px";
    this.BACKGROUND.style.height = Math.ceil(finalHeight + 1).toString() + "px";

    // Clear old points
    while (this.BACKGROUND.firstChild) {
      this.BACKGROUND.removeChild(this.BACKGROUND.firstChild);
    }


    for (let i = 0; i < command.data.length; i++) {
      let xposition = 0.5 * finalWidth;

      let height = finalHeight / (command.data.length - 1);
      let zoom = finalHeight / (finalHeight + 0.8 * height);
      let yposition = finalHeight - (zoom * (i * height - Math.min(height * (command.data.length - 1), finalHeight) / 2) + finalHeight / 2);
      let scale = zoom * height / 25;

      let point = this.TEMPLATES.children[0].cloneNode(true) as HTMLElement;
      point.style.transform = "translate(-50%,-50%) scale(" + scale + ", " + scale + ")";

      let color = command.data[i];

      point.style.fill = color;
      point.style.stroke = color;

      point.style.left = xposition.toString() + "px";
      point.style.top = yposition.toString() + "px";

      this.BACKGROUND.appendChild(point);
    }

    // Return target aspect ratio
    return null;
  }
}
