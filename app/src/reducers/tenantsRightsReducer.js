import * as types from "../constants/actionTypes";

const initialState = {
  status: "idle",
  results: null,
  error: null,
};

export function tenantsRights(state = initialState, action) {
  switch (action.type) {
    case types.TenantsRightsRequest:
      return {
        ...state,
        status: "pending",
      };
    case types.TenantsRightsSuccess:
      return {
        ...state,
        status: "idle",
        results: action.payload,
      };
    case types.TenantsRightsFailure:
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    case types.ResetAppState:
    case types.TenantsRightsReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
