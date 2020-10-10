const { RentStabilizedSearch } = require("./rentStabilizedSearch");
import * as types from "../constants/actionTypes";

jest.mock("../store");

describe("RentStabilizedSearch", () => {
  let store;
  let observeStore;

  beforeEach(() => {
    const storeM = require("../store");
    store = storeM.store;
    observeStore = storeM.observeStore;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("The consumer should be able to call new() on RentStabilizedSearch", () => {
    const rentStabilizedSearch = new RentStabilizedSearch({ store });
    expect(rentStabilizedSearch).toBeTruthy();
  });

  test("Throws an error if not passed redux store as a prop", () => {
    expect(() => new RentStabilizedSearch()).toThrow(
      "RentStabilizedSearch requires redux store as a prop"
    );
  });

  test("subscribes to the redux store", () => {
    const rentStabilizedSearch = new RentStabilizedSearch({ store });
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
    const rentStabilizedSearch = new RentStabilizedSearch({ store });
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
    const rentStabilizedSearch = new RentStabilizedSearch({ store });
    rentStabilizedSearch.handleSearchChange();
    expect(spy).not.toHaveBeenCalledTimes(1);
    expect(store.getState).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("lookupBBL dispatches fetchRentStabilized action", () => {
    const dispatchMock = store.dispatch;
    const rentStabilizedSearch = new RentStabilizedSearch({ store });
    const feature = { properties: { pad_bbl: "987654321" } };
    rentStabilizedSearch.lookupBBL(feature);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
  });

  test("lookupBBL dispatches GoToPrevSlide action", () => {
    const dispatchMock = store.dispatch;
    const rentStabilizedSearch = new RentStabilizedSearch({ store });
    const feature = {};
    rentStabilizedSearch.lookupBBL(feature);
    expect(dispatchMock).toHaveBeenCalledWith({ type: types.GoToPrevSlide });
  });
});
