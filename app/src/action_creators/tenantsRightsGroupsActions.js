import "cross-fetch/polyfill";
import * as types from "../constants/actionTypes";
import { cartoApiKey, cartoAPIv3BaseURL } from "../constants/config";
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
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${cartoApiKey}`);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  dispatch(tenantsRightsGroupsRequest());
  return fetch(
    `${cartoAPIv3BaseURL}/v3/sql/carto_dw/query?q=${window.encodeURIComponent(
      tenantsRightsGroupsSql({ lon, lat })
    )}`,
    requestOptions
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
    });
};
