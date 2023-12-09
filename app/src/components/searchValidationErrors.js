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
    this.errorNotFound.classList.remove("hidden");
  }

  hideNotFound() {
    this.errorNotFound.classList.add("hidden");
  }

  showNoInput() {
    this.errorNoInput.classList.remove("hidden");
    this._searchForm.inputAddress.classList.add("invalid");
    this._searchForm.inputAddress.setAttribute("aria-invalid", true);
  }

  hideNoInput() {
    this.errorNoInput.classList.add("hidden");
    this._searchForm.inputAddress.classList.remove("invalid");
    this._searchForm.inputAddress.setAttribute("aria-invalid", false);
  }

  showGeneric() {
    this.errorGeneric.classList.remove("hidden");
  }

  hideGeneric() {
    this.errorGeneric.classList.add("hidden");
  }

  get noInputIsHidden() {
    return this.errorNoInput.classList.contains("hidden");
  }

  get notFoundIsHidden() {
    return this.errorNotFound.classList.contains("hidden");
  }

  get genericIsHidden() {
    return this.errorGeneric.classList.contains("hidden");
  }

  get areHidden() {
    return (
      this.noInputIsHidden && this.notFoundIsHidden && this.genericIsHidden
    );
  }
}
