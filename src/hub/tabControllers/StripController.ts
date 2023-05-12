import LoggableType from "../../shared/log/LoggableType";
import TabType from "../../shared/TabType";
import StripVisualizer from "../../shared/visualizers/StripVisualizer";
import TimelineVizController from "./TimelineVizController";

export default class StripController extends TimelineVizController {
  constructor(content: HTMLElement) {
    let configBody = content.getElementsByClassName("timeline-viz-config")[0].firstElementChild as HTMLElement;
    super(
      content,
      TabType.Strip,
      [
        {
          element: configBody.children[1].children[0] as HTMLElement,
          types: [LoggableType.StringArray]
        }
      ],
      [],
      new StripVisualizer(content.getElementsByClassName("strip-background-container")[0] as HTMLElement)
    );
  }

  get options(): { [id: string]: any } {
    return {};
  }

  set options(options: { [id: string]: any }) {}

  getAdditionalActiveFields(): string[] {
    return [];
  }

  getCommand(time: number) {
    let fields = this.getFields();

    // Get current data
    let rgbdata: String[] = [];

    if (fields[0] != null) {
      let xDataTemp = window.log.getStringArray(fields[0], time, time);
      if (xDataTemp && xDataTemp.timestamps[0] <= time) {
        rgbdata = xDataTemp.values[0];
      }
    }

    // Package command data
    return {
      data: rgbdata
    };
  }
}
