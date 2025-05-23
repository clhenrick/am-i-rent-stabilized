import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as types from "../constants/actionTypes";
import * as actions from "./tenantsRightsGroupsActions";

const mockStore = configureMockStore([thunk]);

describe("tenantsRightsSearchActions", () => {
  let store;

  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      tenantsRights: {
        status: "idle",
        error: null,
        match: null,
      },
    });
  });

  test("creates a tenants rights request action", () => {
    expect(actions.tenantsRightsGroupsRequest()).toEqual({
      type: types.TenantsRightsRequest,
    });
  });

  test("creates a tenants rights success action", () => {
    expect(actions.tenantsRightsGroupsSuccess()).toEqual({
      type: types.TenantsRightsSuccess,
    });
  });

  test("creates a tenants rights error action", () => {
    expect(actions.tenantsRightsGroupsFailure(new Error())).toEqual({
      type: types.TenantsRightsFailure,
      error: new Error(),
    });
  });

  test("creates a tenants rights reset action", () => {
    expect(actions.tenantsRightsGroupsReset()).toEqual({
      type: types.TenantsRightsReset,
    });
  });

  test("creates expected actions when fetching data is successful", () => {
    fetch.mockResponse(JSON.stringify({ rows: [{}] }), {
      status: 200,
      statusText: "OK",
    });

    const expectedActions = [
      { type: types.TenantsRightsRequest },
      { type: types.TenantsRightsSuccess, payload: { rows: [{}] } },
    ];

    return store
      .dispatch(actions.fetchTenantsRightsGroups({ lat: -79, lon: 41 }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("creates expected actions when fetching data fails", () => {
    fetch.mockReject(new Error("Problem fetching tenants rights groups data"));

    const expectedActions = [
      { type: types.TenantsRightsRequest },
      {
        type: types.TenantsRightsFailure,
        error: new Error("Problem fetching tenants rights groups data"),
      },
    ];

    return store
      .dispatch(actions.fetchTenantsRightsGroups({ lat: -79, lon: 41 }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
