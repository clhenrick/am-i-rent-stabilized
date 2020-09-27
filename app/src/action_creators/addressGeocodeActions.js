import "cross-fetch/polyfill";

import {
  AddressGeocodeRequest,
  AddressGeocodeSuccess,
  AddressGeocodeFailure,
} from "../constants/actionTypes";

export const addressGeocodeRequest = () => ({
  type: AddressGeocodeRequest,
});

export const addressGeocodeSuccess = (payload) => ({
  type: AddressGeocodeSuccess,
  payload,
});

export const addressGeocodeFailure = (error) => ({
  type: AddressGeocodeFailure,
  error,
});

export const addressGeocodeFetch = (text) => (dispatch) => {
  dispatch(addressGeocodeRequest());
  return fetch(
    `https://geosearch.planninglabs.nyc/v1/autocomplete?text=${text}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Problem fetching geosearch data");
      }
    })
    .then((json) => {
      dispatch(addressGeocodeSuccess(json));
    })
    .catch((error) => {
      dispatch(addressGeocodeFailure(error));
    });
};
