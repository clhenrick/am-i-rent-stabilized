import { Component } from "./_componentBase";
import { addressGeocodeFetch } from "../action_creators";
import { store } from "../store";

export class AddressSearchForm extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.inputAddress = this.element.querySelector("input.address-input");
    this.datalist = this.element.querySelector("datalist#autocomplete-results");

    this.addressSearchText = "";

    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStoreSubscribtion = this.handleStoreSubscribtion.bind(this);
    this.handleGeocodeResponse = this.handleGeocodeResponse.bind(this);
    this.handleGeocodeError = this.handleGeocodeError.bind(this);

    store.subscribe(this.handleStoreSubscribtion);
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
    console.log("form submit!");
  }

  handleInputChange(event) {
    this.addressSearchText = event.target.value;
    // TODO: throttle text input as to not overwhelm the geocoding API
    if (this.addressSearchText.length > 3) {
      store.dispatch(addressGeocodeFetch(this.addressSearchText));
    }
  }

  handleStoreSubscribtion() {
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
