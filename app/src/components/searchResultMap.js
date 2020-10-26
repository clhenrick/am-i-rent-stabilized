import "cross-fetch/polyfill";
import { Component } from "./_componentBase";
import { observeStore } from "../store";
import { mapsApiSql } from "../utils/sql";
import { cartoAccount } from "../constants/config";
const d3 = Object.assign({}, require("d3-tile"), require("d3-geo"));

const ZOOM = {
  DEFAULT: 20,
  RESULT: 24,
};
const CENTER = {
  DEFAULT: [-74.006, 40.7128],
};
const MARKER = {
  WIDTH: 16 * 2,
  HEIGHT: 20 * 2,
};
const BORDER_WIDTH = 3;

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
    this.popup = this.element.querySelector("div.map-pop-up");

    this._zoom = ZOOM.DEFAULT;
    this._center = CENTER.DEFAULT;
    this._projection = d3.geoMercator();
    this._cartoTilesSchema = null;

    this.updateProjection = this.updateProjection.bind(this);
    this.updateMapView = this.updateMapView.bind(this);
    this.handleSearchResult = this.handleSearchResult.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderMapTile = this.renderMapTile.bind(this);
    this.renderMapTiles = this.renderMapTiles.bind(this);
    this.getBasemapTileUrl = this.getBasemapTileUrl.bind(this);
    this.getDataTileUrl = this.getDataTileUrl.bind(this);
    this.fetchCartoTilesSchema = this.fetchCartoTilesSchema.bind(this);
    this.resetMap = this.resetMap.bind(this);

    observeStore(
      this.store,
      (state) => state.addressGeocode.searchResult,
      this.handleSearchResult
    );

    this.fetchCartoTilesSchema().then(() => {
      this.updateProjection();
      this.renderMap();
    });
  }

  async fetchCartoTilesSchema() {
    try {
      const mapsApiUrl = `https://${cartoAccount}.carto.com/api/v1/map/`;
      const res = await fetch(
        `${mapsApiUrl}?config=${encodeURIComponent(
          JSON.stringify(this.mapsApiConfig)
        )}`
      );
      const json = await res.json();
      this._cartoTilesSchema = json;
    } catch (error) {
      console.error(error);
    }
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
    this.zoom = ZOOM.RESULT;
    this.center = coordinates;
    this.setPopupContent({ name, borough, state, zipcode });
    this.showPopUp();
    this.showMarker();
    this.renderMap();
  }

  renderMap() {
    this.setMapSize();
    this.setMarkerPosition();
    this.gBaseTiles.innerHTML = this.renderMapTiles("basemap");
    this.gRsTiles.innerHTML = this.renderMapTiles("data");
  }

  setMapSize() {
    const { width, height } = this.dimensions;
    this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  setMarkerPosition() {
    const { width, height } = this.dimensions;
    this.marker.setAttribute(
      "transform",
      `translate(${width / 2 - MARKER.WIDTH / 2}, ${
        height / 2 - MARKER.HEIGHT
      }), scale(2)`
    );
  }

  renderMapTiles(type) {
    return this.tiles
      .map((path, i, transform) => this.renderMapTile(path, transform, type))
      .join("");
  }

  renderMapTile(path, transform, type) {
    const [x, y, z] = path;
    const {
      translate: [tx, ty],
      scale: k,
    } = transform;
    const getTileUrl =
      type === "basemap" ? this.getBasemapTileUrl : this.getDataTileUrl;
    return `<image xlink:href="${getTileUrl(x, y, z)}" x="${Math.round(
      (x + tx) * k
    )}" y="${Math.round((y + ty) * k)}" width="${k}" height="${k}"></image>`;
  }

  getBasemapTileUrl(x, y, z) {
    return `https://cartodb-basemaps-${
      "abc"[Math.abs(x + y) % 3]
    }.global.ssl.fastly.net/light_all/${z}/${x}/${y}${
      devicePixelRatio > 1 ? "@2x" : ""
    }.png`;
  }

  getDataTileUrl(x, y, z) {
    const { layergroupid, cdn_url } = this.cartoTilesSchema;
    const {
      templates: { https },
    } = cdn_url;
    const baseURL = https.url.replace(
      "{s}",
      https.subdomains[Math.abs(x + y) % https.subdomains.length]
    );
    return `${baseURL}/${cartoAccount}/api/v1/map/${layergroupid}/${z}/${x}/${y}${
      devicePixelRatio > 1 ? "@2x" : ""
    }.png`;
  }

  updateProjection() {
    const { width, height } = this.dimensions;
    this._projection
      .center(this.center)
      .scale(Math.pow(2, this.zoom) / (2 * Math.PI))
      .translate([width / 2, height / 2]);
  }

  setPopupContent(props) {
    if (!props) {
      this.popup.innerHTML = "";
    } else {
      const { name, borough, state, zipcode } = props;
      this.popup.innerHTML = `<p>${name}</p><p>${borough} ${state} ${zipcode}</p>`;
    }
  }

  showPopUp() {
    this.popup.classList.remove("hidden");
  }

  hidePopUp() {
    this.popup.classList.add("hidden");
  }

  showMarker() {
    this.marker.setAttribute("opacity", 1);
  }

  hideMarker() {
    this.marker.setAttribute("opacity", 0);
  }

  resetMap() {
    this.zoom = ZOOM.DEFAULT;
    this.center = CENTER.DEFAULT;
    this.hideMarker();
    this.renderMap();
  }

  get dimensions() {
    let { width, height } = this.element.getBoundingClientRect();
    width -= BORDER_WIDTH * 2;
    height -= BORDER_WIDTH * 2;
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

  get tileSchema() {
    const { width, height } = this.dimensions;
    return d3
      .tile()
      .size([width, height])
      .scale(this.projection.scale() * 2 * Math.PI)
      .translate(this.projection([0, 0]));
  }

  get tiles() {
    return this.tileSchema();
  }

  get cartoTilesSchema() {
    return this._cartoTilesSchema;
  }

  set cartoTilesSchema(schema) {
    if (schema && schema.cdn_url && schema.layergroupid) {
      this._cartoTilesSchema = schema;
    } else {
      throw "Invalid CARTO tiles schema";
    }
  }

  get cartocss() {
    return `#layer {
      polygon-fill: #FF6600;
      polygon-opacity: 0.6;
      line-width: 0.7;
      line-color: #FFF;
      line-opacity: 0.3;
    }`;
  }

  get mapsApiConfig() {
    return {
      layers: [
        {
          type: "cartodb",
          options: {
            sql: mapsApiSql(),
            cartocss: this.cartocss,
            cartocss_version: "2.1.0",
          },
        },
      ],
    };
  }
}
