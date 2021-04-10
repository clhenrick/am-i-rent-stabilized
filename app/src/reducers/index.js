import { combineReducers } from "redux";
import { slides } from "./slidesReducer";
import { addressGeocode } from "./addressGeocodeReducer";
import { rentStabilized } from "./rentStabilizedReducer";
import { tenantsRights } from "./tenantsRightsReducer";

export const rootReducer = combineReducers({
  slides,
  addressGeocode,
  tenantsRights,
  rentStabilized,
});
