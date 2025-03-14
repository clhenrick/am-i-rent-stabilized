import { rentStabilizedGeomSql } from "../utils/sql";
import { cartoAPIv3BaseURL, cartoApiKey } from "../constants/config";
import { logException, handleErrorObj } from "../utils/logging";

export class MapLikelyRsLayer {
  constructor(searchResultMap) {
    this.searchResultMap = searchResultMap;
    this.dimensions = searchResultMap.dimensions;
    this.projection = searchResultMap.projection;
    this._likelyRsGeoJson = null;
    this.init = this.init.bind(this);

    this.fetchLikelyRsGeoJson = this.fetchLikelyRsGeoJson.bind(this);

    this.init();
  }

  async init() {
    console.log("MapLikelyRsLayer init");
    // TODO: delete these two lines, only a test
    await this.fetchLikelyRsGeoJson([-73.95757, 40.658]);
    console.log(this._likelyRsGeoJson);
  }

  async renderLikelyRsLayer() {}

  /**
   *
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
    this._likelyRsGeoJson = await res.json();
  }
}
