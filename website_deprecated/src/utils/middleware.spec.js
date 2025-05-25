import { crashReporter, errorLogger } from "./middleware";

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

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("it passes through non-Errors", () => {
    const { next, invoke } = create();
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test("it calls logException when an error occurs", () => {
    // this `doMock` and import() nonsense is to make sure that only logException is mocked
    // but handleErrorObj is not
    jest.doMock("./logging", () => ({
      __esModule: true,
      logException: jest.fn(),
      handleErrorObj: jest.requireActual("./logging").handleErrorObj,
    }));
    return import("./logging").then(({ logException }) => {
      const { crashReporter } = require("./middleware");
      const { store, next } = create();
      next.mockImplementation(() => {
        throw new Error("Something bad happened");
      });
      const action = { type: "TEST" };
      expect(() => {
        crashReporter(store)(next)(action);
      }).toThrow("Something bad happened");
      expect(logException).toHaveBeenCalledWith(
        "crashReporter; Error; Something bad happened; {}"
      );
    });
  });
});

describe("errorLogger", () => {
  const create = () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const next = jest.fn();
    const invoke = (action) => errorLogger(store)(next)(action);
    return { store, next, invoke };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("it passes through all actions", () => {
    const { next, invoke } = create();
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test("it passes through action objects that lack an error property", () => {
    jest.doMock("./logging", () => ({
      __esModule: true,
      logException: jest.fn(),
      handleErrorObj: jest.requireActual("./logging").handleErrorObj,
    }));
    return import("./logging").then(({ logException }) => {
      const { errorLogger } = require("./middleware");
      const { store, next } = create();
      const action = { type: "TEST", error: null };
      errorLogger(store)(next)(action);
      expect(logException).not.toHaveBeenCalled();
    });
  });

  test("it logs an exception when an action object has an error property", () => {
    jest.doMock("./logging", () => ({
      __esModule: true,
      logException: jest.fn(),
      handleErrorObj: jest.requireActual("./logging").handleErrorObj,
    }));
    return import("./logging").then(({ logException }) => {
      const { errorLogger } = require("./middleware");
      const { store, next } = create();
      const error = new Error("Something went wrong");
      const action = { type: "TEST", error };
      errorLogger(store)(next)(action);
      expect(logException).toHaveBeenCalledWith(
        "TEST; Error; Something went wrong; {}"
      );
    });
  });
});
