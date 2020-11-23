import { store } from "../store";
import { MapTileLayers } from "./mapTileLayers";
import { SearchResultMap } from "./searchResultMap";
import { logException } from "../utils/logging";
const d3Tile = require("d3-tile");

jest.mock("../store");
jest.mock("../utils/logging");

jest.mock("d3-tile");
d3Tile.tile.mockImplementation(() => {
  const fn = jest.fn();
  fn.tile = jest.fn().mockReturnThis();
  fn.size = jest.fn().mockReturnThis();
  fn.scale = jest.fn().mockReturnThis();
  fn.translate = jest.fn().mockReturnThis();
  fn.mockImplementation(() =>
    Object.assign(
      [
        [1204, 1539, 12],
        [1205, 1539, 12],
        [1206, 1539, 12],
        [1207, 1539, 12],
        [1204, 1540, 12],
        [1205, 1540, 12],
        [1206, 1540, 12],
        [1207, 1540, 12],
      ],
      { scale: 256, translate: [-1204.9136777777776, -1539.4919590398038] }
    )
  );
  return fn;
});

describe("MapTileLayers", () => {
  let element;
  let mapTileLayers;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.getElementById("map");
  });

  beforeEach(() => {
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        result: null,
        status: "idle",
        error: null,
      },
      rentStabilized: {
        status: "idle",
        error: null,
        match: null,
      },
    }));

    fetch.mockResponse(
      JSON.stringify({
        layergroupid: "blablabla",
        cdn_url: {
          templates: {
            https: {
              url: "https://cartocdn-gusc-{s}.global.ssl.fastly.net",
              subdomains: ["a", "b", "c", "d"],
            },
          },
        },
      }),
      { status: 200, statusText: "OK" }
    );

    mapTileLayers = new MapTileLayers(
      new SearchResultMap({
        element,
        store,
      })
    );
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The consumer should be able to call new() on MapTileLayers", () => {
    expect(mapTileLayers).toBeTruthy();
  });

  test("fetchCartoTilesSchema", async () => {
    await mapTileLayers.fetchCartoTilesSchema();
    expect(mapTileLayers.cartoTilesSchema).toBeTruthy();
  });

  test("fetchCartoTilesSchema error", async () => {
    fetch.mockReject(new Error("Bam!"));
    mapTileLayers = new MapTileLayers(
      new SearchResultMap({
        element,
        store,
      })
    );
    await mapTileLayers.fetchCartoTilesSchema();
    expect(mapTileLayers.cartoTilesSchema).toBeNull();
    expect(logException).toHaveBeenCalled();
  });

  test("renderMapTiles", () => {
    const result = mapTileLayers.renderMapTiles();
    const expected =
      '<image xlink:href="https://cartocdn-gusc-d.global.ssl.fastly.net/chenrick/api/v1/map/blablabla/12/1204/1539.png" x="-234" y="-126" width="256" height="256"></image><image xlink:href="https://cartocdn-gusc-a.global.ssl.fastly.net/chenrick/api/v1/map/blablabla/12/1205/1539.png" x="22" y="-126" width="256" height="256"></image><image xlink:href="https://cartocdn-gusc-b.global.ssl.fastly.net/chenrick/api/v1/map/blablabla/12/1206/1539.png" x="278" y="-126" width="256" height="256"></image><image xlink:href="https://cartocdn-gusc-c.global.ssl.fastly.net/chenrick/api/v1/map/blablabla/12/1207/1539.png" x="534" y="-126" width="256" height="256"></image><image xlink:href="https://cartocdn-gusc-a.global.ssl.fastly.net/chenrick/api/v1/map/blablabla/12/1204/1540.png" x="-234" y="130" width="256" height="256"></image><image xlink:href="https://cartocdn-gusc-b.global.ssl.fastly.net/chenrick/api/v1/map/blablabla/12/1205/1540.png" x="22" y="130" width="256" height="256"></image><image xlink:href="https://cartocdn-gusc-c.global.ssl.fastly.net/chenrick/api/v1/map/blablabla/12/1206/1540.png" x="278" y="130" width="256" height="256"></image><image xlink:href="https://cartocdn-gusc-d.global.ssl.fastly.net/chenrick/api/v1/map/blablabla/12/1207/1540.png" x="534" y="130" width="256" height="256"></image>';
    expect(result).toEqual(expected);
  });

  test("renderMapTile", () => {
    const result = mapTileLayers.renderMapTile(
      [19295, 24633, 16],
      { translate: [-19295.691937688887, -24633.71588863962], scale: 256 },
      "basemap"
    );
    const expected =
      "<image xlink:href=" +
      '"https://cartodb-basemaps-c.global.ssl.fastly.net/light_all/16/19295/24633.png" ' +
      'x="-177" y="-183" width="256" height="256"></image>';
    expect(result).toEqual(expected);
  });

  test("getBasemapTileUrl", () => {
    window.devicePixelRatio = 2;
    expect(mapTileLayers.getBasemapTileUrl(40, 30, 20)).toEqual(
      "https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/20/40/30@2x.png"
    );

    window.devicePixelRatio = 1;
    expect(mapTileLayers.getBasemapTileUrl(1, 2, 3)).toEqual(
      "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/3/1/2.png"
    );
  });

  test("getDataTileUrl", () => {
    window.devicePixelRatio = 2;
    mapTileLayers.cartoTilesSchema = {
      layergroupid: "blablabla",
      cdn_url: {
        templates: {
          https: {
            url: "https://cartocdn-gusc-{s}.global.ssl.fastly.net",
            subdomains: ["a", "b", "c", "d"],
          },
        },
      },
    };

    expect(mapTileLayers.getDataTileUrl(40, 30, 20)).toEqual(
      "https://cartocdn-gusc-c.global.ssl.fastly.net/chenrick/api/v1/map/blablabla/20/40/30@2x.png"
    );

    window.devicePixelRatio = 1;
    expect(mapTileLayers.getDataTileUrl(1, 2, 3)).toEqual(
      "https://cartocdn-gusc-d.global.ssl.fastly.net/chenrick/api/v1/map/blablabla/3/1/2.png"
    );
  });

  test("cartoTilesSchema should throw when not set correctly", () => {
    expect(() => (mapTileLayers.cartoTilesSchema = {})).toThrow(
      "Invalid CARTO tiles schema"
    );
  });
});
