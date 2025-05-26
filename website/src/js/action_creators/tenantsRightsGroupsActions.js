import * as types from "../constants/actionTypes";
import { cartoAPIv3BaseURL } from "../constants/config";
import { getCartoSqlApiAuthOptions } from "../utils/cartoSqlApiAuth";
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

export const fetchTenantsRightsGroups =
  ({ lon, lat }) =>
  (dispatch) => {
    const requestOptions = getCartoSqlApiAuthOptions();

    dispatch(tenantsRightsGroupsRequest());

    return fetch(
      `${cartoAPIv3BaseURL}/v3/sql/carto_dw/query?q=${window.encodeURIComponent(
        tenantsRightsGroupsSql({ lon, lat }),
      )}`,
      requestOptions,
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
