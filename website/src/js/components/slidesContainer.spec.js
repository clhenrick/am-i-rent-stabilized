import { gsap } from "gsap";
import { SlidesContainer, SCROLL_DURATION_SECONDS } from "./slidesContainer";
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
  const selector = ".slides";
  let element;
  let slidesContainer;
  let spyScrollToActiveSlide;

  beforeAll(() => {
    spyScrollToActiveSlide = jest.spyOn(
      SlidesContainer.prototype,
      "scrollToActiveSlide",
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

  test("scrolls to active slide on init", () => {
    expect(spyScrollToActiveSlide).toHaveBeenCalledTimes(1);
  });

  test("handleSlidesUpdate responds to state.slides changes", () => {
    spyScrollToActiveSlide.mockClear();
    store.getState.mockImplementationOnce(() => ({
      slides: {
        curIndex: 5,
      },
    }));
    slidesContainer.handleSlidesUpdate();
    const activeSlideIndex = slidesContainer.activeSlideIndex;
    const activeSlide = slidesContainer.activeSlide;
    const nonActiveSlides = slidesContainer.slides.filter(
      (slide) => !slide.classList.contains("active"),
    );
    expect(spyScrollToActiveSlide).toHaveBeenCalledTimes(1);
    expect(activeSlideIndex).toBe(5);
    expect(activeSlide.getAttribute("inert")).toBeNull();
    expect(activeSlide.getAttribute("aria-hidden")).toBe("false");
    nonActiveSlides.forEach((slide) => {
      expect(slide.getAttribute("inert")).toBe("true");
      expect(slide.getAttribute("aria-hidden")).toBe("true");
    });
  });

  test("scrollToActiveSlide calls gsap.to and gsap.fromTo with expected params", () => {
    gsap.to.mockClear();
    slidesContainer.scrollToActiveSlide();
    expect(gsap.to).toHaveBeenCalledTimes(1);
    expect(gsap.to).toHaveBeenCalledWith(element, {
      duration: SCROLL_DURATION_SECONDS,
      scrollTo: "#slide-1",
      ease: "sine.inOut",
      onComplete: slidesContainer.handleScrollComplete,
    });

    slidesContainer.activeSlideIndex = 2;
    slidesContainer.previousSlideIndex = 1;
    slidesContainer.scrollToActiveSlide();
    expect(gsap.fromTo).toHaveBeenCalledTimes(1);
    expect(gsap.fromTo).toHaveBeenCalledWith(
      element,
      { scrollTo: "#slide-2" },
      {
        duration: SCROLL_DURATION_SECONDS,
        scrollTo: "#slide-3",
        ease: "sine.inOut",
        onComplete: slidesContainer.handleScrollComplete,
      },
    );
  });

  test("when scroll completes, active slide is focused", () => {
    slidesContainer.handleScrollComplete();
    expect(document.activeElement).toBe(slidesContainer.activeSlide);
  });

  test("checks prefers-reduced-motion media query", () => {
    expect(slidesContainer.prefersReducedMotion).toBe(false);
    mockMatchMedia.mockImplementation(() => ({ matches: true }));
    slidesContainer = new SlidesContainer({
      element,
      store,
    });
    expect(slidesContainer.prefersReducedMotion).toBe(true);
  });

  test("`prefers-reduced-motion: reduce` disables scroll animation", () => {
    slidesContainer.prefersReducedMotion = true;
    slidesContainer.scrollToActiveSlide();
    expect(gsap.to).toHaveBeenCalledWith(slidesContainer.element, {
      duration: 0,
      scrollTo: "#slide-1",
      ease: "sine.inOut",
      onComplete: slidesContainer.handleScrollComplete,
    });
  });
});
