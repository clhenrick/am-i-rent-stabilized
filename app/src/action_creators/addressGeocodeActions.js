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
