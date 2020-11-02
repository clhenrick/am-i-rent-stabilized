import { Component } from "./_componentBase";

// Wrapper component for add-to-calendar-button widget
// https://www.addevent.com/add-to-calendar-button
export class AddToCalendar extends Component {
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
    this.daysFromNow = this.daysFromNow.bind(this);
    this.formatDate = this.formatDate.bind(this);

    this.setStartEndText();
  }

  setStartEndText() {
    this.setStartDateTime();
    this.setEndDateTime();
    window.addeventatc.refresh();
  }

  setStartDateTime() {
    this.start.innerText = this.formatDate(this.daysFromNow(7));
  }

  setEndDateTime() {
    this.end.innerText = this.formatDate(this.daysFromNow(8));
  }

  daysFromNow(days) {
    if (days && typeof days === "number" && Math.floor(days) === days) {
      const now = new Date();
      return new Date(now.setDate(now.getDate() + days));
    } else {
      throw "daysFromNow's argument should be an integer";
    }
  }

  formatDate(dateObj) {
    if (dateObj && dateObj instanceof Date) {
      return dateObj.toLocaleString("en-US", {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
      });
    } else {
      throw "formatDate's argument should be a Date object";
    }
  }
}
