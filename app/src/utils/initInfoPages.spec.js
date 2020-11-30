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

  test("any prior component instances are removed from the registry", () => {
    initInfoPages();
    expect(ComponentRegistry.prototype.removeAll).toHaveBeenCalled();
  });
});
