import { Component } from "./_componentBase";
import { addressGeocodeFetch } from "../action_creators";
import { store } from "../store";

export class AddressSearchForm extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.inputAddress = this.element.querySelector("input.address-input");
    this.selectBorough = this.element.querySelector(
      "div.user-data.borough-select"
    );

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
    this.element.addEventListener("submit", this.preventDefault);
    this.inputAddress.addEventListener("input", this.handleInputChange);
  }

  removeEvents() {
    this.element.removeEventListener("submit", this.preventDefault);
    this.inputAddress.removeEventListener("input", this.handleInputChange);
  }

  handleSubmit(event) {
    event.preventDefault();
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
    if (result) {
      this.handleGeocodeResponse(result, status);
    }
    if (error) {
      this.handleGeocodeError(error);
    }
  }

  handleGeocodeResponse(data, status) {
    // TODO handle updating form input with autocomplete results
    console.log(data, status);
  }

  handleGeocodeError(error) {
    // TODO: error handling
    console.error(error);
  }
}
