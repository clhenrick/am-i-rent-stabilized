import { goToNextSlide, goToPrevSlide, goToSlideIdx } from "./slidesActions";

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
});
