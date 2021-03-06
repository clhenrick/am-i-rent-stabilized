import { geoMercator } from "d3-geo";
import { Component } from "./_componentBase";
import { MapTileLayers } from "./mapTileLayers";
import { MapPopup } from "./mapPopup";
import { observeStore } from "../store";
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
    this.zoom = MAP_ZOOM.RESULT;
    this.center = coordinates;
    this.renderMap();
    this.showMarker();
    this.setMarkerPosition();
    this.popup.show();
    this.popup.setContent({ name, borough, state, zipcode });
    this.popup.setPosition();
  }

  renderMap() {
    this.setMapSize();
    this.gBaseTiles.innerHTML = this.mapTileLayers.renderMapTiles("basemap");
    this.gRsTiles.innerHTML = this.mapTileLayers.renderMapTiles("data");
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
