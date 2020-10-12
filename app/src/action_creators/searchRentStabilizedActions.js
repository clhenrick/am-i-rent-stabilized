import {
  fetchRentStabilized,
  rentStabilizedFailure,
} from "./rentStabilizedActions";
import { addressSearchFetch } from "./addressGeocodeActions";
import { goToSlideIdx } from "./slidesActions";
import { delay } from "../utils/delay";
import { RS_SEARCH_DELAY_MS } from "../constants/app";

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
    const {
      properties: { pad_bbl },
    } = searchResult.features[0];
    const rsResult = await dispatch(fetchRentStabilized(pad_bbl));
    await delay(RS_SEARCH_DELAY_MS);
    dispatch(goToSlideIdx(3));
    return rsResult;
  } catch (error) {
    await delay(RS_SEARCH_DELAY_MS);
    dispatch(rentStabilizedFailure(error));
    dispatch(goToSlideIdx(1));
  }
};
