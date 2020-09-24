import { KeyboardNavigation } from "./keyboardNavigation";
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

describe("KeyboardNavigation", () => {
  let keyboardNavigation;
  let spyCurSlideIndex;
  let spyMaybeGoToNextSlide;
  let spyMaybeGoToPrevSlide;
  let spyHandleKeydown;

  beforeAll(() => {
    spyCurSlideIndex = jest.spyOn(
      KeyboardNavigation.prototype,
      "curSlideIndex"
    );
    spyMaybeGoToNextSlide = jest.spyOn(
      KeyboardNavigation.prototype,
      "maybeGoToNextSlide"
    );
    spyMaybeGoToPrevSlide = jest.spyOn(
      KeyboardNavigation.prototype,
      "maybeGoToPrevSlide"
    );
    spyHandleKeydown = jest.spyOn(
      KeyboardNavigation.prototype,
      "handleKeyDown"
    );
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    keyboardNavigation = new KeyboardNavigation({
      element: document.body,
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The consumer should be able to call new() on LanguageToggle", () => {
    expect(keyboardNavigation).toBeTruthy();
  });

  test("curSlideIndex returns the value of slides.curIndex from the redux store", () => {
    keyboardNavigation.curSlideIndex();
    expect(store.getState).toHaveBeenCalled();
    expect(spyCurSlideIndex).toHaveReturnedWith(0);
  });

  test("maybeGoToNextSlide should dispatch GoToNextSlide action if permissible", () => {
    jest.clearAllMocks();
    keyboardNavigation.maybeGoToNextSlide();
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GoToNextSlide" });
  });

  test("maybeGoToNextSlide should not call store.dispatch if not permissible", () => {
    jest.clearAllMocks();
    store.getState.mockImplementationOnce(() => ({
      slides: {
        curIndex: 200,
        canAdvance: true,
      },
    }));
    keyboardNavigation.maybeGoToNextSlide();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  test("maybeGoToPrevSlide should dispatch GoToPrevSlide action if permissible", () => {
    jest.clearAllMocks();
    store.getState.mockImplementationOnce(() => ({
      slides: {
        curIndex: 1,
        canAdvance: true,
      },
    }));
    keyboardNavigation.maybeGoToPrevSlide();
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GoToPrevSlide" });
  });

  test("maybeGoToPrevSlide should not call store.dispatch if not permissible", () => {
    jest.clearAllMocks();
    store.getState.mockImplementationOnce(() => ({
      slides: {
        curIndex: 0,
        canAdvance: true,
      },
    }));
    keyboardNavigation.maybeGoToPrevSlide();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  test("handleKeyDown is called on document keydown event", () => {
    document.dispatchEvent(new Event("keydown"));
    expect(spyHandleKeydown).toHaveBeenCalled();
  });

  test("handleKeyDown calls class methods when receiving correct key code", () => {
    keyboardNavigation.handleKeyDown({
      code: "ArrowDown",
      preventDefault: jest.fn(),
    });
    expect(spyMaybeGoToNextSlide).toHaveBeenCalled();

    keyboardNavigation.handleKeyDown({
      code: "ArrowUp",
      preventDefault: jest.fn(),
    });
    expect(spyMaybeGoToPrevSlide).toHaveBeenCalled();
  });
});
