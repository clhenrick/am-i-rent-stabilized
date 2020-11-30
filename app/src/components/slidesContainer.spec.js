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
  let element;
  let slidesContainer;
  let spyScrollToActiveSlide;

  beforeAll(() => {
    spyScrollToActiveSlide = jest.spyOn(
      SlidesContainer.prototype,
      "scrollToActiveSlide"
    );
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector(selector);
  });

  beforeEach(() => {
    slidesContainer = new SlidesContainer({
      element,
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
    expect(element).not.toBeNull();
  });

  test("The consumer should be able to call new() on SlidesContainer", () => {
    expect(slidesContainer).toBeTruthy();
  });

  test("Throws an error if props.store is missing or invalid", () => {
    expect(() => {
      new SlidesContainer({
        element,
      });
    }).toThrow();

    expect(() => {
      new SlidesContainer({
        element,
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
      },
    }));
    slidesContainer.handleSlidesUpdate();
    expect(spyScrollToActiveSlide).toHaveBeenCalledTimes(1);
    expect(slidesContainer.activeSlideIdx).toBe(5);
  });

  test("scrollToActiveSlide calls gsap.to", () => {
    slidesContainer.scrollToActiveSlide();
    expect(gsap.to).toHaveBeenCalledTimes(1);
    expect(gsap.to).toHaveBeenCalledWith(element, {
      duration: 0.65,
      scrollTo: ".slide.active",
      ease: "sine.inOut",
    });
  });

  test("checks prefers-reduced-motion media query", () => {
    mockMatchMedia.mockImplementation(() => ({ matches: true }));
    slidesContainer = new SlidesContainer({
      element,
      store,
    });
    expect(mockMatchMedia).toHaveBeenCalledWith(
      "(prefers-reduced-motion: reduce)"
    );
    expect(slidesContainer.prefersReducedMotion).toBe(true);
  });

  test("`prefers-reduced-motion: reduce` disables scroll animation", () => {
    slidesContainer.prefersReducedMotion = true;
    slidesContainer.scrollToActiveSlide();
    expect(gsap.to).toHaveBeenCalledWith(slidesContainer.element, {
      duration: 0,
      scrollTo: ".slide.active",
      ease: "sine.inOut",
    });
  });
});
