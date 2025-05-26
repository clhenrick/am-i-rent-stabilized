import * as types from "../constants/actionTypes";
import {
  rentStabilizedGeoJson,
  initialState,
} from "./rentStabilizedGeoJsonReducer";

describe("rentStabilizedGeoJson reducer", () => {
  test("Should return the default state", () => {
    expect(rentStabilizedGeoJson(undefined, {})).toEqual(initialState);
  });

  test("Should handle RentStabilizedGeoJsonRequest", () => {
    expect(
      rentStabilizedGeoJson(initialState, {
        type: types.RentStabilizedGeoJsonRequest,
      })
    ).toEqual({
      ...initialState,
      status: "pending",
    });
  });

  test("Should handle RentStabilizedGeoJsonSuccess", () => {
    expect(
      rentStabilizedGeoJson(initialState, {
        type: types.RentStabilizedGeoJsonSuccess,
        payload: [],
      })
    ).toEqual({
      ...initialState,
      status: "idle",
      geojson: [],
    });
  });

  test("Should handle RentStabilizedGeoJsonFailure", () => {
    expect(
      rentStabilizedGeoJson(initialState, {
        type: types.RentStabilizedGeoJsonFailure,
        error: new Error(),
      })
    ).toEqual({
      ...initialState,
      status: "error",
      error: new Error(),
    });
  });

  test("Should handle RentStabilizedGeoJsonReset", () => {
    expect(
      rentStabilizedGeoJson(
        {
          status: "idle",
          geojson: [],
          error: null,
        },
        {
          type: types.RentStabilizedGeoJsonReset,
        }
      )
    ).toEqual({
      status: "idle",
      error: null,
      geojson: null,
    });
  });

  test("Should handle ResetAppState", () => {
    expect(
      rentStabilizedGeoJson(
        {
          status: "idle",
          match: [],
          error: null,
        },
        {
          type: types.ResetAppState,
        }
      )
    ).toEqual({
      status: "idle",
      error: null,
      geojson: null,
    });
  });
});
