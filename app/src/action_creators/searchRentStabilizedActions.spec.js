import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  validateSearchResult,
  validateRS,
  getBBL,
  searchRentStabilized,
  ERROR_ADDRESS_NOT_FOUND,
  ERROR_RS,
  ERROR_MISSING_BBL,
} from "./searchRentStabilizedActions";
import * as types from "../constants/actionTypes";

const mockStore = configureMockStore([thunk]);

describe("validateSearchResult", () => {
  test("undefined input", () => {
    expect(() => validateSearchResult(undefined)).toThrow(
      ERROR_ADDRESS_NOT_FOUND
    );
  });

  test("no features property", () => {
    expect(() => validateSearchResult({})).toThrow(ERROR_ADDRESS_NOT_FOUND);
  });

  test("empty features array", () => {
    expect(() => validateSearchResult({ features: [] })).toThrow(
      ERROR_ADDRESS_NOT_FOUND
    );
  });

  test("valid input", () => {
    expect(validateSearchResult({ features: [{}] })).toBeUndefined();
  });
});

describe("validateRS", () => {
  test("undefined input", () => {
    expect(() => validateRS(undefined)).toThrow(ERROR_RS);
  });

  test("missing rows property", () => {
    expect(() => validateRS({})).toThrow(ERROR_RS);
  });

  test("valid input", () => {
    expect(validateRS({ rows: [] })).toBeUndefined();
  });
});

describe("getBBL", () => {
  test("undefined input", () => {
    expect(() => getBBL(undefined)).toThrow(ERROR_MISSING_BBL);
  });

  test("missing properties property", () => {
    expect(() => getBBL({})).toThrow(ERROR_MISSING_BBL);
  });

  test("missing pad_bbl property", () => {
    expect(() => getBBL({ properties: { key: 1 } })).toThrow(ERROR_MISSING_BBL);
  });

  test("valid input", () => {
    expect(getBBL({ properties: { pad_bbl: "01234" } })).toBe("01234");
  });
});

describe("searchRentStabilized", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("It dispatches expected actions when encountering no errors", () => {
    fetch
      .mockResponseOnce(
        JSON.stringify({ features: [{ properties: { pad_bbl: "000222" } }] }),
        {
          status: 200,
          statusText: "OK",
        }
      )
      .mockResponseOnce(JSON.stringify({ rows: [] }), {
        status: 200,
        statusText: "OK",
      });

    const expectedActions = [
      { type: types.AddressSearchRequest },
      {
        type: types.AddressSearchSuccess,
        payload: { features: [{ properties: { pad_bbl: "000222" } }] },
      },
      { type: types.RentStabilizedRequest },
      { type: types.RentStabilizedSuccess, payload: { rows: [] } },
      { type: types.GoToSlideIdx, payload: 3 },
    ];

    const store = mockStore({
      addressGeocode: { autosuggestions: null, status: "idle", error: null },
      rentStabilized: { status: "idlea", match: null, error: null },
    });

    return store.dispatch(searchRentStabilized("Some NYC address")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test.skip("It handles address not found error", () => {
    // TODO
  });

  test.skip("It handles BBL not found error", () => {
    // TODO
  });

  test.skip("It handles RS not found error", () => {
    // TODO
  });
});
