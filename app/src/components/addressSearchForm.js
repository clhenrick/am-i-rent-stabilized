import { Component } from "./_componentBase";

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
    console.log(this.addressSearchText);
  }
}
