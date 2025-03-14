import { geoPath } from "d3-geo";
import { rentStabilizedGeomSql } from "../utils/sql";
import { cartoAPIv3BaseURL, cartoApiKey } from "../constants/config";
import { logException, handleErrorObj } from "../utils/logging";

export class MapLikelyRsLayer {
  constructor(searchResultMap) {
    this.searchResultMap = searchResultMap;
    this.dimensions = searchResultMap.dimensions;
    this.projection = searchResultMap.projection;

    /** @type {null | Object} Carto SQL API result of GeoJSON geometries of likely RS properties */
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

  /** handles rendering the SVG map's likely RS polygon map layer */
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
   * @param {any[]} features - array of GeoJSON features
   * @returns {string}
   */
  renderGeoJsonPaths(features) {
    // TODO: stroke color = #ffffff
    // TODO: fill color = #ff6600
    return features
      ?.map(
        (feature) =>
          `<path 
          clip-path="url(#clip-path)"
          stroke="#000"
          stroke-width="0.7"
          fill="none"
          fill-opacity="0.7"
          d="${this._pathGenerator(feature)}"
        />`
      )
      .join("\n");
  }

  /**
   * converts Carto SQL API geometries to an array of correctly formatted GeoJSON features
   * @param {any[]} rows - query rows result
   * @returns {any[]}
   */
  processQueryResult(rows) {
    // TODO "rewind" order of coordinates to fix geojson rendering
    const features = rows.map((d) => ({
      type: "Feature",
      properties: {},
      geometry: JSON.parse(d?.geojson || "{}"),
    }));
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
