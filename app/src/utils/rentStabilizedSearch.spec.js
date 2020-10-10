const { RentStabilizedSearch } = require("./rentStabilizedSearch");
const { store, observeStore } = require("../store");
jest.mock("../store");

describe("RentStabilizedSearch", () => {
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
    jest.resetAllMocks();
    const rentStabilizedSearch = new RentStabilizedSearch({ store });
    expect(observeStore).toHaveBeenCalledTimes(1);
  });

  test("handleChange responds to searchResult data", () => {
    jest.resetAllMocks();
    store.getState.mockImplementation(() => ({
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
    rentStabilizedSearch.handleChange();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(store.getState).toHaveBeenCalledTimes(1);
  });

  test("handleChange does not respond to searchResult data", () => {
    jest.resetAllMocks();
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        searchResult: {
          features: [],
        },
      },
    }));
    const spy = jest.spyOn(RentStabilizedSearch.prototype, "lookupBBL");
    const rentStabilizedSearch = new RentStabilizedSearch({ store });
    rentStabilizedSearch.handleChange();
    expect(spy).not.toHaveBeenCalledTimes(1);
    expect(store.getState).toHaveBeenCalledTimes(1);
  });

  // FIXME
  test.skip("lookupBBL dispatches fetchRentStabilized action", () => {
    jest.resetAllMocks();
    const rentStabilizedSearch = new RentStabilizedSearch({ store });
    const feature = { properties: { pad_bbl: "987654321" } };
    rentStabilizedSearch.lookupBBL(feature);
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
