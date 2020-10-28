import { store, observeStore } from "../store";
import { MapTileLayers } from "./mapTileLayers";
import { SearchResultMap } from "./searchResultMap";

jest.mock("../store");

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
});
