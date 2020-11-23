import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as types from "../constants/actionTypes";
import * as actions from "./rentStabilizedActions";
import { logException } from "../utils/logging";

jest.mock("../utils/logging");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("rentStabilizedActions", () => {
  let store;

  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      rentStabilized: {
        status: "idle",
        error: null,
        match: null,
      },
    });
  });

  test("creates a rent stabilized request action", () => {
    expect(actions.rentStabilizedRequest()).toEqual({
      type: types.RentStabilizedRequest,
    });
  });

  test("creates a rent stabilized success action", () => {
    expect(actions.rentStabilizedSuccess({ features: [] })).toEqual({
      type: types.RentStabilizedSuccess,
      payload: { features: [] },
    });
  });

  test("creates a rent stabilized error action", () => {
    expect(actions.rentStabilizedFailure(new Error())).toEqual({
      type: types.RentStabilizedFailure,
      error: new Error(),
    });
  });

  test("creates a rent stabilized reset action", () => {
    expect(actions.rentStabilizedReset()).toEqual({
      type: types.RentStabilizedReset,
    });
  });

  test("creates expected actions when fetching data is successful", () => {
    fetch.mockResponse(JSON.stringify({ rows: [{}] }), {
      status: 200,
      statusText: "OK",
    });

    const expectedActions = [
      { type: types.RentStabilizedRequest },
      { type: types.RentStabilizedSuccess, payload: { rows: [{}] } },
    ];

    return store.dispatch(actions.fetchRentStabilized("123456789")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("creates expected actions when fetching data fails", () => {
    fetch.mockReject(new Error("Problem fetching rent stabilized lookup data"));

    const expectedActions = [
      { type: types.RentStabilizedRequest },
      {
        type: types.RentStabilizedFailure,
        error: new Error("Problem fetching rent stabilized lookup data"),
      },
    ];

    return store.dispatch(actions.fetchRentStabilized("123456789")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(logException).toHaveBeenCalled();
    });
  });
});
