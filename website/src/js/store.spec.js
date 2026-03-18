import { store, observeStore } from "./store.js";

const spyGetState = vi.spyOn(store, "getState");
const spySubscribe = vi.spyOn(store, "subscribe");

describe("observeStore", () => {
  let select;
  let handleChange;
  let unsubscribe;

  beforeEach(() => {
    select = vi.fn((state) => state.addressGeocode);
    handleChange = vi.fn();
    unsubscribe = observeStore(store, select, handleChange);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetModules();
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
