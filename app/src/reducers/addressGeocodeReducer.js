import * as types from "../constants/actionTypes";

export const initialState = {
  status: "idle",
  error: null,
  autosuggestions: null,
  searchResult: null,
};

export function addressGeocode(state = initialState, action) {
  switch (action.type) {
    case types.AddressSearchRequest:
    case types.AddressAutosuggestRequest:
      return {
        ...state,
        status: "fetching",
      };
    case types.AddressSearchSuccess:
      return {
        ...state,
        status: "idle",
        searchResult: action.payload,
      };
    case types.AddressAutosuggestSuccess:
      return {
        ...state,
        status: "idle",
        autosuggestions: action.payload,
      };
    case types.AddressSearchFailure:
    case types.AddressAutosuggestFailure:
      return {
        ...state,
        status: "failure",
        error: action.error,
      };
    case types.ResetAppState:
    case types.ResetAddressState:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
