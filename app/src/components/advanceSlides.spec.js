import { AdvanceSlides } from "./advanceSlides";
import { store } from "../store";

jest.mock("../store", () => {
  return {
    __esModule: true,
    store: {
      getState: jest.fn(() => ({
        slides: {
          curIndex: 0,
        },
      })),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
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
  });

  beforeEach(() => {
    advanceSlides = new AdvanceSlides({
      element,
      store,
      buttonSelector: "h3",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect([
      ...document.querySelectorAll(".go-next.bottom-arrow"),
    ]).toHaveLength(6);
  });

  test("The consumer should be able to call new() on AdvanceSlides class", () => {
    expect(advanceSlides).toBeTruthy();
  });

  test("Throws an error if props.store is missing or invalid", () => {
    expect(
      () =>
        new AdvanceSlides({
          element,
        })
    ).toThrow("Requires redux store");
    expect(
      () =>
        new AdvanceSlides({
          element,
          store: {},
        })
    ).toThrow("Requires redux store");
  });

  test("The component's button handles a click event", () => {
    document.querySelector(".go-next.bottom-arrow > h3").click();
    expect(spyButton).toHaveBeenCalled();
  });

  test("handleClick calls advanceToSlide", () => {
    advanceSlides.handleClick(mockClickEvent);
    expect(spyAdvanceToSlide).toHaveBeenCalledTimes(1);
  });

  test("advanceToSlide dispatches a GoToNextSlide action when advanceToIdx is undefined", () => {
    advanceSlides.handleClick(mockClickEvent);
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GoToNextSlide" });
  });

  test("advanceToSlide dispatches a GoToSlideIdx action when advanceToIdx is defined", () => {
    advanceSlides.advanceToIdx = 5;
    advanceSlides.handleClick(mockClickEvent);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "GoToSlideIdx",
      payload: 5,
    });
  });
});
