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

  test("add stores a component instance", () => {
    registry.add("one", one);
    expect(registry.size).toEqual(1);
  });

  test("add throws if not passed a key", () => {
    expect(() => registry.add()).toThrow("requires a name / key");
  });

  test("add throws if not passed a component instance", () => {
    expect(() => registry.add("foo")).toThrow(
      "requires component to be a Component instance"
    );
    expect(() => registry.add("foo", {})).toThrow(
      "requires component to be a Component instance"
    );
  });

  test("get", () => {
    registry.add("one", one);
    expect(registry.get("one")).toEqual(one);
  });

  test("remove", () => {
    registry.add("one", one);
    registry.remove("one");
    expect(spyCleanUp).toHaveBeenCalled();

    spyCleanUp.mockClear();
    registry.remove("foo");
    expect(spyCleanUp).not.toHaveBeenCalled();
  });

  test("removeAll", () => {
    registry.add("one", one);
    registry.add("two", two);
    registry.removeAll();
    expect(registry.size).toEqual(0);
    expect(spyCleanUp).toHaveBeenCalledTimes(2);
    spyCleanUp.mockClear();
  });
});
