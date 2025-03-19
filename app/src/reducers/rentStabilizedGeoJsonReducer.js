import * as types from "../constants/actionTypes";

/**
 * @typedef {object} State
 * @property {string} status
 * @property {null | object}
 * @property {null | object}
 **/

/** @type {State} */
export const initialState = {
  status: "idle",
  geojson: null,
  error: null,
};

/**
 *
 * @param {State} state
 * @param {string} action
 * @returns {State}
 */
export function rentStabilizedGeoJson(state = initialState, action) {
  switch (action.type) {
    case types.RentStabilizedGeoJsonRequest:
      return {
        ...state,
        status: "pending",
      };
    case types.RentStabilizedGeoJsonSuccess:
      return {
        ...state,
        status: "idle",
        geojson: action.payload,
      };
    case types.RentStabilizedGeoJsonFailure:
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    case types.ResetAppState:
    case types.RentStabilizedGeoJsonReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
