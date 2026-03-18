import initInfoPages from "./initInfoPages.js";
import { ComponentRegistry } from "./componentRegistry.js";
import { NavMenuToggle } from "../components/navigation.js";

vi.mock("./componentRegistry");
vi.mock("../components/navigation");

describe("initInfoPages", () => {
  const NUMBER_OF_COMPONENT_INSTANCES = 1;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetModules();
  });

  test("it creates component instances", () => {
    initInfoPages();
    expect(NavMenuToggle).toHaveBeenCalled();
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
