import { geoPath } from "d3-geo";

/** likely rs svg path styles */
const LAYER_STYLES = {
  strokeWidth: 0.7,
  strokeColor: "#fff",
  fillColor: "#ff6600",
  fillOpacity: 0.7,
};

/**
 * @typedef {object} Row
 * @property {string} geojson
 */

/**
 * @typedef {object} Feature
 * @property {string} type
 * @property {object} properties
 * @property {object} geometry
 */

/**
 * class that handles rendering the SearchResultMap's likely rent-stabilized data layer of SVG path elements
 * - queries the Carto SQL API for a GeoJSON representation of likely RS properties
 * - transforms GeoJSON to SVG path elements suitable for rendering in the appropriate map layer
 */
export class MapLikelyRsLayer {
  constructor(searchResultMap) {
    this.searchResultMap = searchResultMap;
    this.dimensions = searchResultMap.dimensions;
    this.projection = searchResultMap.projection;

    /** @type {null | Row[]} Carto SQL API result of GeoJSON geometries of likely RS properties */
    this._likelyRsGeoJson = null;

    /** @type {null | ReturnType<geoPath>} d3-geo SVG path generator */
    this._pathGenerator = null;

    this.init = this.init.bind(this);
    this.getRsPolygonPaths = this.getRsPolygonPaths.bind(this);
    this.render = this.render.bind(this);

    this.init();
  }

  async init() {
    this._pathGenerator = geoPath(this.projection);
  }

  /**
   * handles rendering the SVG map's likely RS polygon map layer
   * @returns {Promise<string | undefined>}
   */
  async render(rsGeoJson) {
    if (Array.isArray(rsGeoJson) && rsGeoJson.length) {
      const paths = this.getRsPolygonPaths(rsGeoJson);
      return paths;
    }
  }

  /**
   * converts GeoJSON features to string representation of SVG path elements
   * @param {Feature[]} features - array of GeoJSON features
   * @returns {string}
   */
  getRsPolygonPaths(features) {
    return features
      ?.map(
        (feature) =>
          `<path
            stroke=${LAYER_STYLES.strokeColor}
            stroke-width="${LAYER_STYLES.strokeWidth}"
            fill=${LAYER_STYLES.fillColor}
            fill-opacity="${LAYER_STYLES.fillOpacity}"
            d="${this._pathGenerator(feature)}"
          />`
      )
      .join("\n");
  }
}
