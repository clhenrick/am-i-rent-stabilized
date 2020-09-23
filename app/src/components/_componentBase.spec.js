import { Component } from "./_componentBase";

describe("Component", () => {
  let props;
  let component;
  let spy;

  beforeAll(() => {
    document.body.innerHTML = "<div></div>";
    spy = jest.spyOn(Component.prototype, "init");
    props = { element: document.querySelector("div") };
    component = new Component(props);
  });

  test("The consumer should be able to call new() on Component", () => {
    expect(component).toBeTruthy();
  });

  test("The component's element property should exist", () => {
    expect(component.element).toBeDefined();
    expect(component.element instanceof HTMLElement).toBe(true);
  });

  test("The component throws an error when not passed a valid element property", () => {
    const errorMsg = "Component requires a valid DOM element prop";

    try {
      new Component();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMsg);
    }

    try {
      new Component({ element: "foo" });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMsg);
    }
  });

  test("The component has an init method", () => {
    expect(typeof Component.prototype.init).toBe("function");
  });

  test("The component has a bindEvents method", () => {
    expect(typeof Component.prototype.bindEvents).toBe("function");
  });

  test("The component has a removeEvents method", () => {
    expect(typeof Component.prototype.removeEvents).toBe("function");
  });

  test("The component's init method is called once when an instance is made", () => {
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("The init method receives a props object as an argument", () => {
    expect(spy).toHaveBeenCalledWith(props);
  });
});
