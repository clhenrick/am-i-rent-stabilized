import {
  SearchValidationErrors,
  VALIDATION_TEXT_ID,
} from "./searchValidationErrors";
import { AddressSearchForm } from "./addressSearchForm";
import { store } from "../store";

jest.mock("../store");

describe("SearchValidationErrors", () => {
  let element;
  let addressSearchForm;
  let searchValidationErrors;

  let spyHideNotFound;
  let spyHideNoInput;
  let spyHideGeneric;

  beforeAll(() => {
    spyHideNotFound = jest.spyOn(
      SearchValidationErrors.prototype,
      "hideNotFound",
    );
    spyHideNoInput = jest.spyOn(
      SearchValidationErrors.prototype,
      "hideNoInput",
    );
    spyHideGeneric = jest.spyOn(
      SearchValidationErrors.prototype,
      "hideGeneric",
    );

    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef

    element = document.querySelector(".search-validation-errors");
  });

  beforeEach(() => {
    addressSearchForm = new AddressSearchForm({
      element: document.querySelector("#address-form"),
      store,
    });
    searchValidationErrors = new SearchValidationErrors({
      element,
      searchForm: addressSearchForm,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(element).not.toBeNull();
  });

  test("The consumer should be able to call new() on AddressSearchForm", () => {
    expect(searchValidationErrors).toBeTruthy();
  });

  test("showNotFound", () => {
    searchValidationErrors.showNotFound();
    expect(
      searchValidationErrors.errorNotFound.classList.contains("hidden"),
    ).toBe(false);
    expect(addressSearchForm.inputAddress.getAttribute("aria-invalid")).toBe(
      "true",
    );
    expect(
      addressSearchForm.inputAddress.getAttribute("aria-describedby"),
    ).toBe(VALIDATION_TEXT_ID.NOT_FOUND);
  });

  test("hideNotFound", () => {
    searchValidationErrors.hideNotFound();
    expect(
      searchValidationErrors.errorNotFound.classList.contains("hidden"),
    ).toBe(true);
    expect(addressSearchForm.inputAddress.getAttribute("aria-invalid")).toBe(
      "false",
    );
    expect(
      addressSearchForm.inputAddress.getAttribute("aria-describedby"),
    ).toBeNull();
  });

  test("showNoInput", () => {
    searchValidationErrors.showNoInput();
    expect(
      searchValidationErrors.errorNoInput.classList.contains("hidden"),
    ).toBe(false);
    expect(addressSearchForm.inputAddress.getAttribute("aria-invalid")).toBe(
      "true",
    );
    expect(
      addressSearchForm.inputAddress.getAttribute("aria-describedby"),
    ).toBe(VALIDATION_TEXT_ID.NO_INPUT);
  });

  test("hideNoInput", () => {
    searchValidationErrors.hideNoInput();
    expect(
      searchValidationErrors.errorNoInput.classList.contains("hidden"),
    ).toBe(true);
    expect(addressSearchForm.inputAddress.getAttribute("aria-invalid")).toBe(
      "false",
    );
    expect(
      addressSearchForm.inputAddress.getAttribute("aria-describedby"),
    ).toBeNull();
  });

  test("showGeneric", () => {
    searchValidationErrors.showGeneric();
    expect(
      searchValidationErrors.errorGeneric.classList.contains("hidden"),
    ).toBe(false);
    expect(
      addressSearchForm.inputAddress.getAttribute("aria-describedby"),
    ).toBe(VALIDATION_TEXT_ID.GENERIC);
  });

  test("hideGeneric", () => {
    searchValidationErrors.hideGeneric();
    expect(
      searchValidationErrors.errorGeneric.classList.contains("hidden"),
    ).toBe(true);
    expect(
      addressSearchForm.inputAddress.getAttribute("aria-describedby"),
    ).toBeNull();
  });

  test("hideAll", () => {
    searchValidationErrors.hideAll();
    expect(spyHideNoInput).toHaveBeenCalledTimes(1);
    expect(spyHideNotFound).toHaveBeenCalledTimes(1);
    expect(spyHideGeneric).toHaveBeenCalledTimes(1);
    expect(
      addressSearchForm.inputAddress.getAttribute("aria-describedby"),
    ).toBeNull();
    expect(addressSearchForm.inputAddress.getAttribute("aria-invalid")).toBe(
      "false",
    );
  });
});
