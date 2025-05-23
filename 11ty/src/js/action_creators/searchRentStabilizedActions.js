import {
  fetchRentStabilized,
  rentStabilizedFailure,
} from "./rentStabilizedActions";
import {
  addressSearchFetch,
  addressSearchSuccess,
} from "./addressGeocodeActions";
import { goToSlideIdx } from "./slidesActions";
import { delay } from "../utils/delay";
import { RS_SEARCH_DELAY_MS } from "../constants/app";
import { fetchRentStabilizedGeoJSON } from "./rentStabilizedGeoJsonActions";

export const ERROR_ADDRESS_NOT_FOUND = "Address search result not found";
export const ERROR_MISSING_BBL =
  "Missing BBL property on address search result";
export const ERROR_RS = "Problem looking up rent stabilization data";
export const ERROR_MISSING_COORDS =
  "Missing coordinates from address search result";

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
  if (!feature?.properties?.addendum?.pad?.bbl) {
    throw new Error(ERROR_MISSING_BBL);
  }
  return feature.properties.addendum.pad.bbl;
}

/**
 * searchRentStabilized
 * @param {string | object } addressInfo The address to be searched
 * This is a compound action creator that handles:
 * 1. geocoding an address inputted by the user
 * 2. looking up the result in the rent stabilized data
 * 3. querying geojson of rent stabilized properties nearby the search result to display in the map
 * 4. pausing so the cute animation can play
 * 5. going to the "you might/might not be rent stabilized" slide
 * 6. OR going back to the address search slide if an error occurs
 */
export const searchRentStabilized = (addressInfo) => async (dispatch) => {
  try {
    let searchResult;

    if (typeof addressInfo === "string") {
      searchResult = await dispatch(addressSearchFetch(addressInfo));
    } else if (typeof addressInfo === "object" && "features" in addressInfo) {
      dispatch(addressSearchSuccess(addressInfo));
      searchResult = { ...addressInfo };
    } else {
      throw new Error(
        "param `address` must be an address (string) or object (FeatureCollection)"
      );
    }

    validateSearchResult(searchResult);

    const searchResultFeature = searchResult.features[0];
    const rsResult = await dispatch(
      fetchRentStabilized(getBBL(searchResultFeature))
    );

    validateRS(rsResult);

    if (
      Array.isArray(searchResultFeature?.geometry?.coordinates) &&
      searchResultFeature.geometry.coordinates.length
    ) {
      const [lon, lat] = searchResultFeature.geometry.coordinates;
      await dispatch(fetchRentStabilizedGeoJSON({ lon, lat }));
    }

    await delay(RS_SEARCH_DELAY_MS);
    dispatch(goToSlideIdx(3));

    return rsResult;
  } catch (error) {
    if (error === ERROR_ADDRESS_NOT_FOUND) {
      return;
    }
    await delay(RS_SEARCH_DELAY_MS);
    dispatch(rentStabilizedFailure(error));
    dispatch(goToSlideIdx(1));
  }
};
