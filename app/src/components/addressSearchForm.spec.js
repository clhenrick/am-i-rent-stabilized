import { AddressSearchForm } from "./addressSearchForm";
import { SearchValidationErrors } from "./searchValidationErrors";
import { store, observeStore } from "../store";
import { searchRentStabilized } from "../action_creators/searchRentStabilizedActions";
import { logEvent, logException } from "../utils/logging";
import throttle from "lodash.throttle";

jest.mock("lodash.throttle");
jest.mock("../store");
jest.mock("../action_creators/searchRentStabilizedActions");
jest.mock("../utils/logging");

describe("AddressSearchForm", () => {
  let element;
  let addressSearchForm;

  throttle.mockImplementation((cb) => {
    cb.cancel = jest.fn();
    return cb;
  });

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector("#address-form");
  });

  beforeEach(() => {
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        result: null,
        status: "idle",
        error: null,
      },
      rentStabilized: {
        status: "idle",
        error: null,
        match: null,
      },
    }));
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(element).toBeDefined();
  });

  test("The consumer should be able to call new() on AddressSearchForm", () => {
    expect(addressSearchForm).toBeTruthy();
  });

  test("Throws an error if props.store is missing or invalid", () => {
    expect(
      () =>
        new AddressSearchForm({
          element,
        })
    ).toThrow("Requires redux store");

    expect(
      () =>
        new AddressSearchForm({
          element,
          store: {},
        })
    ).toThrow("Requires redux store");
  });

  test("validationErrors property is an instance of SearchValidationErrors", () => {
    expect(addressSearchForm.validationErrors).toBeInstanceOf(
      SearchValidationErrors
    );
  });

  test("handleInputChange responds to address input event", () => {
    const spy = jest.spyOn(AddressSearchForm.prototype, "handleInputChange");
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    document
      .querySelector("#address-form input")
      .dispatchEvent(new Event("input", { bubbles: true }));
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("handleInputChange dispatches async action", () => {
    addressSearchForm.handleInputChange({ target: { value: "555 2nd Ave" } });
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  test("handleInputChange dispatches RentStabilizedReset", () => {
    store.getState.mockImplementation(() => ({
      rentStabilized: {
        error: new Error(),
        status: "error",
      },
    }));
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    addressSearchForm.handleInputChange({ target: { value: "" } });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "RentStabilizedReset",
    });
  });

  test("uses observeStore to watch for redux state changes", () => {
    expect(observeStore).toHaveBeenCalledTimes(2);
  });

  test("responds to changes in state.addressGeocode", () => {
    const spy = jest.spyOn(AddressSearchForm.prototype, "handleAGChange");
    observeStore.mockImplementation((store, stateSlice, cb) => {
      stateSlice = (state) => state.addressGeocode;
      cb();
    });
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("responds to changes in state.rentStabilized", () => {
    const spy = jest.spyOn(AddressSearchForm.prototype, "handleRSChange");
    observeStore.mockImplementation((store, stateSlice, cb) => {
      stateSlice = (state) => state.rentStabilized;
      cb();
    });
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("handleAGChange appropriately calls updateDataListItems", () => {
    const spy = jest.spyOn(AddressSearchForm.prototype, "updateDataListItems");
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    store.getState.mockClear();
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        autosuggestions: { features: [{ properties: {} }] },
        status: "idle",
        error: null,
      },
    }));
    addressSearchForm.handleAGChange();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("handleAGChange appropriately calls handleFetchError", () => {
    const spy = jest.spyOn(AddressSearchForm.prototype, "handleFetchError");
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    store.getState.mockClear();
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        autosuggestions: null,
        searchResult: null,
        status: "failure",
        error: new Error("Something went wrong"),
      },
      rentStabilized: {
        status: "idle",
        error: null,
        match: null,
      },
    }));
    addressSearchForm.handleAGChange();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("handleRSChange", async () => {
    const spy = jest.spyOn(AddressSearchForm.prototype, "handleFetchError");
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });

    store.getState.mockImplementation(() => ({
      addressGeocode: {
        result: null,
        status: "idle",
        error: null,
      },
      rentStabilized: {
        error: new Error(),
        status: "error",
        match: null,
      },
    }));

    await addressSearchForm.handleRSChange();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("updateDataListItems", () => {
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        autosuggestions: {
          features: [
            {
              properties: {
                label: "111 Fake St, Brooklyn, NY",
                pad_bbl: 999,
              },
            },
            {
              properties: {
                label: "666 Devil Ave, Staten Island, NY",
                pad_bbl: 666,
              },
            },
          ],
        },
      },
    }));
    addressSearchForm.updateDataListItems();
    expect(addressSearchForm.datalist.children).toBeInstanceOf(HTMLCollection);
    expect(addressSearchForm.datalist.children).toHaveLength(2);
    expect(addressSearchForm.datalist.children[0].value).toBe(
      "111 Fake St, Brooklyn, NY"
    );
    expect(addressSearchForm.datalist.children[0].dataset.bbl).toBe("999");
    expect(addressSearchForm.datalist.children[1].value).toBe(
      "666 Devil Ave, Staten Island, NY"
    );
    expect(addressSearchForm.datalist.children[1].dataset.bbl).toBe("666");
  });

  test("validateSearchResult success", () => {
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        status: "idle",
        error: null,
        searchResult: {
          features: [{}],
        },
      },
    }));
    addressSearchForm.validateSearchResult();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "GoToSlideIdx",
      payload: 2,
    });
  });

  test("validateSearchResult error", () => {
    const spy = jest.spyOn(SearchValidationErrors.prototype, "showNotFound");
    addressSearchForm = new AddressSearchForm({
      element: document.querySelector("#address-form"),
      store,
    });
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        status: "idle",
        error: null,
        searchResult: {
          features: [],
        },
      },
    }));
    addressSearchForm.inputAddress.value = "444 Unknown Street, Staten Island";
    addressSearchForm.validateSearchResult();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(logEvent).toHaveBeenCalledWith("address-not-found", {
      event_category: "Search",
      value: "444 Unknown Street, Staten Island",
    });
  });

  test("handleSubmit", () => {
    const spy = jest.spyOn(AddressSearchForm.prototype, "handleSubmit");
    const event = new Event("submit");
    event.preventDefault = jest.fn();
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    addressSearchForm.inputAddress.value = "999 Main Street";
    addressSearchForm.element.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
    expect(logEvent).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
    expect(searchRentStabilized).toHaveBeenCalledWith("999 Main Street");
  });

  test("handleSubmit no user input", () => {
    const spy = jest.spyOn(SearchValidationErrors.prototype, "showNoInput");
    const event = new Event("submit");
    event.preventDefault = jest.fn();
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    addressSearchForm.inputAddress.value = "";
    addressSearchForm.element.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
  });

  test("handleFetchError", () => {
    const spy = jest.spyOn(SearchValidationErrors.prototype, "showGeneric");
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    addressSearchForm.handleFetchError(new Error("Something went wrong"));
    expect(spy).toHaveBeenCalled();
    expect(logException).toHaveBeenCalledWith("Error, Something went wrong");
  });
});
