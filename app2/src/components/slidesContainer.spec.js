import { SlidesContainer } from "./slidesContainer";
import { store } from "../store";

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
    },
  };
});

// element.scrollIntoView is not part of the jsdom library
const mockScrollIntoView = (window.HTMLElement.prototype.scrollIntoView = jest.fn());

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
    slidesContainer = new SlidesContainer({
      element: document.querySelector(selector),
    });
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

  test("has a slides array property", () => {
    const expected = [...document.querySelectorAll(".slide")];
    expect(slidesContainer).toHaveProperty("slides");
    expect(slidesContainer.slides).toEqual(expect.arrayContaining(expected));
  });

  test("subscribes to the redux store", () => {
    expect(store.subscribe).toHaveBeenCalledTimes(1);
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

  test("scrollToActiveSlide calls element.scrollIntoView", () => {
    mockScrollIntoView.mockClear();
    slidesContainer.scrollToActiveSlide();
    expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
  });
});
