import sls from "single-line-string";
import { Component } from "./_componentBase";

export class RentHistoryEmail extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.setMailTo = this.setMailTo.bind(this);
    this.setMailTo();
  }

  setMailTo() {
    const email = "rentinfo@nyshcr.org";
    const subject = "Request for rent history";

    const body = sls`DHCR administrator, \n\n
      I, YOUR NAME HERE, am currently renting\xa0
      YOUR ADDRESS, APARTMENT NUMBER, BOROUGH, ZIPCODE\xa0
      and would like to request the complete rent history for this apartment\xa0
      back to the year 1984.\n\n
      thank you,\n\n
      - YOUR NAME HERE`;

    const msg = sls`mailto:${encodeURIComponent(email)}?
      subject=${encodeURIComponent(subject)}&
      body=${encodeURIComponent(body)}`.replace(/ /gi, "");

    this.element.setAttribute("href", msg);
  }
}
