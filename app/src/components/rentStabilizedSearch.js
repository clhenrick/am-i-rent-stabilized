import { Component } from "./_componentBase";
import {
  fetchRentStabilized,
  goToPrevSlide,
  goToNextSlide,
} from "../action_creators";
import { observeStore } from "../store";

const TRANSITION_DELAY_MS = 2500;

export class RentStabilizedSearch extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();

    this.lookupBBL = this.lookupBBL.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleRSChange = this.handleRSChange.bind(this);
    this.handleRSError = this.handleRSError.bind(this);
    this.handleGoToNextSlide = this.handleGoToNextSlide.bind(this);
    this.delay = this.delay.bind(this);

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
    await this.delay();
    this.store.dispatch(goToNextSlide());
  }

  async handleRSError() {
    await this.delay();
    this.store.dispatch(goToPrevSlide());
  }

  async delay() {
    await new Promise((resolve) => setTimeout(resolve, TRANSITION_DELAY_MS));
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
