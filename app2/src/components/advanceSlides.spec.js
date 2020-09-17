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

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    spyButton = jest.spyOn(AdvanceSlides.prototype, "handleClick");
    advanceSlides = new AdvanceSlides({
      element: document.querySelector(".go-next.bottom-arrow"),
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

  test("The component's button handles a click event", () => {
    document.querySelector(".go-next.bottom-arrow > h3").click();
    expect(spyButton).toHaveBeenCalled();
  });

  test("handleClick method fires the nextSlide action creator", () => {
    jest.clearAllMocks();
    advanceSlides.handleClick();
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GoToNextSlide" });
  });

  test("handleClick method does not fire the nextSlide action creator", () => {
    jest.clearAllMocks();
    store.getState.mockImplementationOnce(() => ({
      slides: {
        curIndex: 0,
        canAdvance: false,
      },
    }));
    advanceSlides.handleClick();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
