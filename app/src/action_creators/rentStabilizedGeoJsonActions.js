import * as types from "../constants/actionTypes";
import { cartoAPIv3BaseURL } from "../constants/config";
import { cartoSqlApiAuthOptions } from "../utils/cartoSqlApiAuth";
import { rentStabilizedGeomSql } from "../utils/sql";

export const rentStabilizedGeoJsonRequest = () => ({
  type: types.RentStabilizedGeoJsonRequest,
});

export const rentStabilizedGeoJsonSuccess = (payload) => ({
  type: types.RentStabilizedGeoJsonSuccess,
  payload,
});

export const rentStabilizedGeoJsonFailure = (error) => ({
  type: types.RentStabilizedGeoJsonFailure,
  error,
});

export const rentStabilizedGeoJsonReset = () => ({
  type: types.RentStabilizedGeoJsonReset,
});

/**
 * Async action creator that makes a GET request the Carto SQL API to query GeoJSON polygons for likely RS taxlots near the RS search result's coordinates so that they may be rendered on the map
 * @param {object} lonLat
 * @param {number} object.lon - longitude of likely rs search result
 * @param {number} object.lat - latitude of likely rs search result
 * @returns {Promise<Error|object>}
 */
export const fetchRentStabilizedGeoJSON = ({ lon, lat }) => (dispatch) => {
  const url = `${cartoAPIv3BaseURL}/v3/sql/carto_dw/query`;
  const requestOptions = cartoSqlApiAuthOptions();

  dispatch(rentStabilizedGeoJsonRequest());

  return fetch(
    `${url}?q=${encodeURIComponent(rentStabilizedGeomSql({ lon, lat }))}`,
    requestOptions
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Problem fetching rent stabilized geojson");
    })
    .then((json) => {
      dispatch(rentStabilizedGeoJsonSuccess(json));
      return json;
    })
    .catch((error) => {
      dispatch(rentStabilizedGeoJsonFailure(error));
      return error;
    });
};
