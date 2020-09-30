import { Component } from "./_componentBase";

export class SearchValidationErrors extends Component {
  init({ searchForm }) {
    this._searchForm = searchForm;
    this.errorNotFound = this.element.querySelector("#error-not-found");
    this.errorNoInput = this.element.querySelector("#error-address");
  }

  showAll() {
    this.showNotFound();
    this.showNoInput();
  }

  hideAll() {
    this.hideNotFound();
    this.hideNoInput();
  }

  showNotFound() {
    this.errorNotFound.classList.remove("vis-hidden");
  }

  hideNotFound() {
    this.errorNotFound.classList.add("vis-hidden");
  }

  showNoInput() {
    this.errorNoInput.classList.remove("vis-hidden");
    this._searchForm.inputAddress.classList.add("invalid");
  }

  hideNoInput() {
    this.errorNoInput.classList.add("vis-hidden");
    this._searchForm.inputAddress.classList.remove("invalid");
  }

  get noInputIsHidden() {
    return this.errorNoInput.classList.contains("vis-hidden");
  }

  get notFoundIsHidden() {
    return this.errorNotFound.classList.contains("vis-hidden");
  }

  get areHidden() {
    return this.noInputIsHidden && this.notFoundIsHidden;
  }
}
