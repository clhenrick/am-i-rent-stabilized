import { AddressSearchForm } from "./addressSearchForm";
import { SearchValidationErrors } from "./searchValidationErrors";
import { store, observeStore } from "../store";
import throttle from "lodash.throttle";

jest.mock("lodash.throttle");
jest.mock("../store");

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
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(element).toBeDefined();
  });

  test("The consumer should be able to call new() on AddressSearchForm", () => {
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
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
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
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
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    addressSearchForm.handleInputChange({ target: { value: "555 2nd Ave" } });
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  test("handleInputChange dispatches RentStabilizedReset", () => {
    store.getState.mockImplementationOnce(() => ({
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
    observeStore.mockReset();
    new AddressSearchForm({
      element,
      store,
    });
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
        status: "error",
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
        status: null,
        match: null,
      },
    }));

    await addressSearchForm.handleRSChange();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("updateDataListItems", () => {
    jest.clearAllMocks();
    addressSearchForm = new AddressSearchForm({
      element: document.querySelector("#address-form"),
      store,
    });
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
    addressSearchForm = new AddressSearchForm({
      element: document.querySelector("#address-form"),
      store,
    });
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
      type: "GoToNextSlide",
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
    addressSearchForm.validateSearchResult();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("handleSubmit", () => {
    const spy = jest.spyOn(AddressSearchForm.prototype, "handleSubmit");
    const event = new Event("submit");
    event.preventDefault = jest.fn();
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    addressSearchForm.element.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
