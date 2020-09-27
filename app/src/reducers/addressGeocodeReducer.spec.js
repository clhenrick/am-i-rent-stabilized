import * as types from "../constants/actionTypes";
import { addressGeocode, initialState } from "./addressGeocodeReducer";

describe("addressGeocode Reducer", () => {
  test("Should return the initial state", () => {
    expect(addressGeocode(undefined, {})).toEqual({
      status: "idle",
      result: null,
      error: null,
    });
  });

  test("Should handle AddressGeocodeRequest", () => {
    expect(
      addressGeocode(initialState, {
        type: types.AddressGeocodeRequest,
      })
    ).toEqual({
      status: "fetching",
      result: null,
      error: null,
    });
  });

  test("Should handle AddressGeocodeSuccess", () => {
    expect(
      addressGeocode(initialState, {
        type: types.AddressGeocodeSuccess,
        payload: { features: [] },
      })
    ).toEqual({
      status: "idle",
      result: { features: [] },
      error: null,
    });
  });

  test("Should handle AddressGeocodeFailure", () => {
    expect(
      addressGeocode(initialState, {
        type: types.AddressGeocodeFailure,
        error: new Error(),
      })
    ).toEqual({
      status: "failure",
      result: null,
      error: new Error(),
    });
  });
});
