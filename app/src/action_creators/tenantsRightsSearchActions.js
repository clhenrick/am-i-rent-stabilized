import "cross-fetch/polyfill";
import * as types from "../constants/actionTypes";
import { cartoAccount } from "../constants/config";
import { tenantsRightsSearchSql } from "../utils/sql";

export const tenantsRightsSearchRequest = () => ({
  type: types.TenantsRightsRequest,
});

export const tenantsRightsSearchSuccess = (payload) => ({
  type: types.TenantsRightsSuccess,
  payload,
});

export const tenantsRightsSearchFailure = (error) => ({
  type: types.TenantsRightsFailure,
  error,
});

export const tenantsRightsSearchReset = () => ({
  type: types.TenantsRightsReset,
});

export const tenantsRightsSearchFetch = ({ lon, lat }) => (dispatch) => {
  dispatch(tenantsRightsSearchRequest());
  return fetch(
    `https://${cartoAccount}.cartodb.com/api/v2/sql?q=${window.encodeURIComponent(
      tenantsRightsSearchSql({ lon, lat })
    )}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Problem fetching tenants rights search data");
    })
    .then((json) => {
      dispatch(tenantsRightsSearchSuccess(json));
    })
    .catch((error) => {
      dispatch(tenantsRightsSearchFailure(error));
      return error;
    });
};
