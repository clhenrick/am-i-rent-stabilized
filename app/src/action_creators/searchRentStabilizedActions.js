import {
  fetchRentStabilized,
  rentStabilizedFailure,
} from "./rentStabilizedActions";
import { addressSearchFetch } from "./addressGeocodeActions";
import { goToSlideIdx } from "./slidesActions";
import { delay } from "../utils/delay";
import { RS_SEARCH_DELAY_MS } from "../constants/app";

export const ERROR_ADDRESS_NOT_FOUND = "Address search result not found";
export const ERROR_MISSING_BBL =
  "Missing BBL property on address search result";
export const ERROR_RS = "Problem looking up rent stabilization data";

export function validateSearchResult(result) {
  if (!result || !result.features || !result.features.length) {
    throw ERROR_ADDRESS_NOT_FOUND;
  }
}

export function validateRS(result) {
  if (!result || !result.rows) {
    throw ERROR_RS;
  }
}

export function getBBL(feature) {
  if (!feature || !feature.properties || !feature.properties.pad_bbl) {
    throw new Error(ERROR_MISSING_BBL);
  }
  return feature.properties.pad_bbl;
}

/**
 * searchRentStabilized
 * This is a compound action creator that handles:
 * 1. geocoding an address inputted by the user
 * 2. looking up the result in the rent stabilized data
 * 3. pausing so the cute animation can play
 * 4. going to the "you might/might not be rent stabilized" slide
 * 5. OR going back to the address search slide if an error occurs
 */
export const searchRentStabilized = (addressText) => async (dispatch) => {
  try {
    const searchResult = await dispatch(addressSearchFetch(addressText));
    validateSearchResult(searchResult);

    const bbl = getBBL(searchResult.features[0]);
    const rsResult = await dispatch(fetchRentStabilized(bbl));
    validateRS(rsResult);

    await delay(RS_SEARCH_DELAY_MS);
    dispatch(goToSlideIdx(3));

    return rsResult;
  } catch (error) {
    if (error === ERROR_ADDRESS_NOT_FOUND) {
      return;
    } else {
      await delay(RS_SEARCH_DELAY_MS);
      dispatch(rentStabilizedFailure(error));
      dispatch(goToSlideIdx(1));
    }
  }
};
