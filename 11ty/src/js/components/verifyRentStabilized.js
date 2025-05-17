import { Component } from "./_componentBase";
import { observeStore } from "../store";
import { logAddressRS } from "../utils/logging";

export class VerifyRentStabilized extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();

    this.msgYes = this.element.querySelector("div.yes");
    this.msgNo = this.element.querySelector("div.no");

    this.updateMessage = this.updateMessage.bind(this);

    this.unsubscribe = observeStore(
      this.store,
      (state) => state.rentStabilized.match,
      this.updateMessage
    );
  }

  updateMessage() {
    if (
      this.match &&
      Array.isArray(this.match.rows) &&
      this.match.rows.length
    ) {
      this.msgYes.classList.remove("hidden");
      this.msgNo.classList.add("hidden");
      logAddressRS(this.match.rows[0].bbl);
    } else {
      this.msgYes.classList.add("hidden");
      this.msgNo.classList.remove("hidden");
    }
  }

  get match() {
    const {
      rentStabilized: { match },
    } = this.store.getState();
    return match;
  }
}
