import { combineReducers } from "redux";
import { slides } from "./slidesReducer";
import { addressGeocode } from "./addressGeocodeReducer";

export const rootReducer = combineReducers({ slides, addressGeocode });
