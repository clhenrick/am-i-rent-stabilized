import * as types from "../constants/actionTypes";
import { tenantsRights, initialState } from "./tenantsRightsReducer";

describe("tenantsRightsReducer", () => {
  test("Returns the default state", () => {
    expect(tenantsRights(undefined, {})).toEqual(initialState);
  });

  test("Handles TenantsRightsRequest action", () => {
    expect(
      tenantsRights(undefined, {
        type: types.TenantsRightsRequest,
      })
    ).toEqual({
      status: "fetching",
      error: null,
      results: null,
    });
  });

  test("Handles TenantsRightsSuccess action", () => {
    expect(
      tenantsRights(undefined, {
        type: types.TenantsRightsSuccess,
        payload: { rows: [] },
      })
    ).toEqual({
      status: "idle",
      error: null,
      results: { rows: [] },
    });
  });

  test("Handles TenantsRightsError action", () => {
    expect(
      tenantsRights(undefined, {
        type: types.TenantsRightsFailure,
        error: new Error(),
      })
    ).toEqual({
      status: "error",
      error: new Error(),
      results: null,
    });
  });

  test("Handles ResetAppState action", () => {
    expect(
      tenantsRights(undefined, {
        type: types.ResetAppState,
      })
    ).toEqual({
      status: "idle",
      error: null,
      results: null,
    });
  });

  test("Handles tenantsRightsGroupsReset action", () => {
    expect(
      tenantsRights(undefined, {
        type: types.tenantsRightsGroupsReset,
      })
    ).toEqual({
      status: "idle",
      error: null,
      results: null,
    });
  });
});
