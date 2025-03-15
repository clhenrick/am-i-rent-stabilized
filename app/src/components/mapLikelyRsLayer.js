import { geoPath } from "d3-geo";
import { rewind } from "@turf/rewind";
import { rentStabilizedGeomSql } from "../utils/sql";
import { cartoAPIv3BaseURL, cartoApiKey } from "../constants/config";
import { logException, handleErrorObj } from "../utils/logging";

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
    this.fetchLikelyRsGeoJson = this.fetchLikelyRsGeoJson.bind(this);
    this.processQueryResult = this.processQueryResult.bind(this);
    this.renderGeoJsonPaths = this.renderGeoJsonPaths.bind(this);
    this.renderMapLikelyRsLayer = this.renderMapLikelyRsLayer.bind(this);

    this.init();
  }

  async init() {
    this._pathGenerator = geoPath(this.projection);
  }

  /**
   * handles rendering the SVG map's likely RS polygon map layer
   * @returns {Promise<string | undefined>}
   */
  async renderMapLikelyRsLayer() {
    try {
      await this.fetchLikelyRsGeoJson(this.searchResultMap.center);
    } catch (error) {
      logException(handleErrorObj("renderMapLikelyRsLayer", error), true);
    }

    if (
      Array.isArray(this._likelyRsGeoJson?.rows) &&
      this._likelyRsGeoJson.rows.length
    ) {
      const features = this.processQueryResult(this._likelyRsGeoJson.rows);
      const paths = this.renderGeoJsonPaths(features);
      return paths;
    }
  }

  /**
   * converts GeoJSON features to string representation of SVG path elements
   * @param {Feature[]} features - array of GeoJSON features
   * @returns {string}
   */
  renderGeoJsonPaths(features) {
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

  /**
   * converts Carto SQL API geometries to an array of correctly formatted GeoJSON features
   * @param {Row[]} rows - query rows result
   * @returns {Feature[]}
   */
  processQueryResult(rows) {
    const features = rows.map((d) =>
      rewind(
        {
          type: "Feature",
          properties: {},
          geometry: JSON.parse(d?.geojson || "{}"),
        },
        { reverse: true }
      )
    );
    return features;
  }

  /**
   * makes the SQL API call to query GeoJSON geometries of likely RS properties within the proximity of search result coordinates
   * @param {[number, number]} coords [lon, lat]
   */
  async fetchLikelyRsGeoJson(coords) {
    const url = `${cartoAPIv3BaseURL}/v3/sql/carto_dw/query`;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${cartoApiKey}`);

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    const res = await fetch(
      `${url}?q=${encodeURIComponent(
        rentStabilizedGeomSql({ lon: coords[0], lat: coords[1] })
      )}`,
      requestOptions
    );
    if (res.ok) {
      this._likelyRsGeoJson = await res.json();
    } else {
      throw new Error("failed to fetch likely rs geojson");
    }
  }
}
