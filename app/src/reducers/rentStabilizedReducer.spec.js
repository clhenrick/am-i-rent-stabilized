import { rentStabilized, initialState } from "./rentStabilizedReducer";
import * as types from "../constants/actionTypes";

describe("rentStabilizedReducer", () => {
  test("Should return the default state", () => {
    expect(rentStabilized(undefined, {})).toEqual(initialState);
  });

  test("Should handle RentStabilizedRequest", () => {
    expect(
      rentStabilized(initialState, { type: types.RentStabilizedRequest })
    ).toEqual({
      ...initialState,
      status: "pending",
    });
  });

  test("Should handle RentStabilizedSuccess", () => {
    expect(
      rentStabilized(initialState, {
        type: types.RentStabilizedSuccess,
        payload: { features: [] },
      })
    ).toEqual({
      ...initialState,
      status: "idle",
      match: { features: [] },
    });
  });

  test("Should handle RentStabilizedFailure", () => {
    expect(
      rentStabilized(initialState, {
        type: types.RentStabilizedFailure,
        error: new Error(),
      })
    ).toEqual({
      ...initialState,
      status: "error",
      error: new Error(),
    });
  });

  test("Should handle RentStabilizedReset", () => {
    expect(
      rentStabilized(initialState, {
        type: types.RentStabilizedReset,
      })
    ).toEqual({
      status: "idle",
      error: null,
      match: null,
    });
  });
});
