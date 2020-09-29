import throttle from "lodash.throttle";
import { Component } from "./_componentBase";
import { addressGeocodeFetch } from "../action_creators";
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

    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleInputChange = throttle(
      this.handleInputChange.bind(this),
      INPUT_THROTTLE_MS
    );
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStoreSubscription = this.handleStoreSubscription.bind(this);
    this.handleGeocodeResponse = this.handleGeocodeResponse.bind(this);
    this.handleGeocodeError = this.handleGeocodeError.bind(this);

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
    // TODO: validate form input
    // TODO: handle BBL look up
    this.handleInputChange.cancel();
    console.log("form submit! ", event);
  }

  handleInputChange(event) {
    this.addressSearchText = event.target.value;
    // TODO: throttle text input as to not overwhelm the geocoding API
    if (this.addressSearchText.length > MIN_SEARCH_TEXT_LENGTH) {
      store.dispatch(addressGeocodeFetch(this.addressSearchText));
    }
  }

  handleStoreSubscription() {
    const {
      addressGeocode: { result, status, error },
    } = store.getState();
    if (result && result.features && result.features.length) {
      this.handleGeocodeResponse(result, status);
    }
    if (error) {
      this.handleGeocodeError(error);
    }
  }

  handleGeocodeResponse(data) {
    this.datalist.innerHTML = "";
    data.features.forEach(({ properties }) => {
      const option = document.createElement("option");
      option.value = properties.label || "";
      option.dataset.bbl = properties.pad_bbl || "";
      this.datalist.append(option);
    });
  }

  handleGeocodeError(error) {
    // TODO: error handling
    console.error(error);
  }
}
