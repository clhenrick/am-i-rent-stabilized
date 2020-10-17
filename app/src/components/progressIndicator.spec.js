import { ProgressIndicator } from "./progressIndicator";
import { store, observeStore } from "../store";

jest.mock("../store", () => {
  return {
    __esModule: true,
    store: {
      getState: jest.fn(() => ({
        slides: {
          curIndex: 0,
        },
      })),
      subscribe: jest.fn((cb) => cb()),
      dispatch: jest.fn(),
    },
    observeStore: jest.fn(),
  };
});

describe("ProgressIndicator", () => {
  let progressIndicator;
  let spyRenderCircles;

  beforeAll(() => {
    spyRenderCircles = jest.spyOn(ProgressIndicator.prototype, "renderCircles");

    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    progressIndicator = new ProgressIndicator({
      element: document.querySelector("#progress-indicator"),
      store,
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(document.querySelector("#progress-indicator")).toBeDefined();
  });

  test("The consumer should be able to call new() on AddressSearchForm", () => {
    expect(progressIndicator).toBeTruthy();
  });

  test("Throws an error if props.store is missing or invalid", () => {
    expect(() => {
      new ProgressIndicator({
        element: document.querySelector("#progress-indicator"),
      });
    }).toThrow("Requires redux store");

    expect(() => {
      new ProgressIndicator({
        element: document.querySelector("#progress-indicator"),
        store: {},
      });
    }).toThrow("Requires redux store");
  });

  test("uses observeStore to watch for redux state changes", () => {
    const store = require("../store");
    const spy = jest.spyOn(store, "observeStore");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("responds to redux state changes of slides.curIndex", () => {
    const spy = jest.spyOn(ProgressIndicator.prototype, "renderCircles");

    observeStore.mockImplementation((store, stateSlice, cb) => {
      stateSlice = (state) => state.slides.curIndex;
      cb();
    });

    progressIndicator = new ProgressIndicator({
      element: document.querySelector("#progress-indicator"),
      store,
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("renderCircles", () => {
    const { store } = require("../store");
    jest.mock("../store");

    progressIndicator = new ProgressIndicator({
      element: document.querySelector("#progress-indicator"),
      store,
    });
    progressIndicator.renderCircles();

    expect(progressIndicator.list.children.length).toBeGreaterThan(0);
    expect(
      progressIndicator.list
        .querySelectorAll("li")[0]
        .classList.contains("active")
    ).toBe(true);

    store.getState.mockImplementation(() => ({
      slides: { curIndex: 2 },
    }));
    progressIndicator.renderCircles();

    expect(
      progressIndicator.list
        .querySelectorAll("li")[2]
        .classList.contains("active")
    ).toBe(true);
  });

  test("appendCircle", () => {
    store.getState.mockImplementation(() => ({
      slides: {
        curIndex: 9,
      },
    }));
    progressIndicator.appendCircle(9);
    expect(progressIndicator.list.children).toHaveLength(10);
    expect(
      progressIndicator.list.children[9].classList.contains("active")
    ).toBe(true);
  });
});
