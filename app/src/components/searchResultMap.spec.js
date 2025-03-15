import { geoMercator } from "d3-geo";
import { store, observeStore } from "../store";
import { SearchResultMap } from "./searchResultMap";
import {
  MAP_ZOOM,
  MAP_CENTER,
  MAP_MARKER,
  MAP_BORDER_WIDTH,
} from "../constants/app";
import { MapPopup } from "./mapPopup";
import { MapTileLayers } from "./mapTileLayers";

jest.mock("../store");
jest.mock("./mapTileLayers");

jest.mock("d3-geo");

const center = jest.fn().mockReturnThis();
const scale = jest.fn().mockReturnThis();
const translate = jest.fn().mockReturnThis();

geoMercator.mockImplementation(() => {
  const fn = jest.fn();
  fn.center = center;
  fn.scale = scale;
  fn.translate = translate;
  return fn;
});

describe("SearchResultMap", () => {
  let element;
  let searchResultMap;
  let width;
  let height;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.getElementById("map");
  });

  beforeEach(() => {
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        searchResult: null,
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

    searchResultMap = new SearchResultMap({
      element,
      store,
    });
    width = 500;
    height = 400;
    searchResultMap.element.getBoundingClientRect = jest.fn(() => ({
      width,
      height,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(element).not.toBeNull();
    expect(element.querySelector("svg")).not.toBeNull();
  });

  test("The consumer should be able to call new() on SearchResultMap", () => {
    expect(searchResultMap).toBeTruthy();
  });

  test("Throws an error if props.store is missing or invalid", () => {
    expect(
      () =>
        new SearchResultMap({
          element,
        })
    ).toThrow("Requires redux store");

    expect(
      () =>
        new SearchResultMap({
          element,
          store: {},
        })
    ).toThrow("Requires redux store");
  });

  test("uses observeStore to watch for redux state changes", () => {
    const store = require("../store");
    const spy = jest.spyOn(store, "observeStore");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("responds to redux state changes of addressGeocode.searchResult", () => {
    const spy = jest.spyOn(SearchResultMap.prototype, "handleSearchResult");
    observeStore.mockImplementation((store, stateSlice, cb) => {
      stateSlice = (state) => state.addressGeocode.searchResult;
      cb();
    });
    new SearchResultMap({ element, store });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("handleSearchResult", () => {
    const spy = jest.spyOn(SearchResultMap.prototype, "updateMapView");
    const instance = new SearchResultMap({ element, store });
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        searchResult: {
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [0, 0],
              },
              properties: {
                name: "Bla",
                borough: "Brooklyn",
                region_a: "New York",
                postalcode: "99999",
              },
            },
          ],
        },
        status: "idle",
        error: null,
      },
      rentStabilized: {
        status: "idle",
        error: null,
        match: null,
      },
    }));
    instance.handleSearchResult();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("handleSearchResult with no searchResult", () => {
    const spy = jest.spyOn(SearchResultMap.prototype, "updateMapView");
    const instance = new SearchResultMap({ element, store });
    instance.handleSearchResult();
    expect(spy).not.toHaveBeenCalled();
  });

  test("updateMapView", async () => {
    const spy1 = jest.spyOn(MapPopup.prototype, "setContent");
    const spy2 = jest.spyOn(MapPopup.prototype, "show");
    const spy6 = jest.spyOn(MapPopup.prototype, "setPosition");
    const spy3 = jest.spyOn(SearchResultMap.prototype, "showMarker");
    const spy4 = jest.spyOn(SearchResultMap.prototype, "renderMap");
    const spy5 = jest.spyOn(SearchResultMap.prototype, "setMarkerPosition");
    const instance = new SearchResultMap({ element, store });
    store.getState.mockImplementation(() => ({
      addressGeocode: {
        searchResult: {
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [0, 0],
              },
              properties: {
                name: "Bla",
                borough: "Brooklyn",
                region_a: "New York",
                postalcode: "99999",
              },
            },
          ],
        },
        status: "idle",
        error: null,
      },
      rentStabilized: {
        status: "idle",
        error: null,
        match: null,
      },
    }));
    await instance.updateMapView();
    expect(instance.zoom).toEqual(MAP_ZOOM.RESULT);
    expect(instance.center).toEqual([0, 0]);
    expect(spy1).toHaveBeenCalledWith({
      name: "Bla",
      borough: "Brooklyn",
      state: "New York",
      zipcode: "99999",
    });
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(spy4).toHaveBeenCalledTimes(1);
    expect(spy5).toHaveBeenCalledTimes(1);
    expect(spy6).toHaveBeenCalledTimes(1);
  });

  test("updateMapView with no searchResultDetails", () => {
    const spy1 = jest.spyOn(MapPopup.prototype, "setContent");
    const spy2 = jest.spyOn(MapPopup.prototype, "show");
    const spy6 = jest.spyOn(MapPopup.prototype, "setPosition");
    const spy3 = jest.spyOn(SearchResultMap.prototype, "showMarker");
    const spy4 = jest.spyOn(SearchResultMap.prototype, "renderMap");
    const spy5 = jest.spyOn(SearchResultMap.prototype, "setMarkerPosition");
    new SearchResultMap({ element, store });
    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();
    expect(spy4).not.toHaveBeenCalled();
    expect(spy5).not.toHaveBeenCalled();
    expect(spy6).not.toHaveBeenCalled();
  });

  test("renderMap", () => {
    MapTileLayers.mockRestore();
    const { SearchResultMap } = require("./searchResultMap");
    const spy = jest.spyOn(SearchResultMap.prototype, "setMapSize");
    const instance = new SearchResultMap({ element, store });
    instance.renderMap();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(instance.gBaseTiles.childNodes).toBeDefined();
    expect(instance.gRsTiles.childNodes).toBeDefined();
  });

  test("setMapSize", () => {
    searchResultMap.setMapSize();
    const result = searchResultMap.svg.getAttribute("viewBox");
    expect(result).toEqual(
      `0 0 ${width - MAP_BORDER_WIDTH * 2} ${height - MAP_BORDER_WIDTH * 2}`
    );
  });

  test("setMarkerPosition", () => {
    searchResultMap.setMarkerPosition();
    const result = searchResultMap.marker.getAttribute("transform");
    expect(result).toEqual(
      `translate(${
        (width - MAP_BORDER_WIDTH * 2) / 2 - MAP_MARKER.WIDTH / 2
      }, ${(height - MAP_BORDER_WIDTH * 2) / 2 - MAP_MARKER.HEIGHT}), scale(2)`
    );
  });

  test("updateProjection", () => {
    searchResultMap.updateProjection();
    expect(center).toHaveBeenCalledWith(MAP_CENTER.DEFAULT);
    expect(scale).toHaveBeenCalledWith(
      Math.pow(2, MAP_ZOOM.DEFAULT) / (2 * Math.PI)
    );
    expect(translate).toHaveBeenCalledWith([
      (width - MAP_BORDER_WIDTH * 2) / 2,
      (height - MAP_BORDER_WIDTH * 2) / 2,
    ]);
  });

  test("showMarker", () => {
    searchResultMap.hideMarker();
    searchResultMap.showMarker();
    expect(searchResultMap.marker.getAttribute("opacity")).toBe("1");
  });

  test("hideMarker", () => {
    searchResultMap.showMarker();
    searchResultMap.hideMarker();
    expect(searchResultMap.marker.getAttribute("opacity")).toBe("0");
  });

  test("resetMap", () => {
    const spy1 = jest.spyOn(SearchResultMap.prototype, "hideMarker");
    const spy2 = jest.spyOn(SearchResultMap.prototype, "renderMap");
    const spy3 = jest.spyOn(MapPopup.prototype, "hide");
    const instance = new SearchResultMap({ store, element });
    instance.resetMap();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(instance.zoom).toEqual(MAP_ZOOM.DEFAULT);
    expect(instance.center).toEqual(MAP_CENTER.DEFAULT);
  });

  test("searchResultDetails getter", () => {
    const value = searchResultMap.searchResultDetails;
    expect(value).toBe(false);
  });

  test("zoom property setter", () => {
    expect(() => {
      searchResultMap.zoom = null;
    }).toThrow("zoom should be an integer");
  });

  test("center property setter", () => {
    expect(() => {
      searchResultMap.center = [];
    }).toThrow("center must be an array with lat lon coordinates.");
  });
});
