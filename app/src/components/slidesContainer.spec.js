import { gsap } from "gsap";
import { SlidesContainer } from "./slidesContainer";
import { store, observeStore } from "../store";

jest.mock("../store", () => {
  return {
    __esModule: true,
    store: {
      getState: jest.fn(() => ({
        slides: {
          curIndex: 0,
          canAdvance: true,
        },
      })),
      subscribe: jest.fn((cb) => cb()),
      dispatch: jest.fn(),
    },
    observeStore: jest.fn(),
  };
});

jest.mock("gsap");

const mockMatchMedia = (window.matchMedia = jest.fn(() => ({
  matches: false,
})));

describe("SlidesContainer", () => {
  const selector = ".slides-container";
  let slidesContainer;
  let spyScrollToActiveSlide;

  beforeAll(() => {
    spyScrollToActiveSlide = jest.spyOn(
      SlidesContainer.prototype,
      "scrollToActiveSlide"
    );
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
  });

  beforeEach(() => {
    slidesContainer = new SlidesContainer({
      element: document.querySelector(selector),
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(document.querySelector(selector)).toBeDefined();
  });

  test("The consumer should be able to call new() on SlidesContainer", () => {
    expect(slidesContainer).toBeTruthy();
  });

  test("Throws an error if props.store is missing or invalid", () => {
    expect(() => {
      new SlidesContainer({
        element: document.querySelector("#progress-indicator"),
      });
    }).toThrow();

    expect(() => {
      new SlidesContainer({
        element: document.querySelector("#progress-indicator"),
        store: {},
      });
    }).toThrow();
  });

  test("has a slides array property", () => {
    const expected = [...document.querySelectorAll(".slide")];
    expect(slidesContainer).toHaveProperty("slides");
    expect(slidesContainer.slides).toEqual(expect.arrayContaining(expected));
  });

  test("subscribes to the redux store", () => {
    expect(observeStore).toHaveBeenCalledTimes(1);
  });

  test("handleSlidesUpdate responds to state.slides changes", () => {
    store.getState.mockImplementationOnce(() => ({
      slides: {
        curIndex: 5,
        canAdvance: true,
      },
    }));
    slidesContainer.handleSlidesUpdate();
    expect(spyScrollToActiveSlide).toHaveBeenCalledTimes(1);
    expect(slidesContainer.activeSlideIdx).toBe(5);
  });

  test("scrollToActiveSlide calls gsap.to()", () => {
    slidesContainer.scrollToActiveSlide();
    expect(gsap.to).toHaveBeenCalledTimes(1);
  });

  test("scrollToActiveSlide sets duration for gsap.to()", () => {
    slidesContainer.prefersReducedMotion = true;
    slidesContainer.scrollToActiveSlide();
    expect(gsap.to).toHaveBeenCalledWith(slidesContainer.element, {
      duration: 0,
      scrollTo: ".slide.active",
      ease: "sine.inOut",
    });
  });

  test("sets smooth scroll behavior from prefers-reduced-motion media query", () => {
    expect(mockMatchMedia).toHaveBeenCalledWith(
      "(prefers-reduced-motion: reduce)"
    );
    expect(mockMatchMedia).toHaveReturnedWith({ matches: false });
  });
});
