import { geoMercator } from "d3-geo";
import { store, observeStore } from "../store";
import {
  SearchResultMap,
  ZOOM,
  CENTER,
  MARKER,
  BORDER_WIDTH,
} from "./searchResultMap";
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
    expect(element).toBeDefined();
    expect(element.querySelector("svg")).toBeDefined();
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

  test("updateMapView", () => {
    const spy1 = jest.spyOn(SearchResultMap.prototype, "setPopupContent");
    const spy2 = jest.spyOn(SearchResultMap.prototype, "showPopUp");
    const spy3 = jest.spyOn(SearchResultMap.prototype, "showMarker");
    const spy4 = jest.spyOn(SearchResultMap.prototype, "renderMap");
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
    instance.updateMapView();
    expect(instance.zoom).toEqual(ZOOM.RESULT);
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
  });

  test("updateMapView with no searchResultDetails", () => {
    const result = searchResultMap.updateMapView();
    expect(result).toBeUndefined();
  });

  test("renderMap", () => {
    const spy1 = jest.spyOn(SearchResultMap.prototype, "setMapSize");
    const spy2 = jest.spyOn(SearchResultMap.prototype, "setMarkerPosition");
    const instance = new SearchResultMap({ element, store });
    instance.renderMap();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(instance.gBaseTiles.innerHTML).toBeTruthy();
    expect(instance.gRsTiles.innerHTML).toBeTruthy();
  });

  test("setMapSize", () => {
    searchResultMap.setMapSize();
    const result = searchResultMap.svg.getAttribute("viewBox");
    expect(result).toEqual(
      `0 0 ${width - BORDER_WIDTH * 2} ${height - BORDER_WIDTH * 2}`
    );
  });

  test("setMarkerPosition", () => {
    searchResultMap.setMarkerPosition();
    const result = searchResultMap.marker.getAttribute("transform");
    expect(result).toEqual(
      `translate(${(width - BORDER_WIDTH * 2) / 2 - MARKER.WIDTH / 2}, ${
        (height - BORDER_WIDTH * 2) / 2 - MARKER.HEIGHT
      }), scale(2)`
    );
  });

  test("updateProjection", () => {
    searchResultMap.updateProjection();
    expect(center).toHaveBeenCalledWith(CENTER.DEFAULT);
    expect(scale).toHaveBeenCalledWith(
      Math.pow(2, ZOOM.DEFAULT) / (2 * Math.PI)
    );
    expect(translate).toHaveBeenCalledWith([
      (width - BORDER_WIDTH * 2) / 2,
      (height - BORDER_WIDTH * 2) / 2,
    ]);
  });

  test("setPopupContent to empty", () => {
    searchResultMap.popup.innerHTML = "<p></p>";
    searchResultMap.setPopupContent();
    expect(searchResultMap.popup.innerHTML).toEqual("");
  });

  test("setPopupContent to not empty", () => {
    searchResultMap.setPopupContent({
      name: "999 West St",
      borough: "Brooklyn",
      state: "NY",
      zipcode: "99999",
    });
    expect(searchResultMap.popup.innerHTML).toEqual(
      "<p>999 West St</p><p>Brooklyn NY 99999</p>"
    );
  });

  test("showPopUp", () => {
    searchResultMap.hidePopUp();
    searchResultMap.showPopUp();
    expect(searchResultMap.popup.classList.contains("hidden")).toBe(false);
  });

  test("hidePopUp", () => {
    searchResultMap.hidePopUp();
    expect(searchResultMap.popup.classList.contains("hidden")).toBe(true);
  });

  test("showMarker", () => {
    searchResultMap.hideMarker();
    searchResultMap.showMarker();
    expect(searchResultMap.marker.getAttribute("opacity")).toBe("1");
  });

  test("hideMarker", () => {
    searchResultMap.hideMarker();
    expect(searchResultMap.marker.getAttribute("opacity")).toBe("0");
  });
});
