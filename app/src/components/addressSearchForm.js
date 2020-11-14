import throttle from "lodash.throttle";
import { Component } from "./_componentBase";
import { SearchValidationErrors } from "./searchValidationErrors";
import {
  searchRentStabilized,
  addressAutosuggestFetch,
  goToNextSlide,
  rentStabilizedReset,
} from "../action_creators";
import { observeStore } from "../store";
import { delay } from "../utils/delay";
import { RS_SEARCH_DELAY_MS } from "../constants/app";

const INPUT_THROTTLE_MS = 350;
const MIN_SEARCH_TEXT_LENGTH = 1;

export class AddressSearchForm extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();

    this.inputAddress = this.element.querySelector("input.address-input");
    this.datalist = this.element.querySelector("datalist#autosuggest-results");

    this.addressSearchText = "";
    this.cached = {};
    this.cached.searchResult = undefined;

    this.validationErrors = new SearchValidationErrors({
      element: this.element.querySelector("ul"),
      searchForm: this,
    });

    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleInputChange = throttle(
      this.handleInputChange.bind(this),
      INPUT_THROTTLE_MS
    );
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAGChange = this.handleAGChange.bind(this);
    this.handleRSChange = this.handleRSChange.bind(this);
    this.updateDataListItems = this.updateDataListItems.bind(this);
    this.validateSearchResult = this.validateSearchResult.bind(this);
    this.clearCachedSearchResult = this.clearCachedSearchResult.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);

    this.unsubscribeAG = observeStore(
      this.store,
      (state) => state.addressGeocode,
      this.handleAGChange
    );

    this.unsubscribeRS = observeStore(
      this.store,
      (state) => state.rentStabilized,
      this.handleRSChange
    );

    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener("submit", this.handleSubmit);
    this.inputAddress.addEventListener("input", this.handleInputChange);
  }

  removeEvents() {
    this.element.removeEventListener("submit", this.handleSubmit);
    this.inputAddress.removeEventListener("input", this.handleInputChange);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleInputChange.cancel();
    this.clearCachedSearchResult();
    if (this.inputAddress.value.length) {
      this.store.dispatch(searchRentStabilized(this.inputAddress.value));
    } else {
      this.validationErrors.showNoInput();
    }
  }

  handleInputChange(event) {
    this.addressSearchText = event.target.value;
    if (!this.validationErrors.areHidden) {
      this.validationErrors.hideAll();
    }
    if (this.statusRS === "error" || this.errorRS) {
      this.store.dispatch(rentStabilizedReset());
    }
    if (this.addressSearchText.length >= MIN_SEARCH_TEXT_LENGTH) {
      this.store.dispatch(addressAutosuggestFetch(this.addressSearchText));
    }
  }

  handleAGChange() {
    if (this.statusAG === "idle" && this.autosuggestionsList) {
      this.updateDataListItems();
    }
    if (
      this.statusAG === "idle" &&
      this.searchResult &&
      !this.cached.searchResult
    ) {
      this.cacheSearchResult();
      this.validateSearchResult();
    }
    if (this.statusAG === "error" || this.errorAG) {
      this.handleFetchError();
    }
  }

  async handleRSChange() {
    if (this.statusRS === "error" || this.errorRS) {
      await delay(RS_SEARCH_DELAY_MS);
      this.handleFetchError();
    }
  }

  updateDataListItems() {
    this.datalist.innerHTML = "";
    this.autosuggestionsList.forEach(({ properties }) => {
      const option = document.createElement("option");
      option.value = properties.label || "";
      option.dataset.bbl = properties.pad_bbl || "";
      this.datalist.appendChild(option);
    });
  }

  validateSearchResult() {
    if (this.searchResult && this.searchResult.length) {
      this.inputAddress.blur();
      this.store.dispatch(goToNextSlide());
    } else {
      this.validationErrors.showNotFound();
    }
  }

  cacheSearchResult() {
    this.cached.searchResult = [...this.searchResult];
  }

  clearCachedSearchResult() {
    this.cached.searchResult = undefined;
  }

  handleFetchError() {
    this.validationErrors.showGeneric();
  }

  cleanUp() {
    this.unsubscribeAG();
    this.unsubscribeRS();
    this.removeEvents();
    this.element = null;
  }

  get autosuggestionsList() {
    const {
      addressGeocode: { autosuggestions },
    } = this.store.getState();
    if (
      autosuggestions &&
      autosuggestions.features &&
      autosuggestions.features.length
    ) {
      return autosuggestions.features;
    }
    return undefined;
  }

  get searchResult() {
    const {
      addressGeocode: { searchResult },
    } = this.store.getState();
    if (searchResult && searchResult.features) {
      return searchResult.features;
    }
    return undefined;
  }

  get statusAG() {
    const {
      addressGeocode: { status },
    } = this.store.getState();
    return status;
  }

  get errorAG() {
    const {
      addressGeocode: { error },
    } = this.store.getState();
    return error ? error.message : undefined;
  }

  get statusRS() {
    const {
      rentStabilized: { status },
    } = this.store.getState();
    return status;
  }

  get errorRS() {
    const {
      rentStabilized: { error },
    } = this.store.getState();
    return error;
  }
}
