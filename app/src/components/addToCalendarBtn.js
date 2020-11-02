import { Component } from "./_componentBase";

// wrapper component for add-to-calendar-button widget
// https://www.addevent.com/add-to-calendar-button
export class AddToCalendarButton extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.setStartDateTime = this.setStartDateTime.bind(this);
    this.setEndDateTime = this.setEndDateTime.bind(this);
    this.setStartDateTime();
    this.setEndDateTime();
    window.addeventatc.refresh();
  }

  setStartDateTime() {}

  setEndDateTime() {}
}
