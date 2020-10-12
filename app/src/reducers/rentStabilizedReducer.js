import * as types from "../constants/actionTypes";

export const initialState = {
  status: "idle",
  match: null,
  error: null,
};

export function rentStabilized(state = initialState, action) {
  switch (action.type) {
    case types.RentStabilizedRequest:
      return {
        ...state,
        status: "pending",
      };
    case types.RentStabilizedSuccess:
      return {
        ...state,
        status: "idle",
        match: action.payload,
      };
    case types.RentStabilizedFailure:
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    case types.RentStabilizedReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
