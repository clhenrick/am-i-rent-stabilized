import { combineReducers } from "redux";
import { slides } from "./slidesReducer";
import { addressGeocode } from "./addressGeocodeReducer";
import { rentStabilized } from "./rentStabilizedReducer";

export const rootReducer = combineReducers({
  slides,
  addressGeocode,
  rentStabilized,
});
