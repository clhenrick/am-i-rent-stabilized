import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./addressGeocodeActions";
import * as types from "../constants/actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("addressGeocodeActions", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should create an action for an address geocode request", () => {
    expect(actions.addressGeocodeRequest()).toEqual({
      type: types.AddressGeocodeRequest,
    });
  });

  test("should create an action for an address geocode success", () => {
    const payload = { features: [] };
    expect(actions.addressGeocodeSuccess(payload)).toEqual({
      type: types.AddressGeocodeSuccess,
      payload: { features: [] },
    });
  });

  test("should create an action for an address geocode failure", () => {
    expect(actions.addressGeocodeFailure(new Error())).toEqual({
      type: types.AddressGeocodeFailure,
      error: new Error(),
    });
  });

  test("creates AddressGeocodeSuccess when fetching address geocode data is done", () => {
    fetch.mockResponse(JSON.stringify({ features: [] }), {
      status: 200,
      statusText: "OK",
    });

    const expectedActions = [
      { type: types.AddressGeocodeRequest },
      { type: types.AddressGeocodeSuccess, payload: { features: [] } },
    ];
    const store = mockStore({
      addressGeocode: { result: null, status: "idle", error: null },
    });

    return store
      .dispatch(actions.addressGeocodeFetch("Some NYC address..."))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("creates AddressGeocodeFailure when fetching address geocode data errors", () => {
    fetch.mockReject(new Error("Something bad happened"));

    const expectedActions = [
      { type: types.AddressGeocodeRequest },
      {
        type: types.AddressGeocodeFailure,
        error: new Error("Something bad happened"),
      },
    ];
    const store = mockStore({
      addressGeocode: { result: null, status: "idle", error: null },
    });

    return store
      .dispatch(actions.addressGeocodeFetch("Another NYC address"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
