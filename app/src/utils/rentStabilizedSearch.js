import {
  fetchRentStabilized,
  goToPrevSlide,
  goToNextSlide,
} from "../action_creators";
import { observeStore } from "../store";

export class RentStabilizedSearch {
  constructor(props) {
    const { store } = props || {};
    if (
      store &&
      typeof store.dispatch === "function" &&
      typeof store.getState === "function" &&
      typeof store.subscribe === "function"
    ) {
      this.store = store;
    } else {
      throw new Error("RentStabilizedSearch requires redux store as a prop");
    }

    this.lookupBBL = this.lookupBBL.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleRSChange = this.handleRSChange.bind(this);
    this.handleRSError = this.handleRSError.bind(this);
    this.handleGoToNextSlide = this.handleGoToNextSlide.bind(this);

    observeStore(
      this.store,
      (state) => state.addressGeocode.searchResult,
      this.handleSearchChange
    );
    observeStore(
      this.store,
      (state) => state.rentStabilized,
      this.handleRSChange
    );
  }

  handleSearchChange() {
    const searchResult = this.searchResult;
    if (searchResult && searchResult.features && searchResult.features.length) {
      this.lookupBBL(searchResult.features[0]);
    }
  }

  lookupBBL(feature) {
    const { properties } = feature;
    if (properties && properties.pad_bbl) {
      this.store.dispatch(fetchRentStabilized(properties.pad_bbl));
    } else {
      this.handleRSError();
    }
  }

  handleRSChange() {
    const { status, match, error } = this.rentStabilized;
    if (status === "idle" && match && match.rows) {
      this.handleGoToNextSlide();
    }
    if (status === "error" || error !== null) {
      this.handleRSError();
    }
  }

  async handleGoToNextSlide() {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    this.store.dispatch(goToNextSlide());
  }

  handleRSError() {
    // TODO: set AddressSearchForm error msg
    this.store.dispatch(goToPrevSlide());
  }

  get searchResult() {
    const {
      addressGeocode: { searchResult },
    } = this.store.getState();
    return searchResult;
  }

  get rentStabilized() {
    return this.store.getState().rentStabilized;
  }
}
