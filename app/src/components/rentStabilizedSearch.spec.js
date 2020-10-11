const { RentStabilizedSearch } = require("./rentStabilizedSearch");
import * as types from "../constants/actionTypes";

jest.mock("../store");

describe("RentStabilizedSearch", () => {
  let store;
  let observeStore;
  let element;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.getElementById("slide-3");
  });

  beforeEach(() => {
    const storeM = require("../store");
    store = storeM.store;
    observeStore = storeM.observeStore;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("The consumer should be able to call new() on RentStabilizedSearch", () => {
    const rentStabilizedSearch = new RentStabilizedSearch({ store, element });
    expect(rentStabilizedSearch).toBeTruthy();
  });

  test("Throws an error if not passed redux store as a prop", () => {
    expect(() => new RentStabilizedSearch({ element })).toThrow(
      "Requires redux store as a prop"
    );
  });

  test("subscribes to the redux store", () => {
    const rentStabilizedSearch = new RentStabilizedSearch({ store, element });
    expect(observeStore).toHaveBeenCalledTimes(2);
  });

  test("handleSearchChange responds to searchResult data", () => {
    store.getState.mockImplementationOnce(() => ({
      addressGeocode: {
        searchResult: {
          features: [
            {
              properties: {
                pad_bbl: "02020202",
              },
            },
          ],
        },
      },
    }));
    const spy = jest.spyOn(RentStabilizedSearch.prototype, "lookupBBL");
    const rentStabilizedSearch = new RentStabilizedSearch({ store, element });
    rentStabilizedSearch.handleSearchChange();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(store.getState).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("handleSearchChange does not respond to searchResult data", () => {
    store.getState.mockImplementationOnce(() => ({
      addressGeocode: {
        searchResult: {
          features: [],
        },
      },
    }));
    const spy = jest.spyOn(RentStabilizedSearch.prototype, "lookupBBL");
    const rentStabilizedSearch = new RentStabilizedSearch({ store, element });
    rentStabilizedSearch.handleSearchChange();
    expect(spy).not.toHaveBeenCalledTimes(1);
    expect(store.getState).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("lookupBBL correctly dispatches fetchRentStabilized action", () => {
    const dispatchMock = store.dispatch;
    const rentStabilizedSearch = new RentStabilizedSearch({ store, element });
    const feature = { properties: { pad_bbl: "987654321" } };
    rentStabilizedSearch.lookupBBL(feature);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
  });

  test("lookupBBL correctly invokes handleRSError", () => {
    const spy = jest.spyOn(RentStabilizedSearch.prototype, "handleRSError");
    const rentStabilizedSearch = new RentStabilizedSearch({ store, element });
    const feature = {};
    rentStabilizedSearch.lookupBBL(feature);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("handleRSChange correctly invokes handleGoToNextSlide", () => {
    const spy = jest.spyOn(
      RentStabilizedSearch.prototype,
      "handleGoToNextSlide"
    );
    const rentStabilizedSearch = new RentStabilizedSearch({ store, element });
    store.getState.mockImplementationOnce(() => ({
      rentStabilized: {
        status: "idle",
        match: { rows: [] },
        error: null,
      },
    }));
    rentStabilizedSearch.handleRSChange();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("handleRSChange correctly invokes handleRSError", () => {
    const spy = jest.spyOn(RentStabilizedSearch.prototype, "handleRSError");
    const rentStabilizedSearch = new RentStabilizedSearch({ store, element });
    store.getState.mockImplementationOnce(() => ({
      rentStabilized: {
        status: "error",
        match: null,
        error: new Error(),
      },
    }));
    rentStabilizedSearch.handleRSChange();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("handleGoToNextSlide", async () => {
    const dispatchMock = store.dispatch;
    const rentStabilizedSearch = new RentStabilizedSearch({ store, element });
    await rentStabilizedSearch.handleGoToNextSlide();
    expect(dispatchMock).toHaveBeenCalledWith({ type: types.GoToNextSlide });
  });

  test("handleRSError", () => {
    const dispatchMock = store.dispatch;
    const rentStabilizedSearch = new RentStabilizedSearch({ store, element });
    rentStabilizedSearch.handleRSError();
    expect(dispatchMock).toHaveBeenCalledWith({ type: types.GoToPrevSlide });
  });
});