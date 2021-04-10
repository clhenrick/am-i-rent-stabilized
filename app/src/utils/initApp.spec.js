import initApp from "./initApp";
import { initLang } from "./translate";
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
import { TenantsRightsModal } from "../components/tenantsRightsModal";

jest.mock("./translate");
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
jest.mock("../components/tenantsRightsModal");

describe("initApp", () => {
  const NUMBER_OF_COMPONENT_INSTANCES = 19; // not including KeyboardNavigation

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  // not sure this test is working...
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
    expect(TenantsRightsModal).toHaveBeenCalled();
  });

  test("all component instances are added to the registry", () => {
    initApp();
    expect(ComponentRegistry.prototype.add).toHaveBeenCalledTimes(
      NUMBER_OF_COMPONENT_INSTANCES
    );
  });

  test("any prior component instances are removed from the registry", () => {
    initApp();
    expect(ComponentRegistry.prototype.removeAll).toHaveBeenCalled();
  });

  test("the page's locale is set to the stored or default language", () => {
    initApp();
    expect(initLang).toHaveBeenCalledTimes(1);
  });
});
