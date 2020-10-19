import { Component } from "./_componentBase";
import { observeStore } from "../store";

export class SearchResultMap extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();

    this.updateMapView = this.updateMapView.bind(this);
    this.handleSearchResult = this.handleSearchResult.bind(this);

    observeStore(
      this.store,
      (state) => state.addressGeocode.searchResult,
      this.handleSearchResult
    );
  }

  handleSearchResult() {
    // TODO: validate search result feature (try / catch ?)
    if (
      this.searchResult &&
      this.searchResult.features &&
      this.searchResult.features.length
    ) {
      const {
        geometry: { coordinates },
        properties: { name, borough, region_a, postalcode },
      } = this.searchResult.features[0];
      this.updateMapView({
        coordinates,
        name,
        borough,
        state: region_a,
        zipcode: postalcode,
      });
    }
  }

  updateMapView(feature) {
    const { coordinates, name, borough, state, zipcode } = feature;
    console.log(coordinates, name, borough, state, zipcode);
  }

  get searchResult() {
    const {
      addressGeocode: { searchResult },
    } = this.store.getState();
    return searchResult;
  }
}
