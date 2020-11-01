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
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(element).toBeDefined();
    expect(element.querySelector("svg")).toBeDefined();
  });

  test("The consumer should be able to call new() on SearchResultMap", () => {
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
