import * as d3Tile from "d3-tile";
import { logException, handleErrorObj } from "../utils/logging";

export class MapTileLayers {
  constructor(searchResultMap) {
    this.searchResultMap = searchResultMap;
    this.dimensions = searchResultMap.dimensions;
    this.projection = searchResultMap.projection;

    this.renderMapTile = this.renderMapTile.bind(this);
    this.renderMapTiles = this.renderMapTiles.bind(this);
    this.getBasemapTileUrl = this.getBasemapTileUrl.bind(this);
    this.init = this.init.bind(this);

    this.init();
  }

  async init() {
    try {
      this.searchResultMap.updateProjection();
      await this.searchResultMap.renderMap();
    } catch (error) {
      logException(handleErrorObj("MapTileLayers.init", error), true);
    }
  }

  renderMapTiles() {
    return this.tiles
      .map((path, i, transform) => this.renderMapTile(path, transform))
      .join("");
  }

  renderMapTile(path, transform) {
    const [x, y, z] = path;
    const {
      translate: [tx, ty],
      scale: k,
    } = transform;
    return `<image xlink:href="${this.getBasemapTileUrl(
      x,
      y,
      z
    )}" x="${Math.round((x + tx) * k)}" y="${Math.round(
      (y + ty) * k
    )}" width="${k}" height="${k}"></image>`;
  }

  getBasemapTileUrl(x, y, z) {
    return `https://cartodb-basemaps-${
      "abc"[Math.abs(x + y) % 3]
    }.global.ssl.fastly.net/light_all/${z}/${x}/${y}${
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
}
