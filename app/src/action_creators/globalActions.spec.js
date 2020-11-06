import { resetAppState } from "./globalActions";

describe("global action creators", () => {
  test("resetAppState", () => {
    expect(resetAppState()).toEqual({ type: "ResetAppState" });
  });
});
