import { Component } from "./_componentBase";

export class SearchValidationErrors extends Component {
  init({ searchForm }) {
    this._searchForm = searchForm;
    this.errorNotFound = this.element.querySelector("#error-not-found");
    this.errorNoInput = this.element.querySelector("#error-address");
    this.errorGeneric = this.element.querySelector("#error-generic");
  }

  showAll() {
    this.showNotFound();
    this.showNoInput();
    this.showGeneric();
  }

  hideAll() {
    this.hideNotFound();
    this.hideNoInput();
    this.hideGeneric();
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

  showGeneric() {
    this.errorGeneric.classList.remove("vis-hidden");
  }

  hideGeneric() {
    this.errorGeneric.classList.add("vis-hidden");
  }

  get noInputIsHidden() {
    return this.errorNoInput.classList.contains("vis-hidden");
  }

  get notFoundIsHidden() {
    return this.errorNotFound.classList.contains("vis-hidden");
  }

  get genericIsHidden() {
    return this.errorGeneric.classList.contains("vis-hidden");
  }

  get areHidden() {
    return (
      this.noInputIsHidden && this.notFoundIsHidden && this.genericIsHidden
    );
  }
}
