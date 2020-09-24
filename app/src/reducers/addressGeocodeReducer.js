import {
  AddressGeocodeRequest,
  AddressGeocodeSuccess,
  AddressGeocodeFailure,
} from "../constants/actionTypes";

export const initialState = {
  status: "idle",
  result: null,
  error: null,
};

export function addressGeocode(state = initialState, action) {
  switch (action.type) {
    case AddressGeocodeRequest:
      return {
        ...state,
        status: "fetching",
      };
    case AddressGeocodeSuccess:
      return {
        ...state,
        status: "idle",
        result: action.payload,
      };
    case AddressGeocodeFailure:
      return {
        ...state,
        status: "failure",
        error: action.error,
      };
    default:
      return state;
  }
}
