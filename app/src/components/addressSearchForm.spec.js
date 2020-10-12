import { AddressSearchForm } from "./AddressSearchForm";
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
  let addressSearchForm;
  let spyHandleSubmit = jest.spyOn(AddressSearchForm.prototype, "handleSubmit");
  let spyHandleInputChange = jest.spyOn(
    AddressSearchForm.prototype,
    "handleInputChange"
  );

  throttle.mockImplementation((cb) => {
    cb.cancel = jest.fn();
    return cb;
  });

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    addressSearchForm = new AddressSearchForm({
      element: document.querySelector("#address-form"),
      store,
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(document.querySelector("#address-form")).toBeDefined();
  });

  test("The consumer should be able to call new() on AddressSearchForm", () => {
    expect(addressSearchForm).toBeTruthy();
  });

  test("Throws an error if props.store is missing or invalid", () => {
    expect(
      () =>
        new AddressSearchForm({
          element: document.querySelector("#address-form"),
        })
    ).toThrow("Requires redux store");

    expect(
      () =>
        new AddressSearchForm({
          element: document.querySelector("#address-form"),
          store: {},
        })
    ).toThrow("Requires redux store");
  });

  test("handleInputChange", () => {
    document
      .querySelector("#address-form input")
      .dispatchEvent(new CustomEvent("input"));
    expect(spyHandleInputChange).toHaveBeenCalled();

    // TODO: write a better test for invoking an async action?
    addressSearchForm.handleInputChange({ target: { value: "555 2nd Ave" } });
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  test("handleAGChange responds to store.getState", () => {
    jest.clearAllMocks();
    addressSearchForm.handleAGChange();
    expect(store.getState).toHaveBeenCalled();
  });

  test("handleAGChange appropriately calls updateDataListItems", () => {
    jest.clearAllMocks();
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
    jest.clearAllMocks();
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
    const event = new Event("submit");
    event.preventDefault = jest.fn();
    addressSearchForm.element.dispatchEvent(event);
    expect(spyHandleSubmit).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
