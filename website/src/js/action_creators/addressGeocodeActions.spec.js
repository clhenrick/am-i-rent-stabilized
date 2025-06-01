import { configureStore } from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "jest-fetch-mock";
import * as actions from "./addressGeocodeActions";
import * as types from "../constants/actionTypes";

fetchMock.enableMocks();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("addressGeocodeActions", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("should create an action to reset the address state slice", () => {
    expect(actions.resetAddressState()).toEqual({
      type: types.ResetAddressState,
    });
  });

  test("should create an action for an address search request", () => {
    expect(actions.addressSearchRequest()).toEqual({
      type: types.AddressSearchRequest,
    });
  });

  test("should create an action for an address search success", () => {
    const payload = { features: [] };
    expect(actions.addressSearchSuccess(payload)).toEqual({
      type: types.AddressSearchSuccess,
      payload: { features: [] },
    });
  });

  test("should create an action for an address search failure", () => {
    expect(actions.addressSearchFailure(new Error())).toEqual({
      type: types.AddressSearchFailure,
      error: new Error(),
    });
  });

  test("creates AddressSearchSuccess when fetching address search is done", () => {
    fetchMock.mockResponse(JSON.stringify({ features: [] }), {
      status: 200,
      statusText: "OK",
    });

    const expectedActions = [
      { type: types.AddressSearchRequest },
      { type: types.AddressSearchSuccess, payload: { features: [] } },
    ];
    const store = mockStore({
      addressGeocode: { searchResult: null, status: "idle", error: null },
    });

    return store
      .dispatch(actions.addressSearchFetch("Some NYC address"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("creates AddressSearchFailure when fetching address search errors", () => {
    fetch.mockReject(new Error("Something bad happened"));

    const expectedActions = [
      { type: types.AddressSearchRequest },
      {
        type: types.AddressSearchFailure,
        error: new Error("Something bad happened"),
      },
    ];
    const store = mockStore({
      addressGeocode: { searchResult: null, status: "idle", error: null },
    });

    return store
      .dispatch(actions.addressSearchFetch("Another NYC address"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should create an action for an address autosuggest request", () => {
    expect(actions.addressAutosuggestRequest()).toEqual({
      type: types.AddressAutosuggestRequest,
    });
  });

  test("should create an action for an address autosuggest success", () => {
    const payload = { features: [] };
    expect(actions.addressAutosuggestSuccess(payload)).toEqual({
      type: types.AddressAutosuggestSuccess,
      payload: { features: [] },
    });
  });

  test("should create an action for an address autosuggest failure", () => {
    expect(actions.addressAutosuggestFailure(new Error())).toEqual({
      type: types.AddressAutosuggestFailure,
      error: new Error(),
    });
  });

  test("creates AddressAutosuggestSuccess when fetching address autosuggestions is done", () => {
    fetchMock.mockResponse(JSON.stringify({ features: [] }), {
      status: 200,
      statusText: "OK",
    });

    const expectedActions = [
      { type: types.AddressAutosuggestRequest },
      { type: types.AddressAutosuggestSuccess, payload: { features: [] } },
    ];
    const store = mockStore({
      addressGeocode: { autosuggestions: null, status: "idle", error: null },
    });

    return store
      .dispatch(actions.addressAutosuggestFetch("Some NYC address"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("creates AddressAutosuggestFailure when fetching address autosuggestions errors", () => {
    fetchMock.mockReject(new Error("Something bad happened"));

    const expectedActions = [
      { type: types.AddressAutosuggestRequest },
      {
        type: types.AddressAutosuggestFailure,
        error: new Error("Something bad happened"),
      },
    ];
    const store = mockStore({
      addressGeocode: { autosuggestions: null, status: "idle", error: null },
    });

    return store
      .dispatch(actions.addressAutosuggestFetch("Another NYC address"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
