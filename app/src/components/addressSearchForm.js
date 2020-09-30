import throttle from "lodash.throttle";
import { Component } from "./_componentBase";
import { SearchValidationErrors } from "./searchValidationErrors";
import {
  addressAutosuggestFetch,
  addressSearchFetch,
  goToNextSlide,
} from "../action_creators";
import { store } from "../store";

const INPUT_THROTTLE_MS = 350;
const MIN_SEARCH_TEXT_LENGTH = 1;

export class AddressSearchForm extends Component {
  constructor(props) {
    super(props);
  }

  init() {
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
    this.handleStoreSubscription = this.handleStoreSubscription.bind(this);
    this.updateDataListItems = this.updateDataListItems.bind(this);
    this.validateSearchResult = this.validateSearchResult.bind(this);
    this.clearCachedSearchResult = this.clearCachedSearchResult.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);

    store.subscribe(this.handleStoreSubscription);
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
      store.dispatch(addressSearchFetch(this.inputAddress.value));
    } else {
      this.validationErrors.showNoInput();
    }
  }

  handleInputChange(event) {
    this.addressSearchText = event.target.value;
    if (!this.validationErrors.areHidden) {
      this.validationErrors.hideAll();
    }
    if (this.addressSearchText.length >= MIN_SEARCH_TEXT_LENGTH) {
      store.dispatch(addressAutosuggestFetch(this.addressSearchText));
    }
  }

  handleStoreSubscription() {
    if (this.fetchStatus === "idle" && this.autosuggestionsList) {
      this.updateDataListItems();
    }
    if (
      this.fetchStatus === "idle" &&
      this.searchResult &&
      !this.cached.searchResult
    ) {
      this.cacheSearchResult();
      this.validateSearchResult();
    }
    if (this.fetchError || this.fetchStatus === "error") {
      this.handleFetchError();
    }
  }

  updateDataListItems() {
    this.datalist.innerHTML = "";
    this.autosuggestionsList.forEach(({ properties }) => {
      const option = document.createElement("option");
      option.value = properties.label || "";
      option.dataset.bbl = properties.pad_bbl || "";
      this.datalist.append(option);
    });
  }

  validateSearchResult() {
    if (this.searchResult.length) {
      this.inputAddress.blur();
      store.dispatch(goToNextSlide());
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
    // TODO: error handling
    // console.error(this.fetchError);
  }

  get autosuggestionsList() {
    const {
      addressGeocode: { autosuggestions },
    } = store.getState();
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
    } = store.getState();
    if (searchResult && searchResult.features) {
      return searchResult.features;
    }
    return undefined;
  }

  get fetchStatus() {
    const {
      addressGeocode: { status },
    } = store.getState();
    return status;
  }

  get fetchError() {
    const {
      addressGeocode: { error },
    } = store.getState();
    return error ? error.message : undefined;
  }
}
