import { combineReducers } from "redux";
import { slides } from "./slidesReducer.js";
import { addressGeocode } from "./addressGeocodeReducer.js";
import { rentStabilized } from "./rentStabilizedReducer.js";
import { rentStabilizedGeoJson } from "./rentStabilizedGeoJsonReducer.js";
import { tenantsRights } from "./tenantsRightsReducer.js";

export const rootReducer = combineReducers({
  slides,
  addressGeocode,
  tenantsRights,
  rentStabilized,
  rentStabilizedGeoJson,
});
