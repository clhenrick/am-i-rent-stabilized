import { StartOver } from "./startOver";
import { store } from "../store";

jest.mock("../store");

describe("StartOver", () => {
  let element;
  let startOver;
  let spyBindEvents;
  let spyHandleClick;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector(".button.start-over");
    spyBindEvents = jest.spyOn(StartOver.prototype, "bindEvents");
    spyHandleClick = jest.spyOn(StartOver.prototype, "handleClick");
  });

  beforeEach(() => {
    if (startOver) {
      startOver.removeEvents();
    }
    startOver = new StartOver({ store, element });
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

  test("The consumer should be able to call new() on VerifyRentStabilized", () => {
    expect(startOver).toBeTruthy();
  });

  test("init", () => {
    expect(spyBindEvents).toHaveBeenCalledTimes(1);
  });

  test("bindEvents", () => {
    startOver.element.querySelector("a").click();
    expect(spyHandleClick).toHaveBeenCalledTimes(1);
  });

  test("handleClick", () => {
    startOver.handleClick({ preventDefault: jest.fn() });
    expect(store.dispatch).toHaveBeenCalledWith({ type: "ResetAppState" });
  });
});
