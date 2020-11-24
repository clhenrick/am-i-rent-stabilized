import "cross-fetch/polyfill";

import { cartoAccount } from "../constants/config";
import { rentStabilizedBblSql } from "../utils/sql";
import * as types from "../constants/actionTypes";

export const rentStabilizedRequest = () => ({
  type: types.RentStabilizedRequest,
});

export const rentStabilizedSuccess = (payload) => ({
  type: types.RentStabilizedSuccess,
  payload,
});

export const rentStabilizedFailure = (error) => ({
  type: types.RentStabilizedFailure,
  error,
});

export const rentStabilizedReset = () => ({
  type: types.RentStabilizedReset,
});

export const fetchRentStabilized = (bbl) => (dispatch) => {
  dispatch(rentStabilizedRequest());
  return fetch(
    `https://${cartoAccount}.cartodb.com/api/v2/sql?q=${window.encodeURIComponent(
      rentStabilizedBblSql(bbl)
    )}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Problem fetching rent stabilized lookup data");
    })
    .then((json) => {
      dispatch(rentStabilizedSuccess(json));
      return json;
    })
    .catch((error) => {
      dispatch(rentStabilizedFailure(error));
      return error;
    });
};
