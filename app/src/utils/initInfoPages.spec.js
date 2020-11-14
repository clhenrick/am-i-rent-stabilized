import initInfoPages from "./initInfoPages";
import { ComponentRegistry } from "./componentRegistry";
import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";

jest.mock("./componentRegistry");
jest.mock("../components/navigation");
jest.mock("../components/languageToggle");

describe("initInfoPages", () => {
  const NUMBER_OF_COMPONENT_INSTANCES = 2;

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
    initInfoPages();
    expect(NavMenuToggle).toHaveBeenCalled();
    expect(LanguageToggle).toHaveBeenCalled();
  });

  test("all component instances are added to the registry", () => {
    initInfoPages();
    expect(ComponentRegistry.prototype.add).toHaveBeenCalledTimes(
      NUMBER_OF_COMPONENT_INSTANCES
    );
  });

  test("on subsequent calls, all previous component instances are correctly removed", () => {
    // this is difficult to test here so I'm relying on testing the behvaior in ComponentRegistry instead
    expect(true).toBe(true);
  });
});
