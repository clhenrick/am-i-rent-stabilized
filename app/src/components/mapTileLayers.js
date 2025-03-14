import * as d3Tile from "d3-tile";
import { mapsApiSql } from "../utils/sql";
import { cartoAccount } from "../constants/config";
import { logException, handleErrorObj } from "../utils/logging";

export class MapTileLayers {
  constructor(searchResultMap) {
    this.searchResultMap = searchResultMap;
    this.dimensions = searchResultMap.dimensions;
    this.projection = searchResultMap.projection;
    this._cartoTilesSchema = null;

    this.renderMapTile = this.renderMapTile.bind(this);
    this.renderMapTiles = this.renderMapTiles.bind(this);
    this.getBasemapTileUrl = this.getBasemapTileUrl.bind(this);
    this.getDataTileUrl = this.getDataTileUrl.bind(this);
    this.fetchCartoTilesSchema = this.fetchCartoTilesSchema.bind(this);
    this.init = this.init.bind(this);

    this.init();
  }

  async init() {
    try {
      await this.fetchCartoTilesSchema();
      if (this.cartoTilesSchema) {
        this.searchResultMap.updateProjection();
        this.searchResultMap.renderMap();
      }
    } catch (error) {
      logException(handleErrorObj("MapTileLayers.init", error), true);
    }
  }

  async fetchCartoTilesSchema() {
    const mapsApiUrl = `https://${cartoAccount}.carto.com/api/v1/map/`;
    const res = await fetch(
      `${mapsApiUrl}?config=${encodeURIComponent(
        JSON.stringify(this.mapsApiConfig)
      )}`
    );
    const json = await res.json();
    this._cartoTilesSchema = json;
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

  get tileSchema() {
    const { width, height } = this.dimensions;
    return d3Tile
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
