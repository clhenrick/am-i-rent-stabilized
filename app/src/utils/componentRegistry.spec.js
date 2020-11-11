import { ComponentRegistry } from "./componentRegistry";
import { Component } from "../components/_componentBase";

describe("ComponentRegistry", () => {
  const spyCleanUp = jest.spyOn(Component.prototype, "cleanUp");
  let one;
  let two;
  let registry;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
  });

  beforeEach(() => {
    one = new Component({
      element: document.querySelector("div.desktop .lang-toggle"),
    });
    two = new Component({ element: document.querySelector(".lang-toggle") });
    registry = new ComponentRegistry();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("ComponentRegistry.add stores a component instance", () => {
    registry.add("one", one);
    expect(registry.size).toEqual(1);
    expect(registry.get("one")).toEqual(one);
  });

  test("ComponentRegistry.add replaces an existing component instance", () => {
    registry.add("one", one);
    registry.add("one", two);
    expect(registry.size).toEqual(1);
    expect(spyCleanUp).toHaveBeenCalledTimes(1);
    expect(registry.get("one")).toEqual(two);
  });
});
