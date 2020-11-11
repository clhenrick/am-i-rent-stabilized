import initApp, { registry, addToRegistry } from "./initApp";

describe("addToRegistry", () => {
  const one = { a: 1, cleanUp: jest.fn() };
  const two = { a: 2, cleanUp: jest.fn() };

  test("addToRegistry stores a reference when empty", () => {
    addToRegistry("one", one);
    expect(registry.size).toEqual(1);
    expect(registry.get("one")).toEqual(one);
  });

  test("addToRegistry stores a reference when not empty", () => {
    addToRegistry("one", two);
    expect(registry.size).toEqual(1);
    expect(one.cleanUp).toHaveBeenCalledTimes(1);
    expect(registry.get("one")).toEqual(two);
  });
});

describe("initApp", () => {
  jest.mock("../store");
  jest.mock("../components/navigation");
  jest.mock("../components/languageToggle");
  jest.mock("../components/advanceSlides");
  jest.mock("../components/slidesContainer");
  jest.mock("../components/keyboardNavigation");
  jest.mock("../components/addressSearchForm");
  jest.mock("../components/progressIndicator");
  jest.mock("../components/verifyRentStabilized");
  jest.mock("../components/searchResultMap");
  jest.mock("../components/rentHistoryEmail");
  jest.mock("../components/addToCalendar");
  jest.mock("../components/startOver");
  jest.mock("./initApp");

  const { addToRegistry } = require("./initApp");
  const initApp = jest.requireActual("./initApp").default;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
  });

  test("initApp calls addToRegistry", () => {
    // TODO
    // initApp();
    // expect(addToRegistry).toHaveBeenCalledTimes(10)
  });
});
