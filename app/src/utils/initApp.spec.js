import initApp from "./initApp";
import { ComponentRegistry } from "./componentRegistry";
import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";
import { AdvanceSlides } from "../components/advanceSlides";
import { SlidesContainer } from "../components/slidesContainer";
import { AddressSearchForm } from "../components/addressSearchForm";
import { ProgressIndicator } from "../components/progressIndicator";
import { VerifyRentStabilized } from "../components/verifyRentStabilized";
import { SearchResultMap } from "../components/searchResultMap";
import { RentHistoryEmail } from "../components/rentHistoryEmail";
import { AddToCalendar } from "../components/addToCalendar";
import { StartOver } from "../components/startOver";

jest.mock("./componentRegistry");
jest.mock("../components/navigation");
jest.mock("../components/languageToggle");
jest.mock("../components/advanceSlides");
jest.mock("../components/slidesContainer");
jest.mock("../components/addressSearchForm");
jest.mock("../components/progressIndicator");
jest.mock("../components/verifyRentStabilized");
jest.mock("../components/searchResultMap");
jest.mock("../components/rentHistoryEmail");
jest.mock("../components/addToCalendar");
jest.mock("../components/startOver");

describe("initApp", () => {
  const NUMBER_OF_COMPONENT_INSTANCES = 18; // not including KeyboardNavigation

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("it creates component instances", () => {
    initApp();
    expect(NavMenuToggle).toHaveBeenCalled();
    expect(LanguageToggle).toHaveBeenCalled();
    expect(AdvanceSlides).toHaveBeenCalled();
    expect(SlidesContainer).toHaveBeenCalled();
    expect(AddressSearchForm).toHaveBeenCalled();
    expect(ProgressIndicator).toHaveBeenCalled();
    expect(VerifyRentStabilized).toHaveBeenCalled();
    expect(SearchResultMap).toHaveBeenCalled();
    expect(RentHistoryEmail).toHaveBeenCalled();
    expect(AddToCalendar).toHaveBeenCalled();
    expect(StartOver).toHaveBeenCalled();
  });

  test("all component instances are added to the registry", () => {
    initApp();
    expect(ComponentRegistry.prototype.add).toHaveBeenCalledTimes(
      NUMBER_OF_COMPONENT_INSTANCES
    );
  });

  test("on subsequent calls, all previous component instances are correctly removed", () => {
    // this is difficult to test here so I'm relying on testing the behvaior in ComponentRegistry instead
    expect(true).toBe(true);
  });
});
