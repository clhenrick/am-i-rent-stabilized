import { cartoAPIv3BaseURL, cartoApiKey } from "../constants/config";
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
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${cartoApiKey}`);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  dispatch(rentStabilizedRequest());
  return fetch(
    `${cartoAPIv3BaseURL}/v3/sql/carto_dw/query?q=${window.encodeURIComponent(
      rentStabilizedBblSql(bbl)
    )}`,
    requestOptions
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
