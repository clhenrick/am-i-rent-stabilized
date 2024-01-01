import { Component } from "./_componentBase";

/** HTML id attribute values for validation text */
export const VALIDATION_TEXT_ID = {
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

  hideAll() {
    this.hideNotFound();
    this.hideNoInput();
    this.hideGeneric();
  }

  showNotFound() {
    this.errorNotFound.classList.remove("hidden");
    this.setInputAriaDescribedby(VALIDATION_TEXT_ID.NOT_FOUND);
    this.setInputInvalid(true);
  }

  hideNotFound() {
    this.errorNotFound.classList.add("hidden");
    this.setInputAriaDescribedby();
    this.setInputInvalid(false);
  }

  showNoInput() {
    this.errorNoInput.classList.remove("hidden");
    this.setInputAriaDescribedby(VALIDATION_TEXT_ID.NO_INPUT);
    this.setInputInvalid(true);
  }

  hideNoInput() {
    this.errorNoInput.classList.add("hidden");
    this.setInputAriaDescribedby();
    this.setInputInvalid(false);
  }

  showGeneric() {
    this.errorGeneric.classList.remove("hidden");
    this.setInputAriaDescribedby(VALIDATION_TEXT_ID.GENERIC);
  }

  hideGeneric() {
    this.errorGeneric.classList.add("hidden");
    this.setInputAriaDescribedby();
  }

  setInputAriaDescribedby(value) {
    if (typeof value === "string") {
      this._searchForm.inputAddress.setAttribute("aria-describedby", value);
    } else {
      this._searchForm.inputAddress.removeAttribute("aria-describedby");
    }
  }

  setInputInvalid(value) {
    if (value) {
      this._searchForm.inputAddress.classList.add("invalid");
    } else {
      this._searchForm.inputAddress.classList.remove("invalid");
    }
    this._searchForm.inputAddress.setAttribute("aria-invalid", value);
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
