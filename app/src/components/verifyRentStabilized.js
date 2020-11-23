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
    if (this.match && this.match.total_rows > 0) {
      this.msgYes.classList.remove("hidden");
      this.msgNo.classList.add("hidden");
      logAddressRS(this.searchAddress);
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

  get searchResult() {
    const {
      addressGeocode: { searchResult },
    } = this.store.getState();
    return searchResult;
  }

  get searchResultFeatures() {
    if (this.searchResult && this.searchResult.features) {
      return this.searchResult.features;
    }
    return undefined;
  }

  get searchAddress() {
    if (this.searchResultFeatures && this.searchResultFeatures.length) {
      return this.searchResultFeatures[0].properties.label;
    }
    return undefined;
  }
}
