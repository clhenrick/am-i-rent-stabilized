import { store, observeStore } from "../store";
import { SearchResultMap } from "./searchResultMap";

jest.mock("../store");

describe("SearchResultMap", () => {
  let element;
  let searchResultMap;

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
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(element).toBeDefined();
    expect(element.querySelector("svg")).toBeDefined();
  });

  test("The consumer should be able to call new() on AddressSearchForm", () => {
    searchResultMap = new SearchResultMap({
      element,
      store,
    });
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

  test("getTonerTileUrl", () => {
    window.devicePixelRatio = 2;
    searchResultMap = new SearchResultMap({
      element,
      store,
    });
    expect(searchResultMap.getTonerTileUrl(40, 30, 20)).toEqual(
      "https://stamen-tiles-b.a.ssl.fastly.net/toner-lite/20/40/30@2x.png"
    );
    window.devicePixelRatio = 1;
    expect(searchResultMap.getTonerTileUrl(1, 2, 3)).toEqual(
      "https://stamen-tiles-a.a.ssl.fastly.net/toner-lite/3/1/2.png"
    );
  });
});
