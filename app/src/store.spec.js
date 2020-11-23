import { crashReporter, store, observeStore } from "./store";
import { logException } from "./utils/logging";

jest.mock("./utils/logging");

const spyGetState = jest.spyOn(store, "getState");
const spySubscribe = jest.spyOn(store, "subscribe");

describe("crashReporter", () => {
  const create = () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const next = jest.fn();

    const invoke = (action) => crashReporter(store)(next)(action);

    return { store, next, invoke };
  };

  test("it passes through non-Errors", () => {
    const { next, invoke } = create();
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test("it calls logException when an error occurs", () => {
    const { store, next } = create();
    next.mockImplementation(() => {
      throw new Error("Something bad happened");
    });
    const action = { type: "TEST" };
    expect(() => {
      crashReporter(store)(next)(action);
    }).toThrow("Something bad happened");
    expect(logException).toHaveBeenCalledWith(
      "crashReporter: Error; Something bad happened; {}"
    );
  });
});

describe("observeStore", () => {
  let select;
  let handleChange;
  let unsubscribe;

  beforeAll(() => {
    select = jest.fn((state) => state.addressGeocode);
    handleChange = jest.fn();
    unsubscribe = observeStore(store, select, handleChange);
  });

  test("responds correctly when first invoked", () => {
    expect(spyGetState).toHaveBeenCalledTimes(1);
    expect(spySubscribe).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenCalledTimes(1);
    expect(select).toHaveReturnedWith({
      autosuggestions: null,
      searchResult: null,
      status: "idle",
      error: null,
    });
  });

  test("responds correctly when store.dispatch() is called", () => {
    handleChange.mockClear();
    select.mockClear();
    select.mockImplementationOnce((state) => state.slides);

    store.dispatch({ type: "GoToNextSlide" });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenCalledTimes(1);
    expect(select).toHaveReturnedWith({
      curIndex: 1,
      canAdvance: true,
    });
  });

  test("does not respond to store.dispatch() when unsubscribe is called", () => {
    select.mockClear();
    handleChange.mockClear();

    unsubscribe();
    store.dispatch({ type: "GoToNextSlide" });

    expect(select).not.toHaveBeenCalled();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
