import { geoMercator } from "d3-geo";
import { Component } from "./_componentBase";
import { MapTileLayers } from "./mapTileLayers";
import { MapPopup } from "./mapPopup";
import { MapLikelyRsLayer } from "./mapLikelyRsLayer";
import { observeStore } from "../store";
import { fetchRentStabilizedGeoJSON } from "../action_creators/rentStabilizedGeoJsonActions";
import {
  MAP_ZOOM,
  MAP_CENTER,
  MAP_MARKER,
  MAP_BORDER_WIDTH,
} from "../constants/app";

export class SearchResultMap extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();

    this.svg = this.element.querySelector("svg");
    this.gBaseTiles = this.svg.querySelector("g.tiles-base-map");
    this.gRsTiles = this.svg.querySelector("g.tiles-rent-stabilized");
    this.marker = this.svg.querySelector("g.location-marker");
    this.popup = new MapPopup({
      element: this.element.querySelector("div.map-pop-up"),
      map: this,
    });

    this._zoom = MAP_ZOOM.DEFAULT;
    this._center = MAP_CENTER.DEFAULT;
    this._projection = geoMercator();

    this.mapTileLayers = new MapTileLayers(this);
    this.mapLikelyRsLayer = new MapLikelyRsLayer(this);

    this.updateProjection = this.updateProjection.bind(this);
    this.updateMapView = this.updateMapView.bind(this);
    this.handleSearchResult = this.handleSearchResult.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.resetMap = this.resetMap.bind(this);

    this.unsubscribe = observeStore(
      this.store,
      (state) => state.addressGeocode.searchResult,
      this.handleSearchResult
    );

    // FIXME: need to update `observeStore` to subscribe to multiple slices of state?
    // TODO: handle calling `this.unsubscribe2()` in cleanup fn?
    this.unsubscribe2 = observeStore(
      this.store,
      (state) => state.rentStabilizedGeoJson.geojson,
      this.handleRentStabilizedGeoJson
    );
  }

  async handleRentStabilizedGeoJson(geojson) {
    if (Array.isArray(geojson?.rows) && geojson?.rows.length) {
      // TODO: handle converting row objects into GeoJSON features with correct polygon coordinate winding order
      console.log("handleRentStabilizedGeoJson: ", geojson.rows);
    }
  }

  async handleSearchResult() {
    const hasSearchResult = this.searchResult?.features?.length;

    if (hasSearchResult) {
      await this.fetchRentStabilizedGeoJson();
      await this.updateMapView();
    }
  }

  async fetchRentStabilizedGeoJson() {
    const feature = this.searchResult.features[0];
    if (
      Array.isArray(feature?.geometry?.coordinates) &&
      feature.geometry.coordinates.length
    ) {
      const [lon, lat] = feature.geometry.coordinates;
      this.store.dispatch(fetchRentStabilizedGeoJSON({ lon, lat }));
    }
  }

  async updateMapView() {
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
    this.zoom = MAP_ZOOM.RESULT;
    this.center = coordinates;
    await this.renderMap();
    this.showMarker();
    this.setMarkerPosition();
    this.popup.show();
    this.popup.setContent({ name, borough, state, zipcode });
    this.popup.setPosition();
  }

  async renderMap() {
    this.setMapSize();
    this.gBaseTiles.innerHTML = this.mapTileLayers.renderMapTiles();
    const likelyRsLayer = await this.mapLikelyRsLayer.renderMapLikelyRsLayer();
    if (likelyRsLayer) {
      this.gRsTiles.innerHTML = likelyRsLayer;
    }
  }

  setMapSize() {
    const { width, height } = this.dimensions;
    this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  setMarkerPosition() {
    const { width, height } = this.dimensions;
    this.marker.setAttribute(
      "transform",
      `translate(${width / 2 - MAP_MARKER.WIDTH / 2}, ${
        height / 2 - MAP_MARKER.HEIGHT
      }), scale(2)`
    );
  }

  updateProjection() {
    const { width, height } = this.dimensions;
    this.projection
      .center(this.center)
      .scale(Math.pow(2, this.zoom) / (2 * Math.PI))
      .translate([width / 2, height / 2]);
  }

  showMarker() {
    this.marker.setAttribute("opacity", 1);
  }

  hideMarker() {
    this.marker.setAttribute("opacity", 0);
  }

  resetMap() {
    this.zoom = MAP_ZOOM.DEFAULT;
    this.center = MAP_CENTER.DEFAULT;
    this.hideMarker();
    this.popup.hide();
    this.renderMap();
  }

  get dimensions() {
    let { width, height } = this.element.getBoundingClientRect();
    width -= MAP_BORDER_WIDTH * 2;
    height -= MAP_BORDER_WIDTH * 2;
    return { width, height };
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
      return false;
    }
  }

  get searchResult() {
    const {
      addressGeocode: { searchResult },
    } = this.store.getState();
    return searchResult;
  }

  get zoom() {
    return this._zoom;
  }

  set zoom(value) {
    if (value && typeof value === "number") {
      this._zoom = value;
      this.updateProjection();
    } else {
      throw "zoom should be an integer";
    }
  }

  get center() {
    return this._center;
  }

  set center(coords) {
    if (Array.isArray(coords) && coords.length === 2) {
      this._center = coords;
      this.updateProjection();
    } else {
      throw "center must be an array with lat lon coordinates.";
    }
  }

  get projection() {
    return this._projection;
  }
}
