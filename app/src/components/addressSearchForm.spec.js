import { AddressSearchForm } from "./addressSearchForm";
import { SearchValidationErrors } from "./searchValidationErrors";
import { store } from "../store";
import throttle from "lodash.throttle";

jest.mock("lodash.throttle");
jest.mock("../store", () => {
  return {
    __esModule: true,
    store: {
      getState: jest.fn(() => ({
        addressGeocode: {
          result: null,
          status: "idle",
          error: null,
        },
      })),
      subscribe: jest.fn((cb) => cb()),
      dispatch: jest.fn(),
    },
    observeStore: jest.fn(),
  };
});

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

  test("has a validationErrors property", () => {
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

  test("handleInputChange calls store.dispatch when appropriate", () => {
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    addressSearchForm.handleInputChange({ target: { value: "555 2nd Ave" } });
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  test("handleAGChange responds to store.getState", () => {
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    addressSearchForm.handleAGChange();
    expect(store.getState).toHaveBeenCalled();
  });

  test("handleAGChange appropriately calls updateDataListItems", () => {
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        autosuggestions: { features: [{}] },
        status: "idle",
        error: null,
      },
    }));
    addressSearchForm.updateDataListItems = jest.fn();
    addressSearchForm.handleAGChange();
    expect(addressSearchForm.updateDataListItems).toHaveBeenCalled();
  });

  test("handleAGChange appropriately calls handleFetchError", () => {
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        result: null,
        status: "idle",
        error: new Error("Something went wrong"),
      },
    }));
    addressSearchForm.handleFetchError = jest.fn();
    addressSearchForm.handleAGChange();
    expect(addressSearchForm.handleFetchError).toHaveBeenCalled();
  });

  test("handleRSChange", async () => {
    store.getState.mockImplementation(() => ({
      rentStabilized: {
        error: new Error(),
        status: null,
        match: null,
      },
    }));
    const spy = jest.spyOn(AddressSearchForm.prototype, "handleFetchError");
    addressSearchForm = new AddressSearchForm({
      element,
      store,
    });
    await addressSearchForm.handleRSChange();
    expect(spy).toHaveBeenCalledTimes(1);
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
