import "cross-fetch/polyfill";

import * as types from "../constants/actionTypes";

/*
 * Address Autosuggestions Actions
 */
export const addressAutosuggestRequest = () => ({
  type: types.AddressAutosuggestRequest,
});

export const addressAutosuggestSuccess = (payload) => ({
  type: types.AddressAutosuggestSuccess,
  payload,
});

export const addressAutosuggestFailure = (error) => ({
  type: types.AddressAutosuggestFailure,
  error,
});

export const addressAutosuggestFetch = (text) => (dispatch) => {
  dispatch(addressAutosuggestRequest());
  return fetch(
    `https://geosearch.planninglabs.nyc/v1/autocomplete?text=${text}&size=5`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Problem fetching autosuggestions data");
      }
    })
    .then((json) => {
      dispatch(addressAutosuggestSuccess(json));
    })
    .catch((error) => {
      dispatch(addressAutosuggestFailure(error));
    });
};

/*
 * Address Search Actions
 */
export const addressSearchRequest = () => ({
  type: types.AddressSearchRequest,
});

export const addressSearchSuccess = (payload) => ({
  type: types.AddressSearchSuccess,
  payload,
});

export const addressSearchFailure = (error) => ({
  type: types.AddressSearchFailure,
  error,
});

export const addressSearchFetch = (text) => (dispatch) => {
  dispatch(addressSearchRequest());
  return fetch(
    `https://geosearch.planninglabs.nyc/v1/search?text=${text}&size=1`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Problem fetching address search data");
      }
    })
    .then((json) => {
      dispatch(addressSearchSuccess(json));
    })
    .catch((error) => {
      dispatch(addressSearchFailure(error));
    });
};
