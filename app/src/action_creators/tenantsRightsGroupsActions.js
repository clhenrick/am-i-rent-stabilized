import "cross-fetch/polyfill";
import * as types from "../constants/actionTypes";
import { cartoAccount } from "../constants/config";
import { tenantsRightsGroupsSql } from "../utils/sql";

export const tenantsRightsGroupsRequest = () => ({
  type: types.TenantsRightsRequest,
});

export const tenantsRightsGroupsSuccess = (payload) => ({
  type: types.TenantsRightsSuccess,
  payload,
});

export const tenantsRightsGroupsFailure = (error) => ({
  type: types.TenantsRightsFailure,
  error,
});

export const tenantsRightsGroupsReset = () => ({
  type: types.TenantsRightsReset,
});

export const fetchTenantsRightsGroups = ({ lon, lat }) => (dispatch) => {
  dispatch(tenantsRightsGroupsRequest());
  return fetch(
    `https://${cartoAccount}.cartodb.com/api/v2/sql?q=${window.encodeURIComponent(
      tenantsRightsGroupsSql({ lon, lat })
    )}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Problem fetching tenants rights groups data");
    })
    .then((json) => {
      dispatch(tenantsRightsGroupsSuccess(json));
    })
    .catch((error) => {
      dispatch(tenantsRightsGroupsFailure(error));
      return error;
    });
};
