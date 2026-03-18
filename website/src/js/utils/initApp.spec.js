import initApp from "./initApp.js";
import { ComponentRegistry } from "./componentRegistry.js";
import { NavMenuToggle } from "../components/navigation.js";
import { AdvanceSlides } from "../components/advanceSlides.js";
import { SlidesContainer } from "../components/slidesContainer.js";
import { AddressSearchForm } from "../components/addressSearchForm.js";
import { ProgressIndicator } from "../components/progressIndicator.js";
import { VerifyRentStabilized } from "../components/verifyRentStabilized.js";
import { SearchResultMap } from "../components/searchResultMap.js";
import { AddToCalendar } from "../components/addToCalendar.js";
import { StartOver } from "../components/startOver.js";
import { TenantsRightsGroups } from "../components/tenantsRightsGroups.js";
import { ModalDialog } from "../components/modalDialog.js";

vi.mock("./componentRegistry");
vi.mock("../components/navigation");
vi.mock("../components/advanceSlides");
vi.mock("../components/slidesContainer");
vi.mock("../components/addressSearchForm");
vi.mock("../components/progressIndicator");
vi.mock("../components/verifyRentStabilized");
vi.mock("../components/searchResultMap");
vi.mock("../components/addToCalendar");
vi.mock("../components/startOver");
vi.mock("../components/tenantsRightsGroups");
vi.mock("../components/modalDialog");

describe("initApp", () => {
  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetModules();
  });

  // not sure this test is working...
  test("it creates component instances", () => {
    initApp();
    expect(NavMenuToggle).toHaveBeenCalled();
    expect(AdvanceSlides).toHaveBeenCalled();
    expect(SlidesContainer).toHaveBeenCalled();
    expect(AddressSearchForm).toHaveBeenCalled();
    expect(ProgressIndicator).toHaveBeenCalled();
    expect(VerifyRentStabilized).toHaveBeenCalled();
    expect(SearchResultMap).toHaveBeenCalled();
    expect(AddToCalendar).toHaveBeenCalled();
    expect(StartOver).toHaveBeenCalled();
    expect(TenantsRightsGroups).toHaveBeenCalled();
    expect(ModalDialog).toHaveBeenCalled();
  });

  test("any prior component instances are removed from the registry", () => {
    initApp();
    expect(ComponentRegistry.prototype.removeAll).toHaveBeenCalled();
  });
});
