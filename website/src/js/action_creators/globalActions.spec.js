import { resetAppState } from "./globalActions.js";

describe("global action creators", () => {
  test("resetAppState", () => {
    expect(resetAppState()).toEqual({ type: "ResetAppState" });
  });
});
