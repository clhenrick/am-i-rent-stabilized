import { SearchValidationErrors } from "./searchValidationErrors";
import { AddressSearchForm } from "./addressSearchForm";

describe("SearchValidationErrors", () => {
  let addressSearchForm;
  let searchValidationErrors;

  let spyShowNotFound;
  let spyHideNotFound;
  let spyShowNoInput;
  let spyHideNoInput;

  beforeAll(() => {
    spyShowNotFound = jest.spyOn(
      SearchValidationErrors.prototype,
      "showNotFound"
    );
    spyHideNotFound = jest.spyOn(
      SearchValidationErrors.prototype,
      "hideNotFound"
    );
    spyShowNoInput = jest.spyOn(
      SearchValidationErrors.prototype,
      "showNoInput"
    );
    spyHideNoInput = jest.spyOn(
      SearchValidationErrors.prototype,
      "hideNoInput"
    );

    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef

    addressSearchForm = new AddressSearchForm({
      element: document.querySelector("#address-form"),
    });
    searchValidationErrors = new SearchValidationErrors({
      element: document.querySelector("#address-form ul"),
      searchForm: addressSearchForm,
    });
  });

  test("The component's HTML exists", () => {
    expect(document.querySelector("#address-form ul")).toBeDefined();
  });

  test("The consumer should be able to call new() on AddressSearchForm", () => {
    expect(searchValidationErrors).toBeTruthy();
  });

  test("showNotFound", () => {
    searchValidationErrors.showNotFound();
    expect(
      searchValidationErrors.errorNotFound.classList.contains("vis-hidden")
    ).toBe(false);
  });

  test("hideNotFound", () => {
    searchValidationErrors.hideNotFound();
    expect(
      searchValidationErrors.errorNotFound.classList.contains("vis-hidden")
    ).toBe(true);
  });

  test("showNoInput", () => {
    searchValidationErrors.showNoInput();
    expect(
      searchValidationErrors.errorNoInput.classList.contains("vis-hidden")
    ).toBe(false);
  });

  test("hideNoInput", () => {
    searchValidationErrors.hideNoInput();
    expect(
      searchValidationErrors.errorNoInput.classList.contains("vis-hidden")
    ).toBe(true);
  });

  test("showAll", () => {
    spyShowNoInput.mockClear();
    spyShowNotFound.mockClear();
    searchValidationErrors.showAll();
    expect(spyShowNoInput).toHaveBeenCalledTimes(1);
    expect(spyShowNotFound).toHaveBeenCalledTimes(1);
  });

  test("hideAll", () => {
    spyHideNoInput.mockClear();
    spyHideNotFound.mockClear();
    searchValidationErrors.hideAll();
    expect(spyHideNoInput).toHaveBeenCalledTimes(1);
    expect(spyHideNotFound).toHaveBeenCalledTimes(1);
  });
});
