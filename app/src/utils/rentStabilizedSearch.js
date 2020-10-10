import { fetchRentStabilized, goToPrevSlide } from "../action_creators";
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
    this.handleChange = this.handleChange.bind(this);
    observeStore(
      this.store,
      (state) => state.addressGeocode.searchResult,
      this.handleChange
    );
  }

  handleChange() {
    const searchResult = this.searchResult;
    if (searchResult && searchResult.features && searchResult.features.length) {
      this.lookupBBL(searchResult.features[0]);
    }
  }

  lookupBBL(feature) {
    const { properties } = feature;
    if (!properties.pad_bbl || !properties.pad_bbl.length) {
      // TODO: set searchForm error msg
      this.store.dispatch(goToPrevSlide());
    } else {
      this.store.dispatch(fetchRentStabilized(properties.pad_bbl));
    }
  }

  get searchResult() {
    const {
      addressGeocode: { searchResult },
    } = this.store.getState();
    return searchResult;
  }
}
