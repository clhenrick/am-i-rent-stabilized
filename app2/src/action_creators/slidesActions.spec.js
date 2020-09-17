import {
  goToNextSlide,
  goToPrevSlide,
  goToSlideIdx,
  canAdvanceSlide,
} from "./slidesActions";

describe("slidesActions", () => {
  test("goToNextSlide", () => {
    expect(goToNextSlide()).toEqual({ type: "GoToNextSlide" });
  });

  test("goToPrevSlide", () => {
    expect(goToPrevSlide()).toEqual({ type: "GoToPrevSlide" });
  });

  test("goToSlideIdx", () => {
    expect(goToSlideIdx(5)).toEqual({ type: "GoToSlideIdx", payload: 5 });
  });

  test("canAdvanceSlide", () => {
    expect(canAdvanceSlide(false)).toEqual({
      type: "CanAdvanceSlide",
      payload: false,
    });
  });
});
