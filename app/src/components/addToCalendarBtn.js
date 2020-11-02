import dayjs from "dayjs";
import { Component } from "./_componentBase";

// Wrapper component for add-to-calendar-button widget
// https://www.addevent.com/add-to-calendar-button
export class AddToCalendarButton extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.start = this.element.querySelector(".start");
    this.end = this.element.querySelector(".end");
    this.dateFormat = "YYYY-MM-DD";

    this.setStartDateTime = this.setStartDateTime.bind(this);
    this.setEndDateTime = this.setEndDateTime.bind(this);
    this.setStartEndText = this.setStartEndText.bind(this);

    this.setStartEndText();
  }

  setStartEndText() {
    this.setStartDateTime();
    this.setEndDateTime();
    window.addeventatc.refresh();
  }

  setStartDateTime() {
    this.start.innerText = dayjs().add(7, "day").format(this.dateFormat);
  }

  setEndDateTime() {
    this.end.innerText = dayjs().add(8, "day").format(this.dateFormat);
  }
}
