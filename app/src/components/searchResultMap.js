import { Component } from "./_componentBase";
import { observeStore } from "../store";
import { mapsApiSql } from "../utils/sql";
const d3 = Object.assign({}, require("d3-tile"), require("d3-geo"));

export class SearchResultMap extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();

    this.width = 550;
    this.height = 300;
    this.zoom = 20;
    this._projection = d3.geoMercator();

    this.updateMapView = this.updateMapView.bind(this);
    this.handleSearchResult = this.handleSearchResult.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.tonerTileUrl = this.tonerTileUrl.bind(this);

    observeStore(
      this.store,
      (state) => state.addressGeocode.searchResult,
      this.handleSearchResult
    );
  }

  handleSearchResult() {
    if (
      this.searchResult &&
      this.searchResult.features &&
      this.searchResult.features.length
    ) {
      this.updateMapView();
    }
  }

  updateMapView() {
    if (!this.searchResultDetails || !this.searchResultDetails.coordinates) {
      return;
    }
    const {
      coordinates,
      name,
      borough,
      state,
      zipcode,
    } = this.searchResultDetails;
    console.log(coordinates, name, borough, state, zipcode);
    this.projection = { zoom: 26, center: coordinates };
    this.renderMap();
  }

  renderMap() {}

  tonerTileUrl(x, y, z) {
    return `https://stamen-tiles-${
      "abc"[Math.abs(x + y) % 3]
    }.a.ssl.fastly.net/toner-lite/${z}/${x}/${y}${
      devicePixelRatio > 1 ? "@2x" : ""
    }.png`;
  }

  get searchResultDetails() {
    try {
      const {
        geometry: { coordinates },
        properties: { name, borough, region_a, postalcode },
      } = this.searchResult.features[0];
      return {
        coordinates,
        name,
        borough,
        state: region_a,
        zipcode: postalcode,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  get searchResult() {
    const {
      addressGeocode: { searchResult },
    } = this.store.getState();
    return searchResult;
  }

  get projection() {
    return this._projection;
  }

  set projection({ center, zoom }) {
    this._projection = d3
      .geoMercator()
      .center(center)
      .scale(Math.pow(2, zoom) / (2 * Math.PI))
      .translate([this.width / 2, this.height / 2]);
  }

  get tile() {
    return d3
      .tile()
      .size([this.width, this.height])
      .scale(this.projection.scale() * 2 * Math.PI)
      .translate(this.projection([0, 0]));
  }

  get tiles() {
    return this.tile();
  }

  get cartocss() {
    return `#layer {
      polygon-fill: orange;
      polygon-opacity: 1;
      line-width: 0;
    }`;
  }

  get mapsApiConfig() {
    return {
      layers: [
        {
          type: "cartodb",
          options: {
            sql: mapsApiSql,
            cartocss: this.cartocss,
            cartocss_version: "2.1.0",
          },
        },
      ],
    };
  }
}
