import { AdvanceSlides } from "./advanceSlides";
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
      dispatch: jest.fn(),
    },
  };
});

describe("AdvanceSlides", () => {
  let advanceSlides;
  let spyButton;
  let spyAdvanceToSlide;
  let element;
  const mockClickEvent = { preventDefault: jest.fn() };

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector(".go-next.bottom-arrow");
    spyButton = jest.spyOn(AdvanceSlides.prototype, "handleClick");
    spyAdvanceToSlide = jest.spyOn(AdvanceSlides.prototype, "advanceToSlide");
    advanceSlides = new AdvanceSlides({
      element,
      buttonSelector: "h3",
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(document.querySelectorAll(".go-next.bottom-arrow")).toHaveLength(6);
  });

  test("The consumer should be able to call new() on AdvanceSlides class", () => {
    expect(advanceSlides).toBeTruthy();
  });

  test("Accepts required prop for button selector", () => {
    expect(advanceSlides.button).toBeInstanceOf(HTMLElement);
  });

  test("Throws an error if missing prop for button selector", () => {
    const errorMsg = "Requires a CSS selector for its button";
    try {
      new AdvanceSlides({ element });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMsg);
    }
  });

  test("The component's button handles a click event", () => {
    document.querySelector(".go-next.bottom-arrow > h3").click();
    expect(spyButton).toHaveBeenCalled();
  });

  test("handleClick calls advanceToSlide if state.slides.canAdvance is true", () => {
    jest.clearAllMocks();
    advanceSlides.handleClick(mockClickEvent);
    expect(spyAdvanceToSlide).toHaveBeenCalledTimes(1);
  });

  test("handleClick does not call advanceToSlide if state.slides.canAdvance is false", () => {
    jest.clearAllMocks();
    store.getState.mockImplementationOnce(() => ({
      slides: {
        curIndex: 0,
        canAdvance: false,
      },
    }));
    advanceSlides.handleClick(mockClickEvent);
    expect(spyAdvanceToSlide).not.toHaveBeenCalled();
  });

  test("advanceToSlide dispatches a GoToNextSlide action when advanceToIdx is undefined", () => {
    jest.clearAllMocks();
    advanceSlides.handleClick(mockClickEvent);
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GoToNextSlide" });
  });

  test("advanceToSlide dispatches a GoToSlideIdx action when advanceToIdx is defined", () => {
    jest.clearAllMocks();
    advanceSlides.advanceToIdx = 5;
    advanceSlides.handleClick(mockClickEvent);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "GoToSlideIdx",
      payload: 5,
    });
  });
});
