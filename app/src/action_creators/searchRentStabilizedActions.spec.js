import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  validateSearchResult,
  validateRS,
  getBBL,
  getCoords,
  searchRentStabilized,
  ERROR_ADDRESS_NOT_FOUND,
  ERROR_RS,
  ERROR_MISSING_BBL,
  ERROR_MISSING_COORDS,
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

describe("getCoords", () => {
  test("undefined input", () => {
    expect(() => getCoords()).toThrow(ERROR_MISSING_COORDS);
  });

  test("missing geometry property", () => {
    expect(() => getCoords({})).toThrow(ERROR_MISSING_COORDS);
  });

  test("missing coordinates array", () => {
    expect(() => getCoords({ geometry: {} })).toThrow(ERROR_MISSING_COORDS);
  });

  test("empty coordinates array", () => {
    expect(() => getCoords({ geometry: { coordinates: [] } })).toThrow(
      ERROR_MISSING_COORDS
    );
  });

  test("valid input", () => {
    expect(getCoords({ geometry: { coordinates: [1, 2] } })).toEqual({
      lon: 1,
      lat: 2,
    });
  });
});

describe("searchRentStabilized", () => {
  let store;
  let geojson;

  beforeEach(() => {
    store = mockStore({
      addressGeocode: { autosuggestions: null, status: "idle", error: null },
      rentStabilized: { status: "idle", match: null, error: null },
      tenantsRights: { status: "idle", results: null, error: null },
    });

    geojson = {
      features: [
        {
          properties: { pad_bbl: "000222" },
          geometry: { coordinates: [0, 0] },
        },
      ],
    };
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  test("It dispatches expected actions when param is a string", () => {
    fetch
      .mockResponseOnce(JSON.stringify({ ...geojson }), {
        status: 200,
        statusText: "OK",
      })
      .mockResponseOnce(JSON.stringify({ rows: [] }), {
        status: 200,
        statusText: "OK",
      })
      .mockResponseOnce(JSON.stringify({ rows: [] }), {
        status: 200,
        statusText: "OK",
      });

    const expectedActions = [
      { type: types.AddressSearchRequest },
      {
        type: types.AddressSearchSuccess,
        payload: { ...geojson },
      },
      { type: types.RentStabilizedRequest },
      { type: types.RentStabilizedSuccess, payload: { rows: [] } },
      { type: types.TenantsRightsRequest },
      { type: types.TenantsRightsSuccess, payload: { rows: [] } },
      { type: types.GoToSlideIdx, payload: 3 },
    ];

    return store.dispatch(searchRentStabilized("Some NYC address")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("It dispatches expected actions when param is an object", () => {
    fetch.mockResponse(JSON.stringify({ rows: [] }), {
      status: 200,
      statusText: "OK",
    });

    const expectedActions = [
      {
        type: types.AddressSearchSuccess,
        payload: { ...geojson },
      },
      { type: types.RentStabilizedRequest },
      { type: types.RentStabilizedSuccess, payload: { rows: [] } },
      { type: types.TenantsRightsRequest },
      { type: types.TenantsRightsSuccess, payload: { rows: [] } },
      { type: types.GoToSlideIdx, payload: 3 },
    ];

    return store.dispatch(searchRentStabilized(geojson)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("It handles no address search results", () => {
    fetch.mockResponseOnce(JSON.stringify({ features: [] }), {
      status: 200,
      statusText: "OK",
    });

    const expectedActions = [
      { type: types.AddressSearchRequest },
      {
        type: types.AddressSearchSuccess,
        payload: { features: [] },
      },
    ];

    return store.dispatch(searchRentStabilized("Some NYC address")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("It handles BBL not found error", () => {
    fetch.mockResponseOnce(JSON.stringify({ features: [{ properties: {} }] }), {
      status: 200,
      statusText: "OK",
    });

    const expectedActions = [
      { type: types.AddressSearchRequest },
      {
        type: types.AddressSearchSuccess,
        payload: { features: [{ properties: {} }] },
      },
      {
        type: types.RentStabilizedFailure,
        error: new Error(ERROR_MISSING_BBL),
      },
      {
        type: types.GoToSlideIdx,
        payload: 1,
      },
    ];

    return store.dispatch(searchRentStabilized("Some NYC address")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("It handles geocoder API server error", () => {
    fetch.mockReject(new Error("Server Error"));

    const expectedActions = [
      { type: types.AddressSearchRequest },
      {
        type: types.AddressSearchFailure,
        error: new Error("Server Error"),
      },
    ];

    return store.dispatch(searchRentStabilized("Some NYC address")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("It handles RS server error", () => {
    fetch
      .mockResponseOnce(
        JSON.stringify({ features: [{ properties: { pad_bbl: "01010101" } }] }),
        {
          status: 200,
          statusText: "OK",
        }
      )
      .mockReject(new Error("Server Error"));

    const expectedActions = [
      { type: types.AddressSearchRequest },
      {
        type: types.AddressSearchSuccess,
        payload: { features: [{ properties: { pad_bbl: "01010101" } }] },
      },
      {
        type: types.RentStabilizedRequest,
      },
      {
        type: types.RentStabilizedFailure,
        error: new Error("Server Error"),
      },
      {
        type: types.RentStabilizedFailure,
        error: ERROR_RS,
      },
      {
        type: types.GoToSlideIdx,
        payload: 1,
      },
    ];

    return store.dispatch(searchRentStabilized("Some NYC address")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
