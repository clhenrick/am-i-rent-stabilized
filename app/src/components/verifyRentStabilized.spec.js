import { VerifyRentStabilized } from "./verifyRentStabilized";
import { store, observeStore } from "../store";

jest.mock("../store");

describe("VerifyRentStabilized", () => {
  let element;
  let verifyRentStabilized;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.getElementById("slide-4");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("The component's HTML exists", () => {
    expect(element).toBeDefined();
  });

  test("The consumer should be able to call new() on VerifyRentStabilized", () => {
    verifyRentStabilized = new VerifyRentStabilized({
      element,
      store,
    });
    expect(verifyRentStabilized).toBeTruthy();
  });

  test("Throws an error if props.store is missing or invalid", () => {
    expect(() => {
      new VerifyRentStabilized({
        element,
      });
    }).toThrow("Requires redux store");

    expect(() => {
      new VerifyRentStabilized({
        element,
        store: {},
      });
    }).toThrow("Requires redux store");
  });

  test("uses observeStore to watch for redux state changes", () => {
    new VerifyRentStabilized({
      element,
      store,
    });
    expect(observeStore).toHaveBeenCalledTimes(1);
  });

  test("responds to changes in state.rentStabilized.match", () => {
    const spy = jest.spyOn(VerifyRentStabilized.prototype, "updateMessage");

    store.getState.mockImplementation(() => ({
      rentStabilized: {
        match: {
          total_rows: 0,
        },
      },
    }));

    observeStore.mockImplementation((store, stateSlice, cb) => {
      stateSlice = (state) => state.rentStabilized.match;
      cb();
    });

    verifyRentStabilized = new VerifyRentStabilized({
      element,
      store,
    });

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("updateMessage handles a match", () => {
    store.getState.mockImplementation(() => ({
      rentStabilized: {
        match: {
          total_rows: 1,
        },
      },
    }));

    verifyRentStabilized = new VerifyRentStabilized({
      element,
      store,
    });

    verifyRentStabilized.updateMessage();
    expect(verifyRentStabilized.msgYes.classList.contains("hidden")).toBe(
      false
    );
    expect(verifyRentStabilized.msgNo.classList.contains("hidden")).toBe(true);
  });

  test("updateMessage handles a non-match", () => {
    store.getState.mockImplementation(() => ({
      rentStabilized: {
        match: {
          total_rows: 0,
        },
      },
    }));

    verifyRentStabilized = new VerifyRentStabilized({
      element,
      store,
    });

    verifyRentStabilized.updateMessage();
    expect(verifyRentStabilized.msgYes.classList.contains("hidden")).toBe(true);
    expect(verifyRentStabilized.msgNo.classList.contains("hidden")).toBe(false);
  });
});
