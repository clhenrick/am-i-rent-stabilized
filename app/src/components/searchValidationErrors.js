import { Component } from "./_componentBase";

/** HTML id attribute values for validation text */
const VALIDATION_TEXT_ID = {
  NOT_FOUND: "error-not-found",
  NO_INPUT: "error-address",
  GENERIC: "error-generic",
};

export class SearchValidationErrors extends Component {
  init({ searchForm }) {
    this._searchForm = searchForm;
    this.errorNotFound = this.element.querySelector(
      `#${VALIDATION_TEXT_ID.NOT_FOUND}`
    );
    this.errorNoInput = this.element.querySelector(
      `#${VALIDATION_TEXT_ID.NO_INPUT}`
    );
    this.errorGeneric = this.element.querySelector(
      `#${VALIDATION_TEXT_ID.GENERIC}`
    );
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
    this._searchForm.inputAddress.setAttribute(
      "aria-describedby",
      VALIDATION_TEXT_ID.NOT_FOUND
    );
  }

  hideNotFound() {
    this.errorNotFound.classList.add("hidden");
    this._searchForm.inputAddress.removeAttribute("aria-describedby");
  }

  showNoInput() {
    this.errorNoInput.classList.remove("hidden");
    this._searchForm.inputAddress.setAttribute(
      "aria-describedby",
      VALIDATION_TEXT_ID.NO_INPUT
    );
    this._searchForm.inputAddress.classList.add("invalid");
    this._searchForm.inputAddress.setAttribute("aria-invalid", true);
  }

  hideNoInput() {
    this.errorNoInput.classList.add("hidden");
    this._searchForm.inputAddress.removeAttribute("aria-describedby");
    this._searchForm.inputAddress.classList.remove("invalid");
    this._searchForm.inputAddress.setAttribute("aria-invalid", false);
  }

  showGeneric() {
    this.errorGeneric.classList.remove("hidden");
    this._searchForm.inputAddress.setAttribute(
      "aria-describedby",
      VALIDATION_TEXT_ID.GENERIC
    );
  }

  hideGeneric() {
    this.errorGeneric.classList.add("hidden");
    this._searchForm.inputAddress.removeAttribute("aria-describedby");
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
