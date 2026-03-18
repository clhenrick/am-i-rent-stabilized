import { AdvanceSlides } from "./advanceSlides.js";
import { store } from "../store.js";

vi.mock("../store", () => {
  return {
    __esModule: true,
    store: {
      getState: vi.fn(() => ({
        slides: {
          curIndex: 0,
        },
      })),
      dispatch: vi.fn(),
      subscribe: vi.fn(),
    },
  };
});

const selector = ".button--go-next";

describe("AdvanceSlides", () => {
  let advanceSlides;
  let spyButton;
  let spyAdvanceToSlide;
  let element;
  const mockClickEvent = { preventDefault: vi.fn() };

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector(selector);
    spyButton = vi.spyOn(AdvanceSlides.prototype, "handleClick");
    spyAdvanceToSlide = vi.spyOn(AdvanceSlides.prototype, "advanceToSlide");
  });

  beforeEach(() => {
    advanceSlides = new AdvanceSlides({
      element,
      store,
      buttonSelector: "h3",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetModules();
  });

  test("The component's HTML exists", () => {
    expect([...document.querySelectorAll(selector)]).toHaveLength(6);
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
    document.querySelector(selector).click();
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
