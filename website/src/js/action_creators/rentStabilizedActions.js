import { cartoAPIv3BaseURL } from "../constants/config";
import { rentStabilizedBblSql } from "../utils/sql";
import { getCartoSqlApiAuthOptions } from "../utils/cartoSqlApiAuth";
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

/**
 * Async action creator that makes a GET request the Carto SQL API to query taxlots identified as likely rent-stabilized (RS)
 * @param {number} bbl the "Borough,Block,Lot" number of the NYC geocoded address to search for
 * @returns {Promise<Error|object>}
 */
export const fetchRentStabilized = (bbl) => (dispatch) => {
  const url = `${cartoAPIv3BaseURL}/v3/sql/carto_dw/query`;
  const requestOptions = getCartoSqlApiAuthOptions();

  dispatch(rentStabilizedRequest());

  return fetch(
    `${url}?q=${window.encodeURIComponent(rentStabilizedBblSql(bbl))}`,
    requestOptions,
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
