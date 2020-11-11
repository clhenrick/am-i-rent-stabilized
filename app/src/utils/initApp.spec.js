import initApp from "./initApp";

describe("initApp", () => {
  jest.mock("./componentRegistry");
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

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
  });

  test("initApp uses ComponentRegistry", () => {
    // TODO
    // initApp();
    // expect(addToRegistry).toHaveBeenCalledTimes(10)
  });
});
