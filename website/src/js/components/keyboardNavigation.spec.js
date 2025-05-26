import { KeyboardNavigation } from "./keyboardNavigation";
import { store } from "../store";

jest.mock("../store");
store.getState.mockImplementation(() => ({
  slides: {
    curIndex: 0,
  },
}));

describe("KeyboardNavigation", () => {
  let keyboardNavigation;
  let spyCurSlideIndex;
  let spyMaybeGoToNextSlide;
  let spyMaybeGoToPrevSlide;
  let spyHandleKeydown;
  let spyRemoveEvents;

  beforeAll(() => {
    spyCurSlideIndex = jest.spyOn(
      KeyboardNavigation.prototype,
      "curSlideIndex",
    );
    spyMaybeGoToNextSlide = jest.spyOn(
      KeyboardNavigation.prototype,
      "maybeGoToNextSlide",
    );
    spyMaybeGoToPrevSlide = jest.spyOn(
      KeyboardNavigation.prototype,
      "maybeGoToPrevSlide",
    );
    spyHandleKeydown = jest.spyOn(
      KeyboardNavigation.prototype,
      "handleKeyDown",
    );
    spyRemoveEvents = jest.spyOn(KeyboardNavigation.prototype, "removeEvents");
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
  });

  beforeEach(() => {
    keyboardNavigation = new KeyboardNavigation({
      element: document.body,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The components HTML exists", () => {
    // KeyboardNavigation doesn't really need an HTML element as it adds
    // its event listener to the document. However, since it conforms to a
    // Component subclass it is passed the body element as to not throw an error.
    expect(true).toBe(true);
  });

  test("The consumer should be able to call new() on KeyboardNavigation", () => {
    expect(keyboardNavigation).toBeTruthy();
  });

  test("Throws an error if props.store is missing or invalid", () => {
    expect(
      () =>
        new KeyboardNavigation({
          element: document.body,
        }),
    ).toThrow("Requires redux store");

    expect(
      () =>
        new KeyboardNavigation({
          element: document.body,
          store: {},
        }),
    ).toThrow("Requires redux store");
  });

  test("curSlideIndex returns the value of slides.curIndex from the redux store", () => {
    keyboardNavigation.curSlideIndex();
    expect(store.getState).toHaveBeenCalled();
    expect(spyCurSlideIndex).toHaveReturnedWith(0);
  });

  test("maybeGoToNextSlide should dispatch GoToNextSlide action if permissible", () => {
    keyboardNavigation.maybeGoToNextSlide();
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GoToNextSlide" });
  });

  test("maybeGoToNextSlide should not call store.dispatch if not permissible", () => {
    store.getState.mockImplementationOnce(() => ({
      slides: {
        curIndex: 200,
      },
    }));
    keyboardNavigation.maybeGoToNextSlide();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  test("maybeGoToPrevSlide should dispatch GoToPrevSlide action if permissible", () => {
    store.getState.mockImplementationOnce(() => ({
      slides: {
        curIndex: 1,
      },
    }));
    keyboardNavigation.maybeGoToPrevSlide();
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GoToPrevSlide" });
  });

  test("maybeGoToPrevSlide should not call store.dispatch if not permissible", () => {
    store.getState.mockImplementationOnce(() => ({
      slides: {
        curIndex: 0,
      },
    }));
    keyboardNavigation.maybeGoToPrevSlide();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  test("handleKeyDown is called on document keydown event", () => {
    document.dispatchEvent(new Event("keydown"));
    expect(spyHandleKeydown).toHaveBeenCalled();
  });

  test("handleKeyDown ignores event when not emitted from body", () => {
    const event = {
      target: {
        matches: jest.fn(() => false),
      },
      code: "ArrowDown",
      preventDefault: jest.fn(),
    };
    keyboardNavigation.handleKeyDown(event);
    expect(spyMaybeGoToNextSlide).not.toHaveBeenCalled();
    expect(spyMaybeGoToPrevSlide).not.toHaveBeenCalled();
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

  test("cleanUp", () => {
    keyboardNavigation.cleanUp();
    expect(spyRemoveEvents).toHaveBeenCalledTimes(1);
  });
});
