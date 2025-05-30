import { MapPopup } from "./mapPopup";
import { SearchResultMap } from "./searchResultMap";
import { store } from "../store";

jest.mock("../store");
jest.mock("./searchResultMap");

describe("MapPopup", () => {
  let element;
  let map;
  let mapPopup;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.getElementById("map").querySelector(".map-pop-up");

    // workaround for JSDOM not supporting layout
    // see: https://github.com/testing-library/react-testing-library/issues/353#issuecomment-481248489
    Object.defineProperty(element, "getBoundingClientRect", {
      configurable: true,
      value: () => ({ width: 250, height: 75 }),
    });
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

    map = new SearchResultMap({
      element: document.getElementById("map"),
      store,
    });
    mapPopup = new MapPopup({ element, map });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(element).not.toBeNull();
  });

  test("The consumer should be able to call new() on MapPopup", () => {
    expect(mapPopup).toBeTruthy();
  });

  test("setContent to empty", () => {
    mapPopup.contentContainer.innerHTML = "<p></p>";
    mapPopup.setContent();
    expect(mapPopup.contentContainer.innerHTML).toEqual("");
  });

  test("setContent to not empty", () => {
    mapPopup.setContent({
      name: "999 West St",
      borough: "Brooklyn",
      state: "NY",
      zipcode: "99999",
    });
    expect(mapPopup.contentContainer.innerHTML).toEqual(
      "<p>999 West St</p><p>Brooklyn NY 99999</p>"
    );
  });

  test.skip("setPosition", () => {
    map.dimensions = { width: 500, height: 300 };
    mapPopup.setPosition();
    expect(mapPopup.element.style.top).toEqual("35px");
    expect(mapPopup.element.style.left).toEqual("125px");
  });

  test("show", () => {
    mapPopup.hide();
    mapPopup.show();
    expect(mapPopup.element.classList.contains("hidden")).toBe(false);
  });

  test("hide", () => {
    mapPopup.show();
    mapPopup.hide();
    expect(mapPopup.element.classList.contains("hidden")).toBe(true);
  });
});
