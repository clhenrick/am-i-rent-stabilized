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
  let mockCurSlideIndex;

  beforeAll(() => {
    mockCurSlideIndex = jest.spyOn(
      KeyboardNavigation.prototype,
      "curSlideIndex"
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

  test("curSlideIndex returns the current slide index", () => {
    keyboardNavigation.curSlideIndex();
    expect(store.getState).toHaveBeenCalled();
    expect(mockCurSlideIndex).toHaveReturnedWith(0);
  });

  test("maybeGoToNextSlide should dispatch GoToNextSlide action if permissible", () => {
    jest.clearAllMocks();
    keyboardNavigation.maybeGoToNextSlide();
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GoToNextSlide" });
  });
});
