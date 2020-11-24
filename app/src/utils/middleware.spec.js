import { crashReporter } from "./middleware";
import { logException } from "./logging";

jest.mock("./logging");

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
