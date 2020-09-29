import * as types from "../constants/actionTypes";
import { addressGeocode, initialState } from "./addressGeocodeReducer";

describe("addressGeocode Reducer", () => {
  test("Should return the initial state", () => {
    expect(addressGeocode(undefined, {})).toEqual({
      status: "idle",
      error: null,
      autosuggestions: null,
      searchResult: null,
    });
  });

  test("Should handle AddressSearchRequest", () => {
    expect(
      addressGeocode(initialState, {
        type: types.AddressSearchRequest,
      })
    ).toEqual({
      status: "fetching",
      error: null,
      autosuggestions: null,
      searchResult: null,
    });
  });

  test("Should handle AddressAutosuggestRequest", () => {
    expect(
      addressGeocode(initialState, {
        type: types.AddressAutosuggestRequest,
      })
    ).toEqual({
      status: "fetching",
      error: null,
      autosuggestions: null,
      searchResult: null,
    });
  });

  test("Should handle AddressSearchSuccess", () => {
    expect(
      addressGeocode(initialState, {
        type: types.AddressSearchSuccess,
        payload: { features: [] },
      })
    ).toEqual({
      status: "idle",
      error: null,
      autosuggestions: null,
      searchResult: { features: [] },
    });
  });

  test("Should handle AddressAutosuggestSuccess", () => {
    expect(
      addressGeocode(initialState, {
        type: types.AddressAutosuggestSuccess,
        payload: { features: [] },
      })
    ).toEqual({
      status: "idle",
      error: null,
      autosuggestions: { features: [] },
      searchResult: null,
    });
  });

  test("Should handle AddressSearchFailure", () => {
    expect(
      addressGeocode(initialState, {
        type: types.AddressSearchFailure,
        error: new Error(),
      })
    ).toEqual({
      status: "failure",
      error: new Error(),
      autosuggestions: null,
      searchResult: null,
    });
  });

  test("Should handle AddressAutosuggestFailure", () => {
    expect(
      addressGeocode(initialState, {
        type: types.AddressAutosuggestFailure,
        error: new Error(),
      })
    ).toEqual({
      status: "failure",
      error: new Error(),
      autosuggestions: null,
      searchResult: null,
    });
  });
});
