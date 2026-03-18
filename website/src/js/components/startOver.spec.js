import { StartOver } from "./startOver.js";
import { store } from "../store.js";

vi.mock("../store");

describe("StartOver", () => {
  let element;
  let startOver;
  let spyBindEvents;
  let spyHandleClick;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector(".button--primary.start-over");
    spyBindEvents = vi.spyOn(StartOver.prototype, "bindEvents");
    spyHandleClick = vi.spyOn(StartOver.prototype, "handleClick");
  });

  beforeEach(() => {
    if (startOver) {
      startOver.removeEvents();
    }
    startOver = new StartOver({ store, element });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(element).not.toBeNull();
  });

  test("The consumer should be able to call new() on StartOver", () => {
    expect(startOver).toBeTruthy();
  });

  test("init", () => {
    expect(spyBindEvents).toHaveBeenCalledTimes(1);
  });

  test("bindEvents", () => {
    startOver.element.click();
    expect(spyHandleClick).toHaveBeenCalledTimes(1);
  });

  test("handleClick", () => {
    startOver.handleClick({ preventDefault: vi.fn() });
    expect(store.dispatch).toHaveBeenCalledWith({ type: "ResetAppState" });
  });
});
