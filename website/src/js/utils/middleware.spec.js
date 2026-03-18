import { crashReporter, errorLogger } from "./middleware.js";

describe("crashReporter", () => {
  const create = () => {
    const store = {
      getState: vi.fn(() => ({})),
      dispatch: vi.fn(),
    };
    const next = vi.fn();
    const invoke = (action) => crashReporter(store)(next)(action);
    return { store, next, invoke };
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  afterAll(() => {
    vi.resetModules();
  });

  test("it passes through non-Errors", () => {
    const { next, invoke } = create();
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test("it calls logException when an error occurs", async () => {
    vi.doMock("./logging.js", async () => {
      const actual = await vi.importActual("./logging.js");
      return {
        logException: vi.fn(),
        handleErrorObj: actual.handleErrorObj,
      };
    });
    const { logException } = await import("./logging.js");
    const { crashReporter: cr } = await import("./middleware.js");
    const { store, next } = create();
    next.mockImplementation(() => {
      throw new Error("Something bad happened");
    });
    const action = { type: "TEST" };
    expect(() => {
      cr(store)(next)(action);
    }).toThrow("Something bad happened");
    expect(logException).toHaveBeenCalledWith(
      "crashReporter; Error; Something bad happened; {}"
    );
  });
});

describe("errorLogger", () => {
  const create = () => {
    const store = {
      getState: vi.fn(() => ({})),
      dispatch: vi.fn(),
    };
    const next = vi.fn();
    const invoke = (action) => errorLogger(store)(next)(action);
    return { store, next, invoke };
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  afterAll(() => {
    vi.resetModules();
  });

  test("it passes through all actions", () => {
    const { next, invoke } = create();
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test("it passes through action objects that lack an error property", async () => {
    vi.doMock("./logging.js", async () => {
      const actual = await vi.importActual("./logging.js");
      return {
        logException: vi.fn(),
        handleErrorObj: actual.handleErrorObj,
      };
    });
    const { logException } = await import("./logging.js");
    const { errorLogger: el } = await import("./middleware.js");
    const { store, next } = create();
    const action = { type: "TEST", error: null };
    el(store)(next)(action);
    expect(logException).not.toHaveBeenCalled();
  });

  test("it logs an exception when an action object has an error property", async () => {
    vi.doMock("./logging.js", async () => {
      const actual = await vi.importActual("./logging.js");
      return {
        logException: vi.fn(),
        handleErrorObj: actual.handleErrorObj,
      };
    });
    const { logException } = await import("./logging.js");
    const { errorLogger: el } = await import("./middleware.js");
    const { store, next } = create();
    const error = new Error("Something went wrong");
    const action = { type: "TEST", error };
    el(store)(next)(action);
    expect(logException).toHaveBeenCalledWith(
      "TEST; Error; Something went wrong; {}"
    );
  });
});
