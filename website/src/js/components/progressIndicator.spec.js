import { ProgressIndicator } from "./progressIndicator.js";
import { store, observeStore } from "../store.js";

vi.mock("../store", () => {
  return {
    __esModule: true,
    store: {
      getState: vi.fn(() => ({
        slides: {
          curIndex: 0,
        },
      })),
      subscribe: vi.fn((cb) => cb()),
      dispatch: vi.fn(),
    },
    observeStore: vi.fn(),
  };
});

describe("ProgressIndicator", () => {
  let element;
  let progressIndicator;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector("#progress-indicator");
  });

  beforeEach(() => {
    progressIndicator = new ProgressIndicator({
      element,
      store,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(element).not.toBeNull();
  });

  test("The consumer should be able to call new() on AddressSearchForm", () => {
    expect(progressIndicator).toBeTruthy();
  });

  test("Throws an error if props.store is missing or invalid", () => {
    expect(() => {
      new ProgressIndicator({
        element,
      });
    }).toThrow("Requires redux store");

    expect(() => {
      new ProgressIndicator({
        element,
        store: {},
      });
    }).toThrow("Requires redux store");
  });

  test("uses observeStore to watch for redux state changes", () => {
    expect(observeStore).toHaveBeenCalledTimes(1);
  });

  test("responds to redux state changes of slides.curIndex", () => {
    const spy = vi.spyOn(ProgressIndicator.prototype, "renderCircles");

    observeStore.mockImplementation((store, stateSlice, cb) => {
      stateSlice = (state) => state.slides.curIndex;
      cb();
    });

    progressIndicator = new ProgressIndicator({
      element,
      store,
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("renderCircles", () => {
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
    expect(
      progressIndicator.list.children[9].classList.contains("active")
    ).toBe(true);
  });
});
